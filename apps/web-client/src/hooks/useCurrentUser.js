import { useMemo } from 'react'
import { getCurrentUser, setCurrentUser } from '../utils/user'

export function useCurrentUser() {
    const user = useMemo(() => getCurrentUser(), [])
    return user
}
