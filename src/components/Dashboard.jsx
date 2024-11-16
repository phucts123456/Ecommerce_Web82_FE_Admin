import React, { useState, useEffect } from "react";
import { Row, Col, Card, Statistic, Spin } from "antd";
import {
  DollarOutlined,
  ShoppingOutlined,
  StockOutlined,
} from "@ant-design/icons";

const Dashboard = () => {
  const [statistics, setStatistics] = useState({
    revenue: 0,
    newOrders: 0,
    inventory: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data fetch simulation
    setTimeout(() => {
      setStatistics({
        revenue: 112893,
        newOrders: 93,
        inventory: 30,
      });
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      <Spin spinning={loading}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Statistic
                title="Total Revenue"
                value={statistics.revenue}
                prefix={<DollarOutlined />}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Statistic
                title="New Orders"
                value={statistics.newOrders}
                prefix={<ShoppingOutlined />}
                valueStyle={{ color: "#1890ff" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Statistic
                title="Products in Stock"
                value={statistics.inventory}
                prefix={<StockOutlined />}
                valueStyle={{ color: "#cf1322" }}
              />
            </Card>
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default Dashboard;
