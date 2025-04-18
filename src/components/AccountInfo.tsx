import React, { useContext } from 'react';
import { Card, Descriptions, Row, Col } from 'antd';
import { AccountContext } from './AccountContext.tsx';
import styles from '../styles/Components.module.css';
import { BankOutlined, GoldOutlined } from '@ant-design/icons';

const AccountInfo: React.FC = () => {
  const { account } = useContext(AccountContext);

  return (
    <Card
      title="اطلاعات حساب کاربری"
      className={`${styles.card} ${styles.accountInfo}`}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Descriptions column={1} className={styles.description}>
            <Descriptions.Item
              label={
                <>
                  <BankOutlined style={{ marginLeft: 8 }} /> موجودی ریالی
                </>
              }
            >
              <span className={styles.price}>
                {account.cash.toLocaleString('fa-IR')} ریال
              </span>
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <GoldOutlined style={{ marginLeft: 8 }} /> موجودی طلا
                </>
              }
            >
              <span className={styles.price}>
                {account.gold.toLocaleString('fa-IR')} گرم
              </span>
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
};

export default AccountInfo;
