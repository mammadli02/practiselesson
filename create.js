const add=document.querySelector(".add")
add.addEventListener("click", ()=>{
    postCategoryById()
})
    export const postCategoryById=async(data)=>{;
 await fetch('https://northwind.vercel.app/api/suppliers/',{
    method: "POST",
    headers:{
        "Content-Type": "application/json",
    },
    body:JSON.stringify({data})
}).then(res=>res.json()
).then((data)=>{
    let nameTd = document.createElement("td")
    nameTd.innerText = data?.contactName;
    let titleTd = document.createElement("td")
    titleTd.innerText = data?.contactTitle;
})
}
postCategoryById( {contactName: 'data.contactName', contactTitle: 'data.contactTitle'});

