'use client'

import { createClientBrowser } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import HomePostList from "./HomePostList"
import HomeShell from "./HomeShell"
import useUser from "@/app/context/UserContext"

type FeedType = 'everyone' | 'following'

type Posts = {
  id: string;
  created_at: string;
  profiles: { username: string };
  figures: {
    name: string;
    toylines: { name: string };
  };
  likes: { count: number }[];
  comments: { count: number }[];
};

export default function ClientPostList({ defaultPosts }: { defaultPosts: Posts[] }) {
  const supabase = createClientBrowser()
  const { user } = useUser()
  const [feedType, setFeedType] = useState<FeedType>('everyone')
  const [posts, setPosts] = useState<Posts[]>(defaultPosts)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (feedType === 'everyone') {
      setPosts(defaultPosts)
      return
    }

    async function fetchFollowingPosts() {
      setLoading(true)
      if (!user?.id) return

      const { data: followIds } = await supabase.from('follows').select('followed_id').eq('follower_id', user.id)

      const ids = followIds?.map(f => f.followed_id)
      if (!ids || ids.length === 0) {
        setPosts([])
        setLoading(false)
        return
      }

      const { data: postsData } = await supabase.from('posts').select('*, profiles(username), figures(name, slug, toylines(name)), likes(count), comments(count)').in("user_id", ids).order('created_at', { ascending: false })

      setPosts(postsData ?? [])
      setLoading(false)
    }

    fetchFollowingPosts()
  }, [feedType, defaultPosts, supabase, user?.id])

  return (
    <>
      <HomeShell onFeedTypeChange={setFeedType}>
        {loading ? <span className="loader"></span> : <HomePostList posts={posts}/>}
      </HomeShell>
    </>
  )
}