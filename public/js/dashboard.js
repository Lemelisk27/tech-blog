const submitBtn = document.querySelector("#submitBtn")

submitBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    const userObj = {
        title:document.querySelector("#blog-title").value,
        content:document.querySelector("#blog_content").value
    }
    if (userObj.title === "" || userObj.title === null) {
        alert("Please Enter Something for the new Blog Before Clicking Submit")
    }
    else {
        fetch("/users/dashboard",{
            method:"POST",
            body:JSON.stringify(userObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(res.ok){
                location.reload()
            }
            else {
                alert("Unable to Complete Request, Please try Again")
            }
        })
    }
})