import React, { Component } from 'react';
import {Link} from 'react-router-dom'
class AccountBalance extends Component {
    render() {
        return (
            <div>
              Your account balance: {this.props.accountBalance} 
            <Link to='/'>Home</Link>
            </div>
        );
    }
}

export default AccountBalance;