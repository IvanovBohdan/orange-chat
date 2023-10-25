import { useCurrentUser } from './'
import { useMemo } from 'react'

export function getDialogNameByUser(conversation, username) {
    if (!conversation) return ''
    if (!username) return conversation?.name ?? conversation._id
    if (conversation.isGroup) return conversation?.name ?? conversation._id
    return conversation.participants?.filter(p => p.username !== username)[0]
        .name
}

export function useDialogName(conversation) {
    const user = useCurrentUser()
    const dialogName = useMemo(
        () => getDialogNameByUser(conversation, user.username),
        [conversation]
    )
    return dialogName
}
