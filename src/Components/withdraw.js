import React, { useContext } from "react";
import { UserContext, Form, Info, validateLogin } from './utilities';


const Withdraw = () => {
  const context = useContext(UserContext);
  const header = "Withdraw";
  const elems = [
    {elem:"header", label:"Balance $", name:"current_balance", user:true, value:"balance"},
    {elem:"input", type:"number", step:"0.01", label:"Withdraw Amount", name:"transaction", holder:"Withdraw Amount", value:"", focus:true},
    {elem:"input", type:"hidden", name:"email", user:true, value:"email"}
  ];

const handle = (data) => {
  data.transaction = data.transaction.length === 0 ? 0 : parseFloat(data.transaction);
  for (let i=0; i< context.length; i++) {
    if (context[i].email === data.email) {
      if ((context[i].balance - data.transaction) < 0) {
        return "Transaction Failed: The amount required can't exceed your balance";
      } else {
        let oldBalance = parseFloat(context[i].balance);
        let transaction = data.transaction * -1;
        let newBalance = Math.round(((oldBalance + transaction) + Number.EPSILON) * 100) / 100;
        let transactions = [...context[i].transactions,...[{starting:oldBalance, transaction:transaction, ending:newBalance}]];
        context[i].transactions = [...transactions];
        context[i].balance = newBalance;
        return true;
      }
    }
  }
  return "Error: user not found";
}
  if (!(validateLogin(context, "Deposit"))) {
    return (
      <Info
        header={header}
        title="No user logged in"
        text={`Please log in to make a ${header.toLowerCase()}.`}
      />
    )
  } else {
    return (
      <Form
        header={header}
        success={`Take another ${header.toLowerCase()}`}
        handle={handle}
        elems={elems}
        users={context}
      />
    )
  }
}

export default Withdraw;