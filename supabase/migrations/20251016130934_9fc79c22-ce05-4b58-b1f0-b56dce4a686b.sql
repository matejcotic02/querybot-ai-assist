-- Insert dummy analytics data for testing
INSERT INTO public.analytics (metric_name, metric_value, period_start, period_end) VALUES
-- Response Time metrics (in seconds)
('avg_response_time', 45, NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),
('avg_response_time', 38, NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
('avg_response_time', 42, NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),
('avg_response_time', 35, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
('avg_response_time', 40, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
('avg_response_time', 32, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
('avg_response_time', 30, NOW(), NOW()),

-- Ticket Volume metrics
('ticket_volume', 24, NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),
('ticket_volume', 32, NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
('ticket_volume', 28, NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),
('ticket_volume', 45, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
('ticket_volume', 38, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
('ticket_volume', 42, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
('ticket_volume', 36, NOW(), NOW()),

-- AI Resolution Rate (percentage)
('ai_resolution_rate', 65, NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),
('ai_resolution_rate', 68, NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
('ai_resolution_rate', 72, NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),
('ai_resolution_rate', 75, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
('ai_resolution_rate', 78, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
('ai_resolution_rate', 80, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
('ai_resolution_rate', 82, NOW(), NOW()),

-- Customer Satisfaction (0-10 scale)
('customer_satisfaction', 8.2, NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),
('customer_satisfaction', 8.5, NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
('customer_satisfaction', 8.4, NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),
('customer_satisfaction', 8.8, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
('customer_satisfaction', 9.0, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
('customer_satisfaction', 8.9, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
('customer_satisfaction', 9.2, NOW(), NOW()),

-- Active Users
('active_users', 450, NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),
('active_users', 520, NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
('active_users', 580, NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),
('active_users', 610, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
('active_users', 650, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
('active_users', 720, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
('active_users', 780, NOW(), NOW());