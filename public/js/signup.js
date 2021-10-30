const submitBtn = document.querySelector("#submitBtn")

submitBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    const password = document.querySelector("#password").value
    const confirmPassword = document.querySelector("#confirmPassword").value
    if (password != confirmPassword) {
        alert("Please make sure that your passwords match.")
        return
    }
    else {
        const userObj={
            first_name:document.querySelector("#firstName").value,
            last_name:document.querySelector("#lastName").value,
            username:document.querySelector("#username").value,
            email:document.querySelector("#email").value,
            password:document.querySelector("#password").value,
        }
        fetch("/users/signup",{
            method:"POST",
            body:JSON.stringify(userObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(res.ok){
                location.href = "/users/login"
            }
            else {
                alert("An Error Occured, Please Try Again.")
            }
        })
    }
})