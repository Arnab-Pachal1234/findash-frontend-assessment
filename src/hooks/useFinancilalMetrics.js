import { useMemo} from 'react';


export function useFinancialMetrics(transactions) {
  return useMemo(() => {
    let income = 0;
    let expenses = 0;
    const categoryData = {};
    const trendData = [];
    let runningBalance = 0;

    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

    sorted.forEach((t) => {
      if (t.type === 'Income') {
        income += t.amount;
        runningBalance += t.amount;
      } else {
        expenses += t.amount;
        runningBalance -= t.amount;
        
        categoryData[t.category] = (categoryData[t.category] || 0) + t.amount;
      }

    
      trendData.push({
        date: t.date.slice(5),
        balance: runningBalance,
      });
    });

    const pieData = Object.entries(categoryData).map(([name, value]) => ({ name, value }));
    const topExpense = pieData.sort((a, b) => b.value - a.value)[0] || null;

    return {
      income,
      expenses,
      balance: income - expenses,
      pieData,
      trendData,
      topExpense
    };
  }, [transactions]); 
}