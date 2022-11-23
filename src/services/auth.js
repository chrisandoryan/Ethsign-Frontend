import axios from 'axios';

export const isWalletRegistered = async (wallet_address) => {
    let response = await axios.post('/users/wallet/check', {
        wallet_address: wallet_address
    });
    return response.data.data;
}

export const registerUserAccount = async (email, password, wallet_address) => {
    let response = await axios.post('/users/register', {
        email,
        password,
        wallet_address
    });
    return response.data;
}