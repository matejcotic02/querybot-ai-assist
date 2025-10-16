-- Create revenues table
CREATE TABLE IF NOT EXISTS public.revenues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  amount numeric NOT NULL,
  period text NOT NULL,
  growth_rate numeric NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Create customer_feedback table
CREATE TABLE IF NOT EXISTS public.customer_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name text NOT NULL,
  score integer NOT NULL CHECK (score >= 0 AND score <= 10),
  date timestamp with time zone DEFAULT now()
);

-- Create chats table
CREATE TABLE IF NOT EXISTS public.chats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name text NOT NULL,
  message text NOT NULL,
  sender_type text NOT NULL CHECK (sender_type IN ('user', 'AI')),
  timestamp timestamp with time zone DEFAULT now()
);

-- Create insights table
CREATE TABLE IF NOT EXISTS public.insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  revenue_growth numeric NOT NULL,
  top_product text NOT NULL,
  customer_churn numeric NOT NULL,
  description text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.revenues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insights ENABLE ROW LEVEL SECURITY;

-- Create policies for revenues
CREATE POLICY "Users can view revenues"
  ON public.revenues FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert revenues"
  ON public.revenues FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::user_role));

-- Create policies for customer_feedback
CREATE POLICY "Users can view feedback"
  ON public.customer_feedback FOR SELECT
  USING (true);

CREATE POLICY "Users can insert feedback"
  ON public.customer_feedback FOR INSERT
  WITH CHECK (true);

-- Create policies for chats
CREATE POLICY "Users can view chats"
  ON public.chats FOR SELECT
  USING (true);

CREATE POLICY "Users can insert chats"
  ON public.chats FOR INSERT
  WITH CHECK (true);

-- Create policies for insights
CREATE POLICY "Users can view insights"
  ON public.insights FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert insights"
  ON public.insights FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::user_role));

-- Enable realtime for chats table
ALTER PUBLICATION supabase_realtime ADD TABLE public.chats;