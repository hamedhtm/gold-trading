import React, { createContext, useState } from 'react';
import { getTransactions, getUserAccount, TransactionAccount, UserAccount } from '../utils/storage.ts';

export const AccountContext = createContext({
  account: { cash: 0, gold: 0 },
  setAccount: (account: { cash: number; gold: number }) => {},
  transactions: [{
    amount: 0,
    gold: 0,
    date: "",
    price: 0,
  }],
  setTransactions: (transactions: TransactionAccount[]) => {},
});

const AccountProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [account, setAccount] = useState<UserAccount>(getUserAccount());
  const [transactions, setTransactions] = useState<TransactionAccount[]>(getTransactions());

  return (
    <AccountContext.Provider
      value={{ account, setAccount, transactions, setTransactions }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
