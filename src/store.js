import { createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers/reducer'

const initialState = {
    cart: {
        loading: true,
        showCart: false,
        content: {
            subtotal: 0,
            shipping: 0,
            total: 0,
            line_items: [],
            currency: "USD",
        }
    },

    belt: {
        loading: true,
        content: {
            firstBelt: [1,2,3,4,5,6,7,8,9,10],
            secondBelt: [1,2,3,4,5,6,7,8,9,10]
        }
    },

    products: {
        loading: true,
        sortby: "SORT_TIME_DOWN",
        content: {
            meta: {
                count: 0,
                pages_count: 0,
            },
            data: []
        }
    },

    categories: {
        loading: true,
        content: [],
    }
}

const middlwares = [thunk]

const Store = createStore(
    reducer, 
    initialState, 
    compose(applyMiddleware(...middlwares))
)

export default Store