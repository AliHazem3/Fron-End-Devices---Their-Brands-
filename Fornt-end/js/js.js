//let table = new DataTable('#tablePro'); // data table is search,pages, in table  tablepro is id in table html

$(document).ready(function(){
$(tablePro).DataTable();
});


function PrintTable(le){
    let body =document.body.innerHTML;  //  store all page

    let printx=document.getElementById(le).innerHTML;   // store table

    document.body.innerHTML=printx;
    print();

    document.body.innerHTML =body;
}; 