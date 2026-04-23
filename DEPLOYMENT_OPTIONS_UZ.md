# Dashboard loyihasini local va free hostingda productionga chiqarish

Ushbu loyiha static (`HTML/CSS/JS`) bo‘lgani uchun eng qulay yo‘l — **Git-based auto deploy**.

## Qisqa tavsiya (eng mos variantlar)
1. **Cloudflare Pages** — static loyiha uchun juda qulay, tez deploy, PR preview, custom domain.
2. **Vercel** — Git push bilan avtomatik deploy + preview URL, juda oson DX.
3. **Netlify** — boshlash oson, UI va deploy flow sodda.
4. **GitHub Pages** — eng oddiy va bepul variant, docs/portfolio uchun zo‘r.

---

## 1) Cloudflare Pages (TAVSIYA #1)
### Qachon tanlash kerak?
- Sizga CDN tezligi, oddiy sozlash, branch preview va keyinroq edge/function qo‘shish kerak bo‘lsa.

### Deploy qadamlar
1. Repo’ni GitHub’ga push qiling.
2. Cloudflare Dashboard → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Reponi tanlang.
4. Build sozlamalari:
   - **Production branch**: `main`
   - **Build command**: `exit 0` (static uchun)
   - **Build output directory**: `.`
5. Deploy tugmasini bosing.

### Muhim eslatma
- `index.html` root’da bo‘lishi kerak, aks holda `404` chiqishi mumkin.

---

## 2) Vercel (TAVSIYA #2)
### Qachon tanlash kerak?
- Tez onboarding, yaxshi preview/deployment UX va keyinchalik full-stackga o‘tish rejangiz bo‘lsa.

### Deploy qadamlar
1. Vercel’da **New Project** bosing.
2. GitHub repo’ni import qiling.
3. Framework presetni `Other`/`No Framework` qoldiring (yoki auto detect).
4. Kerak bo‘lsa output/root sozlang (`.`).
5. Deploy qiling — har `push`da avtomatik deploy ishlaydi.

### CLI bilan
```bash
npm i -g vercel
vercel
vercel --prod
```

---

## 3) Netlify (TAVSIYA #3)
### Qachon tanlash kerak?
- Soddalik, forms/functions ekotizimi va oson branch deploy kerak bo‘lsa.

### Deploy qadamlar
1. Netlify → **Add new site** → **Import an existing project**.
2. GitHub repo’ni ulang.
3. Build command bo‘sh qoldiring (yoki kerak bo‘lsa), publish directory: `.`
4. Deploy.

### Optional: `netlify.toml`
```toml
[build]
  publish = "."
```

---

## 4) GitHub Pages (TAVSIYA #4)
### Qachon tanlash kerak?
- Eng minimal va toza static hosting xohlasangiz.

### Deploy qadamlar
1. GitHub repo → **Settings** → **Pages**.
2. **Source**: *Deploy from a branch*.
3. Branch: `main`, folder: `/ (root)`.
4. Save va 5–10 daqiqa kuting.

---

## Local “production-like” ishga tushirish

## Variant A: oddiy local server
```bash
python3 -m http.server 8000
# http://localhost:8000/dashboard.html
```

## Variant B: Docker + Nginx (productionga yaqin)
`Dockerfile`:
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

Run:
```bash
docker build -t dashboard-ui .
docker run -p 8080:80 dashboard-ui
# http://localhost:8080/dashboard.html
```

---

## Men uchun eng qulay integratsiya (amaliy tavsiya)
Agar shu loyiha sizda tez-tez yangilanib turadigan bo‘lsa:
- **1-tanlov:** Cloudflare Pages (GitHub bilan)
- **2-tanlov:** Vercel (GitHub bilan)

Sabab: ikkalasida ham `git push -> auto deploy -> preview` juda silliq ishlaydi.

---

## Tez checklist (production oldidan)
- `index.html` root’da bor.
- Relative asset path’lar to‘g‘ri (`dashboard.css`, `dashboard.js`).
- `main` branch protected (ixtiyoriy).
- Custom domain + HTTPS yoqilgan.
- 404 fallback kerak bo‘lsa `404.html` qo‘shilgan.
