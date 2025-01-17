const isSessionActive = async () => {
  const { data, error } = await supabase.auth.getSession();

  const { session } = data;
  const authPage = ["/", "/index.html", "/login.html"];
  const currentPage = window.location.pathname;
  const isAuthPage = authPage.some(page => page.includes(currentPage))

  if(session){
    if(isAuthPage){
      window.location.assign("/dashbord.html"); 
    }
  } else{
    if(!isAuthPage){
      window.location.assign("/login.html");

    }
}

};

window.onload = isSessionActive();
