import React, { useState, useEffect, useRef, useContext } from 'react';
import { Card, Form, InputNumber, Typography, Button, message } from 'antd';
import { rialToToman } from '../utils/rialToToman.ts';
import { setUserAccount, saveTransaction } from '../utils/storage';
import { AccountContext } from './AccountContext.tsx';
import styles from '../styles/Components.module.css';

const { Title } = Typography;

interface BuyFormValues {
  cash?: number;
  gold?: number;
}

const randomPrice = () =>
  Math.floor(Math.random() * (3600000 - 3300000 + 1)) + 3300000;

const BuyGoldForm: React.FC = () => {
  const [form] = Form.useForm();
  const [price, setPrice] = useState<number>(randomPrice());
  const [cashInWords, setCashInWords] = useState<string>('');
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState<boolean>(false);
  const { account, setAccount, setTransactions, transactions } =
    useContext(AccountContext);

  useEffect(() => {
    setPrice(randomPrice());
  }, []);

  const lastChanged = useRef<'cash' | 'gold' | null>(null);

  const handleValuesChange = (changed: Record<string, any>) => {
    const cash = form.getFieldValue('cash');
    const gold = form.getFieldValue('gold');

    if ('cash' in changed) {
      lastChanged.current = 'cash';

      if (cash === undefined || cash === null || cash === '') {
        form.setFieldsValue({ gold: undefined });
        setCashInWords('');
        return;
      }

      const calcGold = parseFloat((cash / price).toFixed(3));
      form.setFieldsValue({ gold: calcGold });
      setCashInWords(rialToToman(cash));
    }

    if ('gold' in changed) {
      lastChanged.current = 'gold';

      if (gold === undefined || gold === null || gold === '') {
        form.setFieldsValue({ cash: undefined });
        setCashInWords('');
        return;
      }

      const calcCash = Math.floor(gold * price);
      form.setFieldsValue({ cash: calcCash });
      setCashInWords(rialToToman(calcCash));
    }
  };

  const handleFinish = async (values: BuyFormValues) => {
    setLoading(true);
    setTimeout(() => {
      const cash = values.cash || 0;
      const gold = values.gold || 0;

      if (cash > account.cash) {
        messageApi.error('موجودی ریالی کافی نیست!');
        setLoading(false);
        return;
      }

      const updatedAccount = {
        cash: account.cash - cash,
        gold: parseFloat((account.gold + gold).toFixed(3)),
      };
      setUserAccount(updatedAccount);

      const updatedTransaction = {
        amount: cash,
        gold,
        date: new Date().toISOString(),
        price,
      };
      saveTransaction(updatedTransaction);
      setTransactions([...transactions, updatedTransaction]);

      setAccount(updatedAccount);
      messageApi.success('خرید با موفقیت انجام شد.');
      form.resetFields();
      setCashInWords('');
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      {contextHolder}
      <Card
        title="فرم خرید طلا"
        className={`${styles.card} ${styles.buyGoldForm}`}
      >
        <Title level={5} className={styles.price}>
          قیمت فعلی طلا: {price.toLocaleString('fa-IR')} ریال / گرم
        </Title>

        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          onValuesChange={handleValuesChange}
          className={styles.form}
        >
          <Form.Item
            name="cash"
            label="مبلغ ریالی (تا ۱ میلیارد)"
            validateTrigger="onChange"
            rules={[
              {
                required: true,
                message: 'این فیلد نمی‌تواند خالی باشد.',
              },
              {
                validator: (_, value) => {
                  if (value === undefined || value === null || value === '') {
                    return Promise.resolve();
                  }

                  const numericValue = Number(value);

                  if (isNaN(numericValue)) {
                    return Promise.reject('عدد نامعتبر است.');
                  }

                  if (numericValue > 1_000_000_000) {
                    return Promise.reject(
                      'مبلغ نباید بیشتر از ۱ میلیارد ریال باشد.'
                    );
                  }

                  return Promise.resolve();
                },
              },
            ]}
            extra={
              !form.getFieldError('cash').length && cashInWords
                ? `معادل: ${cashInWords}`
                : undefined
            }
          >
            <InputNumber
              min={0}
              style={{ width: '100%' }}
              placeholder="مثلاً: 5000000"
              size="middle"
            />
          </Form.Item>

          <Form.Item
            name="gold"
            label="وزن طلا (گرم)"
            rules={[
              { required: true, message: 'این فیلد نمی‌تواند خالی باشد.' },
            ]}
          >
            <InputNumber
              min={0}
              max={1000}
              precision={3}
              style={{ width: '100%' }}
              placeholder="مثلاً: 1.25"
              size="middle"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              خرید طلا
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default BuyGoldForm;
