SELECT vo.order_id, product_id, vl.product_price, order_total FROM vintage_order_line vl
INNER JOIN vintage_orders vo ON vl.order_id = vo.order_id
WHERE vo.vintage_user_id = $1;