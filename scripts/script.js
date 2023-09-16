"use strict";

let first = true;

const map = L.map("iss-map").setView([51.505, -0.09], 2);
const attribution =
  '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors';
const tileUrl = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);

const myIcon = L.icon({
  iconUrl: "images/iss-png--817.png",

  iconSize: [71, 30],
  iconAnchor: [25, 10],
});
const marker = L.marker([0, 0], { icon: myIcon }).addTo(map);
const api_iss = "https://api.wheretheiss.at/v1/satellites/25544";
// L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   maxZoom: 19,
//   attribution:
//     '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
// }).addTo(map);

async function getISS() {
  const res = await fetch(api_iss);
  const data = await res.json();
  const { latitude, longitude } = data;

  marker.setLatLng([latitude, longitude]);
  if (first) {
    map.setView([latitude, longitude], 2);
    first = false;
  }

  //   L.marker([latitude, longitude], { icon: myIcon }).addTo(map);
  //   console.log(longitude);
}
getISS();

setInterval(getISS, 10000);
