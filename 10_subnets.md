# 🔢 Azure Subnets (Sub-Networks)

## 📌 Overview

A **Subnet** is a **range of IP addresses within a Virtual Network (VNet)**. You can **divide a VNet into multiple subnets for organization and security**.

Think of a VNet as a **Building** and Subnets as the **Floors** inside it.

### ✨ Why segment into Subnets?

1. **Isolation**: Keep Database servers away from the public internet.
2. **Organization**: Group resources by department (HR, IT, Finance).
3. **Security**: Apply specific security rules (NSG) to one subnet without affecting others.

---

## 🧮 Understanding CIDR Notation

Azure uses **CIDR (Classless Inter-Domain Routing)** to define IP ranges.

- Format: `IP_Address/Prefix_Length` (e.g., `10.0.0.0/24`)
- The **Prefix Length** (`/24`) tells you how many bits are fixed for the Network ID. The rest are for Hosts.

| CIDR Prefix | Total IPs | Usable IPs (Azure) | Description              |
| :---------- | :-------- | :----------------- | :----------------------- |
| `/16`     | 65,536    | 65,531             | Huge network (VNet size) |
| `/24`     | 256       | 251                | Standard subnet size     |
| `/28`     | 16        | 11                 | Very small subnet        |

> **⚠️ Note:** Azure reserves **5 IPs** in _every_ subnet:
>
> 1. x.x.x.0 (Network Address)
> 2. x.x.x.1 (Default Gateway)
> 3. x.x.x.2 (Azure DNS Mapping 1)
> 4. x.x.x.3 (Azure DNS Mapping 2)
> 5. x.x.x.255 (Broadcast Address)

---

## 🏗️ Architecture: Public vs Private Subnets

Although Azure doesn't technically have "Public" or "Private" subnet types (like AWS), we simulate them using **NSGs** and **Route Tables**.

### 1. Public Subnet

- **Purpose**: Hosts resources that need to talk to the Internet directly (e.g., Web Server, Load Balancer).
- **Configuration**: Has a Public IP address or is attached to a NAT Gateway/Load Balancer.
- **Security**: NSG allows Inbound Port 80/443.

### 2. Private Subnet

- **Purpose**: Hosts backend resources (e.g., Database, Internal App) that should NEVER be exposed to the internet.
- **Configuration**: No Public IP. Outbound access only via Firewall/NAT.
- **Security**: NSG denies all Inbound Internet traffic.

#### Architecture Diagram (Segmentation)

```text
       [        VNet (10.0.0.0/16)        ]
       +----------------------------------+
       |                                  |
       |   +--------------------------+   |
       |   | Public Subnet (Web Tier) |   |
       |   | 10.0.1.0/24              |   |
       |   | [WebVM] <---(Internet)---|   |
       |   +--------------------------+   |
       |              |                   |
       |              v (Allowed)         |
       |   +--------------------------+   |
       |   | Private Subnet (DB Tier) |   |
       |   | 10.0.2.0/24              |   |
       |   | [SQLDB] <---(No Access)--|   |
       |   +--------------------------+   |
       |                                  |
       +----------------------------------+
```

---

## 🎓 Advanced Concepts

### 1. Subnet Delegation

Some Azure services (like **Azure Container Instances**, **App Service VNet Integration**) require a subnet to be "Delegated" (Dedicated) to them.

- Once delegated, you cannot put other resources (like normal VMs) in that subnet.

### 2. Service Endpoints

Allows you to extend your VNet identity to Azure services (like Storage or SQL).

- Traffic flows from your VNet -> Azure Backbone -> Storage Account (Without going over public internet).

### 3. Private Endpoints (Private Link)

Brings the Azure Service (like SQL DB) _inside_ your VNet with a private IP. This is the most secure method.

---

## 💡 Hinglish Explanation (Office Layout)

### **1. Subnet (Departments)**

- **Hinglish**: Poori Building (VNet) mein alag-alag floors hain.
  - **Floor 1 (Reception/Public)**: Yahan bahar ke log aa sakte hain (Public Subnet).
  - **Floor 2 (Finance/Private)**: Yahan sirf staff aa sakta hai, bahar wale allowed nahi (Private Subnet).

### **2. 5 Reserved IPs (Staff Area)**

- **Hinglish**: Har floor pe 5 cabin management ke liye reserved hain (Manager, Electrician, Guard, etc.). Inhe aap use nahi kar sakte.

### **3. Service Endpoint (Direct Tunnel)**

- **Hinglish**: Finance team ko Bank jana hai. Sadak (Internet) se jaane ke bajaye, unhone ek underground tunnel (Service Endpoint) bana li jo seedha bank nikalti hai. Safe aur Fast.

---

## ⚡ Exam Tips for AZ-900

1. **Calculation**: If a question asks "How many usable IPs in a /24 subnet?", the answer is **251** (256 - 5 reserved).
2. **Delegation**: Certain PaaS services require a dedicated (empty) subnet.
3. **Security**: You secure subnets using **Network Security Groups (NSGs)**, not by just naming them "Private".
