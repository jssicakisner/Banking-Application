import React, { useState, useContext } from "react";
import { UserContext, validateLogin } from './utilities';


const NavBar = () => {
  const context = useContext(UserContext);
  const [selected, SetSelected] = useState("home");
  const links = [
    {name:"createAccount", href:"#/createaccount/", text:"Create Account", tooltip:"Create a New Bank Account"},
    {name:"login", href:"#/login/", text:"Login", tooltip:"Login to your Bank Account"},
    {name:"deposit", href:"#/deposit/", text:"Deposit", tooltip:"Deposit Into a User's Account", userhref:"#/login/", username:"login"},
    {name:"withdraw", href:"#/withdraw/", text:"Withdraw", tooltip:"Withdraw From a User's Account", userhref:"#/login/", username:"login"},
    {name:"allData", href:"#/allData/", tooltip:"All Accounts Information", text:"All Data"},
  ];
  
  const handleNavBar = (element) => (event) => {
    let link = validateLogin(context, element.name) ? element.name : element.username;
    SetSelected(link);
    window.location.href = validateLogin(context, element.name) ? element.href : element.userhref;
  }
  return(
    <nav className="navbar navbar-dark bg-dark navbar-expand-md" style={{padding: "0.75em"}} role="navigation">
      <a id="home" className="linkHover navbar-brand" onClick={handleNavBar({name:"home",href:"#"})} data-toggle="tooltip" data-placement="bottom" title="Main/Home Page" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Banking App</a>
      <button className="navbar-toggler collapsed ms-auto" data-bs-toggle="collapse" data-bs-target="#navbar-collapse">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbar-collapse">
        <ul className="navbar-nav">
          {links.map((element, index) => (
            <li key={element.name} className="nav-item" data-toggle="tooltip" data-placement="bottom" title={element.tooltip}>
              <a id={element.name} className={selected === element.name ? "linkNavActive nav-link" : "linkHover nav-link"} data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show" onClick={handleNavBar(element)}>{element.text}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;