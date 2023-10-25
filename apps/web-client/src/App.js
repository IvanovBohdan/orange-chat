import React from 'react'
import './App.css'
import { ChakraProvider, Box, theme } from '@chakra-ui/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import ConversationPage from './routes/ConversationPage'
import LoginPage from './routes/LoginPage'
import RegistrationPage from './routes/RegistrationPage'
function App() {
    const router = createBrowserRouter([
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
