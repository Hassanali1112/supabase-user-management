const addNewUseBtn = document.querySelector("#addNewUser_btn");
const firstName = document.querySelector("#newUser_firstName");
const lastName = document.querySelector("#newUser_lastName");
const companyName = document.querySelector("#company_Name");
const companyAddress = document.querySelector("#company_Address");
const companyEmail = document.querySelector("#company_email");

addNewUseBtn.addEventListener("click", async () => {
  try {
    const { error } = await supabase.from("users").insert({
      first_name: firstName.value,
      last_name: lastName.value,
      company_name: companyName.value,
      address: companyAddress.value,
      email_address: companyEmail.value,
    });

    if (error) throw error;
    showData();
  } catch (error) {
    console.log(error);
  }

  firstName.value = "";
  lastName.value = "";
  companyName.value = "";
  companyAddress.value = "";
  companyEmail.value = "";
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const userDataCol = document.querySelector("#userDataCol");
const usersDataTable = document.querySelector("#usersDataTable");

const showData = async () => {
  try {
    const { data, error } = await supabase.from("users").select();

    if (error) throw error;

    if (data.length !== 0) {
      console.log(data.length);
      userDataCol.classList.remove("d-none");
      // console.log(data)
      usersDataTable.innerHTML = "";
      data.map(
        (user) =>
          (usersDataTable.innerHTML += `
               <tr>
                <td>${user.first_name}</td>
                <td>${user.last_name}</td>
                <td>${user.company_name}</td>
                <td>${user.address}</td>
                <td>${user.email_address}</td>
                <td><i class="fa-solid fa-trash deleteUser" onClick="deleteUser(${user.id})" ></i></td>
             
              </tr>
        `)
      );
    }
  } catch (error) {}
};
window.onload = showData();

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const deleteUser = document.querySelectorAll(".deleteUser");
console.log(deleteUser);
// for(let i = 0; i < d; i++){
//   console.log(i)
// }
// deleteUser.addEventListener("click", ()=>{
//   console.log("clicked")
// })
