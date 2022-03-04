INSERT INTO Courier (name, phone_number, email)
VALUES 
    ('John Doe', '333-234245', 'john.doe@email.com'),
    ('Mary Jane', '245-984832', 'mary.jane@email.com');

INSERT INTO Recipient (name, phone_number, email)
VALUES 
    ('Jane Doe', '243-565453', 'jane.doe@email.com'),

INSERT INTO `Order` (delivered_address, picked_up_at, delivered_at)
VALUES ('234 Street, 00100 Helsinki');

INSERT INTO Signature (image, courier_id, recipient_id, order_id)
VALUES 
    (
        'https://i.server.com/sig.png', 
        '6d3bece3-9bb3-11ec-9ab0-00505691380c', 
        '3295e9b6-9bbc-11ec-9ab0-00505691380c',
        '004cae43-9bbd-11ec-9ab0-00505691380c'
    );