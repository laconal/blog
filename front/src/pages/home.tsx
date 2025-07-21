import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns"
import type { Post } from "@/types";
import PostCard from "@/components/card";
import PostPage from "./post";

export default function Home() {

  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/posts/", {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    }
    ).then(res => res.json())
    .then((data) => setPosts(data))
  }, [])

  return (
    <div className="grid justify-center space-y-6 mx-auto max-w-[1080px]">
      <div id="navigationMenu" className="flex space-x-2 mt-2 justify-end">
        <Button variant="ghost">Bookmarks</Button>
        <Link to="/login">
            <Button variant="secondary">Log In</Button>
        </Link>
      </div>
      <div className="flex space-x-2">
        <Input placeholder="Author / Subject"/>
        <Button>Search</Button>
      </div>
      <div id="posts" className="space-y-6">
        <div id="posts" className="space-y-6">
          {posts.map((x) => (
            <Link
              key={x.id}
              to={`/post/${x.id}`}
              state={x}           // optional: pass the whole object
              className="block"
            >
              <PostCard
                title={x.title}
                content={x.content}
                user={x.author}
                subject={x.subject}
                views={x.views}
                commentsNumber={x.commentsAmount}
                likes={x.likes}
                createdDate={format(new Date(x.createdDate), 'dd-MM-yyyy')}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
