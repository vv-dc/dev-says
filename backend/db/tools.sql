CREATE OR REPLACE FUNCTION "getPostTotalScore"("postId" bigint)
RETURNS bigint AS $$
  SELECT COALESCE(sum("score"), 0) AS "totalScore"
  FROM "PostScores"
  WHERE "postId" = $1;
$$ LANGUAGE SQL;

CREATE OR REPLACE VIEW vPostTemplate AS (
   SELECT "postId" AS "id", "title", "content", "createdAt", 
          "updatedAt", array_agg("tagName") AS "tags",
          "getPostTotalScore"(0) AS "totalScore"
  FROM "Posts"
    JOIN "PostTags" USING ("postId")
    JOIN "Tags" USING ("tagId")
  GROUP BY "postId"
);

CREATE OR REPLACE FUNCTION getPostById("postId" int)
RETURNS TABLE (LIKE vPostTemplate) AS $$
  SELECT "postId", "title", "content", "createdAt", 
         "updatedAt", array_agg("tagName") AS "tags",
         "getPostTotalScore"("postId") AS "totalScore"
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
         "getPostTotalScore"("postId") AS "totalScore"
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
          "getPostTotalScore"("postId") AS "totalScore"
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
         "getPostTotalScore"("postId") AS "totalScore"
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
