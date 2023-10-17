textgroesse = 30
condition = true;
function JavaScript(){
    if (condition){
        document.getElementById("ID").textContent = "Hello JavaScript"
        condition = false
    }else{
        document.getElementById("ID").textContent = "Lorenz Bauscher"
        condition = true
    }
}
function groesserMachen(){
    textgroesse += 10;
    document.getElementById('ID').style.fontSize=textgroesse +'px'
}
function verstecken(){
    document.getElementById('ID').style.visibility='hidden'
}
function zeigen(){
    document.getElementById('ID').style.visibility='visible'
}