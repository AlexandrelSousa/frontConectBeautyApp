function nextForm(){
    document.getElementById("form1").style.display = "none";
    document.getElementById("form2").style.display = "flex";   
}
function previousForm(){
    document.getElementById("form1").style.display = "flex";
    document.getElementById("form2").style.display = "none";   
}
function nextNextForm(){
    document.getElementById("form2").style.display = "none";
    document.getElementById("form3").style.display = "flex";   
}