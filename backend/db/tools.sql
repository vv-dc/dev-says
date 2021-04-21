CREATE OR REPLACE FUNCTION getPostById(int)
RETURNS TABLE (
  "postId" int,
  "title" varchar(255), 
  "content" jsonb,
  "createdAt" timestamp,
  "updatedAt" timestamp,
  "tags" varchar[]
) AS $$
  SELECT "postId", "title", "content", "createdAt", 
         "updatedAt", array_agg("tagName") AS "tags"
  FROM "Posts"
    JOIN "PostTags" USING ("postId")
    JOIN "Tags" USING ("tagId")
  WHERE "postId" = $1
  GROUP BY "postId";
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION getPostsByTag(varchar(120))
RETURNS TABLE (
  "postId" int,
  "title" varchar(255), 
  "content" jsonb,
  "createdAt" timestamp,
  "updatedAt" timestamp,
  "tags" varchar[]
) AS $$
  SELECT "postId", "title", "content", 
         "createdAt", "updatedAt", "tags"
  FROM "Posts" JOIN LATERAL (
    SELECT "postId", array_agg("tagName") AS "tags"
    FROM "PostTags" JOIN "Tags" USING ("tagId")
    GROUP BY "postId"
  ) sub USING ("postId")
  WHERE $1 = ANY ("tags")
$$ LANGUAGE SQL;
