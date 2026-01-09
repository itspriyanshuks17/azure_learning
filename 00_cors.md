# 🚦 Cross-Origin Resource Sharing (CORS)

## 📌 Overview

**CORS (Cross-Origin Resource Sharing)** is a security feature implemented by **web browsers**. It allows or blocks web applications running at one origin (domain) from interacting with resources from a different origin.

### 🚫 The "Same-Origin Policy" (The Villain?)

By default, browsers enforce the **Same-Origin Policy**. This means a script running on `google.com` cannot simple fetch data from `facebook.com`. This prevents malicious sites from stealing your data.

- **Origin** consists of 3 things:
  1.  **Protocol** (http vs https)
  2.  **Domain** (example.com)
  3.  **Port** (80, 443, 3000)

If _any_ of these match, it's the **Same Origin**. If _any_ differ, it's **Cross-Origin**.

---

## ⚙️ How CORS Works

When your frontend (e.g., React on `localhost:3000`) tries to call your backend API (e.g., Node.js on `localhost:5000`), the browser sees different ports and shouts **"CROSS ORIGIN ALERT!"**.

The browser then does steps (typically):

1.  **Preflight Request (OPTIONS)**: The browser sends a polite HTTP `OPTIONS` request to the backend asking, _"Hey, are you okay with `localhost:3000` talking to you?"_
2.  **Server Response**: The server must reply with specific headers:
    - `Access-Control-Allow-Origin: http://localhost:3000`
    - `Access-Control-Allow-Methods: GET, POST`
3.  **Actual Request**: If the browser likes the answer, it sends the actual data request.

#### Architecture Diagram (The Handshake)

```text
      [ Browser ]                          [ API Server ]
      (localhost:3000)                     (better-api.com)
           |                                     |
           |  1. Preflight (OPTIONS)             |
           |  "Can I call you?"                  |
           | ----------------------------------> |
           |                                     |
           |  2. Response (200 OK)               |
           |  "Yes, Allow-Origin: *"             |
           | <---------------------------------- |
           |                                     |
           |  3. Actual Request (GET /data)      |
           | ----------------------------------> |
           |                                     |
           |  4. JSON Data                       |
           | <---------------------------------- |
```

---

## ☁️ CORS in Azure services

You often face CORS errors when building SPAs (Single Page Apps) connecting to Azure services. Here is where you enable it:

1.  **Azure Functions**:

    - Go to **API** > **CORS** in the left menu.
    - Add `http://localhost:3000` (or `*` for testing) to the Allowed Origins list.

2.  **Azure App Service**:

    - Same procedure. Go to **API** > **CORS**.

3.  **Azure Storage (Static Website)**:
    - Since your format is static HTML/JS, if it fetches blobs from another container, you must configure CORS rules on that Blob Service.

---

## 💡 Hinglish Explanation (Building Security)

### **1. Same-Origin Policy (Strict Watchman)**

- **Hinglish**: Aapki society ka watchman (Browser) bohot strict hai. Woh kehta hai, _"Agar tum 'Tower A' ke resident ho, toh tum sirf 'Tower A' ki facilities use kar sakte ho. 'Tower B' mein jana mana hai."_

### **2. CORS (Special Pass)**

- **Hinglish**: Ab agar apko 'Tower B' ke gym mein jana hai, toh 'Tower B' ke Secretary (Server) se ek written permission leni padegi (`Access-Control-Allow-Origin`).
- Jab permission dikhaoge, tabhi Watchman (Browser) jaane dega. Nahi toh gate pe hi rok lega (CORS Error).

### **3. Preflight (Pooch-Taach)**

- **Hinglish**: Aap seedha andar nahi ghuste. Pehle gate pe puchhte ho _"Kya main andar aa sakta hoon?"_ (OPTIONS request). Agar permission milti hai, tabhi actual kaam ke liye andar jaate ho.

---

## ⚡ Exam Tips

- **Client-Side Security**: Remember, CORS is a protection enforced by the **client (browser)**, not the server. The server just gives permission; the browser decides whether to respect it.
- **Wildcard (\*)**: Setting `Access-Control-Allow-Origin: *` allows **anyone** to call your API. Good for public APIs, bad for private ones.
