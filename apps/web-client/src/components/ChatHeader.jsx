import React, { useContext } from 'react'
import { Flex, Heading, Icon } from '@chakra-ui/react'
import { IoIosArrowBack } from 'react-icons/io'
import { ColorModeSwitcher } from '../ColorModeSwitcher'
import { ChatContext } from '../context/ChatContext'
import { useDialogName } from '../hooks/useDialogName'

export default function ChatHeader() {
    const { isMobile, toggleChat, conversation } = useContext(ChatContext)
    const name = useDialogName(conversation)
    return (
        <Flex
            as="header"
            flexDirection="row"
            alignItems="center"
            backgroundColor="orange.300"
            height={14}
            px={4}
            flexShrink={0}
        >
            {isMobile ? (
                <Icon
                    onClick={toggleChat}
                    color="white"
                    fontSize="2xl"
                    fontWeight={700}
                    as={IoIosArrowBack}
                />
            ) : null}
            <Heading fontSize="2xl" color="white">
                {name}
            </Heading>
            {/* <ColorModeSwitcher /> */}
        </Flex>
    )
}
