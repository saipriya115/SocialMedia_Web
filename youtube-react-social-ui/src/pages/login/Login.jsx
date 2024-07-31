import "./login.css";
import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";

export default function Login() {
  //now i need to send this data of login page for that i am gonna use hook called useref
  const email=useRef()
  const password=useRef()
  const { user,isFetching, error,dispatch } = useContext(AuthContext);
  //you can use usestate hook here also but if you write password letter by letter it will cause rerendering we should try 
  //to prevent the rerendering

  const handleclick=(e)=>{
    e.preventDefault()//now its not gonna get refreshed
    //console.log(email.current.value)//when i click this its gonna refresh this page i dont want that
    //again we need to use dispatch also now how we will get the dispatch in authcontext we used value user,error,dispatch etc
    //we wrapped them inside provider so we could use those values anywhere hence we will use that dispatch
    //so i can take all properties from there hence for that i will use another hook here,called useContext
    loginCall({email:email.current.value,password:password.current.value},dispatch)
  }
  console.log(user)
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleclick}>
            <input placeholder="Email" type="email" className="loginInput" required ref={email} />
            <input placeholder="Password" type="password" className="loginInput" required  minLength="6"  ref={password} />
            <button className="loginButton" type="submit" disabled={isFetching}>{isFetching ? <CircularProgress color="white" size="20px"/> :"Login"}</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
//first is from login start and next id fromlogin success
//instead of loading i will just call this material component  
//i can make this proceess little slower by going to network