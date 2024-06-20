console.log("Script2 loaded!")

var full_name = "Kakha Kudava";
console.log(typeof full_name);

var age = 26;
console.log("age needs to be a:", typeof age);

if(age >= 18){
    console.log("you are an adult");
}


var person = {
    name: full_name,
    age,
    eat: function(){
        console.log(`${name} is eating...`);

    }
};



console.log("person: ", person);

console.log("who is eating:")

person.eat();

var account = {
    balance: 0,
    deposit: function(amount){
        this.balance += amount;
        console.log(`Deposited: ${amount}`)
    },
    withdraw: function (amount){

    },
    showBalance: function(){
        console.log(`Balance: ${this.balance}`);
    }

}


account.deposit(100);
account.showBalance();

var wallet_1 = 100//prompt("How much do you have in the wallet 1?");
var wallet_2 = 200//prompt("How much do you have in the wallet 2?");

if(wallet_1 === wallet_2){
    console.log("you have the same amount in both");
} else{
    console.log("both are different");
}

if(wallet_1>wallet_2){
    console.log("I have more in wallet 1")
} else{
    console.log("more in wallet 2");
}
