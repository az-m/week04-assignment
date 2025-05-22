-- create table

CREATE TABLE messages (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT,
  location TEXT,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
);

-- insert data

INSERT INTO messages (name, location, content) VALUES ('Test', 'Norwich', 'Testing timestamp')