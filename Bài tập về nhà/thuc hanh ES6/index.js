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
console.log(newarray); //output: [1, 2, 3, 4, 5]

const Oldarray = [1, 2, 3];
const Newarray = [Oldarray, 4, 5];
console.log(Newarray); //output: [[1, 2, 3], 4, 5]

//spread syntax voi object
const oldObject = {
    name: 'Le Chi Thanh'
  };
  
  const newObject = {
    oldObject,
    age: 4
  };
  
  console.log(newObject); 

  const OldObject = {
    name: 'Chi Thanh Le'
  };
  
  const NewObject = {
    ...OldObject,
    age: 4
  };
  
  console.log(NewObject); 

//rest parameters
function number(num1, num2, ...numOther){
    console.log("x:", num1); 
    console.log("y:", num2);
    console.log("Other number:", numOther);
  }
  number("one", "two", "three", "four", "five", "six");

//destructuring array
const array = [1, 2, 3];
const [x, u] = array;
console.log(x); //output: 1
console.log(u); //output: 2
console.log(array); //output: [1, 2, 3]

//destructuring object
const obj = {
    name: 'Le Chi Thanh',
    age: 19
};
const {name, age} = obj;
console.log(name); //output: Le Chi Thanh
console.log(age); //output: 19
console.log(obj); //output: {name: 'Le Chi Thanh', age: 19}

//ES6 arrow function
const sum = (a, b) => a + b;
console.log(sum(5, 2)); //output: 7

//arrow function 1 tham so
const square = x => x * x;
console.log(square(5)); //output: 25

//arrow function khong tham so
const hello = () => 'Hello!';
console.log(hello()); //output: Hello!

//arrow function - return gia tri
var a = [1, 2, 3];
var arr = () => a[1];
console.log(arr()); /* output: 2*/

//classes - method
class Car {
    constructor(name) {
      this.name = name;
    }
    showName() {
      console.log(this.name);
    }
  }
  const car = new Car('Toyota');
  car.showName(); //output: Toyota

//classes - inheritance
class MEmber {
    constructor() {
      this.name = "Chí Thành";
    }
  
    memberName() {
      return this.name;
    }
  }
  
  class USer extends MEmber {
    constructor(name, job) {
      super(name);
      this.job = "Student";
    }
  
    memberInfo() {
      return this.memberName() + ' Nghề nghiệp: ' + this.job;
    }
  }
  var e = new USer();
  console.log(e.memberInfo()); //output: Chí Thành Nghề nghiệp: Student


  //import - export
  class Member {
    constructor(name) {
      this.name = name;
    }
  
    memberName() {
      return this.name;
    }
  }
  
  class User extends Member {
    constructor(name, job) {
      super(name);
      this.job = "Student";
    }
  
    memberInfo() {
      return this.memberName() + ' Nghề nghiệp: ' + this.job;
    }
  }
  
  var e = new User('Chí Thành');
  console.log(e.memberInfo()); // Output: Chí Thành Nghề nghiệp: Student
  
  import member from './member.js';
  console.log(member.name); 
  // Output: "Dương Minh Trí"
  
  /* hoặc */
  import TênBấtKỳ from './member.js';
  console.log(TênBấtKỳ.name); 
  // Output: "Dương Minh Trí"