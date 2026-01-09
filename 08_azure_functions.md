# ⚡ Azure Functions

## 📌 Overview

**Azure Functions** is a **serverless compute service** that lets you run **event-triggered code** without having to explicitly provision or manage infrastructure.

- **Philosophy**: "Focus on the code, not the plumbing."
- **Event-Driven**: It sits idle until something happens (e.g., a file is uploaded, a timer hits 9 AM, an HTTP request arrives).

---

## 1. Key Concepts

### 🔫 Triggers

A **Trigger** is what causes the function to start running.

- **Timer Trigger**: Run a cleanup job every night at 3 AM.
- **HTTP Trigger**: Run code when an API endpoint is hit.
- **Blob Trigger**: Run code when a new image is uploaded to Storage (e.g., to resize it).
- **Cosmos DB Trigger**: Run code when a new document is added to the database.
  > **Rule**: A function must have exactly one trigger.
  >

### 🔗 Bindings

**Bindings** are a declarative way to connect data to your function code. They save you from writing boilerplate connection code.

- **Input Binding**: "Fetch the specific Blob that triggered this function and give it to me as a variable."
- **Output Binding**: "Take this result variable and write it to a Queue message."

---

## 2. Hosting Plans

You pay differently depending on how you host your function.

### 🥤 Consumption Plan (Serverless)

- **Billing**: You pay **only** when the function is running.
- **Scaling**: Scales automatically to zero when idle.
- **Limitations**: **Cold Start** (latency for the first request after being idle), 10-minute max execution time.
- **Best For**: Unpredictable traffic, cost optimization.

### 💎 Premium Plan

- **Billing**: Pre-warmed instances (always ready).
- **Benefits**: No Cold Start, VNET integration, longer run duration.
- **Best For**: Production APIs requiring instant response.

### 🏢 App Service Plan (Dedicated)

- **Billing**: Monthly fee (you rent the VM).
- **Benefits**: Run on the same dedicated VMs as your other App Services.
- **Best For**: Predictable usage, reusing existing infrastructure.

---

---

## 3. 🛠️ Hands-on: Create a Function App

### Step 1: Create a Resource Group

```bash
az group create --name myResourceGroup --location eastus2
```

### Step 2: Create a Storage Account (Required)

Function Apps require a storage account to manage triggers and logging.

> **Note**: Your subscription has a restricted list of allowed regions.
> If `eastus2` fails, try: `westus2`, `northeurope`, `southeastasia`.

```bash
az storage account create \
  --name priyanshuksharma$RANDOM \
  --resource-group myResourceGroup \
  --location eastasia \
  --sku Standard_LRS
```

### Step 3: Create the Function App

Replace `<storage_name>` with the name generated above.

```bash
az functionapp create \
  --resource-group myResourceGroup \
  --consumption-plan-location eastasia \
  --runtime node \
  --functions-version 4 \
  --name myUniqueFunctionApp$RANDOM \
  --storage-account <storage_name>
```

---

## 💡 Exam Tips for AZ-900

- **Stateless**: By default, Azure Functions are stateless (they handle a request and forget).
- **Durable Functions**: An extension that lets you write **stateful** functions (e.g., waiting for manual approval in a workflow).
- **Max Time**: Consumption plan has a timeout (default 5 mins, max 10 mins). For long-running tasks, use a Dedicated plan or Logic Apps.
