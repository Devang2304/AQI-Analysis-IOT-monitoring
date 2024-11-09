import React, { useState, useEffect } from 'react';
import { TableSimple, Card, Avatar, List, Select, Icon, Header } from '@assenti/rui-components';
import { DashboardCard } from './Components/DashboardCard';
import { DashboardPromiseCall } from './Components/DashboardPromiseCall';
import { AqiPollutantTimeWise } from './Components/AqiPollutantTimeWise';
import {AqiPolutantHourWiseSingle} from './Components/AqiPolutantHourWiseSingle';
import { PollutantPieChart } from './Components/PollutantPieChart';
import {AqiGauge} from './Components/AqiGauge';
import {AqiYearWiseComparison} from './Components/AqiYearWiseComparison';
import { MLnCaculatedComparison } from './Components/MLnCaculatedComparison';
import { PollutantHeatMap } from './Components/PollutantHeatMap';
import aqiData from './data/aqi-beijing.json';
import '@assenti/rui-components/css/index.css';
const { Head, Body, Row, Cell } = TableSimple;


const NotificationAndPredictionCard = ({ predictedAqi }) => (
  <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <p><i>Subscribe to our Telegram bot<br/> to get notification</i></p>
    <a href="https://t.me/telegram_bot_name" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}><Icon name="telegram" size={24} style={{ marginRight: '8px', color: '#0088cc' }} /></a>
    <hr style={{ width: '100%', borderTop: '1px solid #ddd', margin: '10px 0' }} />
    <h3>Predicted AQI <br/>for Tomorrow</h3>
    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff5722' }}>{predictedAqi}</p>
  </Card>
);


const cities = [
  { city: 'City A', lat: '35.486703', lot: '101.901875' },
  { city: 'City B', lat: '36.386493', lot: '138.59223' },
  { city: 'City C', lat: '36.536236', lot: '128.168944' },
  { city: 'City D', lat: '1.351616', lot: '103.808053' },
  { city: 'City E', lat: '12.457633', lot: '104.923981' }
]

const defaultPollutant = [{name: "PM2.5", value: 0, units: "µg/m3"},
{name: "CO", value: 0, units: "µg/m3"},
{name: "TEMP", value: 0, units: "ppb"},
{name: "NH3", value: 0, units: "ppb"},
{name: "Humidity", value: 0, units: "ppb"}];

const defaultTracker = {epa_aqi: "100", epa_primary_pollutant: "CO", epa_health_concern: "Moderate"}
const App = () => {
  const [city, setCity] = useState('');
  const [pollutant, setPollutant] = useState(defaultPollutant);
  const [tracker, setTracker] = useState(defaultTracker);

  
  useEffect(() => {
    DashboardPromiseCall(city).then((data) => {
      console.log(data);
      setPollutant([{name: "PM2.5", value: data[0].pm25, units: "µg/m3"},
        {name: "NH3", value: data[0].nh3, units:"µg/m3"},
        {name: "temp", value: data[0].temp, units: "µg/m3"},
        {name: "humidity", value: data[0].humidity, units: "µg/m3"},
        {name: "CO", value: data[0].co, units: "µg/m3"}]);
        console.log(pollutant);
      setTracker(defaultTracker);
    }, (error) => {
      setPollutant(defaultPollutant);
      setTracker(defaultTracker);
    });

  }, [city]);

  return (
      <>
          <Header lifted>
                <h3>Air Quality Dashboard</h3>
                <Select
                  prefix={<Icon name="earth"/>}
                  items={cities}
                  itemKey="city"
                  color="primary"
                  placeholder="Cities"
                  value={city}
                  tagOutlined
                  onChange={value => {
                    setCity(value);
                  }}/>
          </Header>

          <p></p>

          <List grid={true}
          noDivider={true}>
          {DashboardCard("Air Pollution Level", tracker.epa_health_concern, "shield-account", "green")}
          {DashboardCard("Air Quality Index", tracker.epa_aqi, "heart", "red")}
          {DashboardCard("Main Pollutants", tracker.epa_primary_pollutant, "delete", "black")}
          {DashboardCard(<AqiGauge aqi={350}/>)}
          <NotificationAndPredictionCard predictedAqi={350} />
          </List>
          <p></p>

          <TableSimple
              grid
              noHover
              bordered
              stripped>
              <Head>
                  <Row>
                      <TableSimple.Header>Pollutants</TableSimple.Header>
                      <TableSimple.Header>Concentration</TableSimple.Header>
                      <TableSimple.Header>Units</TableSimple.Header>
                  </Row>
              </Head>
              <Body>
                  {pollutant.map((item, index) =>
                      <Row key={index}>
                          <Cell>{item.name}</Cell>
                          <Cell>{item.value}</Cell>
                          <Cell>{item.units}</Cell>
                      </Row>
                  )}
              </Body>
          </TableSimple>
          <p></p>
          {<AqiPollutantTimeWise data={aqiData}/>}
          <br />
          <br />
          <br />
          <p></p>
          <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px'
      }}
    >
      <div style={{ width: '70%', height: '100%' }}>
        <AqiPolutantHourWiseSingle />
      </div>
      <div style={{ width: '30%', height: '100%' }}>
        <PollutantPieChart />
      </div>
    </div>
    <br/>
    <div>
    <h1>Year wise comparison of AQI</h1>
    {<AqiYearWiseComparison/>}
  </div>
  <br />
    <div>
    <h1>Comparison of Predicted & Actual AQI</h1>
    {<MLnCaculatedComparison/>}
  </div>
    <div>
    <h1>AQI HeatMap</h1>
    {<PollutantHeatMap/>}
  </div>
      </>
  );
}

export default App;