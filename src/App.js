import './styles/App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Login from './pages/Login';
import { useMetaMask } from 'metamask-react';
import MetaMaskMissing from './components/MetaMaskMissing';

function Routing() {
  const { status } = useMetaMask();
  if (status === "unavailable") return <MetaMaskMissing />

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Login />}></Route>
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
