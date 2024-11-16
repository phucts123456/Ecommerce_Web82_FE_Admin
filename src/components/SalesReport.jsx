import React from "react";
import { Card, Col, Row, Statistic, DatePicker } from "antd";
import { Line } from "@ant-design/charts";

const SalesReport = () => {
  // Sample data for sales report
  const data = [
    { month: "January", revenue: 1000000 },
    { month: "February", revenue: 1500000 },
    { month: "March", revenue: 2000000 },
    // Add more revenue data here
  ];

  // Configuration for the Line chart
  const config = {
    data,
    xField: "month",
    yField: "revenue",
    smooth: true,
    lineStyle: {
      stroke: "#5B8FF9",
    },
    point: {
      size: 5,
      shape: "circle",
    },
    tooltip: {
      formatter: (datum) => ({
        name: "Revenue",
        value: `${datum.revenue.toLocaleString()} VND`,
      }),
    },
    label: {
      style: {
        fill: "#aaa",
      },
    },
  };

  return (
    <div>
      <h2>Sales Report</h2>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Monthly Revenue" value={2000000} suffix="VND" />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Products Sold" value={120} />
          </Card>
        </Col>
      </Row>
      <DatePicker.RangePicker style={{ margin: "20px 0" }} />
      <Line {...config} />
    </div>
  );
};

export default SalesReport;
