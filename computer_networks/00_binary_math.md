# 🔢 Binary Math for Networking

## 📌 Overview

Computers strictly speak **Binary** (0s and 1s). Networking concepts like **IP Addresses**, **Subnet Masks**, and **CIDR** all rely on binary math.

---

## 🏗️ The Magic Table (Powers of 2)

Memorize this table. It is the key to everything in networking.

| 128   | 64    | 32    | 16    | 8     | 4     | 2     | 1     |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| $2^7$ | $2^6$ | $2^5$ | $2^4$ | $2^3$ | $2^2$ | $2^1$ | $2^0$ |

---

## 🔄 1. Decimal to Binary

**Goal**: Convert a normal number (e.g., `192`) into Binary (`11000000`).

### Method: The Subtraction Game

Take your number and try to subtract values from the **Magic Table**, starting from the left (128).

**Example: Convert `168` to Binary**

1.  **128**: Can I subtract 128 from 168? **Yes**. (Rem: 40). Write **1**.
2.  **64**: Can I subtract 64 from 40? **No**. Write **0**.
3.  **32**: Can I subtract 32 from 40? **Yes**. (Rem: 8). Write **1**.
4.  **16**: Can I subtract 16 from 8? **No**. Write **0**.
5.  **8**: Can I subtract 8 from 8? **Yes**. (Rem: 0). Write **1**.
6.  **4**: Remainder is 0. Write **0**.
7.  **2**: Remainder is 0. Write **0**.
8.  **1**: Remainder is 0. Write **0**.

**Result**: `10101000`

---

## 🔄 2. Binary to Decimal

**Goal**: Convert Binary (`11111100`) to Decimal (`252`).

### Method: The Addition Game

Look at the **Magic Table**. Wherever there is a **1**, take that number and add it to your total.

**Example: Convert `11111100`**

| 128   | 64    | 32    | 16    | 8     | 4     | 2     | 1     |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **1** | **1** | **1** | **1** | **1** | **1** | **0** | **0** |

Math: $128 + 64 + 32 + 16 + 8 + 4 = \mathbf{252}$

---

## ☯️ 3. 2's Complement (Negative Numbers)

Computers don't have a minus sign (`-`). They use **2's Complement** to represent negative integers.

### How to Calculate (-N)

To find the negative version of a binary number:

1.  **Invert** all bits (Change 1 to 0, 0 to 1). (This is 1's Complement).
2.  **Add 1** to the result.

**Example: Represent `-5` in 4-bit binary**

1.  Start with **+5**: `0101`
2.  **Invert** bits: `1010`
3.  **Add 1**:
    ```text
      1010
    +    1
    ------
      1011
    ```
4.  **Result**: `1011` is -5 in 2's complement.

> **Shortcut**: Start from the right. Leave all digits alone **up to and including the first '1'**. Then flip everything to the left.
>
> `010(1)` -> First '1' is at the end. Flip the rest: `101` + `1` = `1011`

---

## ⚡ Exam Tips

1.  **All Ones**: `11111111` = 255.
2.  **First Bit**: In 8-bit signed numbers, if the first bit is **1**, the number is **Negative**. If **0**, it is **Positive**.
3.  **Subnetting**: You mostly care about **Binary to Decimal** and vice-versa for calculating Network IDs and Broadcast IDs.
