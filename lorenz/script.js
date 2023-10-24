let textgroesse = 30
let condition = true;
console.log("HAllo!")
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
function add(x,y){
    document.getElementById('Rechner').textContent = x+y
}
function calculate(){
    let numbers = document.querySelector("#input").value
    let ergebnis = 0
    const numb = numbers.split(" ")
    console.log(numb)
    for (i of numb){
        console.log(i)
        ergebnis += parseInt(i)
    }
    console.log(ergebnis)
    document.getElementById('Rechner').textContent = ergebnis
}
function Surprise(){
    document.getElementById('hobbies').textContent = "Spaßßß"
    console.log("In Surprise!")
}
function Another(){
    document.getElementById('hobbies').textContent = "Hobbies"
}
function doSomething(){
    for (i = 0; i < 10; i++){
    document.getElementById('tennis').offsetHeight = 5
    }
}