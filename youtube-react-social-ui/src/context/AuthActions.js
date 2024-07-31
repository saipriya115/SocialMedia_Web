export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
  });
  //so i will take usercredentials here,during login email and password
  
  export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,//in payload i am gonna pass this user,and this is gonna go to our reducer
  });
  
  export const LoginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload:"error"//so if its error then its gonna take the error and pass to reducer
  });
  
 