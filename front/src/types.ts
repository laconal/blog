export interface Post  {
    id: number
    author: string
    title: string
    content: string | null
    subject: string
    likes: number
    views: number
    comments: number[]
    createdDate: string
}

export interface Comment {
    id: number
    subMessages: number[]
    body: string
    likes: number
    createdDate: string
    post: number
    author: string
    parent: number | null
}