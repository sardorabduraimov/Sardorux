# Fuqarolar murojaatlari va davlat xizmatlari samaradorligi
## Yagona analitik dashboard (1 sahifa) — UX/UI dizayn spetsifikatsiyasi

## 1) Maqsad va dizayn printsiplari
Bu dashboardning asosiy vazifasi — fuqarolar murojaatlari va davlat xizmatlari bo‘yicha KPI’larni **tez o‘qiladigan, taqqoslanadigan va boshqaruv qarori qabul qilishga tayyor** formatda ko‘rsatish.

Asosiy printsiplar:
- **Ma’lumotlar ierarxiyasi:** “holat → sabab → hudud/yo‘nalish → tafsilot” ketma-ketligi.
- **Vizual muvozanat:** yuqori qismda KPI kartalar, markazda asosiy grafiklar, pastda chuqur tahlil.
- **Bir sahifada qaror qabul qilish:** filtrlash, trendlar, anomal holatlar bitta oqimda.
- **Scalable architecture:** yangi widgetlar qo‘shilganda grid va component tizimi buzilmaydi.

---

## 2) Sahifa arxitekturasi (12-column grid)
**Desktop (1440px)** uchun tavsiya:
- Container: 1320px
- Grid: 12 ustun
- Gutters: 24px
- Vertical rhythm: 8px base unit

### Global layout
1. **Header (doimiy):** dashboard nomi, oxirgi yangilanish vaqti, Light/Dark toggler.
2. **Filter panel (sticky):** sana oralig‘i, viloyat/tuman, xizmat turi, “Reset”, “Apply”.
3. **KPI qatori (4 ta karta):** jami, muddatda bajarilgan, kechikayotgan, rad etilgan.
4. **Asosiy analitika qatori:**
   - Chap: Murojaatlar xaritasi (katta blok)
   - O‘ng: Xizmat ko‘rsatish sifati trend grafigi
5. **Pastki qator:** Yo‘nalishlar bo‘yicha tahlil (bar chart + ulush).
6. **Footer utility:** data source, metodologiya, eksport tugmasi (CSV/PDF).

---

## 3) Bo‘limlar bo‘yicha dizayn yechimi

## A) Murojaatlar xaritasi (Uzbekistan map)
**Maqsad:** hududiy yuklama va muammoli nuqtalarni aniqlash.

**Vizual yechim:**
- Choropleth map (gradient: past → yuqori murojaat soni).
- Hover tooltip: viloyat nomi, jami murojaat, 7 kunlik o‘sish %, muddatda bajarilish %.
- Click action: o‘ng panelda “Top 3 tuman” mini-list.

**Rang logikasi (Light):**
- Neutral fon: `#F7F9FC`
- Gradient: `#D6E4FF` → `#1D4ED8`
- Alert overlay (anomaliya): `#DC2626` kontur

**Rang logikasi (Dark):**
- Fon: `#0B1220`
- Gradient: `#1E3A8A` → `#60A5FA`
- Matn: `#E5E7EB`

---

## B) Ijro statistikasi (KPI kartalar)
**KPI set:**
1. Jami murojaatlar
2. Muddatda bajarilganlar
3. Kechikayotganlar
4. Rad etilganlar

**Karta strukturasi:**
- Title (12–14px)
- Primary value (28–32px, semibold)
- Delta badge (↑/↓ % vs oldingi davr)
- Subtext: “tanlangan period bo‘yicha”

**Rang kodlash:**
- Bajarilgan: yashil (`#16A34A`)
- Kechikayotgan: sariq/oranj (`#F59E0B`)
- Rad etilgan: qizil (`#DC2626`)
- Jami: asosiy ko‘k (`#2563EB`)

**UX qoidasi:** kartani bosganda tegishli komponentlar cross-filter bo‘lsin.

---

## C) Xizmat ko‘rsatish statistikasi
**Maqsad:** fuqarolar bahosi va vaqt bo‘yicha trendni ko‘rsatish.

**Grafik tavsiyasi:**
- Line chart (oylik/haftalik trend)
- Qo‘shimcha: stacked area yoki grouped bar (baholar: 1–5)

**Ko‘rsatkichlar:**
- O‘rtacha baho (masalan: 4.2/5)
- NPS-ga o‘xshash index (ixtiyoriy)
- Javoblar soni (sample size) — interpretatsiya uchun shart

**UX detal:**
- Toggle: “Baho trendi / Baho taqsimoti”
- Tooltipda absolyut son + foiz birga chiqsin.

---

## D) Yo‘nalishlar bo‘yicha tahlil
**Maqsad:** eng ko‘p murojaat tushayotgan sohalarni prioritetlash.

**Grafik tavsiyasi:**
- Horizontal bar chart (Kommunal, Adliya, Sog‘liqni saqlash, Ta’lim, Transport, ...)
- Har bar ichida: murojaatlar soni + ulushi (%).

**Qo‘shimcha analitika:**
- “Top o‘sayotgan yo‘nalish” badge
- “Eng yuqori kechikish ulushi” belgilash (ikon + rang)

---

## E) Filtrlar (global)
Majburiy filtrlar:
- Sana oralig‘i (Date range picker)
- Viloyat / tuman
- Xizmat turi

**Interaction qoidalari:**
- Default: oxirgi 30 kun
- Filter state URL’da saqlansin (shareable)
- “Apply” bosilganda barcha chartlar sinxron yangilanadi
- “Reset” hamma filtrlarni defaultga qaytaradi

---

## 4) Data hierarchy va vizual balans (amaliy qoida)
1. **1-daraja (eng muhim):** KPI kartalar + anomaliya holatlari
2. **2-daraja:** hududiy taqsimot (xarita) va xizmat sifati trendi
3. **3-daraja:** yo‘nalishlar bo‘yicha drill-down
4. **4-daraja:** metadata, source, eksport

**Whitespace qoidası:**
- Bloklar oralig‘i: 24px
- Karta ichki padding: 16–20px
- Yirik sektsiya oralig‘i: 32px

---

## 5) WCAG va accessibility talablari
- Matn/ikon kontrasti minimum **4.5:1**
- Katta matn (18+ px) uchun **3:1**
- Rangga bog‘liq signalga qo‘shimcha ikon/label ishlatish
- Font size minimum 14px (body), line-height 1.4+
- Focus state aniq ko‘rinsin (keyboard navigation)
- Chartlarda rangdan tashqari pattern/markerlardan foydalanish

---

## 6) UI Kit va component modeli (Figma)
Tavsiya etilgan component to‘plami:
- `Header / Topbar`
- `Filter / DatePicker`
- `Filter / Select`
- `Card / KPI`
- `Chart / Map`
- `Chart / Line`
- `Chart / BarHorizontal`
- `Badge / Status`
- `Button / Primary-Secondary-Ghost`
- `Theme / Tokens`

**Auto-layout qoidalari:**
- Har bir karta va panel auto-layoutda bo‘lsin
- Hug/Fill mantiq to‘g‘ri berilsin
- Variantlar: Light/Dark, Default/Hover/Active/Disabled

---

## 7) Light/Dark mode tokenlar (minimal)

| Token | Light | Dark |
|---|---|---|
| `bg.primary` | `#FFFFFF` | `#0B1220` |
| `bg.secondary` | `#F8FAFC` | `#111827` |
| `text.primary` | `#0F172A` | `#E5E7EB` |
| `text.secondary` | `#475569` | `#94A3B8` |
| `accent.info` | `#2563EB` | `#60A5FA` |
| `accent.success` | `#16A34A` | `#22C55E` |
| `accent.warning` | `#F59E0B` | `#FBBF24` |
| `accent.danger` | `#DC2626` | `#F87171` |
| `border.default` | `#E2E8F0` | `#334155` |

---

## 8) Scalability (kelajak uchun)
- 12-column grid saqlanadi, yangi widgetlar 3/4/6 ustunli bloklarda qo‘shiladi.
- Chart componentlar data contract orqali ishlaydi (`label`, `value`, `delta`, `timestamp`, `region_id`).
- Skeleton/loading va empty/error holat komponentlari oldindan tayyorlanadi.
- Export va scheduled report moduli keyingi bosqichga mos bo‘ladi.

---

## 9) Baholash mezonlari bo‘yicha moslik
- **UX Logic:** sektsiyalar “KPI → hudud → sifat → yo‘nalish” ketma-ketligi bilan mantiqiy guruhlangan.
- **Data Visualization:** har bo‘limga maqsadga mos chart turi tanlangan (map, line, horizontal bar, KPI).
- **Scalability:** component-based va token-based yondashuv sabab kengaytirish oson.

---

## 10) 1-sahifalik wireframe (matnli)

```text
[Header: Dashboard nomi | Last update | Light/Dark]
[Filters: Date range | Region | Service type | Reset | Apply]

[KPI1: Jami] [KPI2: Muddatda] [KPI3: Kechikayotgan] [KPI4: Rad etilgan]

[Map: Murojaatlar xaritasi (8 col)] [Line/Rating Trend (4 col)]

[Horizontal Bar: Yo'nalishlar bo'yicha tahlil (12 col)]

[Footer: Source | Methodology | Export]
```

Bu wireframe Figma’da tez prototiplash uchun minimal blueprint sifatida ishlatiladi.
