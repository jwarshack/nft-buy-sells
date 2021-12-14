import React from 'react'
import { Flex, Heading, Button } from '@chakra-ui/react'
import { useMoralis } from 'react-moralis'

function Navbar() {

    const { isAuthenticated, isAuthenticating, user, authenticate } = useMoralis();
    return (
        <Flex p={8} justify="space-between">
            <Heading>NFT Tracker</Heading>
            <Button onClick={authenticate} isLoading={isAuthenticating}>{!isAuthenticated ? "Connect" : user.attributes.ethAddress} </Button>
        </Flex>
    )
}

export default Navbar
