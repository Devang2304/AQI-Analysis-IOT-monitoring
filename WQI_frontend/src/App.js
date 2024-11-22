import React, { useState, useEffect } from 'react';
import { TableSimple, Card, Avatar, List, Select, Icon, Header } from '@assenti/rui-components';
import { DashboardCard } from './Components/DashboardCard';
import { DashboardPromiseCall } from './Components/DashboardPromiseCall';
import { WqiPollutantTimeWise } from './Components/WqiPollutantTimeWise';
import {WqiPolutantHourWiseSingle} from './Components/WqiPolutantHourWiseSingle';
import { PollutantPieChart } from './Components/PollutantPieChart';
import {WqiGauge} from './Components/WqiGauge';
import {WqiYearWiseComparison} from './Components/WqiYearWiseComparison';
import { MLnCaculatedComparison } from './Components/MLnCaculatedComparison';
import { PollutantHeatMap } from './Components/PollutantHeatMap';
import { PollutionMap } from './Components/PollutionMap';
import WqiData from './data/wqi-beijing.json';
import '@assenti/rui-components/css/index.css';
const { Head, Body, Row, Cell } = TableSimple;



const getPredictedData = async (pm25,no2,co,so2,o3) => {
  const response = await fetch('http://127.0.0.1:8000/predict', {
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({pm25,no2,co,so2,o3})
  });

  const result = await response.json();
  console.log(result);
  return result;
}
const NotificationAndPredictionCard = ({ predictedWqi }) => (
  <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <p><i>Subscribe to our Telegram bot<br/> to get notification</i></p>
    <a href="https://t.me/telegram_bot_name" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}><Icon name="telegram" size={24} style={{ marginRight: '8px', color: '#0088cc' }} /></a>
    <hr style={{ width: '100%', borderTop: '1px solid #ddd', margin: '10px 0' }} />
    <h3>Predicted WQI <br/>for Tomorrow</h3>
    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff5722' }}>{predictedWqi}</p>
  </Card>
);


const cities = [
  { city: 'City A', lat: '35.486703', lot: '101.901875' },
  { city: 'City B', lat: '36.386493', lot: '138.59223' },
  { city: 'City C', lat: '36.536236', lot: '128.168944' },
  { city: 'City D', lat: '1.351616', lot: '103.808053' },
  { city: 'City E', lat: '12.457633', lot: '104.923981' }
]

const defaultPollutant = [{name: "Conductivity", value: 0, units: "µg/m3"},
{name: "Nitrate", value: 0, units: "µg/m3"},
{name: "PH", value: 0, units: "ppb"},
{name: "Turbidity", value: 0, units: "ppb"},
{name: "Temperature", value: 0, units: "ppb"}];

const defaultTracker = {epa_Wqi: "100", epa_primary_pollutant: "CO", epa_health_concern: "Moderate"}
const App = () => {
  const [city, setCity] = useState('');
  const [pollutant, setPollutant] = useState(defaultPollutant);
  const [tracker, setTracker] = useState(defaultTracker);
  const [predictedWqi, setPredictedWqi] = useState([0]);

  
  useEffect(() => {
    DashboardPromiseCall(city).then((data) => {
      console.log(data);
      setPollutant([{name: "Conductivity", value: data[0].Conductivity, units: "µg/m3"},
        {name: "Nitrate", value: data[0].Nitrate, units:"µg/m3"},
        {name: "PH", value: data[0].PH, units: "µg/m3"},
        {name: "Turbidity", value: data[0].Turbidity, units: "µg/m3"},
        {name: "Temperature", value: data[0].Temperature, units: "µg/m3"}]);
        console.log(pollutant);
      setTracker(defaultTracker);
    }, (error) => {
      setPollutant(defaultPollutant);
      setTracker(defaultTracker);
    });
    // getPredictedData(167,9,8,10,3).then((data) => {
    //   setPredictedWqi(data);
    //   // console.log("predicted:",data);
    // })

  }, [city]);

  return (
      <>
          <Header lifted>
                <h3>Water Quality Dashboard</h3>
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
          {DashboardCard("Water Pollution Level", tracker.epa_health_concern, "shield-account", "green")}
          {DashboardCard("Water Quality Index", tracker.epa_Wqi, "heart", "red")}
          {DashboardCard("Main Pollutants", tracker.epa_primary_pollutant, "delete", "black")}
          {DashboardCard(<WqiGauge Wqi={predictedWqi}/>)}
          <NotificationAndPredictionCard predictedWqi={predictedWqi} />
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
          {<WqiPollutantTimeWise data={WqiData}/>}
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
        <WqiPolutantHourWiseSingle />
      </div>
      <div style={{ width: '30%', height: '100%' }}>
        <PollutantPieChart />
      </div>
    </div>
    <br/>
    <div>
    <h1>Year wise comparison of WQI</h1>
    {<WqiYearWiseComparison/>}
  </div>
  <br />
    <div>
    <h1>Comparison of Predicted & Actual WQI</h1>
    {<MLnCaculatedComparison/>}
  </div>
    <div>
    <h1>WQI HeatMap</h1>
    {<PollutantHeatMap/>}
  </div>
  <div>
    <h1>WQI India Map</h1>
    {<PollutionMap/>}
  </div>
      </>
  );
}

export default App;