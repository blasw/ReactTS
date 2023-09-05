type User = {
    id: number,
    name: string,
}

type Album = {
    id: number,
    title: string,
    userId: number
}

type Photo = {
    id: number,
    url: string,
    albumId: number,
}

export type {User, Album, Photo};