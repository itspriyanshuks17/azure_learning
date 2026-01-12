# 🌐 Types of Area Networks (LAN, WAN, VLAN & More)

## 📌 Overview

Networks are classified by their **Geographical Span** (how much area they cover) and their **Architecture** (how they are built).

Understanding these is crucial because **Cloud Computing** is essentially a massive **WAN** made up of millions of **VLANs**.

---

## 1. LAN (Local Area Network) 🏠

- **Scope**: A single room, building, or canvas.
- **Speed**: Very High (1 Gbps - 10 Gbps).
- **Technology**: Ethernet Cables (RJ45), Switches.
- **Example**: Your home Wi-Fi or Office Network.

#### Architecture: LAN

```text
      [ Switch ]
      /   |    \
     /    |     \
  [PC]  [PC]  [Printer]
  (All in same building)
```

---

## 2. WLAN (Wireless LAN) 📶

- **Scope**: Same as LAN, but Wireless.
- **Technology**: Wi-Fi (IEEE 802.11).
- **Key Device**: Wireless Access Point (WAP) or Router.

#### Architecture: WLAN

```text
      [ Wi-Fi Router ]
         /      \
      (Waves)  (Waves)
       /          \
   [Laptop]     [Phone]
```

---

## 3. VLAN (Virtual LAN) 🎭 _Critical for Cloud_

- **Scope**: Logical grouping within a physical LAN.
- **Concept**: Even if Engineering and HR are connected to the _same_ physical switch, a VLAN acts as a "Virtual Wall" separating them.
- **Azure Context**: An **Azure VNet** is essentially a giant VLAN in Microsoft's datacenter.

#### Architecture: VLAN

```text
       [   Physical Switch   ]
      /    |         |    \
     /     |         |     \
 [Eng PC] [Eng PC] [HR PC] [HR PC]
    |        |        |       |
  (VLAN 10)  |      (VLAN 20) |
   \_________/       \________/
   (Engineering)        (HR)
```

---

## 4. MAN (Metropolitan Area Network) 🏙️

- **Scope**: A city or a large campus.
- **Speed**: High (Fiber Optics).
- **Example**: City-wide Cable TV network, ISP network covering a city.

#### Architecture: MAN

```text
     [City Gov Building]      [University Campus]
               \                  /
                \                /
                 [ Central ISP  ]
                 [ City Hub     ]
                /                \
               /                  \
        [Office A]             [Office B]
```

---

## 5. WAN (Wide Area Network) 🌎

- **Scope**: Spans countries or continents.
- **Speed**: Varies (slower than LAN), but evolving (Fiber/Satellite).
- **Technology**: Satellite, Leased Lines, MPLS, Optical Fiber (Undersea cables).
- **Azure Context**: The **Internet** is the biggest WAN. **Azure ExpressRoute** is a private WAN connection between you and Azure.

#### Architecture: WAN

```text
    [ New York Office ]                       [ London Office ]
    ( LAN A )                                     ( LAN B )
         \                                           /
          \             ( The Internet )            /
           ----------------- [WAN] -----------------
                           (Undersea Cables)
```

---

## 6. SAN (Storage Area Network) 💾

- **Scope**: Dedicated high-speed network for storage devices.
- **Purpose**: connect Servers to Shared Storage (Disk Arrays) so it looks like a local drive.
- **Azure Context**: **Azure Disk Storage** behaves like a SAN provided as a service.

#### Architecture: SAN

```text
    [ Server A ]        [ Server B ]
          \                 /
           \               /
          [ Fiber Channel Switch ]
                  |
          [ Storage Array (Disks) ]
```

---

## 7. PAN (Personal Area Network) 🎧

- **Scope**: Very short range (few meters).
- **Technology**: Bluetooth, NFC, USB.
- **Example**: Connecting headphones to phone.

---

## 8. VPN (Virtual Private Network) 🛡️

- **Scope**: Virtual tunnel over a public network (Internet).
- **Purpose**: secure, encrypted connection between two points.
- **Azure Context**: **VPN Gateway** connects your office to Azure VNet safely over the internet.

#### Architecture: VPN Tunnel

```text
    [ Office PC ]  ===============>  [ Server ]
      (Private)      (Encrypted      (Private)
                      Tunnel)
           \                       /
            \                     /
             ( Public Internet )
```

---

## 💡 Hinglish Explanation (Transportation)

### **1. LAN (Cycle inside House)**

- **Hinglish**: Apne ghar ke andar ghumna. (Fast, Private).

### **2. WAN (International Flight)**

- **Hinglish**: Ek desh se dusre desh jana. (Long distance, Public infrastructure use karna padta hai).

### **3. VLAN (Office Cubicles)**

- **Hinglish**: Ek bada Hall (Switch) hai, lekin humne beech mein kaanch ki deewarein (VLAN) laga di hain taaki HR ki baatein Engineering wale na sun sakein using Logic, not bricks.

### **4. VPN (Secure Pipe)**

- **Hinglish**: Imagine karo crowd mein se ja rahe ho (Internet), lekin tumne ek "invisible pipe" (Tunnel) bana li hai. Koi bahar wala tumhe dekh nahi sakta, aur tum safe ho.

---

## ⚡ Exam Tips for AZ-900

1.  **VNet = VLAN**: Conceptually, when you create an Azure VNet, you are creating your own isolated **VLAN** in the Azure cloud.
2.  **ExpressRoute = WAN**: ExpressRoute is a dedicated **WAN** link replacing the public internet.
