


export const getBearerToken = () => {
    let storage = JSON.parse(localStorage.getItem("token"));
    return storage.token;
}