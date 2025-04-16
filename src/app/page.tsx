'use client'
import { useRouter } from "next/navigation"
import useLoading from "./context/LoadingContext"


export default function Home() {
  const router = useRouter()
  const { setLoading } = useLoading()
  function goToPost() {
    setLoading(true)
    router.push('/post')
    setLoading(false)
  }
  return (
    <div className="home">
      <button onClick={goToPost}>Add to your collection</button>
    </div>
  )
}