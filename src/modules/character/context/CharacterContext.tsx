import { createContext, Dispatch, useContext, useState, SetStateAction, useMemo } from "react";
import { Character } from "../models/Character";

type CharacterContextType = {
    characters: Character[],
    searchedCharacters: Character[],
    searchedName: string,
    setCharacters:  Dispatch<SetStateAction<Character[]>>
    setSearchedCharacters:  Dispatch<SetStateAction<Character[]>>
    setSearchedName:  Dispatch<SetStateAction<string>>
}

const CharacterContext = createContext<CharacterContextType>({
    characters: [],
    searchedCharacters: [],
    searchedName: '',
    setCharacters: () => {},
    setSearchedCharacters: () => {},
    setSearchedName: () => {},
})

type CharacterProviderProps = {
    children: React.ReactNode
}

const CharacterProvider = ({ children }: CharacterProviderProps) => {
    const [characters, setCharacters] = useState<Character[]>([])
    const [searchedCharacters, setSearchedCharacters] = useState<Character[]>([])
    const [searchedName, setSearchedName] = useState('')

    const value = useMemo(() => ({
        characters, 
        searchedCharacters, 
        searchedName,
        setCharacters, 
        setSearchedCharacters,
        setSearchedName
      }), [characters, searchedCharacters, searchedName]);

    return (
        <CharacterContext.Provider value={value}>
            {children}
        </CharacterContext.Provider>
    )
}

const useCharacter = () => useContext(CharacterContext)

export {CharacterProvider, useCharacter}