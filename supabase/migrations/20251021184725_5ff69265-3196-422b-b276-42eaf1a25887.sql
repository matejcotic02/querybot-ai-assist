-- Create incidents table for Real-Time Incident Monitor
CREATE TABLE IF NOT EXISTS public.incidents (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  status text NOT NULL CHECK (status IN ('open', 'in_progress', 'resolved')),
  severity text NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  resolved_at timestamp with time zone,
  assigned_to uuid REFERENCES auth.users(id),
  description text
);

-- Create diagnostics table for AI Diagnostics & Suggestions
CREATE TABLE IF NOT EXISTS public.diagnostics (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  incident_id uuid REFERENCES public.incidents(id),
  summary text NOT NULL,
  ai_suggestion text NOT NULL,
  confidence_score numeric CHECK (confidence_score >= 0 AND confidence_score <= 100),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  applied boolean DEFAULT false,
  category text
);

-- Create technicians table for Technician Performance Board
CREATE TABLE IF NOT EXISTS public.technicians (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) UNIQUE NOT NULL,
  name text NOT NULL,
  avatar_url text,
  tickets_resolved integer DEFAULT 0,
  tickets_open integer DEFAULT 0,
  avg_resolution_time_hours numeric,
  rating numeric CHECK (rating >= 0 AND rating <= 5),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create system_health table for System Health Overview
CREATE TABLE IF NOT EXISTS public.system_health (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  component text NOT NULL CHECK (component IN ('server', 'network', 'database', 'ai_engine')),
  status text NOT NULL CHECK (status IN ('healthy', 'warning', 'critical')),
  uptime_percentage numeric CHECK (uptime_percentage >= 0 AND uptime_percentage <= 100),
  response_time_ms numeric,
  last_check timestamp with time zone NOT NULL DEFAULT now(),
  metrics jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnostics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_health ENABLE ROW LEVEL SECURITY;

-- RLS Policies for incidents
CREATE POLICY "Agents and admins can view incidents" 
ON public.incidents FOR SELECT 
USING (has_role(auth.uid(), 'agent'::user_role) OR has_role(auth.uid(), 'admin'::user_role));

CREATE POLICY "Agents and admins can insert incidents" 
ON public.incidents FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'agent'::user_role) OR has_role(auth.uid(), 'admin'::user_role));

CREATE POLICY "Agents and admins can update incidents" 
ON public.incidents FOR UPDATE 
USING (has_role(auth.uid(), 'agent'::user_role) OR has_role(auth.uid(), 'admin'::user_role));

-- RLS Policies for diagnostics
CREATE POLICY "Agents and admins can view diagnostics" 
ON public.diagnostics FOR SELECT 
USING (has_role(auth.uid(), 'agent'::user_role) OR has_role(auth.uid(), 'admin'::user_role));

CREATE POLICY "System can create diagnostics" 
ON public.diagnostics FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Agents can update diagnostics" 
ON public.diagnostics FOR UPDATE 
USING (has_role(auth.uid(), 'agent'::user_role) OR has_role(auth.uid(), 'admin'::user_role));

-- RLS Policies for technicians
CREATE POLICY "Everyone can view technicians" 
ON public.technicians FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage technicians" 
ON public.technicians FOR ALL 
USING (has_role(auth.uid(), 'admin'::user_role));

-- RLS Policies for system_health
CREATE POLICY "Everyone can view system health" 
ON public.system_health FOR SELECT 
USING (true);

CREATE POLICY "System can update health metrics" 
ON public.system_health FOR INSERT 
WITH CHECK (true);

CREATE POLICY "System can update health status" 
ON public.system_health FOR UPDATE 
USING (true);

-- Create indexes for performance
CREATE INDEX idx_incidents_status ON public.incidents(status);
CREATE INDEX idx_incidents_created_at ON public.incidents(created_at DESC);
CREATE INDEX idx_diagnostics_incident_id ON public.diagnostics(incident_id);
CREATE INDEX idx_technicians_user_id ON public.technicians(user_id);
CREATE INDEX idx_system_health_component ON public.system_health(component);
CREATE INDEX idx_system_health_last_check ON public.system_health(last_check DESC);

-- Trigger for updating technicians updated_at
CREATE TRIGGER update_technicians_updated_at
BEFORE UPDATE ON public.technicians
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();