# 🎓 Student Management System

![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-Vite-61DAFB?logo=react&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white)

A simple full-stack CRUD app for managing student records. Built as a practice project to learn Laravel.

## ✨ Features

- Add, view, update, and delete student records
- REST API built with Laravel
- React frontend connected through Axios
- Data stored in Supabase (PostgreSQL)

## 🚀 Tech Stack

| Layer             | Technology            |
| ----------------- | --------------------- |
| Backend           | Laravel 11 (PHP)      |
| Frontend          | React (Vite)          |
| Database          | Supabase (PostgreSQL) |
| API Communication | Axios                 |

## ⚙️ Run Locally

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

## 🔗 API Endpoints

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| GET    | `/api/students`      | List all students |
| POST   | `/api/students`      | Add a student     |
| GET    | `/api/students/{id}` | View a student    |
| PUT    | `/api/students/{id}` | Update a student  |
| DELETE | `/api/students/{id}` | Delete a student  |
