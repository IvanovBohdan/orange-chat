import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { register as registerUser } from '../api/userApi'

const RegistrationPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async data => {
        setIsLoading(true)
        await registerUser(data)
        setIsLoading(false)
        navigate('/login')
    }

    return (
        <Box maxW="md" mx="auto" p={4} borderWidth={1} borderRadius="md">
            <Heading as="h1" size="lg" textAlign="center" mb={8}>
                Registration
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.name}>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                        id="name"
                        placeholder="Enter your name"
                        {...register('name', { required: 'Name is required' })}
                    />
                    <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.username} mt={4}>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input
                        id="username"
                        placeholder="Enter your username"
                        {...register('username', {
                            required: 'Username is required',
                        })}
                    />
                    <FormErrorMessage>
                        {errors.username?.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.email} mt={4}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Invalid email address',
                            },
                        })}
                    />
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.password} mt={4}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message:
                                    'Password must have at least 8 characters',
                            },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.password?.message}
                    </FormErrorMessage>
                </FormControl>
                <Button
                    type="submit"
                    colorScheme="orange"
                    mt={8}
                    loadingText="Submitting"
                    isLoading={isLoading}
                >
                    Register
                </Button>
            </form>
        </Box>
    )
}

export default RegistrationPage
