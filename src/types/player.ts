import type { Game } from './game'

export type Player = {
    id?: string
    email: string        
    name: string
    password:  string
    username:  string        
    status:    string
    games:     Game[]        
    record:    PlayerRecord
    profile:   Profile     
    createdAt: Date      
    updatedAt: Date     
}

type Profile = {
    id?: string
}

type PlayerRecord = {
    id?: string
}

export enum PlayerStatuses {
    ACTIVE = "active",
    INACTIVE = "inactive"
}