import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Signs from './pages/Signs';
import Planets from './pages/Planets';
import Houses from './pages/Houses';
import ChartCalculator from './pages/ChartCalculator';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signs" element={<Signs />} />
          <Route path="/planets" element={<Planets />} />
          <Route path="/houses" element={<Houses />} />
          <Route path="/chart" element={<ChartCalculator />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App