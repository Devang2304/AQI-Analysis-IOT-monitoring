import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

export const WqiPolutantHourWiseSingle = () => {
    const chartRef = useRef(null);
  
    useEffect(() => {
      const chartInstance = echarts.init(chartRef.current);
  
      const option = {
        title: {
          text: 'WQI Polutant Hourwise'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Conductivity', 'Nitrate', 'PH', 'Turbidity', 'Temperature']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Conductivity',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Nitrate',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'PH',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'Turbidity',
            type: 'line',
            stack: 'Total',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: 'Temperature',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };
  
      chartInstance.setOption(option);
  
      const handleResize = () => {
        chartInstance.resize();
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
        chartInstance.dispose();
      };
    }, []);
  
    return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
  };
  