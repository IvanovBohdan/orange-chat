import { useState } from 'react'
import { searchUsers } from '../api/userApi'
import { useQuery } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'

export function useUsersSearch() {
    const [searchQuery, setSearchQuery] = useState('')
    const debouncedSearchQuery = useDebounce(searchQuery, 500)
    const { data, ...rest } = useQuery({
        queryFn: () => searchUsers(debouncedSearchQuery),
        queryKey: ['users', debouncedSearchQuery],
        enabled: !!debouncedSearchQuery,
    })
    return {
        debouncedSearchQuery,
        setSearchQuery,
        users: data || [],
        ...rest,
    }
}
