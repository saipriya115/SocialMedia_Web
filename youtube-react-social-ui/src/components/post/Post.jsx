import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { Users } from "../../dummyData";
import { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios"
import {format} from "timeago.js"
import {Link} from "react-router-dom"
import {AuthContext} from "../../context/AuthContext"


export default function Post({ post }) {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const [user,setuser]=useState({})
  //now i will fetch user according to the posts
  useEffect(()=>{
    const fetchUser=async ()=>{
      const res=await axios.get(`/users?userId=${post.userId}`)//here post we get as prop
      setuser(res.data)
    }
  
    fetchUser()
    //so i have to use async and wait then we will get the post info
    //but again i will get error that no proprty called profile picture so we will go to posts
  },[post.userId])
  //when this userid is changing the component should be rerendered

  //const likeHandler =()=>{
    //setLike(isLiked ? like-1 : like+1)
    //setIsLiked(!isLiked)
  //}
  const {user: currentUser}=useContext(AuthContext)
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));//this setLiked is gonna be true if post.likes includes userid other
    //wise false
  }, [currentUser._id, post.likes]);
  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
    //but there is one problem here that is if we like the post it increases number from 1 to 2 but response is that the post
    //has been already liked so why is this because the post has been already liked in the database,now for that we will
    //use another useEffect
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
          <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">
             {/* {Users.filter((u) => u.id === post?.userId)[0].username}*/}
             {user.username}

            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF+post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
//now i will create a custom profile picture and cover picture
//without needing of passing down the props at each and every level we can use context api/redux
//so here what does redux/context does is when we log in to the system the redux/context state so it includes our current
//user,when we are going to login it is going to store id,profile picture mail etc so if post needs the userid i will
//just fetch from the context/redux state,so we will just have a common state here (we are not gonna ask parent anymore)
//context api is not exactly state management,its just passing down the props to entire pages or components,but if we are
//creating small applications and we need only current user and its not gonna change too often,so we can use context
//but if we create huge application and change more states more often then we can use redux
//if i click on profile image i would direct to profile page