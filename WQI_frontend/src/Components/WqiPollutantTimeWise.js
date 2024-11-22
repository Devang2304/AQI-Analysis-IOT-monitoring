import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';


export const WqiPollutantTimeWise = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); 


  useEffect(() => {
    
    if (chartInstance.current) {
      chartInstance.current.dispose();
    }
    chartInstance.current = echarts.init(chartRef.current);

    const option = {
      title: {
        text: 'Mumbai WQI',
        left: '1%',
      },
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: '5%',
        right: '15%',
        bottom: '10%',
      },
      xAxis: {
        data: data.map((item) => item[0]),
      },
      yAxis: {},
      toolbox: {
        right: 10,
        feature: {
          dataZoom: {
            yAxisIndex: 'none',
          },
          restore: {},
          saveAsImage: {},
        },
      },
      dataZoom: [
        {
          startValue: '2014-06-01',
        },
        {
          type: 'inside',
        },
      ],
      visualMap: {
        top: 50,
        right: 10,
        pieces: [
          { gt: 0, lte: 50, color: '#93CE07' },
          { gt: 50, lte: 100, color: '#FBDB0F' },
          { gt: 100, lte: 150, color: '#FC7D02' },
          { gt: 150, lte: 200, color: '#FD0100' },
          { gt: 200, lte: 300, color: '#AA069F' },
          { gt: 300, color: '#AC3B2A' },
        ],
        outOfRange: {
          color: '#999',
        },
      },
      series: {
        name: 'Mumbai WQI',
        type: 'line',
        data: data.map((item) => item[1]),
        markLine: {
          silent: true,
          lineStyle: {
            color: '#333',
          },
          data: [
            { yAxis: 50 },
            { yAxis: 100 },
            { yAxis: 150 },
            { yAxis: 200 },
            { yAxis: 300 },
          ],
        },
      },
    };
    
    chartInstance.current.setOption(option);


    const handleResize = () => {
      chartInstance.resize();
    };

    window.addEventListener('resize', handleResize);

    
    return () => {
      if (chartInstance.current) {
        window.removeEventListener('resize', handleResize);
        chartInstance.current.dispose();
      }
    };
    
  }, [data]); 
  

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};
