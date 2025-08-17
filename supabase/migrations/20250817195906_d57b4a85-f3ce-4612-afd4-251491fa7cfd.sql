-- Create content tables for the portfolio
CREATE TABLE public.hero_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  github_url TEXT,
  live_url TEXT,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.experience (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  duration TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.education (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  duration TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin users table for authentication
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to content
CREATE POLICY "Public can view hero content" ON public.hero_content FOR SELECT USING (true);
CREATE POLICY "Public can view skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public can view experience" ON public.experience FOR SELECT USING (true);
CREATE POLICY "Public can view education" ON public.education FOR SELECT USING (true);
CREATE POLICY "Public can view published blogs" ON public.blogs FOR SELECT USING (published = true);

-- Create policies for admin access (authenticated users only)
CREATE POLICY "Authenticated users can manage hero content" ON public.hero_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage skills" ON public.skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage experience" ON public.experience FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage education" ON public.education FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage blogs" ON public.blogs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can view admin users" ON public.admin_users FOR SELECT USING (auth.role() = 'authenticated');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_hero_content_updated_at BEFORE UPDATE ON public.hero_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON public.skills FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_experience_updated_at BEFORE UPDATE ON public.experience FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_education_updated_at BEFORE UPDATE ON public.education FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON public.blogs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default content
INSERT INTO public.hero_content (name, title, description) VALUES 
('Alex Johnson', 'Frontend Developer & UI/UX Enthusiast', 'Passionate about creating beautiful, functional, and user-centered digital experiences. With a strong foundation in modern web technologies and design principles.');

INSERT INTO public.skills (name, icon) VALUES 
('React', 'Code'),
('TypeScript', 'FileCode'),
('JavaScript', 'Zap'),
('Node.js', 'Server'),
('Python', 'Terminal'),
('PostgreSQL', 'Database'),
('Tailwind CSS', 'Palette'),
('Figma', 'Paintbrush');

INSERT INTO public.projects (title, description, image_url, github_url, live_url, technologies) VALUES 
('E-Commerce Platform', 'A full-stack e-commerce solution with modern UI/UX, built with React and Node.js. Features include user authentication, payment integration, and admin dashboard.', '/src/assets/project-1.jpg', 'https://github.com', 'https://example.com', ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe']),
('Task Management App', 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.', '/src/assets/project-2.jpg', 'https://github.com', 'https://example.com', ARRAY['React', 'TypeScript', 'Socket.io', 'MongoDB']),
('Weather Dashboard', 'A responsive weather dashboard that provides detailed forecasts, interactive maps, and historical weather data visualization.', '/src/assets/project-3.jpg', 'https://github.com', 'https://example.com', ARRAY['React', 'D3.js', 'OpenWeather API', 'Chart.js']);

INSERT INTO public.experience (company, position, duration, description) VALUES 
('TechCorp Solutions', 'Senior Frontend Developer', '2022 - Present', 'Lead frontend development for enterprise applications, mentoring junior developers, and implementing modern React architectures with TypeScript.'),
('Digital Innovations Inc.', 'Frontend Developer', '2020 - 2022', 'Developed responsive web applications using React and Vue.js, collaborated with design teams to implement pixel-perfect UIs, and optimized application performance.'),
('StartupXYZ', 'Junior Developer', '2019 - 2020', 'Built user interfaces for web applications, participated in code reviews, and learned modern development practices in an agile environment.');

INSERT INTO public.education (institution, degree, duration, description) VALUES 
('University of Technology', 'Bachelor of Science in Computer Science', '2015 - 2019', 'Focused on software engineering, data structures, algorithms, and web development. Graduated with honors and completed a senior project in full-stack development.'),
('Online Learning Platform', 'Full Stack Web Development Certificate', '2019', 'Completed intensive bootcamp covering modern web development technologies including React, Node.js, and database management.');

-- Insert default admin user (password: admin123)
-- Note: In production, this should be properly hashed
INSERT INTO public.admin_users (email, password_hash) VALUES 
('admin@example.com', '$2b$10$rOzJZ8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8');