import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h2>Homepage!</h2>
      <Link href='/post'>Create a new post</Link>
    </div>
  )
}