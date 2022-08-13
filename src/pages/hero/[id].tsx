import { Box, Center, Flex, Heading, IconButton, Image, Text, VStack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { Layout } from "../../components/Layout"
import { ButtonBack } from "../../components/Pagination/Icons"
import { SectionTitle } from "../../components/SectionTitle"
import { useCharacter } from "../../modules/character/context/CharacterContext"
import { useSelectorGetCharacter } from "../../modules/character/context/CharacterSelectors"
import { Comic } from "../../modules/character/models/Comic"
import { ComicRepository } from "../../modules/character/repository/ComicRepository"

const Hero = () => {
    const router = useRouter()
    const {characters} = useCharacter()
    const character = useSelectorGetCharacter(characters, router.query.id)
    const [comics, setComics] = useState<Comic[]>([])
    const repo = new ComicRepository()
    
    useEffect(() => {
        if(character?.comics) {
            repo.getComicsImageUrl(character?.comics).then((res) => {
                setComics(res)
            }).catch(console.log)
        }
        
    }, [character?.comics, setComics ])

    return (
        <Layout>
            <Header />
            <VStack h='full' pb='30px'>

            <Flex
                width='full'
                justifyContent='space-between'
                alignItems='center'
                position='relative'
                minH='100px'
            >
                <IconButton 
                    aria-label="icon-button-back"
                    icon={<ButtonBack aria-label="icon-left"/>}
                    fontSize='12px'
                    width='60px'
                    height='60px'
                    borderRadius='100%'
                    background='none'
                    _hover={{
                        backgroundColor: 'var(--chakra-colors-gray-30)'
                    }}
                    onClick={() => {router.back()}}
                    zIndex='1'
                />
                <Center width='full'  position='absolute'>
                    <Heading 
                        w='250px'  
                        textAlign='center'   
                        fontWeight= '400'
                        fontSize='26px'
                        lineHeight='32px'>{character?.name}</Heading>
                </Center>
            </Flex>
            <Box padding='0 20px' mb='100px'>
                <Image 
                    src={character?.urlImage} alt='' 
                    w='full'
                    maxHeight='600px'
                    marginBottom='30px'
                    borderRadius='10px'
                />
                <SectionTitle text='Sobre o personagem'/>
                <Text 
                     fontWeight= '400'
                     fontSize='16px'
                     lineHeight='20px'
                     mb='30px'
                     color='gray.40'
                >{character?.description}</Text>
                <SectionTitle text='Quadrinhos'/>
                
                    <Box  overflowX="auto"  whiteSpace="nowrap" width='full' maxHeight='300px'>
                        {
                            comics.length ?
                            comics.map((comic, index) =>  {
                                return (
                                    <VStack 
                                        key={index} 
                                        height='full'
                                        maxWidth='200px' 
                                        display='inline-block'
                                        bgColor='gray.10' 
                                        margin='0 10px' 
                                        borderRadius='10px' 
                                        padding='10px' >
                                            <Image src={comic.urlImage} width='full' h='full' objectFit='cover'/>
                                    </VStack>)
                            } ) : 'carregando...'  
                        }
                    </Box>
                </Box>
            </VStack>
          

        </Layout>
    )
    
}

export default Hero