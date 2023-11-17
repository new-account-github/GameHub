function cfLogin(){
    var yn = confirm("Do you want to log in to receive rewards?");
     if(yn==true){
        window.location.href = "/login";
     }
}