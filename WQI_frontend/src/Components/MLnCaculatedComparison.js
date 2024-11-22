import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export const MLnCaculatedComparison = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

    const colors = ['#5470C6', '#EE6666'];

    
    const option = {
      color: colors,
      tooltip: {
        trigger: 'none',
        axisPointer: {
          type: 'cross'
        }
      },
      legend: {},
      grid: {
        top: 70,
        bottom: 50
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { alignWithLabel: true },
          axisLine: {
            onZero: false,
            lineStyle: { color: colors[1] }
          },
          axisPointer: {
            label: {
              formatter: function (params) {
                return (
                  'Calculated WQI  ' +
                  params.value +
                  (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                );
              }
            }
          },
          data: [
             '02-11-2023', '03-11-2023', '04-11-2023', '05-11-2023', '06-11-2023', '07-11-2023','08-11-2023'
          ]
        },
        {
          type: 'category',
          axisTick: { alignWithLabel: true },
          axisLine: {
            onZero: false,
            lineStyle: { color: colors[0] }
          },
          axisPointer: {
            label: {
              formatter: function (params) {
                return (
                  'Predicted WQI  ' +
                  params.value +
                  (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                );
              }
            }
          },
          data: [
            '02-11-2024', '03-11-2024', '04-11-2024', '05-11-2024', '06-11-2024', '07-11-2024','08-11-2024'
          ]
        },
        
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Predicted WQI (Last 7 Days)',
          type: 'line',
          xAxisIndex: 1,
          smooth: true,
          emphasis: { focus: 'series' },
          data: [
            2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
          ]
        },
        {
          name: 'Calculated WQI (Last 7 Days)',
          type: 'line',
          smooth: true,
          emphasis: { focus: 'series' },
          data: [
            3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7
          ]
        }
      ]
    };

    
    myChart.setOption(option);

    
    const handleResize = () => myChart.resize();
    window.addEventListener('resize', handleResize);

    
    return () => {
      window.removeEventListener('resize', handleResize);
      myChart.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};


