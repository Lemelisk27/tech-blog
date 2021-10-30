const loginForm = document.querySelector("#submitBtn")

loginForm.addEventListener("click",(e)=>{
    e.preventDefault();
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
            alert("You have been loged in.")
            location.href = "/users/dashboard"
        }
        else {
            alert("Incorrect Username or Password")
        }
    })
})