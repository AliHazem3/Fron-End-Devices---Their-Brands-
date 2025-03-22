

let ddlcategory = document.getElementById('ddlcategory'); // id of drop down category
let category =document.getElementById('category');  // Note category id of input name category in html
let saveCategory =document.getElementById('saveCategory');
let bodyCate = document.getElementById('bodyCate'); 
let countCategory= document.getElementById('CountCategory');
let Url='http://localhost:5209/api/Categories';
 
  

function Savecategory() {
  let objCategory = {
    name: category.value // note name is Name in C# but in JavaScript must be small
  };

  let data = JSON.stringify(objCategory); // convert data from JSON to String

  $.ajax({
    url: `${Url}/Save`,
    method: 'POST',
    contentType: 'application/json',
    data: data,
    cache: false, // prevent data from being stored in browser
    success: function(data) {
      // Rest of the category and table updates
      RestCategory();
      ShowCategory();
      ShowTableCategory();
      CountCategory();

      // Show the updated count and a thank you message
      $.ajax({
        url: `${Url}/GetAll`,
        method: 'GET',
        cache: false,
        success: function(allCategories) {
          alert(`Category saved successfully! Total Categories: (${allCategories.length}). Thank you!`);
        }
      });
    },
    error: function(error) {
      alert('Error: ' + error.statusText);
    }
  });
  
};

// Reset or clear the category input
function RestCategory() {
  category.value = '';
};


// show Category

function ShowCategory()
{
   let item='';
   item +=`<option>Select</option>`;
   
  $.ajax({
    url : `${Url}/GetAll`,
    method: 'GET',
    cache:false,
    success: function(data){

         for(let x in data)
         {
          item +=`<option  value="${data[x].id}">${data[x].name}</option>`
         }
         ddlcategory.innerHTML=item;
    }
  });

};


// Show data Category on table 
function ShowTableCategory()
{

  let Table='';

  $.ajax({
  url: `${Url}/GetAll`,
  method: 'GET',
  cache: false,
  success: function(data){
   
    data.forEach(function(item){  // another method  for loob instead of   for(let x in data) in function ShowCategory
       Table +=`
       <tr>
       <td> ${item.id}</td>
       <td> ${item.name}</td>
       <td>
       <button class="btn btn-danger" onclick="DeleteCategory(${item.id})">
       <i class="fa-solid fa-trash"></i>
      </button>
       </td>
       </tr>
       `

    });

    bodyCate.innerHTML= Table;

  } 
  });

};


// DeleteCategory

function DeleteCategory(id){    // we use this function in button  download category name
 if(confirm('Are you Sure From deleted...?') == true)
 {
  $.ajax
  ({
    url: `${Url}/${id}` , //  Note didn't use ${Url}/Delete because didn't change the name in control api delete
    method: 'DELETE',
    cache: false,
    success: function(data)
    {
      ShowTableCategory(); // calling this function after delete to show table
      ShowCategory();     //  to delete also form drop down  list i.e selection
      CountCategory();
      toastr.error(`Success Delete Row Category  (${data.name})`, 'DELETE');
    }
  });

 }
};





// Count number of Category

function CountCategory(){

$.ajax({
 url: `${Url}/GetAll`,
 method: 'GET',
 cache: false,

 success: function(data){

  countCategory.innerHTML=`Total Category (${data.length})`;
 } 
 

});

};


  saveCategory.addEventListener('click', Savecategory);


  ShowCategory();
  ShowTableCategory();
  CountCategory();