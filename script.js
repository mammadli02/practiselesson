import {
     getAllCategories,
      deleteCategoryByID,
      postCategory,
      editCategoryByID,
    } from "./httprequest.js";
    let tableBody = document.querySelector("tbody");
    let editModal = document.querySelector("#edit-category-modal");
    let EditCloseModal = document.querySelector(".close-modal-edit");
    let editBtn = document.querySelector(".edit-btn");
    let editNameInput = document.querySelector("#edit-name");
    let editDescInput = document.querySelector("#edit-desc");
    let editDescInput2 = document.querySelector("#edit-descr");
    
    getAllCategories().then((data) => {
      data.forEach((suppliers) => {
        // console.log(data);
        tableBody.innerHTML += `<tr>
        <th scope="row">${suppliers.id}</th>
        <td>${suppliers.contactName}</td>
        <td>${suppliers.contactTitle}</td>
        <td>${suppliers.companyName}</td>
        <td>
            <button data-id="${suppliers.id} class="edit">Edit</button>
            <button data-id="${suppliers.id} class="del">Delete</button>
        </td>
    </tr>`;
       
      });
    
      //delete button click event
      Array.from(tableBody.children).forEach((item) => {
       let idEdit=item.children[0].getAttribute("data-id");
      //  console.log(idEdit);
      let nameEdit=item.children[1].textContent
      // console.log(nameEdit);
      let descEdit=item.children[2].textContent
      // console.log(descEdit);
      let companyEdit=item.children[3].textContent
      // console.log(companyEdit);




        let deleteButton = item.children[4].children[1];
        // console.log(deleteButton);
        let editButton = item.children[4].children[0];
        // console.log(editButton);
       
        deleteButton.addEventListener("click", (e) => {
          //sweet alert
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
          });
    
          swalWithBootstrapButtons
            .fire({
              title: `Are you sure to delete ?`,
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes, delete it!",
              cancelButtonText: "No, cancel!",
              reverseButtons: true,
            })
            .then((result) => {
              if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                  "Deleted!",
                  "Your file has been deleted.",
                  "success"
                );
                let id = e.target.getAttribute("data-id");
                deleteCategoryByID(id);
                //delete from UI
              // console.log( e.target.parentElement.parentElement.parentElement);
                e.target.parentElement.parentElement.remove();
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                  "Cancelled",
                  "Your imaginary file is safe :)",
                  "error"
                );
              }
            });
        });
    
    //     //get editing data values
        // let nameEdit = categoryName;
        // let descEdit = item.getAttribute("data-desc");
        // let idEdit = item.children[1].children[0].getAttribute("data-id");
        let editingObj = {
          id: idEdit,
          name: nameEdit,
          description: descEdit,
          names:companyEdit
        };
    
    //     //edit button click - modal
        editButton.addEventListener("click", () => {
          document.body.classList.add("modal-body");
          editModal.style.opacity = "1";
          editModal.style.visibility = "visible";
          editModal.style.transform = "translate(-50%,-50%) scale(1)";
    
          editNameInput.value = editingObj.name;
          editDescInput.value = editingObj.description;
          editDescInput2.value=editingObj.names
          editBtn.setAttribute("data-id",editingObj.id);
    
          //getting currently editin list item
         item.setAttribute("is-editing",true);
       });
      });
    // })
         //edit button request
         editBtn.addEventListener("click", (e) => {
           e.preventDefault();
           let newName = editNameInput.value;
           let newDesc = editDescInput.value;
           let newNames=editDescInput2.value;
           let id = e.target.getAttribute("data-id");
           let updatedCategory = {
             name: newName,
             description: newDesc,
             names:newNames,
           };
           editCategoryByID(id,updatedCategory);
           EditModalClose();
    
           //update in UI
           Array.from(tableBody.children).filter((item)=>{
             if (item.getAttribute("is-editing")) {
                item.children[1].textContent = newName;
                item.children[2].textContent=newDesc;
                item.children[3].textContent=newNames;
             }
           })
         });
        })
    
   //open modal
   let openModal = document.querySelector(".open-modal");
   let closeModal = document.querySelector(".close-modal");
   let modal = document.querySelector("#add-category-modal");
    
   openModal.addEventListener("click", () => {
     document.body.classList.add("modal-body");
     modal.style.opacity = "1";
     modal.style.visibility = "visible";
     modal.style.transform = "translate(-50%,-50%) scale(1)";
   });
    
   closeModal.onclick = function () {
     ModalClose();
   };
   EditCloseModal.onclick = function () {
     EditModalClose();
     Array.from(tableBody.children).forEach((item)=>{
      //  console.log(item);d
       item.removeAttribute("is-eiting");
     })
   };
    
   function ModalClose() {
     document.body.classList.remove("modal-body");
     modal.style.opacity = "0";
     modal.style.visibility = "hidden";
     modal.style.transform = "translate(-50%,-50%) scale(0)";
   }
   function EditModalClose() {
     document.body.classList.remove("modal-body");
     editModal.style.opacity = "0";
     editModal.style.visibility = "hidden";
     editModal.style.transform = "translate(-50%,-50%) scale(0)";
   }
    
   //add product
   let nameInput = document.querySelector("#name");
   let descInput = document.querySelector("#desc");
   let namesInput=document.querySelector("#descr")
   let form = document.querySelector(".forms");
    
   form.addEventListener("submit",async(e) => {
     e.preventDefault();
    //  console.log(nameInput.value);
     const suppliers = {
       name: nameInput.value,
       description: descInput.value,
       names:namesInput.value,
      
     };
     //reset inputs
     nameInput.value = "";
     descInput.value = "";
     namesInput.value=""
     let id;
     await postCategory(suppliers).then((data)=>{
        id = data.id;
        console.log(data);
    
    
    // add product to UI
      tableBody.innerHTML += `<tr>
        <th scope="row">${data.id}</th>
        <td>${data.name}</td>
        <td>${data.description}</td>
        <td>${data.names}</td>
        <td>
            <button data-id="${data.id} class="edit">Edit</button>
            <button data-id="${data.id} class="del">Delete</button>
        </td>
    </tr>`;
    
     //close modal
     ModalClose();
   });})