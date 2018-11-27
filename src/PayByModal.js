import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './TicketModal.css';

class PayByModal extends Component {


  render() {
    return (
      <div>
          <div className="modal fade" id="PayBy" role="dialog">
            <div className="modal-dialog modal-md" style={{ marginTop: '300px' }}>
            <div className="modal-content">
                <div className="modal-body" style={{ padding: '20px 20px', paddingBottom:'50px' }}>
                <div className="btnPaysection">
                <h3 className="paymentMethod">SELECT YOUR</h3>
                <h3 className="paymentMethod">PAYMENT METHOD</h3>
                <br/>
                <Link to="/payment"><button className="cash"> PAY BY CASH </button></Link>
                <br/><br/>
                <button className="fpx"> PAY BY FPX </button>
                </div>
                </div>
            </div>
            </div>
        </div>
      </div>
    )
  }
}
export default PayByModal