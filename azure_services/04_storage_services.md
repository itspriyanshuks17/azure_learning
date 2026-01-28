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

```text
     +--------------------+
     | User / Application |
     +--------------------+
             |
             v
  +-------------------------+
  |  Azure Storage Account  |
  +-------------------------+
    |      |      |      |
    |      |      |      +---> [ Blob Storage ] (Objects/Files)
    |      |      |
    |      |      +----------> [ File Storage ] (SMB Shares)
    |      |
    |      +-----------------> [ Queue Storage ] (Messaging)
    |
    +------------------------> [ Table Storage ] (NoSQL)
    |
    +------------------------> [ Managed Disks ] (VM Storage)
```

---

---

## ☁️ Azure Blob Storage Types

In Azure, **Blob (Binary Large Object)** storage is used to store massive amounts of unstructured data. There are **three main types** of blobs tailored for different needs.

### 1. Block Blobs 🧱

**Best for**: Storing text, binary data, documents, photos, and videos.

- **Architecture**: Data is broken into small "Blocks". Each block can be managed individually.
- **Maximum Size**: Up to ~190.7 TiB.
- **Key Feature**: Optimized for uploading large amounts of data efficiently.
- **Hinglish**: Ye generic storage hai. Jaise tumhare Google Drive pe photos ya PDF hotey hain, waisa hi Block Blob hai. Data ko chhote-chhote 'blocks' mein baant kar save karta hai.

### 2. Append Blobs 📝

**Best for**: Logging and auditing.

- **Architecture**: Similar to Block Blobs, but you can only **add (append)** new data to the end of the blob.
- **Use Case**: Logging data from virtual machines.
- **Key Feature**: Existing data cannot be modified or deleted; only new data can be added.
- **Hinglish**: Ye 'Register' ki tarah hai. Tum sirf naya data niche likh sakte ho (Append), purana mita nahi sakte. Logs maintain karne ke liye best hai.

### 3. Page Blobs 📄

**Best for**: Random read/write operations and Virtual Machine disks (VHDs).

- **Architecture**: Data is organized in 512-byte pages.
- **Use Case**: Azure Virtual Machine disks (OS and Data disks).
- **Key Feature**: Optimized for random access, meaning you can jump to any part of the file quickly.
- **Hinglish**: Ye Virtual Machine ki **Hard Disk** ki tarah kaam karta hai. Isme system kahin bhi (randomly) read/write kar sakta hai.

---

## ⚖️ Summary Table: Azure Blobs

| Feature           | Block Blobs                   | Append Blobs        | Page Blobs        |
| :---------------- | :---------------------------- | :------------------ | :---------------- |
| **Primary Use**   | General files (Images, Video) | Logs, Journaling    | VM Disks (VHDs)   |
| **Data Access**   | Sequential                    | Append-only         | Random Read/Write |
| **Max Size**      | ~190.7 TiB                    | ~195 GiB            | 8 TiB             |
| **Hinglish Core** | Normal File storage           | Lock/Register style | Virtual Hard Disk |

---

## Common Use Cases

- Storing application logs, backups, and media files.
- File shares for applications.
- Messaging between microservices using queues.
- Storing structured NoSQL data using tables.
- Persistent storage for VMs.

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

- **Storage Account Names** must be **globally unique** and lowercase.
- **StorageV2** is recommended (supports all features).
- Use **Azure AD authentication** for secure access instead of account keys.
- Select **replication type** based on durability requirements.
- Blob Storage supports **Hot, Cool, and Archive tiers** for cost optimization.
