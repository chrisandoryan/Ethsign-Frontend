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
import { ToastContainer } from 'react-toastify';

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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routing />
    </div>
  );
}

export default App;
