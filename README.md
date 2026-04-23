# Dashboard UI Prototype

Ushbu loyiha endi dizayn spetsifikatsiyadan tashqari **ishlaydigan UI prototip** ham beradi.

## Ishga tushirish
### Variant A: VS Code + Live Server (tavsiya)
1. VS Code oching.
2. `Live Server` extension o'rnating.
3. `dashboard.html` faylida `Go Live` ni bosing.

### Variant B: Python local server
```bash
python3 -m http.server 8000
```
So'ng `http://localhost:8000/dashboard.html`.

### Variant C: Docker Compose (productionga yaqin)
```bash
docker compose up --build
```
So'ng `http://localhost:8080/dashboard.html`.

## Nimalar qo'shildi
- KPI kartalar (jami, muddatda, kechikayotgan, rad etilgan)
- Filtrlar (hudud va xizmat turi)
- Light/Dark rejim
- Xizmat sifati line chart
- Yo'nalishlar bo'yicha horizontal bar chart
- Hududlar bo'yicha vizual bar-map

## Deploy yo'riqnomasi
- `DEPLOYMENT_OPTIONS_UZ.md` faylida Cloudflare Pages, Vercel, Netlify, GitHub Pages va local production-like deploy bosqichlari berilgan.
- `ENVIRONMENT_RECOMMENDATION_UZ.md` faylida loyihani vizual ko'rish uchun eng qulay muhitlar jamlangan.

## Fayllar
- `dashboard.html` — UI struktura
- `dashboard.css` — theme, grid, responsive stil
- `dashboard.js` — data, filter logic, chart render
- `dashboard_design_spec_uz.md` — to'liq UX/UI spetsifikatsiya
- `DEPLOYMENT_OPTIONS_UZ.md` — productionga chiqarish yo'li
- `ENVIRONMENT_RECOMMENDATION_UZ.md` — visual ko'rish uchun muhitlar
- `Dockerfile` va `docker-compose.yml` — production-like local run
