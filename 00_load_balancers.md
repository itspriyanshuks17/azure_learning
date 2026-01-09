# ⚖️ Azure Load Balancing

## 📌 Overview

Load balancing refers to evenly distributing traffic (network load) across a group of backend resources or servers. Azure provides various load balancing services depending on the traffic type (Global vs Regional) and layer (Layer 4 vs Layer 7).

---

## 1. Regional Load Balancers (Traffic within a Region)

### 🧱 Azure Load Balancer (Layer 4)

Operates at the Transport Layer (TCP/UDP). It distributes traffic based on IP address and port number.

- **Use Case**: High-performance, low-latency Traffic distribution for non-HTTP apps (e.g., SQL AlwaysOn, internal microservice calls).
- **Features**:
  - **Public**: Incoming internet traffic to VMs.
  - **Internal**: Traffic between Private IPs inside a VNET.

### 🌐 Azure Application Gateway (Layer 7)

Operates at the Application Layer (HTTP/HTTPS). It is a web traffic load balancer.

- **Use Case**: Web Applications requiring SSL termination, Cookie-based session affinity, or URL path-based routing (`/images` goes to pool A, `/video` goes to pool B).
- **Key Feature**: **Web Application Firewall (WAF)** - Protects against common web attacks like SQL Injection & XSS.

---

## 2. Global Load Balancers (Traffic across Regions)

### 🌍 Azure Traffic Manager

DNS-based traffic load balancer. It distributes traffic to services across global Azure regions.

- **Mechanism**: Use DNS to direct client requests to the most appropriate endpoint based on a traffic-routing method (e.g., Priority, Weighted, Geographic).
- **Note**: It does NOT see the traffic payload; it just returns the IP of the best regional endpoint.

### 🚪 Azure Front Door

A global, scalable entry-point that uses the Microsoft global edge network to create fast, secure, and widely scalable web applications.

- **Layer**: Layer 7 (HTTP/HTTPS).
- **Features**:
  - Instant failover.
  - Global WAF.
  - CDN-like caching capabilities.
  - **Use Case**: Modern, global web applications requiring instant failover and acceleration.

---

---

## 💡 Hinglish Explanation (Traffic Police)

### **1. Azure Load Balancer (Layer 4)**

- **Hinglish**: Yeh Traffic Police wala sirf gaadi ka number (IP + Port) dekhta hai. Woh andar nahi dekhta ki gaadi mein kaun baitha hai. Yeh fast hai aur simple traffic (TCP/UDP) ke liye use hota hai.

### **2. Application Gateway (Layer 7)**

- **Hinglish**: Yeh smart security guard hai. Yeh gaadi rok kar puchta hai "Kahan jana hai?" (URL check karta hai).
  - Agar aap `/images` bologe toh Image Server ke paas bhejega.
  - Agar aap `/videos` bologe toh Video Server ke paas bhejega.
  - Iske paas firewall (WAF) bhi hai jo hackers ko rokta hai.

### **3. Traffic Manager (DNS)**

- **Hinglish**: Yeh GPS system ki tarah hai. Yeh user ko batata hai ki "Sabse kareeb rasta kaunsa hai?". Agar user US mein hai toh US server ka address dega, agar India mein hai toh India ka.

---

## 🆚 Selection Cheat Sheet

| Service                 | Scope    | Layer | Protocols | Best For                                        |
| :---------------------- | :------- | :---- | :-------- | :---------------------------------------------- |
| **Azure Load Balancer** | Regional | 4     | TCP/UDP   | Non-HTTP, High Performance, Internal DB traffic |
| **Application Gateway** | Regional | 7     | HTTP/S    | Web Apps, WAF protection, SSL Termination       |
| **Traffic Manager**     | Global   | DNS   | Any       | Disaster Recovery routing, Simple Multi-region  |
| **Azure Front Door**    | Global   | 7     | HTTP/S    | Global Microservices, Web App Acceleration      |
