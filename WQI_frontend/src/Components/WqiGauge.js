import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

export const WqiGauge = ({ wqi }) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);


  const getWqiCategory = (wqi) => {
    if (wqi <= 50) return 'Good';
    if (wqi <= 100) return 'Moderate';
    if (wqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (wqi <= 200) return 'Unhealthy';
    if (wqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);
    setChartInstance(myChart);

    const option = {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 500,
          splitNumber: 5,
          axisLine: {
            lineStyle: {
              width: 20,
              color: [
                [0.1, '#00e400'],   // Good (0-50)
                [0.2, '#ffff00'],   // Moderate (51-100)
                [0.3, '#ff7e00'],   // Unhealthy for Sensitive Groups (101-150)
                [0.4, '#ff0000'],   // Unhealthy (151-200)
                [0.6, '#8f3f97'],   // Very Unhealthy (201-300)
                [1, '#7e0023']      // Hazardous (301-500)
              ]
            }
          },
          pointer: {
            show: true,
            length: '80%',
            width: 8
          },
          axisTick: {
            splitNumber: 5,
            length: 10,
            lineStyle: {
              color: '#fff',
              width: 1
            }
          },
          axisLabel: {
            distance: -50,
            color: '#000',
            fontSize: 12,
            
          },
          splitLine: {
            distance: -20,
            length: 15,
            lineStyle: {
              color: '#fff',
              width: 2
            }
          },
          detail: {
            fontSize: 16,
            offsetCenter: [0, '40%'],
            formatter: `{value} - ${getWqiCategory(wqi)}`, 
            color: 'inherit'
          },
          data: [
            {
              value: wqi
            }
          ]
        }
      ]
    };

    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());

    return () => {
      window.removeEventListener('resize', () => myChart.resize());
      myChart.dispose();
    };
  }, []);

  useEffect(() => {
    if (chartInstance) {
      chartInstance.setOption({
        series: [
          {
            data: [
              {
                value: wqi || 0
              }
            ],
            detail: {
              formatter: `{value} - ${getWqiCategory(wqi)}`, 
            }
          }
        ]
      });
    }
  }, [wqi, chartInstance]);

  return <div ref={chartRef} style={{ width: '100%', height: '300px' }} />;
};
