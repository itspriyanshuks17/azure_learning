# 🍰 CIDR (Classless Inter-Domain Routing) & Subnetting

## 📌 Overview

**CIDR** (pronounced "Cider") is a method for allocating IP addresses and IP routing. It replaces the old "Classful" system (Class A, B, C) and allows for more flexible and efficient use of IP addresses.

Think of an IP network as a **Pie** or **Pizza**. CIDR tells you **how many slices** you are cutting the network into.

- **Smaller CIDR Number (/8)** = Fewer cuts = **Bigger Slices** (More IPs)
- **Larger CIDR Number (/32)** = More cuts = **Smaller Slices** (Fewer IPs)

---

## 📐 The "Slash" Notation (/N)

CIDR uses a suffix like `/24` or `/16`. This number represents the **Network Bits**—the **part of the address that is "fixed" or "frozen"**. The rest of the bits are "Host Bits" (available for your devices).

**Formula**: $2^{(32 - N)}$ = Total IPs

### 📊 Common CIDR Cheat Sheet

| CIDR          | Subnet Mask     | Total IPs        | Usable IPs* | Use Case                      |
| :------------ | :-------------- | :--------------- | :---------- | :---------------------------- |
| **/32** | 255.255.255.255 | **1**      | 1 (Host)    | Specific Device / Loopback    |
| **/31** | 255.255.255.254 | 2                | 0           | Point-to-Point Links (Rare)   |
| **/30** | 255.255.255.252 | 4                | 2           | Router-to-Router Links        |
| **/29** | 255.255.255.248 | 8                | 3 (Azure)   | Small Subnet                  |
| **/28** | 255.255.255.240 | 16               | 11 (Azure)  | Azure Bastion / GatewaySubnet |
| **/27** | 255.255.255.224 | 32               | 27 (Azure)  | Typical Small VNet Subnet     |
| **/24** | 255.255.255.0   | **256**    | 251 (Azure) | Standard LAN / VNet Subnet    |
| **/16** | 255.255.0.0     | **65,536** | ~65k        | Entire VNet Address Space     |
| **/8**  | 255.0.0.0       | ~16 M            | Huge        | Entire Large Org / ISP        |
| **/0**  | 0.0.0.0         | ~4 B             | All IPv4    | The Update Internet           |

*> Note: In standard networking, you lose 2 IPs (Network + Broadcast). In Azure, you lose 5 IPs (Network + Broadcast + Router + DNS + Future).*

---

## 🧮 How to Calculate (Easy Method)

Don't do binary math if you don't have to. Remember the **Power of 2**:

1. Start with **/32** = 1 IP.
2. Go down by 1, separate by doubling IPs.

- **/32** = 1
- **/31** = 2
- **/30** = 4
- **/29** = 8
- **/28** = 16
- ...
- **/24** = 256

**Example**:
If you need 50 VMs, which CIDR do you need?

- /27 gives 32 IPs (Too small).
- /26 gives 64 IPs (Perfect fit).

---

## ☁️ Azure Context

subnetting is CRITICAL in Azure. When you create a **Virtual Network (VNet)**:

1. **VNet Address Space**: Usually big, e.g., `10.0.0.0/16` (65k IPs).
2. **Subnets**: You slice this existing VNet into smaller chunks.
   - `10.0.1.0/24` for Web Servers
   - `10.0.2.0/24` for Database Servers

> **Warning**: Azure reserves **5 IP addresses** in every subnet.
> If you create a `/29` (8 IPs), you only get 8 - 5 = **3 usable IPs**.

---

## 💡 Hinglish Explanation (The Pizza Logic)

### **1. CIDR Number (The Slices)**

- **Hinglish**: CIDR number ko "Chauku" (Knife) cuts samjho.
- Jitna **bada number** (/32), utne **zyada tukde**, lekin **chote pieces** (Kam IPs).
- Jitna **chota number** (/8), utne **kam tukde**, lekin **bade pieces** (Zyada IPs).

### **2. The /24 Magic (Standard)**

- **Hinglish**: **/24** standard hai. Iska matlab "Gali ka last hissa badal sakta hai".
- Example: `192.168.1.x`. Yahan `192.168.1` fix hai, bas last ka `x` (0-255) badlega. Ye ek building jaisa hai jisme 256 kamre hain.

### **3. Azure Rule (5 IPs Reserved)**

- **Hinglish**: Normal duniya mein 2 IP waste hote hain. Azure mein 5 hote hain (Azure tax samjho).
- Agar `/29` liya (Total 8 IP), toh Azure bolega: "5 toh Main rakhunga, tumhare liye sirf 3 bache". Isliye Azure mein kam se kam `/27` ya `/24` lena safe hai.

---

## ⚡ Exam Tips

1. **Smallest Subnet in Azure**: technically `/29`, but realistically `/27` or `/28` is recommended for usefulness. GatewaySubnet usually needs `/27` or `/28` (if VPN + ExpressRoute).
2. **Overlap**: VNets with **overlapping CIDR blocks** cannot be peered. (Do VNet `10.0.0.0/16` ki peering doosre `10.0.0.0/16` se nahi ho sakti).
3. **Notation**: Lower CIDR value = More IPs (`/16` > `/24`).
