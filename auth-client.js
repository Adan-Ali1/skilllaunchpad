import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const settings=window.SKILLLAUNCHPAD_AUTH||{};
export const authConfigured=Boolean(settings.supabaseUrl&&settings.publishableKey);
export function getAuthClient(){
  if(!authConfigured) throw new Error("Login is not connected yet. The site owner must finish the Supabase setup.");
  return createClient(settings.supabaseUrl,settings.publishableKey);
}
export function safeNext(value){
  if(!value||!value.startsWith("/")||value.startsWith("//")||value.includes("\\"))return "/account.html";
  return value;
}