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
import { ErrorBoundary } from './components/ui/ErrorBoundary';

function DashboardContent() {
  const { isLoading } = useFinance();

  if (isLoading) {
    return <Loader />;
  }

  const revealUp = {
    hidden: { opacity: 0, y: 22, scale: 0.985 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="space-y-6">
      <motion.section 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.15 }}
        variants={revealUp}
      >
        <SummaryCards />
      </motion.section>

      <motion.section 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.15 }}
        variants={revealUp}
      >
        <BalanceChart />
      </motion.section>

      <motion.section 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.15 }}
        variants={revealUp}
        className="grid grid-cols-1 gap-6 xl:grid-cols-[1.05fr_0.95fr]"
      >
        <CategoryChart />
        <InsightsPanel />
      </motion.section>

      <section id="transactions-section">
        <TransactionTable />
      </section>
    </div>
  );
}

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
