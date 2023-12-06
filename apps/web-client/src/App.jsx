import React from 'react'
import './App.css'
import { ChakraProvider, Box, theme } from '@chakra-ui/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ConversationPage from './routes/ConversationPage'
import LoginPage from './routes/LoginPage'
import RegistrationPage from './routes/RegistrationPage'
import UserPage from './routes/UserPage'
import HomePage from './routes/HomePage'
function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomePage />,
        },
        {
            path: '/chat',
            element: <ConversationPage />,
            children: [
                {
                    path: '/chat:conversationId',
                    element: <ConversationPage />,
                },
            ],
        },
        {
            path: '/user',
            element: <UserPage />,
            children: [
                {
                    path: '/user:userId',
                    element: <UserPage />,
                },
            ],
        },
        {
            path: '/login',
            element: <LoginPage />,
        },
        {
            path: '/registration',
            element: <RegistrationPage />,
        },
    ])
    return (
        <ChakraProvider theme={theme}>
            <RouterProvider router={router} />
        </ChakraProvider>
    )
}

export default App
