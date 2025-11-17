-- Add RLS policy to allow charity admins to update their own charity
-- This checks if the user is in the admin table with the matching charity ID

CREATE POLICY "Enable update for charity admins" ON "public"."Charities"
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM "public"."admin"
    WHERE "admin"."uid" = auth.uid()
    AND "admin"."cid" = "Charities"."cid"
  )
);
