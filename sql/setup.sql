DROP TABLE IF EXISTS hamburger;

CREATE TABLE hamburger (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    name TEXT NOT NULL,
    description TEXT,
    toppings TEXT
);

