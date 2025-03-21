import axios from "axios";
import { BASE_URL } from "../../utils/url";

//LOGIN
export const loginAPI = async({email, password}) => {
    const response = await axios.post(`${BASE_URL}/users/login`, {
        email,
        password,
    });
    
    //return a promise
    return response.data;
};

//REGISTER
export const registerAPI = async({username, email, password, confirmPassword}) => {
    const response = await axios.post(`${BASE_URL}/users/register`, {
        name: username,
        email,
        password,
        confirmPassword
    });
    
    //return a promise
    return response.data;
};