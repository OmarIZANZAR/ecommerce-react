import * as ACT from './actions';
import Cookies from 'js-cookie';

const URL = process.env.REACT_APP_API_URL

// LISTS ALL THE PRODUCTS:
export const getProducts = (category, query, page = 1) => async (dispatch) => {
    let url = '/products/list'

    // set pagination
    let limit = 20
    let start = (page - 1) * limit
    url += `?_start=${start}&_limit=${limit}`

    // set query
    if(query?.length > 0){
        url += `&name_contains=${query}`
    }

    // set category
    if(category?.length > 0){
        url += `&categories.slug_contains=${category}`
    }

    try {
        dispatch({type: ACT.SET_PRODUCTS_LOADING, payload: true})

        const products = await fetch(URL + url).then(res => res.json())

        dispatch({type: ACT.SET_PRODUCTS, payload: products})
        dispatch({type: ACT.SET_BELT, payload: products})
    } catch (error) {
        console.log("CANNOT GET PRODUCTS", error)
    }
}

// LISTS ALL THE CATEGORIES:
export const getCategories = () => async (dispatch) => {
    try {
        const categories = await fetch(URL + "/categories/list")
            .then(res => res.json())
        
       
        dispatch({ type: ACT.SET_CATEGORIES, payload: categories })
    } catch (error) {
        console.log("CANNOT GET CATEGORIES", error)
    }
}

// RETRIEVE CART OR CREATE NEW ONE:
export const getCart = () => async (dispatch) => {
    const id = Cookies.get('guest_id')
    console.log("GET CART of id=", id)

    try {
        let guest;

        if ( !id ) {
            guest = await fetch(URL + '/guests/initiate').then(res => res.json())
            Cookies.set('guest_id', guest.data.id, { sameSite: 'Lax'})
        } else {
            guest = await fetch(URL + '/guests/retrieve/' + id).then(res => res.json())
        }

        console.log(guest)
        
        if(guest.data.id)
            dispatch({type: ACT.SET_CART, payload: guest.data})

    } catch (err) {
        console.log("CANNOT GET CART", err)
    }
}

// EMPTY CART:
export const emptyCart = () => async (dispatch) => {
    const id = Cookies.get('guest_id')
    console.log("EMPTY CART of id=", id)

    try {
        const guest = await fetch(URL + '/guests/empty/' + id, {
            method: 'PUT',
        }).then(res => res.json())

        if(guest.error){
            console.log(guest.message)
            return
        }

        console.log(guest)
        dispatch({type: ACT.SET_CART, payload: guest.data})
    } catch (error) {
        console.log("CANNOT EMPTY CART", error)
    }
}

// ADD ITEM TO CART:
export const addCartItem = (productId, sizeValue, quantity) => async (dispatch) => {
    const id = Cookies.get('guest_id')
    console.log("ADD ITEM TO CART of id=", id)

    try {
        const guest = await fetch(URL + "/guests/additem/" + id, {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                product: productId,
                size: sizeValue,
                quantity: quantity
            })
        }).then(res => res.json())

        if(guest.error){
            console.log(guest.message)
            return
        }

        console.log(guest)
        dispatch({ type: ACT.SET_CART, payload: guest.data })
    } catch (error) {
        console.log("CANNOT ADD ITEM TO CART", error)
    }
}

// DELETE ITEM IN CART:
export const deleteCartItem = (itemId) => async (dispatch) => {
    const id = Cookies.get('guest_id')
    console.log("DELETE ITEM IN CART of id=", id)

    try {
        const guest = await fetch(URL + '/guests/deleteitem/' + id, {
            method: "PUT",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                item_id: itemId
            })
        }).then(res => res.json())

        if(guest.error){
            console.log(guest.message)
            return
        }

        console.log(guest)
        dispatch({type: ACT.SET_CART, payload: guest.data})
    } catch (error) {
        console.log("CANNOT DELETE PRODUCT", error)
    }
}

// UPDATE ITEM QUANTITY IN CART:
export const updateCartItem = (itemId, quantity) => async (dispatch) => {
    const id = Cookies.get('guest_id')
    console.log("UPDATE ITEM IN CART of id=", id)

    try {
        const guest = await fetch(URL + '/guests/updateitem/' + id, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ item_id: itemId , quantity })
        }).then(res => res.json())

        if(guest.error){
            console.log(guest.message)
            return
        }

        console.log(guest)
        dispatch({type: ACT.SET_CART, payload: guest.data})
    } catch (error) {
        console.log("CANNOT UPDATE PRODUCT", error)
    }
}

// CREATE CHECKOUT FROM CART:
export const createCartCheckout = async (customerDetails) => {
    const id = Cookies.get('guest_id')
    console.log("CHECKOUT CART of id=", id)

    let ck
    try {
        if(id){
            ck = await fetch(URL + '/checkout/' + id, {
                method: "POST",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    customer_data: {
                        name: `${customerDetails.firstname} ${customerDetails.lastname}`,
                        email: customerDetails.email,
                        phone: customerDetails.phone,
                    },
                    shipping_data: {
                        country: customerDetails.country,
                        state: customerDetails.state,
                        city: customerDetails.city,
                        line1: customerDetails.line1,
                        line2: customerDetails.line2,
                        postal_code: customerDetails.postalCode
                    }
                })
            }).then(res => res.json())
        }

        console.log("create checkout ", ck)

        return ck
    } catch (err) {
        console.log("COULD NOT CREAT CHECKOUT", err)
    }
}

// CREATE PAYMENT INTENT:
export const createPaymentIntent = async (ck_id, sm_id) => {
    try {
        const ckp = await fetch(URL + '/checkout/pay', {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                checkout_id: ck_id,
                selected_shipping_method: sm_id
            })
        }).then(res => res.json())

        console.log("create payment ", ckp)

        return ckp
    } catch (err) {
        console.log("COULD NOT CREAT CHECKOUT PAYMENT", err)
    }
}

// CREATE PAYMENT INTENT:
export const createOrder = async (ck_id, pi_id) => {
    try {
        const order = await fetch(URL + '/checkout/order', {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                checkout_id: ck_id,
                paymentIntent_id: pi_id
            })
        }).then(res => res.json())

        console.log("order ", order)

        return order
    } catch (err) {
        console.log("COULD NOT CREAT ORDER", err)
    }
}

// UI HANDLERS
export const closeCart = () => ({type: ACT.CLOSE_CART})
export const toggleCart = () => ({type: ACT.TOGGLE_CART})
export const sortTimeUp = () => ({type: ACT.SORT_TIME_UP})
export const sortTimeDown = () => ({type: ACT.SORT_TIME_DOWN})
export const sortPriceUp = () => ({type: ACT.SORT_PRICE_UP})
export const sortPriceDown = () => ({type: ACT.SORT_PRICE_DOWN})