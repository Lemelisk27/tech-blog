const deleteBtn = document.querySelector("#deleteBtn")
const submitBtn = document.querySelector("#submitBtn")

deleteBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    const userObj = {
        id:document.querySelector("#blog-card").dataset.index
    }
    fetch("/users/dashboard",{
        method:"DELETE",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            window.location.href = "/users/dashboard"
        }
        else {
            alert("Unable to Complete Request, Please Try Again")
        }
    })
})

submitBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    const userObj = {
        id:document.querySelector("#blog-card").dataset.index,
        title:document.querySelector("#blog-title").value,
        content:document.querySelector("#blog_content").value
    }
    if (userObj.title === "" || userObj.title === null) {
        alert("Please Enter Something for the Updated Blog Before Clicking Submit")
    }
    else {
        fetch("/users/dashboard",{
            method:"PUT",
            body:JSON.stringify(userObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if (res.ok){
                location.reload()
            }
            else {
                alert("Unable to Complete Request, Please try Again")
            }
        })
    }
})