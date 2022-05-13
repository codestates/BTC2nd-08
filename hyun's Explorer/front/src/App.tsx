import { Routes, Route } from 'react-router-dom';

import Blocks from './pages/blocks';
import Account from './pages/account';
import Transactions from './pages/transactions';
import Navbar from './components/navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Blocks />} />
        <Route path="blocks" element={<Blocks />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="account/:accountAddress" element={<Account />} />
      </Routes>
    </>
  );
}

export default App;
