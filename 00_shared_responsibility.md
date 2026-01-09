# 🤝 Azure Shared Responsibility Model

## 📌 Overview

The **Shared Responsibility Model** is a fundamental cloud security concept. In an on-premises datacenter, you own the whole stack (from physical security to applications). In the cloud, Microsoft Azure takes over some physical and operational burdens, but **you** remain responsible for other aspects.

> **Key Concept**: Security **OF** the Cloud (Azure's job) vs. Security **IN** the Cloud (Your job).

---

## 🏗️ Responsibility Matrix

The division of responsibility depends on the cloud service model (IaaS, PaaS, or SaaS).

| Responsibility                 | On-Premises | IaaS (Infrastructure as a Service) | PaaS (Platform as a Service) | SaaS (Software as a Service) |
| :----------------------------- | :---------: | :--------------------------------: | :--------------------------: | :--------------------------: |
| **Information & Data**         |   👤 You    |               👤 You               |            👤 You            |            👤 You            |
| **Devices (Mobile/PC)**        |   👤 You    |               👤 You               |            👤 You            |            👤 You            |
| **Accounts & Identities**      |   👤 You    |               👤 You               |            👤 You            |            👤 You            |
| **Identity & Directory Infra** |   👤 You    |               👤 You               |          🤝 Shared           |         ☁️ Microsoft         |
| **Applications**               |   👤 You    |               👤 You               |     🤝 Shared / ☁️ Msft      |         ☁️ Microsoft         |
| **Network Controls**           |   👤 You    |               👤 You               |          🤝 Shared           |         ☁️ Microsoft         |
| **Operating System**           |   👤 You    |               👤 You               |         ☁️ Microsoft         |         ☁️ Microsoft         |
| **Physical Hosts**             |   👤 You    |            ☁️ Microsoft            |         ☁️ Microsoft         |         ☁️ Microsoft         |
| **Physical Network**           |   👤 You    |            ☁️ Microsoft            |         ☁️ Microsoft         |         ☁️ Microsoft         |
| **Physical Datacenter**        |   👤 You    |            ☁️ Microsoft            |         ☁️ Microsoft         |         ☁️ Microsoft         |

---

## 🔍 Detailed Breakdown

### 1. ☁️ Microsoft's Responsibility (Security OF the Cloud)

Microsoft covers the global infrastructure and foundational services.

- **Physical Security**: Guards, fences, cameras at Azure datacenters.
- **Host Infrastructure**: Compute servers, storage arrays, networking hardware.
- **Virtualization Layer**: The hypervisor (Hyper-V context) ensuring tenant isolation.
- **Compliance**: Adhering to standards (ISO, SOC, HIPAA, FedRAMP).

### 2. 👤 Your Responsibility (Security IN the Cloud)

You are always responsible for:

- **Data**: Data classification, encryption (at rest and in transit).
- **Endpoints**: Securing devices that connect to Azure.
- **Accounts**: Identity management (MFA, RBAC, PIM) using **Microsoft Entra ID** (formerly Azure AD).
- **Access Management**: Who can do what in your Azure subscription.

### 3. 🤝 Shared Responsibility

Some layers vary based on the service type:

- **Patching**:
  - **IaaS (e.g., Azure VM)**: You patch the OS.
  - **PaaS (e.g., Azure SQL)**: Microsoft patches the OS/DB engine; you manage firewall rules.
- **Networking**:
  - **IaaS**: You configure VNETs, NSGs, and Route Tables.
  - **PaaS**: Microsoft provides the connectivity; you configure Service Endpoints/Private Links.

---

---

## 💡 Hinglish Explanation (Zimmedari)

### **1. On-Premises (Khud ka Ghar)**

- **Hinglish**: Zameen khareedne se lekar, ghar banane, aur gate par tala lagane tak—sab zimmedari aapki hai.

### **2. IaaS (Kiraye ka Flat)**

- **Hinglish**: Landlord (Microsoft) building ki security aur maintenance dekhega. Par flat ke andar ka tala lagana aur apni cheezein sambhalna **aapki** zimmedari hai.

### **3. PaaS (Hotel)**

- **Hinglish**: Hotel (Microsoft) building, room service, aur furniture dekhega. Aap bas apne samaan (Data + Apps) ke zimmedar ho.

### **4. SaaS (Online Cab)**

- **Hinglish**: Driver (Microsoft) gaadi chalayega, maintenance karega. Aap bas baitho aur enjoy karo. Par apna wallet aur phone (Data/Identity) sambhalna ab bhi **aapki** zimmedari hai.

> **Yaad Rakhein**: **DATA** ki zimmedari hamesha AAPKI hoti hai, chahe woh koi bhi model ho. Microsoft aapke data ka backup by default nahi lega (unless aap configure karein).

---

## 💡 Exam Tips for AZ-900

- **SaaS**: Microsoft handles the most (e.g., Office 365). You only really manage Data & Identity.
- **IaaS**: You handle the most (e.g., Azure VMs). You are responsible for the O.S. (patching, anti-virus).
- **On-Premises**: You handle everything.
- **ALWAYS Your Responsibility**: Data, Endpoints, Accounts, Access Management.
