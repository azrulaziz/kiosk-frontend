import React, { Component } from 'react'
import './App.css';


export default class Header extends Component {
  render() {
    return (
      <div className = "topHeader">
        <img src={require('./image/logo1.png')}  alt="" className="logo1"/>
        <img src={require('./image/logo3.png')}  alt="" className="logo3"/>
        <br/>
      </div>
    )
  }
}
