CREATE OR REPLACE VIEW vPostTemplate AS (
   SELECT "postId" AS "id", "title", "content", "createdAt", 
          "updatedAt", array_agg("tagName") AS "tags"
  FROM "Posts"
    JOIN "PostTags" USING ("postId")
    JOIN "Tags" USING ("tagId")
  GROUP BY "postId"
);

CREATE OR REPLACE FUNCTION getPostById(int)
RETURNS TABLE (LIKE vPostTemplate) AS $$
  SELECT "postId", "title", "content", "createdAt", 
         "updatedAt", array_agg("tagName") AS "tags"
  FROM "Posts"
    JOIN "PostTags" USING ("postId")
    JOIN "Tags" USING ("tagId")
  WHERE "postId" = $1
  GROUP BY "postId";
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION getPostsByTag(varchar(120))
RETURNS TABLE (LIKE vPostTemplate) AS $$
  SELECT "postId", "title", "content", 
         "createdAt", "updatedAt", "tags"
  FROM "Posts" JOIN LATERAL (
    SELECT "postId", array_agg("tagName") AS "tags"
    FROM "PostTags" JOIN "Tags" USING ("tagId")
    GROUP BY "postId"
  ) sub USING ("postId")
  WHERE $1 = ANY ("tags")
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION getPostsByUsername(varchar(120))
RETURNS TABLE (LIKE vPostTemplate) AS $$
  SELECT "postId", "title", "content", "createdAt", 
          "updatedAt", array_agg("tagName") AS "tags"
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

CREATE OR REPLACE FUNCTION getPostsByUserId(int)
RETURNS TABLE (LIKE vPostTemplate) AS $$
SELECT "postId", "title", "content", "createdAt",
        "updatedAt", array_agg("tagName") AS "tags"
  FROM "Posts"
    JOIN "PostTags" USING ("postId")
    JOIN "Tags" USING ("tagId")
  WHERE "authorId" = $1
  GROUP BY "postId";
$$ LANGUAGE SQL;
