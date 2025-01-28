const postFile = document.querySelector("#postFile");
const postContent = document.querySelector("#postContent");
const postBtn = document.querySelector("#postBtn");
const postContainer = document.querySelector(".cards_container");
const logoutBtn = document.querySelector(".logoutBtn");


logoutBtn?.addEventListener("click",async ()=>{
  console.log("logout click")
  try {
    const { error } = await supabase.auth.signOut();
    if(error) throw error;
    try {
      const { data, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      if (data) {
        console.log(data);
        localStorage.removeItem("activeUser")
      }
    } catch (sessionError) {
      console.log(sessionError)
    }

  } catch (error) {
    
  }
})

const activeUser = JSON.parse(localStorage.getItem("activeUser"));
console.log(activeUser);
postBtn?.addEventListener("click", async () => {
  console.log(postFile.files.length);
  try {
    const { data, error } = await supabase
      .from("posts")
      .insert({
        content: postContent.value,
        userId: activeUser.userId,
      })
      .select();
    if (error) throw error;
    if (data) {
      console.log(data);

      if (postFile.files.length) {
        console.log("file");
        let fileUploaded = postFile.files[0];
        try {
          const { data: fileData, error: fileError } = await supabase.storage
            .from("images")
            .upload(`${data[0].id}`, fileUploaded, {
              cacheControl: "3600",
              upsert: false,
            });
          if (fileError) throw fileError;
          if (fileData) {
            try {
              const { data: imageUrl } = supabase.storage
                .from("images")
                .getPublicUrl(fileData.path);
              if (imageUrl) {
                console.log(imageUrl.publicUrl);
                try {
                  const { data: postImgeUrl, error: postImgeUrlError } =
                    await supabase
                      .from("posts")
                      .update({ imageUrl: imageUrl.publicUrl })
                      .eq("id", data[0].id)
                      .select();

                  if (postImgeUrlError) throw postImgeUrlError;
                  if (postImgeUrl) {
                    console.log(postImgeUrl);
                    showPosts()
                  }
                } catch (postImgeUrlError) {
                  console.log(postImgeUrlError);
                }
              }
            } catch (error) {}
          }
        } catch (fileError) {
          console.log(fileError);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
});

const showPosts = async () =>{
  try {
    const { data, error } = await supabase.from("posts").select();
    if(error) throw error;
    if(data){
      console.log(data)
      try {
        const { data : usersData, error :usersError } = await supabase.from("users").select();
        if (usersError) throw usersError;
        if (usersData) {
          console.log(usersData);
          const userMap = {};
          usersData.forEach((user)=>{
            userMap[user.userId] = user;
          })
          console.log(userMap)
          console.log(activeUser)
          postContainer.innerHTML = "";
          data.forEach((post)=>{

            let currentUser = userMap[post.userId]
            console.log(currentUser)
            let myPost = false;

            if(currentUser.userId === activeUser.userId){
              myPost = true;
            }
            console.log(myPost)
            // console.table(currentUser.userId,post.userId)
            postContainer.innerHTML += `
            <div class="card my-2" style="width: 18rem;">
            ${ myPost ? `<button class='btn btn-danger' onClick="deletePost('${post.id}')">Delete</button>` : ''} 
              <img src="${post.imageUrl ? post.imageUrl : ""}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${currentUser.name}</h5>
                
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
            `;
          })
        }
      } catch (usersError) {
        console.log(usersError);
      }

    }

  } catch (error) {
    console.log(error)
    
  }
}


window.onload = showPosts()