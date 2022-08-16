import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Character } from "../models/Character"
import { Comic } from "../models/Comic"
import { CharacterRepository } from "../repository/CharacterRepository"
import { ComicRepository } from "../repository/ComicRepository"
import { useCharacter } from "./CharacterContext"


export type ApiCharactersResponse = {
    total: number,
    results: Character[]
}

export function useFetchCharacters(offset: number, name: string): UseQueryResult<ApiCharactersResponse, unknown> {
    const repo = useMemo( () => new CharacterRepository(), [])
    
    const { setCharacters, setSearchedCharacters, searchedCharacters, characters  } = useCharacter()
    
    const transformData = (requestData: any) => {
        const characters: Character[] = requestData.data.results
            .map((character: any) => Character.toDomain(character))
        return {...requestData.data, results: characters}
    }

    const getByName = useCallback(async () => await repo.getByNameStartWith(offset, name), [repo, offset, name])
    const getByOffset = useCallback(async () => await repo.getByOffset(offset), [repo, offset])
    
    const response =  useQuery<ApiCharactersResponse>(
        [offset,  !name.length ? 'characters' : name],
        !name.length ? getByOffset : getByName, 
        {
            select: transformData,
            keepPreviousData: true,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        })

    
    useEffect(() => {
        
        if(name.length) {
            setSearchedCharacters(response.data?.results || [])
            setCharacters([])
        } else {
            setSearchedCharacters([])
            setCharacters(response.data?.results || [])
        }
    }, [name, offset, setCharacters, setSearchedCharacters])

    
    return response
    
}

export const useGetComicsWithImages = (character?: Character) => {
    const [comics, setComics] = useState<Comic[]>([])
    const [isLoading, setLoading] = useState(false)
    const [hasError, setError] = useState(false)
    
    useEffect(() => {
        const repo = new ComicRepository()
        setLoading(true)
        
        if(character?.hasComics()) {
            repo.getComicsImageUrl(character?.comics).then((res) => {
                setComics(res)
            })
            .catch(() => {
                setError(true)
            })
            .finally(() => {
                setLoading(false)
            })
        }
        
    }, [character, setComics])

    return {comics, setComics, isLoading, hasError}
}