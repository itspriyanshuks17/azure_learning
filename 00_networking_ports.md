# 🚪 Common Networking Ports & Protocols

## 📌 Overview

A **Port** is a logical communication endpoint that identifies a specific process or service on a computer.

- **Analogy**: If the **IP Address** is the "Building Address", the **Port Number** is the "Apartment Number" or "Office Number" inside that building.
- **Range**: 0 to 65535.

---

## 🔢 Port Categories

| Range             | Name                 | Description                                           | Example                |
| :---------------- | :------------------- | :---------------------------------------------------- | :--------------------- |
| **0 - 1023**      | **Well-Known Ports** | Reserved for core system services.                    | HTTP (80), SSH (22)    |
| **1024 - 49151**  | **Registered Ports** | Used by user applications & vendor services.          | SQL (1433), RDP (3389) |
| **49152 - 65535** | **Dynamic Ports**    | Temporary ports for client-side outgoing connections. | Browser tabs           |

---

## 📜 Detailed Port Guide

### 1. File Transfer & Remote Access

| Port      | Protocol | Name       | Description                           | Azure Context                                                         |
| :-------- | :------- | :--------- | :------------------------------------ | :-------------------------------------------------------------------- |
| **20/21** | TCP      | **FTP**    | File Transfer Protocol. Unencrypted.  | Used for older App Service uploads. **Avoid** if possible (Use SFTP). |
| **22**    | TCP      | **SSH**    | Secure Shell. Encrypted Command Line. | **Critical** for managing Linux VMs.                                  |
| **23**    | TCP      | **Telnet** | Unencrypted Remote CLI.               | **Blocked/Avoid**. Never use in Cloud.                                |
| **3389**  | TCP      | **RDP**    | Remote Desktop Protocol. GUI Access.  | **Critical** for managing Windows VMs.                                |

### 2. Web & Email

| Port    | Protocol | Name      | Description                       | Azure Context                                                   |
| :------ | :------- | :-------- | :-------------------------------- | :-------------------------------------------------------------- |
| **80**  | TCP      | **HTTP**  | Unsecured Web Traffic.            | Standard web hosting.                                           |
| **443** | TCP      | **HTTPS** | Secured (SSL/TLS) Web Traffic.    | **Mandatory** for secure Azure Web Apps.                        |
| **25**  | TCP      | **SMTP**  | Simple Mail Transfer Protocol.    | Sending email. **Blocked** by default in Azure to prevent spam. |
| **110** | TCP      | **POP3**  | Post Office Protocol v3.          | Receiving email (Downloads locally).                            |
| **143** | TCP      | **IMAP**  | Internet Message Access Protocol. | Receiving email (Synced on server).                             |

### 3. Infrastructure & Database

| Port      | Protocol | Name           | Description                | Azure Context                                |
| :-------- | :------- | :------------- | :------------------------- | :------------------------------------------- |
| **53**    | UDP/TCP  | **DNS**        | Domain Name System.        | Resolves names to IPs. Azure DNS uses this.  |
| **67/68** | UDP      | **DHCP**       | Auto-assigns IP addresses. | Managed automatically by Azure VNet.         |
| **1433**  | TCP      | **SQL**        | MSSQL Server Default Port. | Connecting to **Azure SQL Database**.        |
| **3306**  | TCP      | **MySQL**      | MySQL Database Port.       | Connecting to Azure Database for MySQL.      |
| **5432**  | TCP      | **PostgreSQL** | PostgreSQL Database Port.  | Connecting to Azure Database for PostgreSQL. |

---

## 🖼️ Architecture Diagram (The "Apartment" Analogy)

```text
       [  Server IP: 10.0.0.5  ]
      +-------------------------+
      |                         |
      |   [ Port 80 ]  <-- (Building Entry for Web Requests)
      |       |
      |   (Web Server App)      |
      |                         |
      |-------------------------|
      |                         |
      |   [ Port 22 ]  <-- (Service Entry for Admin/Maintenance)
      |       |
      |   (SSH Service)         |
      |                         |
      +-------------------------+
```

---

## 💡 Hinglish Explanation (Office Building)

### **1. Port (Cabin Number)**

- **Hinglish**: Imagine karo ek badi **Office Building** (Server) hai.
- **IP Address**: Building ka address hai.
- **Port**: Building ke andar alag-alag **Cabins** hain.
  - **Cabin 80 (Reception)**: Yahan public aati hai (Web Private).
  - **Cabin 22 (Security Room)**: Yahan sirf Admin access kar sakta hai (SSH).
  - **Cabin 1433 (Store Room)**: Yahan files/data rakha hai (SQL).

### **2. Open vs Closed Ports**

- **Hinglish**: Agar Cabin 80 ka darwaza band hai (Port Closed), toh koi andar nahi aa sakta, chahe wo Building tak pahunch jaye. Firewall ka kaam yahi darwaze kholna ya band karna hai.

---

## ⚡ Exam Tips for AZ-900

1.  **NSG Rules**: You must explicitly **Allow** ports in Network Security Groups (NSGs) for traffic to flow.
    - _Example_: To host a website, allow **Port 80/443**.
    - _Example_: To admin a VM, allow **Port 22 (Linux)** or **3389 (Windows)**.
2.  **Security**: Keep management ports (22, 3389) closed to the public internet using **JIT (Just-In-Time) Access** or **Bastion**.
3.  **SMB (Port 445)**: Used for **Azure Files** storage mounting. often blocked by ISPs.
