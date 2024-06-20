--Item
INSERT INTO "Item" 
(item_id,name,price,tax)
VALUES ('1','Sweater','15.00','1.50');
INSERT INTO "Item" 
(item_id,name,price,tax)
VALUES ('2','T-Shirt','10.00','1.00');
INSERT INTO "Item" 
(item_id,name,price,tax)
VALUES ('3','Jeans','20.00','2.00');
--extra 3
INSERT INTO "Item" 
(item_id,name,price,tax)
VALUES ('4','Dress','20.00','2.00');
INSERT INTO "Item" 
(item_id,name,price,tax)
VALUES ('5','Skirt','18.00','1.80');
INSERT INTO "Item" 
(item_id,name,price,tax)
VALUES ('6','Jacket','30.00','3.00');
--Colour
INSERT INTO "Colour" 
(colour_id,colour)
VALUES ('1','Red');
INSERT INTO "Colour" 
(colour_id,colour)
VALUES ('2','Yellow');
INSERT INTO "Colour" 
(colour_id,colour)
VALUES ('3','Black');
INSERT INTO "Colour" 
(colour_id,colour)
VALUES ('4','Blue');
--extra 2
INSERT INTO "Colour" 
(colour_id,colour)
VALUES ('5','Purple');
INSERT INTO "Colour" 
(colour_id,colour)
VALUES ('6','Green');
--ItemColour
INSERT INTO "ItemColour"  
(colour_id,item_id)
VALUES ('4','1');
INSERT INTO "ItemColour"  
(colour_id,item_id)
VALUES ('3','1');
INSERT INTO "ItemColour"  
(colour_id,item_id)
VALUES ('3','2');
INSERT INTO "ItemColour"  
(colour_id,item_id)
VALUES ('2','2');
INSERT INTO "ItemColour"  
(colour_id,item_id)
VALUES ('1','2');
INSERT INTO "ItemColour"  
(colour_id,item_id)
VALUES ('4','3');
--extra 3
INSERT INTO "ItemColour"  
(colour_id,item_id)
VALUES ('5','4');
INSERT INTO "ItemColour"  
(colour_id,item_id)
VALUES ('6','5');
INSERT INTO "ItemColour"  
(colour_id,item_id)
VALUES ('3','6');

COMMIT;
--Query colour of clothes which price>avg
Select c.colour from "Colour" c
INNER JOIN "ItemColour" ic
USING(colour_id)
INNER JOIN "Item" i
USING(item_id)
WHERE i.price>
    (SELECT AVG(price) 
    FROM "Item");
    
--avg price of all clothes that are red
Select AVG(i.price) from "Colour" c
INNER JOIN "ItemColour" ic
USING(colour_id)
INNER JOIN "Item" i
USING(item_id) 
WHERE c.colour='Red'
GROUP BY c.colour;

--PARTII

SAVEPOINT newtax;
UPDATE "Item" SET tax='1.50' WHERE (price>10 OR price=10);

SAVEPOINT tshirttax;
UPDATE "Item" SET tax='0.50' WHERE name='T-Shirt';


SELECT c.colour, i.price+i.tax "On Sale" from "Colour" c
INNER JOIN "ItemColour" ic 
USING(colour_id)
INNER JOIN "Item" i
USING(item_id)
WHERE i.name='T-Shirt'
GROUP BY c.colour, i.price+i.tax;

ROLLBACK TO SAVEPOINT newtax;
  --Q#2
SELECT c.colour, i.price+i.tax "On Sale" from "Colour" c
INNER JOIN "ItemColour" ic 
USING(colour_id)
INNER JOIN "Item" i
USING(item_id)
WHERE i.name='T-Shirt'
GROUP BY c.colour, i.price+i.tax;


