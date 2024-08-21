import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useCities } from '../contexts/CitiesContext';

export default function Map() {
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const { cities } = useCities();

    useEffect(() => {
        if (lat && lng) {
            setMapPosition([lat, lng]);
        }
    }, [lat, lng])

    return (
        <div className={styles.mapContainer}>
            <MapContainer 
                className={styles.map} 
                center={mapPosition} 
                zoom={13} 
                scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.fr/hot">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                        <Popup>
                            <span>{city.emoji}</span>
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    )
}


const ChangeCenter = ({ position }) => {
    const map = useMap();
    map.setView(position);
    return null;
};

const DetectClick = () => {
    const navigate = useNavigate();
    useMapEvent({
        click: (e) => {
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
        }
    })
};