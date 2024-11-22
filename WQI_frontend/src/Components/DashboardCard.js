import React, { useState, useEffect } from 'react';
import { TableSimple, Card, Avatar, List, Select, Icon, Header } from '@assenti/rui-components';
import '@assenti/rui-components/css/index.css';

const { Head, Body, Row, Cell } = TableSimple;


export const DashboardCard = (title, value, icon, color) => {
    return <Card className="text-center mr-20"
    style={{ width: 300, height: 240 }}
    header={title}
    hover={true}
    footer={value}>
      <Avatar className="mb-4"
          iconSize="75%"
          iconColor={color}
          icon={icon}/>
    </Card>;
}
