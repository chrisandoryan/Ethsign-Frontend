import axios from 'axios';

export const isWalletRegistered = async (wallet_address) => {
    let response = await axios.post('/users/wallet/check', {
        wallet_address: wallet_address
    });
    return response.data.exists;
}

export const getWalletNonce = async (wallet_address) => {
    let response = await axios.post('/users/wallet/nonce', {
        wallet_address: wallet_address
    });
    return response.data.user;
}

export const registerUser = async (fullname, email, password, wallet_address) => {
    let response = await axios.post('/users/register', {
        fullname,
        email,
        password,
        wallet_address
    });
    return response.data;
}

export const verifySignature = async (wallet_address, signature) => {
    let response = await axios.post(`/users/${wallet_address}/signature`, {
        signature
    });
    return response.data;
}