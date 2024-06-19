--1
CREATE OR REPLACE PROCEDURE add_publisher ( pubid IN publisher.pubid%TYPE,
    name IN publisher.name%TYPE, contact IN publisher.contact%TYPE,
    phone IN publisher.phone%TYPE)
AS
    e_existing_author EXCEPTION; 
BEGIN 
    INSERT INTO publisher (pubid,name,contact,phone)
    VALUES (pubid,name,contact,phone);
    EXCEPTION
		WHEN DUP_VAL_ON_INDEX  THEN
      dbms_output.put_line('Publisher already exists');
      RAISE;
END;
/
BEGIN
    add_publisher('1','PRINTING IS US','TOMMIE SEYMOUR','000-714-8321');
    EXCEPTION WHEN OTHERS 
    THEN
    ROLLBACK;
END;
/
--2
CREATE OR REPLACE FUNCTION find_author (bisbn IN bookauthor.isbn%TYPE) RETURN VARCHAR2
AS
    fullname VARCHAR2(100);
    e_unexisting_isbn EXCEPTION; 
    e_too_many_rows EXCEPTION; 
BEGIN
    SELECT a.fname||' '||a.lname INTO fullname FROM author a INNER JOIN
    bookauthor b USING(authorid) WHERE isbn=bisbn;
    return fullname;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            dbms_output.put_line('Invalid isbn');
            return ' ';
        WHEN TOO_MANY_ROWS  THEN
            return 'Multiple authors';
END;
/
DECLARE
 author VARCHAR2(40):=find_author('0401140733');
BEGIN
    dbms_output.put_line(author);
END;
/
--3
DECLARE
     CURSOR book_title_author is SELECT isbn, title FROM books;
     RECORD book_title_author%ROWTYPE;
BEGIN
    open book_title_author;
    loop
        fetch book_title_author into record;
        EXIT WHEN book_title_author%NOTFOUND OR book_title_author%NOTFOUND IS NULL;
        dbms_output.put_line('Author: '||find_author(record.isbn));
        dbms_output.put_line('Their book: '||record.title);
    end loop;
    close book_title_author;
    
    EXCEPTION WHEN OTHERS 
    THEN ROLLBACK;
END;
/
--4
CREATE OR REPLACE TRIGGER employee_assist AFTER INSERT
ON orderassist
FOR EACH ROW
BEGIN
	DECLARE 
        customer_n VARCHAR2(40);
        employee_n employee.name%TYPE;
    BEGIN
        SELECT firstname||' '||lastname INTO customer_n
        FROM customers c INNER JOIN orders o USING(customer#)
        WHERE o.order#= :NEW.order#;
        SELECT name INTO employee_n FROM employee
        WHERE employeeid = :NEW.employeeid;
        dbms_output.put_line('Customer: '||customer_n);
        dbms_output.put_line('Helped by: '||employee_n);
    END;
END;
/
INSERT INTO ORDERASSIST (employeeid, order#) 
VALUES ('11','1020');
/
ROLLBACK;
