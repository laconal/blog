import { type Post } from "@/types";
import { useParams, useLocation } from "react-router-dom"
import {format} from "date-fns"
import { Heart, Eye, User2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

// interface PostParams {
//     post: Post
// }

export default function PostPage() {
    const { id } = useParams<{id: string}>()
    const location = useLocation()
    const post = location.state as Post | undefined
    if (!post) return <div>Loading...</div>
    
    return (
        <div className="grid justify-center space-y-6 max-w-[1080px] mx-auto my-20 px-8 sm:px-6 lg:px-8">
            <div>
                <p className="font-bold text-2xl">{post.title}</p>
                <p className="font-light">{format(post.createdDate, "dd-MM-yyyy")}</p>
            </div>
                <p>{post.content}</p>
            <div id="navigationMenu" className="flex space-x-20">
                <p>Author: {post.author}</p>
                <p>Category: {post.subject}</p>
                <div className="flex space-x-2">
                    <Eye/>
                    <p>{post.views}</p>
                </div>
                <div className="flex space-x-2">
                    <Heart/>
                    <p>{post.likes}</p>
                </div>
            </div>
            <div className="space-y-4">
                <p>Comments:</p>
                <Textarea placeholder="Leave your comment" className="resize-none"/>
            </div>
        </div>
    )
}

