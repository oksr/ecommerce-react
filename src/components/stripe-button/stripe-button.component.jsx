import React from 'react';
import swal from 'sweetalert';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishablekey = 'pk_test_ikQgoWR1gRDF67Qynoq8TAEp00zU1JpYFA';

    const onToken = token => {
        console.log(token);
        swal("Payment Sucssesfull!", "Well done!", "success");
    }

    return (
        <StripeCheckout
        label='Safe payment'
        name='OfekSeroussi Ltd.'
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/CUz.svg'
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishablekey}
        />
    );
};

export default StripeCheckoutButton;
