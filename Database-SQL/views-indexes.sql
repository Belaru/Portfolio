--1
CREATE OR REPLACE VIEW rent AS
SELECT c.name, customer_id,movieid,m.title,r.due
FROM jnilakantan.test_customer c 
JOIN jnilakantan.test_rentals r USING(customer_id)
JOIN jnilakantan.test_movies m USING(movieid)
; 

SELECT * FROM rent
WHERE due = 
    (SELECT MIN(due) 
    FROM rent);
    
/
--2
CREATE INDEX genres ON jnilakantan.test_movies(genre,title);
/
--3
CREATE OR REPLACE VIEW number_of_rents AS
SELECT m.genre, COUNT(r.customer_id) AS rents FROM
jnilakantan.test_movies m JOIN
jnilakantan.test_rentals r USING(movieid)
GROUP BY genre;
/
SELECT * FROM number_of_rents;
/
--4
--FETCH - EXIT - dbms
CREATE OR REPLACE PROCEDURE movies_due( name IN jnilakantan.test_customer.name%TYPE)
AS
    CURSOR dmovies IS 
    SELECT m.title, r.due from jnilakantan.test_movies m
    INNER JOIN jnilakantan.test_rentals r USING(movieid)
    INNER JOIN jnilakantan.test_customer c USING(customer_id)
    WHERE c.name=name ; 
    RECORD dmovies%ROWTYPE;
BEGIN
    dbms_output.put_line('Client: '||name);
    open dmovies;
    loop
        fetch dmovies into record;
        EXIT WHEN dmovies%NOTFOUND OR dmovies%NOTFOUND IS NULL;
        dbms_output.put_line('Movie: '||record.title||' DUE: '||record.due);
    end loop;
    close dmovies;

END;
/
DECLARE
    c jnilakantan.test_customer.name%TYPE := 'Jovan';
BEGIN
    movies_due(c);
END;
/
EXECUTE movies_due('Jovan');
/
--5
CREATE OR REPLACE FUNCTION cust_tot_rents( mname IN jnilakantan.test_customer.name%TYPE) RETURN NUMBER  
AS
    num_of_rents NUMBER;
BEGIN
    SELECT COUNT(r.movieid)  INTO num_of_rents FROM jnilakantan.test_rentals r 
    INNER JOIN jnilakantan.test_customer c USING(customer_id)
    GROUP BY c.name HAVING(name=mname);
    RETURN num_of_rents;
END;
/
DECLARE
 c NUMBER := cust_tot_rents('Jovan');
BEGIN
    dbms_output.put_line(c);
END;
/
--6
--Cant use SELECT FROM employee because trigger is based on employee
DROP TRIGGER new_manager;
CREATE OR REPLACE TRIGGER new_manager AFTER UPDATE
ON employee
FOR EACH ROW
DECLARE
BEGIN
        dbms_output.put_line(:OLD.name||'  '||:OLD.employeeid);
END;
/
UPDATE employee SET managerid=12 WHERE name='Amy';
/
ROLLBACK;

