import axios from 'axios';


const request = axios.create({
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${sessionStorage.getItem('JwtToken')}`
    }
});


export function getRequest({ url, data, params }) {
            
    return request.get(url, data, { params: params });
}

export function postRequest({ url, data, params }) {
    return request.post(url, data, { params: params });
}

