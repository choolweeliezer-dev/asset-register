CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(50) NOT NULL
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE assets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category_id INT NOT NULL,
    serial_number VARCHAR(100) UNIQUE,
    status VARCHAR(50) DEFAULT 'active',
    purchase_date DATE,
    cost NUMERIC(12,2),
    location VARCHAR(150),

    CONSTRAINT fk_assets_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE RESTRICT
);

CREATE TABLE maintenance_records (
    id SERIAL PRIMARY KEY,
    asset_id INT NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    cost NUMERIC(12,2),
    performed_by VARCHAR(150),

    CONSTRAINT fk_maintenance_asset
        FOREIGN KEY (asset_id)
        REFERENCES assets(id)
        ON DELETE CASCADE
);


CREATE TABLE asset_assignments (
    id SERIAL PRIMARY KEY,
    asset_id INT NOT NULL,
    user_id INT NOT NULL,
    assigned_date DATE NOT NULL,
    return_date DATE,

    CONSTRAINT fk_assignment_asset
        FOREIGN KEY (asset_id)
        REFERENCES assets(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_assignment_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    type VARCHAR(50) NOT NULL, -- monthly/yearly
    start_date DATE NOT NULL,
    end_date DATE,
    cost NUMERIC(12,2),
    status VARCHAR(50) DEFAULT 'active'
);

CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    subscription_id INT NOT NULL,
    amount NUMERIC(12,2) NOT NULL,
    payment_date DATE NOT NULL,
    method VARCHAR(50),

    CONSTRAINT fk_payment_subscription
        FOREIGN KEY (subscription_id)
        REFERENCES subscriptions(id)
        ON DELETE CASCADE
);

ALTER TABLE users
ADD COLUMN user_code VARCHAR(20) UNIQUE;

ALTER TABLE assets
ADD COLUMN asset_code VARCHAR(20) UNIQUE;

ALTER TABLE maintenance_records
ADD COLUMN maintenance_code VARCHAR(20) UNIQUE;

ALTER TABLE subscriptions
ADD COLUMN subscription_code VARCHAR(20) UNIQUE;

ALTER TABLE payments
ADD COLUMN payment_code VARCHAR(20) UNIQUE;


