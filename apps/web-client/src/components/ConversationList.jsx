import React, { useContext } from 'react'
import { Flex } from '@chakra-ui/react'
import ConversationItem from './ConversationItem'
import { ChatContext } from '../context/ChatContext'
import UserListItem from './UserListItem'

export default function ConversationList({ conversations = [], users = [] }) {
    const { toggleChat } = useContext(ChatContext)
    return (
        <Flex flexDirection="column" overflow="auto" flexGrow={1} h="0px">
            {users?.length > 0
                ? users.map(user => <UserListItem key={user._id} user={user} />)
                : conversations.map(conversation => (
                      <ConversationItem
                          key={conversation._id}
                          onClick={toggleChat}
                          conversation={conversation}
                      />
                  ))}
        </Flex>
    )
}
