import { ConfigProvider } from 'antd';
import faIR from 'antd/locale/fa_IR';
import AccountInfo from './components/AccountInfo';
import BuyGoldForm from './components/BuyGoldForm';
import AccountProvider from './components/AccountContext';
import PurchaseHistoryTable from './components/PurchaseHistoryTable';
import styles from './styles/App.module.css';
import './styles/global.css';

const App = () => {
  return (
    <ConfigProvider direction="rtl" locale={faIR}>
      <AccountProvider>
        <div className={styles.card}>
          <div className={styles.accountInfoContainer}>
            <AccountInfo />
          </div>
          <div className={styles.buyGoldFormContainer}>
            <BuyGoldForm />
          </div>
          <div className={styles.purchaseHistoryContainer}>
            <PurchaseHistoryTable />
          </div>
        </div>
      </AccountProvider>
    </ConfigProvider>
  );
};

export default App;
