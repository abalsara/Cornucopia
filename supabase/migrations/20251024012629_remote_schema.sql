revoke delete on table "public"."Charities" from "anon";

revoke insert on table "public"."Charities" from "anon";

revoke references on table "public"."Charities" from "anon";

revoke select on table "public"."Charities" from "anon";

revoke trigger on table "public"."Charities" from "anon";

revoke truncate on table "public"."Charities" from "anon";

revoke update on table "public"."Charities" from "anon";

revoke delete on table "public"."Charities" from "authenticated";

revoke insert on table "public"."Charities" from "authenticated";

revoke references on table "public"."Charities" from "authenticated";

revoke select on table "public"."Charities" from "authenticated";

revoke trigger on table "public"."Charities" from "authenticated";

revoke truncate on table "public"."Charities" from "authenticated";

revoke update on table "public"."Charities" from "authenticated";

revoke delete on table "public"."Charities" from "service_role";

revoke insert on table "public"."Charities" from "service_role";

revoke references on table "public"."Charities" from "service_role";

revoke select on table "public"."Charities" from "service_role";

revoke trigger on table "public"."Charities" from "service_role";

revoke truncate on table "public"."Charities" from "service_role";

revoke update on table "public"."Charities" from "service_role";

revoke delete on table "public"."Donation" from "anon";

revoke insert on table "public"."Donation" from "anon";

revoke references on table "public"."Donation" from "anon";

revoke select on table "public"."Donation" from "anon";

revoke trigger on table "public"."Donation" from "anon";

revoke truncate on table "public"."Donation" from "anon";

revoke update on table "public"."Donation" from "anon";

revoke delete on table "public"."Donation" from "authenticated";

revoke insert on table "public"."Donation" from "authenticated";

revoke references on table "public"."Donation" from "authenticated";

revoke select on table "public"."Donation" from "authenticated";

revoke trigger on table "public"."Donation" from "authenticated";

revoke truncate on table "public"."Donation" from "authenticated";

revoke update on table "public"."Donation" from "authenticated";

revoke delete on table "public"."Donation" from "service_role";

revoke insert on table "public"."Donation" from "service_role";

revoke references on table "public"."Donation" from "service_role";

revoke select on table "public"."Donation" from "service_role";

revoke trigger on table "public"."Donation" from "service_role";

revoke truncate on table "public"."Donation" from "service_role";

revoke update on table "public"."Donation" from "service_role";

revoke delete on table "public"."Profiles" from "anon";

revoke insert on table "public"."Profiles" from "anon";

revoke references on table "public"."Profiles" from "anon";

revoke select on table "public"."Profiles" from "anon";

revoke trigger on table "public"."Profiles" from "anon";

revoke truncate on table "public"."Profiles" from "anon";

revoke update on table "public"."Profiles" from "anon";

revoke delete on table "public"."Profiles" from "authenticated";

revoke insert on table "public"."Profiles" from "authenticated";

revoke references on table "public"."Profiles" from "authenticated";

revoke select on table "public"."Profiles" from "authenticated";

revoke trigger on table "public"."Profiles" from "authenticated";

revoke truncate on table "public"."Profiles" from "authenticated";

revoke update on table "public"."Profiles" from "authenticated";

revoke delete on table "public"."Profiles" from "service_role";

revoke insert on table "public"."Profiles" from "service_role";

revoke references on table "public"."Profiles" from "service_role";

revoke select on table "public"."Profiles" from "service_role";

revoke trigger on table "public"."Profiles" from "service_role";

revoke truncate on table "public"."Profiles" from "service_role";

revoke update on table "public"."Profiles" from "service_role";

revoke delete on table "public"."Request" from "anon";

revoke insert on table "public"."Request" from "anon";

revoke references on table "public"."Request" from "anon";

revoke select on table "public"."Request" from "anon";

revoke trigger on table "public"."Request" from "anon";

revoke truncate on table "public"."Request" from "anon";

revoke update on table "public"."Request" from "anon";

revoke delete on table "public"."Request" from "authenticated";

revoke insert on table "public"."Request" from "authenticated";

revoke references on table "public"."Request" from "authenticated";

revoke select on table "public"."Request" from "authenticated";

revoke trigger on table "public"."Request" from "authenticated";

revoke truncate on table "public"."Request" from "authenticated";

revoke update on table "public"."Request" from "authenticated";

revoke delete on table "public"."Request" from "service_role";

revoke insert on table "public"."Request" from "service_role";

revoke references on table "public"."Request" from "service_role";

revoke select on table "public"."Request" from "service_role";

revoke trigger on table "public"."Request" from "service_role";

revoke truncate on table "public"."Request" from "service_role";

revoke update on table "public"."Request" from "service_role";

revoke delete on table "public"."RequestPost" from "anon";

revoke insert on table "public"."RequestPost" from "anon";

revoke references on table "public"."RequestPost" from "anon";

revoke select on table "public"."RequestPost" from "anon";

revoke trigger on table "public"."RequestPost" from "anon";

revoke truncate on table "public"."RequestPost" from "anon";

revoke update on table "public"."RequestPost" from "anon";

revoke delete on table "public"."RequestPost" from "authenticated";

revoke insert on table "public"."RequestPost" from "authenticated";

revoke references on table "public"."RequestPost" from "authenticated";

revoke select on table "public"."RequestPost" from "authenticated";

revoke trigger on table "public"."RequestPost" from "authenticated";

revoke truncate on table "public"."RequestPost" from "authenticated";

revoke update on table "public"."RequestPost" from "authenticated";

revoke delete on table "public"."RequestPost" from "service_role";

revoke insert on table "public"."RequestPost" from "service_role";

revoke references on table "public"."RequestPost" from "service_role";

revoke select on table "public"."RequestPost" from "service_role";

revoke trigger on table "public"."RequestPost" from "service_role";

revoke truncate on table "public"."RequestPost" from "service_role";

revoke update on table "public"."RequestPost" from "service_role";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$begin
  insert into public."Profiles" (id, email, first_name, last_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'last_name');
  return new;
end;$function$
;



