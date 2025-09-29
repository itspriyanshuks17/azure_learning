# Azure Storage Account

## Overview
- Azure Storage Account provides **scalable cloud storage** for:
  - Blobs (object storage)
  - Files (SMB/NFS shares)
  - Queues (messaging)
  - Tables (NoSQL key-value)
  - Disks (VM storage)
- Acts as a **single namespace** to manage all types of storage.
- Provides **high availability, durability, and security**.

---

## Key Features
- **Multiple storage types**:
  - **Blob Storage**: unstructured data (images, videos, logs).
  - **File Storage**: managed file shares.
  - **Queue Storage**: reliable messaging between apps.
  - **Table Storage**: NoSQL key-value database.
  - **Disk Storage**: for Azure VMs.
- **Replication Options**:
  - LRS (Locally Redundant Storage)
  - GRS (Geo-Redundant Storage)
  - ZRS (Zone-Redundant Storage)
- **Access Control**:
  - Shared Access Signature (SAS)
  - Azure AD integration
- **Secure**: Encryption at rest, HTTPS only access.

---

## Workflow

```mermaid
flowchart TD
    A[User/Application] --> B[Azure Storage Account]
    B --> C[Blob Storage]
    B --> D[File Storage]
    B --> E[Queue Storage]
    B --> F[Table Storage]
    B --> G[Managed Disks for VM]
````

---

## Common Use Cases

* Storing application logs, backups, and media files.
* File shares for applications.
* Messaging between microservices using queues.
* Storing structured NoSQL data using tables.
* Persistent storage for VMs.

---

## Steps to Manage Storage Account using Azure CLI

### 1. Login to Azure

```bash
az login
```

### 2. Create a Resource Group (if not exists)

```bash
az group create --name MyResourceGroup --location eastus
```

### 3. Create a Storage Account

```bash
az storage account create \
  --name mystorageacct123 \
  --resource-group MyResourceGroup \
  --location eastus \
  --sku Standard_LRS \
  --kind StorageV2
```

### 4. List Storage Accounts

```bash
az storage account list -o table
```

### 5. Get Storage Account Keys

```bash
az storage account keys list \
  --resource-group MyResourceGroup \
  --account-name mystorageacct123
```

### 6. Create a Blob Container

```bash
az storage container create \
  --name mycontainer \
  --account-name mystorageacct123
```

### 7. Upload a File to Blob

```bash
az storage blob upload \
  --container-name mycontainer \
  --file ./localfile.txt \
  --name remotefile.txt \
  --account-name mystorageacct123
```

### 8. Download a Blob

```bash
az storage blob download \
  --container-name mycontainer \
  --name remotefile.txt \
  --file ./downloadedfile.txt \
  --account-name mystorageacct123
```

### 9. Delete Storage Account (Caution!)

```bash
az storage account delete --name mystorageacct123 --resource-group MyResourceGroup --yes
```

---

## Notes

* **Storage Account Names** must be **globally unique** and lowercase.
* **StorageV2** is recommended (supports all features).
* Use **Azure AD authentication** for secure access instead of account keys.
* Select **replication type** based on durability requirements.
* Blob Storage supports **Hot, Cool, and Archive tiers** for cost optimization.
