// const isSessionActive = async () => {
//   const { data, error } = await supabase.auth.getSession();

//   const { session } = data;
//   const authPage = ["/", "/index.html", "/login.html"];
//   const currentPage = window.location.pathname;
//   const isAuthPage = authPage.some((page) => page.includes(currentPage));

//   if (session) {
//     if (isAuthPage) {
//       window.location.assign("/dashbord.html");
//     }
//   } else {
//     if (!isAuthPage) {
//       window.location.assign("/login.html");
//     }
//   }
// };
const getUserData = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if(user){
      console.log(user)
      try {

        const { data, error } = await supabase
          .from("users")
          .select("name, email, userId")
          .eq("userId", user.id);

        if (error) throw error;
        if (data) {
          // console.log("data")
          console.log(data)
          const loggedInUser = {
            name: data[0].name,
            email: data[0].email,
            userId: data[0].userId,
          };
          console.log(loggedInUser);
          localStorage.setItem("activeUser", JSON.stringify(loggedInUser));
          console.log(JSON.parse(localStorage.getItem("activeUser")));
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    
  } catch (error) {
    console.log(error)
  }
  

};

window.onload = getUserData()

// window.onload = isSessionActive();
