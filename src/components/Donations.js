import React from 'react'

//field for showing dontation amounts
const Donations = ({ donations, targetedDonations }) => {
    return (
        <div>
            <h1>Lahjoitukset yhteensä</h1>
            <h4 className="mt-4 md-4">{donations.toLocaleString()}</h4>
            <h1>Kohdentamattomat lahjoitukset</h1>
            <h4 className="mt-4 md-4">{targetedDonations.toLocaleString()}</h4>
        </div>
    )
}

export default Donations