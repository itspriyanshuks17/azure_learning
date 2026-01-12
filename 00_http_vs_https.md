# 🔐 HTTP vs HTTPS: The Secure Web

## 📌 Overview

The web runs on these two protocols. The core difference is **Security**.

1.  **HTTP (HyperText Transfer Protocol)**:

    - **Data**: Sent in **Plain Text**.
    - **Risk**: Anyone on the network (Public Wi-Fi, ISP) can read your password/credit card.
    - **Analogy**: Sending a **Postcard**. Anyone who picks it up can read it.

2.  **HTTPS (HTTP Secure)**:
    - **Data**: Encrypted using **SSL/TLS**.
    - **Security**: Only the Browser and Server can read the data.
    - **Analogy**: Sending a **Sealed Envelope**. Only the recipient can open it.

---

## ⚔️ Comparison Table

| Feature       | HTTP                            | HTTPS                                    |
| :------------ | :------------------------------ | :--------------------------------------- |
| **Full Name** | HyperText Transfer Protocol     | HTTP **Secure**                          |
| **Port**      | 80                              | 443                                      |
| **Security**  | None (Plain Text)               | **Encrypted** (SSL/TLS)                  |
| **Speed**     | Marginally Faster               | Marginally Slower (Encryption overhead)  |
| **Visual**    | "Not Secure" warning in Browser | **Padlock Icon** (🔒)                    |
| **Use Case**  | Blogs, Info sites (Old)         | **Banking, Login, Shopping, Everything** |

---

## ☁️ Azure Context

- **Azure App Service**: Provides free SSL certificates to enable HTTPS instantly.
- **Front Door / App Gateway**: These services can handle **SSL Termination**, meaning they decrypt the HTTPS traffic before sending it to your backend servers (saving CPU).
- **Enforcement**: You can toggle a setting "HTTPS Only" to **Force** all users to use the secure version.

---

## 💡 Hinglish Explanation

### **1. HTTP (Postcard)**

- **Hinglish**: Agar tumne post card par apna credit card number likh kar bheja, toh dakiya (Postman) ya raste mein koi bhi usse padh sakta hai.

### **2. HTTPS (Sealed Envelope)**

- **Hinglish**: Agar tumne letter ko lifafe (Envelope) mein band karke bheja, toh koi usse khol nahi sakta. Sirf jiske paas chabi hai (Server Key), wahi padh sakta hai.
