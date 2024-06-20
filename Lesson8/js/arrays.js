var bus = [1, 2, 3, 4];

var cars = ["BMW", "Volvo", "Mercedes"];

class Person{
    firstName;
    lastName;
    age;
    eat(){
        console.log("eating");
    }
    
}

var person_1 = new Person();
    person_1.firstName = "John";



var john = {firstName: "John", lastname: "Doe", age: 45};
var bob = {firstName: "Bob", lastname: "Smith", age: 32};
var julia = {firstName: "Julia", lastname: "Paul", age: 24};

var bus = [john, bob, julia];


var person5 = {firstName: "Robbie", lastname: "Lawler", age: 40};

bus.push(person5);

var latest = bus.pop();

console.log(bus);
console.log(bus[2].firstName);

console.log(latest)

bus.reverse();

var l2 = bus.pop()

console.log(l2);

var full_name = "kakha kudava";
console.log(full_name[2]);

console.log(full_name.replace("kudava", "junior"));