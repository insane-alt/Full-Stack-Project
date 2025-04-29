# Full Stack MERN Project

This is a full-stack web application built using the **MERN stack** (MongoDB, Express.js, React, Node.js). The project demonstrates a modern web application with a responsive frontend, a robust backend API, and containerization using Docker for both frontend and backend. The backend also integrates **Prometheus** for monitoring and metrics collection.

[Demo Video](https://drive.google.com/drive/folders/1wEHc-u-H6kUfU3XYhKdle-J6xyA6B4wT?usp=sharing)

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Local Development](#local-development)
  - [Docker Setup](#docker-setup)
  - [Prometheus Monitoring](#prometheus-monitoring)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Authentication**: Secure user registration and login using JWT.
- **CRUD Operations**: Create, read, update, and delete resources via RESTful APIs.
- **Responsive UI**: A dynamic and responsive frontend built with React and Tailwind CSS.
- **Containerization**: Both frontend and backend are containerized using Docker for consistent deployment.
- **Monitoring**: Backend metrics are exposed and monitored using Prometheus.
- **Scalable Architecture**: Modular code structure for easy maintenance and scalability.

## Tech Stack

### Frontend
- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: Promise-based HTTP client for API requests.
- **React Router**: Declarative routing for React applications.
- **Vite**: Next-generation frontend tooling for fast development and builds.

### Backend
- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **JWT**: JSON Web Tokens for secure authentication.
- **Prometheus**: Monitoring system for collecting and querying metrics.
- **Docker**: Containerization platform for consistent deployment.

### DevOps
- **Docker**: Containerization for both frontend and backend.
- **Docker Compose**: Orchestration for multi-container Docker applications.
- **Prometheus**: Metrics collection and monitoring for the backend.

## Project Structure
```
Full-Stack-Project/
├── backend/
│   ├── src/
│   │   ├── controllers/     # API logic
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Authentication and error handling
│   │   └── config/          # Database and environment config
│   ├── Dockerfile           # Backend Docker configuration
│   ├── prometheus.yml       # Prometheus configuration
│   └── package.json         # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service calls
│   │   └── assets/          # Static assets (images, etc.)
│   ├── Dockerfile           # Frontend Docker configuration
│   └── package.json         # Frontend dependencies
├── docker-compose.yml       # Docker Compose configuration
└── README.md                # Project documentation
```

## Prerequisites
- **Node.js** (v16 or higher)
- **Docker** and **Docker Compose**
- **MongoDB** (local or MongoDB Atlas)
- **Git**

## Setup Instructions

### Local Development

1. **Clone the Repository**
   ```bash
   git clone https://github.com/insane-alt/Full-Stack-Project.git
   cd Full-Stack-Project
   ```

2. **Backend Setup**
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `backend/` directory with the following:
     ```
     PORT=5000
     MONGO_URI=mongodb://localhost:27017/fullstackdb
     JWT_SECRET=your_jwt_secret
     ```
   - Start the backend server:
     ```bash
     npm run dev
     ```

3. **Frontend Setup**
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `frontend/` directory with the following:
     ```
     VITE_API_URL=http://localhost:5000/api
     ```
   - Start the frontend development server:
     ```bash
     npm run dev
     ```

4. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000/api`

### Docker Setup

1. **Ensure Docker and Docker Compose are installed**
   - Verify installation:
     ```bash
     docker --version
     docker-compose --version
     ```

2. **Build and Run Containers**
   - From the project root, run:
    Brightness and Contrast Adjustment
     ```bash
     docker-compose up --build
     ```
   - This will:
     - Build and start the frontend container (React app on port `5173`).
     - Build and start the backend container (Node.js API on port `5000`).
     - Start a MongoDB container (on port `27017`).

3. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000/api`
   - MongoDB: `mongodb://localhost:27017`

4. **Stop Containers**
   - To stop and remove containers:
     ```bash
     docker-compose down
     ```

### Prometheus Monitoring

The backend is integrated with Prometheus to collect and monitor metrics such as request latency, error rates, and system performance.

1. **Prometheus Configuration**
   - The `prometheus.yml` file in the `backend/` directory configures Prometheus to scrape metrics from the backend.
   - Example `prometheus.yml`:
     ```yaml
     global:
       scrape_interval: 15s
     scrape_configs:
       - job_name: 'backend'
         static_configs:
           - targets: ['backend:5000']
     ```

2. **Expose Metrics Endpoint**
   - The backend exposes a `/metrics` endpoint for Prometheus to scrape. Ensure the endpoint is accessible in your backend code (e.g., using the `prom-client` library).

3. **Run Prometheus with Docker**
   - The `docker-compose.yml` includes a Prometheus service. Ensure it’s configured as follows:
     ```yaml
     version: '3.8'
     services:
       frontend:
         build: ./frontend
         ports:
           - "5173:5173"
       backend:
         build: ./backend
         ports:
           - "5000:5000"
         environment:
           - MONGO_URI=mongodb://mongo:27017/fullstackdb
         depends_on:
           - mongo
       mongo:
         image: mongo:latest
         ports:
           - "27017:27017"
       prometheus:
         image: prom/prometheus:latest
         ports:
           - "9090:9090"
         volumes:
           - ./backend/prometheus.yml:/etc/prometheus/prometheus.yml
     ```
   - Start the services:
     ```bash
     docker-compose up
     ```

4. **Access Prometheus**
   - Open `http://localhost:9090` to view the Prometheus dashboard.
   - Query metrics such as `http_requests_total` or `nodejs_eventloop_lag_seconds`.

## API Endpoints
Here are some example API endpoints (update based on your actual implementation):

- **Auth**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Login and receive JWT
- **Resources**
  - `GET /api/resources` - Get all resources
  - `POST /api/resources` - Create a new resource
  - `PUT /api/resources/:id` - Update a resource
  - `DELETE /api/resources/:id` - Delete a resource

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
