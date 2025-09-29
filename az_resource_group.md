# Azure Resource Group (RG)

## Overview
- A **Resource Group (RG)** is a **logical container** for Azure resources.
- It helps manage and organize resources like VMs, VNets, Storage Accounts, Databases, etc.
- Every Azure resource **must belong to exactly one Resource Group**.
- Acts as a **lifecycle boundary** – you can create, update, and delete resources as a group.

---

## Key Features
- **Logical Organization**: Group related resources together.
- **Lifecycle Management**: Delete the group → all resources inside are deleted.
- **Access Control**: Apply RBAC (Role-Based Access Control) at the group level.
- **Tagging**: Add metadata (like `env=dev`, `project=xyz`) for cost and management.
- **Deployment Scope**: Resource Manager templates (ARM/Bicep) target a Resource Group.

---

## Workflow

```mermaid
flowchart TD
    A[User/DevOps] --> B[Azure CLI / Portal / PowerShell]
    B --> C[Azure Subscription]
    C --> D[Resource Group]
    D --> E[Resources: VM, VNet, Storage, DB, etc.]
````

---

## Common Use Cases

* Grouping all resources of a project/application.
* Applying common policies (RBAC, tags) across resources.
* Simplifying billing by grouping related services.
* Easier cleanup (delete RG → delete all inside).

---

## Steps to Manage Resource Groups using Azure CLI

### 1. Login to Azure

```bash
az login
```

### 2. List All Resource Groups

```bash
az group list -o table
```

### 3. Create a Resource Group

```bash
az group create \
  --name MyResourceGroup \
  --location eastus
```

### 4. Get Details of a Resource Group

```bash
az group show --name MyResourceGroup -o json
```

### 5. Tag a Resource Group

```bash
az group update \
  --name MyResourceGroup \
  --set tags.Project=Demo tags.Environment=Dev
```

### 6. Delete a Resource Group

```bash
az group delete --name MyResourceGroup --yes --no-wait
```

---

## Notes

* **Resource Groups are regional** → all resources inside must be in the same region (with some exceptions like DNS).
* Best practice: One RG per **application lifecycle stage** (e.g., `App1-Dev-RG`, `App1-Prod-RG`).
* Use **naming conventions** for better clarity.
* Deleting a Resource Group deletes **all associated resources** permanently.

