SELECT image_url, name, price, product_id FROM vintage_products WHERE department = $1 
ORDER BY product_id DESC
LIMIT 4;