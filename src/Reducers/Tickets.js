const ticketOrderDefaultState = {};

export default (state = ticketOrderDefaultState, action) => {
    switch(action.type) {
        case 'RECEIVE_TICKET_ORDER': 
            return {...action.payload}

        case 'DELETE_TICKET_ORDER':
            return {}

        default: 
            return state;
    }
}