import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import {useEffect,useState} from "react"
import axios from "axios"
import {useParams} from "react-router"
export default function Profile() {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const [user,setuser]=useState({})
  const username=useParams().username//because in app.js we defined profile page /:username
  useEffect(()=>{
    const fetchUser=async ()=>{
      const res=await axios.get(`/users?username=${username}`)//here post we get as prop
      setuser(res.data)
    }//to obtain username from url itself we can use another hook called userparams
    
    fetchUser()
    //so i have to use async and wait then we will get the post info
    //but again i will get error that no proprty called profile picture so we will go to posts
  },[username])
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture || PF+"person/noCover.png"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture || PF+"person/noAvatar.png"}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username}/>
            <Rightbar user={user}/>
          </div>
        </div>
      </div>
    </>
  );
}
