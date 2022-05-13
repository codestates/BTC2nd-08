import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Blocks from './pages/blocks';
import Transactions from './pages/transactions';
import Navbar from './components/navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="blocks" element={<Blocks />} />
        <Route path="transactions" element={<Transactions />} />
      </Routes>
    </>
  );
}

export default App;
