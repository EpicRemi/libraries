//Remi's Library :)

//personal code for personal pc
const fs = require("fs");

function WriteToJSON(filePath, value) {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) throw err;

    let jsonData = JSON.parse(data);
    jsonData = value;

    fs.writeFile(filePath, JSON.stringify(jsonData), (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  });
}
//code.org code for cord.org

//return's a random int - fin
//min is the min value
//max is the max value
function GetRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

//console.log("Random number between 1 and 10 - " + GetRandomInt(1, 10));
//console.log("Random number between 100 and 1000 - " + GetRandomInt(100, 1000));
//console.log("Random number between 10000 and 1000000 - " + GetRandomInt("10000", "1000000"));

//returns if a whole number is prime or not (t/f)
//number the whole number that needs to be checked
var primeNumbers = require("./PrimeNumbers.json");
console.log(primeNumbers);

function isPrime(number) {
  //stringify a non string and kicks out NaN
  if (typeof number === "string") {
    number = Number(number);
    if (isNaN(number)) {
      throw new Error("Not a number");
    }
  }
  //decimals cant be prime
  if (Math.round(number) != number) {
    return false;
  }
  //negatives cant be prime, nor is 1, or 0
  else if (number <= 1) {
    return false;
  } else {
    //use binary search to find if num in list so we dont need to do the math
    let found = BinarySearch(primeNumbers, number);
    if (found != null) {
      console.log("found in list");
      return true;
    } else {
      console.log("doing maths");
      //if found then return true
      //if not it goes on to code below
      var i;
      var closestKnownPrime = -1;
      let newPrime = true;
      for (i = 0; i <= number + 1; i++) {
        var factor; //tracks the factor rounded
        var actual; //tracks the actual to remove decimals from triggering system
        //sets the highest known prime number as an anchor
        if (primeNumbers[i] > number && closestKnownPrime === -1) {
          closestKnownPrime = primeNumbers[i];
        }
        //if number is higher than highest/closest known prime it will switch to +1 to narrow it down
        if (primeNumbers[i] === undefined || primeNumbers[i] > number) {
          factor = Math.round(number / (closestKnownPrime + i));
          actual = number / (closestKnownPrime + i);
        }
        //checks the prime numbers as factors cause math does stuff (tree factoring explains why)
        else {
          factor = Math.round(number / primeNumbers[i]);
          actual = number / primeNumbers[i];
        }
        //logs data so i can cry when fails/shows wrong data
        //console.log(
        //  `loop# = ${i}\nfactor: ${factor}\nactual: ${actual}\nDenominator np: ${
        //    closestKnownPrime + i
        //  }\nDenominator p: ${primeNumbers[i]}`
        //);
        //this will only happen when the thing we divind by is equal to number
        if (factor === 1 && actual === 1) {
          //temp if for for logging prime numbers put it outside so it updates file every time its called and not at end
          break;
        } else if (factor == actual) {
          return false;
        }
      }
      for (let j = 0; j < primeNumbers.length; j++) {
        if (primeNumbers[j] == number) {
          newPrime = false;
        }
      }
      if (newPrime) {
        primeNumbers.push(number);
        SortList(primeNumbers);
        //console.log(primeNumbers);
        WriteToJSON("./PrimeNumbers.json", primeNumbers);
      }
      return true;
    }
  }
}
//I'll like to thank the rubber ducky debugging
{
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀  ⣀⣤⣴⣶⣶⣿⣶⣶⣦⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⡿⠟⠛⠋⠉⠙⠛⠻⢿⣿⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠉⠻⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⣠⣤⣤⣄⠀⠀ ⠘⣿⣿⣆⣀⣀⣀⣀⣀⣀⡀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⠀⠀⠀ ⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿",
    "⠀⠀⠀⠀⠀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠋⠁⠀⠀⠀⠀ ⣿⣿⣿⣿⣿⣿⣿⣿⣿",
    "⠀⠀⠀⢀⣾⣿⣿⣿⣷⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⡟",
    "⠀⠀⣠⣿⣿⠟⠀⠉⠛⢿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⢿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿⠟⠀",
    "⠀⣰⣿⣿⠋⠀⠀⠀⠀⠀⠙⢿⣿⣷⣄⠀⠀⠀⠀⠀⠘⢿⣿⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⣿⣿⣿⠿⠿⠋⠁⠀⠀",
    "⢠⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⡅⠀⠀⠀⠀⠀⠀⠀⠀",
    "⣼⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠛⠉⠉⠉⠉⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀",
    "⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀  ⠀ ⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀",
    "⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀  ⠀⢸⣿⣿⠀⠀⠀⠀⠀⠀⠀",
    "⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀   ⠀⢸⣿⣿⠀⠀⠀⠀⠀⠀⠀",
    "⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀   ⠀⠀⢸⣿⣿⠀⠀⠀⠀⠀⠀⠀",
    "⢻⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀   ⠀⠀⣼⣿⡟⠀⠀⠀⠀⠀⠀⠀",
    "⠘⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀   ⠀⠀⢠⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀",
    "⠀⢹⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀   ⠀⢠⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠻⣿⣿⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀   ⢠⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠙⢿⣿⣿⣷⣦⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀  ⣀⣠⣤⣶⣿⣿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠈⠙⠛⠿⢿⣿⣿⣿⣶⣶⣤⣤⣤⣤⣄⣀⣀⣀⣤⣤⣤⣤⣴⣶⣾⣿⣿⣿⠿⠟⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠛⠛⠻⠿⠿⠿⢿⣿⣿⡿⠿⠿⠿⠿⠛⠛⠋⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀";
}

console.log("Is 19 prime? " + isPrime(19));
console.log("Is 18 prime? " + isPrime(18));
console.log("Is 9999991 prime? " + isPrime(9999991));
//does some json stuffs -- should not be in the code.org submit if it is woops i guess this does nothing on code.org

//sorts lists - fin
function SortList(list) {
  var i;
  for (i = 1; i < list.length; i++) {
    var index = i;
    var temp = list[i];
    while (index != 0 && temp < list[index - 1]) {
      list[index] = list[index - 1];
      index--;
    }
    list[index] = temp;
  }
}
//var rList = [];
//for (let h = 0; h < 6; h++) {
//  rList.push(GetRandomInt(0, 1000));
//}
//console.log(rList);
//SortList(rList);
//console.log(rList);

//function that will search through a list using binary searching -- fin
function BinarySearch(list, item) {
  var low = 0;
  var high = list.length - 1;
  while (low <= high) {
    var mid = Math.floor((low + high) / 2);
    var guess = list[mid];
    if (guess == item) {
      return mid;
    }
    if (guess > item) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return null;
}

//var randomNum4BinearyTest = GetRandomInt(0, rList.length);
//var desiredVal = rList[randomNum4BinearyTest]
//console.log(`${desiredVal} is located at rList[${BinarySearch(rList, rList[randomNum4BinearyTest])}]`);
