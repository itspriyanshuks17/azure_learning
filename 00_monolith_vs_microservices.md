# 🏗️ Monolith vs Microservices Architecture

## 📌 Overview
Modern cloud applications are often built differently than traditional ones. Understanding these architectures helps in choosing the right Azure services.

---

## 1. Monolithic Architecture 🏰
A single, unified unit where all components (UI, Business Logic, Database Access) are tightly coupled in one codebase and deployed together.

- **Characteristics**:
    - One large codebase.
    - Scale by cloning the entire server (Vertical Scaling is common).
    - If one component fails (e.g., memory leak in reporting), the whole app crashes.
- **Azure Mapping**: A robust **Azure Virtual Machine** running a legacy enterprise app, or a large **Azure App Service**.

## 2. Microservices Architecture 🐝
Breaking an application into smaller, independent services that communicate via APIs.

- **Characteristics**:
    - Decoupled: Each service handles one function (e.g., "User Service", "Order Service").
    - Independent Deployment: Update the "Order Service" without redeploying the "User Service".
    - Polyglot: One service writes in C#, another in Python.
- **Azure Mapping**:
    - **Azure Kubernetes Service (AKS)**.
    - **Azure Functions** (Serverless compute for individual tasks).
    - **Azure Container Apps**.

---

## 3. Serverless Architecture (Function-as-a-Service)
An evolution of microservices where you don't manage *any* infrastructure. You just write code functions.

- **Azure Functions**: Event-driven code (e.g., Run this code when a file is uploaded to Blob Storage).
- **Azure Logic Apps**: Visual workflow designer (Low-code/No-code) to integrate apps (e.g., When an email arrives, create a ticket in DevOps).

---

## 🆚 Comparison Table

| Feature | Monolith | Microservices | Serverless |
| :--- | :--- | :--- | :--- |
| **Complexity** | Simple initially | High (Network, Data consistency) | Medium |
| **Deployment** | "Big Bang" (All at once) | Independent pieces | Per function |
| **Scaling** | Scale everything | Scale only what's needed | Automatic (Per event) |
| **Resilience** | Low (Single point of failure) | High (Fault isolation) | High |
| **Azure Service** | Virtual Machine / App Service | AKS / Service Fabric | Azure Functions |
