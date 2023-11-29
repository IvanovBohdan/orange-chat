import React from 'react'
import { Box, Flex, Avatar, Text, Divider } from '@chakra-ui/react'
import { useDialogName } from '../hooks/useDialogName'
import { Link } from 'react-router-dom'

export default function ConversationItem({ conversation }) {
    const name = conversation.name ?? useDialogName(conversation)
    return (
        <Link to={`/chat/${conversation._id}`}>
            <Box>
                <Flex
                    alignItems="center"
                    p={2}
                    _hover={{
                        background: 'gray.50',
                        cursor: 'pointer',
                    }}
                >
                    <Avatar
                        alt="avatar"
                        name={name}
                        size="sm"
                        src={conversation.avatar}
                    />
                    <Box mx={5}>
                        <Text fontSize="lg">{name}</Text>
                    </Box>
                </Flex>
                <Divider />
            </Box>
        </Link>
    )
}
