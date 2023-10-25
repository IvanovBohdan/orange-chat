import { authHttp } from '.'
import { socket } from '.'

export const getMessages = async conversation => {
    const { data } = await authHttp.get(`/api/message/${conversation}`)
    return data
}

export const sendMessage = async payload => {
    console.log(payload)
    const { data } = await authHttp.post(`/api/message/`, payload)
    return data
}
