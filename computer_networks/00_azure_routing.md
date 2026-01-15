# 🛣️ Azure Routing: System Routes & UDRs

## 📌 Overview

In Azure, traffic flow is controlled by **Routing Tables**. Just like a GPS tells a car where to turn, Azure Routing tells a data packet where to go next.

There are two main types of routes in Azure:

1.  **System Routes** (Default / Auto-pilot)
2.  **User Defined Routes (UDR)** (Custom / Manual Steering)

---

## 🤖 1. System Routes (The Defaults)

When you create a Virtual Network (VNet), Azure automatically adds these routes for you. You generally **cannot** delete them, but you can override them.

| Destination    | Next Hop          | Meaning                                           |
| :------------- | :---------------- | :------------------------------------------------ |
| **Local VNet** | `Virtual Network` | "Traffic inside this VNet stays here."            |
| **Internet**   | `Internet`        | "Traffic destined for the public web goes out."   |
| **RFC 1918**   | `None`            | "Private IPs that don't belong here are dropped." |

> **Hinglish Analogy**: "Ye factory settings hain. Agar tum kuch nahi bologe, toh traffic waise hi chalega jaise Azure ne socha hai."

---

## 🛠️ 2. User Defined Routes (UDR)

A **UDR (Route Table)** allows you to override the default system routes. This is critical for security architectures, like forcing all traffic to go through a **Firewall** instead of going straight to the Internet.

### Common Next Hop Types

When creating a UDR, you must specify the **Next Hop** (Where the packet goes next).

| Next Hop Type               | Use Case                                                          |
| :-------------------------- | :---------------------------------------------------------------- |
| **Virtual Appliance**       | Send traffic to a **Firewall** (NVA) or Load Balancer.            |
| **Internet**                | Force traffic directly to the internet (bypassing proxies).       |
| **Virtual Network Gateway** | Send traffic to a **VPN Gateway** or ExpressRoute.                |
| **None**                    | **Blackhole**. Drop the traffic completely (useful for security). |
| **Virtual Network**         | Force traffic to a specific VNet location.                        |

---

## 🧠 3. How Azure Selects a Route

If there are multiple matching routes, how does Azure decide?

### Rule #1: Longest Prefix Match (LPM) - The Golden Rule 🏆

The route with the **most specific** match (highest CIDR number) ALWAYS wins.

**Example**: Packet going to `10.0.0.5`.

- Route A: `10.0.0.0/16` (Matches, but broad).
- Route B: `10.0.0.0/24` (Matches, more specific).
- **Winner**: Route B (`/24`) because it's a longer prefix match.

### Rule #2: Priority (If LPM is tied)

If two routes have the EXACT same prefix (e.g., both are `0.0.0.0/0`), Azure picks in this order:

1.  **User Defined Route (UDR)** (Highest Priority)
2.  **BGP Route** (ExpressRoute)
3.  **System Route** (Lowest Priority)

> **Hinglish Tip**: "Agar do raste same hain, toh tumhara banaya hua rasta (UDR) pehle mana jayega."

---

## ⚡ Exam Tips

1.  **Forcing Traffic**: To send traffic through an Azure Firewall, create a UDR with Next Hop = **Virtual Appliance** and the IP of the Firewall.
2.  **GatewaySubnet**: **NEVER** assign a UDR to the GatewaySubnet unless you know exactly what you are doing (it can break VPN/ExpressRoute).
3.  **Troubleshooting**: Use the **"Effective Routes"** feature in the NIC blade to see exactly which routes (System + UDR) are active.
