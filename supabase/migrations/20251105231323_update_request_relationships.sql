alter table "public"."AnimalCareSupplies" add constraint "AnimalCareSupplies_item_id_fkey" FOREIGN KEY (item_id) REFERENCES public."Request"(request_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."AnimalCareSupplies" validate constraint "AnimalCareSupplies_item_id_fkey";

alter table "public"."Clothing" add constraint "Clothing_item_id_fkey" FOREIGN KEY (item_id) REFERENCES public."Request"(request_id) ON DELETE CASCADE not valid;

alter table "public"."Clothing" validate constraint "Clothing_item_id_fkey";

alter table "public"."Electronics" add constraint "Electronics_item_id_fkey" FOREIGN KEY (item_id) REFERENCES public."Request"(request_id) ON DELETE CASCADE not valid;

alter table "public"."Electronics" validate constraint "Electronics_item_id_fkey";

alter table "public"."Food" add constraint "Food_item_id_fkey" FOREIGN KEY (item_id) REFERENCES public."Request"(request_id) ON DELETE CASCADE not valid;

alter table "public"."Food" validate constraint "Food_item_id_fkey";

alter table "public"."Furniture" add constraint "Furniture_item_id_fkey" FOREIGN KEY (item_id) REFERENCES public."Request"(request_id) ON DELETE CASCADE not valid;

alter table "public"."Furniture" validate constraint "Furniture_item_id_fkey";

alter table "public"."HouseholdGoods" add constraint "HouseholdGoods_item_id_fkey" FOREIGN KEY (item_id) REFERENCES public."Request"(request_id) ON DELETE CASCADE not valid;

alter table "public"."HouseholdGoods" validate constraint "HouseholdGoods_item_id_fkey";

alter table "public"."HygieneProduct" add constraint "HygieneProduct_item_id_fkey" FOREIGN KEY (item_id) REFERENCES public."Request"(request_id) ON DELETE CASCADE not valid;

alter table "public"."HygieneProduct" validate constraint "HygieneProduct_item_id_fkey";

alter table "public"."MedicalSupplies" add constraint "MedicalSupplies_item_id_fkey" FOREIGN KEY (item_id) REFERENCES public."Request"(request_id) ON DELETE CASCADE not valid;

alter table "public"."MedicalSupplies" validate constraint "MedicalSupplies_item_id_fkey";

alter table "public"."SchoolOfficeSupplies" add constraint "SchoolOfficeSupplies_item_id_fkey" FOREIGN KEY (item_id) REFERENCES public."Request"(request_id) ON DELETE CASCADE not valid;

alter table "public"."SchoolOfficeSupplies" validate constraint "SchoolOfficeSupplies_item_id_fkey";

alter table "public"."SportsEquipment" add constraint "SportsEquipment_item_id_fkey" FOREIGN KEY (item_id) REFERENCES public."Request"(request_id) ON DELETE CASCADE not valid;

alter table "public"."SportsEquipment" validate constraint "SportsEquipment_item_id_fkey";

alter table "public"."ToysGames" add constraint "ToysGames_item_id_fkey" FOREIGN KEY (item_id) REFERENCES public."Request"(request_id) ON DELETE CASCADE not valid;

alter table "public"."ToysGames" validate constraint "ToysGames_item_id_fkey";

alter table "public"."Uncatergorized" add constraint "Uncatergorized_item_id_fkey" FOREIGN KEY (item_id) REFERENCES public."Request"(request_id) ON DELETE CASCADE not valid;

alter table "public"."Uncatergorized" validate constraint "Uncatergorized_item_id_fkey";