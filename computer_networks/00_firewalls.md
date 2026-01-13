# 🛡️ Firewalls: Types & Functions

## 📌 Overview

A **Firewall** is a network security device (hardware or software) that monitors and controls incoming and outgoing network traffic based on predetermined security rules.

Think of it as the **Security Guard** of your network. It decides who gets in and who stays out.

---

## 🚦 Types of Firewalls

### 1. Packet Filtering Firewall (The Basic Guard)

This is the oldest and simplest type. It inspects packets **individually** based on headers (Source IP, Destination IP, Port, Protocol).

- **Mechanism**: "Is this IP allowed? Is this Port allowed? Go."
- **Layer**: Network Layer (Layer 3) & Transport Layer (Layer 4).
- **Pros**: Very fast, cheap.
- **Cons**: **Stateless** (doesn't remember conversation). Vulnerable to IP Spoofing.

> **Analogy**: A security guard who only checks your ID card but doesn't check if you are carrying a weapon or if you were invited.

### 2. Stateful Inspection Firewall (The Smart Guard)

This is a modern evolution of packet filtering. It keeps track of the **State** of active connections (i.e., it remembers if a packet is part of an existing conversation).

- **Mechanism**: "Did I see a request go out for this incoming reply? Yes? Okay, enter."
- **Layer**: Network (Layer 3) and Transport (Layer 4), with some Layer 7 awareness.
- **Pros**: More secure than packet filtering. Prevents random external packets.
- **Cons**: Slower than packet filtering (needs memory to store tables).

> **Analogy**: A receptionist who knows you went out for lunch, so when you come back, they let you in without checking ID again.

### 3. Proxy Service / Application Gateway (The Middleman)

This firewall acts as an **intermediary** between the internal user and the external web. The user connects to the Proxy, and the Proxy connects to the Internet.

- **Mechanism**: Deep Packet Inspection (DPI). It opens the packet payload.
- **Layer**: Application Layer (Layer 7).
- **Pros**: Highest security, can filter content (e.g., block specific URLs/keywords).
- **Cons**: Slowest performance (bottleneck).

> **Analogy**: You give your shopping list to a helper. The helper goes to the shop, buys items, checks them for quality, and then brings them to you. You never talk to the shop directly.

---

## 📊 Comparison Table

| Feature          | Packet Filtering 📨 | Stateful Inspection 🧠 | Proxy / App Gateway 🕵️ |
| :--------------- | :------------------ | :--------------------- | :--------------------- |
| **OSI Layer**    | Layer 3 / 4         | Layer 3 / 4            | Layer 7                |
| **Speed**        | 🚀 Fastest          | ⚡ Moderate            | 🐢 Slowest             |
| **Security**     | 🔓 Low              | 🔒 Medium              | 🔐 High                |
| **Memory Usage** | Sub-Zero            | High (holds state)     | High                   |
| **Azure Equiv**  | **NSG**             | **Azure Firewall**     | **App Gateway / WAF**  |

---

## ☁️ Azure Context

1.  **Network Security Group (NSG)**: This is a **Packet Filtering** firewall. It allows/denies based on 5-tuple (Src IP, Dst IP, Protocol, Src Port, Dst Port). It is **Stateless**? Actually, Azure NSG is technically stateful (if you allow inbound, outbound is auto-allowed), but usually categorized as basic filtering.
2.  **Azure Firewall**: A managed, cloud-native firewall that offers **Stateful Inspection** and threat intelligence.
3.  **Application Gateway (WAF)**: Operates at Layer 7 (Proxy). Used for Web Applications to protect against SQL Injection, XSS.

---

## 💡 Hinglish Explanation

### **1. Packet Filtering (Basic Chowkidar)**

- **Hinglish**: Ye wo chowkidar hai jo sirf ID card dekhta hai. "Tum kaun ho? Kahan jaa rahe ho? Jao."
- Isko fark nahi padta tumne bag mein kya rakha hai. Ye packet ke andar ka data check nahi karta.

### **2. Stateful Inspection (Yaadaash wala Chowkidar)**

- **Hinglish**: Ye hoshiyar chowkidar hai. Isko yaad rehta hai ki "Tum 10 minute pehle bahar gaye the, isliye tum wapas aa sakte ho."
- Ye connection ki 'State' (haalat) yaad rakhta hai. Agar bina request kiye koi packet bahar se ayega, toh ye rok dega.

### **3. Proxy Service (Dalaal / Middleman)**

- **Hinglish**: Maan lo tumko 'Forbidden City' jana hai par tum allowed nahi ho. Tum apne dost (Proxy) ko bhejte ho.
- Dost wahan jata hai, photo khinchta hai, check karta hai sab safe hai, aur fir laake tumko deta hai.
- Tumhara direct connection kabhi nahi bana. Ye sabse safe hai par slow hai kyunki dost beech mein hai.

---

## ⚡ Exam Tips

1.  **Stateless vs Stateful**: Packet filtering is often called stateless (though strictly speaking some implementations differ). Stateful remembers the session.
2.  **Latency**: Proxy is safest but adds most latency. Packet filtering is fastest.
3.  **Layers**: Know which firewall sits on which OSI layer (L3/L4 vs L7).
