
  create table "public"."Availability" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "day_of_week" smallint not null,
    "period_index" smallint not null default '0'::smallint,
    "open_time" time without time zone not null,
    "close_time" time without time zone not null,
    "cid" uuid not null
      );


alter table "public"."Availability" enable row level security;

CREATE UNIQUE INDEX "Availability_id_key" ON public."Availability" USING btree (id);

CREATE UNIQUE INDEX "Availability_pkey" ON public."Availability" USING btree (id);

alter table "public"."Availability" add constraint "Availability_pkey" PRIMARY KEY using index "Availability_pkey";

alter table "public"."Availability" add constraint "Availability_cid_fkey" FOREIGN KEY (cid) REFERENCES public."Charities"(cid) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Availability" validate constraint "Availability_cid_fkey";

alter table "public"."Availability" add constraint "Availability_id_key" UNIQUE using index "Availability_id_key";

grant delete on table "public"."Availability" to "anon";

grant insert on table "public"."Availability" to "anon";

grant references on table "public"."Availability" to "anon";

grant select on table "public"."Availability" to "anon";

grant trigger on table "public"."Availability" to "anon";

grant truncate on table "public"."Availability" to "anon";

grant update on table "public"."Availability" to "anon";

grant delete on table "public"."Availability" to "authenticated";

grant insert on table "public"."Availability" to "authenticated";

grant references on table "public"."Availability" to "authenticated";

grant select on table "public"."Availability" to "authenticated";

grant trigger on table "public"."Availability" to "authenticated";

grant truncate on table "public"."Availability" to "authenticated";

grant update on table "public"."Availability" to "authenticated";

grant delete on table "public"."Availability" to "service_role";

grant insert on table "public"."Availability" to "service_role";

grant references on table "public"."Availability" to "service_role";

grant select on table "public"."Availability" to "service_role";

grant trigger on table "public"."Availability" to "service_role";

grant truncate on table "public"."Availability" to "service_role";

grant update on table "public"."Availability" to "service_role";


  create policy "Allow charity admin to delete"
  on "public"."Availability"
  as permissive
  for delete
  to public
using ((( SELECT auth.uid() AS uid) IN ( SELECT admin.uid
   FROM public.admin
  WHERE (admin.cid = "Availability".cid))));



  create policy "Allow charity admins to insert"
  on "public"."Availability"
  as permissive
  for insert
  to public
with check ((( SELECT auth.uid() AS uid) IN ( SELECT admin.uid
   FROM public.admin
  WHERE (admin.cid = "Availability".cid))));



  create policy "Allow charity admins to update"
  on "public"."Availability"
  as permissive
  for update
  to public
using ((( SELECT auth.uid() AS uid) IN ( SELECT admin.uid
   FROM public.admin
  WHERE (admin.cid = "Availability".cid))));



  create policy "Enable read access for all users"
  on "public"."Availability"
  as permissive
  for select
  to public
using (true);



  create policy "Enable update for charity admins"
  on "public"."Charities"
  as permissive
  for update
  to public
using ((EXISTS ( SELECT 1
   FROM public.admin
  WHERE ((admin.uid = auth.uid()) AND (admin.cid = "Charities".cid)))));



  create policy "Enable users to view their own data only"
  on "public"."admin"
  as permissive
  for select
  to authenticated
using ((( SELECT auth.uid() AS uid) = uid));



