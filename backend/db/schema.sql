CREATE TABLE "Users" (
	"userId" serial PRIMARY KEY,
	"username" varchar(120) NOT NULL UNIQUE,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" varchar(120) NOT NULL,
	"fullName" varchar(255),
	"avatarPath" varchar(255),
	"location" varchar(80),
	"company" varchar(120),
	"website" varchar(255),
	"bio" text,
	"isAdmin" boolean DEFAULT FALSE,
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "RefreshSessions" (
	"tokenId" bigserial PRIMARY KEY,
	"userId" int NOT NULL REFERENCES "Users" ON DELETE CASCADE,
	"refreshToken" uuid NOT NULL UNIQUE,
	"userAgent" varchar(255) NOT NULL,
	"fingerprint" varchar(200) NOT NULL,
	"expiresIn" bigint NOT NULL,
	"createdAt" timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE "Tags" (
	"tagId" serial PRIMARY KEY,
	"tagName" varchar(80) NOT NULL UNIQUE
);

CREATE TABLE "TagSubscriptions" (
	"subscriberId" int REFERENCES "Users",
	"tagId" int REFERENCES "Tags",
	PRIMARY KEY("subscriberId", "tagId")
);

CREATE TABLE "Followers" (
	"followedId" int REFERENCES "Users",
	"followerId" int REFERENCES "Users",
	PRIMARY KEY("followedId", "followerId")
);

CREATE TABLE "Posts" (
	"postId" bigserial PRIMARY KEY,
	"authorId" int NOT NULL REFERENCES "Users",
	"title" text NOT NULL,
	"contentFile" varchar(255) NOT NULL UNIQUE,
	"isPublic" boolean DEFAULT TRUE,
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Bookmarks" (
	"userId" int REFERENCES "Users",
	"postId" bigint REFERENCES "Posts",
	PRIMARY KEY("userId", "postId")
);

CREATE TABLE "PostTags" (
	"postId" bigint REFERENCES "Posts",
	"tagId" int REFERENCES "Tags",
	PRIMARY KEY("postId", "tagId")
);

CREATE TABLE "Comments" (
	"commentId" bigserial PRIMARY KEY,
	"postId" bigint NOT NULL REFERENCES "Posts",
	"authorId" int NOT NULL REFERENCES "Users",
	"parentCommentId" bigint REFERENCES "Comments",
	"content" json NOT NULL,
	"sentAt" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP
);
