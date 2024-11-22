import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

export const WqiYearWiseComparison = () => {
    const chartRef = useRef(null);
  
    useEffect(() => {
      const chartInstance = echarts.init(chartRef.current);
  
      const option = {
        title: {
          text: 'WQI Year Wise Comparison'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['2017', '2018', '2019', '2020', '2021']
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
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '2017',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210, 220, 300, 400, 500, 600]
          },
          {
            name: '2018',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 430, 310,134, 90, 230, 210, 220]
          },
          {
            name: '2019',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 130, 410,182, 191, 234, 290, 430]
          },
          {
            name: '2020',
            type: 'line',
            stack: 'Total',
            data: [320, 332, 301, 334, 390, 430, 320, 201, 154, 190, 130, 410]
          },
          {
            name: '2021',
            type: 'line',
            stack: 'Total',
            data: [220, 372, 110, 394, 400, 200, 370,332, 301, 334, 390, 430]
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
  