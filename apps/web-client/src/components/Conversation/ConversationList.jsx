import React, { useContext } from 'react'
import { Flex, Input, IconButton } from '@chakra-ui/react'
import ConversationItem from './ConversationItem'
import { Link } from 'react-router-dom'
import { ChatContext } from '../../context/ChatContext'

export default function ConversationList({ conversations = [] }) {
    const { toggleChat } = useContext(ChatContext)
    return (
        <Flex
            flexDirection="column"
        >
            {conversations.map(conversation => (
                <Link
                    to={`/chat/${conversation._id}`}
                    key={conversation._id}
                    onClick={toggleChat}
                >
                    <ConversationItem
                        conversation={conversation}
                        avatar={conversation.avatar}
                    />
                </Link>
            ))}
        </Flex>
    )
}
