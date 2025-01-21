const fileInput = document.querySelector("#fileInput");
const fileUploadBtn = document.querySelector("#fileUploadBtn");

fileUploadBtn?.addEventListener("click",async ()=>{
  let filetoUpload = fileInput.files[0];
  console.log(filetoUpload)
  try {
    const { data, error } = await supabase.storage
      .from("usersprofile")
      .upload(`public/${filetoUpload.name}`, {
        cacheControl: "3600",
        upsert: false,
      });
    if(error) throw error;
    if(data){
      console.log(data)
    }
    
  } catch (error) {
    console.log(error)
  }
  
})
