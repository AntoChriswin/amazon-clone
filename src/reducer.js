export const initialState = {
    basket: [],
    user: null,
};

export const getBasketTotal = (basket) =>
     basket?.reduce((amount,item) => item.price + amount,0);


function reducer (state,action) {
    console.log(action)
    switch(action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket:[...state.basket , action.item],
            };
            
        
        case 'REMOVE_FROM_BASKET':
            
            let newBasket = [...state.basket];
            const index = state.basket.findIndex((basketItem) => basketItem.id === action.id); 
            
            if (index>=0){
                newBasket.splice(index,1);
            }
            else{
                console.warn(`Cant remove product (id: ${action.id}) as its not in basket!`)
            }
            return {...state,
                basket: newBasket,
            };

        case "SET_USER":
            return{
                ...state,
                user: action.user
            }
        case "CLEAR_BASKET":
            return {
                ...state,
                basket: []
            }
        case "LOAD_BASKET":
            return {
                ...state,
                basket: action.basket
            }
        case "UPDATE_BASKET":
            return {
                ...state,
                basket: action.basket
            }
        default:
            return state;
    }
};

export default reducer;