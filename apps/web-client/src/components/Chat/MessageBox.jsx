import React, { useContext, useRef, useEffect } from 'react'
import { Flex, Box, Container } from '@chakra-ui/react'
import MessageItem from './MessageItem'
import { useQuery } from '@tanstack/react-query'
import { ChatContext } from '../../context/ChatContext'
import { getMessages } from '../../api/messageApi'
import { useCurrentUser } from '../../hooks'

export default function MessageBox() {
    const bottomRef = useRef(null)
    const { conversation } = useContext(ChatContext)
    const currentUser = useCurrentUser()
    const { data } = useQuery({
        queryFn: () => getMessages(conversation?._id),
        queryKey: ['messages', conversation?._id],
        enabled: !!conversation?._id,
    })
    console.log(currentUser._id)
    const messages = data ?? []

    useEffect(() => {
        bottomRef?.current.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <Box flexGrow={1} overflowX="auto">
            <Container maxW="3xl" p={0}>
                <Flex flexDirection="column" p={2} flexGrow={1}>
                    {messages.map(message => (
                        <MessageItem
                            key={message._id}
                            message={message}
                            isSent={message.sender === currentUser._id}
                        />
                    ))}
                </Flex>
                <div ref={bottomRef} />
            </Container>
        </Box>
    )
}
