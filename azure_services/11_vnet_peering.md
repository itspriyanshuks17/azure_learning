# 🔗 Azure VNet Peering: Dashboard Steps

## 📌 Overview

**VNet Peering** connects two separate Virtual Networks (VNets) so they can talk to each other using private IP addresses. It’s like building a direct bridge between two isolated islands.

- **Effect**: VMs in VNet-A can ping VMs in VNet-B.
- **Performance**: High speed, low latency (traffic uses Microsoft's backbone).

> **Hinglish Analogy**: "Do alag colonies (VNets) ke beech mein ek private bridge banana, taaki log (data) bina main road (Internet) par gaye ek dusre se mil sakein."

---

## ✅ Prerequisites

Before you start, ensure you have:

1.  **Two VNets** (e.g., `VNet-A` and `VNet-B`).
2.  **No Overlapping Address Spaces** (e.g., `10.0.0.0/16` and `10.1.0.0/16` is OK. `10.0.0.0/16` and `10.0.0.0/16` will **FAIL**).

---

## 🛠️ Step-by-Step: Creating a Peering

In the modern Azure Portal, you can create the link for **BOTH** sides in one go.

### 1. Go to the First VNet

- Navigate to **Virtual Networks**.
- Click on your first VNet (e.g., `VNet-A`).

### 2. Open Peering Menu

- On the left sidebar, under **Settings**, click **Peerings**.
- Click the **+ Add** button at the top.

### 3. Configure "This Virtual Network" (VNet-A Side)

- **Peering Link Name**: Give it a name (e.g., `Link-to-B`).
- **Traffic to Remote Virtual Network**: **Allow** (Default).
- **Traffic Forwarded from Remote Virtual Network**: **Block** (Unless you are doing specialized routing).
- **Virtual Network Gateway**: Leave as **None** (unless setting up Gateway Transit).

### 4. Configure "Remote Virtual Network" (VNet-B Side)

- **Peering Link Name**: Name the reverse link (e.g., `Link-to-A`).
- **Virtual Network**: Select **`VNet-B`** from the dropdown list.
- **Traffic to Remote Virtual Network**: **Allow**.

### 5. Finalize

- Click **Add**.
- Azure will validate and create **TWO** peering links (one in A, one in B).

---

## 🚦 Verifying the Connection

1.  Wait for a few seconds.
2.  Refresh the **Peerings** list.
3.  **Peering Status**: Should show **`Connected`**.
    - If it says `Initiated`, it means only one side is linked. Wait or check the other VNet.

---

## ⚙️ Key Settings Explained

| Setting                     | Meaning                                           | Use Case                                                        |
| :-------------------------- | :------------------------------------------------ | :-------------------------------------------------------------- |
| **Allow Traffic to Remote** | Can I talk to them?                               | Always **Yes** for normal communication.                        |
| **Allow Traffic Forwarded** | Can I accept traffic _not_ originating from them? | Use **Yes** if the other side is a specific Router/Gateway/NVA. |
| **Use Remote Gateway**      | Can I use _their_ VPN Gateway?                    | Use **Yes** in Hub-Spoke topology (Spoke uses Hub's VPN).       |

---

## ⚡ Exam Tips

1.  **Cost**: Peering is NOT free. You pay for data ingress and egress across the peering.
2.  **Transitive**: Peering is **non-transitive**.
    - If A matches B, and B matches C... **A cannot talk to C**. (You need to peer A directly to C).
3.  **Cross-Region**: You **can** peer VNets in different regions (Global VNet Peering).
