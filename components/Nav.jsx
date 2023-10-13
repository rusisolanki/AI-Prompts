'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
// The getProviders() method returns the list of providers currently configured for sign in. It calls /api/auth/providers and returns a list of the currently configured authentication providers.It can be useful if you are creating a dynamic custom sign in page.
// Using the signIn() method ensures the user ends back on the page they started on after completing a sign in flow. It will also handle CSRF Tokens for you automatically when signing in with email.
// In order to logout, use the signOut() method to ensure the user ends back on the page they started on after completing the sign out flow. It also handles CSRF tokens for you automatically.



const Nav = () => {
    const {data: session} = useSession()
    const [providers, setProviders] = useState(null)
    const [toggleDropdown, setToggleDropdown] = useState(false)

    useEffect(()=>{
        const googleProviders = async () => {
            const response = await getProviders()
            setProviders(response)
        }
        googleProviders()
    },[])

    

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link href='/' className='flex gap-2'>
            <Image src='/assets/images/AIPromptsLogo.png' alt='AI Prompts Logo' width={45} height={45} className='object-contain'/>
            <p className='logo_text mt-1'>AI-Prompts</p>
        </Link>

        {/* Desktop Navigation */}
        <div className='flex-col sm:flex hidden'>
            {session?.user ? 
            (<div className='flex gap-3 md:gap-5'>
                <Link href='/new-prompt' className='black_btn'>Create Prompt
                </Link>
                <button onClick={signOut} className='outline_btn'>Sign Out</button>
                <Link href='/profile'>
                    <Image src={session.user.image} width={35} height={35} className='rounded-full' alt='profile'/>
                </Link>
            </div>) : 
            (<>
                {providers && Object.values(providers).map((provider) => (
                    <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>Sign In</button>
                ))}
            </>)}
        </div>
        {/* Mobile Navigation */}
        <div className='sm:hidden flex relative'>
            {session?.user ? (
                <div className='flex'>
                    <Image src={session.user.image} width={35} height={35} className='rounded-full' onClick={() => setToggleDropdown((prev) => !prev) } alt='profile'/>

                    {toggleDropdown && (
                        <div className='dropdown'>
                            <Link
                            href='/profile'
                            className='dropdown_link'
                            onClick={() => setToggleDropdown(false)}
                            >
                                My Profile
                            </Link>
                            <Link
                            href='/new-prompt'
                            className='dropdown_link'
                            onClick={() => setToggleDropdown(false)}
                            >
                                Create Prompt
                            </Link>
                            <button
                                className='mt-4 w-full black_btn'
                                onClick={() => {
                                    setToggleDropdown(false)
                                    signOut()
                                }}
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <>
                {providers && Object.values(providers).map((provider) => (
                    <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>Sign In</button>
                ))}
            </>
            )}
        </div>
    </nav>
  )
}


export default Nav
