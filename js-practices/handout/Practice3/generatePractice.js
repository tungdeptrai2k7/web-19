'use strict'
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
function search(input, target) {
  let i;
  for (i = 0; i < input.length; i++) {
    if (input[i] == target) {
      return i;
    }
  }
  return -1;
}
function sort(input) {
  let i,j,temp;
  for (i=0;i<input.length-1;i++){
    for (j=i+1; j<input.length;j++){
      if (input[i]>input[j]){
      temp=input[i];
      input[i]=input[j];
      input[j]=temp;
      }
    }
  }
  return input;
}
function generate(testLengthArray){
  let i,j;
  let specialCase,target;
  let allDataTest = new Array(testLengthArray.length);
  for (i=0;i<testLengthArray.length;i++){
    let dataTest= new Array(testLengthArray[i]);
    for (j=0; j< testLengthArray[i];j++){
      dataTest[j]= getRandomArbitrary(0,10000);
    }
    sort(dataTest);
    specialCase = getRandomArbitrary(1,4);
    target = getRandomArbitrary(0,10000);
    switch(specialCase){
      case 1 :
      testLengthArray.indexOf(target)=-1; 
      break;
      case 2: 
      target = dataTest[0];
      break;
      case 3:
      target = dataTest[testLengthArray[i]-1];
      break;
      case 4:
      target = dataTest[1,testLengthArray[i]-2];
      break;
    }
    allDataTest[i] = {
      input: dataTest,
      target: target,
      output: search(dataTest, target)
    };
  }
return allDataTest;
 // Remove this line and change to your own algorithm
}

module.exports = generate

