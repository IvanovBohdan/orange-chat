export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user')) ?? null
}

export function setCurrentUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
}
