/*SHOP*/

DROP TABLE "ItemColour" PURGE;
DROP TABLE "Item" PURGE;
DROP TABLE "Colour" PURGE;

CREATE TABLE "Item" (
    item_id varchar2(4) PRIMARY KEY,
    name varchar2(20) UNIQUE NOT NULL,
    price number(4,2) NOT NULL CHECK(price>0.00),
    tax number(4,2) NOT NULL) ;
    
CREATE TABLE "Colour" (
    colour_id varchar2(4)PRIMARY KEY,
    colour varchar2(10) UNIQUE NOT NULL) ;
    
CREATE TABLE "ItemColour" (
    item_id varchar2(4) REFERENCES "Item"(item_id) ON DELETE CASCADE,
    colour_id varchar2(4) REFERENCES "Colour"(colour_id) ON DELETE CASCADE
    ) ;