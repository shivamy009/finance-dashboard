import React from 'react';
import { useFinance, FinanceProvider } from './context/FinanceContext';
import { MainLayout } from './components/layout/MainLayout';
import { SummaryCards } from './components/dashboard/SummaryCards';
import { BalanceChart } from './components/dashboard/BalanceChart';
import { CategoryChart } from './components/dashboard/CategoryChart';
import { TransactionTable } from './components/transactions/TransactionTable';
import { InsightsPanel } from './components/insights/InsightsPanel';
import { Loader } from './components/ui/Loader';
import { motion } from 'framer-motion';

function DashboardContent() {
  const { isLoading } = useFinance();

  if (isLoading) {
    return <Loader />;
  }

  const blurIn = {
    hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div>
      {/* Top Summary Section */}
      <motion.section 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: false, amount: 0.1 }}
        variants={blurIn}
      >
        <SummaryCards />
      </motion.section>

      {/* Balance Chart Section - Full Width */}
      <motion.section 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: false, amount: 0.1 }}
        variants={blurIn} 
        className="mt-6"
      >
        <BalanceChart />
      </motion.section>

      {/* Category & Insights Section - 2 Columns */}
      <motion.section 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: false, amount: 0.1 }}
        variants={blurIn} 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"
      >
        <CategoryChart />
        <InsightsPanel />
      </motion.section>

      {/* Transactions Table Section */}
      <motion.section 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: false, amount: 0.1 }}
        variants={blurIn} 
        id="transactions-section" 
        className="mt-6"
      >
        <TransactionTable />
      </motion.section>
    </div>
  );
}

import { ErrorBoundary } from './components/ui/ErrorBoundary';

function App() {
  return (
    <FinanceProvider>
      <MainLayout>
        <ErrorBoundary>
          <DashboardContent />
        </ErrorBoundary>
      </MainLayout>
    </FinanceProvider>
  );
}

export default App;
