# 🎓 Student Management System

A simple full-stack CRUD app for managing student records. Built as a practice project to learn Laravel.

## Tech Stack

- **Backend:** Laravel 11 (PHP)
- **Frontend:** React (Vite)
- **Database:** Supabase (PostgreSQL)
- **API Communication:** Axios

## Run

```bash
# Backend
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```
