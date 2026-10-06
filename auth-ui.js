import {authConfigured,getAuthClient} from "./auth-client.js";

const status=document.querySelector("[data-auth-status]");
const say=(message,kind="info")=>{if(status){status.textContent=message;status.dataset.kind=kind;}};
const adminRole=user=>user?.app_metadata?.role==="admin";
let client=null;

if(!authConfigured){
  say("Admin sign-in is not connected yet. The owner must finish the Supabase setup first.","error");
  document.querySelectorAll("#login-form button[type=submit],#forgot-form button[type=submit],#reset-form button[type=submit]").forEach(button=>button.disabled=true);
}else{
  try{client=getAuthClient();}
  catch(error){say(error.message||"Could not initialize admin sign-in.","error");document.querySelectorAll("#login-form button[type=submit],#forgot-form button[type=submit],#reset-form button[type=submit]").forEach(button=>button.disabled=true);}
}

if(client){
  client.auth.onAuthStateChange(event=>{
    if(event==="PASSWORD_RECOVERY"){
      const resetForm=document.querySelector("#reset-form");
      const forgotForm=document.querySelector("#forgot-form");
      if(resetForm)resetForm.hidden=false;
      if(forgotForm)forgotForm.hidden=true;
      say("Choose a new owner password below.","success");
    }
  });
  const login=document.querySelector("#login-form");
  if(login)login.addEventListener("submit",async event=>{
    event.preventDefault();
    const button=login.querySelector("button[type=submit]");
    button.disabled=true;
    say("Checking owner access…");
    try{
      const {error}=await client.auth.signInWithPassword({email:login.email.value.trim(),password:login.password.value});
      if(error)throw error;
      const {data,error:userError}=await client.auth.getUser();
      if(userError)throw userError;
      if(!adminRole(data.user)){
        await client.auth.signOut();
        throw new Error("This account is not assigned the SkillLaunchpad administrator role.");
      }
      location.replace("/admin.html");
    }catch(error){say(error.message||"Sign-in failed. Check your details and try again.","error");button.disabled=false;}
  });

  const admin=document.querySelector("[data-admin]");
  if(admin){
    try{
      const {data,error}=await client.auth.getUser();
      if(error)throw error;
      if(!data.user){location.replace("/login.html?next=/admin.html");}
      else if(!adminRole(data.user)){say("This account does not have administrator access. Sign in with the site owner account.","error");}
      else{
        document.querySelector("[data-admin-email]").textContent=data.user.email||"Owner";
        admin.hidden=false;
        document.body.classList.remove("admin-pending");
        document.body.classList.add("admin-ready");
        if(status)status.hidden=true;
      }
    }catch(error){say(error.message||"Could not verify your administrator session. Please sign in again.","error");}
  }

  document.querySelectorAll("[data-signout]").forEach(button=>button.addEventListener("click",async()=>{
    button.disabled=true;
    const {error}=await client.auth.signOut();
    if(error){say(error.message||"Could not sign out.","error");button.disabled=false;return;}
    location.assign("/login.html");
  }));

  const forgot=document.querySelector("#forgot-form");
  if(forgot)forgot.addEventListener("submit",async event=>{
    event.preventDefault();
    const button=forgot.querySelector("button[type=submit]");button.disabled=true;say("Sending reset instructions…");
    try{const {error}=await client.auth.resetPasswordForEmail(forgot.email.value.trim(),{redirectTo:location.origin+"/reset-password.html"});if(error)throw error;say("If this owner email is registered, password reset instructions will arrive shortly.","success");}
    catch(error){say(error.message||"Could not request a password reset.","error");}
    finally{button.disabled=false;}
  });

  const reset=document.querySelector("#reset-form");
  if(reset)reset.addEventListener("submit",async event=>{
    event.preventDefault();
    if(reset.password.value!==reset.confirmPassword.value){say("Passwords do not match.","error");return;}
    const button=reset.querySelector("button[type=submit]");button.disabled=true;say("Updating password…");
    try{const {error}=await client.auth.updateUser({password:reset.password.value});if(error)throw error;say("Password updated. You can now sign in again.","success");reset.reset();}
    catch(error){say(error.message||"Password could not be updated. Open the latest reset email link.","error");}
    finally{button.disabled=false;}
  });
}



const adminSearch=document.querySelector("[data-admin-search]");
if(adminSearch)adminSearch.addEventListener("input",()=>{
  const query=adminSearch.value.trim().toLowerCase();
  document.querySelectorAll("[data-admin-link]").forEach(link=>{
    link.hidden=query!==""&&!link.textContent.toLowerCase().includes(query);
  });
});
