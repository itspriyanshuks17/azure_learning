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

## 📨 HTTP Headers

Headers are the **Metadata** sent with every request and response. They tell the browser/server _how_ to handle the data.

### Key Headers

- **User-Agent**: Tells the server "I am Chrome on Windows" or "I am an iPhone".
- **Content-Type**: Tells the browser "This is an HTML file" or "This is a JSON object".
- **Authorization**: Sends the password/token (e.g., Bearer Token).
- **Status Code**:
  - **200 OK**: Success.
  - **404 Not Found**: Page missing.
  - **500 Server Error**: Server crashed.

---

---

## 🚦 HTTP Methods (The Verbs)

Methods tell the server **what action** to perform on the resource.

### Common Methods

| Method     | Action     | Description                                     | REST Analogy                     |
| :--------- | :--------- | :---------------------------------------------- | :------------------------------- |
| **GET**    | **Read**   | Retrieve data. **Safe** (No changes to server). | "Show me the menu"               |
| **POST**   | **Create** | Submit new data. **Unsafe** (Creates resource). | "Order a Pizza"                  |
| **PUT**    | **Update** | Replace entire resource. (Idempotent).          | "Replace my order with a Burger" |
| **PATCH**  | **Modify** | Partial update. (Standard).                     | "Change cheese to extra cheese"  |
| **DELETE** | **Delete** | Remove resource.                                | "Cancel my order"                |

### 🧠 Concept: Idempotency

- **Idempotent**: Making the request 10 times has the **same effect** as making it once.
  - _Example_: `DELETE /user/1`. If you delete it once, it's gone. If you try again, it's still gone. (PUT, DELETE, GET).
- **Non-Idempotent**: Making the request 10 times creates **10 resources**.
  - _Example_: `POST /orders` creates 10 different orders.

---

---

## 🔢 HTTP Status Codes (The Response)

When a server replies, it gives a 3-digit number to tell you **what happened**.

| Range   | Type              | Meaning                 | Common Examples                                                                 |
| :------ | :---------------- | :---------------------- | :------------------------------------------------------------------------------ |
| **1xx** | **Informational** | "Hold on, I'm working." | **100** Continue                                                                |
| **2xx** | **Success**       | "All good!"             | **200** OK, **201** Created                                                     |
| **3xx** | **Redirection**   | "Go somewhere else."    | **301** Moved Permanently, **302** Found                                        |
| **4xx** | **Client Error**  | "You messed up."        | **400** Bad Request, **401** Unauthorized, **403** Forbidden, **404** Not Found |
| **5xx** | **Server Error**  | "I messed up."          | **500** Internal Server Error, **502** Bad Gateway, **503** Service Unavailable |

### 🧠 Concept: 401 vs 403

- **401 Unauthorized**: "Who are you?" (You need to login).
- **403 Forbidden**: "I know who you are, but you can't come in." (You are logged in, but don't have permission).

---

## 🤝 The Handshake Process

Before any data is sent, the client and server must agree to talk. This is called a **Handshake**.

### 1. TCP Handshake (The Foundation)

Every HTTP connection starts with this **3-Way Handshake**.

```text
    [ Client ]                      [ Server ]
        |                               |
        |---- (1) SYN (Hello?) -------->|
        |                               |
        |<--- (2) SYN-ACK (Yes!) -------|
        |                               |
        |---- (3) ACK (Great!) -------->|
        |                               |
      (Connection Established - Data Flow Starts)
```

### 2. SSL/TLS Handshake (The Security Layer)

For **HTTPS**, an extra handshake happens _after_ TCP to set up encryption.

```text
    [ Client ]                      [ Server ]
        |                               |
        |---- (1) Client Hello -------->| (I support these algorithms)
        |                               |
        |<--- (2) Server Hello ---------| (Let's use this one + Here is my Certificate)
        |                               |
        |---- (3) Key Exchange -------->| (Here is a secret key encrypted with your cert)
        |                               |
        |<--- (4) Finished ------------>| (Decrypted! Let's talk securely)
        |                               |
      (             Encrypted Tunnel Established             )
```

---

## 💡 Hinglish Explanation

### **1. HTTP (Postcard)**

- **Hinglish**: Agar tumne post card par apna credit card number likh kar bheja, toh dakiya (Postman) ya raste mein koi bhi usse padh sakta hai.

### **2. HTTPS (Sealed Envelope)**

- **Hinglish**: Agar tumne letter ko lifafe (Envelope) mein band karke bheja, toh koi usse khol nahi sakta. Sirf jiske paas chabi hai (Server Key), wahi padh sakta hai.
