import axios from 'axios';
import { getBearerTokenFromStorage } from './storage';

export const getAllUsers = async () => {
    let token = getBearerTokenFromStorage();
    let response = await axios.get('/users', { 
        headers: { 
            "Authorization": token 
        }
    });
    return response.data;
}
