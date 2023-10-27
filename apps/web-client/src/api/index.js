import axios from 'axios'
import { io } from 'socket.io-client'
import { getToken, setToken } from '../utils/token'
import { get } from 'react-hook-form'

const baseURL = window.location.origin

export const socket = io({
    extraHeaders: {
        Authorization: `Bearer ${getToken()}`,
    },
})

const http = axios.create({
    baseURL: baseURL,
})

const authHttp = axios.create({
    baseURL: baseURL,
})

function authInterceptor(config) {
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}

authHttp.interceptors.request.use(authInterceptor)

export { http, authHttp }
