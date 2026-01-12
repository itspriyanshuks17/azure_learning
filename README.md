![1768229299217](image/README/1768229299217.png)
# Azure Learning & Networking Notes

Welcome to my personal documentation for **Azure Cloud**, **Networking**, and **System Design**.
This repository maps my journey from networking basics to advanced cloud architecture.

## 📂 Directory Structure

```text
.
├── computer_networks/   # Foundation of the Internet (IP, TCP/UDP, HTTP)
├── cloud_computing/     # Core Cloud Concepts (IaaS/PaaS/SaaS, scaling)
├── servers/             # Web & Mail Servers
├── app_architecture/    # Microservices & Design Patterns
├── azure_services/      # Deep Dive into Azure Resources (VM, Storage, VNet)
└── doc_web/             # Static Site Generator logic
```

---

## 🌐 1. Computer Networks

### [Area Networks (LAN, WAN, VPN)](computer_networks/00_area_networks.md)

**English Summary:**

1. **LAN (Local Area Network)**: Connects devices in a limited area like a home or office.
2. **WAN (Wide Area Network)**: Spans large geographical distances (e.g., The Internet).
3. **VPN (Virtual Private Network)**: Creates a secure, encrypted tunnel over a public network.
4. **SAN (Storage Area Network)**: Specialized high-speed network for block-level storage.
5. **PAN (Personal Area Network)**: Short-range network for personal devices (Bluetooth).

**Hinglish Summary:**

1. **LAN**: Ek building ke andar ka network (Jaise Wi-Fi).
2. **WAN**: Poori duniya ko connect karne wala network (Internet).
3. **VPN**: Public road par ek "invisible pipe" jisme koi jhank nahi sakta (Security).
4. **SAN**: Sirf Hard Drives ko connect karne wala fast network.
5. **PAN**: Personal devices ka network (Bluetooth headphones).

### [IP Addresses (IPv4 vs IPv6)](computer_networks/00_ip_addresses.md)

**English Summary:**

1. **IP Address**: Unique identifier for every device on a network.
2. **IPv4**: 32-bit address (e.g., 192.168.1.1), running out of space.
3. **IPv6**: 128-bit address (hexadecimal), practically infinite.
4. **Public vs Private**: Public is for internet; Private is for local LAN.
5. **CIDR**: Notation used to define subnet masks and network ranges.

**Hinglish Summary:**

1. **IP Address**: Ghar ka pata (Address) jisse chithi sahi jagah pahunche.
2. **IPv4**: Purana address system jo ab khatam ho raha hai (sirf 4 billion).
3. **IPv6**: Naya system jisme infinite addresses hain.
4. **Public vs Private**: Public matlab "Duniya ke liye"; Private matlab "Ghar ke andar".
5. **CIDR**: Tarika jisse hum network ka size batate hain (`/24` matlab 256 IPs).

### [MAC Address](computer_networks/00_mac_address.md)

**English Summary:**

1. **Definition**: Media Access Control address, unique hardware ID of a network card.
2. **Format**: 48-bit hexadecimal (e.g., 00:1A:2B:3C:4D:5E).
3. **Layer**: Operates at Layer 2 (Data Link Layer) of OSI model.
4. **Permanence**: Hard-coded by manufacturer (Physical Address).
5. **Usage**: Used for local communication within a LAN (Switching).

**Hinglish Summary:**

1. **Definition**: Computer ka 'Fingerprint' jo kabhi change nahi hota.
2. **Format**: 48-bit ka number jo card par likha hota hai.
3. **Layer**: Yeh Layer 2 (Switch) par kaam karta hai.
4. **Permanence**: Laptop badal doge tabhi change hoga, format karne se nahi.
5. **Usage**: Ghar ke andar data bhejne ke liye use hota hai (Router tak).

### [Network Architecture](computer_networks/00_network_architecture.md)

**English Summary:**

1. **Topology**: The physical or logical layout of a network.
2. **Hub & Spoke**: Central node connects to multiple outer nodes (Star).
3. **Mesh**: All nodes connect to all other nodes (High redundancy).
4. **Client-Server**: Clients request services; Servers provide them.
5. **N-Tier**: Application architecture divided into layers (Web, Logic, Data).

**Hinglish Summary:**

1. **Topology**: Network ka naksha (Map).
2. **Hub & Spoke**: Ek 'Hub' beech mein, baaki sab usse jude hue (Cycle ke pahiye jaisa).
3. **Mesh**: Sab ek doosre se jude hain, koi wire kate toh farak nahi padta.
4. **Client-Server**: Ek maalik (Server) aur baaki grahak (Clients).
5. **N-Tier**: Application ko hisson mein baatna (Frontend, Backend, Database).

### [Networking Models (P2P vs Client-Server)](computer_networks/00_networking_models.md)

**English Summary:**

1. **Client-Server**: Centralized resource management. Scalable but single point of failure.
2. **Peer-to-Peer (P2P)**: Decentralized. Every node is both client and server.
3. **Torrenting**: Example of P2P file sharing.
4. **Control**: Server model gives admin control; P2P gives user autonomy.
5. **Cost**: P2P is cheaper (no dedicated server hardware).

**Hinglish Summary:**

1. **Client-Server**: Ek dukaan jahan sab samaan lene aate hain.
2. **P2P**: Doston ka group jahan sab ek doosre se share karte hain.
3. **Torrenting**: P2P ka sabse bada example.
4. **Control**: Server mein Boss hota hai; P2P mein sab barabar hain.
5. **Cost**: P2P sasta hai kyunki server nahi khareedna padta.

### [Important Ports & Protocols](computer_networks/00_networking_ports.md)

**English Summary:**

1. **Port**: Logical endpoint for communication (0-65535).
2. **Well-Known Ports**: 0-1023 (Reserved for system services).
3. **SSH (22)**: Secure Login.
4. **RDP (3389)**: Remote Desktop Protocol (Windows).
5. **DNS (53)**: Resolves domain names to IPs.

**Hinglish Summary:**

1. **Port**: Building (IP) ke andar ka "Room Number" ya "Cabin Number".
2. **Well-Known Ports**: Specific rooms jo fix hain (Jaise Reception).
3. **SSH (22)**: Server ke andar ghusne ka secure darwaza.
4. **RDP (3389)**: Doosre computer ki screen dekhne ka protocol.
5. **DNS (53)**: Internet ka Phonebook (Naam se Number batane wala).

### [OSI Model](computer_networks/00_osi_model.md)

**English Summary:**

1. **7 Layers**: Physical, Data Link, Network, Transport, Session, Presentation, Application.
2. **Purpose**: Standardizes network communication.
3. **Encapsulation**: Data gets wrapped with headers at each layer going down.
4. **Physical Layer**: Cables, Hubs, Bits (0s and 1s).
5. **Application Layer**: User interface (HTTP, FTP).

**Hinglish Summary:**

1. **7 Layers**: Internet kaise chalta hai, uske 7 steps.
2. **Purpose**: Taaki har company ke devices baat kar sakein.
3. **Encapsulation**: Jaise gift ko wrap karte hain, waise hi data ko headers mein wrap karte hain.
4. **Physical Layer**: Taar (Wire) aur current signal.
5. **Application Layer**: Jo hum screen par dekhte hain (Browser).

### [TCP/IP Model](computer_networks/00_tcp_ip_model.md)

**English Summary:**

1. **4 Layers**: Network Access, Internet, Transport, Application.
2. **Practicality**: The real-world implementation of networking (unlike theoretical OSI).
3. **TCP vs UDP**: Reliability vs Speed.
4. **IP Protocol**: Routing packets across networks.
5. **Standard**: The language of the Internet.

**Hinglish Summary:**

1. **4 Layers**: OSI ka chota aur practical version.
2. **Practicality**: Asli duniya mein yahi use hota hai.
3. **TCP vs UDP**: Bharosemand (TCP) ya Tez (UDP).
4. **IP Protocol**: Rasta dikhane wala system.
5. **Standard**: Internet isi par chalta hai.

### [HTTP vs HTTPS](computer_networks/00_http_vs_https.md)

**English Summary:**

1. **HTTP**: Plain text communication. Insecure.
2. **HTTPS**: Encrypted using SSL/TLS. Secure.
3. **Methods**: GET, POST, PUT, DELETE (CRUD operations).
4. **Status Codes**: 200 (OK), 404 (Missing), 500 (Error).
5. **Handshake**: The process of establishing a connection (SYN-SYNACK-ACK).

**Hinglish Summary:**

1. **HTTP**: Khula Postcard. Koi bhi padh sakta hai.
2. **HTTPS**: Band Liganfa (Envelope). Koi khol nahi sakta.
3. **Methods**: Server ko batana ki kya karna hai (Padhna, Likhna, Mitana).
4. **Status Codes**: Server ka jawaab (Haan, Nahi, Galti).
5. **Handshake**: Baat shuru karne se pehle haath milana.

---

## ☁️ 2. Cloud Computing

### [Cloud Benefits](cloud_computing/00_cloud_benefits.md)

**English Summary:**

1. **High Availability**: Ensuring services act even if hardware fails.
2. **Scalability**: Growing/Shrinking resources based on demand.
3. **Elasticity**: Automatic scaling based on triggers.
4. **Agility**: Rapid deployment of resources.
5. **CapEx vs OpEx**: Moving from upfront costs to pay-as-you-go.

**Hinglish Summary:**

1. **High Availability**: Light kabhi nahi jayegi (Backup ready hai).
2. **Scalability**: Zaroorat padne par bada karna.
3. **Elasticity**: Apne aap bada ya chota hona (Rubber band jaisa).
4. **Agility**: Turant naya server khada karna.
5. **CapEx vs OpEx**: Ek saath paise dene ke bajaye kiraya dena.

### [Deployment Models](cloud_computing/00_deployment_models.md)

**English Summary:**

1. **Public Cloud**: Shared infrastructure (Azure, AWS).
2. **Private Cloud**: Dedicated infrastructure for one organization.
3. **Hybrid Cloud**: Connecting Public and Private clouds.
4. **Compliance**: Private cloud is often for strict regulations.
5. **Cost**: Public is cheapest; Private is expensive.

**Hinglish Summary:**

1. **Public Cloud**: Bus jisme sab travel karte hain (Sasta).
2. **Private Cloud**: Apni car (Mehnga par secure).
3. **Hybrid Cloud**: Kuch safar car se, kuch bus se.
4. **Compliance**: Agar sarkari rules hain toh Private use karo.
5. **Cost**: Public sabse sasta padta hai.

### [Scaling (Manual vs Auto)](cloud_computing/00_scaling.md)

**English Summary:**

1. **Vertical Scaling (Scale Up)**: Adding RAM/CPU to the same machine.
2. **Horizontal Scaling (Scale Out)**: Adding more machines.
3. **Auto-Scaling**: Automatically adjusting resources based on metrics (CPU %).
4. **Limit**: Vertical scaling has a hard hardware limit.
5. **Downtime**: Vertical scaling requires restart; Horizontal does not.

**Hinglish Summary:**

1. **Vertical**: Ek aadmi ko taakatwar banana (Protein shake).
2. **Horizontal**: Kaam karne ke liye 10 aadmi laga dena.
3. **Auto-Scaling**: Bheed dekhte hi aur counter khol dena.
4. **Limit**: Ek aadmi sab kuch nahi kar sakta (Vertical limit).
5. **Downtime**: Vertical mein system band karna padta hai update ke liye.

### [Service Models (IaaS, PaaS, SaaS)](cloud_computing/00_service_models.md)

**English Summary:**

1. **IaaS (Infrastructure)**: You manage OS, Runtime. (Rent a VM).
2. **PaaS (Platform)**: You manage Code & Data. Provider manages OS. (App Service).
3. **SaaS (Software)**: You just use the app. (Gmail, Office 365).
4. **Control**: IaaS > PaaS > SaaS.
5. **Maintenance**: SaaS > PaaS > IaaS (Ease of use).

**Hinglish Summary:**

1. **IaaS**: Pizza ke ingredients lana aur khud banana.
2. **PaaS**: Pizza order karna (Delivery).
3. **SaaS**: Restaurant mein jakar khana (No tension).
4. **Control**: IaaS mein sabse zyada control milta hai.
5. **Maintenance**: SaaS mein koi tension nahi, bas login karo.

### [Shared Responsibility Model](cloud_computing/00_shared_responsibility.md)

**English Summary:**

1. **Concept**: Cloud Provider and Customer split security duties.
2. **On-Premises**: Customer does EVERYTHING.
3. **IaaS**: Provider does physical security; Customer does OS patching.
4. **PaaS**: Provider does OS patching; Customer does App security.
5. **SaaS**: Provider does almost everything; Customer manages definition.

**Hinglish Summary:**

1. **Concept**: Zimmedari baantna.
2. **On-Premises**: Sab kuch khud karna hai (Ghar ka maalik).
3. **IaaS**: Makaan maalik building dekhega, tum ghar ki safai karo.
4. **PaaS**: Maintenance wala sab karega, tum bas furniture lagao.
5. **SaaS**: Hotel room jaisa, sab kuch kiya hua milega.

### [Virtualization](cloud_computing/00_virtualization.md)

**English Summary:**

1. **Hypervisor**: Software that creates and runs VMs.
2. **Type 1 (Bare Metal)**: Runs directly on hardware (Data Centers).
3. **Type 2 (Hosted)**: Runs on OS (VirtualBox on Windows).
4. **Abstraction**: Separating OS from Hardware.
5. **Benefit**: Running multiple OS on one physical machine.

**Hinglish Summary:**

1. **Hypervisor**: Woh software jo nakli computer (VM) banata hai.
2. **Type 1**: Seedha hardware par chalta hai (Badi companies ke liye).
3. **Type 2**: Windows ke upar chalta hai (Humare laptop par).
4. **Abstraction**: Hardware ko ullu banana ki wo multiple OS chala raha hai.
5. **Benefit**: Ek laptop par Linux, Windows sab chalao.

---

## 🖥️ 3. Servers

### [Server Types (Web & Mail)](servers/00_server_types.md)

**English Summary:**

1. **Web Server**: Serves websites via HTTP/S (Apache, Nginx).
2. **Mail Server**: Sends/Receives emails (SMTP, POP3, IMAP).
3. **SMTP**: Protocol for **Sending** mail (Push).
4. **IMAP/POP3**: Protocols for **Receiving** mail (Pull).
5. **Port 25**: Often blocked on Cloud VMs to prevent spam.

**Hinglish Summary:**

1. **Web Server (Restaurant)**: Order lo (Request) aur khana do (Response).
2. **Mail Server (Post Office)**: Chitthi bhejo aur receive karo.
3. **SMTP**: Postman jo chitthi lekar jata hai.
4. **IMAP**: Postbox jahan chitthi aati hai.
5. **Port 25**: Spam rokne ke liye cloud wale isse block rakhte hain.

---

## 🏗️ 4. Application Architecture

### [Monolith vs Microservices](app_architecture/00_monolith_vs_microservices.md)

**English Summary:**

1. **Monolith**: Single code base, single large application.
2. **Microservices**: Application broken into small, independent services.
3. **Scaling**: Microservices allow scaling specific parts independently.
4. **Complexity**: Microservices introduce network complexity and data consistency challenges.
5. **Deployment**: Monolith is easier to deploy initially; Microservices require orchestration (K8s).

**Hinglish Summary:**

1. **Monolith**: Ek bada gola jisme sab kuch hai. Ek kharab toh sab kharab.
2. **Microservices**: Chote chote tukde. Ek kharab hua toh baaki chalte rahenge.
3. **Scaling**: Sirf wo hissa bada karo jispe load hai.
4. **Complexity**: Tukdon ko jodna mushkil hota hai.
5. **Deployment**: Shuru mein Monolith asaan, baad mein Microservices behtar.

### [Stateful vs Stateless](app_architecture/00_stateful_applications.md) & [Stateless](app_architecture/00_stateless_applications.md)

**English Summary:**

1. **Stateful**: Server remembers user data (Session). Hard to scale.
2. **Stateless**: Server treats every request as new. Easy to scale.
3. **Database**: Stateful apps rely on local memory; Stateless use external DB.
4. **Example**: Shopping Cart (Stateful) vs REST API (Stateless).
5. **Cloud**: Stateless is preferred for cloud scaling.

**Hinglish Summary:**

1. **Stateful**: Dukaandaar jo tumhe pehchanta hai (Udhaar khata rakhta hai).
2. **Stateless**: Vending machine (Usse farak nahi padta tum kaun ho, paise do samaan lo).
3. **Database**: Stateless mein hum memory bahar rakhte hain.
4. **Example**: Login session (Stateful) vs Google Search (Stateless).
5. **Cloud**: Cloud par Stateless behtar hai kyunki server badal sakte hain.

---

## ☁️ 5. Azure Services (Resources)

### [01. Resource Hierarchy](azure_services/01_resource_hierarchy.md)

**Summary:**

- Management Groups > Subscriptions > Resource Groups > Resources.
- **Hinglish**: Folder structure jaisa. Management Group sabse upar, Resource sabse neeche.

### [02. Resource Groups](azure_services/02_resource_groups.md)

**Summary:**

- Logical container for resources. Everything MUST be in a RG.
- **Hinglish**: Ek Bag jisme saara samaan rakhte hain taaki manage karna asaan ho.

### [03. Virtual Machines](azure_services/03_virtual_machines.md)

**Summary:**

- IaaS offering. You get a virtual PC in the cloud.
- **Hinglish**: Cloud par kiraye ka computer. OS tum sambhalo.

### [04. Storage Accounts](azure_services/04_storage_services.md)

**Summary:**

- Blob (Files), File (SMB), Queue (Messages), Table (NoSQL).
- **Hinglish**: Cloud ka Hard Drive. Photo, video, documents rakhne ke liye.

### [05. VM Scale Sets](azure_services/05_vm_scale_sets.md)

**Summary:**

- Automatically creating identical VMs to handle load (Auto-scaling).
- **Hinglish**: Ek click mein 1000 computers ready karna load handle karne ke liye.

### [06. Azure Virtual Desktop](azure_services/06_azure_virtual_desktop.md)

**Summary:**

- Remote desktop experience delivered from Azure.
- **Hinglish**: Cloud se chalne wala Windows 10/11 pura desktop experience.

### [07. Container Instances](azure_services/07_azure_container_instances.md)

**Summary:**

- Run Docker containers without managing servers. Fast & Simple.
- **Hinglish**: Bina server setup kiye code (Container) run karna. "Serverless Container".

### [08. Azure Functions](azure_services/08_azure_functions.md)

**Summary:**

- Serverless Compute. Run code on event (HTTP, Timer). Pay per execution.
- **Hinglish**: Sirf code likho. Server ka tension nahi. Jab code chalega tabhi paise lagenge.

### [09. Virtual Networks](azure_services/09_virtual_networks.md)

**Summary:**

- Private network in the cloud. Isolation, Subnets, Peering.
- **Hinglish**: Cloud mein apna private network banana. Iske bina VMs baat nahi kar sakte.

### [10. Subnets](azure_services/10_subnets.md)

**Summary:**

- Dividing a VNet into smaller segments (e.g., Frontend, Backend).
- **Hinglish**: Bade network ke chote hisse. Jaise ghar ke alag alag kamre.
