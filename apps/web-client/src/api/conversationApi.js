import { authHttp } from './index'

export const startDialog = async userId => {
    const { data } = await authHttp.post(
        `/api/conversation/start-dialog/${userId}`
    )
    return data
}

export const getMyConversations = async () => {
    const { data } = await authHttp.get(`/api/conversation/my/`)
    return data
}
