export const websocket = new WebSocket("ws://localhost:1337");
const noteDispenser = new WebSocket("ws://localhost:1338");
const coinDispenser = new WebSocket("ws://localhost:1339");
const printer = new WebSocket("ws://localhost:1340");

export const initiateWS = () => {
    
    websocket.onopen = (evt) => {
        console.log(evt, "onopen from the front")
    }

    printer.onopen = () => {
        console.log("printer on")
    }

    noteDispenser.onopen = (evt) => {
        console.log(evt, "note dispenser")
    }

    coinDispenser.onopen = (evt) => {
        console.log(evt, "coin dispenser");
    }

}

export const sendBillAcceptor = (msg) => {
    websocket.send(msg)
}

export const sendNoteDispenser = (msg) => {
    noteDispenser.send(msg)
}