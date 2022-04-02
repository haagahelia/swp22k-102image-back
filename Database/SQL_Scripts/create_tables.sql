/* The script doesn't follow the case design at this point.
It's now fixed to make it super simple to save the image to db */

CREATE TABLE IF NOT EXISTS Signature (
    id VARCHAR(36) NOT NULL DEFAULT (UUID()),
    image TEXT NOT NULL,
    signed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    PRIMARY KEY (id)
);

-- CREATE TABLE IF NOT EXISTS Courier (
--     id VARCHAR(36) NOT NULL DEFAULT (UUID()),
--     name VARCHAR(50),
--     phone_number VARCHAR(50) NOT NULL,
--     email VARCHAR(50) CHECK (email LIKE '%_@_%'),
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE IF NOT EXISTS Recipient (
--     id VARCHAR(36) NOT NULL DEFAULT (UUID()),
--     name VARCHAR(50),
--     phone_number VARCHAR(50) NOT NULL,
--     email VARCHAR(50) CHECK (email LIKE '%_@_%'),
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE IF NOT EXISTS `Order` (
--     id VARCHAR(36) NOT NULL DEFAULT (UUID()),
--     picked_up_address VARCHAR(50),
--     delivered_address VARCHAR(50) NOT NULL,
--     picked_up_at TIMESTAMP,
--     delivered_at TIMESTAMP,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE IF NOT EXISTS Signature (
--     id VARCHAR(36) NOT NULL DEFAULT (UUID()),
--     image BLOB NOT NULL,
--     signed_by_courier BOOLEAN DEFAULT 0,
--     signed_by_recipient BOOLEAN DEFAULT 0,
--     c_signed_at TIMESTAMP,
--     r_signed_at TIMESTAMP,
--     courier_id VARCHAR(36) NOT NULL,
--     recipient_id VARCHAR(36) NOT NULL,
--     order_id VARCHAR(36) NOT NULL,
--     PRIMARY KEY (id),
--     FOREIGN KEY (courier_id) REFERENCES Courier(id),
--     FOREIGN KEY (recipient_id) REFERENCES Recipient(id),
--     FOREIGN KEY (order_id) REFERENCES `Order`(id)
-- );