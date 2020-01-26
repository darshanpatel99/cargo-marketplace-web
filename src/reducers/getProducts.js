const getProducts=(
    state={
     products:   []
    }, 
    action) => {
        if(action.TYPE == "GET_PRODUCTS") {
            state = {...state, products: action.payload}
        }
        return state;
    }
    export default getProducts;

