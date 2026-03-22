-- ══════════════════════════════════════════════
-- STYLARKX DATABASE SETUP
-- ══════════════════════════════════════════════

-- Create database
CREATE DATABASE IF NOT EXISTS stylarkx_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- Use database
USE stylarkx_db;

-- Tables are created automatically by SQLAlchemy
-- Run the FastAPI app to create tables: python run.py
