-- Migration File: Create Students and Marks schema

-- Enable the UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create students table
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create marks table
CREATE TABLE marks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL,
    subject VARCHAR(100) NOT NULL,
    score SMALLINT NOT NULL CHECK (score >= 0 AND score <= 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign Key Constraint enforcing referential integrity and cascade deletion
    CONSTRAINT fk_student
      FOREIGN KEY(student_id) 
      REFERENCES students(id)
      ON DELETE CASCADE
);

-- 3. Create Performance Indexes
-- Index on email since it's used for unique checks and potentially lookups
CREATE INDEX idx_students_email ON students(email);
-- Index on student_id in marks table to drastically speed up fetching a student's marks
CREATE INDEX idx_marks_student_id ON marks(student_id);
