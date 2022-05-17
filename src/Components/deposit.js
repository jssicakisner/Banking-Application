import React, { useContext } from "react";
import { UserContext, Form, Info, validateLogin } from './utilities';


const Deposit = () => {
  const context = useContext(UserContext);
  const header = "Deposit";
  const elems = [
    {elem:"header", label:"Balance $", name:"current_balance", user:true, value:"balance"},
    {elem:"input", type:"number", step:"0.01", label:"Deposit Amount", name:"transaction", holder:"Deposit Amount", value:"", focus:true},
    {elem:"input", type:"hidden", name:"email", user:true, value:"email"}
  ]
  const handle = (data) => {
    data.transaction = data.transaction.length === 0 ? 0 : parseFloat(data.transaction);
    for (let i=0; i< context.length; i++) {
      if (context[i].email === data.email) {
        let oldBalance = parseFloat(context[i].balance);
        let transaction = data.transaction;
        let newBalance = Math.round(((oldBalance + transaction) + Number.EPSILON) * 100) / 100;
        let transactions = [...context[i].transactions,...[{starting:oldBalance, transaction:transaction, ending:newBalance}]];
        context[i].transactions = [...transactions];
        context[i].balance = newBalance;
        return true;
      }
    }
    return "User Not Found";
  }
  
  if (!(validateLogin(context, "Deposit"))) {
    return (
      <Info
        header={header}
        title="User is not logged in"
        text={`Log in to make a ${header.toLowerCase()}.`}
      />
    )
  } else {
    return (
      <Form
        header={header}
        success={`Add another ${header.toLowerCase()}`}
        handle={handle}
        elems={elems}
        users={context}
      />
    )
  }
}

export default Deposit;