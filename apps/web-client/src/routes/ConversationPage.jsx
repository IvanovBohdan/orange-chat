import React, { useEffect, useState } from 'react'
import { Box, Flex, Heading, Container, useMediaQuery } from '@chakra-ui/react'
import ConversationList from '../components/Conversation/ConversationList'
import Search from './../components/Search'
import ChatSection from './../components/Chat/ChatSection'
import { useParams } from 'react-router-dom'
import { ChatContext } from '../context/ChatContext'
import { useCurrentUser, useMobileChat } from '../hooks'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getMyConversations } from '../api/conversationApi'
import { socket } from '../api'

export default function ConversationPage() {
    const { conversationId } = useParams()
    const [conversation, setConversation] = useState(null)
    const { isMobile, isChatHidden, toggleChat } = useMobileChat(conversationId)
    const { _id } = useCurrentUser()
    const client = useQueryClient()
    const { data } = useQuery({
        queryFn: getMyConversations,
        queryKey: ['conversations'],
    })

    useEffect(() => {
        socket.on('message', message => {
            console.log('message', message)
            client.setQueriesData(['messages', message.conversation], old => [
                ...old,
                message,
            ])
        })
        return () => {
            socket.off('message')
        }
    }, [conversationId])

    const conversations = data || []

    useEffect(() => {
        setConversation(
            conversations.find(
                conversation => conversation._id === conversationId
            )
        )
    }, [conversationId, conversations])

    return (
        <ChatContext.Provider
            value={{
                isMobile,
                isChatHidden,
                toggleChat,
                conversation,
            }}
        >
            <Flex height="100%">
                <Box
                    flexGrow={2}
                    flexBasis="25%"
                    p={2}
                    display={!isChatHidden && isMobile ? 'none' : 'block'}
                >
                    <Search />
                    <ConversationList conversations={conversations} />
                </Box>
                <ChatSection conversation={conversation} />
            </Flex>
        </ChatContext.Provider>
    )
}
