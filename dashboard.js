const rawData = [
  { region: 'Toshkent sh.', service: 'Kommunal', total: 220, onTime: 180, late: 25, rejected: 15, rating: 4.4, month: 'Yan' },
  { region: 'Samarqand', service: 'Adliya', total: 160, onTime: 120, late: 28, rejected: 12, rating: 4.1, month: 'Fev' },
  { region: 'Andijon', service: 'Sog\'liq', total: 140, onTime: 105, late: 24, rejected: 11, rating: 3.9, month: 'Mar' },
  { region: 'Farg\'ona', service: 'Ta\'lim', total: 170, onTime: 140, late: 20, rejected: 10, rating: 4.3, month: 'Apr' },
  { region: 'Namangan', service: 'Transport', total: 110, onTime: 82, late: 18, rejected: 10, rating: 3.8, month: 'May' },
  { region: 'Buxoro', service: 'Kommunal', total: 130, onTime: 96, late: 21, rejected: 13, rating: 4.0, month: 'Iyn' }
];

const state = { region: 'Barchasi', service: 'Barchasi' };

const el = {
  regionFilter: document.getElementById('regionFilter'),
  serviceFilter: document.getElementById('serviceFilter'),
  resetBtn: document.getElementById('resetBtn'),
  themeToggle: document.getElementById('themeToggle'),
  lastUpdate: document.getElementById('lastUpdate')
};

let ratingChart;
let categoryChart;

function uniq(list) {
  return ['Barchasi', ...new Set(list)];
}

function filtered() {
  return rawData.filter(d =>
    (state.region === 'Barchasi' || d.region === state.region) &&
    (state.service === 'Barchasi' || d.service === state.service)
  );
}

function sum(key, rows) {
  return rows.reduce((acc, cur) => acc + cur[key], 0);
}

function renderKpis(rows) {
  document.getElementById('kpiTotal').textContent = sum('total', rows);
  document.getElementById('kpiOnTime').textContent = sum('onTime', rows);
  document.getElementById('kpiLate').textContent = sum('late', rows);
  document.getElementById('kpiRejected').textContent = sum('rejected', rows);
}

function renderRegionBars(rows) {
  const byRegion = {};
  rows.forEach(r => { byRegion[r.region] = (byRegion[r.region] || 0) + r.total; });
  const max = Math.max(...Object.values(byRegion), 1);
  const html = Object.entries(byRegion)
    .sort((a, b) => b[1] - a[1])
    .map(([region, value]) => `
      <div class="region-bar">
        <span>${region}</span>
        <div class="bar" style="width:${Math.round((value / max) * 100)}%"></div>
        <strong>${value}</strong>
      </div>
    `).join('');
  document.getElementById('regionBars').innerHTML = html || '<p class="muted">Ma\'lumot topilmadi.</p>';
}

function renderCharts(rows) {
  const months = rows.map(r => r.month);
  const ratings = rows.map(r => r.rating);

  if (ratingChart) ratingChart.destroy();
  ratingChart = new Chart(document.getElementById('ratingChart'), {
    type: 'line',
    data: { labels: months, datasets: [{ label: 'O\'rtacha baho', data: ratings, tension: 0.3 }] },
    options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { min: 1, max: 5 } } }
  });

  const byService = {};
  rows.forEach(r => { byService[r.service] = (byService[r.service] || 0) + r.total; });
  if (categoryChart) categoryChart.destroy();
  categoryChart = new Chart(document.getElementById('categoryChart'), {
    type: 'bar',
    data: {
      labels: Object.keys(byService),
      datasets: [{ label: 'Murojaatlar soni', data: Object.values(byService) }]
    },
    options: { indexAxis: 'y', plugins: { legend: { display: false } } }
  });
}

function render() {
  const rows = filtered();
  renderKpis(rows);
  renderRegionBars(rows);
  renderCharts(rows);
}

function initFilters() {
  uniq(rawData.map(d => d.region)).forEach(v => {
    el.regionFilter.add(new Option(v, v));
  });
  uniq(rawData.map(d => d.service)).forEach(v => {
    el.serviceFilter.add(new Option(v, v));
  });

  el.regionFilter.addEventListener('change', e => {
    state.region = e.target.value;
    render();
  });
  el.serviceFilter.addEventListener('change', e => {
    state.service = e.target.value;
    render();
  });
  el.resetBtn.addEventListener('click', () => {
    state.region = 'Barchasi';
    state.service = 'Barchasi';
    el.regionFilter.value = state.region;
    el.serviceFilter.value = state.service;
    render();
  });
}

function initTheme() {
  el.themeToggle.addEventListener('click', () => {
    const isDark = document.body.dataset.theme === 'dark';
    document.body.dataset.theme = isDark ? 'light' : 'dark';
    el.themeToggle.textContent = isDark ? '🌙 Dark' : '☀️ Light';
  });
}

function initDateDefaults() {
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - 30);
  const fmt = d => d.toISOString().slice(0, 10);
  document.getElementById('dateFrom').value = fmt(from);
  document.getElementById('dateTo').value = fmt(to);
  el.lastUpdate.textContent = `Yangilandi: ${to.toISOString().slice(0, 16).replace('T', ' ')}`;
}

initFilters();
initTheme();
initDateDefaults();
render();
