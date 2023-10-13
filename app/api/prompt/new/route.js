import React from 'react'
import Prompt from '@utils/prompts.js'
import connectDB from '@utils/database'

export const POST = async (req) => {
    
    const {prompt, tag, userID} = await req.json()

    try {
        await connectDB()
        const newPrompt = new Prompt({
            creator: userID,
            prompt,
            tag
        })

        await newPrompt.save()

        return new Response(JSON.stringify(newPrompt), {status: 201})
    } catch (error) {
        return new Repsonse('Failed to create a prompt', {status: 500})
    }
}


