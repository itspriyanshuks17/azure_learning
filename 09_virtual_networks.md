# 🌐 Azure Virtual Networks (VNet)

## 📌 Overview

Azure Virtual Network (VNet) is the **fundamental building block** for your **private network in Azure**. It enables Azure resources, such as **Virtual Machines** (VMs), **to securely communicate with each other**, the internet, and on-premises networks.

Think of a VNet as your own isolated network within the Microsoft Azure cloud.

### ✨ Key Features

- **Isolation:** It is **logically isolated** from other networks in Azure.
- **Communication:** Allows **resources** to **talk** to **each other securely**.
- **Filtering:** You can **filter traffic using Network Security Groups** (NSGs).
- **Routing:** You can control how traffic flows between subnets.

---

## 🏗️ Architecture Components

### 1. Address Space (CIDR)

When you create a VNet, you must **specify a custom private IP address space using CIDR notation** (e.g., `10.0.0.0/16`).

### 2. Subnets

A VNet can be **segmented into smaller parts** called **Subnets**. This helps in organizing and securing resources.

- **Example:** `10.0.1.0/24` for Web Servers, `10.0.2.0/24` for Database Servers.
- **Reserved IPs:** Azure reserves the first 4 and the last 1 IP address in _every_ subnet (Total 5 IPs reserved).

#### Architecture Diagram (VNet Structure)

```text
       [  Azure Cloud Region (East US)  ]
       +--------------------------------+
       |   VNet (Address: 10.0.0.0/16)  |
       |  +--------------------------+  |
       |  |  Subnet A (10.0.1.0/24)  |  |  <-- Web Tier
       |  |   [VM1]      [VM2]       |  |
       |  +--------------------------+  |
       |                              |
       |  +--------------------------+  |
       |  |  Subnet B (10.0.2.0/24)  |  |  <-- DB Tier
       |  |   [SQL DB]               |  |
       |  +--------------------------+  |
       +--------------------------------+
```

---

## 🛡️ Security (Traffic Filtering)

### 1. Network Security Groups (NSG)

An NSG contains security rules that allow or deny inbound network traffic to, or outbound network traffic from, several types of Azure resources.

- **Rules:** Based on Source IP, Destination IP, Port, and Protocol (5-Tuple).
- **Default:** By default, all inbound traffic is blocked (except from VNet), and all outbound traffic is active.

### 2. Application Security Groups (ASG)

ASGs allow you to group VMs based on their application logic (e.g., "WebServers", "DBServers") rather than explicit IP addresses. This simplifies NSG rules.

---

## 🔗 Connectivity (Connecting VNets)

### 1. VNet Peering

Connects two Azure Virtual Networks. Once peered, the VNets appear as one for connectivity purposes.

- **Low Latency:** Data flows over the ultra-fast Microsoft backbone network.
- **Non-Transitive:** If A connects to B, and B connects to C, A _cannot_ talk to C automatically. You must explicitly peer A and C.

#### Architecture Diagram (VNet Peering)

```text
     [ VNet A ] <===========> [ VNet B ]
     (10.1.0.0)    Peering    (10.2.0.0)
        |
        x  (NO Direct Access)
        |
     [ VNet C ]
```

### 2. VPN Gateway

Used to send **encrypted traffic between an Azure virtual network** and **an on-premises location** over the public Internet.

---

## 💡 Hinglish Explanation (Housing Society)

### **1. Virtual Network (Housing Society)**

- **Hinglish**: VNet ek badi "Housing Society" yani Gated Community jaisi hai. Yeh poori duniya se alag (Isolated) hai. Iske andar sirf permission wale log hi aa sakte hain.

### **2. Address Space (Plot Area)**

- **Hinglish**: Society banane se pehle hum decide karte hain ki kitni zameen leni hai (e.g., `10.0.0.0/16`). Yeh decide karta hai ki kitne ghar ban sakte hain.

### **3. Subnets (Blocks/Wards)**

- **Hinglish**: Society ke andar hum alag-alag blocks banate hain:
  - **Block A (Web Subnet)**: Sirf Web servers rahenge.
  - **Block B (DB Subnet)**: Sirf Database rahega.
  - Security guard (NSG) ko bol diya hai ki "Block A ke log Block B mein bina permission nahi ja sakte".

### **4. Reserved IPs (Nagar Palika)**

- **Hinglish**: Har block mein Azure 5 IP addresses apne paas rakhta hai (Maintenance aur Routing ke liye). Jaise society mein kuch area park aur bijli ghar ke liye reserved hota hai.

### **5. Peering (Bridge)**

- **Hinglish**: Agar do alag-alag societies (VNet A aur VNet B) ko judna hai, toh unke beech ek "Bridge" (Peering) bana dete hain. Log bina highway (Internet) pe gaye seedha aa-ja sakte hain.

---

## ⚡ Exam Tips for AZ-900

1. **Isolation**: VNets are scoped to a single **Region**. They cannot span multiple regions (though you can peer them across regions).
2. **Peering**: Remember that VNet peering is **not transitive**. (A <-> B <-> C does not mean A <-> C).
3. **Reserved IPs**: Always remember Azure reserves **5 IP addresses** in every subnet. If you need 10 IPs, plan for at least 15.
4. **NSG vs ASG**: NSG is the _Rule List_ (Allow/Deny), ASG is the _Label_ (WebServers) to make rules easier to write.
