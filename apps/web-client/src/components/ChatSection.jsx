import React, { useContext } from 'react'
import { Flex, Heading, Button, Container, Icon, Box } from '@chakra-ui/react'
import ChatHeader from './ChatHeader'
import MessageBox from './MessageBox'
import MessageTypeControls from './MessageTypeControls'
import { ChatContext } from '../context/ChatContext'

export default function ChatSection({ conversation }) {
    const { isMobile, isChatHidden, toggleChat } = useContext(ChatContext)
    return (
        <Flex
            // background="orange.100"
            flexDirection="column"
            display={isChatHidden ? 'none' : 'flex'}
            height="100vh"
            maxHeight="100vh"
        >
            <ChatHeader />
            <MessageBox />
            <Container maxW="3xl" p={0} flexGrow={0}>
                <MessageTypeControls />
            </Container>
        </Flex>
    )
}
