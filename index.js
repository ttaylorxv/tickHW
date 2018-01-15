console.log("Hello World");

var calculateSquare = function(numIn) {
    var numOut = numIn * numIn;
    return numOut;
};


for(var x = 0; x < 999999; x++) {

    console.log(calculateSquare(x));
}
