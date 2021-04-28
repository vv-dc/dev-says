CREATE OR REPLACE FUNCTION "getCommentsByPostAndParent"("post" int, "parent" int)
RETURNS TABLE (
	"username" varchar(120),
	"imageURL" varchar(255),
	"id" bigint,
	"parentId" bigint,
	"rawContent" text,
	"postedAt" timestamp,
  "updatedAt" timestamp,
	"replies" bigint
) AS $$
DECLARE
	"parentCondition" text := 'IS NULL';
BEGIN 
	IF "parent" IS NOT NULL THEN 
		"parentCondition" := format('= %s', "parent");
	END IF;
	RETURN QUERY EXECUTE format( 
		'SELECT 
			"Users"."username",
			"Users"."imageURL",
			"Comments"."commentId",
			"Comments"."parentId",
			"Comments"."rawContent",
			"Comments"."postedAt",
      "Comments"."updatedAt",
			"Replies"."replies"
		FROM "Comments"
		JOIN "Users" ON "Users"."userId"="Comments"."authorId"
		LEFT JOIN (
			SELECT 
				"Comments"."parentId",
				COUNT("Comments"."commentId") AS "replies"
			FROM "Comments"
			GROUP BY "parentId"
		) AS "Replies" ON "Comments"."commentId"="Replies"."parentId"
		WHERE 
			"Comments"."postId" = %s
			AND "Comments"."parentId" %s
		ORDER BY "postedAt"',
		"post", "parentCondition"
	);
END; $$
LANGUAGE PLPGSQL;
