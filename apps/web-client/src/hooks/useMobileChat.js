import { useEffect, useState } from 'react'
import { useBreakpointValue, useMediaQuery } from '@chakra-ui/react'

export function useMobileChat(conversationId) {
    const isMobile = useBreakpointValue({ base: true, sm: false })
    // const [isMobile] = useMediaQuery('(max-width: 678px)')
    const [isChatHidden, setIsChatHidden] = useState(
        !!conversationId || isMobile
    )

    const toggleChat = () => {
        setIsChatHidden(isChatHidden => !isChatHidden && isMobile)
    }

    useEffect(() => {
        setIsChatHidden(
            isChatHidden => isMobile && !isChatHidden && !conversationId
        )
    }, [isMobile, conversationId])
    return {
        isMobile,
        isChatHidden,
        toggleChat,
    }
}
