import { useMutation, useQueryClient } from '@tanstack/react-query'
import { sendMessage } from '../api/messageApi'

export function useMessageSend(conversationId) {
    const client = useQueryClient()
    
    const mutation = useMutation({
        mutationFn: message =>
            sendMessage({ conversation: conversationId, content: message }),
        mutationKey: ['messages', conversationId],
        onSuccess: newMessage => {
            client.setQueriesData(['messages', conversationId], old => [
                ...old,
                newMessage,
            ])
        },
    })

    return mutation
}
