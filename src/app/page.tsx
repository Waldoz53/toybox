'use client'
import { useRouter } from "next/navigation"
import useLoading from "./context/LoadingContext"
import { useEffect, useState } from "react"
import { createClientBrowser } from "@/utils/supabase/client"
import { getTimeAgo } from "@/utils/getTimeAgo"

export default function Home() {
  const router = useRouter()
  const supabase = createClientBrowser()
  const { setLoading } = useLoading()
  const [loadedPosts, setLoadedPosts] = useState(false)
  const [posts, setPosts] = useState<any[]>([])

  function goToPost() {
    setLoading(true)
    router.push('/post')
    setLoading(false)
  }

  async function fetchAllPosts() {
    const { data, error } = await supabase.from('posts').select('id, title, created_at, profiles(username)').order("created_at", { ascending: false })
    // add pagination
    if (error || !data) {
      console.log("Error fetching posts:", error.message)
      return <p>Error fetching posts :(</p>
    } else {
      setPosts(data)
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