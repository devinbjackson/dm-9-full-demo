INSERT INTO vintage_order_line (order_id, product_id, product_price) 
VALUES ($1, $2, $3) RETURNING order_id, product_id;
