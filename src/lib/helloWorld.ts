import { supabase } from "./supabase";

export const invokeHelloWorld = async (str: string): Promise<string> => {
  const payload = {
    body: { name: "button" },
  };

  const { data, error } = await supabase.functions.invoke(
    "hello-world",
    payload,
  );

  if (error) console.log(error);

  return data;
};
