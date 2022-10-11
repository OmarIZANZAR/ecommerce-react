import * as ACT from '../actions/actions'

const reducer = (state, {type, payload}) => {
    switch(type){
        case ACT.SET_PRODUCTS:
            return {
                ...state,
                products: {
                    loading: false,
                    sortby: "SORT_TIME_DOWN",
                    content: {
                        ...payload,
                        data: payload.data.sort((a, b) => {
                            if(a.createdAt > b.createdAt){
                                return -1
                            } else if(a.createdAt > b.createdAt){
                                return 1
                            } else {
                                return 0
                            }
                        }),
                    }
                },
            };
    
        case ACT.SET_BELT:

            for(let i = 0; i < 20; i++){
                if(i < 10){
                    state.belt.content.firstBelt[i] = payload.data[i]
                }else{
                    state.belt.content.secondBelt[i - 10] = payload.data[i]
                }
            }

            return state.belt.loading ? {
                ...state,
                belt: {
                    loading: false,
                    content: {
                        firstBelt: state.belt.content.firstBelt,
                        secondBelt: state.belt.content.secondBelt,
                    }
                },
            } : state;
        
        case ACT.SET_PRODUCTS_LOADING:
            return {
                ...state,
                products: {
                    ...state.products,
                    loading: payload,
                },
            };

        case ACT.SORT_PRICE_UP:
            return {
                ...state,
                products: {
                    ...state.products,
                    sortby: type,
                    content: {
                        ...state.products.content,
                        data: state.products.content.data.sort((a, b) => {
                            if(a.price < b.price){
                                return -1
                            } else if(a.price > b.price){
                                return 1
                            } else {
                                return 0
                            }
                        }),
                    }
                },
            };

        case ACT.SORT_PRICE_DOWN:
            return {
                ...state,
                products: {
                    ...state.products,
                    sortby: type,
                    content: {
                        ...state.products.content,
                        data: state.products.content.data.sort((a, b) => {
                            if(a.price < b.price){
                                return 1
                            } else if(a.price > b.price){
                                return -1
                            } else {
                                return 0
                            }
                        }),
                    }
                },
            };

        case ACT.SORT_TIME_DOWN:
            return {
                ...state,
                products: {
                    ...state.products,
                    sortby: type,
                    content: {
                        ...state.products.content,
                        data: state.products.content.data.sort((a, b) => {
                            if(a.createdAt > b.createdAt){
                                return -1
                            } else if(a.createdAt > b.createdAt){
                                return 1
                            } else {
                                return 0
                            }
                        }),
                    }
                },
            };

        case ACT.SORT_TIME_UP:
            return {
                ...state,
                products: {
                    ...state.products,
                    sortby: type,
                    content: {
                        ...state.products.content,
                        data: state.products.content.data.sort((a, b) => {
                            if(a.createdAt < b.createdAt){
                                return -1
                            } else if(a.createdAt > b.createdAt){
                                return 1
                            } else {
                                return 0
                            }
                        }),
                    }
                },
            };

        case ACT.SET_CART:
            return {
                ...state,
                cart: {
                    ...state.cart,
                    loading: false,
                    content: payload,
                },
            };

        case ACT.TOGGLE_CART:
            return {
                ...state,
                cart: {
                    ...state.cart,
                    showCart: !state.cart.showCart,
                }
            };

        case ACT.CLOSE_CART:
            return {
                ...state,
                cart: {
                    ...state.cart,
                    showCart: false,
                }
            };

        case ACT.SET_CATEGORIES:
            return {
                ...state,
                categories: {
                    ...state.categories,
                    loading: false,
                    content: payload,
                }
            };

        default: return state
    }
}

export default reducer