CREATE TABLE t_p83688171_bogatov_travel_proje.leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  tour VARCHAR(255),
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);