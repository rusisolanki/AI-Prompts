import Prompt from '@utils/prompts.js'
import connectDB from '@utils/database'

export const GET = async (request, { params }) => {
    try{
        await connectDB()

        const prompt = await Prompt.findById(params.id).populate('creator')
        console.log(prompt)
        if(!prompt){
            return new Response('No prompts found', {status: 404})
        }
        return new Response(JSON.stringify(prompt), {status: 200})
    }
    catch(error){
        return new Response('Could not fetch prompts', {status: 500})
    }
}

export const PATCH = async ( request, { params }) => {
    const { prompt, tag } = await request.json()

    try{
        await connectDB()
        const existingPrompt = await Prompt.findById(params.id)
        
        if(!existingPrompt){
            return new Response("Couln't find any prompt", {status: 404})
        }

        existingPrompt.prompt = prompt
        existingPrompt.tag = tag

        await existingPrompt.save()

        return new Response(JSON.stringify(existingPrompt), {status: 200})
    }
    catch(error){
        return new Response('Failed to update', {status: 500})
    }
}

export const DELETE = async (request, {params}) => {
    try {
        await connectDB()

        await Prompt.findByIdAndRemove(params.id)

        return new Response('Prompt is deleted', {status:200})
    } catch (error) {
        return new Response('Failed to delete the prompt', {status: 500})
    }
} 