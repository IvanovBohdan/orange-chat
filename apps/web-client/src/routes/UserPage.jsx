import { Box, Avatar, Heading, Text, Center, Button } from '@chakra-ui/react'
import { useParams, useNavigate } from 'react-router-dom'
import { getUser } from '../api/userApi'
import { useQuery } from '@tanstack/react-query'
import { startDialog } from '../api/conversationApi'

function UserPage() {
    const { userId } = useParams()
    const navigate = useNavigate()

    const { data, error, isLoading } = useQuery(['user', userId], () =>
        getUser(userId)
    )

    const handleStartMessaging = async () => {
        const user = await startDialog(userId)
        navigate(`/chat/${user?._id}`)
    }

    const user = data

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <Box
            maxW="md"
            mx="auto"
            mt={8}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
        >
            <Center>
                <Avatar
                    size="xl"
                    name={user.name}
                    src={user.avatar}
                    mx="auto"
                />
            </Center>
            <Heading textAlign="center" mt={4}>
                {user.name}
            </Heading>
            <Text textAlign="center" mt={2} color="gray.500">
                @{user.username}
            </Text>
            <Text textAlign="center" mt={2} color="gray.500">
                {user.email}
            </Text>
            <Text textAlign="center" mt={2} color="gray.500">
                {user.isAdmin ? 'Admin' : 'User'}
            </Text>
            <Center>
                <Button
                    w="100%"
                    variant="solid"
                    mt={2}
                    colorScheme="orange"
                    onClick={handleStartMessaging}
                >
                    Start messaging
                </Button>
            </Center>
        </Box>
    )
}

export default UserPage
