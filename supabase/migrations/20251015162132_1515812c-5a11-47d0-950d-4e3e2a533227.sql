-- Create enums for option sets
CREATE TYPE public.user_role AS ENUM ('admin', 'agent', 'customer');
CREATE TYPE public.user_status AS ENUM ('active', 'inactive', 'suspended');
CREATE TYPE public.ticket_status AS ENUM ('open', 'pending', 'resolved', 'closed');
CREATE TYPE public.ticket_priority AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE public.sender_type AS ENUM ('customer', 'agent', 'ai');
CREATE TYPE public.payment_status AS ENUM ('trial', 'paid', 'failed');

-- Create profiles table (user data)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  company_name TEXT,
  avatar_url TEXT,
  status user_status DEFAULT 'active' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  last_login TIMESTAMPTZ,
  plan_id UUID
);

-- Create user_roles table (separate for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role user_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(user_id, role)
);

-- Create subscription plans table
CREATE TABLE public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_name TEXT UNIQUE NOT NULL,
  monthly_price DECIMAL(10,2) NOT NULL,
  max_tickets INTEGER NOT NULL,
  ai_calls_per_month INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create user subscriptions table
CREATE TABLE public.user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  plan_id UUID REFERENCES public.subscription_plans(id) NOT NULL,
  start_date TIMESTAMPTZ DEFAULT now() NOT NULL,
  end_date TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true NOT NULL,
  payment_status payment_status DEFAULT 'trial' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create tickets table
CREATE TABLE public.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status ticket_status DEFAULT 'open' NOT NULL,
  priority ticket_priority DEFAULT 'medium' NOT NULL,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  assigned_agent_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  ai_assigned BOOLEAN DEFAULT false NOT NULL,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  resolved_at TIMESTAMPTZ
);

-- Create chat messages table
CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID REFERENCES public.tickets(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  sender_type sender_type NOT NULL,
  message_text TEXT NOT NULL,
  ai_confidence DECIMAL(3,2) CHECK (ai_confidence >= 0 AND ai_confidence <= 1),
  is_visible_to_customer BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create AI responses table
CREATE TABLE public.ai_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID REFERENCES public.tickets(id) ON DELETE CASCADE NOT NULL,
  prompt_text TEXT NOT NULL,
  response_text TEXT NOT NULL,
  confidence_score DECIMAL(3,2) CHECK (confidence_score >= 0 AND confidence_score <= 1),
  reviewed_by_agent BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create analytics table
CREATE TABLE public.analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name TEXT NOT NULL,
  metric_value DECIMAL(15,2) NOT NULL,
  period_start TIMESTAMPTZ NOT NULL,
  period_end TIMESTAMPTZ NOT NULL,
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create AI insights table
CREATE TABLE public.ai_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  impact_score INTEGER CHECK (impact_score >= 1 AND impact_score <= 10),
  action_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create knowledge base table
CREATE TABLE public.knowledge_base (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[],
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  is_published BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Add foreign key for plan_id in profiles
ALTER TABLE public.profiles 
  ADD CONSTRAINT fk_profiles_plan 
  FOREIGN KEY (plan_id) 
  REFERENCES public.subscription_plans(id) 
  ON DELETE SET NULL;

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_base ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role user_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create trigger for tickets updated_at
CREATE TRIGGER update_tickets_updated_at
  BEFORE UPDATE ON public.tickets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for knowledge_base updated_at
CREATE TRIGGER update_knowledge_base_updated_at
  BEFORE UPDATE ON public.knowledge_base
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, company_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.raw_user_meta_data->>'company_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  
  -- Assign default customer role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'customer');
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for subscription_plans
CREATE POLICY "Anyone can view subscription plans"
  ON public.subscription_plans FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage subscription plans"
  ON public.subscription_plans FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_subscriptions
CREATE POLICY "Users can view own subscriptions"
  ON public.user_subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all subscriptions"
  ON public.user_subscriptions FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage subscriptions"
  ON public.user_subscriptions FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for tickets
CREATE POLICY "Customers can view own tickets"
  ON public.tickets FOR SELECT
  TO authenticated
  USING (auth.uid() = customer_id OR public.has_role(auth.uid(), 'agent') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Customers can create tickets"
  ON public.tickets FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Agents and admins can update tickets"
  ON public.tickets FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'agent') OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for chat_messages
CREATE POLICY "Users can view messages for their tickets"
  ON public.chat_messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.tickets
      WHERE tickets.id = chat_messages.ticket_id
      AND (tickets.customer_id = auth.uid() OR public.has_role(auth.uid(), 'agent') OR public.has_role(auth.uid(), 'admin'))
    )
    AND (is_visible_to_customer = true OR public.has_role(auth.uid(), 'agent') OR public.has_role(auth.uid(), 'admin'))
  );

CREATE POLICY "Users can create messages for their tickets"
  ON public.chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.tickets
      WHERE tickets.id = chat_messages.ticket_id
      AND (tickets.customer_id = auth.uid() OR public.has_role(auth.uid(), 'agent') OR public.has_role(auth.uid(), 'admin'))
    )
  );

-- RLS Policies for ai_responses
CREATE POLICY "Agents and admins can view AI responses"
  ON public.ai_responses FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'agent') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "System can create AI responses"
  ON public.ai_responses FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Agents can update AI responses"
  ON public.ai_responses FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'agent') OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for analytics
CREATE POLICY "Users can view their own analytics"
  ON public.analytics FOR SELECT
  TO authenticated
  USING (auth.uid() = owner_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage analytics"
  ON public.analytics FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for ai_insights
CREATE POLICY "Agents and admins can view AI insights"
  ON public.ai_insights FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'agent') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "System can create AI insights"
  ON public.ai_insights FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for knowledge_base
CREATE POLICY "Users can view published knowledge base articles"
  ON public.knowledge_base FOR SELECT
  TO authenticated
  USING (is_published = true OR public.has_role(auth.uid(), 'agent') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Agents can create knowledge base articles"
  ON public.knowledge_base FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'agent') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authors and admins can update articles"
  ON public.knowledge_base FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id OR public.has_role(auth.uid(), 'admin'));

-- Insert default subscription plans
INSERT INTO public.subscription_plans (plan_name, monthly_price, max_tickets, ai_calls_per_month)
VALUES 
  ('Free', 0.00, 10, 100),
  ('Pro', 49.99, 100, 1000),
  ('Enterprise', 199.99, 1000, 10000);
