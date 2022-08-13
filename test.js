//add files in the format of functionToTest = require('./directoryPath')
//you must use module.exports from your components

describe.only("Example tests", function(){

  // Individual tests can be run using the "it" or "test" methods, they are aliased and are equivalent
  it("Should add small numbers", function(){
    /* This test suite is written in Jest. There are many more methods other than "toBe"
    Go to: https://jestjs.io/docs/en/expect
    to find more options if "toBe" doesn't fit your use case.
    */
   var add = (a, b) => {
    return a + b;
   }
    expect(add(1,1)).toBe(2);
  });
});