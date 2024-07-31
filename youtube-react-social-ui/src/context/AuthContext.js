import { createContext } from "react";
import AuthReducer from "./AuthReducer";
import { useReducer } from "react";
const INITIAL_STATE = {
    user:{
      _id:  "667fdfee6520609322fc45a7",
      
      username: "jeek",
      email: "jeek@email.com",
      password: "$2b$10$EFB.DCxKC/66PiAey8gb7Oi19f9WkKU2yNsPkGEhHY1uVvAMwxQMe",
      profilePicture: "",
      coverPicture: "",
      followers: [],
      followings: [
        "667f98f8bb5c8d6304027727"
      ],
      //so i gave here user not as null but the user jeek,now that will be stored in local storage so that we need not 
      //login again and again
      
    }, //user eill be null because we didint login
    isFetching: false,//this is gonna decide beginning and ending of process its gonna be false first,because we are not fetching 
    //anything at the beginning and 
    error: false,//it is false because at the beginning we dont have any error
  };
  //now i can create my context
  export const AuthContext = createContext(INITIAL_STATE);
  //to use this context i should wrap some of these components with my provider,what i mean is if i wrap the home component inside
  //then i can reach all the components inside home
  //so lets create this wrapper now 
  export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    return (
        <AuthContext.Provider
          value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch,
          }}
        >
         {children}
        </AuthContext.Provider>
      );
    };
    //so what is this children its gonna be my application it can be app.js,index.js what you want to wrap
    //so what is the usereducer here,so we have a user here he is gonna enter his credentials,after clicking login we are gonna 
    //go our actions we are gonna dispatch them,and then its gonna go to reducer,and this reducer will decide which properties
    //we are gonna update inside this initial state,what i mean by this is the initial state is like this there is no 
    //user,no fetching and no error,when user clicks this login button,its gonna go to our first action which is loginstart
    //and its gonna take our credentials for example (mail:j@gmail.com,password:john) after dispatching the action it is gonna
    //go to the reducer,and reducer will decide okay this is login start,so i should start fetching so isfetching is gonna
    //be true now,but there is no sucess or no failure so there is gonna be no user or no error,after that we are gonna
    //try to fetch our user,
    //after login start action we are gonna make a login request,we will have our user in postman,since we get the user it 
    //is gonna go to our second action(it is possibilty one because there could be error also),so its gonna dispatch login
    //success action,and its gonna take the response which we received in postman,so after that its gonna go to reducer,
    //its gonna say okay it is login success action,so i can update my user,so now user will not be null but it will be
    //everything which we received in response(user in postman),okay now so if its gonna be successfull there would be no
    //fetching anymore its gonna be false and if its successfull there is gonna be no error also,
    //now if we write wrong in email during login there is gonna be error called user not found,and this is our second 
    //possibility-loginfailure(error)-this action will be dispatched,its gonna take the error and pass to reducer,now reducer
    //will say okay it is login failure means fetching ended so it is false now and there is an error so error would be true now
    //and there is no user,so user:null
    //