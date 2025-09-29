-- Create profiles table for admin users
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Profiles viewable by authenticated users"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT,
  description TEXT,
  client TEXT,
  start_date DATE,
  end_date DATE,
  tags TEXT[],
  cover_image_path TEXT,
  gallery_paths JSONB DEFAULT '[]'::jsonb,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Projects policies (public read, admin write)
CREATE POLICY "Projects viewable by everyone"
  ON public.projects FOR SELECT
  USING (published = true OR auth.role() = 'authenticated');

CREATE POLICY "Admins can insert projects"
  ON public.projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update projects"
  ON public.projects FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Admins can delete projects"
  ON public.projects FOR DELETE
  TO authenticated
  USING (true);

-- Create services table
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon_path TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Services viewable by everyone"
  ON public.services FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage services"
  ON public.services FOR ALL
  TO authenticated
  USING (true);

-- Create team table
CREATE TABLE public.team (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  bio TEXT,
  photo_path TEXT,
  linked_in TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.team ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team viewable by everyone"
  ON public.team FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage team"
  ON public.team FOR ALL
  TO authenticated
  USING (true);

-- Create contacts table
CREATE TABLE public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert contacts"
  ON public.contacts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view contacts"
  ON public.contacts FOR SELECT
  TO authenticated
  USING (true);

-- Create posts table for blog/news
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  published_at TIMESTAMPTZ,
  author_id UUID REFERENCES public.profiles(id),
  cover_image_path TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published posts viewable by everyone"
  ON public.posts FOR SELECT
  USING (published = true OR auth.role() = 'authenticated');

CREATE POLICY "Admins can manage posts"
  ON public.posts FOR ALL
  TO authenticated
  USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('project-images', 'project-images', true);

INSERT INTO storage.buckets (id, name, public) 
VALUES ('team-photos', 'team-photos', true);

INSERT INTO storage.buckets (id, name, public) 
VALUES ('service-icons', 'service-icons', true);

-- Storage policies for project-images
CREATE POLICY "Project images publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-images');

CREATE POLICY "Admins can upload project images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Admins can update project images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'project-images');

CREATE POLICY "Admins can delete project images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'project-images');

-- Storage policies for team-photos
CREATE POLICY "Team photos publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'team-photos');

CREATE POLICY "Admins can manage team photos"
  ON storage.objects FOR ALL
  TO authenticated
  WITH CHECK (bucket_id = 'team-photos');

-- Storage policies for service-icons
CREATE POLICY "Service icons publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'service-icons');

CREATE POLICY "Admins can manage service icons"
  ON storage.objects FOR ALL
  TO authenticated
  WITH CHECK (bucket_id = 'service-icons');

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger for auto-creating profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();