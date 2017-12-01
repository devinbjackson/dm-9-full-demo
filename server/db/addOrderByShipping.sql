INSERT INTO vintage_orders (firstName, lastName, streetAddress, apt, city, stateName, zip, order_total, email) 
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING order_id;
