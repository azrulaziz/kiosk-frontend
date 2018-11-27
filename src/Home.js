import React, { Component } from 'react'
import { connect } from 'react-redux'
import { receiveMatchInfo } from './Actions/Match'
import axios from 'axios'
import Header from './Header'
import './App.css';
import { Link } from 'react-router-dom'

class Home extends Component {
  constructor(props){
    super(props)
        this.state ={
          data : []
      }     
  }

  componentDidMount () {
    axios.get("https://demo.stubapp.com/api/match/listing")
    .then((response)=> {
        const mainMatch = response.data.filter(match => match.match_name === 'Kuala Lumpur FA vs Felcra FC');
        this.props.dispatch(receiveMatchInfo(mainMatch))
        var parsed = response.data;
        for (var x in parsed) {
          var str1 = parsed[x]["match_image"];
          var str2 = parsed[x]["poster"];
          var pattern = "images/";
          var str3 = str1.slice(str1.indexOf(pattern) + pattern.length);
          var str4 = str2.slice(str2.indexOf(pattern) + pattern.length);
          parsed[x]["match_image"] = str3;
          parsed[x]["poster"] = str4
        }

        this.setState({data: response.data})
        console.log(response)
    })
    .catch((err) => {
    })
  }
  render() {
    const {data} = this.state;
    const EventList = data.filter(d=>d.match_name === 'Kuala Lumpur FA vs Felcra FC').map((d) => 
    <div key={d.match_id}>
      <br/><br/>
      <h1 className="eventTitle">{d.match_name}</h1>
      <h1 className="eventDatenTime">{d.match_date_string} | {d.match_time} </h1>
      <br/><br/>
      <Link  to={{
        pathname: `/booking`,
        state: { detail: d },
      }}><img src={"https://stubapp.imgix.net/"+ d.match_image } alt="" className="EventBig"/></Link>
      <br/>
      <Link  to={{
        pathname: `/booking`,
        state: { detail: d },
      }}><button className="btnNext"> NEXT </button></Link>

    </div>,
  ) 
    return (
    <div>
      <Header/>
      {EventList}
      
      <br/><br/><br/>
    </div>
    )
  }
}
export default connect()(Home)