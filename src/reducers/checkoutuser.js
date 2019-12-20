const DataReducer = (state = 0, action) => {
  switch(action.type) {
    case 'UPDATE_CHECKOUT': 
      return action.payload; 
    default: 
      return state; 
  }
};


export default DataReducer;