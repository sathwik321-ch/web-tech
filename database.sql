CREATE DATABASE IF NOT EXISTS startup_fund;
USE startup_fund;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    user_type ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE programs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    funding_min DECIMAL(10,2),
    funding_max DECIMAL(10,2),
    equity_min DECIMAL(5,2),
    equity_max DECIMAL(5,2),
    contact_email VARCHAR(100),
    contact_phone VARCHAR(20),
    contact_website VARCHAR(255),
    contact_address TEXT,
    image_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE program_details (
    id INT PRIMARY KEY AUTO_INCREMENT,
    program_id INT,
    detail_type ENUM('agenda', 'eligibility', 'process', 'benefits'),
    detail_text TEXT,
    FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE
);

CREATE TABLE applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    program_id INT,
    startup_name VARCHAR(100) NOT NULL,
    startup_stage VARCHAR(50),
    industry VARCHAR(50),
    description TEXT,
    funding_needed DECIMAL(10,2),
    current_revenue DECIMAL(10,2),
    team_size INT,
    pitch_deck_path VARCHAR(255),
    financials_path VARCHAR(255),
    incorporation_doc_path VARCHAR(255),
    status ENUM('pending', 'under_review', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (program_id) REFERENCES programs(id)
);

CREATE TABLE contact_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(200),
    message TEXT,
    status ENUM('unread', 'read') DEFAULT 'unread',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);