import React from 'react'
import {
    Flex,
    Input,
    Icon,
    IconButton,
    InputGroup,
    InputLeftElement,
} from '@chakra-ui/react'
import { CiSearch } from 'react-icons/ci'

export default function Search({ onChange, value}) {
    return (
        <Flex height={14} alignItems="center">
            <InputGroup height="100%">
                <InputLeftElement pointerEvents="none">
                    <Icon as={CiSearch} color="gray.400" />
                </InputLeftElement>
                <Input
                    value={value}
                    onChange={onChange}
                    type="search"
                    placeholder="Search"
                    focusBorderColor="orange.300"
                />
            </InputGroup>
        </Flex>
    )
}
