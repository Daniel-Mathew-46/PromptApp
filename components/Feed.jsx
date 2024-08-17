"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className=" mt-16 prompt_layout">
      {data.map((prompt) => (
        <PromptCard key={prompt._id} prompt={prompt} handleTagClick={handleTagClick}/>
      ))}
    </div>
  )
}
const Feed = () => {
  const [prompts, setPrompts] = useState([]);
  const [searchText, setSearchText] = useState('')

  const handleSearchChange = (e) => {}

  useEffect(() => {
    const fetchPrompts = async () => {
      const res = await fetch("/api/prompt")
      const data = await res.json()
      setPrompts(data)
    }
    fetchPrompts()
  }, [])

  return <section className="feed">
    <form className=" w-full relative flex-center">
      <input type="text" placeholder="Search for a tag or username" onChange={handleSearchChange} required className=" search_input peer"/>
    </form>
    <PromptCardList data={prompts} handleTagClick={() => {}}/>
    </section>;
};

export default Feed;
