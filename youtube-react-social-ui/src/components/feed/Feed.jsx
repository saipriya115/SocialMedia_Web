import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios"
import { useState } from "react";

export default function Feed({username}) {
  const {user}=useContext(AuthContext)
  const [posts,setposts]=useState([])
  useEffect(()=>{
    const fetchPosts=async ()=>{
      const res=username ? await axios.get("/posts/profile/"+ username) :await axios.get("posts/timeline/"+user._id)
      setposts(res.data)
    }
    
    fetchPosts()
    //so i have to use async and wait then we will get the post info
    //but again i will get error that no proprty called profile picture so we will go to posts
  },[username,user._id])
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
     {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
//so now when i render this component i want to fetch the posts to do that i need to use useeffect hook
//so whenever i change something inside this div or something it is going to render again
//in useeffect if dependency array is empty it means run this useeffect just once when you render this feed
//axios is like a tool for making requests 
