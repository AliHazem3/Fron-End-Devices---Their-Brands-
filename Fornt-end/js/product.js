// Declaration
let dddlcategory=document.getElementById('ddlcategory');
let product=document.getElementById('product');
let quntity=document.getElementById('quntity');
let price=document.getElementById('price');
let descount=document.getElementById('descount');
let total=document.getElementById('total');
let btnSave=document.getElementById('btnSave');
let btnRestPro=document.getElementById('btnRestPro');
let bodyProduct=document.getElementById('bodyProduct');
let CountProducts=document.getElementById('CountProducts');

// 
let labcate=document.getElementById('labcate');
let lbPro=document.getElementById('lbPro');
let lQuantity=document.getElementById('lQuantity');
let lbPice=document.getElementById('lbPice');
let lDesco=document.getElementById('lDesco');
let lTotal=document.getElementById('lTotal');


let UrlPro='http://localhost:5209/api/Products';

//GetTotal function: just Count totlal
function GetTotal() {
    if(price.value != 0) {
        let getTotal = (quntity.value * price.value) - descount.value;
        total.value = getTotal;
        total.className.replace='form-control bg-danger text-center'; // if you didn't write color is red else yellow
        total.className='form-control bg-warning text-center';
    } else {
        total.value = 0;
        total.className.replace='form-control bg-warning text-center';
        total.className='form-control bg-danger text-center';

    }
}



//Save function
function SaveProduct (){  // names in data base or Model
let objProduct={
    categoryId: dddlcategory.value,   //options[dddlcategory.selectedIndex].value,
    name: product.value,
    quntity: quntity.value,
    price: price.value,
    descount: descount.value,
    total: total.value

};

 let data=JSON.stringify(objProduct); // convert string to json to accepte in ajax
 if(ValidationProduct() == false){
    return;
 }
 Helper.AjaxCallPost(UrlPro,data, function(data) {      

    if(data !=null){
        toastr.success(`Save the New Product ${data.name}`, 'Successfully');
        RestProduct();
        showTable();// after save show use fuction table  to save in table
        countProduct();
  
    }else{
        toastr.error(`Not Save the New Product ${data.name}`, 'Error');
    }
 });



};


 

 //Rest function
RestProduct= ()=>{
dddlcategory.value='';
product.value='';
price.value=0;
quntity.value=0;
descount.value=0;
total.value=0;

total.className.replace='form-control bg-warning text-center';
total.className='form-control bg-danger text-center';

};

//showtable function

function showTable()
{
    let TableProduct= '';

   
  $.ajax({
    url : `${UrlPro}`,
    method: 'GET',
    cache:false,
    success: function(data){

        data.forEach(element => {
            TableProduct +=`
                        <tr>
                        <td>${element.id}</td>
                        <td>${element.category.name}</td>
                        <td>${element.name} </td>
                        <td>${element.quntity}</td>
                        <td>${element.price}</td>
                        <td>${element.descount}</td>
                        <td>${element.total}</td>
                        <td>
                            <button class="btn btn-info">
                                <i class="fa-solid fa-pen-to-square"></i>
    
                            </button>
                            <button class="btn btn-danger" onclick="DeleteProduct(${element.id})" >
                                <i class="fa-solid fa-trash"></i>
    
                            </button>
                        </td>
                        
                    </tr>
                    `;
                });
                bodyProduct.innerHTML=TableProduct;
    }
  });

};


//count function in head Title

function countProduct(){
 $.ajax({
    url: `${UrlPro}`,
    method: 'GET',
    cache: false,
    success: function(data){
        CountProducts.innerHTML=`-TotalNumber(${data.length})`;
    } 
 });

};


//Delete function

function  DeleteProduct(id){

     if(confirm('Are You Sure You Want To Delete')== true){
        $.ajax({
            url: `${UrlPro}/${id}`,
            method: 'DELETE',
            cache: false,
            success: function(data){
                if(data !=null){
                    showTable();
                    countProduct();
                    toastr.error('Delete the Category is Name ' + data.name, 'DELETE');
                } 
                
            }
    
        });
     }

};


//Validation
function ValidationProduct(){
let  isValid=true;

if(dddlcategory.value == ''){
    labcate.innerHTML='Category : *[Required]';
    labcate.style.color='red';
    isValid=false;
}

else{
    labcate.innerHTML='Category : *';
    labcate.style.color='white';
    isValid=true;
}

if(product.value== ''){
    lbPro.innerHTML='Product Name:*[Required]';
    lbPro.style.color='red';
    isValid=false;
}else if(!isNaN(product.value)){   // isNaN  fucntions build in java script check on number
    lbPro.innerHTML='[Not a Number]';
    lbPro.style.color='red';
    isValid=false;
}
else{
    lbPro.innerHTML='Product Name: *';
    lbPro.style.color='white';
    isValid=true;
}


// quntity 
if(quntity.value== ''|| quntity.value ==0){
    lQuantity.innerHTML='*[Required]';
    lQuantity.style.color='red';
    isValid=false;
}else if(isNaN(quntity.value)){   // isNaN  fucntions build in java script check on number
    lQuantity.innerHTML='[Not a Number]';
    lQuantity.style.color='red';
    isValid=false;
}
else{
    lQuantity.innerHTML='Quntity : *';
    lQuantity.style.color='white';
    isValid=true;
}


// Price 
if(price.value== '' || price.value ==0){
    lbPice.innerHTML='*[Required]';
    lbPice.style.color='red';
    isValid=false;
}else if(isNaN(price.value)){   // isNaN  fucntions build in java script check on number
    lbPice.innerHTML='[Not a Number]';
    lbPice.style.color='red';
    isValid=false;
}
else{
    lbPice.innerHTML='Price : *';
    lbPice.style.color='white';
    isValid=true;
}

// Descount
if(descount.value== ''){
    lDesco.innerHTML='[Enter Zero]';
    lDesco.style.color='red';
    isValid=false;
}else if(isNaN(descount.value)){   // isNaN  fucntions build in java script check on number
    lDesco.innerHTML='[Not a Number]';
    lDesco.style.color='red';
    isValid=false;
}
else{
    lDesco.innerHTML='Descount';
    lDesco.style.color='white';
    isValid=true;
}

return isValid; 

};


//prnt function

//Event Run







price.addEventListener('keyup', GetTotal);          // total value change when keyup on price,descount and quntity
descount.addEventListener('keyup', GetTotal); 
quntity.addEventListener('keyup', GetTotal); 

price.addEventListener('change', GetTotal);        // totl value change when change number of price,descount and quntity
descount.addEventListener('change', GetTotal); 
quntity.addEventListener('change', GetTotal);

btnSave.addEventListener('click',SaveProduct); // this event when you leave your hand from keboard
btnRestPro.addEventListener('click', RestProduct);
showTable();
countProduct();
