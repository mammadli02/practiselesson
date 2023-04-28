// import {postCategoryById,EditCardyById} from "./create.js";
const tableBody = document.querySelector("tbody");
const API_URL="https://northwind.vercel.app/api/suppliers"
function getUsers(API_URL) {
    fetch(API_URL).then((res) => {
        console.log(res);
        return res.json();
    }).then((data) => {
       console.log(data);
        tableBody.innerHTML = "";
        data.forEach(user => {
            let newRow = createRow(user);
    tableBody.append(newRow);
        })
    }) }
        getUsers(API_URL);
        function createRow(supplier){
            let row = document.createElement("tr")
            let idTd = document.createElement("td")
            idTd.innerText = supplier.id;
            let nameTd = document.createElement("td")
            nameTd.innerText = supplier?.contactName;
            let titleTd = document.createElement("td")
            titleTd.innerText = supplier?.contactTitle;
            let countryTd = document.createElement("td")
            countryTd.innerText = supplier?.address.country;
            let buttonTd=document.createElement("td")
            let delBtn=document.createElement("button")
            delBtn.innerText="DEL"
            delBtn.style.backgroundColor="orange"
            delBtn.style.color="white"
            delBtn.style.border="none"
            delBtn.style.borderRadius="3px"
            delBtn.classList.add("deLBtn")
            let editBtn=document.createElement("button")
            editBtn.classList.add("editBtn")
            editBtn.innerText="Edit"
            editBtn.style.backgroundColor="red"
            editBtn.style.color="white"
            editBtn.style.border="none"
            editBtn.style.borderRadius="3px"
            editBtn.style.marginLeft="5px"
        delBtn.addEventListener("click",(e)=>{
            fetch('https://northwind.vercel.app/api/suppliers/' + supplier.id, {
  method: 'DELETE',
})
.then(res => res.text()) // or res.json()
.then(res => console.log(res))
            if(!confirm("Are you sure you want to delete?")) return;
            var tbl=e.target.parentNode.parentNode.parentNode;
            var rows=e.target.parentNode.parentNode;
            tbl.deleteRow(rows)
        })
        buttonTd.append(delBtn,editBtn)
        row.append(idTd,nameTd, titleTd,buttonTd)
        return row;
    }
    

    // editBtn.addEventListener("click",async(e)={
    //     const response = await fetch('https://northwind.vercel.app/api/suppliers/', {
    //         method: "PUT", // *GET, POST, PUT, DELETE, etc.
    //         mode: "cors", // no-cors, *cors, same-origin
    //         cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //         credentials: "same-origin", // include, *same-origin, omit
    //         headers: {
    //           "Content-Type": "application/json",
              
    //         },
           
    //         body: JSON.stringify(data), // body data type must match "Content-Type" header
    //       });
    //       return response.json();
    // })

//     const add=document.querySelector(".add")
//     add.addEventListener("click",async()=>{
//         async function postData(url = "https://northwind.vercel.app/api/suppliers", data = {}) {
//             // Default options are marked with *
//             const response = await fetch(url, {
//               method: "POST", // *GET, POST, PUT, DELETE, etc.
//               mode: "cors", // no-cors, *cors, same-origin
//               cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//               credentials: "same-origin", // include, *same-origin, omit
//               headers: {
//                 "Content-Type": "application/json",
//                 // 'Content-Type': 'application/x-www-form-urlencoded',
//               },
//               redirect: "follow", // manual, *follow, error
//               referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//               body: JSON.stringify(data), // body data type must match "Content-Type" header
//             });
//             return response.json(); // parses JSON response into native JavaScript objects
//           }
//           postData("https://example.com/answer", { answer: 42 }).then((data) => {
//   console.log(data); // JSON data parsed by `data.json()` call
// });
//     })
// const add=document.querySelector(".add")

//     export const postCategoryById=async(category)=>{;
//  await fetch('https://northwind.vercel.app/api/suppliers/',{
//     method: "POST",
//     headers:{
//         "Content-Type": "application/json",
//     },
//     body:JSON.stringify({data})
// }).then(res=>{
//     return res.json()
// })
    // }
