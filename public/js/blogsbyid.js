const submitBtn = document.querySelector("#submitBtn")

submitBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    const userObj = {
        comment:document.querySelector("#comment").value,
        blog_id:document.querySelector("#blog-card").dataset.index,
    }
    if (userObj.comment === "" || userObj.comment === null) {
        alert("Please Enter Something for the new Comment Before Clicking Submit")
    }
    else {
        fetch("/blogs",{
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