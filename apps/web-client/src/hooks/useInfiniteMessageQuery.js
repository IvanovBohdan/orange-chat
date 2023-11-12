import { useInfiniteQuery } from '@tanstack/react-query'
import { getMessages } from '../api/messageApi'

export function useInfiniteMessageQuery(conversation) {
    return useInfiniteQuery({
        queryFn: ({ pageParam = null }) =>
            getMessages(conversation?._id, pageParam, 50),
        queryKey: ['messages', conversation?._id],
        enabled: !!conversation?._id,
        getNextPageParam: lastPage => {
            if (lastPage.length === 0) return false
            return lastPage[lastPage.length - 1]._id
        },
    })
}
