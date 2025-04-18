import { useEffect, useState, useContext } from 'react';
import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AccountContext } from './AccountContext';
import { JalaliDateTime } from '@webilix/jalali-date-time';
import { TransactionAccount } from '../utils/storage';
import styles from '../styles/Components.module.css';

const jalali = JalaliDateTime({
  timezone: 'Asia/Tehran',
  locale: 'fa',
});

interface PurchaseRecord {
  id: string;
  purchaseDate: Date;
  amount: number;
  goldPrice: number;
  goldWeight: number;
}

const PurchaseHistoryTable = () => {
  const { transactions } = useContext(AccountContext);

  const columns: ColumnsType<PurchaseRecord> = [
    {
      title: 'تاریخ و زمان خرید',
      dataIndex: 'purchaseDate',
      key: 'purchaseDate',
      render: (date: Date) => {
        return jalali.toDate(date);
      },
    },
    {
      title: 'مبلغ خرید (ریال)',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => amount.toLocaleString('fa-IR'),
    },
    {
      title: 'قیمت طلا (ریال)',
      dataIndex: 'goldPrice',
      key: 'goldPrice',
      render: (price: number) => price.toLocaleString('fa-IR'),
    },
    {
      title: 'وزن طلا (گرم)',
      dataIndex: 'goldWeight',
      key: 'goldWeight',
      render: (weight: number) => weight.toLocaleString('fa-IR'),
    },
  ];

  const [purchases, setPurchases] = useState<PurchaseRecord[]>([]);

  useEffect(() => {
    const formattedTransactions = transactions.map(
      (tx: TransactionAccount, index: number) => ({
        id: index.toString(),
        purchaseDate: new Date(tx.date),
        amount: tx.amount,
        goldPrice: tx.price,
        goldWeight: tx.gold,
      })
    );
    setPurchases(formattedTransactions);
  }, [transactions]);

  return (
    <Card
      title="تاریخچه خرید"
      className={`${styles.card} ${styles.purchaseHistory}`}
    >
      <Table
        columns={columns}
        dataSource={purchases}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        className={styles.table}
        locale={{
          emptyText: 'هیچ رکوردی یافت نشد',
        }}
      />
    </Card>
  );
};

export default PurchaseHistoryTable;
