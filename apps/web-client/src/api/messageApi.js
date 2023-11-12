import { authHttp } from '.'
import { socket } from '.'

export const getMessages = async (conversation, lastId, limit = 20) => {
    let url = `/api/messages/${conversation}?limit=${limit}`
    if (lastId) {
        url += `&lastId=${lastId}`
    }
    const { data } = await authHttp.get(url)
    return data
}

export const sendMessage = async payload => {
    const { data } = await authHttp.post(`/api/messages/`, payload)
    return data
}
