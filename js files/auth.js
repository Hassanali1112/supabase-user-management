const signup_btn = document.querySelector("#signup_btn");
const signupEmail = document.querySelector("#signup_email");
const signupPass = document.querySelector("#signup_password");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

if (signup_btn) {
  signup_btn.addEventListener("click", async () => {
    event.preventDefault();
    if (emailRegex.test(signupEmail.value)) {
      if (passwordRegex.test(signupPass.value)) {
        try {
          const { data, error } = await supabase.auth.signUp({
            email: signupEmail.value,
            password: signupPass.value,
          });
          if (error) throw error;
          signupEmail.value = "";
          signupPass.value = "";

          if (data) {
            console.log(data);
            Swal.fire({
              title: "Email confirmation",
              text: "Kindly check your email",
              icon: "success",
            });
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        Swal.fire({
          title: "Password",
          text: "Invalid password",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "Email",
        text: "Invalid email",
        icon: "error",
      });
    }
  });
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const signin_btn = document.querySelector("#signin_btn");
const signinEmail = document.querySelector("#signin_email");
const signinPass = document.querySelector("#signin_password");

if (signin_btn) {
  signin_btn.addEventListener("click", async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: signinEmail.value,
        password: signinPass.value,
      });

      if (error) throw error;
      if (data) {
        signinEmail.value = "";
        signinPass.value = "";
        console.log(data);
        Swal.fire({
          title: "Session stated",
          text: "welcome User",
          icon: "success",
        });
        window.location.assign("/dashbord.html");
      }
    } catch (error) {}
  });
}

// +++++++++++++++++++++++++++++++=+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const signinSession_btn = document.querySelector("#signinSession_btn");

if (signinSession_btn) {
  signinSession_btn.addEventListener("click", async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      if (data) {
        console.log(data);
      }
    } catch (error) {}
  });
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const logout_btn = document.querySelector("#logout_btn");

if (logout_btn) {
  logout_btn.addEventListener("click", async () => {
    try {
      const { error } = await supabase.auth.signOut();
      window.location.assign("/login.html");
      if (error) throw error;
    } catch (error) {
    } finally {
    }
  });
}
