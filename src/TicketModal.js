import React, { Component } from 'react'
import { connect } from 'react-redux'
import { receiveTicketOrder } from './Actions/Tickets'
import './TicketModal.css';


class TicketModal extends Component {
    constructor(props){
        super(props)
            this.state ={
              counterAdult: 1,
              counterChild: 0,
              limit: this.props.limit
          }     
      }
    
    addAdult() {
            this.setState({counterAdult: this.state.counterAdult+1})
    }

    minusAdult() {
        if (this.state.counterAdult > 1) {
             this.setState({counterAdult: this.state.counterAdult-1})
        }
    }

    addChild() {
        this.setState({counterChild: this.state.counterChild+1})
    }

    minusChild() {
        if (this.state.counterChild > 0) {
            this.setState({counterChild: this.state.counterChild-1})
        }
    }

    handleStoreDetails = () => {
        this.props.dispatch(receiveTicketOrder({
            adult: this.state.counterAdult,
            adultPrice: this.props.data.adult_price,
            child: this.state.counterChild,
            childPrice: this.props.data.child_price,
            seating: this.props.data.seat_name,
            gate: this.props.data.gate_name
        }))
        this.props.handleOpenPayModal();
    }

  render() {
      console.log(this.props)
      const priceAdult = this.state.counterAdult * this.props.data.adult_price;
      const priceChild = this.state.counterChild * this.props.data.child_price;
      const totalPrice = priceAdult + priceChild;
    return (
      <div className="container">
        <div className="modal fade" id="TicketModal" role="dialog">
            <div className="modal-dialog modal-lg">
            <div className="modal-content2">
                <div className="modal-header">
                <h4 className="modal-title">TICKET</h4>
                </div>
                <div className="modal-body">
                <div className="row">
                    <div className="col-sm-6">
                    <p className="modal-title">Seat </p>
                    <p className="modal-title">Gate </p>
                    </div>
                    <div className="col-sm-6">
                    <p  className="modal-title2">{this.props.data.seat_name}</p>
                    <p  className="modal-title2">{this.props.data.gate_name}</p>
                    </div>
                </div>
                <br/><br/>
                <h4 className="modal-title">SELECT QUANTITY</h4>
                </div>
                <div className="modal-footer">
                <div className="row">
                    <div className="col-sm-6" >
                    <p className="modal-title3">Adult </p>
                    <br/>
                    <p className="modal-title3">Child </p>
                    </div>
                    <div className="col-sm-6" style={{ textAlign: 'right' }}>
                    <button className="btnCounter"  onClick={this.minusAdult.bind(this)}> - </button>
                    <p className="counter">{this.state.counterAdult}</p> 
                    <button className="btnCounter" onClick={this.addAdult.bind(this)}> +</button> 

                    <br/><br/>

                    <button className="btnCounter" onClick={this.minusChild.bind(this)}> - </button>
                    <p className="counter">{this.state.counterChild}</p> 
                    <button className="btnCounter" onClick={this.addChild.bind(this)}> + </button>

                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-6">
                    <p className="modal-title3">TOTAL </p>
                    </div>
                    <div className="col-sm-6">
                    <p className="modal-title4">RM {(totalPrice).toFixed(2)} </p>
                    </div>
                </div>
                <br/><br/>
                <button type="button" className="btnCloseModal" data-dismiss="modal">BACK</button>
                <button 
                    type="button" 
                    className="btnOpenModal" 
                    data-dismiss="modal" 
                    data-toggle="modal" 
                    data-target="#PayBy"
                    onClick={this.handleStoreDetails}
                >
                    PAY
                </button>
                </div>
            </div>
            </div>
        </div>
      </div>
    )
  }
}
export default connect()(TicketModal)