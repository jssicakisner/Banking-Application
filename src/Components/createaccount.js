import React, { useContext } from "react";
import { UserContext, Form } from './utilities';


const CreateAccount = () => {
  const context = useContext(UserContext);
  const elems = [
    {elem:"input", type:"input", label:"Name", name:"name", holder:"Enter name", value:"", focus:true},
    {elem:"input", type:"input", label:"Email address", name:"email", holder:"Enter email", value:""},
    {elem:"input", type:"password", label:"Password", name:"password", holder:"Enter password", value:""},
    {elem:"input", type:"hidden", name:"balance", value:"0"}
  ]

  const handle = (data) => {
    for (let i=0; i< context.length; i++) {
      if (context[i].email === data.email) {
        return "Email Already Exists";
      }
    }
    data.balance = data.balance.length === 0 ? 0 : parseFloat(data.balance);
    data.transactions=[];
    context.push(data);
    return true;
  }

  return (
    <Form
      header="Create Account"
      success="Add Another Account"
      handle={handle}
      elems={elems}
    />
  )
}

export default CreateAccount;