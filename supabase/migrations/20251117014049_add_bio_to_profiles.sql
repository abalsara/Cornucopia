-- Add bio column to Profiles table
ALTER TABLE "public"."Profiles" ADD COLUMN IF NOT EXISTS "bio" text;

COMMENT ON COLUMN "public"."Profiles"."bio" IS 'User bio/description';
