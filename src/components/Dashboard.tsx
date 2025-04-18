import React, { useState, useEffect } from "react";
import { Card, Statistic, Row, Col } from "antd";
import { getUserAccount, UserAccount } from "../utils/storage";
import BuyGoldForm from './BuyGoldForm.tsx';

const Dashboard: React.FC = () => {
  const [account, setAccount] = useState<UserAccount>({ cash: 0, gold: 0 });

  useEffect(() => {
    const user = getUserAccount();
    setAccount(user);
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Card>
            <Statistic
              title="موجودی حساب (ریال)"
              value={account.cash}
              valueStyle={{ color: "#3f8600" }}
              suffix="ریال"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card>
            <Statistic
              title="مقدار طلا (گرم)"
              value={account.gold}
              precision={3}
              valueStyle={{ color: "#cf1322" }}
              suffix="گرم"
            />
          </Card>
        </Col>
      </Row>

      <div style={{ marginTop: "24px" }}>
        <BuyGoldForm />
      </div>
    </div>
  );
};

export default Dashboard;
