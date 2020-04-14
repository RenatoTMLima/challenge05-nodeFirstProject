import Transaction from '../models/Transaction';

interface TransactionsRepositoryDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((incomeTotal, transaction) => incomeTotal + transaction.value, 0);

    const outcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce(
        (outcomeTotal, transaction) => outcomeTotal + transaction.value,
        0,
      );

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({
    title,
    type,
    value,
  }: TransactionsRepositoryDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
