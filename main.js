//global variable
var deriv;

//global variable
var finalNatLogDeriv;

//global user input variable that begins the logical process
//the input determines the general type of value that the user wants to calculate the derivative of (exponent, trigonometric function, or natural logarithm)
var choice = readLine("Do you want to find the derivative of an exponent value (kx^b) (type a) or of a trig function (type t) or of a natural logarithm (type l)?");

//if the user chooses to calculate the derivative of an exponent value
if (choice == "a") {
    //this user input variable asks if the user wants to calulate the derivative of a single exponent value or of an equation of two exponent values
    //example of a single exponent value: (3x^4)
    //example of an equation of two exponent values (addition): (2x^8) + (4x^6)
    //example of an equation of two exponent values (subtraction): (5x^3) - (10x^7)
    var choose = readInt("How many exponent values (ex: 2x^2) do you want to calculate (1 or 2)?");
    //if the user chooses to calulate the derivative of a single exponent value
    if (choose == 1) {
        //ask the user what the base number is
        //store this data in the variable 'Oneinputbasenum' to be called in the selected algorithm
        var Oneinputbasenum = readInt("What is the base number?");
        //ask the user what the base number is
        //store this data in the variable 'Oneinputexponent' to be called in the selected algorithm
        var Oneinputexponent = readInt("What is the exponent?");
    //if the user chooses to calulate the derivative of an equation with exponents
    } else if (choose == 2) {
        //ask the user what the first value's base number is
        //store this data in the variable 'TwoinputbasenumOne' to be called in the selected algorithm
        var TwoinputbasenumOne = readInt("What is the first base number?");
        //ask the user what the first value's exponent is
        //store this data in the variable 'TwoinputexponentOne' to be called in the selected algorithm
        var TwoinputexponentOne = readInt("What is the first exponent?");
        
        //ask the user what the sign between the two values is (either subtraction or addition)
        //store this data in the variable 'Twoinputsign' to be called in the selected algorithm
        var Twoinputsign = readLine("Do you want to add (+) or subtract (-) these two terms?");
        
        //ask the user what the second value's base number is
        //store this data in the variable 'TwoinputbasenumTwo' to be called in the selected algorithm
        var TwoinputbasenumTwo = readInt("What is the second base number?");
        //ask the user what the second value's exponent is
        //store this data in the variable 'TwoinputexponentTwo' to be called in the selected algorithm
        var TwoinputexponentTwo = readInt("What is the second exponent?");
    }
//if the user chooses to calculate the derivative of a trigonometric function
} else if (choice == "t") {
    var trigFunct = readLine("Which trig function do you want to solve?");
    var trigTermCoeff = readLine("What is the coefficient?");
    var trigTermExp = readLine("What is the exponent?");
} else if (choice == "l") {
    var natLogBaseNum = readInt("What is the natural log base num (k) (ex: ln(kx^b)?");
    var natLogExp = readInt("What is the natural log exponent (b) (ex: ln(kx^b)?");
}


//this is the selected algorithm
//the selected algorithm is referred to as 'start' in order to simplify readability of the written response
//this algorithm integrates four included algorithms ('derivativeExponent', 'derivativeEquation', 'trigDerivative', and 'naturalLogDerivative')
//but 'derivativeExponent' also functions as an abstraction so it is not counted as an algorithm in the written response
function start() {
    
    if (choice == "a") {
        if (choose == 1) {
            var finalOne = derivOneExponentEquation(Oneinputbasenum, Oneinputexponent);
            println(finalOne);
        } else if (choose == 2) {
            var finalTwo = derivTwoExponentEquation(TwoinputbasenumOne, TwoinputexponentOne, Twoinputsign, TwoinputbasenumTwo, TwoinputexponentTwo);
            println(finalTwo);
        }
    } else if (choice == "t") {
        var finalTrig = trigDerivEquation(trigFunct, trigTermCoeff, trigTermExp);
        println(finalTrig);
    } else if (choice == "l") {
        var finalLN = lnDerivEquation(natLogBaseNum, natLogExp);
        println(finalLN);
    }
    
}


//this is an included algorithm
//this included algorithm is referred to as 'naturalLogDerivative' in order to simplify readability of the written response
function lnDerivEquation(natLogNum, natLogExponent) {
    
    var natLogDeriv = derivOneExponentEquation(natLogNum, natLogExponent);
    
    if (natLogNum > 1) {
        if (natLogExponent == 0) {
            finalNatLogDeriv = "(" + natLogNum + ") / " + "(" + natLogNum + "x" + ")";
        } else if (natLogExponent == 1) {
            finalNatLogDeriv = "(" + natLogDeriv + ") / " + "(" + natLogNum + "x" + ")";
        } else if (natLogExponent >= 1) {
            finalNatLogDeriv = "(" + natLogDeriv + ") / " + "(" + natLogNum + "x^" + natLogExponent + ")";
        }
    } else if (natLogNum == 1) {
        if (natLogExponent == 0) {
            finalNatLogDeriv = "(" + natLogNum + ") / " + "(" + "x" + ")";
        } else if (natLogExponent == 1) {
            finalNatLogDeriv = "(" + natLogDeriv + ") / " + "(" + "x" + ")";
        } else if (natLogExponent >= 1) {
            finalNatLogDeriv = "(" + natLogDeriv + ") / " + "(" + "x^" + natLogExponent + ")";
        }
    } else if (natLogNum == 0) {
        finalNatLogDeriv = 0;
    }
    
    
    return finalNatLogDeriv;
}


//this is an included algorithm
//this included algorithm is referred to as 'trigDerivative' in order to simplify readability of the written response
function trigDerivEquation(trig, term, exp) {
    var thing = trig;
    var exppp = exp;
    
    if (thing == "sin") {
        thing = "cos";
    } else if (thing == "cos") {
        thing = "-sin";
    } else if (thing == "tan") {
        thing = "sec^2";
    }
    
    var trigDeriv = derivOneExponentEquation(term, exppp);
    
    var finalTrigDeriv = trigDeriv + " * " + thing + "(" + term + "x^" + exp + ")";
    
    return finalTrigDeriv;
}


//this is an included algorithm
//this included algorithm is referred to as 'derivativeEquation' in order to simplify readability of the written response
function derivTwoExponentEquation(basenumOne, exponentOne, sign, basenumTwo, exponentTwo) {
    
    var firstValue = derivOneExponentEquation(basenumOne, exponentOne);
    
    var secondValue = derivOneExponentEquation(basenumTwo, exponentTwo);
    
    var final = "(" + firstValue + ")" + " " + sign + " " + "(" + secondValue + ")";
    
    return final;
}

//this included algorithm also functions as the abstraction of the program
//this abstraction is referred to as 'derivativeExponent' in order to simplify readability of the written response
function derivOneExponentEquation(basenum, exponent) {
    basenum *= exponent;
    exponent -= 1;
    
    
    if (basenum != 0) {
        if (exponent == 0) {
            deriv = basenum;
        } else if (exponent == 1) {
            deriv = basenum + "x";
        } else if (exponent > 1) {
            deriv = basenum + "x" + "^" + exponent;
        }
    } else {
        deriv = 0;
    }
    
    
    return deriv;
    
    return basenum;
    return exponent;
}
