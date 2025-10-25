SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict kLYdzG33BbaOKAJ0MlnHd8hfzWDCh37FD49EeuJJLzpo8502T9DhpiBhrUKdiEP

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', 'e3ebeb44-f6a8-452f-9012-b068d352508f', '{"action":"user_confirmation_requested","actor_id":"f4aa52d4-2775-44d7-bf2f-8ccf2518771e","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-10-08 20:38:36.639389+00', ''),
	('00000000-0000-0000-0000-000000000000', 'be99fa17-82fa-4920-a440-6a02140b5d4a', '{"action":"user_signedup","actor_id":"f4aa52d4-2775-44d7-bf2f-8ccf2518771e","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-10-08 20:39:09.889981+00', ''),
	('00000000-0000-0000-0000-000000000000', '88148563-0a39-41d2-bf0a-23d8601042ab', '{"action":"login","actor_id":"f4aa52d4-2775-44d7-bf2f-8ccf2518771e","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-08 20:39:15.29427+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e4bfcd34-6ae3-4701-a443-70ca7e60e32e', '{"action":"login","actor_id":"f4aa52d4-2775-44d7-bf2f-8ccf2518771e","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-08 20:40:52.618973+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e122626f-964d-47cc-be69-d6b820ed4467', '{"action":"login","actor_id":"f4aa52d4-2775-44d7-bf2f-8ccf2518771e","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-08 20:52:42.678003+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b8d7a83c-8725-452d-8a08-4d7de3f17571', '{"action":"login","actor_id":"f4aa52d4-2775-44d7-bf2f-8ccf2518771e","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-08 23:06:55.211207+00', ''),
	('00000000-0000-0000-0000-000000000000', '4e6889e5-03c1-47d5-971b-67db492187a0', '{"action":"user_confirmation_requested","actor_id":"4b92de54-b19d-4631-b967-0201f32b25e5","actor_username":"elisjoshi@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-10-13 15:25:18.89328+00', ''),
	('00000000-0000-0000-0000-000000000000', '021c2b46-6860-4eb8-a236-fba8a1372193', '{"action":"user_signedup","actor_id":"4b92de54-b19d-4631-b967-0201f32b25e5","actor_username":"elisjoshi@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-10-13 15:25:35.006459+00', ''),
	('00000000-0000-0000-0000-000000000000', '92dcb6c2-6fcc-4d10-b015-a430937a6713', '{"action":"login","actor_id":"4b92de54-b19d-4631-b967-0201f32b25e5","actor_username":"elisjoshi@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-13 15:25:42.83315+00', ''),
	('00000000-0000-0000-0000-000000000000', 'eae77229-503d-4d06-ad70-594cdeaef70b', '{"action":"token_refreshed","actor_id":"4b92de54-b19d-4631-b967-0201f32b25e5","actor_username":"elisjoshi@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-13 18:33:09.463128+00', ''),
	('00000000-0000-0000-0000-000000000000', '7e5f1dc9-6672-4d7d-9545-63a2e24ce7b4', '{"action":"token_revoked","actor_id":"4b92de54-b19d-4631-b967-0201f32b25e5","actor_username":"elisjoshi@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-13 18:33:09.480082+00', ''),
	('00000000-0000-0000-0000-000000000000', '44424dfe-6984-4a28-a77f-8003e5a10ff7', '{"action":"token_refreshed","actor_id":"4b92de54-b19d-4631-b967-0201f32b25e5","actor_username":"elisjoshi@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-13 21:46:23.681383+00', ''),
	('00000000-0000-0000-0000-000000000000', '7ec36b58-8c47-4383-a76d-95c3b3df810e', '{"action":"token_revoked","actor_id":"4b92de54-b19d-4631-b967-0201f32b25e5","actor_username":"elisjoshi@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-13 21:46:23.704219+00', ''),
	('00000000-0000-0000-0000-000000000000', '4923108a-5070-4b7f-9d61-bbc3b1f01b08', '{"action":"token_refreshed","actor_id":"4b92de54-b19d-4631-b967-0201f32b25e5","actor_username":"elisjoshi@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-15 01:36:51.901193+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e07a5bd2-f566-4482-865f-71477bee04cb', '{"action":"token_revoked","actor_id":"4b92de54-b19d-4631-b967-0201f32b25e5","actor_username":"elisjoshi@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-15 01:36:51.911356+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b592936e-66e4-4702-88d2-14a342a2bb52', '{"action":"token_refreshed","actor_id":"4b92de54-b19d-4631-b967-0201f32b25e5","actor_username":"elisjoshi@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-15 19:35:27.580366+00', ''),
	('00000000-0000-0000-0000-000000000000', '7038d45b-883e-4ecc-8db0-8d46c37aef13', '{"action":"token_revoked","actor_id":"4b92de54-b19d-4631-b967-0201f32b25e5","actor_username":"elisjoshi@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-15 19:35:27.60446+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f63466a2-e2b0-403b-bbb4-6e7eca4587e9', '{"action":"token_refreshed","actor_id":"f4aa52d4-2775-44d7-bf2f-8ccf2518771e","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-16 04:17:24.216114+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f144cc0b-be1c-4157-a68a-233c72765de3', '{"action":"token_revoked","actor_id":"f4aa52d4-2775-44d7-bf2f-8ccf2518771e","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-16 04:17:24.236525+00', ''),
	('00000000-0000-0000-0000-000000000000', '66e1855d-aefb-439e-976d-9c22f1984a53', '{"action":"user_confirmation_requested","actor_id":"c9208af3-6bf8-41b7-9c63-5f5d15b47d61","actor_username":"cbither@pm.me","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-10-17 01:59:20.957733+00', ''),
	('00000000-0000-0000-0000-000000000000', '1d9c4c8b-6a06-44a5-85d1-59ae4e2dca95', '{"action":"user_confirmation_requested","actor_id":"d077e7c7-9077-487b-8f36-b3bcc0faa7d5","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-10-17 02:03:37.794015+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ccc85cef-cb83-40c3-869b-59741cb9391b', '{"action":"user_signedup","actor_id":"d077e7c7-9077-487b-8f36-b3bcc0faa7d5","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-10-17 02:04:02.781004+00', ''),
	('00000000-0000-0000-0000-000000000000', '66a108c7-e017-43db-a438-ccc766376c73', '{"action":"user_repeated_signup","actor_id":"d077e7c7-9077-487b-8f36-b3bcc0faa7d5","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-10-17 02:04:36.460874+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e5dab633-5717-4f2f-a886-b1788cf85f59', '{"action":"login","actor_id":"d077e7c7-9077-487b-8f36-b3bcc0faa7d5","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-17 02:05:03.397908+00', ''),
	('00000000-0000-0000-0000-000000000000', '10ed3104-d392-46ce-9107-98f0408ade16', '{"action":"user_repeated_signup","actor_id":"d077e7c7-9077-487b-8f36-b3bcc0faa7d5","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-10-17 02:29:45.02835+00', ''),
	('00000000-0000-0000-0000-000000000000', '93a8ae75-6ee7-41bd-889e-99951b94b374', '{"action":"user_repeated_signup","actor_id":"d077e7c7-9077-487b-8f36-b3bcc0faa7d5","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-10-17 02:30:49.789109+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bfd48bfa-29d6-4ce6-82b5-966cdb74362a', '{"action":"user_repeated_signup","actor_id":"d077e7c7-9077-487b-8f36-b3bcc0faa7d5","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-10-17 02:31:33.011905+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c49559e2-bbdf-4b25-be14-30b887518971', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"cbither@proton.me","user_id":"d077e7c7-9077-487b-8f36-b3bcc0faa7d5","user_phone":""}}', '2025-10-17 02:32:01.051531+00', ''),
	('00000000-0000-0000-0000-000000000000', '34e55e25-ed0a-45e4-a607-2c6e7a94ffb0', '{"action":"user_confirmation_requested","actor_id":"21cad9d0-1a37-40ef-874c-3ff48a7f3df0","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-10-17 02:32:05.363239+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f5ef7416-d06a-473d-b316-4d7c7ab2723c', '{"action":"user_confirmation_requested","actor_id":"21cad9d0-1a37-40ef-874c-3ff48a7f3df0","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-10-17 02:35:19.818654+00', ''),
	('00000000-0000-0000-0000-000000000000', '53045e64-c347-4fb8-9dc2-86a2237660d7', '{"action":"user_confirmation_requested","actor_id":"21cad9d0-1a37-40ef-874c-3ff48a7f3df0","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-10-17 02:36:20.939771+00', ''),
	('00000000-0000-0000-0000-000000000000', '020c4168-5eca-464a-b276-34321a52d8a1', '{"action":"user_confirmation_requested","actor_id":"21cad9d0-1a37-40ef-874c-3ff48a7f3df0","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-10-17 02:42:49.431082+00', ''),
	('00000000-0000-0000-0000-000000000000', '29b3c303-4b5a-4076-9f5e-7e2b78544d88', '{"action":"user_signedup","actor_id":"21cad9d0-1a37-40ef-874c-3ff48a7f3df0","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-10-17 02:43:18.417063+00', ''),
	('00000000-0000-0000-0000-000000000000', 'deb1749b-cc88-4d76-ac43-04b8cc029486', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"cbither@proton.me","user_id":"21cad9d0-1a37-40ef-874c-3ff48a7f3df0","user_phone":""}}', '2025-10-17 03:10:22.880722+00', ''),
	('00000000-0000-0000-0000-000000000000', '01858ce5-d69e-4cd2-93c4-57a26a70f72e', '{"action":"user_confirmation_requested","actor_id":"e4076c5e-e3f8-4d2e-b12f-3dab4a0c94b5","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-10-17 03:10:29.460572+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd20de267-dfe7-48c1-9113-91973b97ecf8', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"cbither@proton.me","user_id":"e4076c5e-e3f8-4d2e-b12f-3dab4a0c94b5","user_phone":""}}', '2025-10-17 16:34:22.008652+00', ''),
	('00000000-0000-0000-0000-000000000000', '17878271-5e46-4326-aaf0-a857daf488a7', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"cbither@pm.me","user_id":"c9208af3-6bf8-41b7-9c63-5f5d15b47d61","user_phone":""}}', '2025-10-17 16:34:22.008492+00', ''),
	('00000000-0000-0000-0000-000000000000', '4133e76d-272d-47ea-b204-0d99562fc677', '{"action":"user_confirmation_requested","actor_id":"b618f999-af35-420c-8fb4-46e4f86b6da7","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-10-17 16:41:05.505087+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b8c7f8e9-90a7-41cf-a586-f64b899474c5', '{"action":"user_signedup","actor_id":"b618f999-af35-420c-8fb4-46e4f86b6da7","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-10-17 16:41:28.055528+00', ''),
	('00000000-0000-0000-0000-000000000000', '4360fe8e-594f-4199-aa21-6b9a125e7e41', '{"action":"login","actor_id":"b618f999-af35-420c-8fb4-46e4f86b6da7","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-18 00:19:54.755372+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e208a927-33fa-4d79-bc5e-77ea940e4f2a', '{"action":"login","actor_id":"b618f999-af35-420c-8fb4-46e4f86b6da7","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-18 00:43:40.862637+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f514607d-0b67-4fc2-a3d9-985880a1f557', '{"action":"login","actor_id":"b618f999-af35-420c-8fb4-46e4f86b6da7","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-18 01:18:24.895656+00', ''),
	('00000000-0000-0000-0000-000000000000', '8e435e8d-e070-4f76-b830-e8877414ea78', '{"action":"token_refreshed","actor_id":"b618f999-af35-420c-8fb4-46e4f86b6da7","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-18 01:44:07.531821+00', ''),
	('00000000-0000-0000-0000-000000000000', '7a9610cf-e755-413e-9d28-c1d7e4c6f0fb', '{"action":"token_revoked","actor_id":"b618f999-af35-420c-8fb4-46e4f86b6da7","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-18 01:44:07.538598+00', ''),
	('00000000-0000-0000-0000-000000000000', '6b7ef96e-685c-4d17-8e5f-c994fbe99d89', '{"action":"token_refreshed","actor_id":"b618f999-af35-420c-8fb4-46e4f86b6da7","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-19 02:51:46.169214+00', ''),
	('00000000-0000-0000-0000-000000000000', '09ad6b22-75f5-47b3-8239-000f1794ce48', '{"action":"token_revoked","actor_id":"b618f999-af35-420c-8fb4-46e4f86b6da7","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-19 02:51:46.191391+00', ''),
	('00000000-0000-0000-0000-000000000000', '8f514509-bd4c-4418-89c4-891cf58795bb', '{"action":"login","actor_id":"b618f999-af35-420c-8fb4-46e4f86b6da7","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-19 03:09:58.49956+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cce4e219-09cf-4978-b42c-30e17b996ddc', '{"action":"login","actor_id":"b618f999-af35-420c-8fb4-46e4f86b6da7","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-19 12:13:10.691044+00', ''),
	('00000000-0000-0000-0000-000000000000', '7748d6e9-7f30-48a9-afb8-b3646f13acb4', '{"action":"token_refreshed","actor_id":"b618f999-af35-420c-8fb4-46e4f86b6da7","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-19 13:56:10.48771+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f117302f-42cb-4c6b-9a3b-45918f41d5eb', '{"action":"token_revoked","actor_id":"b618f999-af35-420c-8fb4-46e4f86b6da7","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-19 13:56:10.509916+00', ''),
	('00000000-0000-0000-0000-000000000000', '0642531e-09cd-4232-a43e-a71244ad7a09', '{"action":"user_repeated_signup","actor_id":"b618f999-af35-420c-8fb4-46e4f86b6da7","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-10-19 16:05:55.352535+00', ''),
	('00000000-0000-0000-0000-000000000000', '2b7986c5-03f3-406d-a5df-0bfb1d763d59', '{"action":"login","actor_id":"b618f999-af35-420c-8fb4-46e4f86b6da7","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-19 16:06:26.433173+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f9054876-5df3-4ada-bfb1-78dab4902cdb', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"cbither@proton.me","user_id":"b618f999-af35-420c-8fb4-46e4f86b6da7","user_phone":""}}', '2025-10-19 16:49:37.225449+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ca716188-1ed7-48e2-810d-e1cd726b7066', '{"action":"user_confirmation_requested","actor_id":"5ff96b39-b226-41a7-8d0b-3b564d8dc381","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-10-19 17:09:23.769099+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a86d0772-9802-4c14-ab57-bf514005a70a', '{"action":"user_signedup","actor_id":"5ff96b39-b226-41a7-8d0b-3b564d8dc381","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-10-19 17:10:22.084077+00', ''),
	('00000000-0000-0000-0000-000000000000', '3af5558d-de9a-4016-9ebc-b45b9577ac10', '{"action":"login","actor_id":"5ff96b39-b226-41a7-8d0b-3b564d8dc381","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-19 17:11:56.864862+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e20b3b6d-f35d-46b3-b0f8-2b52fa2074b7', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"cbither@proton.me","user_id":"5ff96b39-b226-41a7-8d0b-3b564d8dc381","user_phone":""}}', '2025-10-19 17:25:06.695695+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd265a935-61ff-43ff-ba7d-c00650353082', '{"action":"user_confirmation_requested","actor_id":"d0b2b101-8905-4d77-b7be-329281224d73","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-10-19 17:26:02.823003+00', ''),
	('00000000-0000-0000-0000-000000000000', '010aa269-ff0f-48a0-bd7f-6bff938b67e2', '{"action":"user_signedup","actor_id":"d0b2b101-8905-4d77-b7be-329281224d73","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-10-19 17:26:35.654826+00', ''),
	('00000000-0000-0000-0000-000000000000', '936fa20f-ff74-4040-9551-641b5bde6e2d', '{"action":"login","actor_id":"d0b2b101-8905-4d77-b7be-329281224d73","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-19 17:27:15.226637+00', ''),
	('00000000-0000-0000-0000-000000000000', '4e1ade05-dcdc-429f-b29f-11c2d1f7fb4d', '{"action":"user_repeated_signup","actor_id":"d0b2b101-8905-4d77-b7be-329281224d73","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-10-19 17:41:26.099645+00', ''),
	('00000000-0000-0000-0000-000000000000', '0e64bc33-69a8-4ac5-9c4b-9120cf0c766a', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"cbither@proton.me","user_id":"d0b2b101-8905-4d77-b7be-329281224d73","user_phone":""}}', '2025-10-19 17:42:19.409918+00', ''),
	('00000000-0000-0000-0000-000000000000', '81e728e5-dbe3-49a9-b9f3-8b5d977ceeed', '{"action":"user_confirmation_requested","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-10-19 17:42:25.018754+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd21cd5fc-efcd-4290-b83f-19d99c360341', '{"action":"user_signedup","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-10-19 17:42:47.44451+00', ''),
	('00000000-0000-0000-0000-000000000000', '79ca53de-d769-4fff-ab30-a2275b84a10d', '{"action":"login","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-19 17:43:37.019896+00', ''),
	('00000000-0000-0000-0000-000000000000', '813f1c93-e79f-4e52-a216-2cb72bedf161', '{"action":"login","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-19 17:55:44.055727+00', ''),
	('00000000-0000-0000-0000-000000000000', '60cb615e-241f-4490-bc21-a448f295f022', '{"action":"login","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-19 18:08:37.027822+00', ''),
	('00000000-0000-0000-0000-000000000000', '09d80b61-3165-43f9-8e2c-2b0e294cab5a', '{"action":"login","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-19 18:09:20.132242+00', ''),
	('00000000-0000-0000-0000-000000000000', '76555398-d8e5-4340-b55f-f873f9422fe2', '{"action":"login","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-19 18:47:14.584487+00', ''),
	('00000000-0000-0000-0000-000000000000', '5be62bd4-6d69-4f5e-9ac8-bc3f7b475978', '{"action":"token_refreshed","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-19 20:57:40.158451+00', ''),
	('00000000-0000-0000-0000-000000000000', '382bea0b-a650-4ce2-8f2c-7ca4cef87167', '{"action":"token_revoked","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-19 20:57:40.179003+00', ''),
	('00000000-0000-0000-0000-000000000000', '50963da5-88e8-4f77-81ed-01218b2982a5', '{"action":"token_refreshed","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-19 22:08:03.806816+00', ''),
	('00000000-0000-0000-0000-000000000000', '4e8652ab-eb20-487a-bdbd-767feda327e5', '{"action":"token_revoked","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-19 22:08:03.829671+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bb998524-c195-4b48-83c2-a37eb97d9460', '{"action":"token_refreshed","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-19 23:38:09.332901+00', ''),
	('00000000-0000-0000-0000-000000000000', '7b71c746-d8f4-4c15-87b2-a000671915fa', '{"action":"token_revoked","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-19 23:38:09.343013+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f6d705d6-bb76-42f2-a0fc-2a6ff8b5127a', '{"action":"token_refreshed","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-20 00:56:08.116814+00', ''),
	('00000000-0000-0000-0000-000000000000', 'da2dea24-8301-48b6-ab13-cc4138c86fc7', '{"action":"token_revoked","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-20 00:56:08.143533+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a1ab75fc-61a0-4d67-9509-1869b028575c', '{"action":"token_refreshed","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-20 02:34:09.235112+00', ''),
	('00000000-0000-0000-0000-000000000000', '6b39287e-7530-4579-87f8-cdf77ffd2d24', '{"action":"token_revoked","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-20 02:34:09.25348+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c4b78e6c-f4a1-40c0-bb8e-95129a72d4e6', '{"action":"token_refreshed","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-20 03:59:31.454644+00', ''),
	('00000000-0000-0000-0000-000000000000', '3f58ad52-dc32-4cf3-8984-ec8cacc0da35', '{"action":"token_revoked","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-20 03:59:31.477374+00', ''),
	('00000000-0000-0000-0000-000000000000', '7bcd749c-e5c3-46ed-b838-ef8f809e0933', '{"action":"token_refreshed","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-20 05:40:55.401677+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd90e0458-a51e-42fa-9de5-458830874533', '{"action":"token_revoked","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-20 05:40:55.415459+00', ''),
	('00000000-0000-0000-0000-000000000000', '81da8a8e-5a82-4853-9cd2-8baae874fc70', '{"action":"token_refreshed","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-20 07:00:06.66847+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c75d591e-c761-4209-ab9b-3248de9fcc1f', '{"action":"token_revoked","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-20 07:00:06.695784+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c60565e4-7cfb-48df-8bb8-56a1f8834be7', '{"action":"token_refreshed","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-20 08:07:39.067306+00', ''),
	('00000000-0000-0000-0000-000000000000', '2942294a-4d03-4c42-b735-6d428bfdfd3c', '{"action":"token_revoked","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-20 08:07:39.096393+00', ''),
	('00000000-0000-0000-0000-000000000000', '2de639cd-bf6d-4b2c-8c94-3c6b252bf1bf', '{"action":"token_refreshed","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-20 09:45:02.891046+00', ''),
	('00000000-0000-0000-0000-000000000000', '17e03ba4-8e56-4c94-84cd-7dfe1e7b3c96', '{"action":"token_revoked","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-20 09:45:02.907839+00', ''),
	('00000000-0000-0000-0000-000000000000', '1a2fa6de-fd93-4f32-a0a8-9681ebb99f04', '{"action":"token_refreshed","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-20 11:26:00.721094+00', ''),
	('00000000-0000-0000-0000-000000000000', '22364c8d-724f-4788-b405-4b556b6c43c5', '{"action":"token_revoked","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-20 11:26:00.735706+00', ''),
	('00000000-0000-0000-0000-000000000000', '74022a9d-a00f-4df2-b48d-330c6a170d38', '{"action":"token_refreshed","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-20 12:47:35.691598+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f83b7309-3b66-4290-af9d-6a4774f9bc57', '{"action":"token_revoked","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-20 12:47:35.710751+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aa232474-8170-4974-adf9-384a7dbce3c7', '{"action":"token_refreshed","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-20 14:22:12.500897+00', ''),
	('00000000-0000-0000-0000-000000000000', '74a8ab67-0578-4846-a90b-c24a98a7f848', '{"action":"token_revoked","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-20 14:22:12.514458+00', ''),
	('00000000-0000-0000-0000-000000000000', '4875729d-fff8-4ee9-b3fa-392288772614', '{"action":"token_refreshed","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-20 15:58:33.225083+00', ''),
	('00000000-0000-0000-0000-000000000000', '6a52a979-74d0-49b2-9c3a-a39bbb0baa66', '{"action":"token_revoked","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-20 15:58:33.241307+00', ''),
	('00000000-0000-0000-0000-000000000000', '9ddf7fcb-f701-4796-964a-37bb77264cd0', '{"action":"login","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-20 18:12:24.56+00', ''),
	('00000000-0000-0000-0000-000000000000', '328bed44-4a5f-4c1a-95a6-ba9b23c25f3d', '{"action":"login","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-20 18:15:01.692009+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cbdc5e70-c26b-43d8-bd00-b1604b93b5cf', '{"action":"token_refreshed","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-20 18:19:04.654264+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f691635c-2e57-4b6f-a032-bad6ebd691a6', '{"action":"token_revoked","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-20 18:19:04.658326+00', ''),
	('00000000-0000-0000-0000-000000000000', '738b0c01-e153-4bda-bd06-22a6eb99556b', '{"action":"token_refreshed","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-21 22:14:20.507369+00', ''),
	('00000000-0000-0000-0000-000000000000', '3b3b49ed-d5ea-4346-97e7-b9688dab02bf', '{"action":"token_revoked","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-21 22:14:20.532803+00', ''),
	('00000000-0000-0000-0000-000000000000', '95b91c2f-fbff-4785-92f1-ede8e38dd2f7', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"charles@charlesbither.com","user_id":"f4aa52d4-2775-44d7-bf2f-8ccf2518771e","user_phone":""}}', '2025-10-21 23:03:20.351118+00', ''),
	('00000000-0000-0000-0000-000000000000', '8362e010-a036-478e-bb4c-d596192caf9a', '{"action":"user_confirmation_requested","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-10-21 23:06:04.122541+00', ''),
	('00000000-0000-0000-0000-000000000000', '3c58b438-d22b-41fe-a175-00fc1d6862fc', '{"action":"user_signedup","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-10-21 23:06:56.264453+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c5b3d12c-58bc-4564-a533-b724f79c048f', '{"action":"login","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-21 23:07:40.365825+00', ''),
	('00000000-0000-0000-0000-000000000000', '4fc844ef-9ee9-423c-bf97-c9fa04adcf23', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 00:19:56.493477+00', ''),
	('00000000-0000-0000-0000-000000000000', '38053b26-10f5-4066-b93c-0088e41dd781', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 00:19:56.517014+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a99d5f1a-5d27-4707-8f39-d14a7a63651a', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 01:28:00.194532+00', ''),
	('00000000-0000-0000-0000-000000000000', '27b8735e-ac6d-43f9-8fac-6aeda22b1b4f', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 01:28:00.209889+00', ''),
	('00000000-0000-0000-0000-000000000000', '45853f23-6801-4e00-8110-5bf96735b025', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 02:37:20.228902+00', ''),
	('00000000-0000-0000-0000-000000000000', '4c7fd049-d4c3-4dd3-9ef4-b317939772e9', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 02:37:20.238595+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f13f3133-e546-490a-83fb-bca8fba10e95', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 03:35:49.657767+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e67a7b85-606a-467e-a33f-aa79a0c0d224', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 03:35:49.682674+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ae8dfce8-967f-4aac-be3d-74d168ab8eb7', '{"action":"login","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-22 04:12:51.161754+00', ''),
	('00000000-0000-0000-0000-000000000000', '961908ef-f3b5-4c43-890d-e2ad0c7253eb', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 04:46:12.38364+00', ''),
	('00000000-0000-0000-0000-000000000000', '43c820fd-5c77-4916-b750-125324c52939', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 04:46:12.397336+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aba0c4a3-666a-4382-84d6-d203e86f0ff0', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 05:44:39.63144+00', ''),
	('00000000-0000-0000-0000-000000000000', '34e16af7-f93c-4779-80aa-efa99295d878', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 05:44:39.644774+00', ''),
	('00000000-0000-0000-0000-000000000000', '46ad84a4-2e7c-4c00-a498-e400df51e844', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 06:43:00.518264+00', ''),
	('00000000-0000-0000-0000-000000000000', '388bfd6a-f2cc-4172-9bb8-5fb7302a8d77', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 06:43:00.537659+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aff34a4d-b9af-4f32-b8b0-e24db69b099e', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 07:51:45.13906+00', ''),
	('00000000-0000-0000-0000-000000000000', '7f87e20b-3f01-481e-a640-87a961b48a16', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 07:51:45.14887+00', ''),
	('00000000-0000-0000-0000-000000000000', '7c19c7e1-b366-4a0c-b658-60beba546454', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 08:50:01.33043+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aabbf18e-feb4-4dbe-9d2e-03e1d70916ab', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 08:50:01.3547+00', ''),
	('00000000-0000-0000-0000-000000000000', '9193d281-40c0-46e3-a661-e713497f0e52', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 10:00:52.390331+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c094433c-61fd-44a2-aee4-29dc27ad4074', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 10:00:52.412059+00', ''),
	('00000000-0000-0000-0000-000000000000', '59bee29d-0c9c-40e6-a756-0c870935b6fb', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 10:59:22.501012+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ce2e455c-161b-430c-8a0a-b6295b81e6f7', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 10:59:22.519408+00', ''),
	('00000000-0000-0000-0000-000000000000', '9e1c3b97-1546-4e54-9fd0-f5c6add4e115', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 11:57:33.674738+00', ''),
	('00000000-0000-0000-0000-000000000000', 'da043c33-6c81-4884-a7c6-9e8b8ab6d712', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 11:57:33.693561+00', ''),
	('00000000-0000-0000-0000-000000000000', '5eae5207-2acc-43ea-b78c-126af635a87e', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 13:09:17.560057+00', ''),
	('00000000-0000-0000-0000-000000000000', '552223ca-ebad-4d9f-9334-6be9cac9f865', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 13:09:17.572225+00', ''),
	('00000000-0000-0000-0000-000000000000', '735760c5-1fa1-4110-8ca4-69caac3b36f4', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 14:07:44.357676+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd464dc1f-ab98-42f1-8025-4a2d442ebf8a', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 14:07:44.369389+00', ''),
	('00000000-0000-0000-0000-000000000000', '1d984f0c-b95a-490f-a547-445c7e08c46b', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 15:17:08.856834+00', ''),
	('00000000-0000-0000-0000-000000000000', '88ddd7c9-a9e2-4bdf-b719-8fd5bfa872e8', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 15:17:08.870005+00', ''),
	('00000000-0000-0000-0000-000000000000', '713aec9f-c887-40ce-a33d-15d11e66171b', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 16:24:12.38346+00', ''),
	('00000000-0000-0000-0000-000000000000', '978d78f0-6d99-4e5e-8192-03f4963993e0', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 16:24:12.394505+00', ''),
	('00000000-0000-0000-0000-000000000000', '10283b00-3d58-4437-ab24-ab6c87edc018', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 17:22:18.713709+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b3407b63-6ad6-40fd-a3a1-04a43c75451e', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 17:22:18.727474+00', ''),
	('00000000-0000-0000-0000-000000000000', '84215fcd-ca4c-43c0-b50d-4eac683691d8', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 18:23:11.071082+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd6ab50d0-b82a-486a-b67c-8d2ebfc3aa8d', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 18:23:11.087068+00', ''),
	('00000000-0000-0000-0000-000000000000', '1ef4bbaf-aa85-4405-98e1-e67c8ba2cec5', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 19:26:24.82614+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a35926f4-6922-4bb7-a4d9-5d9651d34237', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 19:26:24.84549+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd717705f-8436-4a97-b630-c565e9d684db', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 20:33:02.1789+00', ''),
	('00000000-0000-0000-0000-000000000000', '35931f73-cf57-4c96-9572-0497d38d2a8c', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 20:33:02.201788+00', ''),
	('00000000-0000-0000-0000-000000000000', '3a568fe1-b26a-4c8c-9466-fedc7d79c6c8', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 21:31:32.423916+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e7e9fbab-2fea-4215-b1dd-3b95bf8cdf3e', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 21:31:32.438648+00', ''),
	('00000000-0000-0000-0000-000000000000', '6c76bf2e-ed07-4f8b-a29b-69aa9c28420e', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 23:21:37.478267+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fb94ba87-c914-416a-81d9-1f2e7e61def2', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-22 23:21:37.505837+00', ''),
	('00000000-0000-0000-0000-000000000000', '3013053c-7d84-4f2d-9cf5-9f7bcdfc5026', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 00:38:14.301444+00', ''),
	('00000000-0000-0000-0000-000000000000', '693635be-6d43-4913-becf-f363e299c557', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 00:38:14.32357+00', ''),
	('00000000-0000-0000-0000-000000000000', '79eb1b9d-b4f1-407e-a596-bd860097f516', '{"action":"token_refreshed","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-23 00:47:05.682546+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f50d1c34-a8ae-4984-952c-1b5d5af599dc', '{"action":"token_revoked","actor_id":"a08263ba-bea2-4e23-a0b1-9c8e378eac98","actor_username":"cbither@proton.me","actor_via_sso":false,"log_type":"token"}', '2025-10-23 00:47:05.689919+00', ''),
	('00000000-0000-0000-0000-000000000000', '845c6dbf-ab99-463b-b70a-ba3ee1fc34ad', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 01:40:33.641095+00', ''),
	('00000000-0000-0000-0000-000000000000', '8a2855ba-66bb-4b2d-a75d-8484ea59bc33', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 01:40:33.656632+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd6f2d21d-0500-49a7-9ed8-df750b8b7766', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 02:57:33.70588+00', ''),
	('00000000-0000-0000-0000-000000000000', '3c114624-7390-48f1-a96c-49385c08a65f', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 02:57:33.723142+00', ''),
	('00000000-0000-0000-0000-000000000000', '672d0272-40f6-4632-9ec0-291586ea563c', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 04:14:07.576261+00', ''),
	('00000000-0000-0000-0000-000000000000', '2f71982c-6c33-4554-92b4-3836bb626de5', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 04:14:07.590791+00', ''),
	('00000000-0000-0000-0000-000000000000', '76d6b4af-0b49-433d-a9ea-a68adef5f0c6', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 04:31:25.404151+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b317c148-61b6-46a7-b74b-8225cf65c781', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 05:49:07.570234+00', ''),
	('00000000-0000-0000-0000-000000000000', '422a7f53-2754-41bb-9973-6c7f956013eb', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 05:49:07.593041+00', ''),
	('00000000-0000-0000-0000-000000000000', '6bc17999-7326-4025-b6ef-caa49fc98e09', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 07:00:07.547587+00', ''),
	('00000000-0000-0000-0000-000000000000', 'da98c623-8919-4bde-865e-32f7193db80b', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 07:00:07.559922+00', ''),
	('00000000-0000-0000-0000-000000000000', '7506446c-e23c-4a9a-a290-ba49d323c4ab', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 08:40:52.906849+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ff7fa81b-0cc7-42e1-af17-f32a1302a31d', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 08:40:52.934509+00', ''),
	('00000000-0000-0000-0000-000000000000', '024a8cb6-7a85-4cdd-a416-0f6c8b800b87', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 10:03:45.899098+00', ''),
	('00000000-0000-0000-0000-000000000000', 'be02142a-1d35-4bb5-adae-80dbea9fb5b4', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 10:03:45.914123+00', ''),
	('00000000-0000-0000-0000-000000000000', '123f66f8-141d-4f3f-941b-cfcb52288d9e', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 11:13:57.105388+00', ''),
	('00000000-0000-0000-0000-000000000000', '1f12408a-eab6-441f-8934-f657f2e5c21a', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 11:13:57.120868+00', ''),
	('00000000-0000-0000-0000-000000000000', '56dfa03e-0ecf-4167-a36a-420a8f198099', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 11:31:30.803028+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bb94a930-9e14-4fdb-9875-84328712a1c9', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 12:56:40.346752+00', ''),
	('00000000-0000-0000-0000-000000000000', '9cb17921-bd9e-4e6e-8ef0-7675e0683d64', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 12:56:40.363883+00', ''),
	('00000000-0000-0000-0000-000000000000', '7665ee11-52a1-4b11-9923-1f97c13275f6', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 13:13:29.701211+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c22490f8-7fce-4646-abf6-fb2cd10898e6', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 15:07:11.662442+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd4a69135-192e-4c38-b3db-1cd69a6f33c2', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 15:07:11.680618+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a7e6c36e-12d6-426b-903b-355175baad90', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 16:17:55.339836+00', ''),
	('00000000-0000-0000-0000-000000000000', '8b3dbc3b-fe64-4d3b-a3f7-6f9860c87484', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 16:17:55.354078+00', ''),
	('00000000-0000-0000-0000-000000000000', '1e43319e-15a3-473a-bb31-6cb7be2d5a5f', '{"action":"token_refreshed","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 17:35:59.657768+00', ''),
	('00000000-0000-0000-0000-000000000000', '5eec6ccc-b7a8-43c1-9745-6898c8fac2a9', '{"action":"token_revoked","actor_id":"7860123e-1eb8-4fc9-814c-26878013d170","actor_username":"charles@charlesbither.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 17:35:59.68728+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '4b92de54-b19d-4631-b967-0201f32b25e5', 'authenticated', 'authenticated', 'elisjoshi@gmail.com', '$2a$10$innTLIHKu/u5gQz2yktm.uboFJLnjVA8prBKkAceTthIjl/iUzjW2', '2025-10-13 15:25:35.007095+00', NULL, '', '2025-10-13 15:25:18.905945+00', '', NULL, '', '', NULL, '2025-10-13 15:25:42.834198+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "4b92de54-b19d-4631-b967-0201f32b25e5", "email": "elisjoshi@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-10-13 15:25:18.814882+00', '2025-10-15 19:35:27.641096+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', 'authenticated', 'authenticated', 'cbither@proton.me', '$2a$10$0vack2GPRhXmNIK2jWAbZuaYOOevY103QFUQHNjtCrKA6tpjLIsAq', '2025-10-19 17:42:47.446478+00', NULL, '', '2025-10-19 17:42:25.019295+00', '', NULL, '', '', NULL, '2025-10-22 04:12:51.186747+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "a08263ba-bea2-4e23-a0b1-9c8e378eac98", "email": "cbither@proton.me", "last_name": "Bither", "first_name": "Charles", "email_verified": true, "phone_verified": false}', NULL, '2025-10-19 17:42:25.002874+00', '2025-10-23 00:47:05.704395+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '7860123e-1eb8-4fc9-814c-26878013d170', 'authenticated', 'authenticated', 'charles@charlesbither.com', '$2a$10$mfy7FFjizf3Kv7hHfSa8HOxXj4LrMO5QZpWQLOgPMlyNdmfu3I7Pa', '2025-10-21 23:06:56.265083+00', NULL, '', '2025-10-21 23:06:04.134941+00', '', NULL, '', '', NULL, '2025-10-21 23:07:40.366928+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "7860123e-1eb8-4fc9-814c-26878013d170", "email": "charles@charlesbither.com", "last_name": "Bither", "first_name": "Charles", "email_verified": true, "phone_verified": false}', NULL, '2025-10-21 23:06:04.012645+00', '2025-10-23 17:35:59.730368+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('4b92de54-b19d-4631-b967-0201f32b25e5', '4b92de54-b19d-4631-b967-0201f32b25e5', '{"sub": "4b92de54-b19d-4631-b967-0201f32b25e5", "email": "elisjoshi@gmail.com", "email_verified": true, "phone_verified": false}', 'email', '2025-10-13 15:25:18.872941+00', '2025-10-13 15:25:18.872999+00', '2025-10-13 15:25:18.872999+00', '727d7b74-d3e5-42a4-8758-71c36b17935e'),
	('a08263ba-bea2-4e23-a0b1-9c8e378eac98', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', '{"sub": "a08263ba-bea2-4e23-a0b1-9c8e378eac98", "email": "cbither@proton.me", "last_name": "Bither", "first_name": "Charles", "email_verified": true, "phone_verified": false}', 'email', '2025-10-19 17:42:25.012443+00', '2025-10-19 17:42:25.013547+00', '2025-10-19 17:42:25.013547+00', '6f821423-6e9e-4b52-8e97-726e7382ff40'),
	('7860123e-1eb8-4fc9-814c-26878013d170', '7860123e-1eb8-4fc9-814c-26878013d170', '{"sub": "7860123e-1eb8-4fc9-814c-26878013d170", "email": "charles@charlesbither.com", "last_name": "Bither", "first_name": "Charles", "email_verified": true, "phone_verified": false}', 'email', '2025-10-21 23:06:04.110144+00', '2025-10-21 23:06:04.11286+00', '2025-10-21 23:06:04.11286+00', '8da57719-7500-43fc-bf4f-73233e7169cb');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag", "oauth_client_id") VALUES
	('24c41442-ce5d-46bb-8f0c-e70a3c5515ae', '4b92de54-b19d-4631-b967-0201f32b25e5', '2025-10-13 15:25:35.011201+00', '2025-10-13 15:25:35.011201+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0.1 Safari/605.1.15', '205.175.106.195', NULL, NULL),
	('9b6b9796-1335-4087-9396-c3fdf7d64d47', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', '2025-10-20 18:12:24.591296+00', '2025-10-20 18:12:24.591296+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '174.224.200.101', NULL, NULL),
	('dd7b7824-1f54-401a-beba-b9ba5ef8e79c', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', '2025-10-20 18:15:01.693232+00', '2025-10-20 18:15:01.693232+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '174.224.200.101', NULL, NULL),
	('ba8509e8-c600-492d-baee-a6e9ea291369', '4b92de54-b19d-4631-b967-0201f32b25e5', '2025-10-13 15:25:42.834269+00', '2025-10-15 19:35:27.652779+00', NULL, 'aal1', NULL, '2025-10-15 19:35:27.652688', 'Cornucopia/1 CFNetwork/3860.100.1 Darwin/25.0.0', '205.175.106.189', NULL, NULL),
	('7032aa46-43e5-441e-8024-2747228b92cf', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', '2025-10-19 18:47:14.606633+00', '2025-10-21 22:14:20.58217+00', NULL, 'aal1', NULL, '2025-10-21 22:14:20.582077', 'Cornucopia/1 CFNetwork/3860.100.1 Darwin/24.6.0', '205.175.106.201', NULL, NULL),
	('0bed5abd-5c21-4d51-a47e-cf027f71459f', '7860123e-1eb8-4fc9-814c-26878013d170', '2025-10-21 23:06:56.269652+00', '2025-10-21 23:06:56.269652+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Safari/605.1.15', '67.185.22.4', NULL, NULL),
	('0d1af496-a8f4-4a48-91dc-7e01be5fc54d', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', '2025-10-19 17:42:47.453494+00', '2025-10-19 17:42:47.453494+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36', '67.185.22.4', NULL, NULL),
	('5c356647-b38a-4e31-9e22-f22c8df795f5', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', '2025-10-19 17:43:37.021104+00', '2025-10-19 17:43:37.021104+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '67.185.22.4', NULL, NULL),
	('82ab3b0c-3f5c-4359-abf1-818e78c4e255', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', '2025-10-19 17:55:44.077323+00', '2025-10-19 17:55:44.077323+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '67.185.22.4', NULL, NULL),
	('d160c71c-b7cc-472e-b570-e0a1f7ae4cda', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', '2025-10-19 18:08:37.043009+00', '2025-10-19 18:08:37.043009+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '67.185.22.4', NULL, NULL),
	('315e2af2-2906-4606-b20a-3cbdf88a4c9a', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', '2025-10-19 18:09:20.133048+00', '2025-10-19 18:09:20.133048+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '67.185.22.4', NULL, NULL),
	('e2349c02-c066-4a18-911e-dcb87faceb70', '7860123e-1eb8-4fc9-814c-26878013d170', '2025-10-21 23:07:40.36705+00', '2025-10-23 17:35:59.748324+00', NULL, 'aal1', NULL, '2025-10-23 17:35:59.746462', 'Cornucopia/1 CFNetwork/3860.100.1 Darwin/24.6.0', '67.185.22.4', NULL, NULL),
	('a20fb82b-cfa3-40c8-883f-3d1bafb0d75c', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', '2025-10-22 04:12:51.186858+00', '2025-10-23 00:47:05.706437+00', NULL, 'aal1', NULL, '2025-10-23 00:47:05.706354', 'okhttp/4.12.0', '174.224.199.169', NULL, NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('24c41442-ce5d-46bb-8f0c-e70a3c5515ae', '2025-10-13 15:25:35.043425+00', '2025-10-13 15:25:35.043425+00', 'otp', '40d25098-185f-4a5e-b353-2130b57a8594'),
	('ba8509e8-c600-492d-baee-a6e9ea291369', '2025-10-13 15:25:42.836104+00', '2025-10-13 15:25:42.836104+00', 'password', 'cf470869-6054-4b10-b81f-6d15e3fca5cb'),
	('0d1af496-a8f4-4a48-91dc-7e01be5fc54d', '2025-10-19 17:42:47.458223+00', '2025-10-19 17:42:47.458223+00', 'otp', '38c0b761-f9ac-40f4-b8c7-848d9378fddb'),
	('5c356647-b38a-4e31-9e22-f22c8df795f5', '2025-10-19 17:43:37.02326+00', '2025-10-19 17:43:37.02326+00', 'password', 'f52dceb9-7f5d-4a9e-ba1b-e164efd96a2a'),
	('82ab3b0c-3f5c-4359-abf1-818e78c4e255', '2025-10-19 17:55:44.105373+00', '2025-10-19 17:55:44.105373+00', 'password', 'cfe82370-5d1e-4c9e-a882-b55ef27b7cee'),
	('d160c71c-b7cc-472e-b570-e0a1f7ae4cda', '2025-10-19 18:08:37.087605+00', '2025-10-19 18:08:37.087605+00', 'password', '32f18669-0edc-495e-96e2-7ae5b6490397'),
	('315e2af2-2906-4606-b20a-3cbdf88a4c9a', '2025-10-19 18:09:20.135812+00', '2025-10-19 18:09:20.135812+00', 'password', 'ab2bbd83-dc32-4a46-9200-70183addb991'),
	('7032aa46-43e5-441e-8024-2747228b92cf', '2025-10-19 18:47:14.638053+00', '2025-10-19 18:47:14.638053+00', 'password', 'e563b5c7-ad49-4c2f-b56e-64922e93311a'),
	('9b6b9796-1335-4087-9396-c3fdf7d64d47', '2025-10-20 18:12:24.683869+00', '2025-10-20 18:12:24.683869+00', 'password', '45f0d014-a119-44aa-9db7-c1718110310b'),
	('dd7b7824-1f54-401a-beba-b9ba5ef8e79c', '2025-10-20 18:15:01.705377+00', '2025-10-20 18:15:01.705377+00', 'password', 'bd8b8395-f43c-4104-9f13-75a749594358'),
	('0bed5abd-5c21-4d51-a47e-cf027f71459f', '2025-10-21 23:06:56.289039+00', '2025-10-21 23:06:56.289039+00', 'otp', 'c5b76732-3b4b-47c0-8833-6b3be1fec50f'),
	('e2349c02-c066-4a18-911e-dcb87faceb70', '2025-10-21 23:07:40.370272+00', '2025-10-21 23:07:40.370272+00', 'password', '62924ab0-e50c-4c8a-866b-0a7bb62b474c'),
	('a20fb82b-cfa3-40c8-883f-3d1bafb0d75c', '2025-10-22 04:12:51.226621+00', '2025-10-22 04:12:51.226621+00', 'password', '91c44eb3-a512-438b-9fd3-d357372bd731');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 66, 'yliuanayej2y', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-22 10:00:52.429249+00', '2025-10-22 10:59:22.520757+00', '5th62mhsmgnq', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 67, 's7vr4abv45vy', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-22 10:59:22.532574+00', '2025-10-22 11:57:33.69593+00', 'yliuanayej2y', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 68, 'ygbzsrw4c35c', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-22 11:57:33.709868+00', '2025-10-22 13:09:17.575104+00', 's7vr4abv45vy', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 6, 'fydlcou6i6gg', '4b92de54-b19d-4631-b967-0201f32b25e5', false, '2025-10-13 15:25:35.022288+00', '2025-10-13 15:25:35.022288+00', NULL, '24c41442-ce5d-46bb-8f0c-e70a3c5515ae'),
	('00000000-0000-0000-0000-000000000000', 7, 'at43mkb4uthl', '4b92de54-b19d-4631-b967-0201f32b25e5', true, '2025-10-13 15:25:42.834964+00', '2025-10-13 18:33:09.480725+00', NULL, 'ba8509e8-c600-492d-baee-a6e9ea291369'),
	('00000000-0000-0000-0000-000000000000', 69, 'pu4u3m7fogci', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-22 13:09:17.587003+00', '2025-10-22 14:07:44.371837+00', 'ygbzsrw4c35c', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 8, 'gzp7hofur7kk', '4b92de54-b19d-4631-b967-0201f32b25e5', true, '2025-10-13 18:33:09.496197+00', '2025-10-13 21:46:23.705929+00', 'at43mkb4uthl', 'ba8509e8-c600-492d-baee-a6e9ea291369'),
	('00000000-0000-0000-0000-000000000000', 9, 'ffzqve5zbphk', '4b92de54-b19d-4631-b967-0201f32b25e5', true, '2025-10-13 21:46:23.727446+00', '2025-10-15 01:36:51.912527+00', 'gzp7hofur7kk', 'ba8509e8-c600-492d-baee-a6e9ea291369'),
	('00000000-0000-0000-0000-000000000000', 70, 'iglxbywi7ij4', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-22 14:07:44.380665+00', '2025-10-22 15:17:08.871956+00', 'pu4u3m7fogci', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 10, '66fieufmi56m', '4b92de54-b19d-4631-b967-0201f32b25e5', true, '2025-10-15 01:36:51.926167+00', '2025-10-15 19:35:27.607501+00', 'ffzqve5zbphk', 'ba8509e8-c600-492d-baee-a6e9ea291369'),
	('00000000-0000-0000-0000-000000000000', 11, 's7ph2hmbau4d', '4b92de54-b19d-4631-b967-0201f32b25e5', false, '2025-10-15 19:35:27.628517+00', '2025-10-15 19:35:27.628517+00', '66fieufmi56m', 'ba8509e8-c600-492d-baee-a6e9ea291369'),
	('00000000-0000-0000-0000-000000000000', 71, 'kibifdutlguo', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-22 15:17:08.879834+00', '2025-10-22 16:24:12.395195+00', 'iglxbywi7ij4', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 72, 'r6bwvszbtpzl', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-22 16:24:12.408003+00', '2025-10-22 17:22:18.728183+00', 'kibifdutlguo', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 73, 'xcp4gtl2pufc', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-22 17:22:18.734603+00', '2025-10-22 18:23:11.091202+00', 'r6bwvszbtpzl', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 60, '5q7cdpnieeyq', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', true, '2025-10-22 04:12:51.209234+00', '2025-10-23 00:47:05.691714+00', NULL, 'a20fb82b-cfa3-40c8-883f-3d1bafb0d75c'),
	('00000000-0000-0000-0000-000000000000', 30, 'cmjo2c42zpow', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', false, '2025-10-19 17:42:47.456581+00', '2025-10-19 17:42:47.456581+00', NULL, '0d1af496-a8f4-4a48-91dc-7e01be5fc54d'),
	('00000000-0000-0000-0000-000000000000', 31, 'y7v3xditvquc', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', false, '2025-10-19 17:43:37.021937+00', '2025-10-19 17:43:37.021937+00', NULL, '5c356647-b38a-4e31-9e22-f22c8df795f5'),
	('00000000-0000-0000-0000-000000000000', 32, 'crynvsi2moid', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', false, '2025-10-19 17:55:44.088597+00', '2025-10-19 17:55:44.088597+00', NULL, '82ab3b0c-3f5c-4359-abf1-818e78c4e255'),
	('00000000-0000-0000-0000-000000000000', 33, 'ojztgvztkag6', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', false, '2025-10-19 18:08:37.065405+00', '2025-10-19 18:08:37.065405+00', NULL, 'd160c71c-b7cc-472e-b570-e0a1f7ae4cda'),
	('00000000-0000-0000-0000-000000000000', 34, '2c2ga2g5haoi', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', false, '2025-10-19 18:09:20.133828+00', '2025-10-19 18:09:20.133828+00', NULL, '315e2af2-2906-4606-b20a-3cbdf88a4c9a'),
	('00000000-0000-0000-0000-000000000000', 35, 'dhninv6ddwbd', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', true, '2025-10-19 18:47:14.62644+00', '2025-10-19 20:57:40.182085+00', NULL, '7032aa46-43e5-441e-8024-2747228b92cf'),
	('00000000-0000-0000-0000-000000000000', 36, 'jdfxmgqzlcpn', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', true, '2025-10-19 20:57:40.197126+00', '2025-10-19 22:08:03.830382+00', 'dhninv6ddwbd', '7032aa46-43e5-441e-8024-2747228b92cf'),
	('00000000-0000-0000-0000-000000000000', 37, 'wt7enjr3dwqz', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', true, '2025-10-19 22:08:03.856672+00', '2025-10-19 23:38:09.344743+00', 'jdfxmgqzlcpn', '7032aa46-43e5-441e-8024-2747228b92cf'),
	('00000000-0000-0000-0000-000000000000', 38, 'ffauffcies6c', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', true, '2025-10-19 23:38:09.357908+00', '2025-10-20 00:56:08.144216+00', 'wt7enjr3dwqz', '7032aa46-43e5-441e-8024-2747228b92cf'),
	('00000000-0000-0000-0000-000000000000', 39, '7svila34dslu', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', true, '2025-10-20 00:56:08.169523+00', '2025-10-20 02:34:09.256721+00', 'ffauffcies6c', '7032aa46-43e5-441e-8024-2747228b92cf'),
	('00000000-0000-0000-0000-000000000000', 40, 'bkvxitbwygwm', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', true, '2025-10-20 02:34:09.264721+00', '2025-10-20 03:59:31.478774+00', '7svila34dslu', '7032aa46-43e5-441e-8024-2747228b92cf'),
	('00000000-0000-0000-0000-000000000000', 41, '5fhgp2x3wjd4', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', true, '2025-10-20 03:59:31.497332+00', '2025-10-20 05:40:55.418387+00', 'bkvxitbwygwm', '7032aa46-43e5-441e-8024-2747228b92cf'),
	('00000000-0000-0000-0000-000000000000', 42, 'dhdelyrhdoae', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', true, '2025-10-20 05:40:55.442886+00', '2025-10-20 07:00:06.696498+00', '5fhgp2x3wjd4', '7032aa46-43e5-441e-8024-2747228b92cf'),
	('00000000-0000-0000-0000-000000000000', 43, 'dshvt3m6wmxr', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', true, '2025-10-20 07:00:06.727124+00', '2025-10-20 08:07:39.09832+00', 'dhdelyrhdoae', '7032aa46-43e5-441e-8024-2747228b92cf'),
	('00000000-0000-0000-0000-000000000000', 44, 'ofj6jj2p6j2c', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', true, '2025-10-20 08:07:39.119493+00', '2025-10-20 09:45:02.917392+00', 'dshvt3m6wmxr', '7032aa46-43e5-441e-8024-2747228b92cf'),
	('00000000-0000-0000-0000-000000000000', 45, 'picbwpmk6k2p', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', true, '2025-10-20 09:45:02.928684+00', '2025-10-20 11:26:00.737592+00', 'ofj6jj2p6j2c', '7032aa46-43e5-441e-8024-2747228b92cf'),
	('00000000-0000-0000-0000-000000000000', 46, 'ldgdigidv53v', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', true, '2025-10-20 11:26:00.75238+00', '2025-10-20 12:47:35.711411+00', 'picbwpmk6k2p', '7032aa46-43e5-441e-8024-2747228b92cf'),
	('00000000-0000-0000-0000-000000000000', 47, 'kp2tqbavuw5n', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', true, '2025-10-20 12:47:35.723439+00', '2025-10-20 14:22:12.518692+00', 'ldgdigidv53v', '7032aa46-43e5-441e-8024-2747228b92cf'),
	('00000000-0000-0000-0000-000000000000', 48, '3ga7cgehsutd', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', true, '2025-10-20 14:22:12.530387+00', '2025-10-20 15:58:33.244175+00', 'kp2tqbavuw5n', '7032aa46-43e5-441e-8024-2747228b92cf'),
	('00000000-0000-0000-0000-000000000000', 50, 'o47b3uocqjao', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', false, '2025-10-20 18:12:24.630195+00', '2025-10-20 18:12:24.630195+00', NULL, '9b6b9796-1335-4087-9396-c3fdf7d64d47'),
	('00000000-0000-0000-0000-000000000000', 51, 'uiyq5gwnygdr', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', false, '2025-10-20 18:15:01.696052+00', '2025-10-20 18:15:01.696052+00', NULL, 'dd7b7824-1f54-401a-beba-b9ba5ef8e79c'),
	('00000000-0000-0000-0000-000000000000', 49, '2i4ssnqjsqdo', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', true, '2025-10-20 15:58:33.25303+00', '2025-10-20 18:19:04.660244+00', '3ga7cgehsutd', '7032aa46-43e5-441e-8024-2747228b92cf'),
	('00000000-0000-0000-0000-000000000000', 52, '4s3pg6m5lfai', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', true, '2025-10-20 18:19:04.665824+00', '2025-10-21 22:14:20.535547+00', '2i4ssnqjsqdo', '7032aa46-43e5-441e-8024-2747228b92cf'),
	('00000000-0000-0000-0000-000000000000', 53, 'd2hntpul2xj4', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', false, '2025-10-21 22:14:20.558076+00', '2025-10-21 22:14:20.558076+00', '4s3pg6m5lfai', '7032aa46-43e5-441e-8024-2747228b92cf'),
	('00000000-0000-0000-0000-000000000000', 54, '4y2kvrqv5rzc', '7860123e-1eb8-4fc9-814c-26878013d170', false, '2025-10-21 23:06:56.278572+00', '2025-10-21 23:06:56.278572+00', NULL, '0bed5abd-5c21-4d51-a47e-cf027f71459f'),
	('00000000-0000-0000-0000-000000000000', 55, 'zq72wsquj74t', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-21 23:07:40.367833+00', '2025-10-22 00:19:56.517711+00', NULL, 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 56, 'ofd2uv6kpigp', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-22 00:19:56.533414+00', '2025-10-22 01:28:00.210553+00', 'zq72wsquj74t', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 57, 'apykp3coae4g', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-22 01:28:00.225452+00', '2025-10-22 02:37:20.242135+00', 'ofd2uv6kpigp', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 58, 'btbhzgbb6ui5', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-22 02:37:20.257832+00', '2025-10-22 03:35:49.684633+00', 'apykp3coae4g', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 59, 'jrl6fj3phlyw', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-22 03:35:49.71044+00', '2025-10-22 04:46:12.400411+00', 'btbhzgbb6ui5', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 61, 'xamdhxfinzt3', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-22 04:46:12.417479+00', '2025-10-22 05:44:39.646215+00', 'jrl6fj3phlyw', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 62, 'ozvtdiyzn3q7', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-22 05:44:39.65443+00', '2025-10-22 06:43:00.538329+00', 'xamdhxfinzt3', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 63, 'b7j6maynytj2', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-22 06:43:00.550822+00', '2025-10-22 07:51:45.150711+00', 'ozvtdiyzn3q7', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 64, '6sryqszu46kk', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-22 07:51:45.158639+00', '2025-10-22 08:50:01.356594+00', 'b7j6maynytj2', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 65, '5th62mhsmgnq', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-22 08:50:01.375608+00', '2025-10-22 10:00:52.415294+00', '6sryqszu46kk', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 74, 'vbrmtkemvh6d', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-22 18:23:11.101508+00', '2025-10-22 19:26:24.848173+00', 'xcp4gtl2pufc', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 75, 'jwm2i5yxqqzi', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-22 19:26:24.861068+00', '2025-10-22 20:33:02.203885+00', 'vbrmtkemvh6d', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 76, '6otqie7xz3hm', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-22 20:33:02.211241+00', '2025-10-22 21:31:32.439914+00', 'jwm2i5yxqqzi', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 77, 'k64df6rvttc6', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-22 21:31:32.451457+00', '2025-10-22 23:21:37.506562+00', '6otqie7xz3hm', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 78, 'zlzhcexcn7z3', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-22 23:21:37.531463+00', '2025-10-23 00:38:14.330663+00', 'k64df6rvttc6', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 80, 'mynsivazy7ov', 'a08263ba-bea2-4e23-a0b1-9c8e378eac98', false, '2025-10-23 00:47:05.698699+00', '2025-10-23 00:47:05.698699+00', '5q7cdpnieeyq', 'a20fb82b-cfa3-40c8-883f-3d1bafb0d75c'),
	('00000000-0000-0000-0000-000000000000', 79, 'rdqfzgmipfup', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-23 00:38:14.342753+00', '2025-10-23 01:40:33.659279+00', 'zlzhcexcn7z3', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 81, 'lbpudz3qxj2e', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-23 01:40:33.67138+00', '2025-10-23 02:57:33.726873+00', 'rdqfzgmipfup', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 82, 'hz7u4gtxvf6g', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-23 02:57:33.741525+00', '2025-10-23 04:14:07.592534+00', 'lbpudz3qxj2e', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 83, '2dkb7p4i3h63', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-23 04:14:07.602509+00', '2025-10-23 05:49:07.596739+00', 'hz7u4gtxvf6g', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 84, '4fxnespcpwi5', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-23 05:49:07.617264+00', '2025-10-23 07:00:07.562922+00', '2dkb7p4i3h63', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 85, 'x523ndtakhtv', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-23 07:00:07.575477+00', '2025-10-23 08:40:52.937472+00', '4fxnespcpwi5', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 86, 'tcduma43qaln', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-23 08:40:52.965615+00', '2025-10-23 10:03:45.916865+00', 'x523ndtakhtv', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 87, 'ypj44wwgrhes', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-23 10:03:45.925819+00', '2025-10-23 11:13:57.122241+00', 'tcduma43qaln', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 88, '2ltrcpp5ayv4', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-23 11:13:57.134666+00', '2025-10-23 12:56:40.367159+00', 'ypj44wwgrhes', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 89, 'y6ks7cudlv46', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-23 12:56:40.382127+00', '2025-10-23 15:07:11.68327+00', '2ltrcpp5ayv4', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 90, 'qzccrgt75bzl', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-23 15:07:11.697254+00', '2025-10-23 16:17:55.357485+00', 'y6ks7cudlv46', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 91, 'anmbefgwe57z', '7860123e-1eb8-4fc9-814c-26878013d170', true, '2025-10-23 16:17:55.366682+00', '2025-10-23 17:35:59.690122+00', 'qzccrgt75bzl', 'e2349c02-c066-4a18-911e-dcb87faceb70'),
	('00000000-0000-0000-0000-000000000000', 92, 'giken6sxswgy', '7860123e-1eb8-4fc9-814c-26878013d170', false, '2025-10-23 17:35:59.710906+00', '2025-10-23 17:35:59.710906+00', 'anmbefgwe57z', 'e2349c02-c066-4a18-911e-dcb87faceb70');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 92, true);


--
-- PostgreSQL database dump complete
--

-- \unrestrict kLYdzG33BbaOKAJ0MlnHd8hfzWDCh37FD49EeuJJLzpo8502T9DhpiBhrUKdiEP

RESET ALL;
