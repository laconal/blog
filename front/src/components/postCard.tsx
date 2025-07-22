import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Bookmark } from "lucide-react"
import { Badge } from "./ui/badge"

type PostCardProps = {
    title: string
    content: string | null
    user: string
    subject: string
    views: number
    commentsNumber: number
    likes: number
    createdDate: string
}

export default function PostCard({title, content, user, subject, views, commentsNumber, likes, createdDate}: PostCardProps) {
    return (
        <div className="flex justify-center">
            <Card className="w-full max-w-[750px]">
                <CardHeader>
                    <CardTitle className="text-3xl">{title}</CardTitle>
                    <CardAction><Bookmark className="text-yellow-200" fill="yellow"/></CardAction>
                </CardHeader>
                <CardContent>
                    <p className="truncate mr-50">{content}</p>
                </CardContent>
                <CardFooter className="space-x-6">
                    <div className="flex space-x-1">
                        <p>Author: </p>
                        <Badge>{user}</Badge>
                    </div>
                    <div className="flex space-x-1">
                        <p>Subject: </p>
                        <Badge>{subject}</Badge>
                    </div>
                    <div className="flex space-x-1">
                        <p>Views: </p>
                        <Badge>{views}</Badge>
                    </div>
                    <div className="flex space-x-1">
                        <p>Comments: </p>
                        <Badge>{commentsNumber}</Badge>
                    </div>
                    <div className="flex space-x-1">
                        <p>Likes: </p>
                        <Badge className="bg-green-500">{likes}</Badge>
                    </div>
                    <div className="flex space-x-1">
                        <p>Date: </p>
                        <Badge>{createdDate}</Badge>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}