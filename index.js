console.log("Hello World");

var calculateSquare = function(numIn) {
    var numOut = numIn * numIn;
    return numOut;
};


for(var x = 0; x < 9999; x++) {
    
    setTimeout(calculateSquare(x), 3000)
    console.log(calculateSquare(x));
}
