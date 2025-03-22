
let Helper=
{
     AjaxCallGet:function (Url,success,error) {

        $.ajax({
            url: `${Url}/GetAll`,
            method: 'GET',
            cache: false,
            success: function(data){
                success(data);
                return data;
            },
            error: function(err){
                error(err);
                return 0;
            }


        });

     },

    AjaxCallPost: (Url,parmaters,success,error)=>{
        $.ajax({
            url: Url,
            method: "POST",
            contentType: "application/json",
            data:parmaters,
            cache: false,
            success: function(data){
                success(data);
                return data;
            },
            error: function(err){
                error(err);
                return 0;
            }


        });

    },
    AjaxCallPut: (Url,parmaters,success,error)=>{
        $.ajax({
            url: Url,
            method: "PUT",
            contentType: "application/json",
            data:parmaters,
            cache: false,
            success: function(data){
                success(data);
                return data;
            },
            error: function(err){
                error(err);
                return 0;
            }


        });

    },
    AjaxCallDelete:(Url,success,error)=>{

        $.ajax({
            url: Url,
            method: 'DELETE',
            cache: false,
            success: function(data){
                success(data);
                return data;
            },
            error: function(err){
                error(err);
                return 0;
            }


        });

     },


     



};