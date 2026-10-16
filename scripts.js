// Language switch (German by default, English on request or for non-German browsers)
const strings = {
    de: { sending: 'Wird gesendet …', sent: 'Danke, ist angekommen! Wir melden uns.', failed: 'Das hat nicht geklappt. Versucht es bitte später nochmal.' },
    en: { sending: 'Sending …', sent: 'Thanks, got it! We\'ll get back to you.', failed: 'That didn\'t work. Please try again later.' }
};

let lang = 'de';

function setLang(next) {
    lang = next;
    const root = document.documentElement;
    root.classList.remove('lang-de', 'lang-en');
    root.classList.add('lang-' + lang);
    root.lang = lang;
    document.querySelectorAll('.lang-switch button').forEach(btn => {
        btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });
    try { localStorage.setItem('lang', lang); } catch (e) {}
}

let saved = null;
try { saved = localStorage.getItem('lang'); } catch (e) {}
const browserLang = (navigator.language || 'de').toLowerCase();
setLang(saved || (browserLang.startsWith('de') ? 'de' : 'en'));

document.querySelectorAll('.lang-switch button').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

document.getElementById('year').textContent = new Date().getFullYear();

// Map
function initMap() {
    const map = L.map('member_map', {
        center: [49.004, 12.124],
        zoom: 13,
        scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const places = [
        { lat: 49.0001171, lng: 12.1041891, title: 'MINT-Labs Regensburg', color: '#00b8d9', size: 20 },
        { lat: 49.00844192504883, lng: 12.14494800567627, title: 'AUMOVIO', color: '#15171e', size: 16 }
    ];

    map.fitBounds(places.map(p => [p.lat, p.lng]), { padding: [40, 40] });

    places.forEach(place => {
        const icon = L.divIcon({
            className: '',
            html: `<div class="map-pin" style="width:${place.size}px;height:${place.size}px;background:${place.color}"></div>`,
            iconSize: [place.size, place.size],
            iconAnchor: [place.size / 2, place.size / 2]
        });
        L.marker([place.lat, place.lng], { icon, title: place.title })
            .addTo(map)
            .bindTooltip(place.title, { direction: 'top', offset: [0, -8] });
    });
}

document.addEventListener('DOMContentLoaded', initMap);

// Contact form via EmailJS
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const status = document.getElementById('contact-status');
    status.style.color = '';
    status.textContent = strings[lang].sending;

    emailjs.sendForm('service_lmzfqas', 'template_bw0zk5n', this)
        .then(() => {
            status.style.color = 'var(--success)';
            status.textContent = strings[lang].sent;
            this.reset();
        }, (err) => {
            status.style.color = 'var(--error)';
            status.textContent = strings[lang].failed;
            console.error('EmailJS error:', err);
        });
});
