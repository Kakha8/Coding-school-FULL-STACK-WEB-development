function multiply(n1,n2,n3){
    var res = n1*n2*n3;
    return res;
}

console.log("Result of multiplication: " + multiply(3,6,7).toString());

// function reverseWordOrder(value){
//     var res = originalString.split('').reverse().join('');
//     return res;
// }

// console.log("Reversed: " + reverseWordOrder("Hello"));

function logUserData(personName, age){
    
    return "User: " + personName + " is " + age.toString() + " years old";
}

console.log(logUserData("Kakha Kudava", 26));

var firstName = "Kakha";
var lastName = "Kudava";
var fullName = firstName + lastName;

console.log(fullName);

var originalString = "Dublin Coding School";
var newString = originalString.replace("Coding", "CODING");
console.log(newString); 

var s1 = "Dublin Coding School";
var s1_split = s1.split(' ');

var res = s1_split[2] + " " + s1_split[1] +" " + s1_split[0];

console.log(res);

function getWeekDay(day){
    if(day==0)
        return "Sun";
    if(day==1)
        return "Mon";
    if(day==2)
        return "Tue";
    if(day==3)
        return "Wed";
    if(day==4)
        return "Thu";
    if(day==5)
        return "Fri";
    if(day==6)
        return "Sat";    
}

function getMonthLetters(month){
    if(month==0){
        return "Jan";
    }
    if(month==1){
        return "Feb";
    }
    if(month==2){
        return "Mar";
    }
    if(month==3){
        return "Apr";
    }
    if(month==4){
        return "May";
    }
    if(month==5){
        return "Jun";
    }
    if(month==6){
        return "Jul";
    }
    if(month==7){
        return "Aug";
    }
    if(month==8){
        return "Sep";
    }
    if(month==9){
        return "Oct";
    }
    if(month==10){
        return "Nov";
    }
    if(month==11){
        return "Dec";
    }
}

function logEvent(eventName, d){

    return eventName + " occured on " + getWeekDay(d.getDay()) + ", " + 
    d.getDate().toString() + " " + getMonthLetters(d.getMonth()) + " " + d.getFullYear().toString() 
    + " " + d.getHours().toString() + ":" + d.getMinutes().toString() + ":" + d.getSeconds() + " GMT";
}

const myDate = new Date("12 Feb 2022 12:04:35");

console.log(logEvent("Event1",myDate));