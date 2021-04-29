CREATE OR REPLACE FUNCTION "getPostTotalScore"("postId" bigint)
RETURNS bigint AS $$
  SELECT COALESCE(sum("score"), 0) AS "totalScore"
  FROM "PostScores"
  WHERE "postId" = $1;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION "getPostCommentsCount"("postId" bigint)
RETURNS bigint AS $$
  SELECT COALESCE(count(*), 0) AS "commentsCount"
  FROM "Comments" WHERE "postId" = $1;
$$ LANGUAGE SQL;

CREATE OR REPLACE VIEW vPostTemplate AS (
   SELECT "postId" AS "id", "title", "content", "createdAt", 
          "updatedAt", array_agg("tagName") AS "tags",
          "getPostTotalScore"(0) AS "totalScore",
          "getPostCommentsCount"(0) AS "commentsCount"
  FROM "Posts"
    JOIN "PostTags" USING ("postId")
    JOIN "Tags" USING ("tagId")
  GROUP BY "postId"
);

CREATE OR REPLACE FUNCTION getPostById("postId" int)
RETURNS TABLE (LIKE vPostTemplate) AS $$
  SELECT "postId", "title", "content", "createdAt", 
         "updatedAt", array_agg("tagName") AS "tags",
         "getPostTotalScore"("postId") AS "totalScore",
         "getPostCommentsCount"("postId") AS "commentsCount"
  FROM "Posts"
    JOIN "PostTags" USING ("postId")
    JOIN "Tags" USING ("tagId")
  WHERE "postId" = $1
  GROUP BY "postId";
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION getPostsByTag("tag" varchar(120))
RETURNS TABLE (LIKE vPostTemplate) AS $$
  SELECT "postId", "title", "content",
         "createdAt", "updatedAt", "tags",
         "getPostTotalScore"("postId") AS "totalScore",
         "getPostCommentsCount"("postId") AS "commentsCount"
  FROM "Posts" JOIN LATERAL (
    SELECT "postId", array_agg("tagName") AS "tags"
    FROM "PostTags" JOIN "Tags" USING ("tagId")
    GROUP BY "postId"
  ) sub USING ("postId")
  WHERE $1 = ANY ("tags")
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION getPostsByUsername("username" varchar(120))
RETURNS TABLE (LIKE vPostTemplate) AS $$
  SELECT "postId", "title", "content", "createdAt",
          "updatedAt", array_agg("tagName") AS "tags",
          "getPostTotalScore"("postId") AS "totalScore",
          "getPostCommentsCount"("postId") AS "commentsCount"
  FROM "Posts"
    JOIN "PostTags" USING ("postId")
    JOIN "Tags" USING ("tagId")
  WHERE EXISTS (
    SELECT 1 FROM "Users"
    WHERE "authorId" = "userId"
      AND $1 = "username"
  )
  GROUP BY "postId";
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION "getPostsByUserId"("userId" int)
RETURNS TABLE (LIKE vPostTemplate) AS $$
  SELECT "postId", "title", "content", "createdAt",
         "updatedAt", array_agg("tagName") AS "tags",
         "getPostTotalScore"("postId") AS "totalScore",
         "getPostCommentsCount"("postId") AS "commentsCount"
  FROM "Posts"
    JOIN "PostTags" USING ("postId")
    JOIN "Tags" USING ("tagId")
  WHERE "authorId" = $1
  GROUP BY "postId";
$$ LANGUAGE SQL;

CREATE OR REPLACE PROCEDURE "updatePostUserScore"(
  "userId" int, "postId" int, "score" smallint
) AS $$
  INSERT INTO "PostScores" ("userId", "postId", "score") VALUES ($1, $2, $3)
  ON CONFLICT("userId", "postId") DO UPDATE SET "score" = $3;
$$ LANGUAGE SQL;

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
END; 
$$ LANGUAGE PLPGSQL;                                                           
