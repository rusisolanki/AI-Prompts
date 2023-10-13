"use client"

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@components/Form'

const NewPrompt = () => {

  const router = useRouter()
  const {data: session} = useSession()
  const [submit, setSubmit] = useState(false)
  const [newPrompt, setNewPrompt] = useState({
    prompt: '',
    tag:''
  })
  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmit(true)

    try{
      // Here we are creating an endpoint by specifying the route and then creating folders and files based on the endpoint example 'api' is a folder within which there is 'prompt' and then goes 'new' in which there is a route file
      const response = await fetch('api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: newPrompt.prompt,
          tag: newPrompt.tag,
          userID: session?.user.id
        })
      })

      if(response.ok){
        router.push('/')
      }
    }
    catch(error){
      console.log(error)
    }
    finally{
      setSubmit(false)
    }
  }

  return (
    <Form type='Create' newPrompt={newPrompt} setNewPrompt={setNewPrompt} submit={submit} handleSubmit={createPrompt}/>
  )
}

export default NewPrompt
