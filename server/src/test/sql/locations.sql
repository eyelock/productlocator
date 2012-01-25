/*
+----------------+---------------+------+-----+---------+----------------+
| Field          | Type          | Null | Key | Default | Extra          |
+----------------+---------------+------+-----+---------+----------------+
| id             | bigint(20)    | NO   | PRI | NULL    | auto_increment |
| active         | bit(1)        | YES  |     | NULL    |                |
| address01      | varchar(100)  | NO   |     | NULL    |                |
| address02      | varchar(100)  | YES  |     | NULL    |                |
| city           | varchar(100)  | NO   |     | NULL    |                |
| description    | varchar(1000) | YES  |     | NULL    |                |
| email          | varchar(255)  | YES  |     | NULL    |                |
| latitude       | float         | YES  |     | NULL    |                |
| longitude      | float         | YES  |     | NULL    |                |
| name           | varchar(255)  | NO   |     | NULL    |                |
| phone          | varchar(20)   | YES  |     | NULL    |                |
| postcode       | varchar(10)   | YES  |     | NULL    |                |
| twitter        | varchar(35)   | YES  |     | NULL    |                |
| url            | varchar(255)  | YES  |     | NULL    |                |
| version        | int(11)       | YES  |     | NULL    |                |
| country_id     | bigint(20)    | NO   | MUL | NULL    |                |
| icon_media_id  | bigint(20)    | YES  | UNI | NULL    |                |
| image_media_id | bigint(20)    | YES  | UNI | NULL    |                |
+----------------+---------------+------+-----+---------+----------------+
*/
START TRANSACTION;


SET @united_kingdom_id=(SELECT id FROM countries WHERE code = 'GB' LIMIT 1);


INSERT INTO locations (name, description, address01, address02, city, postcode, country_id, phone, email, url, twitter, latitude, longitude, active) VALUES
  ('Bacaro', 'Bacaro Description', 'Bacaro Address 01', 'Bacaro Address 02', 'Edinburgh', '', @united_kingdom_id, '', '', '', '', 55.95088, -3.20791, true )
, ('Bar Alba', 'Bar Alba Description', 'Bar Alba Address 01', 'Bar Alba Address 02', 'Edinburgh', '', @united_kingdom_id, '', '', '', '', 55.94695, -3.19844, true )
, ('Dirty Dicks', 'Dirty Dicks Description', 'Dirty Dicks Address 01', 'Dirty Dicks Address 02', 'Edinburgh', '', @united_kingdom_id, '', '', '', '', 55.95152, -3.20508, true )
, ('Maggie Dicksons', 'Maggie Dicksons Description', 'Maggie Dicksons Address 01', 'Maggie Dicksons Address 02', 'Edinburgh', '', @united_kingdom_id, '', '', '', '', 55.94785, -3.19555, true )
, ('Monteiths', 'Monteiths Description', 'Monteiths Address 01', 'Monteiths Address 02', 'Edinburgh', '', @united_kingdom_id, '', '', '', '', 55.95079, -3.1848, true )
, ('Sygn', 'Sygn Description', 'Sygn Address 01', 'Sygn Address 02', 'Edinburgh', '', @united_kingdom_id, '', '', '', '', 55.950972, -3.209435, true )
, ('The Jolly Judge', 'The Jolly Judge Description', 'The Jolly Judge Address 01', 'The Jolly Judge Address 02', 'Edinburgh', '', @united_kingdom_id, '', '', '', '', 55.94937, -3.19404, true )
, ('The Scotsman', 'The Scotsman Description', 'The Scotsman Address 01', 'The Scotsman Address 02', 'Edinburgh', '', @united_kingdom_id, '', '', '', '', 55.9532, -3.1899, true )
, ('The Standard', 'The Standard Description', 'The Standard Address 01', 'The Standard Address 02', 'Edinburgh', '', @united_kingdom_id, '', '', '', '', 55.95629, -3.20267, true )
, ('The Voodoo Rooms', 'The Voodoo Rooms Description', 'The Voodoo Rooms Address 01', 'The Voodoo Rooms Address 02', 'Edinburgh', '', @united_kingdom_id, '', '', '', '', 55.95367, -3.19051, true )
, ('Bamboo', 'Bamboo Description', 'Bamboo Address 01', 'Bamboo Address 02', 'Glasgow', '', @united_kingdom_id, '', '', '', '', 55.86447, -4.26425, true )
, ('Black Sparrow ', 'Black Sparrow  Description', 'Black Sparrow  Address 01', 'Black Sparrow  Address 02', 'Glasgow', '', @united_kingdom_id, '', '', '', '', 55.86604, -4.27219, true )
, ('Bunker', 'Bunker Description', 'Bunker Address 01', 'Bunker Address 02', 'Glasgow', '', @united_kingdom_id, '', '', '', '', 55.86438, -4.26257, true )
, ('Citation', 'Citation Description', 'Citation Address 01', 'Citation Address 02', 'Glasgow', '', @united_kingdom_id, '', '', '', '', 55.85884, -4.24836, true )
, ('Liquid Ship', 'Liquid Ship Description', 'Liquid Ship Address 01', 'Liquid Ship Address 02', 'Glasgow', '', @united_kingdom_id, '', '', '', '', 55.87213, -4.2724, true )
, ('McSorlies', 'McSorlies Description', 'McSorlies Address 01', 'McSorlies Address 02', 'Glasgow', '', @united_kingdom_id, '', '', '', '', 55.85721, -4.25774, true )
, ('Oran Mor', 'Oran Mor Description', 'Oran Mor Address 01', 'Oran Mor Address 02', 'Glasgow', '', @united_kingdom_id, '', '', '', '', 55.87737, -4.28912, true )
, ('Stravagin', 'We have our fingers firmly on the foodie pulse so our weird and wonderful wine and food dinners fill up quickly with curious customers willing to become gourmet guinea pigs! Recently the lucky lot have dined on wild foods- grey squirrel, rook, hedgerow herbs and sea urchins, and quaffed wines from around the world- including China, England, Tasmania and Lebanon. Watch this space for our up and coming events!', '28 Gibson Street', 'Kelvinbridge', 'Glasgow', 'G12 8NX', @united_kingdom_id, '0141 334 2665', '', 'http://www.stravaigin.co.uk/', 'StravaiginG12', 55.87261, -4.28259, true )
, ('The Arches', 'The Arches Description', 'The Arches Address 01', 'The Arches Address 02', 'Glasgow', '', @united_kingdom_id, '', '', '', '', 55.85837, -4.25833, true )
, ('The Brunswick Hotel', 'The Brunswick Hotel Description', 'The Brunswick Hotel Address 01', 'The Brunswick Hotel Address 02', 'Glasgow', '', @united_kingdom_id, '', '', '', '', 55.85884, -4.24836, true )
, ('The Republic Bier Halle', 'The Republic Bier Halle Description', 'The Republic Bier Halle Address 01', 'The Republic Bier Halle Address 02', 'Glasgow', '', @united_kingdom_id, '', '', '', '', 55.8602, -4.25513, true )
, ('The Republic Bier Halle West', 'The Republic Bier Halle West Description', 'The Republic Bier Halle West Address 01', 'The Republic Bier Halle West Address 02', 'Glasgow', '', @united_kingdom_id, '', '', '', '', 55.87382, -4.27632, true )
, ('The Sub Club', 'The Sub Club Description', 'The Sub Club Address 01', 'The Sub Club Address 02', 'Glasgow', '', @united_kingdom_id, '', '', '', '', 55.85797, -4.25769, true )
, ('The Two Figs', 'The Two Figs Description', 'The Two Figs Address 01', 'The Two Figs Address 02', 'Glasgow', '', @united_kingdom_id, '', '', '', '', 55.87091, -4.29928, true )
, ('Uniquitous Chip', 'Uniquitous Chip Description', 'Uniquitous Chip Address 01', 'Uniquitous Chip Address 02', 'Glasgow', '', @united_kingdom_id, '', '', '', '', 55.87462, 55.87229, true )
;


COMMIT;