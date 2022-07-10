import { AxiosRequestHeaders } from "axios"

export const authenticationHeader = (token) => { 
    return { "Authorization": `Bearer ${token}` }
}