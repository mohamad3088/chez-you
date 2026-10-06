// Elke dag 09:30–19:00 (Google Maps, okt 2026)
const OPEN = "09:30", CLOSE = "19:00";

function brusselsMins() {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Brussels", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
  const get = t => parts.find(p => p.type === t).value;
  return (+get("hour") % 24) * 60 + +get("minute");
}
const toMins = s => { const [h, m] = s.split(":").map(Number); return h * 60 + m; };

function render() {
  const now = brusselsMins();
  const isOpen = now >= toMins(OPEN) && now < toMins(CLOSE);
  const text = isOpen ? `Nu open tot ${CLOSE} — loop binnen` : (now < toMins(OPEN) ? `Vandaag open vanaf ${OPEN}` : `Gesloten · morgen open vanaf ${OPEN}`);
  document.querySelector("[data-status-text]").textContent = text;
  document.querySelector("[data-status-box]").classList.toggle("is-open", isOpen);
  document.querySelector("[data-status]").textContent = isOpen ? `Nu open tot ${CLOSE} · Brusselsestraat 70` : "Brusselsestraat 70 · elke dag open";
  document.querySelector("[data-dot]").classList.toggle("is-open", isOpen);
}
render();
setInterval(render, 60_000);

const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
}), { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el, i) => { el.style.transitionDelay = `${(i % 3) * 100}ms`; io.observe(el); });

document.getElementById("year").textContent = new Date().getFullYear();
