import axios from 'axios'

export class Fetch{
    static get(url){
        return axios.get(`http://localhost:3000/${url}`)
    }

    static post(url,body){
        return axios.post(`http://localhost:3000/${url}`, body)
    }

    static put(url,body){
        return axios.put(`http://localhost:3000/${url}`, body)
    }

    static delete(url){
        return axios.delete(`http://localhost:3000/${url}`)
    }
}