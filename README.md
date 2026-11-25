# Geodatenvisualisierung

Zwei Projekte aus dem Studium an der HFT Stuttgart, zusammengefasst in einem Repository. Im ersten Projekt ging es um die Darstellung von Wärmebedarfsdaten, im zweiten um interaktive Karten mit Leaflet.

Live-Demo nach Aktivierung von GitHub Pages: [Projektübersicht](https://tomorrownightsmash.github.io/geodatenvisualisierung/).

## Projekt 1 – Diagramme und Treemap

| Beispiel | Inhalt |
| --- | --- |
| [Jahresbedarf](waermebedarf/jahresbedarf.html) | Vergleich einzelner Gebäude |
| [Monatsbedarf](waermebedarf/monatsbedarf.html) | Wärmebedarf im Jahresverlauf |
| [Streudiagramm](waermebedarf/korrelation.html) | Baujahr und Wärmebedarf pro m² |
| [Bubble-Diagramm](waermebedarf/3D_Trend.html) | Baujahr, Wärmebedarf und beheizte Fläche |
| [Verteilung](waermebedarf/verteilung.html) | Verteilung nach Wärmebedarfsgrenzen aus der Übung |
| [Treemap](treemap/treemap.html) | Dateigrößen als proportionale Rechtecke |

## Projekt 2 – Karten

- [POI-Karte](poi/index.html): ausgewählte Orte in Stuttgart, ein- und ausblendbar nach Kategorien.
- [Gebäudealter](gebaeude/index.html): GeoJSON-Polygone nach Baujahr einfärben und als Balkendiagramm auswerten.
- [Bildungskategorien](bildung/index.html): Choroplethenkarte mit Popup-Informationen je Beispielgebiet.

## Ausprobieren

```bash
python -m http.server 8000
```

`http://localhost:8000` öffnen. Für die Diagramm- und Kartenbibliotheken sowie die OpenStreetMap-Kacheln ist Internetzugang erforderlich. Die Treemap kommt ohne externe Bibliothek aus.

## Daten und öffentlicher Stand

Die Lizenz der ursprünglichen Gebäude- und Bildungsdaten ließ sich anhand der Projektarchive nicht feststellen. Für die Demo wurden daher fiktive GeoJSON-Daten mit den benötigten Attributen erzeugt. Die POI-Liste stammt aus der Übung und wurde nicht auf Aktualität geprüft. Die PNG-Markersymbole wurden durch einfache CSS-Symbole ersetzt.

Die ursprünglichen Beispiele sind im Wesentlichen erhalten. Für die Veröffentlichung kamen eine Übersichtsseite, konsistente Farblegenden, Fehlerhinweise und eine korrigierte Flächenaufteilung der Treemap hinzu. Die unvollständige Europakarten-Übung und doppelte Testdateien sind nicht Teil der Demo. Die Wärmebedarfsklassen dienen der Visualisierung, nicht der Ausstellung eines Energieausweises.

Verwendet: HTML, CSS, JavaScript, Leaflet 1.9.4, ApexCharts 3.49.2, GeoJSON und OpenStreetMap.
