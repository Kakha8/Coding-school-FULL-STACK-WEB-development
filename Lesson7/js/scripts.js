var valueOne = 789;
var valueTwo = 3;
var valueThree = valueOne + valueTwo;
console.log("result: " + valueThree);

function loadContent(page){
    
    var ajax = new XMLHttpRequest();

    var filepath = `${page}.html`;

    //alert('gela');
    ajax.open("GET", filepath, true);
    ajax.onload = function(){
        if(ajax.status == 200){
           const container = document.getElementById("main-container");
           if(container){
            container.innerHTML = ajax.responseText;
           }
        }
    }

    ajax.onerror = function(){
        console.log("error!");
    }
    ajax.send();
    // if(page == "about"){
    //     document.getElementById.innerHTML = "<object type='text/html' data='about.html'></object>";
    // } else if(page == "contact"){
    //     document.getElementById.innerHTML = "<object type='text/html' data='contact.html'></object>";
    // }
}