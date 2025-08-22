-- Create admin user for login (email: admin@example.com, password: admin123)
-- Hash generated using bcrypt with 10 rounds
INSERT INTO public.admin_users (email, password_hash) 
VALUES ('admin@example.com', '$2b$10$rJ8.7kZqGjB8vQN5fZzF7OXvnXpVJ8F5Y1iE3p2Kl7vJ2gF9qE.8S')
ON CONFLICT (email) DO NOTHING;