-- Add platform column to profiles table to track customer source
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS source_platform text;

-- Create platform analytics table
CREATE TABLE IF NOT EXISTS public.platform_analytics (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  platform_name text NOT NULL,
  customer_count integer NOT NULL DEFAULT 0,
  icon_name text NOT NULL,
  growth_rate numeric DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.platform_analytics ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view platform analytics" 
ON public.platform_analytics 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage platform analytics" 
ON public.platform_analytics 
FOR ALL
USING (has_role(auth.uid(), 'admin'::user_role));

-- Insert dummy data for social media platforms
INSERT INTO public.platform_analytics (platform_name, customer_count, icon_name, growth_rate) VALUES
('Facebook', 1250, 'facebook', 12.5),
('Instagram', 980, 'instagram', 18.3),
('Twitter', 650, 'twitter', 8.7),
('LinkedIn', 420, 'linkedin', 15.2),
('TikTok', 890, 'music', 25.6),
('YouTube', 340, 'youtube', 6.4),
('WhatsApp', 560, 'message-circle', 10.8),
('Telegram', 280, 'send', 14.1);

-- Add trigger for updated_at
CREATE TRIGGER update_platform_analytics_updated_at
BEFORE UPDATE ON public.platform_analytics
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();