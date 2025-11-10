"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: typeof iconUrl === "string" ? iconUrl : iconUrl.src,
  shadowUrl: typeof iconShadow === "string" ? iconShadow : iconShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapSection() {
  const position: [number, number] = [21.0285, 105.8542];

  return (
    <div>
      <div>
        <MapContainer
          center={position}
          zoom={15}
          style={{ height: "400px", width: "1180px", borderRadius: "12px" }}
          scrollWheelZoom={false}
        >
          {/* Layer hiển thị nền bản đồ */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Marker vị trí showroom */}
          <Marker position={position} icon={customIcon}>
            <Popup>
              <strong>Showroom Nội Thất Phúc</strong> <br />
              123 Đường ABC, Quận XYZ <br />
              <a
                href="https://maps.google.com/?q=10.123456,105.123456"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mở trên Google Maps
              </a>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
