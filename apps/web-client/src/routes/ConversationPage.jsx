import React, { useEffect, useState } from 'react'
import {
    Box,
    Flex,
    Heading,
    Container,
    useMediaQuery,
    SimpleGrid,
    Grid,
} from '@chakra-ui/react'
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
            client.setQueriesData(['messages', message.conversation], old => {
                const firstPage = old?.pages?.[0]
                return {
                    pages: [[message, ...firstPage], ...old.pages.slice(1)],
                    pageParams: old.pageParams,
                }
            })
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
            <Grid
                height="100%"
                width="100%"
                maxWidth="100vw"
                templateColumns={['1fr', '1fr 4fr', '2fr 5fr', '2fr 8fr']}
            >
                <Box
                    p={2}
                    display={!isChatHidden && isMobile ? 'none' : 'block'}
                >
                    <Search />
                    <ConversationList conversations={conversations} />
                </Box>
                <ChatSection conversation={conversation} />
            </Grid>
        </ChatContext.Provider>
    )
}
