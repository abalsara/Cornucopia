


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
begin
  insert into public.profiles (id, email, first_name, last_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'last_name');
  return new;
end;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."Charities" (
    "c_name" "text",
    "email" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "admin" "uuid" NOT NULL,
    "cid" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "address" "text" NOT NULL,
    "zip_code" "text" NOT NULL,
    "city" "text" NOT NULL,
    "state" "text" NOT NULL
);


ALTER TABLE "public"."Charities" OWNER TO "postgres";


COMMENT ON TABLE "public"."Charities" IS 'Table for storing Charity information';



COMMENT ON COLUMN "public"."Charities"."cid" IS 'Primary key for Charities.';



COMMENT ON COLUMN "public"."Charities"."address" IS 'Address of the Charity in "[Building num] [Street name]"';



COMMENT ON COLUMN "public"."Charities"."zip_code" IS 'Zip code of charity';



COMMENT ON COLUMN "public"."Charities"."city" IS 'City of charity';



COMMENT ON COLUMN "public"."Charities"."state" IS 'State of charity in two letter postal, i.e. "WA"';



CREATE TABLE IF NOT EXISTS "public"."Donation" (
    "donation_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "pid" "uuid",
    "item_id" "uuid",
    "cid" "uuid",
    "quantitiy_comitted" integer DEFAULT 1,
    "scheduled_date" timestamp with time zone,
    "fulfilled" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."Donation" OWNER TO "postgres";


COMMENT ON TABLE "public"."Donation" IS 'Donation table to track what items are promised by which user';



CREATE TABLE IF NOT EXISTS "public"."Profiles" (
    "id" "uuid" NOT NULL,
    "first_name" "text",
    "last_name" "text",
    "email" "text",
    "avatar_url" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."Profiles" OWNER TO "postgres";


COMMENT ON TABLE "public"."Profiles" IS 'Table for storing created profiles.';



CREATE TABLE IF NOT EXISTS "public"."Request" (
    "item_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "cid" "uuid",
    "item_name" "text",
    "quantitiy_requested" integer DEFAULT 1,
    "quantity_fulfilled" integer DEFAULT 0,
    "urgency" smallint DEFAULT '0'::smallint,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "post_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);


ALTER TABLE "public"."Request" OWNER TO "postgres";


COMMENT ON TABLE "public"."Request" IS 'Table for each Request within a RequestPost, foreign key into RequestPost and Charities';



COMMENT ON COLUMN "public"."Request"."post_id" IS 'Foreign key into RequestPost.';



CREATE TABLE IF NOT EXISTS "public"."RequestPost" (
    "cid" "uuid",
    "post_title" "text",
    "is_active" boolean DEFAULT true,
    "dropoff_details" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "post_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);


ALTER TABLE "public"."RequestPost" OWNER TO "postgres";


COMMENT ON TABLE "public"."RequestPost" IS 'Table to store Posts made by Charities, foreign key into Request table.';



COMMENT ON COLUMN "public"."RequestPost"."post_id" IS 'post_id acts as a primary key for posts to reference from a Request row.';



ALTER TABLE ONLY "public"."Charities"
    ADD CONSTRAINT "Charities_admin_key" UNIQUE ("admin");



ALTER TABLE ONLY "public"."Charities"
    ADD CONSTRAINT "Charities_cid_key" UNIQUE ("cid");



ALTER TABLE ONLY "public"."Charities"
    ADD CONSTRAINT "Charities_pkey" PRIMARY KEY ("cid");



ALTER TABLE ONLY "public"."Donation"
    ADD CONSTRAINT "Donation_pkey" PRIMARY KEY ("donation_id");



ALTER TABLE ONLY "public"."RequestPost"
    ADD CONSTRAINT "RequestPost_pkey" PRIMARY KEY ("post_id");



ALTER TABLE ONLY "public"."RequestPost"
    ADD CONSTRAINT "RequestPost_post_id_key" UNIQUE ("post_id");



ALTER TABLE ONLY "public"."Request"
    ADD CONSTRAINT "Request_pkey" PRIMARY KEY ("item_id");



ALTER TABLE ONLY "public"."Profiles"
    ADD CONSTRAINT "profiles_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."Profiles"
    ADD CONSTRAINT "profiles_id_key1" UNIQUE ("id");



ALTER TABLE ONLY "public"."Profiles"
    ADD CONSTRAINT "profiles_id_key2" UNIQUE ("id");



ALTER TABLE ONLY "public"."Profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Donation"
    ADD CONSTRAINT "Donation_cid_fkey" FOREIGN KEY ("cid") REFERENCES "public"."Charities"("cid") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."Donation"
    ADD CONSTRAINT "Donation_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."Request"("item_id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."Donation"
    ADD CONSTRAINT "Donation_pid_fkey" FOREIGN KEY ("pid") REFERENCES "public"."Profiles"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."RequestPost"
    ADD CONSTRAINT "RequestPost_cid_fkey" FOREIGN KEY ("cid") REFERENCES "public"."Charities"("cid") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."Request"
    ADD CONSTRAINT "Request_cid_fkey" FOREIGN KEY ("cid") REFERENCES "public"."Charities"("cid") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."Request"
    ADD CONSTRAINT "Request_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."RequestPost"("post_id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."Profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE "public"."Charities" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."Donation" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "Enable read access for all users" ON "public"."Charities" FOR SELECT USING (true);



CREATE POLICY "Enable read for users based on user_id" ON "public"."Profiles" FOR SELECT USING ((( SELECT "auth"."uid"() AS "uid") = "id"));



CREATE POLICY "Enable update for users based on user_id" ON "public"."Charities" FOR UPDATE USING ((( SELECT "auth"."uid"() AS "uid") = "admin"));



CREATE POLICY "Enable update for users based on user_id" ON "public"."Profiles" FOR UPDATE USING ((( SELECT "auth"."uid"() AS "uid") = "id"));



ALTER TABLE "public"."Profiles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."Request" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."RequestPost" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

























































































































































GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";


















GRANT ALL ON TABLE "public"."Charities" TO "anon";
GRANT ALL ON TABLE "public"."Charities" TO "authenticated";
GRANT ALL ON TABLE "public"."Charities" TO "service_role";



GRANT ALL ON TABLE "public"."Donation" TO "anon";
GRANT ALL ON TABLE "public"."Donation" TO "authenticated";
GRANT ALL ON TABLE "public"."Donation" TO "service_role";



GRANT ALL ON TABLE "public"."Profiles" TO "anon";
GRANT ALL ON TABLE "public"."Profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."Profiles" TO "service_role";



GRANT ALL ON TABLE "public"."Request" TO "anon";
GRANT ALL ON TABLE "public"."Request" TO "authenticated";
GRANT ALL ON TABLE "public"."Request" TO "service_role";



GRANT ALL ON TABLE "public"."RequestPost" TO "anon";
GRANT ALL ON TABLE "public"."RequestPost" TO "authenticated";
GRANT ALL ON TABLE "public"."RequestPost" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































RESET ALL;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();


