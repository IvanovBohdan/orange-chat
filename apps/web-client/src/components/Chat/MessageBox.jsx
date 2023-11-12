import React, { useContext, useRef, useEffect } from 'react'
import { Flex, Box, Container, Spinner, Center } from '@chakra-ui/react'
import { ChatContext } from '../../context/ChatContext'
import { useCurrentUser, useInfiniteMessageQuery } from '../../hooks'
import InfiniteScroll from 'react-infinite-scroll-component'
import MessageItem from './MessageItem'

export default function MessageBox() {
    const { conversation } = useContext(ChatContext)
    const currentUser = useCurrentUser()
    const { data, error, fetchNextPage, isFetching, hasNextPage, status } =
        useInfiniteMessageQuery(conversation)

    const items = data?.pages.flat() || []

    if (status === 'loading') {
        return <Box flexGrow={1}></Box>
    }

    if (status === 'error') {
        return <>{error.message}</>
    }

    return (
        <Flex
            flexGrow={1}
            id="scrollableDiv"
            overflow="auto"
            flexDirection="column-reverse"
        >
            <Container maxW="container.md">
                <InfiniteScroll
                    dataLength={items.length}
                    next={() => isFetching || fetchNextPage()}
                    style={{
                        display: 'flex',
                        flexDirection: 'column-reverse',
                        overflow: 'hidden',
                    }}
                    inverse={true}
                    hasMore={hasNextPage}
                    loader={
                        <Center>
                            <Spinner />
                        </Center>
                    }
                    // endMessage={
                    //     <Center>
                    //         <Box color="gray.400">No more messages</Box>
                    //     </Center>
                    // }
                    scrollableTarget="scrollableDiv"
                    scrollThreshold={0.6}
                >
                    {items.map(message => (
                        <MessageItem
                            key={message._id}
                            message={message}
                            isSent={message.sender === currentUser._id}
                        />
                    ))}
                </InfiniteScroll>
            </Container>
        </Flex>
    )
}
