import { formatCurrency } from "../scripts/utils/money.js";

// Test cases for formatCurrency function
console.log("format currency tests");
if(formatCurrency(2095)==='20.95'){
console.log("passed");
}
else{
    console.log("failed");
}

if(formatCurrency(0)==='0.00'){
console.log("passed");
}

if(formatCurrency(2000.5)==='20.01'){
    console.log("passed")
}