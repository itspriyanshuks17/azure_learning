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

## 3. Load Balancing Algorithms 🧮

### **A. Static Algorithms**

These do **not** consider the real-time load or health of the server. They follow a fixed rule. **Benefits**: Simple, Less Overhead.

- **Round Robin**:

  - Requests are assigned to servers in a strictly circular order (Server A -> Server B -> Server C -> Server A...).
  - **Best For**: Small applications where all servers have identical specs.

  ```text
                                +-------------------+
                                |    Load Balancer  |
         +------+         +---> |     (Distributor) | ----+
         | User | --------|     +-------------------+     |
         +------+         |                               |
                          | (1)           (2)             | (3)
                          v               v               v
                   +-----------+   +-----------+   +-----------+
                   |   VM 1    |   |   VM 2    |   |   VM 3    |
                   | (Green)   |   | (Green)   |   | (Green)   |
                   +-----------+   +-----------+   +-----------+
  ```

- **Weighted Round Robin**:
  - Assigns more requests to powerful servers and fewer to weaker ones based on a weight (e.g., Server A: 70%, Server B: 30%).
  - **Best For**: Environments with mixed hardware capabilities.

### **B. Dynamic Algorithms**

These **do** consider the real-time status of the server (CPU, RAM, Active Connections).

- **Least Connection**: Sends request to the server with the fewest active connections.
- **Resource Based**: Checks CPU/Memory usage before sending traffic.

---

## 4. High Availability Configurations 🛡️

### **Active-Active**

- **Concept**: All Load Balancers/Servers are active and processing traffic simultaneously.
- **Benefit**: Utilization of all resources; higher throughput.
- **Downside**: If one fails, the others must handle the extra load immediately.

```text
                    +-----------------------+
                    |    Traffic Manager    |
       +------+ --> |        (DNS)          |
       | User |     +-----------------------+
       +------+          /             \
                        / (Traffic)     \ (Traffic)
                       v                 v
           +-----------------+     +-----------------+
           |    Region A     |     |    Region B     |
           |                 |     |                 |
           |  [Load Balancer]|     |  [Load Balancer]|
           |       |         |     |       |         |
           |       v         |     |       v         |
           |    [App A]      |     |    [App B]      |
           +-----------------+     +-----------------+
               (Active)                (Active)
```

### **Active-Passive (Failover)**

- **Concept**: One Primary server handles all traffic. The Secondary (Passive) server sits idle, waiting for the Primary to fail.
- **Benefit**: Predictable failover capacity (the backup is fresh).
- **Downside**: Wasted resources (money spent on an idle server).

```text
                    +-----------------------+
                    |    Traffic Manager    |
       +------+ --> |        (DNS)          |
       | User |     +-----------------------+
       +------+          |             .
                         | (Active)    . (Standby)
                         v             .
           +-----------------+     + . . . . . . . . +
           |  Primary Region |     . Secondary Region.
           |                 |     .                 .
           |  [Load Balancer]|     .  [Load Balancer].
           |       |         |     .       |         .
           |       v         |     .       v         .
           |    [App A]      |     .    [App B]      .
           +-----------------+     + . . . . . . . . +
               (Active)                (Passive)
```

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

### **4. Algorithms (Tareeka)**

- **Round Robin (Card Dealer)**:
  - **Hinglish**: Tash ke patte batna. Ek tumhe, ek tumhe, ek tumhe. Sabko barabar mauka milega, chahe koi slow ho ya fast.
- **Dynamic (Smart Queue)**:
  - **Hinglish**: Mall ka billing counter. Aap wahan jaoge jahan sabse kam bheed hai (Least Connection).

### **5. High Availability (Jugaad)**

- **Active-Active (Dono Dukan Khuli)**:
  - **Hinglish**: Do billing counters khule hain. Dono pe kaam ho raha hai. Kaam jaldi hoga.
- **Active-Passive (Stepney Tyre)**:
  - **Hinglish**: Ek tyre gadi chala raha hai (Primary), doosra trunk mein pada hai (Secondary). Jab pehla phatega, tabhi doosra use hoga. Tab tak woh extra weight hai (Cost).

---

## 🆚 Selection Cheat Sheet

| Service                 | Scope    | Layer | Protocols | Best For                                        |
| :---------------------- | :------- | :---- | :-------- | :---------------------------------------------- |
| **Azure Load Balancer** | Regional | 4     | TCP/UDP   | Non-HTTP, High Performance, Internal DB traffic |
| **Application Gateway** | Regional | 7     | HTTP/S    | Web Apps, WAF protection, SSL Termination       |
| **Traffic Manager**     | Global   | DNS   | Any       | Disaster Recovery routing, Simple Multi-region  |
| **Azure Front Door**    | Global   | 7     | HTTP/S    | Global Microservices, Web App Acceleration      |

---

## 💡 Exam Tips for AZ-900

### **1. Load Balancing**

- **Question Type**: Multiple Choice (Single Answer).
- **Difficulty**: Easy to Moderate.
- **Key Concepts**:
  - **Azure Load Balancer** (Layer 4).
  - **Application Gateway** (Layer 7).
  - **Traffic Manager** (DNS).
  - **Azure Front Door** (Layer 7).
- **Best Practices**:
  - Understand the differences between regional and global load balancers.
  - Know the use cases for each service.
  - Be familiar with the load balancing algorithms and their trade-offs.
  - Understand the OpEx vs CapEx comparison.
