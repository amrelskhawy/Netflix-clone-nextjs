"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"


const Page = () => {

  const { data: session, status } = useSession()

  if (status === 'unauthenticated') {
    redirect('/auth')
  }

  else {

    return (
      <div className="text-white text-4xl">
        Profiles Works
      </div>
    )
  }
}



export default Page