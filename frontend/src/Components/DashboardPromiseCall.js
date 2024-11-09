import React from 'react'
import '@assenti/rui-components/css/index.css';




const cities = [
    { city: 'City A', lat: '35.486703', lot: '101.901875' },
    { city: 'City B', lat: '36.386493', lot: '138.59223' },
    { city: 'City C', lat: '36.536236', lot: '128.168944' },
    { city: 'City D', lat: '1.351616', lot: '103.808053' },
    { city: 'City E', lat: '12.457633', lot: '104.923981' }
]

const defaultPollutant = [{name: "PM2.5", value: 10, units: "µg/m3"},
{name: "CO", value: 20, units: "µg/m3"},
{name: "TEMP", value: 30, units: "ppb"},
{name: "NH3", value: 40, units: "ppb"},
{name: "Humidity", value: 60, units: "ppb"}];

const defaultTracker = {epa_aqi: "100", epa_primary_pollutant: "CO", epa_health_concern: "Moderate"}
export const DashboardPromiseCall = (selectedItem) => {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:5000/getData')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          resolve(data);
      })
      .catch(error => {
          reject(error);
      })
        // for (const city of cities) {
        //   // lat and lot is based on the selected city
        //   if(city.city === selectedItem) {
        //     // modify the query parameters based on your preferences, use your own API key
        //     const url = "https://api.climacell.co/v3/weather/realtime?lat=" + city.lat + "&lon=" + city.lot + "&unit_system=si&fields=pm25%2Cpm10%2Co3%2Cno2%2Cso2%2Cco%2Cepa_primary_pollutant%2Cepa_health_concern%2Cepa_aqi&apikey=rp7xnXPhpYEUPIG4cfljLEu3z6D5IbEb";
  
        //     let formData = null;
        //     let xhr = new XMLHttpRequest();
  
        //     xhr.addEventListener("readystatechange", function () {
        //       if (this.readyState === 4) {
        //         if(this.status === 200) {
        //           resolve(JSON.parse(this.responseText));
        //         } else {
        //           reject(new Error("Error!"));
        //         }
        //       }
        //     });
  
        //     xhr.open("GET", url);
        //     xhr.send(formData);
  
        //     break;
        //   }
        // }
      });
}
