/* The script doesn't follow the case design at this point.
It's now fixed to make it super simple to save the image to db */

INSERT INTO Signature (image)
VALUES ('https://i.server.com/sig.png');

-- INSERT INTO Courier (name, phone_number, email)
-- VALUES 
--     ('John Doe', '333-234245', 'john.doe@email.com'),
--     ('Mary Jane', '245-984832', 'mary.jane@email.com');

-- INSERT INTO Recipient (name, phone_number, email)
-- VALUES 
--     ('Jane Doe', '243-565453', 'jane.doe@email.com'),

-- INSERT INTO `Order` (delivered_address, picked_up_at, delivered_at)
-- VALUES ('234 Street, 00100 Helsinki');