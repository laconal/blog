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
import { format } from "date-fns"
import { Heart, Reply, MessageCircle, User2 } from "lucide-react"

type CommentCardProps = {
    subMessages: number[]
    body: string
    likes: number
    createdDate: string
    author: string
    parent: number | null
}

export default function CommentCard({subMessages, body, author, parent, likes, createdDate}: CommentCardProps) {
    return (
        <div className="flex justify-center">
            <Card className="w-full max-w-[750px]">
                <CardContent>
                    <p className="">{body}</p>
                </CardContent>
                <CardFooter className="space-x-6">
                    <div className="flex space-x-2">
                        <User2 />
                        <p>{author}</p>
                    </div>
                    <div className="flex space-x-2">
                        <Heart/>
                        <p>{likes}</p>
                    </div>
                    <div className="flex space-x-2">
                        <p>Date:</p>
                        <p>{format(createdDate, "dd-MM-yyyy")}</p>
                    </div>
                    <MessageCircle/>
                </CardFooter>
            </Card>
        </div>
    )
}