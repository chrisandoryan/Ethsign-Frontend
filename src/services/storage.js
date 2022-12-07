


export const getBearerTokenFromStorage = () => {
    let storage = JSON.parse(localStorage.getItem("token"));
    return storage.token;
}

export const getWalletAddressFromStorage = () => {
    let storage = JSON.parse(localStorage.getItem("token"));
    return storage.user.wallet_address;
}