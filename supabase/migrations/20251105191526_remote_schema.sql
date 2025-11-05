drop extension if exists "pg_net";

create type "public"."AgeGroupT" as enum ('Baby', 'Kids', 'Teenager', 'Adult', 'All Ages');

create type "public"."AnimalNeedT" as enum ('Food', 'Bedding', 'Crates', 'Toys', 'Grooming', 'Bowls & Feeders', 'Health & Wellness', 'Accessories', 'Other');

create type "public"."AnimalTypeT" as enum ('Dogs', 'Cats', 'Small Animals', 'Birds', 'Reptiles');

create type "public"."ElectronicsTypeT" as enum ('Computers/Tablets', 'Phones/Mobile Devices', 'TVs & Monitors', 'Appliances', 'Accessories & Cables', 'Other');

create type "public"."FurnitureTypeT" as enum ('Seating', 'Tables', 'Bedroom', 'Storage', 'Outdoor Furniture', 'Other');

create type "public"."GenderT" as enum ('Male', 'Female', 'Unisex', 'Other');

create type "public"."HouseholdGoodsTypeT" as enum ('Kitchen Items', 'Bedding & Linens', 'Cleaning Supplies', 'Small Appliances', 'Storage & Organization', 'Decor & Lighting', 'Other');

create type "public"."MedicalSuppliesTypeT" as enum ('First Aid', 'Mobility Aids', 'OTC Medications/Supplements', 'Other');

create type "public"."RequestTypeT" as enum ('Food', 'Clothing', 'Hygiene Products', 'Household Goods', 'Furniture', 'Toys & Games', 'Medical Supplies', 'School & Office Supplies', 'Animal Care Supplies', 'Electronics', 'Sports Equipment', 'Uncategorized');

create type "public"."SportsEquipmentTypeT" as enum ('Team Sports', 'Winter Sports', 'Fitness Equipment', 'Bikes & Recreation', 'Other');

create type "public"."StorageRequirementT" as enum ('Fridge', 'Freezer', 'Shelf Stable');

drop policy "Enable update for users based on user_id" on "public"."Charities";

revoke delete on table "public"."RequestPost" from "service_role";

revoke insert on table "public"."RequestPost" from "service_role";

revoke references on table "public"."RequestPost" from "service_role";

revoke select on table "public"."RequestPost" from "service_role";

revoke trigger on table "public"."RequestPost" from "service_role";

revoke truncate on table "public"."RequestPost" from "service_role";

revoke update on table "public"."RequestPost" from "service_role";

alter table "public"."Charities" drop constraint "Charities_admin_key";

alter table "public"."Donation" drop constraint "Donation_item_id_fkey";

alter table "public"."Request" drop constraint "Request_post_id_fkey";

alter table "public"."RequestPost" drop constraint "RequestPost_cid_fkey";

alter table "public"."RequestPost" drop constraint "RequestPost_post_id_key";

alter table "public"."RequestPost" drop constraint "RequestPost_pkey";

alter table "public"."Request" drop constraint "Request_pkey";

drop index if exists "public"."Charities_admin_key";

drop index if exists "public"."RequestPost_pkey";

drop index if exists "public"."RequestPost_post_id_key";

drop index if exists "public"."Request_pkey";

drop table "public"."RequestPost";


  create table "public"."AnimalCareSupplies" (
    "item_id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "cid" uuid not null,
    "animal" public."AnimalTypeT" default 'Dogs'::public."AnimalTypeT",
    "type" public."AnimalNeedT" not null default 'Other'::public."AnimalNeedT"
      );


alter table "public"."AnimalCareSupplies" enable row level security;


  create table "public"."Clothing" (
    "cid" uuid not null,
    "age_group" public."AgeGroupT" default 'All Ages'::public."AgeGroupT",
    "gender" public."GenderT" default 'Unisex'::public."GenderT",
    "created_at" timestamp with time zone not null default now(),
    "item_id" uuid not null default gen_random_uuid()
      );


alter table "public"."Clothing" enable row level security;


  create table "public"."Electronics" (
    "item_id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "cid" uuid not null,
    "type" public."ElectronicsTypeT" not null default 'Other'::public."ElectronicsTypeT"
      );


alter table "public"."Electronics" enable row level security;


  create table "public"."Food" (
    "item_id" uuid not null default gen_random_uuid(),
    "cid" uuid not null,
    "storage_reqs" public."StorageRequirementT" not null default 'Shelf Stable'::public."StorageRequirementT",
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."Food" enable row level security;


  create table "public"."Furniture" (
    "item_id" uuid not null default gen_random_uuid(),
    "cid" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "type" public."FurnitureTypeT" not null default 'Other'::public."FurnitureTypeT"
      );


alter table "public"."Furniture" enable row level security;


  create table "public"."HouseholdGoods" (
    "item_id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "cid" uuid not null,
    "type" public."HouseholdGoodsTypeT" not null default 'Other'::public."HouseholdGoodsTypeT"
      );


alter table "public"."HouseholdGoods" enable row level security;


  create table "public"."HygieneProduct" (
    "item_id" uuid not null default gen_random_uuid(),
    "cid" uuid not null,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."HygieneProduct" enable row level security;


  create table "public"."MedicalSupplies" (
    "item_id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "cid" uuid not null,
    "type" public."MedicalSuppliesTypeT" not null default 'Other'::public."MedicalSuppliesTypeT"
      );


alter table "public"."MedicalSupplies" enable row level security;


  create table "public"."Ratings" (
    "pid" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "cid" uuid,
    "star" smallint default '0'::smallint,
    "desc" text default '""'::text
      );


alter table "public"."Ratings" enable row level security;


  create table "public"."SchoolOfficeSupplies" (
    "item_id" uuid not null default gen_random_uuid(),
    "cid" uuid not null,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."SchoolOfficeSupplies" enable row level security;


  create table "public"."SportsEquipment" (
    "item_id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "cid" uuid not null,
    "age_group" public."AgeGroupT" not null default 'All Ages'::public."AgeGroupT",
    "type" public."SportsEquipmentTypeT" not null default 'Other'::public."SportsEquipmentTypeT"
      );


alter table "public"."SportsEquipment" enable row level security;


  create table "public"."ToysGames" (
    "item_id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "cid" uuid not null,
    "age_group" public."AgeGroupT" default 'All Ages'::public."AgeGroupT"
      );


alter table "public"."ToysGames" enable row level security;


  create table "public"."Uncatergorized" (
    "item_id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "cid" uuid not null
      );


alter table "public"."Uncatergorized" enable row level security;


  create table "public"."admin" (
    "uid" uuid not null,
    "cid" uuid,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."admin" enable row level security;

alter table "public"."Charities" drop column "admin";

alter table "public"."Charities" add column "phone_num" text;

alter table "public"."Charities" alter column "c_name" set not null;

alter table "public"."Request" drop column "item_id";

alter table "public"."Request" drop column "post_id";

alter table "public"."Request" drop column "quantitiy_requested";

alter table "public"."Request" drop column "urgency";

alter table "public"."Request" add column "category" public."RequestTypeT" not null default 'Uncategorized'::public."RequestTypeT";

alter table "public"."Request" add column "notes" text default '"No additional notes."'::text;

alter table "public"."Request" add column "quantitiy" integer not null default 1;

alter table "public"."Request" add column "request_id" uuid not null default gen_random_uuid();

alter table "public"."Request" add column "unit" text not null default '"Ea."'::text;

alter table "public"."Request" alter column "cid" set not null;

alter table "public"."Request" alter column "item_name" set not null;

alter table "public"."Request" alter column "quantity_fulfilled" set not null;

CREATE UNIQUE INDEX "AnimalCareSupplies_pkey" ON public."AnimalCareSupplies" USING btree (item_id);

CREATE UNIQUE INDEX "Clothing_pkey" ON public."Clothing" USING btree (item_id);

CREATE UNIQUE INDEX "Electronics_pkey" ON public."Electronics" USING btree (item_id);

CREATE UNIQUE INDEX "Food_pkey" ON public."Food" USING btree (item_id);

CREATE UNIQUE INDEX "Furniture_pkey" ON public."Furniture" USING btree (item_id);

CREATE UNIQUE INDEX "HouseholdGoods_pkey" ON public."HouseholdGoods" USING btree (item_id);

CREATE UNIQUE INDEX "HygieneProduct_pkey" ON public."HygieneProduct" USING btree (item_id);

CREATE UNIQUE INDEX "MedicalSupplies_pkey" ON public."MedicalSupplies" USING btree (item_id);

CREATE UNIQUE INDEX "Ratings_pkey" ON public."Ratings" USING btree (pid);

CREATE UNIQUE INDEX "SchoolOfficeSupplies_pkey" ON public."SchoolOfficeSupplies" USING btree (item_id);

CREATE UNIQUE INDEX "SportsEquipment_pkey" ON public."SportsEquipment" USING btree (item_id);

CREATE UNIQUE INDEX "ToysGames_pkey" ON public."ToysGames" USING btree (item_id);

CREATE UNIQUE INDEX "Uncatergorized_pkey" ON public."Uncatergorized" USING btree (item_id);

CREATE UNIQUE INDEX admin_pkey ON public.admin USING btree (uid);

CREATE UNIQUE INDEX "Request_pkey" ON public."Request" USING btree (request_id);

alter table "public"."AnimalCareSupplies" add constraint "AnimalCareSupplies_pkey" PRIMARY KEY using index "AnimalCareSupplies_pkey";

alter table "public"."Clothing" add constraint "Clothing_pkey" PRIMARY KEY using index "Clothing_pkey";

alter table "public"."Electronics" add constraint "Electronics_pkey" PRIMARY KEY using index "Electronics_pkey";

alter table "public"."Food" add constraint "Food_pkey" PRIMARY KEY using index "Food_pkey";

alter table "public"."Furniture" add constraint "Furniture_pkey" PRIMARY KEY using index "Furniture_pkey";

alter table "public"."HouseholdGoods" add constraint "HouseholdGoods_pkey" PRIMARY KEY using index "HouseholdGoods_pkey";

alter table "public"."HygieneProduct" add constraint "HygieneProduct_pkey" PRIMARY KEY using index "HygieneProduct_pkey";

alter table "public"."MedicalSupplies" add constraint "MedicalSupplies_pkey" PRIMARY KEY using index "MedicalSupplies_pkey";

alter table "public"."Ratings" add constraint "Ratings_pkey" PRIMARY KEY using index "Ratings_pkey";

alter table "public"."SchoolOfficeSupplies" add constraint "SchoolOfficeSupplies_pkey" PRIMARY KEY using index "SchoolOfficeSupplies_pkey";

alter table "public"."SportsEquipment" add constraint "SportsEquipment_pkey" PRIMARY KEY using index "SportsEquipment_pkey";

alter table "public"."ToysGames" add constraint "ToysGames_pkey" PRIMARY KEY using index "ToysGames_pkey";

alter table "public"."Uncatergorized" add constraint "Uncatergorized_pkey" PRIMARY KEY using index "Uncatergorized_pkey";

alter table "public"."admin" add constraint "admin_pkey" PRIMARY KEY using index "admin_pkey";

alter table "public"."Request" add constraint "Request_pkey" PRIMARY KEY using index "Request_pkey";

alter table "public"."AnimalCareSupplies" add constraint "AnimalCareSupplies_cid_fkey" FOREIGN KEY (cid) REFERENCES public."Charities"(cid) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."AnimalCareSupplies" validate constraint "AnimalCareSupplies_cid_fkey";

alter table "public"."Clothing" add constraint "Clothing_cid_fkey" FOREIGN KEY (cid) REFERENCES public."Charities"(cid) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Clothing" validate constraint "Clothing_cid_fkey";

alter table "public"."Electronics" add constraint "Electronics_cid_fkey" FOREIGN KEY (cid) REFERENCES public."Charities"(cid) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Electronics" validate constraint "Electronics_cid_fkey";

alter table "public"."Food" add constraint "Food_cid_fkey" FOREIGN KEY (cid) REFERENCES public."Charities"(cid) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Food" validate constraint "Food_cid_fkey";

alter table "public"."Furniture" add constraint "Furniture_cid_fkey" FOREIGN KEY (cid) REFERENCES public."Charities"(cid) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Furniture" validate constraint "Furniture_cid_fkey";

alter table "public"."HouseholdGoods" add constraint "HouseholdGoods_cid_fkey1" FOREIGN KEY (cid) REFERENCES public."Charities"(cid) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."HouseholdGoods" validate constraint "HouseholdGoods_cid_fkey1";

alter table "public"."HygieneProduct" add constraint "HygieneProduct_cid_fkey" FOREIGN KEY (cid) REFERENCES public."Charities"(cid) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."HygieneProduct" validate constraint "HygieneProduct_cid_fkey";

alter table "public"."MedicalSupplies" add constraint "MedicalSupplies_cid_fkey" FOREIGN KEY (cid) REFERENCES public."Charities"(cid) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."MedicalSupplies" validate constraint "MedicalSupplies_cid_fkey";

alter table "public"."Ratings" add constraint "Ratings_cid_fkey" FOREIGN KEY (cid) REFERENCES public."Charities"(cid) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Ratings" validate constraint "Ratings_cid_fkey";

alter table "public"."Ratings" add constraint "Ratings_pid_fkey" FOREIGN KEY (pid) REFERENCES public."Profiles"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Ratings" validate constraint "Ratings_pid_fkey";

alter table "public"."SchoolOfficeSupplies" add constraint "SchoolOfficeSupplies_cid_fkey" FOREIGN KEY (cid) REFERENCES public."Charities"(cid) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."SchoolOfficeSupplies" validate constraint "SchoolOfficeSupplies_cid_fkey";

alter table "public"."SportsEquipment" add constraint "SportsEquipment_cid_fkey" FOREIGN KEY (cid) REFERENCES public."Charities"(cid) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."SportsEquipment" validate constraint "SportsEquipment_cid_fkey";

alter table "public"."ToysGames" add constraint "ToysGames_cid_fkey" FOREIGN KEY (cid) REFERENCES public."Charities"(cid) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."ToysGames" validate constraint "ToysGames_cid_fkey";

alter table "public"."Uncatergorized" add constraint "Uncatergorized_cid_fkey" FOREIGN KEY (cid) REFERENCES public."Charities"(cid) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Uncatergorized" validate constraint "Uncatergorized_cid_fkey";

alter table "public"."admin" add constraint "admin_cid_fkey" FOREIGN KEY (cid) REFERENCES public."Charities"(cid) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."admin" validate constraint "admin_cid_fkey";

alter table "public"."admin" add constraint "admin_uid_fkey" FOREIGN KEY (uid) REFERENCES public."Profiles"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."admin" validate constraint "admin_uid_fkey";

grant delete on table "public"."AnimalCareSupplies" to "anon";

grant insert on table "public"."AnimalCareSupplies" to "anon";

grant references on table "public"."AnimalCareSupplies" to "anon";

grant select on table "public"."AnimalCareSupplies" to "anon";

grant trigger on table "public"."AnimalCareSupplies" to "anon";

grant truncate on table "public"."AnimalCareSupplies" to "anon";

grant update on table "public"."AnimalCareSupplies" to "anon";

grant delete on table "public"."AnimalCareSupplies" to "authenticated";

grant insert on table "public"."AnimalCareSupplies" to "authenticated";

grant references on table "public"."AnimalCareSupplies" to "authenticated";

grant select on table "public"."AnimalCareSupplies" to "authenticated";

grant trigger on table "public"."AnimalCareSupplies" to "authenticated";

grant truncate on table "public"."AnimalCareSupplies" to "authenticated";

grant update on table "public"."AnimalCareSupplies" to "authenticated";

grant delete on table "public"."AnimalCareSupplies" to "service_role";

grant insert on table "public"."AnimalCareSupplies" to "service_role";

grant references on table "public"."AnimalCareSupplies" to "service_role";

grant select on table "public"."AnimalCareSupplies" to "service_role";

grant trigger on table "public"."AnimalCareSupplies" to "service_role";

grant truncate on table "public"."AnimalCareSupplies" to "service_role";

grant update on table "public"."AnimalCareSupplies" to "service_role";

grant delete on table "public"."Charities" to "anon";

grant insert on table "public"."Charities" to "anon";

grant references on table "public"."Charities" to "anon";

grant select on table "public"."Charities" to "anon";

grant trigger on table "public"."Charities" to "anon";

grant truncate on table "public"."Charities" to "anon";

grant update on table "public"."Charities" to "anon";

grant delete on table "public"."Charities" to "authenticated";

grant insert on table "public"."Charities" to "authenticated";

grant references on table "public"."Charities" to "authenticated";

grant select on table "public"."Charities" to "authenticated";

grant trigger on table "public"."Charities" to "authenticated";

grant truncate on table "public"."Charities" to "authenticated";

grant update on table "public"."Charities" to "authenticated";

grant delete on table "public"."Clothing" to "anon";

grant insert on table "public"."Clothing" to "anon";

grant references on table "public"."Clothing" to "anon";

grant select on table "public"."Clothing" to "anon";

grant trigger on table "public"."Clothing" to "anon";

grant truncate on table "public"."Clothing" to "anon";

grant update on table "public"."Clothing" to "anon";

grant delete on table "public"."Clothing" to "authenticated";

grant insert on table "public"."Clothing" to "authenticated";

grant references on table "public"."Clothing" to "authenticated";

grant select on table "public"."Clothing" to "authenticated";

grant trigger on table "public"."Clothing" to "authenticated";

grant truncate on table "public"."Clothing" to "authenticated";

grant update on table "public"."Clothing" to "authenticated";

grant delete on table "public"."Clothing" to "service_role";

grant insert on table "public"."Clothing" to "service_role";

grant references on table "public"."Clothing" to "service_role";

grant select on table "public"."Clothing" to "service_role";

grant trigger on table "public"."Clothing" to "service_role";

grant truncate on table "public"."Clothing" to "service_role";

grant update on table "public"."Clothing" to "service_role";

grant delete on table "public"."Donation" to "anon";

grant insert on table "public"."Donation" to "anon";

grant references on table "public"."Donation" to "anon";

grant select on table "public"."Donation" to "anon";

grant trigger on table "public"."Donation" to "anon";

grant truncate on table "public"."Donation" to "anon";

grant update on table "public"."Donation" to "anon";

grant delete on table "public"."Donation" to "authenticated";

grant insert on table "public"."Donation" to "authenticated";

grant references on table "public"."Donation" to "authenticated";

grant select on table "public"."Donation" to "authenticated";

grant trigger on table "public"."Donation" to "authenticated";

grant truncate on table "public"."Donation" to "authenticated";

grant update on table "public"."Donation" to "authenticated";

grant delete on table "public"."Electronics" to "anon";

grant insert on table "public"."Electronics" to "anon";

grant references on table "public"."Electronics" to "anon";

grant select on table "public"."Electronics" to "anon";

grant trigger on table "public"."Electronics" to "anon";

grant truncate on table "public"."Electronics" to "anon";

grant update on table "public"."Electronics" to "anon";

grant delete on table "public"."Electronics" to "authenticated";

grant insert on table "public"."Electronics" to "authenticated";

grant references on table "public"."Electronics" to "authenticated";

grant select on table "public"."Electronics" to "authenticated";

grant trigger on table "public"."Electronics" to "authenticated";

grant truncate on table "public"."Electronics" to "authenticated";

grant update on table "public"."Electronics" to "authenticated";

grant delete on table "public"."Electronics" to "service_role";

grant insert on table "public"."Electronics" to "service_role";

grant references on table "public"."Electronics" to "service_role";

grant select on table "public"."Electronics" to "service_role";

grant trigger on table "public"."Electronics" to "service_role";

grant truncate on table "public"."Electronics" to "service_role";

grant update on table "public"."Electronics" to "service_role";

grant delete on table "public"."Food" to "anon";

grant insert on table "public"."Food" to "anon";

grant references on table "public"."Food" to "anon";

grant select on table "public"."Food" to "anon";

grant trigger on table "public"."Food" to "anon";

grant truncate on table "public"."Food" to "anon";

grant update on table "public"."Food" to "anon";

grant delete on table "public"."Food" to "authenticated";

grant insert on table "public"."Food" to "authenticated";

grant references on table "public"."Food" to "authenticated";

grant select on table "public"."Food" to "authenticated";

grant trigger on table "public"."Food" to "authenticated";

grant truncate on table "public"."Food" to "authenticated";

grant update on table "public"."Food" to "authenticated";

grant delete on table "public"."Food" to "service_role";

grant insert on table "public"."Food" to "service_role";

grant references on table "public"."Food" to "service_role";

grant select on table "public"."Food" to "service_role";

grant trigger on table "public"."Food" to "service_role";

grant truncate on table "public"."Food" to "service_role";

grant update on table "public"."Food" to "service_role";

grant delete on table "public"."Furniture" to "anon";

grant insert on table "public"."Furniture" to "anon";

grant references on table "public"."Furniture" to "anon";

grant select on table "public"."Furniture" to "anon";

grant trigger on table "public"."Furniture" to "anon";

grant truncate on table "public"."Furniture" to "anon";

grant update on table "public"."Furniture" to "anon";

grant delete on table "public"."Furniture" to "authenticated";

grant insert on table "public"."Furniture" to "authenticated";

grant references on table "public"."Furniture" to "authenticated";

grant select on table "public"."Furniture" to "authenticated";

grant trigger on table "public"."Furniture" to "authenticated";

grant truncate on table "public"."Furniture" to "authenticated";

grant update on table "public"."Furniture" to "authenticated";

grant delete on table "public"."Furniture" to "service_role";

grant insert on table "public"."Furniture" to "service_role";

grant references on table "public"."Furniture" to "service_role";

grant select on table "public"."Furniture" to "service_role";

grant trigger on table "public"."Furniture" to "service_role";

grant truncate on table "public"."Furniture" to "service_role";

grant update on table "public"."Furniture" to "service_role";

grant delete on table "public"."HouseholdGoods" to "anon";

grant insert on table "public"."HouseholdGoods" to "anon";

grant references on table "public"."HouseholdGoods" to "anon";

grant select on table "public"."HouseholdGoods" to "anon";

grant trigger on table "public"."HouseholdGoods" to "anon";

grant truncate on table "public"."HouseholdGoods" to "anon";

grant update on table "public"."HouseholdGoods" to "anon";

grant delete on table "public"."HouseholdGoods" to "authenticated";

grant insert on table "public"."HouseholdGoods" to "authenticated";

grant references on table "public"."HouseholdGoods" to "authenticated";

grant select on table "public"."HouseholdGoods" to "authenticated";

grant trigger on table "public"."HouseholdGoods" to "authenticated";

grant truncate on table "public"."HouseholdGoods" to "authenticated";

grant update on table "public"."HouseholdGoods" to "authenticated";

grant delete on table "public"."HouseholdGoods" to "service_role";

grant insert on table "public"."HouseholdGoods" to "service_role";

grant references on table "public"."HouseholdGoods" to "service_role";

grant select on table "public"."HouseholdGoods" to "service_role";

grant trigger on table "public"."HouseholdGoods" to "service_role";

grant truncate on table "public"."HouseholdGoods" to "service_role";

grant update on table "public"."HouseholdGoods" to "service_role";

grant delete on table "public"."HygieneProduct" to "anon";

grant insert on table "public"."HygieneProduct" to "anon";

grant references on table "public"."HygieneProduct" to "anon";

grant select on table "public"."HygieneProduct" to "anon";

grant trigger on table "public"."HygieneProduct" to "anon";

grant truncate on table "public"."HygieneProduct" to "anon";

grant update on table "public"."HygieneProduct" to "anon";

grant delete on table "public"."HygieneProduct" to "authenticated";

grant insert on table "public"."HygieneProduct" to "authenticated";

grant references on table "public"."HygieneProduct" to "authenticated";

grant select on table "public"."HygieneProduct" to "authenticated";

grant trigger on table "public"."HygieneProduct" to "authenticated";

grant truncate on table "public"."HygieneProduct" to "authenticated";

grant update on table "public"."HygieneProduct" to "authenticated";

grant delete on table "public"."HygieneProduct" to "service_role";

grant insert on table "public"."HygieneProduct" to "service_role";

grant references on table "public"."HygieneProduct" to "service_role";

grant select on table "public"."HygieneProduct" to "service_role";

grant trigger on table "public"."HygieneProduct" to "service_role";

grant truncate on table "public"."HygieneProduct" to "service_role";

grant update on table "public"."HygieneProduct" to "service_role";

grant delete on table "public"."MedicalSupplies" to "anon";

grant insert on table "public"."MedicalSupplies" to "anon";

grant references on table "public"."MedicalSupplies" to "anon";

grant select on table "public"."MedicalSupplies" to "anon";

grant trigger on table "public"."MedicalSupplies" to "anon";

grant truncate on table "public"."MedicalSupplies" to "anon";

grant update on table "public"."MedicalSupplies" to "anon";

grant delete on table "public"."MedicalSupplies" to "authenticated";

grant insert on table "public"."MedicalSupplies" to "authenticated";

grant references on table "public"."MedicalSupplies" to "authenticated";

grant select on table "public"."MedicalSupplies" to "authenticated";

grant trigger on table "public"."MedicalSupplies" to "authenticated";

grant truncate on table "public"."MedicalSupplies" to "authenticated";

grant update on table "public"."MedicalSupplies" to "authenticated";

grant delete on table "public"."MedicalSupplies" to "service_role";

grant insert on table "public"."MedicalSupplies" to "service_role";

grant references on table "public"."MedicalSupplies" to "service_role";

grant select on table "public"."MedicalSupplies" to "service_role";

grant trigger on table "public"."MedicalSupplies" to "service_role";

grant truncate on table "public"."MedicalSupplies" to "service_role";

grant update on table "public"."MedicalSupplies" to "service_role";

grant delete on table "public"."Profiles" to "anon";

grant insert on table "public"."Profiles" to "anon";

grant references on table "public"."Profiles" to "anon";

grant select on table "public"."Profiles" to "anon";

grant trigger on table "public"."Profiles" to "anon";

grant truncate on table "public"."Profiles" to "anon";

grant update on table "public"."Profiles" to "anon";

grant delete on table "public"."Profiles" to "authenticated";

grant insert on table "public"."Profiles" to "authenticated";

grant references on table "public"."Profiles" to "authenticated";

grant select on table "public"."Profiles" to "authenticated";

grant trigger on table "public"."Profiles" to "authenticated";

grant truncate on table "public"."Profiles" to "authenticated";

grant update on table "public"."Profiles" to "authenticated";

grant delete on table "public"."Ratings" to "anon";

grant insert on table "public"."Ratings" to "anon";

grant references on table "public"."Ratings" to "anon";

grant select on table "public"."Ratings" to "anon";

grant trigger on table "public"."Ratings" to "anon";

grant truncate on table "public"."Ratings" to "anon";

grant update on table "public"."Ratings" to "anon";

grant delete on table "public"."Ratings" to "authenticated";

grant insert on table "public"."Ratings" to "authenticated";

grant references on table "public"."Ratings" to "authenticated";

grant select on table "public"."Ratings" to "authenticated";

grant trigger on table "public"."Ratings" to "authenticated";

grant truncate on table "public"."Ratings" to "authenticated";

grant update on table "public"."Ratings" to "authenticated";

grant delete on table "public"."Ratings" to "service_role";

grant insert on table "public"."Ratings" to "service_role";

grant references on table "public"."Ratings" to "service_role";

grant select on table "public"."Ratings" to "service_role";

grant trigger on table "public"."Ratings" to "service_role";

grant truncate on table "public"."Ratings" to "service_role";

grant update on table "public"."Ratings" to "service_role";

grant delete on table "public"."Request" to "anon";

grant insert on table "public"."Request" to "anon";

grant references on table "public"."Request" to "anon";

grant select on table "public"."Request" to "anon";

grant trigger on table "public"."Request" to "anon";

grant truncate on table "public"."Request" to "anon";

grant update on table "public"."Request" to "anon";

grant delete on table "public"."Request" to "authenticated";

grant insert on table "public"."Request" to "authenticated";

grant references on table "public"."Request" to "authenticated";

grant select on table "public"."Request" to "authenticated";

grant trigger on table "public"."Request" to "authenticated";

grant truncate on table "public"."Request" to "authenticated";

grant update on table "public"."Request" to "authenticated";

grant delete on table "public"."SchoolOfficeSupplies" to "anon";

grant insert on table "public"."SchoolOfficeSupplies" to "anon";

grant references on table "public"."SchoolOfficeSupplies" to "anon";

grant select on table "public"."SchoolOfficeSupplies" to "anon";

grant trigger on table "public"."SchoolOfficeSupplies" to "anon";

grant truncate on table "public"."SchoolOfficeSupplies" to "anon";

grant update on table "public"."SchoolOfficeSupplies" to "anon";

grant delete on table "public"."SchoolOfficeSupplies" to "authenticated";

grant insert on table "public"."SchoolOfficeSupplies" to "authenticated";

grant references on table "public"."SchoolOfficeSupplies" to "authenticated";

grant select on table "public"."SchoolOfficeSupplies" to "authenticated";

grant trigger on table "public"."SchoolOfficeSupplies" to "authenticated";

grant truncate on table "public"."SchoolOfficeSupplies" to "authenticated";

grant update on table "public"."SchoolOfficeSupplies" to "authenticated";

grant delete on table "public"."SchoolOfficeSupplies" to "service_role";

grant insert on table "public"."SchoolOfficeSupplies" to "service_role";

grant references on table "public"."SchoolOfficeSupplies" to "service_role";

grant select on table "public"."SchoolOfficeSupplies" to "service_role";

grant trigger on table "public"."SchoolOfficeSupplies" to "service_role";

grant truncate on table "public"."SchoolOfficeSupplies" to "service_role";

grant update on table "public"."SchoolOfficeSupplies" to "service_role";

grant delete on table "public"."SportsEquipment" to "anon";

grant insert on table "public"."SportsEquipment" to "anon";

grant references on table "public"."SportsEquipment" to "anon";

grant select on table "public"."SportsEquipment" to "anon";

grant trigger on table "public"."SportsEquipment" to "anon";

grant truncate on table "public"."SportsEquipment" to "anon";

grant update on table "public"."SportsEquipment" to "anon";

grant delete on table "public"."SportsEquipment" to "authenticated";

grant insert on table "public"."SportsEquipment" to "authenticated";

grant references on table "public"."SportsEquipment" to "authenticated";

grant select on table "public"."SportsEquipment" to "authenticated";

grant trigger on table "public"."SportsEquipment" to "authenticated";

grant truncate on table "public"."SportsEquipment" to "authenticated";

grant update on table "public"."SportsEquipment" to "authenticated";

grant delete on table "public"."SportsEquipment" to "service_role";

grant insert on table "public"."SportsEquipment" to "service_role";

grant references on table "public"."SportsEquipment" to "service_role";

grant select on table "public"."SportsEquipment" to "service_role";

grant trigger on table "public"."SportsEquipment" to "service_role";

grant truncate on table "public"."SportsEquipment" to "service_role";

grant update on table "public"."SportsEquipment" to "service_role";

grant delete on table "public"."ToysGames" to "anon";

grant insert on table "public"."ToysGames" to "anon";

grant references on table "public"."ToysGames" to "anon";

grant select on table "public"."ToysGames" to "anon";

grant trigger on table "public"."ToysGames" to "anon";

grant truncate on table "public"."ToysGames" to "anon";

grant update on table "public"."ToysGames" to "anon";

grant delete on table "public"."ToysGames" to "authenticated";

grant insert on table "public"."ToysGames" to "authenticated";

grant references on table "public"."ToysGames" to "authenticated";

grant select on table "public"."ToysGames" to "authenticated";

grant trigger on table "public"."ToysGames" to "authenticated";

grant truncate on table "public"."ToysGames" to "authenticated";

grant update on table "public"."ToysGames" to "authenticated";

grant delete on table "public"."ToysGames" to "service_role";

grant insert on table "public"."ToysGames" to "service_role";

grant references on table "public"."ToysGames" to "service_role";

grant select on table "public"."ToysGames" to "service_role";

grant trigger on table "public"."ToysGames" to "service_role";

grant truncate on table "public"."ToysGames" to "service_role";

grant update on table "public"."ToysGames" to "service_role";

grant delete on table "public"."Uncatergorized" to "anon";

grant insert on table "public"."Uncatergorized" to "anon";

grant references on table "public"."Uncatergorized" to "anon";

grant select on table "public"."Uncatergorized" to "anon";

grant trigger on table "public"."Uncatergorized" to "anon";

grant truncate on table "public"."Uncatergorized" to "anon";

grant update on table "public"."Uncatergorized" to "anon";

grant delete on table "public"."Uncatergorized" to "authenticated";

grant insert on table "public"."Uncatergorized" to "authenticated";

grant references on table "public"."Uncatergorized" to "authenticated";

grant select on table "public"."Uncatergorized" to "authenticated";

grant trigger on table "public"."Uncatergorized" to "authenticated";

grant truncate on table "public"."Uncatergorized" to "authenticated";

grant update on table "public"."Uncatergorized" to "authenticated";

grant delete on table "public"."Uncatergorized" to "service_role";

grant insert on table "public"."Uncatergorized" to "service_role";

grant references on table "public"."Uncatergorized" to "service_role";

grant select on table "public"."Uncatergorized" to "service_role";

grant trigger on table "public"."Uncatergorized" to "service_role";

grant truncate on table "public"."Uncatergorized" to "service_role";

grant update on table "public"."Uncatergorized" to "service_role";

grant delete on table "public"."admin" to "anon";

grant insert on table "public"."admin" to "anon";

grant references on table "public"."admin" to "anon";

grant select on table "public"."admin" to "anon";

grant trigger on table "public"."admin" to "anon";

grant truncate on table "public"."admin" to "anon";

grant update on table "public"."admin" to "anon";

grant delete on table "public"."admin" to "authenticated";

grant insert on table "public"."admin" to "authenticated";

grant references on table "public"."admin" to "authenticated";

grant select on table "public"."admin" to "authenticated";

grant trigger on table "public"."admin" to "authenticated";

grant truncate on table "public"."admin" to "authenticated";

grant update on table "public"."admin" to "authenticated";

grant delete on table "public"."admin" to "service_role";

grant insert on table "public"."admin" to "service_role";

grant references on table "public"."admin" to "service_role";

grant select on table "public"."admin" to "service_role";

grant trigger on table "public"."admin" to "service_role";

grant truncate on table "public"."admin" to "service_role";

grant update on table "public"."admin" to "service_role";


  create policy "Allow Insertion For Authorized Users"
  on "public"."AnimalCareSupplies"
  as permissive
  for insert
  to authenticated
with check ((EXISTS ( SELECT 1
   FROM public.admin a
  WHERE ((a.uid = auth.uid()) AND (a.cid = a.cid)))));



  create policy "Enable read access for all users"
  on "public"."AnimalCareSupplies"
  as permissive
  for select
  to public
using (true);



  create policy "Allow Insertions For Authorized Users"
  on "public"."Clothing"
  as permissive
  for select
  to public
using ((EXISTS ( SELECT 1
   FROM public.admin a
  WHERE ((a.uid = auth.uid()) AND (a.cid = a.cid)))));



  create policy "Enable read access for all users"
  on "public"."Clothing"
  as permissive
  for select
  to public
using (true);



  create policy "Enable users to view their own data only"
  on "public"."Donation"
  as permissive
  for select
  to authenticated
using ((( SELECT auth.uid() AS uid) = pid));



  create policy "Allow Insertions For Authorized Users"
  on "public"."Electronics"
  as permissive
  for select
  to public
using ((EXISTS ( SELECT 1
   FROM public.admin a
  WHERE ((a.uid = auth.uid()) AND (a.cid = a.cid)))));



  create policy "Enable read access for all users"
  on "public"."Electronics"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."Food"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."Furniture"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."HouseholdGoods"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."HygieneProduct"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."MedicalSupplies"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."Ratings"
  as permissive
  for select
  to public
using (true);



  create policy "Allow Insert On Authorized Users"
  on "public"."Request"
  as permissive
  for insert
  to authenticated
with check ((EXISTS ( SELECT 1
   FROM public.admin a
  WHERE ((a.uid = auth.uid()) AND (a.cid = a.cid)))));



  create policy "Enable read access for all users"
  on "public"."Request"
  as permissive
  for select
  to public
using (true);



  create policy "Policy with table joins"
  on "public"."Request"
  as permissive
  for update
  to public
using ((( SELECT auth.uid() AS uid) IN ( SELECT admin.uid
   FROM public.admin)));



  create policy "Enable read access for all users"
  on "public"."SchoolOfficeSupplies"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."SportsEquipment"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."ToysGames"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."Uncatergorized"
  as permissive
  for select
  to public
using (true);



