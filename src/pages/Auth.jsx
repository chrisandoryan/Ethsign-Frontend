import { useMetaMask } from "metamask-react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Web3 from "web3";
import ConnectWalletButton from "../components/ConnectWalletButton";
import { getWalletNonce, isWalletRegistered, registerUser, verifySignature } from "../services/auth";

function Registration(props) {
    const handleAccountRegistration = async (e) => {
        e.preventDefault();
        let fullname = e.target.fullname.value;
        let email = e.target.email.value;
        let password = e.target.password.value;

        let regis_status = await registerUser(fullname, email, password, props.wallet_address);
        console.log(regis_status);

        // TODO: display message (success/failed)
    }

    return (
        <div>
            <p>We cannot find an account connected to this wallet: {props.wallet_address}.</p>
            <Form onSubmit={handleAccountRegistration}>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Full Name" name="fullname" />
                </Form.Group>

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
                    <Form.Control type="text" value={props.wallet_address} disabled />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </div>
    );
}

function Login(props) {
    const handleLogin = async (e) => {
        e.preventDefault();

        let email = e.target.email.value;
        let password = e.target.password.value;

        // let login_status = await loginUser(email, password, props.wallet_address);
        // console.log(login_status);

    }

    return (
        <div>
            <p>Wallet {props.wallet_address} is already registered! Please login.</p>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Email" name="email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    )
}

function ConnectMetamask() {
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState("");
    const [address, setAddress] = useState("");

    const handleSignMessage = (web3, wallet_address, nonce) => {
        // Define instance of web3
        return new Promise((resolve, reject) =>
            web3.eth.personal.sign(
                web3.utils.fromUtf8(`Nonce: ${nonce}`),
                wallet_address,
                (err, signature) => {
                    if (err) return reject(err);
                    return resolve({ wallet_address, signature });
                }
            )
        );
    }

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
                    setShowForm("registration");
                }
                else {
                    let getNonceResp = await getWalletNonce(account);
                    let nonce = getNonceResp.nonce;

                    var web3 = new Web3(window.ethereum)
                    const signedMessage = await handleSignMessage(web3, account, nonce)
                    
                    let loginResult = await verifySignature(account, signedMessage.signature);
                    console.log(loginResult);

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
                showForm ? (
                    showForm === "registration" ?
                        <Registration wallet_address={address} /> : <Login wallet_address={address} />
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

export default ConnectMetamask;