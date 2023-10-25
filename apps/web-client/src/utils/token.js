export function getToken() {
    return JSON.parse(localStorage.getItem('token')) ?? null
}

export function setToken(token) {
    localStorage.setItem('token', JSON.stringify(token))
}
