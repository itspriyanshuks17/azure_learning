# 💾 Stateful Applications

## 📌 Overview

While modern cloud apps prefer statelessness, **Stateful Applications** save data on the local disk or memory of the server instance.

---

## 1. Use Cases

- **Databases**: SQL Server, MySQL, PostgreSQL. They _must_ persist data to disk.
- **Legacy Apps**: Older apps designed before modern cloud patterns.
- **Real-time Gaming**: Where microsecond latency matters, and state is kept in memory.

---

## 2. Challenges in Azure

If you run a Stateful App on an Azure VM:

- **Scaling is Hard**: You can't just add a new VM because it won't have the data from the first VM.
- **Failover**: If the VM dies, the local data might be lost (unless using persistent attached storage like Premium SSDs).

## 3. Azure Solutions for Stateful Workloads

### A. Session Affinity (Sticky Sessions)

If you have a legacy web app that keeps sessions in memory:

- Configure **Azure Application Gateway** with **Cookie-based Affinity**.
- **How it works**: The Load Balancer ensures User A _always_ goes to Server A.
- **Downside**: If Server A crashes, User A loses their session.

### B. Stateful Sets (AKS)

In Kubernetes (AKS), you can use **StatefulSets**.

- Ensures pods stay sticky to a specific Persistent Volume (Azure Disk).
- Good for running Databases inside containers (e.g., Mongo/Cassandra).

---

## 💡 Hinglish Explanation

- **Stateful**: Jaise aapne apne laptop ke Desktop pe file save ki. Agar laptop kharab hua, file gayi.
- **Problem**: Cloud mein VMs kabhi bhi restart ho sakti hain. Isliye important data VM ke andar maat rakho.
- **Solution (External State)**: Data ko Google Drive (Database/Storage) pe rakho. Ab chahe laptop badal lo, data wahi milega.

---

## 💡 Summary

- Avoid building new Stateful web apps.
- If you must (Databases), use **Managed Services** like **Azure SQL Database** which handle the "State" complexity (replication, backups) for you.
