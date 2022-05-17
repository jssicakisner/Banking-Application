import React from "react";
import { Info } from './utilities';


const Home = () => {
  return (
    <Info
      header="Banking Application Portfolio Assignment"
      title="Welcome to the Bank"
      text="Create a New Account or Login to start"
      body={(<img src="bank.png" className="img-fluid" class="card-img-bottom" alt="Bank"/>)}
    />    
  );  
}

export default Home;