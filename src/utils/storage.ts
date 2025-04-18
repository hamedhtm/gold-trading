export interface UserAccount {
  cash: number;
  gold: number;
}

export interface TransactionAccount {
  amount: number;
  gold: number;
  date: string;
  price: number;
}

export const getUserAccount = (): UserAccount => {
  const raw = localStorage.getItem('userAccount');
  if (!raw) {
    const defaultAccount = { cash: 100_000_000, gold: 10 };
    localStorage.setItem('userAccount', JSON.stringify(defaultAccount));
    return defaultAccount;
  }
  return JSON.parse(raw);
};

export const setUserAccount = (account: UserAccount) => {
  localStorage.setItem('userAccount', JSON.stringify(account));
};

export const saveTransaction = (tx: {
  amount: number;
  gold: number;
  date: string;
  price: number;
}) => {
  const prev = JSON.parse(localStorage.getItem('transactions') || '[]');
  localStorage.setItem('transactions', JSON.stringify([...prev, tx]));
};

export const getTransactions = () => {
  const raw = localStorage.getItem('transactions');
  if (!raw) {
    return [];
  }
  return JSON.parse(raw);
};
