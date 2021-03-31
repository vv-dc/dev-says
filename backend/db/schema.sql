CREATE TABLE users_info(
	info_id serial PRIMARY KEY,
	full_name varchar(255),
	bio text,
	avatar_path varchar(255),
	location varchar(80),
	company varchar(120),
	website varchar(255),
	created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
	user_id serial PRIMARY KEY,
    info_id int NOT NULL REFERENCES users_info,
	username varchar(120) NOT NULL UNIQUE,
	email varchar(255) NOT NULL UNIQUE,
	password varchar(120) NOT NULL,
	is_admin boolean DEFAULT FALSE
);

CREATE TABLE refresh_tokens (
    token_id bigserial PRIMARY KEY,
    user_id int NOT NULL REFERENCES users ON DELETE CASCADE,
    refresh_token uuid NOT NULL,
    ua varchar(255) NOT NULL,
    fingerprint varchar(200) NOT NULL,
    ip varchar(45) NOT NULL,
    expires_in bigint NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE tags (
	tag_id serial PRIMARY KEY,
	tag_name varchar(80) NOT NULL UNIQUE
);

CREATE TABLE tag_subscriptions (
	subscriber_id int REFERENCES users,
	tag_id int REFERENCES tags,
	PRIMARY KEY(subscriber_id, tag_id)
);

CREATE TABLE followers (
	followed_id int REFERENCES users,
	follower_id int REFERENCES users,
	PRIMARY KEY(followed_id, follower_id)
);

CREATE TABLE posts (
	post_id bigserial PRIMARY KEY,
	owner_id int NOT NULL REFERENCES users,
	title text NOT NULL,
	content_file varchar(255) NOT NULL UNIQUE,
	is_public boolean DEFAULT TRUE,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookmarks (
	user_id int REFERENCES users,
	post_id bigint REFERENCES posts,
	PRIMARY KEY(user_id, post_id)
);

CREATE TABLE post_tags (
	post_id bigint REFERENCES posts,
	tag_id int REFERENCES tags,
	PRIMARY KEY(post_id, tag_id)
);

CREATE TABLE comments (
	comment_id bigserial PRIMARY KEY,
	post_id bigint NOT NULL REFERENCES posts,
	author_id int NOT NULL REFERENCES users,
    parent_comment_id bigint REFERENCES comments,
	content json NOT NULL,
	sent_at timestamp DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp DEFAULT CURRENT_TIMESTAMP
);
