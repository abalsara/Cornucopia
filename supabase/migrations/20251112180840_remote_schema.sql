alter table "public"."Donation" drop constraint "Donation_cid_fkey";

alter table "public"."Donation" drop constraint "Donation_pid_fkey";

alter table "public"."Charities" add column "causes" text[];

alter table "public"."Charities" add column "latitude" numeric;

alter table "public"."Charities" add column "longitude" numeric;

alter table "public"."Charities" add column "mission" text not null default ''::text;


