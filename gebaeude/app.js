document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('mapid').setView([48.7903, 9.204], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Rottöne für Baujahre
    function getColor(yearOfConstruction) {
        return yearOfConstruction > 2000 ? '#FF0000' : // Helles Rot
               yearOfConstruction > 1980 ? '#E60000' : // Mittelrot
               yearOfConstruction > 1960 ? '#CC0000' : // Dunkleres Rot
               yearOfConstruction > 1940 ? '#B20000' : // Weinrot
               yearOfConstruction > 1920 ? '#990000' : // Sehr dunkles Rot
               '#800000'; // Fast Schwarzrot
    }

    function style(feature) {
        return {
            fillColor: getColor(feature.properties['Year_of_co']),
            weight: 2,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.7
        };
    }

    function onEachFeature(feature, layer) {
        if (feature.properties && feature.properties['Year_of_co']) {
            var popupContent = `<strong>Baujahr: </strong>${feature.properties['Year_of_co']}`;
            layer.bindPopup(popupContent, { closeButton: true });
        }
    }

    function processData(data) {
        const counts = {
            '1920': 0, '1940': 0, '1960': 0, '1980': 0, '2000': 0, '2020': 0
        };
        data.features.forEach(feature => {
            const year = feature.properties['Year_of_co'];
            if (year > 2000) counts['2020']++;
            else if (year > 1980) counts['2000']++;
            else if (year > 1960) counts['1980']++;
            else if (year > 1940) counts['1960']++;
            else if (year > 1920) counts['1940']++;
            else counts['1920']++;
        });
        return counts;
    }

    function updateChart(buildingCounts) {
        var options = {
            series: [{
                name: 'Anzahl Gebäude',
                data: Object.values(buildingCounts)
            }],
            chart: {
                type: 'bar',
                height: 430
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    distributed: true
                }
            },
            colors: ['#800000', '#990000', '#B20000', '#CC0000', '#E60000', '#FF0000'],
            xaxis: {
                categories: ['≤ 1920','1921–1940','1941–1960','1961–1980','1981–2000','ab 2001']
            }
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    }

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const buildingCounts = processData(data);
            updateChart(buildingCounts);
            L.geoJSON(data, {
                style: style,
                onEachFeature: onEachFeature
            }).addTo(map);
        }).catch(error => { document.querySelector("#chart").textContent = "Daten konnten nicht geladen werden."; console.error(error); });
});
