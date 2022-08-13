import { Grid, Heading, Input, Box } from "@chakra-ui/react"
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from "next"
import { useRouter } from "next/router";
import { CharacterCard } from "../modules/character/components/CharacterCard";
import { useFetchCharacters } from "../modules/character/context/CharacterActions";
import { Pagination } from "../components/Pagination";
import { Parser } from "../utils/Parser";
import { Layout } from "../components/Layout";
import Link from "next/link";
import { Header } from "../components/Header";
import { useState } from "react";
import { Character } from "../modules/character/models/Character";
import { useSelectorGetCharacterByName } from "../modules/character/context/CharacterSelectors";
import { useCharacter } from "../modules/character/context/CharacterContext";
import { CharacterRepository } from "../modules/character/repository/CharacterRepository";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const queryClient = new QueryClient();
    const repo =  new CharacterRepository()
    const {offset} = Parser.pagination(context.query.offset)
    //@ts-ignore
    await queryClient.prefetchQuery( ["characters", offset], async () => await repo.getByOffset(offset))
    return { props: { dehydratedState: dehydrate(queryClient) }};
}

export default function Home (props: any) {
    const router = useRouter();
    const {characters} = useCharacter()
    const {offset} = Parser.pagination(router.query.offset)
    const {data, isLoading} = useFetchCharacters(offset)
    const [name, setName] = useState('')
    const searchedCharacters = useSelectorGetCharacterByName(characters, name)

    const renderList = (data?: Character[]) => {
        return  data?.map(character => 
             <Link key={character.id} href={`/hero/${character.id}`} style={{background: 'red'}}>
                <a><CharacterCard  character={character}/></a>
            </Link> 
        )
    }

    return (
        <Layout>
            <Header />
            <Box
                as='main' 
                textAlign='center'
                display='flex'
                flexDirection='column'
                alignItems='center'
                width='full'    
             
                padding='24px 34px' 
                
            >
                <Heading 
                    as='h2' 
                    fontSize='26px' 
                    color='gray.50'
                    minWidth='213px'
                    textAlign='center'
                    marginBottom='14px'
                >Selecione o Herói</Heading>
                
                <Pagination 
                    //@ts-ignore
                    total={searchedCharacters.length ? searchedCharacters.length : data?.total}
                    offset={offset}
                    buttonsPerPage={5}
                />
                 <Input 
                    placeholder="Pesquisar Herói" 
                    width='360px' 
                    _placeholder={{textAlign: 'center'}}
                    height='48px'
                    marginBottom='24px'
                    backgroundColor='gray.30'
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}

                />
                <Grid 
                    as='article' 
                    templateColumns='repeat(2, 1fr)' 
                    h='full'
                    gap='30px' 
                    w='full'
                    sx={{
                        '@media (min-width: 768px)': {
                            gridTemplateColumns: 'repeat(4, 1fr)' 
                        }

                    }}
                    >
                    {
                        searchedCharacters.length ? renderList(searchedCharacters) : 
                        isLoading && !searchedCharacters.length  ? 'carregando...' : renderList(data?.results)
                    }
                </Grid>
            </Box>
            
        </Layout> 
    )
}