const matchDefaultState = [];

export default (state = matchDefaultState, action) => {
    switch(action.type) {
        case 'RECEIVE_MATCH_INFO':
            return [...action.payload] 
        
        default: 
            return state;
    }
}