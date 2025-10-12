# 🛫 Airline Booking System — Microservices Architecture  

## 📘 Overview  
The **Airline Booking System** is a **microservices-based backend project** designed to handle flight management, bookings, and email reminders in a scalable and fault-tolerant way.  
It demonstrates real-world backend architecture principles including **service decoupling**, **event-driven communication**, and **secure API gateway orchestration**.  

Built using **Node.js**, **Express.js**, **MySQL**, **Sequelize**, and **RabbitMQ**, the system follows a clean, modular structure with separate services for **Flights**, **Bookings**, **Reminders**, and **API Gateway**.  

---

## 🧩 System Features  
- ✈️ **Flights Service** — Handles airplane, airport, city, and flight management.  
- 🎟️ **Booking Service** — Manages bookings with transactional integrity and idempotency.  
- 📧 **Reminder Service** — Sends email notifications for bookings using RabbitMQ queues.  
- 🚪 **API Gateway** — Routes and secures all traffic using JWT authentication and RBAC.  
- 🧮 **Microservice Communication** — HTTP and message queues for seamless service interaction.  
- 🧱 **Scalable Architecture** — Modular design with fault isolation and independent deployability.  

---

## 🏗️ System Architecture  

### 🧭 System Architecture Diagram — Airline Booking System

```text
                          +------------------------+
                          |      Client / UI       |
                          +-----------+------------+
                                      |
                                      ▼
                           +----------+----------+
                           |      API Gateway     |
                           | (JWT, RBAC, Routing) |
                           +----------+-----------+
                                      |
          +---------------------------+----------------------------+
          |                            |                           |
          ▼                            ▼                           ▼
+----------------+          +----------------+           +-----------------+
| Flights Service|<-------->| Booking Service|<--------->| Reminder Service|
| (Flights Mgmt) |   REST   | (Bookings API) |   Queue   | (Email Worker)  |
+----------------+          +----------------+           +-----------------+
          |                            |
          ▼                            ▼
   +------------+             +------------+
   |  MySQL DB  |             |  MySQL DB  |
   +------------+             +------------+

                 (Event-driven communication via RabbitMQ)


```

---

## 🧱 Tech Stack  

| Component | Technology |
|------------|-------------|
| Runtime | Node.js (v18+) |
| Framework | Express.js |
| Database | MySQL |
| ORM | Sequelize |
| Messaging Queue | RabbitMQ |
| Authentication | JWT via API Gateway |
| API Architecture | RESTful Microservices |
| Testing | Jest / Supertest |
| Deployment** | Docker / Docker Compose (optional) |

---

## 📦 Microservices  

### 1️⃣ Flights Service  
> Manages airplanes, airports, cities, and flights.  

Key Features: 
- CRUD operations for flights, cities, and airports.  
- Seat tracking and relational data modeling.  
- Provides flight APIs consumed by Booking Service.  

📁 Folder: `/flights-service`  
📘 Detailed Docs: [Flights Service README](./flights-service/README.md)

---

### 2️⃣ Booking Service  
> Handles all booking operations and transactional workflows.  

Key Features:
- Transactional seat booking using Sequelize transactions.  
- Idempotent booking creation to prevent duplicates.  
- Communicates with Flights Service and Reminder Service.  

📁 Folder: `/booking-service`  
📘 Detailed Docs: [Booking Service README](./booking-service/README.md)

---

### 3️⃣ Reminder Service  
> Sends email notifications and reminders via message queue.  

Key Features:
- Listens to RabbitMQ booking events.  
- Sends booking confirmations and reminders.  
- Built with Express + NodeMailer or similar libraries.  

📁 Folder: `/reminder-service`  
📘 Detailed Docs: [Reminder Service README](./reminder-service/README.md)

---

### 4️⃣ API Gateway  
> Acts as the single entry point to all backend services. 

Key Features:
- JWT-based authentication and role-based access control.  
- Load balancing and request routing.  
- Rate limiting and error handling.  

📁 Folder: `/api-gateway`  
📘 Detailed Docs: [API Gateway README](./api-gateway/README.md)

---


## 🧠  Inter-Service Communication

| Source Service | Target Service | Protocol | Purpose                        |
| -------------- | -------------- | -------- | ------------------------------ |
| Booking        | Flights        | HTTP     | Validate and update seat count |
| Booking        | Reminder       | RabbitMQ | Send booking confirmation      |
| API Gateway    | All            | HTTP     | Authentication, Routing, RBAC  |
| Reminder       | —              | Email    | Notify users about bookings    |


## 🧮 Database Relationships

- City ↔ Airport — One-to-Many

- Airport ↔ Flight — One-to-Many

- Flight ↔ Booking — One-to-Many

- Booking ↔ User — Many-to-One

## ✅ Best Practices Implemented

- Microservices + API Gateway pattern

- MVC + Service + Repository structure

- Centralized error handling and validation

- Transactional and idempotent operations

- Queue-based communication for decoupling

- Scalable, modular folder structure

- RESTful API design and versioning

- Environment-based configuration management

📊 Example Workflow

#### Booking Flow:
- 1️⃣ User authenticates via API Gateway (JWT).
- 2️⃣ API Gateway routes booking request to Booking Service.
- 3️⃣ Booking Service validates flight data from Flights Service.
- 4️⃣ Booking is created → Queue event sent to Reminder Service.
- 5️⃣ Reminder Service sends confirmation email to user.


## ⚙️ Setup and Installation  

### 🧰 Prerequisites  
- Node.js v18+  
- MySQL  
- RabbitMQ (for queues)  
- npm 

---

## ⚙️ Setup and Installation

### 1️⃣ Clone the Repository
 - Clone the repository.

 ### 2️⃣ Install Dependencies
 - Go inside the folder path and execute the following command:
  ```
    cd flights-service && npm install
    cd ../booking-service && npm install
    cd ../reminder-service && npm install
    cd ../api-gateway && npm install
  ```
### 3️⃣ Configure Environment Variables
- Create a .env file in the project root:

Example for Flights Service:
```
PORT=your_port
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=flights_service_db
DB_DIALECT=mysql
```

Example for Booking Service:
```
PORT=your_port_1
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=booking_service_db
FLIGHT_SERVICE_URL=http://localhost:{your_port_1}/api/v1/flights
RABBITMQ_URL=amqp://localhost
```

Example for Reminder Service:
```
PORT=your_port_2
RABBITMQ_URL=amqp://localhost
EMAIL_USER=your_email@example.com
EMAIL_PASS=yourpassword
```
Example for API Gateway:
```
PORT=your_port_3
JWT_SECRET=your_secret_key
FLIGHT_SERVICE_URL=http://localhost:your_port
BOOKING_SERVICE_URL=http://localhost:your_port_1
REMINDER_SERVICE_URL=http://localhost:your_port_2
```

### 4️⃣ Run Database Migrations
```
npx sequelize db:migrate
```

### 5️⃣ Start All Services

 - You can run them individually in separate terminals:
 ```
 npm run dev   # inside each service folder
 ```

 Server runs at 👉 http://localhost:{your_port}/api/v1/

