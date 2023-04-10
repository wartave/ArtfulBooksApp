import qs from 'qs';

const STRIPE_SECRET_KEY='sk_test_51Mi4X9HlcUhpnikzKS4T03Yplflm4GT40yvkuWm7tAPwnOMVJlVapsNlf0iLbn9SLEit7COMaSsuLAtVtO5uO5rW00BMvvM4Gb'
const createPaymentIntent = async () => {
    try {
      const response = await fetch('https://api.stripe.com/v1/payment_intents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
        },
        body: qs.stringify({
          amount: 1000,
          currency: 'usd',
          metadata: {
            order_id: '12345',
          },
        }),
      });
  
      const data = await response.json();
      return data.client_secret;
    } catch (error) {
      console.error("createPaymentIntent error :"+error);
    }
  };
  
  export default createPaymentIntent;