export interface Post  {
    id: number
    author: string
    title: string
    content: string | null
    subject: string
    likes: number
    views: number
    commentsAmount: number
    createdDate: string
}