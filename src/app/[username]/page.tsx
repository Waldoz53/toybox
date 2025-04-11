import DeletePostButton from "@/components/DeletePostButton"
import StartEditPostButton from "@/components/StartEditPostButton"
import { createClientServer } from "@/utils/supabase/server"

type Props = {
  params: Promise<{username: string}>
}

export default async function UserPage({ params }: Props) {
  const { username } = await params
  let isValidUsername = false
  let isOwner = false
  let errorMessage = ''
  const supabase = await createClientServer()
  const { data: profile, error: error } = await supabase.from('profiles').select('id, username').eq('username', username).single()

  if (error || !profile) {
    console.log("Error retrieving profile", error)
    errorMessage = "Error retrieving profile"
  } else {
    isValidUsername = true
  }

  const { data: postsData, error: postsError } = await supabase.from('posts').select('*').eq('user_id', profile?.id).order('created_at', { ascending: false })
  if (postsError) {
    console.error("Error fetching posts:", postsError)
    errorMessage = "Error fetching posts."
  }

  // check if user is logged in + their user id matches the user id of the page, then enables editing/delete buttons
  const { data } = await supabase.auth.getUser()
  if (data.user?.id === profile?.id) {
    isOwner = true
  }

  return (
    <div>
      {isValidUsername ? (
        <>
          <h2>{username}&apos;s Collection:</h2>
          <p>{errorMessage}</p>
          <div>
            {postsData && postsData.length > 0 ? (
              postsData.map(post => (
                <div key={post.id}>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <p>Added on {new Date(post.created_at).toLocaleDateString()}</p>
                  {isOwner ? (
                    <>
                      <StartEditPostButton id={post.id}/>
                      <DeletePostButton id={post.id}/>
                    </>
                  ) : (
                    ''
                  )}
                </div>
              ))
            ) : (
              <p>No items in {username}&apos;s collection.</p>
            )}
          </div>
        </>
      ) : (
        <h2>{errorMessage}</h2>
      )}
    </div>
  )
}