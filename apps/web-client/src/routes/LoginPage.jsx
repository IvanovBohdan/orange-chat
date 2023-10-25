import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    FormErrorMessage,
    Box,
    Heading,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { login as loginUser } from '../api/userApi'
import { setCurrentUser } from '../utils/user'
import { setToken } from '../utils/token'

const LoginPage = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async ({ email, password }) => {
        setIsLoading(true)
        const { user, token } = await loginUser(email, password)
        setCurrentUser(user)
        setToken(token)
        setIsLoading(false)
        navigate('/chat')
    }

    return (
        <Box maxW="sm" mx="auto">
            <Heading textAlign="center" mb="4">
                Login
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Invalid email format',
                            },
                        })}
                    />
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>

                <FormControl mt="4" isInvalid={errors.password}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message:
                                    'Password must have at least 6 characters',
                            },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.password?.message}
                    </FormErrorMessage>
                </FormControl>

                <Button
                    colorScheme="orange"
                    mt="8"
                    type="submit"
                    width="full"
                    isLoading={isLoading}
                    loadingText="Logging in..."
                >
                    Login
                </Button>
            </form>
        </Box>
    )
}

export default LoginPage
