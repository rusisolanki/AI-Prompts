'use client'

import { SessionProvider } from 'next-auth/react'
// Using the supplied <SessionProvider> allows instances of useSession() to share the session object across components, by using React Context under the hood. It also takes care of keeping the session updated and synced between tabs/windows.If you pass the session page prop to the <SessionProvider> you can avoid checking the session twice on pages that support both server and client side rendering.
const Provider = ({children, session}) => {
  return (
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
  )
}

export default Provider
