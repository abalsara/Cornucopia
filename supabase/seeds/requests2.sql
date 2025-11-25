INSERT INTO "public"."Charities" ("c_name", "email", "created_at", "cid", "address", "zip_code", "city", "state", "phone_num") VALUES ('Friends of Youth', 'contact@foy.org', '2025-11-05 01:17:35.116681+00', '21111111-1111-1111-1111-111111111111', '456 4th Ave', '98004', 'Bellevue', 'WA', '206-555-5678');

-- ✅ Insert test requests for charity 
INSERT INTO "public"."Request" (
  "request_id",
  "cid",
  "item_name",
  "quantity_fulfilled",
  "category",
  "notes",
  "quantity",
  "unit"
)
VALUES
  (
    '00111111-1111-1111-1111-111111111111',
    '21111111-1111-1111-1111-111111111111',
    'Winter Jackets',
    0,
    'Clothing',
    'Need warm outerwear for adults and children.',
    20,
    'Ea.'
  ),
  (
    '00222222-2222-2222-2222-222222222222',
    '21111111-1111-1111-1111-111111111111',
    'Laptops',
    0,
    'Electronics',
    'Refurbished laptops for students in after-school programs.',
    10,
    'Ea.'
  ),
  (
    '00333333-3333-3333-3333-333333333333',
    '21111111-1111-1111-1111-111111111111',
    'Canned Goods',
    0,
    'Food',
    'Non-perishable food for local food drive.',
    100,
    'Cans'
  ),
  (
    '00444444-4444-4444-4444-444444444444',
    '21111111-1111-1111-1111-111111111111',
    'Beds and Mattresses',
    0,
    'Furniture',
    'Furniture for recently relocated families.',
    5,
    'Sets'
  ),
  (
    '00555555-5555-5555-5555-555555555555',
    '21111111-1111-1111-1111-111111111111',
    'Cleaning Supplies',
    0,
    'Household Goods',
    'Multipurpose cleaners and mops for shelter upkeep.',
    30,
    'Kits'
  ),
  (
    '00666666-6666-6666-6666-666666666666',
    '21111111-1111-1111-1111-111111111111',
    'Hygiene Kits',
    0,
    'Hygiene Products',
    'Soap, shampoo, and toothbrushes for distribution.',
    50,
    'Kits'
  ),
  (
    '00777777-7777-7777-7777-777777777777',
    '21111111-1111-1111-1111-111111111111',
    'First Aid Supplies',
    0,
    'Medical Supplies',
    'Basic medical kits for emergency response.',
    25,
    'Kits'
  ),
  (
    '00888888-8888-8888-8888-888888888888',
    '21111111-1111-1111-1111-111111111111',
    'School Supplies',
    0,
    'School & Office Supplies',
    'Notebooks, pens, and backpacks for school children.',
    40,
    'Sets'
  ),
  (
    '00999999-9999-9999-9999-999999999999',
    '21111111-1111-1111-1111-111111111111',
    'Sports Equipment',
    0,
    'Sports Equipment',
    'Soccer balls, nets, and cones for community youth program.',
    15,
    'Ea.'
  ),
  (
    '00aaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '21111111-1111-1111-1111-111111111111',
    'Toys and Games',
    0,
    'Toys & Games',
    'Educational toys for children’s center.',
    25,
    'Ea.'
  );


INSERT INTO "public"."Clothing" ("item_id", "cid", "age_group", "gender")
VALUES ('00111111-1111-1111-1111-111111111111', '21111111-1111-1111-1111-111111111111', 'Adult', 'Unisex');

INSERT INTO "public"."Electronics" ("item_id", "cid", "type")
VALUES ('00222222-2222-2222-2222-222222222222', '21111111-1111-1111-1111-111111111111', 'Other');

INSERT INTO "public"."Food" ("item_id", "cid", "storage_reqs")
VALUES ('00333333-3333-3333-3333-333333333333', '21111111-1111-1111-1111-111111111111', 'Fridge');

INSERT INTO "public"."Furniture" ("item_id", "cid", "type")
VALUES ('00444444-4444-4444-4444-444444444444', '21111111-1111-1111-1111-111111111111', 'Seating');

INSERT INTO "public"."HouseholdGoods" ("item_id", "cid", "type")
VALUES ('00555555-5555-5555-5555-555555555555', '21111111-1111-1111-1111-111111111111', 'Cleaning Supplies');

INSERT INTO "public"."HygieneProduct" ("item_id", "cid")
VALUES ('00666666-6666-6666-6666-666666666666', '21111111-1111-1111-1111-111111111111');

INSERT INTO "public"."MedicalSupplies" ("item_id", "cid", "type")
VALUES ('00777777-7777-7777-7777-777777777777', '21111111-1111-1111-1111-111111111111', 'First Aid');

INSERT INTO "public"."SchoolOfficeSupplies" ("item_id", "cid")
VALUES ('00888888-8888-8888-8888-888888888888', '21111111-1111-1111-1111-111111111111');

INSERT INTO "public"."SportsEquipment" ("item_id", "cid", "type")
VALUES ('00999999-9999-9999-9999-999999999999', '21111111-1111-1111-1111-111111111111', 'Other');

INSERT INTO "public"."ToysGames" ("item_id", "cid", "age_group")
VALUES ('00aaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '21111111-1111-1111-1111-111111111111', 'All Ages');