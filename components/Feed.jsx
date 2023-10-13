"use client";
import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card";

const PromptList = ({ data, handleTag }) => {
  useEffect(()=>{
    console.log(data)
  }, [])
  return(
    <div className="mt-16 prompt_layout">
      {data.map((prompt) => (
        <Card key={prompt._id} prompt={prompt} handleTag={handleTag} />
      ))}
      
    </div>
  )
}

const Feed = () => {
  const { search, setSearch } = useState('');
  const [ prompts, setPrompts ] = useState([])
  const handleSearch = (e) => {}

  useEffect(() => {
    const fetchPrompt = async () => {
      const response  = await fetch('api/prompt')
      const data = await response.json();
      setPrompts(data)
    }
    fetchPrompt()
  }, [])
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
          required
          className="search_input peer"
        />
      </form>
      <PromptList data={prompts} handleTag={()=>{}}/>
    </section>
  );
};

export default Feed;
