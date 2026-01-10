# 🌍 IP Addresses: Types & Versions (IPv4 vs IPv6)

## 📌 Overview

An **IP (Internet Protocol) Address** is a numerical label assigned to each device connected to a computer network. It serves two main functions:

1.  **Identification**: "Who is this device?"
2.  **Addressing**: "Where is this device located?"

Think of it as your **Digital Address** or Phone Number on the internet.

---

## 🏷️ Types of IP Addresses

### 1. Public vs Private IP

| Feature          | Public IP 🌐                                  | Private IP 🏠                                            |
| :--------------- | :-------------------------------------------- | :------------------------------------------------------- |
| **Reachability** | Accessible from anywhere on the **Internet**. | Accessible **ONLY** within the local network (LAN/VNet). |
| **Cost**         | Usually paid (Static) or assigned by ISP.     | Free to use.                                             |
| **Uniqueness**   | Must be unique **globally**.                  | Must be unique only within the **local network**.        |
| **Example**      | `20.198.54.12` (Azure Region IP)              | `192.168.1.1` or `10.0.0.5`                              |

### 2. Static vs Dynamic IP

- **Dynamic IP**: Changes periodically (DHCP). Most home routers and standard VMs use this.
  - _Cloud Context_: When you stop/start a VM, its Public IP might change.
- **Static IP**: Fixed permanent address.
  - _Cloud Context_: Used for DNS servers, Web Servers requiring SSL, or Firewall whitelisting.

---

## ⚔️ IPv4 vs IPv6 (The Showdown)

The internet ran out of IPv4 addresses, so IPv6 was created.

### 1. IPv4 (The Legacy)

- **Format**: 32-bit numeric address.
- **Notation**: Dotted Decimal (e.g., `192.168.1.1`).
- **Total Addresses**: ~4.3 Billion.
- **Header**: Variable length (20-60 bytes).

### 2. IPv6 (The Future)

- **Format**: 128-bit alphanumeric address.
- **Notation**: Hexadecimal (e.g., `2001:0db8:85a3:0000:0000:8a2e:0370:7334`).
- **Total Addresses**: 3.4 × 10^38 (Undecillion) - virtually infinite.
- **Header**: Fixed length (40 bytes) - simpler processing for routers.
- **Security**: IPSec is built-in (mandatory mainly).

#### Visual Comparison Diagram

```text
       [ IPv4 Address ]                   [ IPv6 Address ]
       (32-Bits)                          (128-Bits)

    192 . 168 .  1  .  1          2001:0db8:....:7334
     |     |     |     |            |
    [8]+[8]+[8]+[8] = 32         [Hex Groups x 8]
                                    |
   (Simple Dotted Decimal)       (Complex Hexadecimal)
```

---

## ☁️ Cloud Context (Azure)

In Azure (and most clouds):

- **VNets** primarily use **Private IPv4** (Address Space like `10.0.0.0/16`).
- **Public IPs** are separate resources you attach to VMs or Load Balancers.
- **IPv6** is supported mainly for dual-stack architectures (IoT, Mobile networks), but IPv4 is still the default standard for internal networking.

---

## 💡 Hinglish Explanation (Mobile Process)

### **1. IP Address (Phone Number)**

- **Hinglish**: IP address aapka phone number hai. Agar aapko kisi se baat karni hai, toh number dial karna padega.

### **2. Public vs Private (Personal vs Intercom)**

- **Public IP**: Aapka personal mobile number. Ispe koi bhi call kar sakta hai (Internet).
- **Private IP**: Society ka Intercom number. Sirf society ke log hi baat kar sakte hain. Bahar se koi intercom par call nahi kar sakta.

### **3. IPv4 vs IPv6 (Old vs New Numbering)**

- **IPv4 (10-digit number)**: Pehle sabke paas 10 digit number the. Lekin log itne badh gaye ki number khatam hone lage.
- **IPv6 (Alpha-numeric ID)**: Ab sabko ek naya, lamba aur complex unique ID mil raha hai jo kabhi khatam nahi hoga. Isme letters bhi hain aur numbers bhi.

---

## ⚡ Exam Tips for AZ-900

1.  **Private IPs**: Remember the ranges `10.0.0.0/8`, `172.16.0.0/12`, and `192.168.0.0/16`. Azure VNets sit here.
2.  **Public IP SKU**: In Azure, Public IPs come in **Basic** and **Standard** SKUs. Standard is secure by default (requires NSG to open).
3.  **IPv6**: Know that it solves the address exhaustion problem, but IPv4 is still king in VNet configuration.
