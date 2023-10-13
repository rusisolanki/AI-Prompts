'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

const Card = ({ prompt, handleTag, handleEdit, handleDelete}) => {
    const {data: session} = useSession()
    const pathName = usePathname()
    const router = useRouter()
    const [copied, setCopied] = useState('')

    const handleCopyPrompt = () => {
        setCopied(prompt.prompt)
        navigator.clipboard.writeText(prompt.prompt)
        setTimeout(() => {
            setCopied('')
        }, 4000);
    }
  return (
    <div className='prompt_card'>
        <div className="flex justify-between items-start gap-5">
            <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
                <Image src={prompt.creator.image} alt="users image" width={35} height={35} className="rounded-full object-contain"/>
                <div className='flex flex-col'>
                    <h3 className='font-satoshi font-semibold text-gray-900'>{prompt.creator.username}</h3>
                    <p className='font-inter text-sm text-gray-500'>{prompt.creator.email}</p>
                </div>
            </div>
            <div className="copy_btn" onClic k={handleCopyPrompt}>
                    <Image 
                    src={copied===prompt.prompt ? '/assets/icons/tick.svg' : 'assets/icons/copy.svg'}
                    alt="copy text"
                    width={20} height={20}/>
            </div>
        </div>
      <p className='my-3 font-satoshi text-sm text-gray-800'>{prompt.prompt}</p>
      <p className='font-inter text-sm blue_gradient cursor-pointer'
      onClick={() => handleTag && handleTag(prompt.tag)}>{prompt.tag}</p>
      {session?.user.id === prompt.creator._id && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-5 border-t pt-4 border-gray-300">
          <p className="font-inter green_gradient cursor-pointer" onClick={handleEdit}>
            Edit
          </p>
          <p className='font-inter orange_gradient cursor-pointer' onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default Card
