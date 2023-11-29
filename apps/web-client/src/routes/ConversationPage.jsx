import React, { useEffect, useState } from 'react'
import { Box, Flex, Grid } from '@chakra-ui/react'
import ConversationList from '../components/ConversationList'
import Search from './../components/Search'
import ChatSection from './../components/ChatSection'
import { useParams } from 'react-router-dom'
import { ChatContext } from '../context/ChatContext'
import { useCurrentUser, useMobileChat, useUsersSearch } from '../hooks'
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
    const { users, searchQuery, setSearchQuery } = useUsersSearch()

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
                templateColumns={['1fr', '1fr 3fr', '2fr 5fr', '2fr 8fr']}
            >
                <Flex
                    p={2}
                    flexDirection="column"
                    display={!isChatHidden && isMobile ? 'none' : 'flex'}
                >
                    <Search
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                    <ConversationList
                        conversations={conversations}
                        users={users}
                    />
                </Flex>
                <ChatSection conversation={conversation} />
            </Grid>
        </ChatContext.Provider>
    )
}
