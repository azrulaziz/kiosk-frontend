import React from 'react'
import Header from './Header'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import './Payment.css'
import Ticket from './image/ticketIcon.svg'
import Loader from 'react-loader-spinner'
import { sendNoteDispenser, sendBillAcceptor, websocket } from './wsFunction.js'


// const websocket = new WebSocket("ws://localhost:1337");
const noteDispenser = new WebSocket("ws://localhost:1338");
const coinDispenser = new WebSocket("ws://localhost:1339");
const printer = new WebSocket("ws://localhost:1340");

class Payment extends React.Component {

    state = {
        total: 0,
        deduct: null,
        count: 0,
        inserted: 0,
        toBePaid: 0,
        balance: 0,
        indicator: [0],
        isOpen: false
    }

    componentWillMount() {
        this.setState({
            total: ((this.props.tickets.adult * this.props.tickets.adultPrice) + (this.props.tickets.child * this.props.tickets.childPrice)),
            toBePaid: ((this.props.tickets.adult * this.props.tickets.adultPrice) + (this.props.tickets.child * this.props.tickets.childPrice))
        })
    }

    componentDidMount() {
        
        this.connectToWebsocket();
        this.connectNoteDispenser();
        // this.connectCoinDispenser();
        this.connectPrinter();
    }

    componentDidUpdate(prevState) {
        if(this.state.deduct !== prevState.deduct) {
            console.log('updated');
        }
        if(this.state.indicator.reduce((x, y) => x + y) >= this.state.total) {
            this.testRun()
            this.setState({
                balance: this.state.indicator.reduce((x, y) => x + y) - this.state.total,
                indicator: [0]
            })
            // setTimeout(() => {
            //     noteDispenser.send('3')
            //     this.setState({
            //         count: 0,
            //         toBePaid: 5,
            //         indicator: [0],
            //     })
            // }, 5000)
        }
    }

    testRun = () => {
        // dispense balance here
        // call print ticket function here
        sendNoteDispenser(this.state.balance)
        var promise = new Promise(function(resolve, reject) {

            // call resolve if the method succeeds
          
            resolve(true);
          
          })
          
          promise.then(() => {
            
            this.testPrint()
          }).then(() => {
            console.log('test disablessss');
            sendBillAcceptor('5e')
                this.setState({
                    isOpen: true
                })
                setTimeout(() => {
                    this.props.history.push('/')
                    // set all state to default here
                }, 8000)
          })
    
}

    handleModalClose = () => {
        this.setState({
            isOpen: false
        })
    }

    connectPrinter = (evt) => {
        printer.onopen = () => {
            console.log("printer on")
        }
    }

    connectNoteDispenser = (evt) => {
        noteDispenser.onopen = () => {
            console.log(evt, "note dispenser")
            noteDispenser.send('02')
        }

    }

    connectCoinDispenser = (evt) => {
        coinDispenser.onopen = () => {
            console.log(evt, "coin dispenser");
            coinDispenser.send('80')
        }

        coinDispenser.onmessage = (evt) => {
            console.log(evt)
        }
    }

    connectToWebsocket = () => {
        websocket.onopen = (evt) => {
            console.log(evt, "onopen")
            sendBillAcceptor('3e')
        }
    
        websocket.onclose = (evt) => {
            console.log("onclose.");
        };
    
        websocket.onerror = (evt) => {
            console.log("Error!");
        };
    
        websocket.onmessage = (evt) => {
            console.log(evt.data)
            this.setState({deduct: evt.data})
            switch(evt.data) {
                case '64':
                    sendBillAcceptor('02')
                    this.setState({
                        indicator: this.state.indicator.concat(1)
                    })
                break;
                case '66':
                    websocket.send('02')
                    this.setState({
                        indicator: this.state.indicator.concat(5)
                    })
                break;
                case '67':
                    websocket.send('02')
                    this.setState({
                        indicator: this.state.indicator.concat(10)
                    })
                break;
                case '70':
                    websocket.send('02')
                    this.setState({
                        indicator: this.state.indicator.concat(20)
                    })
                break;
                case '68':
                    websocket.send('02')
                    this.setState({
                        indicator: this.state.indicator.concat(50)
                    })
                break;
                case '16':
                    this.setState({
                        count: this.state.indicator.reduce((x, y) => x + y),
                        toBePaid: this.state.total - this.state.indicator.reduce((x, y) => x + y)
                    })
                break;
                case '41':
                    const last = this.state.indicator.length - 1;
                    const indicatorLength = this.state.indicator.length;
                    if (indicatorLength === this.state.indicator.length) {
                        this.setState({
                            indicator: this.state.indicator,
                            count: this.state.indicator.reduce((x, y) => x + y)
                        })
                    } else {
                        this.setState({
                            indicator: this.state.indicator.filter((x, i) => i !== last),
                            count: this.state.indicator.filter((x, i) => i !== last).reduce((x, y) => x + y),
                            toBePaid: this.state.total - this.state.indicator.filter((x, i) => i !== last).reduce((x, y) => x + y)
                        })
                    }
                break;
                default:
                    console.log('default')
            }
        }
    }

    handleSendSignal = (sig) => {
        websocket.send(sig);
    }

    handleCancelPurchase = (note) => {

        if (this.state.count > 0) {
            noteDispenser.send(note)
            this.setState({
                count: 0,
                toBePaid: 5
            })
            sendBillAcceptor('5e')
            this.props.history.push('/')
        } else {
            this.props.history.push('/')
            sendBillAcceptor('5e')
        }
    }

    handleDispense = () => {
        noteDispenser.send('1');
    }

    handleCoinDispense = () => {
        coinDispenser.send('40')
    }

    handleInserted = () => {
        console.log(' TEST inserted');
    }

    testPrint = (count) => {
        let data = {
            name : this.props.match[0].match_name,
            date : this.props.match[0].match_date_string,
            venue : this.props.match[0].stadium_name,
            count : this.props.tickets.adult + this.props.tickets.child
        }

        let msg = JSON.stringify(data);
        printer.send(msg)
    }

    render() {
        console.log(this.props.match)
        sendBillAcceptor('3e')
        return (
            <div>
                <Header />
                {/*<button onClick={() => this.handleSendSignal('30')}>reset</button>
                <button onClick={() => this.handleSendSignal('0F')}>Reject</button>*/}
                <div className="payment">
                    <div className="payment__details">
                        <div className="payment__match">
                            <h1 className="payment__match-name">{this.props.match[0].match_name}</h1>
                            <p className="payment__p">{this.props.match[0].match_date_string} | {this.props.match[0].match_time} </p>
                            <p className="payment__p">{this.props.match[0].stadium_name}</p>
                        </div>
                        <div className="payment__summary">
                            <div>
                                <h3 className="payment__match-name">SUMMARY</h3>
                                <p className="payment__p">{this.props.tickets.seating} | Gate {this.props.tickets.gate}</p>
                            </div>
                            <div className="payment__summary-qty">
                                <h3 className="payment__match-name">Qty</h3>
                                <p className="payment__p">{this.props.tickets.adult + this.props.tickets.child}</p>
                            </div>
                            <div className="payment__summary-price">
                                <h3 className="payment__match-name">Price</h3>
                                <p className="payment__p">RM {this.state.total}</p>
                            </div>
                            </div>
                            <div className="payment__total">
                                <h1 className="payment__match-name">Total</h1>
                                <h1 className="payment__total-figures">RM {this.state.total}</h1>
                            </div>
                        </div>
                
                        <div className="payment__indicator">
                            <div className="payment__indicator-tobepaid">
                                <p className="payment__indicator-title">To be paid</p>
                                <h1 className="payment__indicator-price"> RM{this.state.toBePaid === 0 || this.state.count > this.state.total ? 0 : this.state.toBePaid}</h1>
                            </div>
                            <div className="payment__indicator-inserted">
                                <p className="payment__indicator-title">Inserted</p> 
                                <h1 className="payment__indicator-price"> RM{this.state.count}</h1>
                            </div>
                        </div>
                        
                        <button className="btnBack" onClick={() => this.handleCancelPurchase(this.state.count.toString())}>Cancel</button>
                        {/*<button onClick={() => this.setState({indicator: this.state.indicator.concat(20)})}>Test Pay</button>
                        
                        <button onClick={() => this.testPrint(1)}>Test Print</button>*/}
                        <Modal
                            isOpen={this.state.isOpen}
                            onRequestClose={this.handleModalClose}
                            ariaHideApp={false}
                            className="payment__modal"
                        >   
                            <div className="payment__modal-wrapper">
                                <img src={Ticket} alt="" width="80" height="80"/>
                                <h1 className="payment__match-name">Thank You</h1>
                                <p className="payment__p">Your ticket is printing. Enjoy Your Game.</p>
                                <div className="payment__modal-balance">
                                    <p className="payment__indicator-title">Your Balance</p> 
                                    <h1 className="payment__indicator-price"> RM 
                                    {/*this.state.count > this.state.total ? */}
                                        <span>{this.state.balance}</span>
                                        {/*:
                                        <span> 0</span>
                                    }*/}
                                    </h1>
                                </div>
                                <br />
                                <Loader type="Oval" color="#000" height={40} width={40}/>
                            </div>
                        </Modal>
                        {/*<button onClick={this.handleDispense}>Dispense</button>
                        <button onClick={this.handleCoinDispense}>Coin Dispense</button>*/}
                </div>
            </div>  
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tickets: state.Tickets,
        match: state.Match
    }
}

export default connect(mapStateToProps)(Payment);