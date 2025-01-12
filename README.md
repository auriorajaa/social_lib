# Social Lib

Social Lib is a small-scale social media project inspired by Twitter. It allows users to follow and unfollow other users, create text-only posts, edit their profiles, and search for other users.

While it focuses on simplicity, Social Lib does not include features like image uploads or messaging. This project showcases the core functionalities of a social media platform in a streamlined and user-friendly manner.

### Technologies Used:
- **Frontend**: React.js, Chakra UI 2.8
- **Backend**: Django REST Framework
- **Authentication**: JWT
- **Database**: SQLite

## Overview
![screencapture-localhost-3000-login-2025-01-11-21_17_20](https://github.com/user-attachments/assets/8d9abbc7-b2b0-4ca0-8f7c-9b70aa0f6a79)
![screencapture-localhost-3000-register-2025-01-11-21_18_20](https://github.com/user-attachments/assets/ec1eccdb-a6a6-48e5-9c24-95bc02d5f5b9)
![screencapture-localhost-3000-2025-01-12-10_22_55](https://github.com/user-attachments/assets/d70e89f7-dce4-4ee8-9473-e2921a1023b9)
![screencapture-localhost-3000-aurioking-2025-01-12-10_23_11](https://github.com/user-attachments/assets/baaae1d6-57b1-4022-a854-f53b04bf13e2)
![screencapture-localhost-3000-auriorajaa-2025-01-12-10_23_27](https://github.com/user-attachments/assets/4d027d63-ca2c-4afb-8d8d-2c0e0675acc1)
![screencapture-localhost-3000-search-2025-01-11-21_22_11](https://github.com/user-attachments/assets/f396a94e-0a49-4c49-9e72-dfb06dab355c)
![screencapture-localhost-3000-settings-2025-01-11-21_23_31](https://github.com/user-attachments/assets/c5ae6beb-970a-4bd4-9e12-08a69216332c)
![screencapture-localhost-3000-settings-2025-01-11-21_23_41](https://github.com/user-attachments/assets/7b6162d4-06c3-4098-980b-22c210a36ad8)
![screencapture-localhost-3000-settings-2025-01-11-21_23_48](https://github.com/user-attachments/assets/5054855a-ffed-46df-b096-07135ed1a659)

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Run the Project Locally](#run-the-project-locally)
4. [Folder Structure](#folder-structure)
5. [Frontend Dependencies](#frontend-dependencies)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:
- Python (3.8 or higher recommended)
- Node.js (Latest LTS version recommended)
- npm (Comes with Node.js)
- Git

## Installation

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/auriorajaa/social_lib.git

# Navigate to the project directory
cd social_lib
```

### 2. Backend Setup

```bash
# Create and activate virtual environment
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate

# Navigate to backend directory
cd backend

# Install backend dependencies
pip install -r requirements.txt

# Apply database migrations
python manage.py migrate

# Create a superuser (Admin)
python manage.py createsuperuser

# Start the backend server
python manage.py runserver
```

The backend will be running at http://localhost:8000

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
# Navigate to frontend directory from project root
cd frontend

# Install frontend dependencies
npm install

# Start the frontend development server
npm start
```

The frontend will be running at http://localhost:3000

## Frontend Dependencies

The project uses the following major frontend dependencies:
```json
{
  "dependencies": {
    "@chakra-ui/icons": "^2.2.4",
    "@chakra-ui/react": "2.8",
    "axios": "^1.7.9",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-icons": "^5.4.0",
    "react-router-dom": "^7.1.1",
    "react-scripts": "5.0.1"
  }
}
```

## Folder Structure

```
social_lib/
│
├── backend/              # Django REST Framework backend
│   ├── manage.py        # Django management file
│   ├── requirements.txt # Python dependencies
│   └── ...              # Other Django files
│
├── frontend/            # React.js frontend
│   ├── package.json    # Node.js dependencies
│   ├── public/         # Public assets
│   └── src/            # React components and code
│
├── venv/               # Virtual environment (Not included in repo)
└── requirements.txt    # Python dependencies
```

## Troubleshooting

### Backend Issues:
1. If you get a database error, try:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

2. If you get a module not found error, ensure you're in your virtual environment and have installed all requirements:
   ```bash
   pip install -r requirements.txt
   ```

### Frontend Issues:
1. If you get node module errors:
   ```bash
   # Remove node_modules and reinstall
   rm -rf node_modules
   npm install
   ```

2. If you get version compatibility issues:
   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   npm install
   ```

## Contributing

Feel free to open issues and pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is open-source and available under the MIT License. See the LICENSE file for more details.
