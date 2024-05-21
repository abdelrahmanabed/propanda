import React from 'react'

const page = () => {
    const handlePayment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/paymob/create-intention', {
                amount: 99,
                currency: 'EGP',
                // Other payment details
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error creating payment intention:', error);
        }
    };

    return (
        <div>
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default page