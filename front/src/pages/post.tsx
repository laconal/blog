import { type Post, type Comment } from "@/types";
import { useParams, useLocation } from "react-router-dom"
import {format} from "date-fns"
import { Heart, Eye, User2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useMemo, useState, type JSX } from "react";
import CommentCard from "@/components/commentCard";

export default function PostPage() {
    const { id } = useParams<{id: string}>()
    const location = useLocation()
    const post = location.state as Post | undefined
    if (!post) return <div>Loading...</div>

    const [comments, setComments] = useState<Comment[]>([])
    const topLevelComments = comments.filter(comment => comment.parent === null)
    const usedComments = new Set<number>()
    
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/posts/${id}/comments/`, {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        }
        ).then(res => res.json())
        .then((data) => setComments(data))
    }, [])
    
    const renderComment = (comment: Comment, depth: number = 0, usedComments: Set<number>) => {
        if (usedComments.has(comment.id)) return null
        usedComments.add(comment.id)
        
        // Define specific classes for each depth level
        const getIndentClass = (depth: number) => {
            switch(depth) {
                case 0: return ''
                case 1: return 'ml-8'
                case 2: return 'ml-10'
                case 3: return 'ml-12'
                case 4: return 'ml-14'
                default: return 'ml-16'
            }
        }
        
        return (
            <div key={comment.id} className={`${getIndentClass(depth)} ${depth > 0 ? 'mt-2' : ''}`}>
                <CommentCard 
                    author={comment.author}
                    subMessages={comment.subMessages}
                    createdDate={comment.createdDate}
                    body={comment.body}
                    likes={comment.likes}
                    parent={comment.parent}
                />
                {comment.subMessages.length > 0 && (
                    <div className="space-y-2">
                        {comment.subMessages.map(subMsgID => {
                            const childComment = comments.find(x => x.id === subMsgID)
                            return childComment ? renderComment(childComment, depth + 1, usedComments) : null
                        })}
                    </div>
                )}
            </div>
        )
    }
    
    return (
        <div className="grid mb-10">
            <div className="grid justify-center space-y-6 mx-auto max-w-[1080px] my-20 px-8 sm:px-6 lg:px-8">
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
                <Textarea placeholder="Leave your comment" className="resize-none"/>
            </div>
            <div className="space-y-4">
                {topLevelComments.map(comment => renderComment(comment, 0, usedComments))}
                {/* {comments.map((comment) => {
                    if (usedComments.has(comment.id)) return null
                    usedComments.add(comment.id)
                    return (
                        <div>
                            <CommentCard 
                                author={comment.author}
                                subMessages={comment.subMessages}
                                createdDate={comment.createdDate}
                                body={comment.body}
                                likes={comment.likes}
                                parent={comment.parent}
                            />
                            {comment.subMessages.length > 0 && (
                                <div className="ml-10 mt-2 space-y-2">
                                    {comment.subMessages.map(subMsgID => {
                                        const childMsg = comments.find(x => x.id === subMsgID)
                                        if (childMsg) usedComments.add(childMsg.id)
                                        return childMsg ? (
                                            <CommentCard 
                                                author={childMsg.author}
                                                subMessages={childMsg.subMessages}
                                                createdDate={childMsg.createdDate}
                                                body={childMsg.body}
                                                likes={childMsg.likes}
                                                parent={childMsg.parent}
                                            /> 
                                        ): null
                                    })}
                                </div>
                            )}
                        </div>
                        
                    )
                })} */}
            </div>
        </div>
    )
}
