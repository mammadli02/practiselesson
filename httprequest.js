const baseURL = "https://northwind.vercel.app/api";

//get all suppliers
export const getAllCategories = async()=>{
    let globalData;
    await fetch(`${baseURL}/suppliers`)
    .then(response => response.json())
    .then(data => {
        globalData = data;
    })

    return globalData;
}

//get Category by ID
export const getCategoryByID = async(id)=>{
    let globalData;
    await fetch(`${baseURL}/suppliers/${id}`)
    .then(response => response.json())
    .then(data =>{
        globalData = data;
    })
    return globalData;
}

//delete Category by ID
export const deleteCategoryByID = async(id)=>{
    await fetch(`${baseURL}/suppliers/${id}`,{
        method: 'DELETE'
    })
}

//post Category
export const postCategory = async(category)=>{
    let globalData;
    await fetch(`${baseURL}/suppliers`,{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(category)
    }).then(res=>res.json())
    .then(data =>{
        globalData = data;
    })

    return globalData;
}

//put Category by ID
export const editCategoryByID = async(id,category)=>{
    fetch(`${baseURL}/suppliers/${id}`,{
        method:'PUT',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(category)
    })
}