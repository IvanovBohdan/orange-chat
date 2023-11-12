import { useContext, useState } from 'react'
import { Flex, IconButton, Textarea, Box } from '@chakra-ui/react'
import { FaPaperPlane } from 'react-icons/fa'
import TextareaAutosize from 'react-textarea-autosize'
import { ChatContext } from '../../context/ChatContext'
import { useMessageSend } from '../../hooks'

function MessageTypeControls() {
    const { conversation } = useContext(ChatContext)
    const [message, setMessage] = useState('')
    const { mutate: send } = useMessageSend(conversation?._id)

    const handleSend = () => {
        if (!message) return
        send(message)
        setMessage('')
    }

    const handleKeyDown = e => {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <Flex py={4}>
            <Flex w="100%">
                <Textarea
                    backgroundColor="white"
                    fontSize="lg"
                    rows={1}
                    as={TextareaAutosize}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Message"
                    resize="none"
                    p={2}
                    mb={2}
                    focusBorderColor="orange.300"
                />
                <IconButton
                    onClick={handleSend}
                    colorScheme="orange"
                    aria-label="Send message"
                    icon={<FaPaperPlane />}
                    isDisabled={!message && !conversation?._id}
                />
            </Flex>
        </Flex>
    )
}

export default MessageTypeControls
