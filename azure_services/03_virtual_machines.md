# Azure Virtual Machines (VMs)

## Overview

- Azure Virtual Machines (VMs) provide **Infrastructure as a Service (IaaS)**.
- Allow running **Windows** or **Linux** workloads in the cloud.
- Fully customizable compute, storage, and networking options.
- Useful for hosting apps, databases, or as development/test environments.

---

## Key Features

- Supports multiple OS (Windows, Linux, custom images).
- Flexible sizes: General-purpose, Compute-optimized, Memory-optimized, GPU.
- Integrated with **Azure Networking** (VNet, Subnets, NSGs).
- Supports **scaling** via Virtual Machine Scale Sets.
- High availability using **Availability Sets** and **Zones**.
- Integration with **Azure Monitor** and **Security Center**.

---

## Workflow

```text
    +-----------------+
    |   User / DevOps |
    +-----------------+
            |
            v
    +-------------------------------+
    | Azure CLI / Portal / Powershell|
    +-------------------------------+
            |
            v
    +-----------------------+
    |    Resource Group     |
    +-----------------------+
      |        |        |
      |        |        +---> [ Virtual Network + Subnet ] --> [ Network Security Group ]
      |        |
      |        +------------> [ Storage: OS Disk / Data Disk ]
      |
      v
  +-----------------+
  | Virtual Machine | ----> [ Public/Private IP ]
  +-----------------+
```

---

## Common Use Cases

- Hosting web applications.
- Running development/test environments.
- Migrating on-premises apps to the cloud.
- High-performance workloads with GPU/compute-intensive VMs.

---

## Steps to Create a VM using Azure CLI

### 1. Login to Azure

```bash
az login
```

### 2. Create a Resource Group

```bash
az group create --name MyResourceGroup --location eastus
```

### 3. Create a Virtual Network & Subnet

```bash
az network vnet create \
  --resource-group MyResourceGroup \
  --name MyVNet \
  --subnet-name MySubnet
```

### 4. Create a Public IP Address

```bash
az network public-ip create \
  --resource-group MyResourceGroup \
  --name MyPublicIP
```

### 5. Create a Network Security Group (NSG) and Allow SSH/HTTP

```bash
az network nsg create \
  --resource-group MyResourceGroup \
  --name MyNSG

# Allow SSH (Linux VM)
az network nsg rule create \
  --resource-group MyResourceGroup \
  --nsg-name MyNSG \
  --name AllowSSH \
  --protocol tcp \
  --priority 1000 \
  --destination-port-ranges 22 \
  --access allow

# Allow RDP (Windows VM)
az network nsg rule create \
  --resource-group MyResourceGroup \
  --nsg-name MyNSG \
  --name AllowRDP \
  --protocol tcp \
  --priority 1001 \
  --destination-port-ranges 3389 \
  --access allow
```

### 6. Create a Network Interface Card (NIC)

```bash
az network nic create \
  --resource-group MyResourceGroup \
  --name MyNIC \
  --vnet-name MyVNet \
  --subnet MySubnet \
  --network-security-group MyNSG \
  --public-ip-address MyPublicIP
```

### 7. Create the VM

```bash
az vm create \
  --resource-group MyResourceGroup \
  --name MyVM \
  --nics MyNIC \
  --image UbuntuLTS \
  --admin-username azureuser \
  --generate-ssh-keys
```

### 8. Open Ports (if needed, e.g., HTTP/HTTPS)

```bash
az vm open-port --port 80 --resource-group MyResourceGroup --name MyVM
az vm open-port --port 443 --resource-group MyResourceGroup --name MyVM
```

### 9. Connect to VM

- **Linux VM (SSH):**

  ```bash
  ssh azureuser@<PublicIP>
  ```

- **Windows VM (RDP):**

  - Use Remote Desktop Client → Enter `<PublicIP>`.

---

## Notes

- Always place VMs inside a **Resource Group**.
- Use **Managed Disks** instead of unmanaged for reliability.
- Tag resources for better management (`--tags env=dev project=test`).
- Monitor with **Azure Monitor** and **Log Analytics**.
