const postFile = document.querySelector("#postFile");
const postContent = document.querySelector("#postContent");
const postBtn = document.querySelector("#postBtn");

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
// fileUploadBtn?.addEventListener("click",async ()=>{
//   let filetoUpload = fileInput.files[0];
//   console.log(filetoUpload)
//   try {
//     const { data, error } = await supabase.storage
//       .from("usersprofile")
//       .upload(`public/${filetoUpload.name}`, {
//         cacheControl: "3600",
//         upsert: false,
//       });
//     if(error) throw error;
//     if(data){
//       console.log(data)
//     }

//   } catch (error) {
//     console.log(error)
//   }

// })
