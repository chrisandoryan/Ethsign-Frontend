import axios from 'axios';
import { getBearerToken } from './token';

export const getAllDocuments = async () => {
    let token = getBearerToken();
    let response = await axios.get('/documents', { 
        headers: { 
            "Authorization": token 
        }
    });
    return response.data;
}
