import React, { useState, useEffect } from 'react';
import './PollutionMapStyle.css';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Icon } from 'leaflet';
import covidData from '../data/data.json';

export const PollutionMap = () => {
    const [activeAqi, setActiveAqi] = useState(null);
    const [userLocation, setUserLocation] = useState(null);

    
    const getAqiColor = (aqi) => {
        if (aqi <= 50) return "green";
        if (aqi <= 100) return "yellow";
        if (aqi <= 150) return "orange";
        if (aqi <= 200) return "red";
        if (aqi <= 300) return "purple";
        return "maroon";
    };

    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    aqi: Math.floor(Math.random() * 500), 
                });
            },
            () => {
                console.error("Location access denied.");
            }
        );
    }, []);

    return (
        <MapContainer
            center={[20.593683, 78.962883]}
            zoom={5}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            />

            {covidData.map((eachData) => (
                <Marker
                    key={eachData.Id}
                    position={[eachData.Latitude, eachData.Longitude]}
                    eventHandlers={{
                        click: () => {
                            setActiveAqi(eachData);
                        },
                    }}
                >
                    <Circle
                        center={[eachData.Latitude, eachData.Longitude]}
                        radius={50000}
                        color={getAqiColor(eachData.AQI)}
                    />
                </Marker>
            ))}


            {userLocation && (
                <Marker
                    position={[userLocation.latitude, userLocation.longitude]}
                    eventHandlers={{
                        click: () => {
                            setActiveAqi(userLocation);
                        },
                    }}
                >
                    <Circle
                        center={[userLocation.latitude, userLocation.longitude]}
                        radius={50000}
                        color={getAqiColor(userLocation.aqi)}
                    />
                </Marker>
            )}

            {activeAqi && (
                <Popup
                    position={[
                        activeAqi.latitude || activeAqi.Latitude,
                        activeAqi.longitude || activeAqi.Longitude,
                    ]}
                    onClose={() => {
                        setActiveAqi(null);
                    }}
                >
                    <div>
                        <h1>{activeAqi.Location || "Your Location"}</h1>
                        <p>AQI: {activeAqi.AQI || activeAqi.aqi}</p>
                        <p style={{ color: getAqiColor(activeAqi.AQI || activeAqi.aqi) }}>
                            Status:{" "}
                            {activeAqi.aqi <= 50
                                ? "Good"
                                : activeAqi.aqi <= 100
                                ? "Moderate"
                                : activeAqi.aqi <= 150
                                ? "Unhealthy for Sensitive Groups"
                                : activeAqi.aqi <= 200
                                ? "Unhealthy"
                                : activeAqi.aqi <= 300
                                ? "Very Unhealthy"
                                : "Hazardous"}
                        </p>
                    </div>
                </Popup>
            )}
        </MapContainer>
    );
};


