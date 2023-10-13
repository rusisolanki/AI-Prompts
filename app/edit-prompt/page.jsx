"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPrompt = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [submit, setSubmit] = useState(false);
  const [newPrompt, setNewPrompt] = useState({
    prompt: "",
    tag: "",
  });
  const promptId = searchParams.get('id')

  useEffect( () => {
      const getPrompt = async () => {
          const response = await fetch(`api/prompt/${promptId}`)
          
          const data = await response.json()
        
          setNewPrompt({prompt: data.prompt, tag: data.tag})
      }
      if(promptId){
          getPrompt()
      }

  }, [promptId]);


  const editPrompt = async (e) => {
    e.preventDefault();
    setSubmit(true)

    if(!promptId){
        return alert('No prompt id found')
    }

    try{
      // Here we are creating an endpoint by specifying the route and then creating folders and files based on the endpoint example 'api' is a folder within which there is 'prompt' and then goes 'new' in which there is a route file
      const response = await fetch(`api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: newPrompt.prompt,
          tag: newPrompt.tag,
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
    <Form
      type="Edit"
      newPrompt={newPrompt}
      setNewPrompt={setNewPrompt}
      submit={submit}
      handleSubmit={editPrompt}
    />
  );
};

export default EditPrompt;
