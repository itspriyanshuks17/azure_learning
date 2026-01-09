# ⚖️ Scalability & Auto Scaling

## 📌 Overview
Scalability is the ability of a system to handle increased load. In Azure, this is a core benefit of the cloud. You can add resources manually or automatically to meet demand.

---

## 1. Types of Scaling

### ⬆️ Vertical Scaling (Scale Up/Down)
"Making the machine bigger."
- **Action**: Increasing the size (CPU, RAM) of a Virtual Machine.
- **Example**: Moving from a `Standard_D2s_v3` (2 vCPU, 8GB RAM) to a `Standard_D4s_v3` (4 vCPU, 16GB RAM).
- **Cons**: Requires downtime (reboot usually needed). Limited by maximum hardware size.
- **Use Case**: Monolithic apps that are hard to distribute.

### ↔️ Horizontal Scaling (Scale Out/In)
"Adding more machines."
- **Action**: Adding more instances of the same VM to a pool.
- **Example**: Increasing your web server count from 2 VMs to 5 VMs.
- **Pros**: Zero downtime (add/remove nodes while others run). Theoretically infinite scale.
- **Use Case**: Web applications, Microservices.

---

## 2. Azure Scaling Solutions

### 🖥️ Azure Virtual Machine Scale Sets (VMSS)
Allows you to create and manage a group of load-balanced VMs. The number of VM instances can automatically increase or decrease in response to demand or a defined schedule.
- **Feature**: Supports up to 1,000 VM instances.
- **Use Case**: Running large compute workloads, Big Data clusters, or container orchestration nodes (AKS nodes).

### 🌐 Azure App Service Autoscale
Built-in feature for PaaS Web Apps.
- **Action**: Increases the number of instances running your Web App code.
- **Triggers**: Scale based on CPU usage > 70%, Memory usage, or Queue depth.

---

## 3. Elasticity
The ability to **automatically** scale out and scale in based on demand.
- **Scenario**:
    - **9:00 AM**: Users log in. Azure Autoscale adds 5 VMs (Scale Out).
    - **6:00 PM**: Users log off. Azure Autoscale removes 4 VMs (Scale In).
- **Benefit**: **Cost Optimization**. You only pay for the 5 VMs during the day, and only 1 VM at night.

---

## 💡 Exam Tips for AZ-900
- **Scalability**: Manual or planned capacity increase.
- **Elasticity**: Dynamic, automatic scaling based on demand (spikes).
- **Vertical**: Resize the VM (Restart required).
- **Horizontal**: Add more VMs (No restart required).
