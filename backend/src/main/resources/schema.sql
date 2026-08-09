CREATE TABLE IF NOT EXISTS messages (
    id BIGSERIAL PRIMARY KEY,
    sender_phone VARCHAR(11) NOT NULL,
    receiver_phone VARCHAR(11) NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    opened_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    phone VARCHAR(11) NOT NULL UNIQUE,
    remaining_message_count INTEGER NOT NULL
);
