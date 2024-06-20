--1
CREATE OR REPLACE PROCEDURE retail_sale(bisbn IN books.isbn%TYPE, fin_price OUT NUMBER)
AS
    cat books.category%TYPE;
    retail books.retail%TYPE;
    
BEGIN
    SELECT category,retail INTO cat, retail
    FROM books WHERE isbn=bisbn;
    IF cat='COMPUTER' THEN
        fin_price := 0.7*retail;
    ELSIF cat='FITNESS' THEN
        fin_price := 0.6*retail;
    ELSIF cat='BUSINESS' THEN
        fin_price := 0.8*retail;
    ELSE 
        fin_price := 0.9*retail;
    END IF;
END;
/
DECLARE
bisbn books.isbn%TYPE := '1059831198'; c number;
BEGIN
		retail_sale(bisbn,c);
        dbms_output.put_line('The final price: '||c);
END;
/
--2

CREATE OR REPLACE PROCEDURE awards(cid IN customers.customer#%TYPE, award OUT NUMBER)
AS 
    purchases NUMBER;
    rec_friends NUMBER;
    name VARCHAR2(40);
BEGIN
    SELECT firstname||' '||lastname INTO name 
    FROM customers WHERE customer#=cid;
    
    SELECT SUM(i.quantity) INTO purchases 
    FROM customers c
    INNER JOIN orders o USING(customer#)
    INNER JOIN orderitems i USING(order#) GROUP BY customer#
    HAVING(customer#=cid);
    
    SELECT COUNT(r.referred) INTO rec_friends 
    FROM customers c INNER JOIN customers r
    ON r.referred=c.customer# 
    group by c.customer# HAVING(c.customer#=cid);
    
    award := rec_friends*500+purchases*100;
    
    if award>=2000
    then 
        dbms_output.put_line('GOLD TIER');
    elsif award<2000 AND award>=1001
    then
        dbms_output.put_line('SILVER TIER');
    else
        dbms_output.put_line('BRONZE TIER');
    end if;
END;
/
DECLARE
 c number; 
 cid customers.customer#%TYPE := '1003'; 
BEGIN
		awards(cid,c);
END;
/
--3
CREATE OR REPLACE function retail_plustax_price (bisbn IN books.isbn%TYPE) RETURN NUMBER
AS
    fin_price NUMBER;
    retail books.retail%TYPE;
    discount books.discount%TYPE;
BEGIN
    SELECT retail, NVL(discount,0) into retail, discount
    FROM books where isbn=bisbn;
    fin_price := (retail*1.15)-discount;
    RETURN fin_price;
END;
/
SELECT title, retail_plustax_price(isbn)
FROM books where isbn='4981341710';
/
--4
CREATE OR REPLACE PROCEDURE cancel_unshipped_orders(cid IN customers.customer#%TYPE)
AS
BEGIN
    DELETE FROM orderitems WHERE order# IN 
    (SELECT o.order# FROM orders o INNER JOIN
    customers c USING(customer#) WHERE
    customer#=cid);
END;
/
DECLARE
    cid customers.customer#%TYPE := '1003'; 
BEGIN
    cancel_unshipped_orders(cid);
END;
/
--5
CREATE OR REPLACE function promo_type (bisbn IN books.isbn%TYPE) RETURN VARCHAR2
AS
    gift promotion.gift%TYPE;
BEGIN
    SELECT p.gift into gift
    FROM promotion p INNER JOIN
    BOOKS b ON b.retail BETWEEN p.minretail AND p.maxretail
    WHERE b.isbn=bisbn;
    RETURN gift;
END;
/
SELECT promo_type(isbn)
FROM books where isbn='4981341710';

/
ROLLBACK;