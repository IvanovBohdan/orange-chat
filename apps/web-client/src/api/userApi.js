import { http } from './index'

export async function register(data) {
    const response = await http.post('/api/auth/register', data)
    return response.data
}

export async function login(email, password) {
    const response = await http.post('/api/auth/login', { email, password })
    return response.data
}

export async function getUser(id) {
    const response = await http.get(`/api/users/${id}`)
    return response.data
}
