import React from 'react'
import { Box, Text, useColorMode } from '@chakra-ui/react'

export default function MessageItem({ message, isSent = false }) {
    const { colorMode } = useColorMode()

    const messageColor = (colorMode, isSent) => {
        if (colorMode === 'light') {
            return isSent ? 'orange.200' : 'gray.100'
        } else {
            return isSent ? 'orange.400' : 'gray.700'
        }
    }

    return (
        <Box
            wordBreak="break-all"
            my={1}
            p={2}
            fontSize="md"
            borderRadius="lg"
            maxWidth="60%"
            alignSelf={isSent ? 'flex-end' : 'flex-start'}
            backgroundColor={messageColor(colorMode, isSent)}
        >
            <Box>{message.content}</Box>
            <Text
                float={isSent ? 'left' : 'right'}
                color="gray.700"
                fontSize="xs"
            >
                {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                })}
            </Text>
        </Box>
    )
}
