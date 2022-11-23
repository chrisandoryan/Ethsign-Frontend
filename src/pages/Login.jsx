import { useMetaMask } from "metamask-react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Web3 from "web3";
import ConnectWalletButton from "../components/ConnectWalletButton";
import { isWalletRegistered, registerUserAccount } from "../services/auth";

function Registration(props) {
    const handleAccountRegistration = async (e) => {
        e.preventDefault();
        let email = e.target.email.value;
        let password = e.target.password.value;

        let regis_status = await registerUserAccount(email, password, props.wallet_address);
        console.log(regis_status)
    }

    return (
        <div>
            <p>We cannot find an account connected to this wallet: {props.wallet_address}.</p>
            <Form onSubmit={handleAccountRegistration}>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Email" name="email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Wallet Address</Form.Label>
                    <Form.Control type="text" value={props.wallet_address} disabled/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </div>
    );
}

function Login() {
    const [loading, setLoading] = useState(false);
    const [showRegisForm, setShowRegisForm] = useState(false);
    const [address, setAddress] = useState("");

    const onPressConnect = async () => {
        setLoading(true);

        try {
            if (window?.ethereum?.isMetaMask) {
                // Desktop browser
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });

                const account = Web3.utils.toChecksumAddress(accounts[0]);
                setAddress(account);

                let walletRegistered = await isWalletRegistered(account);
                if (!walletRegistered) {
                    setShowRegisForm(true);
                }
            }
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    };

    const onPressLogout = () => setAddress("");
    return (
        <header className="App-header">
            <h2>
                Welcome to Project Verifieth.
            </h2>
            {
                showRegisForm ? (
                    <Registration wallet_address={address} />
                ) : (
                    <ConnectWalletButton
                        onPressConnect={onPressConnect}
                        onPressLogout={onPressLogout}
                        loading={loading}
                        address={address}
                    />
                )
            }
        </header>
    );
}

export default Login;