import React from 'react'

const CostumerInfoForm = ({
    customerDetails, 
    setCustomerDetails, 
    shippingMethods, 
    setShippingMethod
}) => {
    return (
        <div className="form-container">

            <div className="form-header">
                <h2><span className="form-header-step">1</span>Costumer details:</h2>
            </div>

            <form className="shipping-form" id="costumer-details-form">
                <div className="horizontal-inputs">
                    <div className="input-group">
                        <label htmlFor="firstNameInput" className="input-label">Firstname *</label>
                        <input
                            required
                            type="text" 
                            id="firstNameInput"
                            name="first-name-input"
                            className="input-field" 
                            placeholder="Firstname"
                            value={customerDetails.firstname}
                            onChange={(e) => setCustomerDetails({...customerDetails, firstname: e.target.value})}
                        />
                    </div>

                    <div  className="input-group">
                        <label htmlFor="lastNameInput" className="input-label" >Lastname *</label>
                        <input
                            required
                            type="text" 
                            id="lastNameInput" 
                            className="input-field" 
                            placeholder="Lastname"
                            value={customerDetails.lastname}
                            onChange={(e) => setCustomerDetails({...customerDetails, lastname: e.target.value})}
                        />
                    </div>
                </div>
                
                <div  className="input-group">
                    <label htmlFor="emailInput" className="input-label">Email</label>
                    <input
                        type="email" 
                        id="emailInput" 
                        className="input-field" 
                        placeholder="exemple@email.xyz"
                        value={customerDetails.email}
                        onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
                    />
                </div>

                <div  className="input-group">
                    <label htmlFor="phoneInput" className="input-label">Phone Number *</label>
                    <div className="phone-input">
                        <span>+212</span>
                        <input
                            required
                            type="tel"
                            pattern="[0-9]{9}"
                            id="phoneInput" 
                            className="input-field" 
                            placeholder="phone number"
                            value={customerDetails.phone}
                            onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                        />
                    </div>
                </div>

                <div  className="input-group">
                    <label htmlFor="countryInput" className="input-label" >Country *</label>
                    <input
                        required
                        type="text" 
                        id="countryInput" 
                        className="input-field" 
                        placeholder="country"
                        value={customerDetails.country}
                        onChange={(e) => setCustomerDetails({...customerDetails, country: e.target.value})}
                    />
                </div>

                <div  className="input-group">
                    <label htmlFor="regionInput" className="input-label" >State *</label>
                    <input
                        required
                        type="text" 
                        id="regionInput" 
                        className="input-field" 
                        placeholder="region"
                        value={customerDetails.state}
                        onChange={(e) => setCustomerDetails({...customerDetails, state: e.target.value})}
                    />
                </div>

                <div  className="input-group">
                    <label htmlFor="cityInput" className="input-label" >City *</label>
                    <input
                        required
                        type="text" 
                        id="cityInput" 
                        className="input-field" 
                        placeholder="city"
                        value={customerDetails.city}
                        onChange={(e) => setCustomerDetails({...customerDetails, city: e.target.value})}
                    />
                </div>

                <div  className="input-group">
                    <label htmlFor="addressInput" className="input-label" >Address *</label>
                    <textarea
                        required
                        id="addressInput" 
                        className="input-field"
                        placeholder="Adress, City, street..."
                        value={customerDetails.line1}
                        onChange={(e) => setCustomerDetails({...customerDetails, line1: e.target.value})}
                    />
                </div>

                <div  className="input-group">
                    <label htmlFor="addressInput" className="input-label" >Address compliment *</label>
                    <textarea
                        required
                        id="addressInput" 
                        className="input-field"
                        placeholder="Block, Level, Door..."
                        value={customerDetails.line2}
                        onChange={(e) => setCustomerDetails({...customerDetails, line2: e.target.value})}
                    />
                </div>

                <div  className="input-group">
                    <label htmlFor="phoneInput" className="input-label">Postal Code*</label>
                    <input
                        required
                        type="text" 
                        id="phoneInput" 
                        className="input-field" 
                        placeholder="postal code"
                        value={customerDetails.postalCode}
                        onChange={(e) => setCustomerDetails({...customerDetails, postalCode: e.target.value})}
                    />
                </div>

                <div  className="input-group">
                    <label htmlFor="regionInput" className="input-label" >Shipping method*</label>
                    <select 
                        className="input-field" 
                        onChange={(e) => setShippingMethod(e.target.value)}
                        required
                    >
                        <option value={null} >please select a shipping method</option>
                        { shippingMethods.length > 0 ? ( shippingMethods.map((sm,i) => (
                            <option value={sm.id} key={i}>{sm.name} {sm.price} MAD</option>
                        ))) : "" }
                    </select>
                </div>
            </form>
        </div>
    )
}

export default CostumerInfoForm
