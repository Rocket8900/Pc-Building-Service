# ESDTimez PC Building Service.

## Backend.

Welcome to the Backend folder of our project! This README provides an overview of the backend setup, functionalities, and how to get started.

## Overview

This backend system serves as the backbone of our project, handling data processing, business logic, and interaction with databases. It's built using:

- **Programming Languages**: Python, JavaScript (Node.js), Go
- **Frameworks/Libraries**: Express.js
- **Databases**: Firebase Realtime Database, SQL Database (e.g., PostgreSQL, MySQL), AWS Database (e.g., Amazon RDS, Amazon DynamoDB), Mongo DB
- **External APIs**: Stripe API, Gmail API, Google Authentication API
- **Messaging Protocol**: RabbitMQ AMQP
- **Containerization**: Docker
- **API Gateway**: Kong

### Features

This backend server consists of various microservices, each responsible for specific functionalities:

1. **activity_log**:

   - Simple Microservice responsible for consuming activity logs from RabbitMQ and posting them to Firebase Realtime Database.

2. **building_pc_complex**:

   - Orchestrator Complex Microservice responsible for managing the entire flow of building a PC.

3. **cart**:

   - Simple Microservice responsible for handling all cart-related transactions, including adding, removing, and clearing items in the cart.

4. **error_log**:

   - Simple Microservice responsible for consuming error logs from RabbitMQ and posting them to Firebase Realtime Database.

5. **handling-order-cms**:

   - Orchestrator Complex Microservice responsible for managing the entire flow post-payment and populating the cart.

6. **notification-ms**:

   - Simple Microservice responsible for consuming messages from RabbitMQ and sending emails to customers and employees via the Gmail API.

7. **order**:

   - Simple Microservice responsible for handling all operations related to orders.

8. **parts_simple**:

   - Simple Microservice responsible for handling all operations related to parts.

9. **payment**:

   - Simple Microservice responsible for handling all operations related to payments, integrated with Stripe.

10. **rabbit_forward**:

    - Simple Microservice responsible for forwarding all received POST requests to RabbitMQ queue.

11. **retrieve_logs**:

    - Simple Microservice responsible for retrieving activity and error logs from the Firebase server.

12. **Repair_Complex**:
    - Complex Microservice responsible for handling all repair operations that involve sending notifications
   
13. **Repair_SimpleMS**:
    - Simple Microservice responsible for handling all operations related to repair that involves interacting with the database
 
14. `recommendation` folder
15. `userAccount_ComplexMS` folder
16. `UserAccount_SimpleMS` folder

### Instructions

1. Start up the Docker Daemon (Docker application)

2. **Setup RabbitMQ**: In the `rabbit_forward` folder, run `setup.js` to create the RabbitMQ image using the following command `docker run -d --hostname esd-rabbit --name rabbitmq-mgmt -p 5672:5672 -p 15672:15672 rabbitmq:3-management`. This will spin up and install RabbitMQ in Docker.

3. **Setup Backend Server**: Start up the backend server using `docker compose up --build`

4. **Backend Verification**: Check that all services (less `kong-migration-1`) are up.

5. **Tearing down**:
   - `ctrl-c` to stop all services
   - `docker compose down`

## Current External Port Mappings

Here are the external port mappings currently in use:

- **Activity Log MS**: 3000
- **AMQP Rabbit**: 3200
- **SQL DB**: 3306
- **Payment MS**: 3400
- **Retrieve Logs**: 3900
- **Error Log MS**: 4000
- **Repair Simple MS**: 4100
- **Repair CMS**: 4200
- **Order MS**: 5001
- **Cart MS**: 5002
- **Building PC CMS**: 5005
- **UserAccount Simple MS**: 5010
- **UserAccount CMS**: 5015
- **Handling Order CMS**: 5100
- **Kong DB**: 5433
- **Recommendation MS**: 5800
- **Notification MS**: 5900
- **Parts MS**: 5950

- **Kong Other stuff**: 8k++

### Contributors

- ALEXANDER LUK WEI HENG
- CLARISSA KOH SHI QI
- GERARD EMMANUEL LOH KAI-JYN
- LOH YEE XUN GABRIEL
- NASHWYN SINGH SANGAH
- SHYAN CHAM
