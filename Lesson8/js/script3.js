

var account = {
    name: "Kakha",
    account_number: 546674,
    balance: 435.3454646,
    deposit: function(amount){

        this.balance += amount;
        console.log(`Deposited: ${amount}`);
    },
};

console.log(typeof account.account_number)
var value = account.account_number.toString()

console.log(account.balance.toFixed(2));

