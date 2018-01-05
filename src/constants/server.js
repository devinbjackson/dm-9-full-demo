const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production'
? '/api/stripe'
: '/api/stripe';

export default PAYMENT_SERVER_URL;