import React from 'react'
import Card from '@components/Card'

const Profile = ({ name, desc, data, handleEdit, handleDelete}) => {

  return (
    <section className='w-full'>
        <h1 className='head_text text-left'>
            <span className='blue_gradient'>{name}</span>
        </h1>
        <p className='desc text-left mb-5'>{desc}</p>
        <div>
            {data.map((prompt) => (
                <Card key={prompt._id} prompt={prompt} handleEdit={() => handleEdit && handleEdit(prompt)} handleDelete={() => handleDelete && handleDelete(prompt)}/>
            ))}
        </div>
    </section>
  )
}

export default Profile
