import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export const PollutantHeatMap = () => {
  const chartRef = useRef(null);

  const getVirtualData = (year) => {
    const date = +echarts.time.parse(year + '-01-01');
    const end = +echarts.time.parse(+year + 1 + '-01-01');
    const dayTime = 3600 * 24 * 1000;
    const data = [];
    for (let time = date; time < end; time += dayTime) {
      data.push([
        echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
        Math.floor(Math.random() * 500), 
      ]);
    }
    return data;
  };

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);
      
      const option = {
        title: {
          top: 30,
          left: 'center',
          text: 'Daily WQI Levels',
        },
        tooltip: {},
        visualMap: {
          type: 'piecewise',
          orient: 'horizontal',
          left: 'center',
          top: 65,
          pieces: [
            { min: 0, max: 50, color: '#00e400', label: 'Good (0-50)' },
            { min: 51, max: 100, color: '#ffff00', label: 'Moderate (51-100)' },
            { min: 101, max: 150, color: '#ff7e00', label: 'Unhealthy for Sensitive Groups (101-150)' },
            { min: 151, max: 200, color: '#ff0000', label: 'Unhealthy (151-200)' },
            { min: 201, max: 300, color: '#8f3f97', label: 'Very Unhealthy (201-300)' },
            { min: 301, max: 500, color: '#7e0023', label: 'Hazardous (301-500)' }
          ]
        },
        calendar: {
          top: 120,
          left: 30,
          right: 30,
          cellSize: ['auto', 13],
          range: '2024',
          itemStyle: {
            borderWidth: 0.5,
          },
          yearLabel: { show: false },
        },
        series: {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: getVirtualData('2024'),
        },
      };

      myChart.setOption(option);

      return () => {
        myChart.dispose();
      };
    }
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};
