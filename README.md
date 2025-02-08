# 🚀 Monorepo with Nx, pnpm, React, and Django

This repository is a fullstack monorepo using **Nx**, **pnpm**, **React (Vite)** for the frontend, and **Django (Poetry, PostgreSQL)** for the backend.

## 📂 Project Structure

```
.
├── backend/            # Django backend (managed with Poetry)
│   ├── core/           # Django project files
│   ├── pyproject.toml  # Poetry dependencies
│   ├── manage.py       # Django management script
│   ├── Dockerfile      # Backend Docker configuration
│   └── ...
│
├── frontend/           # React frontend (Vite, TypeScript, Tailwind)
│   ├── src/            # Frontend source code
│   ├── package.json    # Frontend dependencies
│   ├── Dockerfile      # Frontend Docker configuration
│   └── ...
│
├── nx.json             # Nx workspace configuration
├── pnpm-workspace.yaml # pnpm workspace config
├── docker-compose.yml  # Compose setup for local development
└── README.md           # This file
```

---

## 🛠️ Installation

### **1️⃣ Install Global Dependencies**

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS recommended)
- [pnpm](https://pnpm.io/):
  ```sh
  npm install -g pnpm
  ```
- [Python](https://www.python.org/) (3.10+ recommended)
- [Poetry](https://python-poetry.org/):
  ```sh
  curl -sSL https://install.python-poetry.org | python3 -
  ```
- [Docker](https://www.docker.com/)

### **3️⃣ Install Dependencies**

```sh
pnpm install     # Install frontend dependencies
cd backend && poetry install  # Install backend dependencies
```

---

## 🚀 Running the Project

### **Run with Nx (Local Development)**

**Start the backend:**

```sh
pnpm nx run backend:serve
```

**Start the frontend:**

```sh
pnpm nx run frontend:serve
```

---

## 🐳 Running with Docker

```sh
docker-compose up --build
```

This will:
- Start the **backend** (Django + PostgreSQL)

---

## 📦 Managing Dependencies

### **Frontend (React, Vite, TypeScript)**

```sh
pnpm add <package> --filter=frontend   # Install dependency
pnpm add <package> --filter=frontend --save-dev  # Install dev dependency
pnpm remove <package> --filter=frontend  # Remove dependency
```

### **Backend (Django, Python, Poetry)**

```sh
cd backend
poetry add <package>   # Install dependency
poetry add <package> --group dev   # Install dev dependency
poetry remove <package>   # Remove dependency
poetry show   # List installed dependencies
```

---

## 🛠 Useful Commands

```sh
pnpm nx run frontend:build   # Build frontend
pnpm nx run backend:migrate  # Apply Django migrations
pnpm nx run backend:serve    # Start Django server
pnpm nx run frontend:serve   # Start React app
```

To see all available commands:

```sh
pnpm nx show projects
```

---

## ✨ Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch`
3. Commit your changes: `git commit -m "Add feature"`
4. Push the branch: `git push origin feature-branch`
5. Create a pull request

---

## 📝 License

This project is licensed under the MIT License. See `LICENSE` for details.