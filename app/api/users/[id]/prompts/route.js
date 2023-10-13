import Prompt from '@utils/prompts.js'
import connectDB from '@utils/database'

export const GET = async (request, { params }) => {
    try{
        await connectDB()

        const prompts = await Prompt.find({creator: params.id}).populate('creator')
        console.log(prompts)
        return new Response(JSON.stringify(prompts), {status: 200})
    }
    catch(error){
        return new Response('Could not fetch prompts', {status: 500})
    }
}