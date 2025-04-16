'use client'
import { useRouter } from "next/navigation"
import useLoading from "./context/LoadingContext"
import { useEffect, useState } from "react"
import { createClientBrowser } from "@/utils/supabase/client"
import { getTimeAgo } from "@/utils/getTimeAgo"

type Post = {
  id: string,
  title: string, 
  created_at: string,
  profiles: { username: string }
}

export default function Home() {
  const router = useRouter()
  const supabase = createClientBrowser()
  const { setLoading } = useLoading()
  const [loadedPosts, setLoadedPosts] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])

  function goToPost() {
    setLoading(true)
    router.push('/post')
    setLoading(false)
  }

  async function fetchAllPosts() {
    const { data, error } = await supabase.from('posts').select('id, title, created_at, profiles(username)').order("created_at", { ascending: false }).limit(100)
    // FIX: add pagination
    if (error || !data) {
      console.log("Error fetching posts:", error.message)
      return <p>Error fetching posts :(</p>
    } else {
      // FIX: sanity check here in the future
      setPosts(data as unknown as Post[])
      setLoadedPosts(true)
    }
  }

  useEffect(() => {
    if (!loadedPosts) {
      fetchAllPosts()
    }
  }, [loadedPosts])

  return (
    <div className="home">
      <button onClick={goToPost}>Add to your collection</button>
      <div className="all-posts">
        {posts && posts.length > 0 && (
          <>
          {posts.map((post) => (
            <div className="post" key={post.id}>
              <p>{post.profiles?.username} added {post.title}</p>
              <span>{getTimeAgo(post.created_at)}</span>
            </div>
          ))}
          </>
        )}
        {!loadedPosts && <span className="loader"></span>}
      </div>
    </div>
  )
}