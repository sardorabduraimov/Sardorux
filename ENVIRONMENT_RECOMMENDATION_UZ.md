# Loyihani vizual ko'rish uchun tavsiya etilgan muhitlar

## Eng qulay (men tavsiya qilaman)
### 1) VS Code + Live Server
Nega:
- Bir marta klik bilan browserda ochiladi.
- Har safar fayl saqlanganda sahifa auto-refresh bo'ladi.
- Dizayn iteratsiyasi uchun eng tez yo'l.

Qadamlar:
1. VS Code oching.
2. `Live Server` extension o'rnating.
3. `dashboard.html` ni ochib, `Go Live` tugmasini bosing.
4. Sahifa odatda `http://127.0.0.1:5500/dashboard.html` da ochiladi.

---

### 2) Terminal (dependency-siz)
Agar extension ishlatmasangiz:
```bash
python3 -m http.server 8000
```
So'ng browserda oching:
- `http://localhost:8000/dashboard.html`

---

### 3) Docker (productionga yaqin ko'rish)
Agar deployga yaqin muhit kerak bo'lsa:
```bash
docker compose up --build
```
So'ng browserda:
- `http://localhost:8080/dashboard.html`

---

## Qaysi birini tanlash kerak?
- Tez ko'rish/dizayn ishlari: **VS Code + Live Server**
- Noldan, qo'shimcha narsasiz: **python3 -m http.server**
- Deployga yaqin tekshiruv: **Docker Compose**
