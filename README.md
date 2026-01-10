# 🚀 Azure Learning Guide (AZ-900)

A comprehensive, hands-on guide to **Microsoft Azure** fundamentals covering core services, cloud concepts, security, and architecture. This repository contains detailed notes and guides to help you master Azure and prepare for the **AZ-900: Microsoft Azure Fundamentals** exam.

## 📚 Table of Contents

### ☁️ Module 1: Cloud Concepts (25-30%)

- **[00. Benefits of Cloud Computing](00_cloud_benefits.md)**

  - **Definition**: HA, Scalability, Elasticity, Agility, Geo-distribution, DR.
  - **Key**: Understanding the "Why" behind cloud adoption.

- **[00. Azure Shared Responsibility Model](00_shared_responsibility.md)**

  - **Definition**: Fundamental security model defining what Microsoft manages vs what YOU manage.
  - **Key**: Security **OF** the Cloud (Physical, Network) vs Security **IN** the Cloud (Data, Identity).

- **[00. Deployment Models](00_deployment_models.md)**

  - **Definition**: Public, Private, Hybrid, and Multi-Cloud.
  - **Key**: CapEx vs OpEx; Azure Arc for hybrid management.

- **[00. Cloud Service Models (IaaS, PaaS, SaaS)](00_service_models.md)**

  - **Definition**: IaaS (VMs), PaaS (App Service), SaaS (M365).
  - **Key**: Understanding the trade-off between Control and Management overhead.

- **[00. Scalability & Auto Scaling](00_scaling.md)**

  - **Definition**: Vertical vs Horizontal Scaling; Elasticity.
  - **Key**: Azure Virtual Machine Scale Sets (VMSS) and Autoscale rules.

- **[00. Monolith vs Microservices](00_monolith_vs_microservices.md)**

  - **Definition**: Comparison of architecture styles.
  - **Key**: Decoupling services using Azure Functions and Service Bus.

- **[00. Stateless vs Stateful Applications](00_stateless_applications.md)**

  - **Definition**: Designing for the cloud using external state stores (Redis/Cosmos DB).
  - **Key**: Why statelessness enables massive horizontal scaling.

- **[00. Virtualization & Containers](00_virtualization.md)**

  - **Definition**: How the hypervisor works and the difference between VMs and Containers.
  - **Key**: Azure Kubernetes Service (AKS) concept.

- **[00. Containerization & Docker](00_containers.md)**

  - **Definition**: Containers (OS Virtualization) vs VMs (Hardware Virtualization).
  - **Key**: Docker, Kubernetes, and Azure Container Instances (ACI).

- **[00. Azure Load Balancers](00_load_balancers.md)**

  - **Definition**: Distributing traffic.
  - **Key**: Azure Load Balancer (L4) vs Application Gateway (L7/WAF) vs Traffic Manager (DNS).

- **[00. OSI Model & Azure](00_osi_model.md)**

  - **Definition**: 7 Layers of networking (Physical to Application).
  - **Key**: L4 (Load Balancer) vs L7 (App Gateway).

- **[00. Cross-Origin Resource Sharing (CORS)](00_cors.md)**

  - **Definition**: Browser security mechanism allowing cross-domain requests.
  - **Key**: Same-Origin Policy, Preflight Requests, Access-Control-Allow-Origin.

- **[00. IP Addresses & Versions](00_ip_addresses.md)**

  - **Definition**: Public vs Private, IPv4 vs IPv6.
  - **Key**: Reachability, Static vs Dynamic, Address Exhaustion.

- **[00. Area Networks (LAN, WAN, VLAN)](00_area_networks.md)**

  - **Definition**: Types of networks by scope (Local, Wide, Metro).
  - **Key**: VLAN (Virtual Isolation), WAN (Inter-connect), SAN (Storage).

- **[00. IP Classes & IANA](00_ip_classes.md)**

  - **Definition**: Classful addressing (A, B, C, D, E), NID vs HID.
  - **Key**: Default Subnet Masks, Private IP Ranges (RFC 1918), Loopback.

- **[00. Network Architecture & Topologies](00_network_architecture.md)**

  - **Definition**: How networks are structured (Hub-Spoke, Mesh, 3-Tier).
  - **Key**: Hub & Spoke Benefits, N-Tier Logic, Centralized Management.

- **[00. OSI Model & Azure](00_osi_model.md)**

  - **Definition**: 7 Layers of networking (Physical to Application).
  - **Key**: L4 (Load Balancer) vs L7 (App Gateway).

- **[00. TCP/IP Model](00_tcp_ip_model.md)**
  - **Definition**: The 4-layer model used by the Internet (Application, Transport, Internet, Network Interface).
  - **Key**: TCP vs UDP; Encapsulation.

### 🏗️ Module 2: Azure Core Architecture & Services (35-40%)

- **[01. Azure Resource Hierarchy](01_resource_hierarchy.md)**

  - **Definition**: Management Groups -> Subscriptions -> Resource Groups -> Resources.
  - **Key**: Inheritance of RBAC and Policies.

- **[02. Azure Resource Groups](02_resource_groups.md)**

  - **Definition**: Logical container for resources deployed on Azure.
  - **Key**: Lifecycle management, RBAC scopes, and region independence.

- **[03. Azure Virtual Machines (VMs)](03_virtual_machines.md)**

  - **Use Case**: IaaS workloads, Lift and Shift, Custom OS requirements.
  - **Key**: Availability Sets vs Availability Zones.

- **[04. Azure Storage Services](04_storage_services.md)**

  - **Use Case**: Storing blobs, files, queues, and tables.
  - **Key**: Blob access tiers (Hot, Cool, Archive, Cold).

- **[05. Azure VM Scale Sets (VMSS)](05_vm_scale_sets.md)**

  - **Use Case**: Autoscaling identical VMs for high traffic.
  - **Key**: Horizontal Scaling vs Vertical Scaling; Autoscaling rules.

- **[06. Azure Virtual Desktop (AVD)](06_azure_virtual_desktop.md)**

  - **Use Case**: Cloud VDI, Remote work, Windows 11 Multi-session.
  - **Key**: Host Pools and FSLogix profiles.

- **[07. Azure Container Instances (ACI)](07_azure_container_instances.md)**

  - **Use Case**: Simple apps, Task automation, Dev/Test.
  - **Key**: Serverless containers, Container Groups.

- **[08. Azure Functions](08_azure_functions.md)**

  - **Use Case**: Event-driven code (Serverless), responding to triggers.
  - **Key**: Triggers vs Bindings; Consumption Plan (Pay-per-use).

- **[09. Azure Virtual Networks (VNet)](09_virtual_networks.md)**

  - **Use Case**: Private network in the cloud, Isolation, Segmentation.
  - **Key**: Subnets (CIDR), NSG vs ASG, Peering, VPN Gateway.

- **[10. Azure Subnets](10_subnets.md)**
  - **Use Case**: Network segmentation, Security filtering.
  - **Key**: CIDR Notation (/24 vs /16), Reserved IPs (5), Service Endpoints.

---

## 🎯 Structured Learning Path (AZ-900)

### Phase 1: Foundation (Cloud Concepts)

1. **Understand terminology**: High Availability, Scalability, Elasticity, Agility.
2. **Master the Models**: Know the difference between IaaS/PaaS/SaaS inside out.
3. **Economics**: Understand CapEx (Upfront) vs OpEx (Pay-as-you-go).

### Phase 2: Core Services

1. **Compute**: When to use a VM vs App Service vs Function.
2. **Networking**: Virtual Networks, Subnets, and how Traffic Manager routes global users.
3. **Storage**: Blob Storage scenarios and redundancy options (LRS/ZRS/GRS).

### Phase 3: Security & Governance

1. **Identity**: Microsoft Entra ID (formerly Azure AD), MFA, RBAC.
2. **Governance**: Policy, Blueprints, Resource Locks, and Cost Management.

## 🛠️ Prerequisites & Setup

### Required Accounts & Tools

- **Azure Free Account** - [Sign up here](https://azure.microsoft.com/free/) (Contains $200 credit).
- **Azure CLI** - [Installation guide](https://docs.microsoft.com/cli/azure/install-azure-cli).
- **VS Code** - With Azure Tools extension pack.

### Initial Setup Checklist

- [x] Create Azure Free Account.
- [x] Install Azure CLI (`az login`).
- [ ] Create your first Resource Group.
- [ ] explore the Azure Portal search bar.

## 💡 Exam Cheat Sheet (Quick Tips)

- **IoT Hub**: Bi-directional communication with millions of IoT devices.
- **IoT Central**: SaaS solution for IoT (No coding required).
- **Azure Databricks**: Apache Spark-based analytics.
- **HDInsight**: Open-source analytics (Hadoop, Kafka).
- **Azure Synapse**: Enterprise data warehousing + Big Data analytics.
- **Azure Sentinel**: Cloud-native SIEM (Security Info & Event Management).
- **Azure Key Vault**: Store secrets/keys/certificates securely.
- **DDoS Protection**: Basic (Free) vs Standard (Paid).

---

## 📞 Support & Contributions

### Found an Issue?

- Create an issue in this repository.
- Specify which AZ-900 concept needs correction.

_Last updated: January 2026 | AZ-900 Aligned_
