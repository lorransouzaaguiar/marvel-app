import { Flex, Heading } from "@chakra-ui/react"

export const Header = () => {
    return (
        <Flex 
                as='header' 
                height='90px' 
                width='full' 
                bgColor='red.10' 
                justifyContent='center' 
                align='center'
            >
                <Heading as='h1' color='gray.10'>Marvel Heroes</Heading>
        </Flex> 
    )
}