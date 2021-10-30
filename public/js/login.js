const loginForm = document.querySelector("#submitBtn")

loginForm.addEventListener("click",(e)=>{
    e.preventDefault();
    console.log("clicked")
    const userObj={
        username:document.querySelector("#username").value,
        password:document.querySelector("#password").value,
    }
    fetch("/api/users/login",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            setInterval(() => {
                location.href = "/users/dashboard"
            }, 500);
        }
        else {
            alert("Incorrect Username or Password")
        }
    })
})