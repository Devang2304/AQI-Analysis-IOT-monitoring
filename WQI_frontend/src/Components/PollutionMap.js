import React, { useState, useEffect } from 'react';
import './PollutionMapStyle.css';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Icon } from 'leaflet';
import covidData from '../data/data.json';

export const PollutionMap = () => {
    const [activeWqi, setActiveWqi] = useState(null);
    const [userLocation, setUserLocation] = useState(null);

    
    const getWqiColor = (Wqi) => {
        if (Wqi <= 50) return "green";
        if (Wqi <= 100) return "yellow";
        if (Wqi <= 150) return "orange";
        if (Wqi <= 200) return "red";
        if (Wqi <= 300) return "purple";
        return "maroon";
    };

    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    Wqi: Math.floor(Math.random() * 500), 
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
                            setActiveWqi(eachData);
                        },
                    }}
                >
                    <Circle
                        center={[eachData.Latitude, eachData.Longitude]}
                        radius={50000}
                        color={getWqiColor(eachData.WQI)}
                    />
                </Marker>
            ))}


            {userLocation && (
                <Marker
                    position={[userLocation.latitude, userLocation.longitude]}
                    eventHandlers={{
                        click: () => {
                            setActiveWqi(userLocation);
                        },
                    }}
                >
                    <Circle
                        center={[userLocation.latitude, userLocation.longitude]}
                        radius={50000}
                        color={getWqiColor(userLocation.Wqi)}
                    />
                </Marker>
            )}

            {activeWqi && (
                <Popup
                    position={[
                        activeWqi.latitude || activeWqi.Latitude,
                        activeWqi.longitude || activeWqi.Longitude,
                    ]}
                    onClose={() => {
                        setActiveWqi(null);
                    }}
                >
                    <div>
                        <h1>{activeWqi.Location || "Your Location"}</h1>
                        <p>WQI: {activeWqi.WQI || activeWqi.Wqi}</p>
                        <p style={{ color: getWqiColor(activeWqi.WQI || activeWqi.Wqi) }}>
                            Status:{" "}
                            {activeWqi.Wqi <= 50
                                ? "Good"
                                : activeWqi.Wqi <= 100
                                ? "Moderate"
                                : activeWqi.Wqi <= 150
                                ? "Unhealthy for Sensitive Groups"
                                : activeWqi.Wqi <= 200
                                ? "Unhealthy"
                                : activeWqi.Wqi <= 300
                                ? "Very Unhealthy"
                                : "Hazardous"}
                        </p>
                    </div>
                </Popup>
            )}
        </MapContainer>
    );
};


