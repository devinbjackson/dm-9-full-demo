INSERT INTO vintage_orders (firstName, lastName, streetAddress, apt, city, stateName, zip, order_total, email, vintage_user_id )
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING order_id;
