//khai bao toan cuc
var v = 10;
function myFnc() {
    console.log(v);
}
console.log(v);
myFnc();

/*ES6 khai bao gia tri voi const
const x = 10;
console.log(x);
if (x === 10) {
    x = 20;
    console.log(x);
}*/

//ES6 khai bao gia tri voi var
var y = 10;
if (y === 10) {
    var y = 20;
    console.log(y);
}
console.log(y);

//ES6 khai bao gia tri voi let
let z = 10;
if (z === 10) {
    let z = 20;
    console.log(z);
}
console.log(z);

//ES6 gan mac dinh tai vi tri khai bao
function multily(a, b = 1) {
    return a * b;
}
console.log(multily(5, 2));
console.log(multily(5));

//spread syntax voi array
const oldarray = [1, 2, 3];
const newarray = [...oldarray, 4, 5];
console.log(newarray); 

const Oldarray = [1, 2, 3];
const Newarray = [Oldarray, 4, 5];
console.log(Newarray);

//spread syntax voi object
