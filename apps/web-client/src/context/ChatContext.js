import { createContext } from 'react'

export const ChatContext = createContext({
    isChatHidden: false,
    isMobile: false,
    toggleChatHidden: () => {},
    conversation: {},
})
