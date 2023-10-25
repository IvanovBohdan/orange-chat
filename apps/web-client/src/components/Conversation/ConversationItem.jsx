import React from 'react'
import { Box, Flex, Avatar, Text, Divider } from '@chakra-ui/react'
import { useDialogName } from '../../hooks/useDialogName'

export default function ConversationItem({ avatar, conversation }) {
    const name = useDialogName(conversation)
    return (
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
                    src={avatar || '/default_avatars/male.jpg'}
                    alt="avatar"
                    name={name}
                    size="md"
                />
                <Box mx={5}>
                    <Text fontSize="xl">{name}</Text>
                </Box>
            </Flex>
            <Divider />
        </Box>
    )
}
