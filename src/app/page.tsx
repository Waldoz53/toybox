'use client'
import { useRouter } from "next/navigation"


export default function Home() {
  const router = useRouter()
  function goToPost() {
    router.push('/post')
  }
  return (
    <div className="home">
      <button onClick={goToPost}>Add to your collection</button>
    </div>
  )
}