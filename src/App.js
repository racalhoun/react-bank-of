import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import UserProfile from './components/UserProfile'
import AccountBalance from './components/AccountBalance'

 import axios from 'axios'

class App extends Component {
  state={
    user:{
      userName: 'Ned',
      memberSince: 1900
    },
    accountBalance: 0,
    credits:[],
    debits:[]
  }
  componentWillMount(){
    axios.get('http://localhost:4000/credits')
    .then((res)=>{
      const credits = res.data
      this.setState({credits: credits})
    })
    axios.get('http://localhost:4000/debits')
    .then((res)=>{
      const debits = res.data
      this.setState({debits: debits})
    })
    .catch((error)=>{
      console.error('Error:', error);
    })
  }
  //had to cheat a little to understand the .reduce method- it helped
  getAccountBalance = ()=>{
      const creditsBalance = this.state.credits.reduce((creditsBalance, credits)=>{
        return creditsBalance + credits.amount
      },0)
      const debitsBalance = this.state.debits.reduce((debitsBalance, debits)=>{
        return debitsBalance + debits.amount
      },0)
      return creditsBalance - debitsBalance
  };
  render(){
  const accountBalance = this.getAccountBalance()  
  const accountBalanceWrapper = () =>{
    return (<AccountBalance accountBalance={this.state.accountBalance}/>)
  }
    const userProfileWrapper = ()=>{
      return (<UserProfile userName = {this.state.user.userName} memberSince = {this.state.user.memberSince}/> )
    }
    


    return (
        <Router>
          <Switch>
            <Route exact path='/' component ={Home}/>
            <Route exact path='/account' render={accountBalanceWrapper}/>
            <Route path='/:user' render={userProfileWrapper}/>
          </Switch>
        </Router>
    );
  }
}

export default App;
