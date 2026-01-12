# 🆔 MAC Address (Media Access Control)

## 📌 Overview

A **MAC Address** (Media Access Control Address) is a **unique identifier** assigned to a **Network Interface Controller (NIC)** for use as a network address in communications within a network segment.

- **Nature**: Physical / Hardware Address.
- **Scope**: Local Network (LAN) only. It does not travel across routers to the internet.
- **Format**: 6 pairs of Hexadecimal digits.

Example: `00:1A:2B:3C:4D:5E`

---

## 🏗️ Structure of a MAC Address

A MAC address is **48 bits** (6 Bytes) long.

1.  **OUI (Organizationally Unique Identifier)**: The first 3 bytes. Identifies the **Manufacturer** (e.g., Dell, Apple, Cisco).
2.  **NIC Controller**: The last 3 bytes. Unique serial number assigned by the manufacturer.

```text
      [  00 : 1A : 2B  ]  :  [  3C : 4D : 5E  ]
      \_______________/     \_______________/
         Vendor ID             Unique ID
          (OUI)
```

---

## ⚔️ MAC Address vs IP Address

| Feature         | MAC Address 🆔                 | IP Address 🌍                    |
| :-------------- | :----------------------------- | :------------------------------- |
| **Type**        | **Physical** Address           | **Logical** Address              |
| **Layer**       | **Data Link Layer** (Layer 2)  | **Network Layer** (Layer 3)      |
| **Changeable?** | **No** (Hardcoded in hardware) | **Yes** (Changes with network)   |
| **Format**      | 48-bit Hex (`00-1A...`)        | 32-bit (`192.168...`) or 128-bit |
| **Reach**       | Local Network only             | Global Internet                  |

---

## ☁️ Azure Context

- **Azure VMs have MAC Addresses**: Each vNIC in Azure has a MAC address.
- **Assignment**: Microsoft Azure assigns this MAC.
- **Persistence**: The MAC usually persists through restarts, but may change if you deallocate (stop) and then start the VM again, unless you are using specific static configurations (rare/advanced).
- **Rule**: You **cannot** configure the MAC address of an Azure VM yourself inside the OS network settings. You must let Azure manage it.

---

## 💡 Hinglish Explanation (Fingerprint vs Address)

### **1. MAC Address (Fingerprint)**

- **Hinglish**: Yeh insaan ka **Fingerprint** hai.
- **Explanation**: Tum duniya mein kahin bhi chale jao, tumhara fingerprint **same rahega**. Yeh tumhari **Physical Identity** hai.

### **2. IP Address (Home Address)**

- **Hinglish**: Yeh insaan ka **Ghar ka Address** hai.
- **Explanation**: Aaj tum Mumbai mein ho (IP: 10.0.0.1), kal Delhi shift ho gaye (IP: 192.168.1.5). Address change ho sakta hai, par fingerprint nahi.

---

## ⚡ Exam Tips for AZ-900

1.  **Communication**: Devices talk to each other on a **local** network using MAC addresses.
2.  **ARP (Address Resolution Protocol)**: This protocol is used to find the MAC address if you only know the IP address. (`Who has 10.0.0.1? Tell 00:1A...`).
