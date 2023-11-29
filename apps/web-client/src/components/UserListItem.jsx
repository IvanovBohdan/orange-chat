import React from 'react'
import { Box, Flex, Avatar, Text, Divider, IconButton } from '@chakra-ui/react'
import { FaPaperPlane } from 'react-icons/fa'
import { startDialog } from './../api/conversationApi'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

export default function UserListItem({ user }) {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const handleStartConversation = async () => {
        const conversation = await startDialog(user._id)
        queryClient.refetchQueries(['conversations'])
        navigate(`/chat/${conversation._id}`)
    }

    return (
        <Box as={Link} to={`/user/${user._id}`}>
            <Flex
                alignItems="center"
                justifyContent={'space-between'}
                p={2}
                _hover={{
                    background: 'gray.50',
                    cursor: 'pointer',
                }}
            >
                <Flex>
                    <Avatar
                        alt="avatar"
                        name={user.name}
                        size="sm"
                        src={user.avatar}
                    />
                    <Box mx={5}>
                        <Text fontSize="lg">{user.name}</Text>
                    </Box>
                </Flex>
                <IconButton
                    colorScheme="orange"
                    aria-label="Start conversation"
                    icon={<FaPaperPlane />}
                    size={'xs'}
                    onClick={handleStartConversation}
                />
            </Flex>
            <Divider />
        </Box>
    )
}
