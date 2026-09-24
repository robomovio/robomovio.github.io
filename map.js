//MEMBER MAP
// Initialize the member_map and set its view
const member_map = L.map('member_map', { center: [49.005, 12.12], zoom: 12, maxBounds: [[-90, -180], [90, 180]], maxBoundsViscosity: 0.8, zoomControl: true, attributionControl: false });

// Add the base member_map layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(member_map);

// Add markers to the member_map
const markers = [
    {
        lat: 49.0001171,
        lng: 12.1041891,
        title: "MINT-Labs",
        popup: "<h2>MINT-Labs: </h2><p>Our main meeting point</p>"
    },
    {
        lat: 49.00844192504883,
        lng: 12.14494800567627,
        title: "Continental / Aumovio",
        popup: "<h2>Continental / Aumovio: </h2><p>Our secondary meeting point</p>"
    }
];

markers.forEach((marker) => {
    L.marker([marker.lat, marker.lng], { icon: L.icon({ iconUrl: 'red-marker.png', iconSize: [50, 50], iconAnchor: [25, 50]}) })
        .addTo(member_map)
        .bindPopup(marker.popup)
        .bindTooltip(marker.title);
});