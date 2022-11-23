import './styles/App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { useMetaMask } from 'metamask-react';
import MetaMaskMissing from './components/MetaMaskMissing';
import ConnectMetamask from './pages/Auth';
import RouteGuard from './components/RouteGuard';
import Home from './pages/Home';

function Routing() {
  const { status } = useMetaMask();
  if (status === "unavailable") return <MetaMaskMissing />

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<ConnectMetamask />}></Route>
        <Route path="/" element={
          <RouteGuard>
            <Home />
          </RouteGuard>
        }></Route>
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <div className="App">
      <Routing />
    </div>
  );
}

export default App;
