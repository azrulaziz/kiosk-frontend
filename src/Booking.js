import React, { Component } from 'react'
import Header from './Header'
import './App.css';
import { Link } from 'react-router-dom'
import TicketModal from './TicketModal'
// import PayByModal from './PayByModal'
import Modal from 'react-modal'

// const websocket = new WebSocket("ws://localhost:1337");

class Booking extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            ticket: '',
            limit:'',
            isOpen: false,
        }     
    }
    
    ticketSelected (d) {
       this.setState({ticket: d})
    }

    handleOpenPayModal = () => {
        this.setState({
            isOpen: true
        })
    }

    handleCloseModal = () => {
        this.setState({
          isOpen: false
        })
    }

  render() {
      console.log(this.state.pricingDetails);
      console.log(this.props.history.location.state)
      const data = this.props.history.location.state.detail
    //   const tiketLimit = this.props.history.location.state.detail.ticket_limit
      const TicketDetail = this.props.history.location.state.detail.pricings
      const detail = TicketDetail.map((d) => 
      <div key={d.pricing_id} >
        <div className="panel panel-default" onClick = {this.ticketSelected.bind(this, d)} 
        data-toggle="modal" data-target="#TicketModal">
            <div className="panel-body">
                <div className="row">
                    <div className="col-sm-4" >
                    <p>{d.seat_name} </p>
                    </div>
                    <div className="col-sm-2" >
                    <p>{d.gate_name}</p>
                    </div>
                    <div className="col-sm-3" >
                    <p>RM{(d.adult_price).toFixed(2)}</p>
                    </div>
                    <div className="col-sm-3" >
                    <p>RM {(d.child_price).toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
      </div>,
    )

    return (
    <div>
          <Header/>
          <br/>
          <img src={"https://stubapp.imgix.net/"+ data.poster } alt="" className="Eventlayout"/>
          <div className="container">
            <div className="row">
                <div className="col-sm-4" >
                <p className="ticketTitle">SEATING </p>
                </div>
                <div className="col-sm-2" >
                <p className="ticketTitle">GATE</p>
                </div>
                <div className="col-sm-3" >
                <p className="ticketTitle">ADULT</p>
                </div>
                <div className="col-sm-3" >
                <p className="ticketTitle">CHILD</p>
                </div>
            </div>
            <div className="ticketList">
                {detail}
            </div>
                <br/>
                <br/>
                <Link  to={{
                    pathname: `/`,
                }}>
                    <button className="btnBack"> 
                        BACK 
                    </button>
                </Link>
          </div>
          <br/><br/>
          <TicketModal 
            data={this.state.ticket} 
            limit={this.state.limit} 
            handleOpenPayModal={this.handleOpenPayModal}
            />
          <Modal
            isOpen={this.state.isOpen}
            onRequestClose={this.handleCloseModal}
            ariaHideApp={false}
            className="method__modal"
          >
            <div className="modal-content">
                <div className="modal-body" style={{ padding: '20px 20px', paddingBottom:'50px' }}>
                    <div className="btnPaysection">
                        <h3 className="paymentMethod">SELECT YOUR</h3>
                        <h3 className="paymentMethod">PAYMENT METHOD</h3>
                        <br/>
                        <Link to={{
                            pathname: '/payment',
                        }}>
                            <button className="cash"> PAY BY CASH </button>
                        </Link>
                        <br/><br/>
                        <button className="fpx"> PAY BY FPX </button>
                    </div>
                </div>
            </div>
          </Modal>
    </div>
    )
  }
}
export default Booking