# 🧮 IP Addressing Fundamentals: IANA, Classes & NID/HID

## 🌍 Who controls IP Addresses? (IANA)

**IANA (Internet Assigned Numbers Authority)** is the global coordinator for IP address management.

- **Role**: They are like the "Landlords" of the Internet. They don't sell IPs directly to you but allocate large blocks to **RIRs (Regional Internet Registries)** like ARIN (America) or APNIC (Asia-Pacific).
- **RIRs** then allocate to **ISPs** (Internet Service Providers), who finally give an IP to **You**.

---

## 🧬 Anatomy of an IP Address (NID vs HID)

Every IPv4 address (e.g., `192.168.1.5`) is divided into two parts. Think of it like a **Street Name** and a **House Number**.

### 1. NID (Network ID)

- Represents the **Network** (The Street).
- All devices on the _same_ network must have the _same_ NID.
- **Analogy**: "Baker Street".

### 2. HID (Host ID)

- Represents the **specific Device** (The House).
- Must be unique within that network.
- **Analogy**: "House No. 221B".

> **Who decides which part is NID or HID?**
> The **Subnet Mask** (or Class) decides where the line is drawn.

---

## 📦 Classful Addressing System

In the early days, the internet was divided into 5 "Classes" to make routing easier. Each class has a fixed number of Network bits (NID) and Host bits (HID).

### Overview Cheat Sheet

| Class | First Octet Range | Default Subnet Mask   | NID / HID Bits  | Use Case             |
| :---- | :---------------- | :-------------------- | :-------------- | :------------------- |
| **A** | `1` - `126`       | `255.0.0.0` (/8)      | N.H.H.H (8/24)  | Huge Corps / Govts   |
| **B** | `128` - `191`     | `255.255.0.0` (/16)   | N.N.H.H (16/16) | Large Universities   |
| **C** | `192` - `223`     | `255.255.255.0` (/24) | N.N.N.H (24/8)  | Small Offices / Home |
| **D** | `224` - `239`     | N/A                   | N/A             | Multicasting         |
| **E** | `240` - `255`     | N/A                   | N/A             | Experimental (R&D)   |

> **Note**: `127.x.x.x` is reserved for **Loopback** (Localhost testing) and is not part of Class A.

### 🔍 Deep Dive Details

#### Class A (The Giants)

- **Format**: `NID . HID . HID . HID`
- **First Bit Rule**: Always starts with `0`.
- **Bits**: 8 Network bits, 24 Host bits.
- **Hosts per Network**: $2^{24} - 2$ = **16.7 Million**.
- **Example**: Apple, Ford, US Military.

#### Class B (The Mid-Range)

- **Format**: `NID . NID . HID . HID`
- **First Bits**: Always starts with `10`.
- **Bits**: 16 Network bits, 16 Host bits.
- **Hosts per Network**: $2^{16} - 2$ = **65,534**.

#### Class C (The Commoners)

- **Format**: `NID . NID . NID . HID`
- **First Bits**: Always starts with `110`.
- **Bits**: 24 Network bits, 8 Host bits.
- **Hosts per Network**: $2^{8} - 2$ = **254**.
- **Example**: Your Home Wi-Fi (`192.168.1.x`).

#### ASCII Diagram (Bit Structure)

```text
Class A:  [Network(8)] [Host(8)] [Host(8)] [Host(8)]
          (Few Networks, Many Hosts)

Class B:  [Network(8)] [Network(8)] [Host(8)] [Host(8)]
          (Balanced)

Class C:  [Network(8)] [Network(8)] [Network(8)] [Host(8)]
          (Many Networks, Few Hosts)
```

---

## 🔒 Private IP Ranges (RFC 1918)

Within these classes, IANA reserved specific blocks for **Private Use** (Internal LANs). These are NOT routable on the internet.

- **Class A Private**: `10.0.0.0` to `10.255.255.255`
- **Class B Private**: `172.16.0.0` to `172.31.255.255`
- **Class C Private**: `192.168.0.0` to `192.168.255.255`

> **Cloud Tip**: When you create an Azure VNet, you usually pick one of these private ranges.

---

## 💡 Hinglish Explanation (Pincodes)

### **1. IANA (Government)**

- **Hinglish**: IANA wo sarkari daftar hai jo decide karta hai ki kis shehar (Network) ka pincode kya hoga.

### **2. NID vs HID (Shehar vs Ghar)**

- **NID**: Pincode (`110001`). Yeh batata hai ki chithi "Delhi" jayegi.
- **HID**: Ghar ka number (`42`). Yeh batata hai ki Delhi mein kis ghar mein deni hai.

### **3. Classes (Plot Size)**

- **Class A**: Ek bohot bada shehar jisme karodo log (Hosts) reh sakte hain.
- **Class C**: Ek choti si colony jisme sirf 254 ghar (Hosts) ban sakte hain.

---

## ⚡ Exam Tips for AZ-900

1.  **Loopback**: `127.0.0.1` is used to test your own network card. It's not a valid IP for a VM.
2.  **Private Ranges**: Memorize `10.x.x.x`, `172.16.x.x`, and `192.168.x.x`. You will see these in every Azure VNet exam question.
3.  **CIDR**: Classful addressing is old. Modern clouds use **Classless (CIDR)**, which lets you slice these classes into whatever size you need (Subnetting).
