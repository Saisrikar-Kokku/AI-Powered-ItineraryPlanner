-- AI-Powered Itinerary Planner Database Schema
-- Run this SQL in your Supabase SQL editor to set up the database

-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table (for future authentication)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create itineraries table (for future features)
CREATE TABLE IF NOT EXISTS itineraries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    destination TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    budget DECIMAL(10,2),
    travelers INTEGER DEFAULT 1,
    preferences JSONB,
    itinerary_data JSONB,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create destinations table (for future features)
CREATE TABLE IF NOT EXISTS destinations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    city TEXT,
    coordinates POINT,
    description TEXT,
    attractions JSONB,
    best_time_to_visit TEXT,
    average_cost DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create activities table (for future features)
CREATE TABLE IF NOT EXISTS activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    location TEXT,
    coordinates POINT,
    category TEXT,
    duration_hours DECIMAL(4,2),
    cost_range TEXT,
    rating DECIMAL(3,2),
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_itineraries_user_id ON itineraries(user_id);
CREATE INDEX IF NOT EXISTS idx_itineraries_destination ON itineraries(destination);
CREATE INDEX IF NOT EXISTS idx_destinations_country ON destinations(country);
CREATE INDEX IF NOT EXISTS idx_activities_category ON activities(category);
CREATE INDEX IF NOT EXISTS idx_activities_location ON activities(location);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Allow anyone to insert into waitlist
CREATE POLICY "Allow public waitlist signup" ON waitlist
    FOR INSERT WITH CHECK (true);

-- Allow users to read their own data
CREATE POLICY "Users can read own data" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Allow users to manage their own itineraries
CREATE POLICY "Users can manage own itineraries" ON itineraries
    FOR ALL USING (auth.uid() = user_id);

-- Allow public read access to destinations and activities
CREATE POLICY "Public can read destinations" ON destinations
    FOR SELECT USING (true);

CREATE POLICY "Public can read activities" ON activities
    FOR SELECT USING (true);

-- Create functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_waitlist_updated_at BEFORE UPDATE ON waitlist
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_itineraries_updated_at BEFORE UPDATE ON itineraries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_destinations_updated_at BEFORE UPDATE ON destinations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON activities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for destinations (optional)
INSERT INTO destinations (name, country, city, description, best_time_to_visit, average_cost) VALUES
('Tokyo', 'Japan', 'Tokyo', 'A vibrant metropolis blending traditional culture with modern innovation', 'Spring (March-May) and Fall (September-November)', 150.00),
('Paris', 'France', 'Paris', 'The City of Light, famous for its art, fashion, and cuisine', 'Spring (April-June) and Fall (September-November)', 200.00),
('New York City', 'United States', 'New York', 'The city that never sleeps, offering endless entertainment and culture', 'Spring (April-June) and Fall (September-November)', 250.00),
('London', 'United Kingdom', 'London', 'A historic city with royal palaces, world-class museums, and diverse neighborhoods', 'Spring (March-May) and Fall (September-November)', 180.00),
('Barcelona', 'Spain', 'Barcelona', 'A Mediterranean city known for its architecture, beaches, and vibrant culture', 'Spring (April-June) and Fall (September-November)', 120.00)
ON CONFLICT DO NOTHING;

-- Insert sample activities (optional)
INSERT INTO activities (name, description, location, category, duration_hours, cost_range, rating, tags) VALUES
('Senso-ji Temple Visit', 'Visit Tokyo''s oldest temple and explore the traditional Nakamise shopping street', 'Asakusa, Tokyo', 'Cultural', 2.5, '$5-15', 4.8, ARRAY['temple', 'shopping', 'traditional']),
('Eiffel Tower Tour', 'Iconic iron lattice tower offering panoramic views of Paris', 'Champ de Mars, Paris', 'Sightseeing', 3.0, '$20-40', 4.6, ARRAY['landmark', 'views', 'iconic']),
('Central Park Walk', 'Explore the heart of Manhattan''s green oasis', 'Central Park, New York', 'Nature', 2.0, 'Free', 4.7, ARRAY['park', 'nature', 'free']),
('British Museum Tour', 'World-famous museum housing millions of artifacts', 'Bloomsbury, London', 'Museum', 4.0, '$15-25', 4.5, ARRAY['museum', 'history', 'art']),
('Sagrada Familia Visit', 'Gaudi''s unfinished masterpiece and UNESCO World Heritage site', 'Eixample, Barcelona', 'Architecture', 2.5, '$20-35', 4.9, ARRAY['architecture', 'gaudi', 'unesco'])
ON CONFLICT DO NOTHING;
