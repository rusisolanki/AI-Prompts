'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@components/Profile'


const MyProfile = () => {
    const router = useRouter()
    const {data: session} = useSession()
    const [prompts, setPrompts] = useState([])
    useEffect(() => {
        const fetchPrompt = async () => {
          const response  = await fetch(`api/users/${session?.user.id}/prompts`)
          const data = await response.json();
          setPrompts(data)
        }
        
        if(session?.user.id){
            fetchPrompt()
        }
      }, [])
    const handleEdit = (prompt) => {
        router.push(`/edit-prompt?id=${prompt._id}`)
    }
    const handleDelete = async (prompt) => {
        try {
            await fetch(`api/prompt/${prompt._id.toString()}`, {
                method: 'DELETE'
            })

            const filterPrompts = prompts.filter((post) => post._id !== prompt._id)
            setPrompts(filterPrompts)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Profile name='Profile' desc='Profile Page' data={prompts} handleEdit={handleEdit} handleDelete={handleDelete } />
  )
}

export default MyProfile
