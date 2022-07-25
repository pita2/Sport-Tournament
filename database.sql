create TABLE player(
    id SERIAL PRIMARY KEY,
    login VARCHAR,
    name VARCHAR(255),
    surname VARCHAR(255)
);
create TABLE tournament(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    begin_date DATE,
    end_date DATE,
    location VARCHAR,
    number_of_seats INT
);
create TABLE player_tournament(
    player_id INT REFERENCES player(id) ON DELETE CASCADE,
    tournament_id INT REFERENCES tournament(id) ON DELETE CASCADE,
    CONSTRAINT pk PRIMARY KEY (player_id, tournament_id)
);

