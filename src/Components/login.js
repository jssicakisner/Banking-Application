import React, { useContext } from "react";
import { UserContext, Form } from './utilities';


const Login = () => {
  const context = useContext(UserContext);
  const elems = [
    {elem:"input", type:"input", label:"Email address", name:"email", holder:"Enter email", value:""},
    {elem:"input", type:"password", label:"Password", name:"password", holder:"Enter password", value:""}
  ]

  const handle = (data) => {
    context.map((user) => user.loggedIn = false)
    context.map((user) => {
      if (user.email === data.email && user.password === data.password) {
        user.loggedIn = true;
        document.getElementById('home').click();
        return true;
      }
    })
    return "Invalid Credentials";
  }
  
  return (
    <Form
      header="Login"
      handle={handle}
      elems={elems}
    />
  )
}

export default Login;