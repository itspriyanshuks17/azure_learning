# 🖥️ Azure Virtual Desktop (AVD)

## 📌 Overview

**Azure Virtual Desktop (AVD)** is a **desktop and app virtualization service** that **runs on the cloud**. It allows **users to access a full Windows desktop** or specific apps from any device (laptop, tablet, phone) securely.

- **Formerly known as**: Windows Virtual Desktop (WVD).
- **Core Concept**: Your "computer" isn't on your desk; it's a VM in Azure that is streamed to your screen.

---

## 1. Why AVD? (Key Benefits)

### 👥 Windows 10/11 Multi-session

This is a **unique** feature available ONLY in Azure.

- **Traditional VDI**: 1 User = 1 VM. Expensive.
- **AVD Multi-session**: Multiple users can log into the **same** Windows 11 VM simultaneously.
- **Benefit**: Drastically reduces cost (you pay for fewer VMs).

### 🚀 Optimized for Microsoft 365

- Office apps (Outlook, Teams, OneDrive) often perform poorly in virtual environments due to caching issues.
- AVD is specifically optimized to make Outlook/Teams run as fast as a local PC.

### ☁️ PaaS Management

- **Microsoft manages**: The Gateway, Web Access, Broker, and Diagnostics (The complicated "Plumbing").
- **You manage**: The Desktop VMs and Policies.
- **Comparison**: Much easier than setting up a traditional Remote Desktop Services (RDS) farm on-premise.

---

## 2. Core Components

### 🏨 Host Pools

A collection of identical Virtual Machines that serve the desktops/apps to users.

- **Personal (Persistent)**: Each user gets their own dedicated VM (e.g., for developers needing admin rights).
- **Pooled (Non-persistent)**: Users share a pool of VMs. The system assigns them to any available VM (Cost-effective).

### 🧊 FSLogix (Profile Containers)

In a pooled environment, you might log into `VM-A` today and `VM-B` tomorrow. What about your files and Outlook settings?

- **FSLogix** stores your user profile in a separate "Container" (VHD file) on network storage (Azure Files).
- When you login, this container is instantly attached to the VM.
- **Result**: It _feels_ like your personal computer, even though you are hopping between VMs.

---

## 💡 Exam Tips for AZ-900

- **Multi-session**: If the question mentions "Windows 10/11 Enterprise Multi-session", the answer is **Azure Virtual Desktop (AVD)**.
- **Cost Savings**: AVD saves money by allowing multiple users to share a single VM.
- **BYOD**: Enables secure "Bring Your Own Device" scenarios (Corporate data stays in Azure, never touches the personal laptop).
