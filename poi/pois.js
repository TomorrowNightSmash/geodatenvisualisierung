document.addEventListener('DOMContentLoaded', function () {
    // Karte initialisieren
    var map = L.map('mapid').setView([48.779900, 9.172459], 13);

    // Tile Layer hinzufügen
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Marker-Kategorien mit einfachen, selbst definierten CSS-Symbolen.
    function createIcon(label, color) {
        return L.divIcon({className:'poi-marker', html:`<span style="background:${color}">${label}</span>`, iconSize:[28,28], iconAnchor:[14,14], popupAnchor:[0,-14]});
    }
    const icons = {
        gym:createIcon('S','#8762aa'), library:createIcon('B','#3e7285'),
        market:createIcon('E','#b26c29'), food:createIcon('R','#9e5344'),
        museum:createIcon('M','#267a70'), train:createIcon('V','#3e5f91'),
        cinema:createIcon('K','#765e8c'), school:createIcon('H','#406e49')
    };

    // Marker-Daten
    const markers = [
        { position: [48.788389779786755, 9.233671993788121], icon: icons.museum, name: "Mercedes Benz Museum", type: "Museum" },
        { position: [48.83453118372308, 9.152253916342787], icon: icons.museum, name: "Porsche Museum", type: "Museum" },
        { position: [48.774549362780725, 9.17188073560016], icon: icons.gym, name: "Fitness First Stuttgart-Mitte", type: "Fitnessstudio" },
        { position: [48.74177955011162, 9.095073811663118], icon: icons.gym, name: "Universität Stuttgart - Hochschulsport", type: "Hochschulsport" },
        { position: [48.77841860034679, 9.177637412077921], icon: icons.museum, name: "Kunstmuseum Stuttgart", type: "Museum" },
        { position: [48.781978770183656, 9.171646694224966], icon: icons.library, name: "Universitätsbibliothek Stuttgart", type: "Bibliothek" },
        { position: [48.79026076908263, 9.183067698170818], icon: icons.library, name: "Stadtbibliothek Stuttgart", type: "Bibliothek" },
        { position: [48.779621147813224, 9.177946082829033], icon: icons.market, name: "Königsbaupassagen", type: "Einkaufszentrum" },
        { position: [48.77637743685984, 9.179420427005734], icon: icons.market, name: "Markthalle Stuttgart", type: "Markt" },
        { position: [48.7832230228826, 9.182649515137031], icon: icons.train, name: "Hauptbahnhof Stuttgart", type: "Bahnhof" },
        { position: [48.78009340464282, 9.168433828853331], icon: icons.cinema, name: "CinemaxX Stuttgart", type: "Kino" },
        { position: [48.77737606019276, 9.176943723580491], icon: icons.market, name: "Aldi", type: "Supermarkt" },
        { position: [48.784561285991195, 9.177240840941126], icon: icons.food, name: "Mensa der Universität Stuttgart", type: "Mensa" },
        { position: [48.777249395939165, 9.172892758583268], icon: icons.food, name: "Burreatos", type: "Restaurant" },
        { position: [48.780621999638015, 9.172623840499737], icon: icons.school, name: "HFT", type: "Hochschule" }
    ];

    // Layer-Gruppen für Kategorien
    const markerLayers = {};

    markers.forEach(marker => {
        const markerLayer = L.marker(marker.position, { icon: marker.icon })
            .bindPopup(`<strong>${marker.name}</strong><br>${marker.type}`);
        if (!markerLayers[marker.type]) {
            markerLayers[marker.type] = L.layerGroup().addTo(map);
        }
        markerLayers[marker.type].addLayer(markerLayer);
    });

    // Event Listener für Checkboxen
    document.querySelectorAll('#controls input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const category = this.dataset.category;
            if (this.checked) {
                markerLayers[category]?.addTo(map);
            } else {
                if (markerLayers[category]) map.removeLayer(markerLayers[category]);
            }
        });
    });

    console.log('Karte erfolgreich geladen!');
});
