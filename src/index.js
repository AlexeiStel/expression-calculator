function eval() {
    return;
}

function expressionCalculator(expr) {

    let getArguments = function(expression, sign) {
        let argumentsSet = [];
        let argument = '';
        let bracketsCount = 0;
          
        for (let i = 0; i < expression.length; i++) {
            let char = expression[i];
            switch (char) {
                case '(':
                    bracketsCount++;
                    break;
                case ')':
                    bracketsCount--;
                    break;
                case sign:
                    if (!bracketsCount) {
                        argumentsSet.push(argument);
                        argument = '';
                        char = '';
                    }
                    break;
            }
            argument += char;
        }

        if (bracketsCount) {
                throw new Error('ExpressionError: Brackets must be paired');
            }
            argumentsSet.push(argument);
            return argumentsSet;
    }

    let add = function(expression) {
        let result = 0;
        let argumentsArr = getArguments(expression, '+');

        argumentsArr = argumentsArr.map( 
            function(item) {
                return subtract(item);
            }
        );

        result = argumentsArr.reduce( 
            function(prevVal, currentVal) {
                return +prevVal + (+currentVal);
            }
        );

        return result;
    }

    let subtract = function(expression) {
        let result = 0;
        let argumentsArr = getArguments(expression, '-');
        
        argumentsArr = argumentsArr.map( 
            function(item) {
                return multiply(item);
            }
        );

        result = argumentsArr.reduce( 
            function(prevVal, currentVal) {
                return prevVal - currentVal;
            }
        );
        return result;
    }

    let multiply = function(expression) {
        let result = 0;
        let argumentsArr = getArguments(expression, '*');

        argumentsArr = argumentsArr.map( 
            function(item) {
                return divide(item);
            }
        );

        result = argumentsArr.reduce( 
            function(prevVal, currentVal) {
                return prevVal * currentVal;
            }
        );
        return result;
    }

    let divide = function(expression) {
        let result = 0;
        let argumentsArr = getArguments(expression, '/');

        argumentsArr = argumentsArr.map( 
            function(item) {
                item = item.trim();
                if ( item[0] === "(" && item[item.length - 1] === ")" ) {
                    return add(item.slice(1, -1));
                }
                return item;
            }
        );
                
        result = argumentsArr.reduce( 
            function(prevVal, currentVal) {
                if (currentVal === '0') {
                    throw new Error('TypeError: Division by zero.');
                }
                return prevVal / currentVal;
            }
        );
        return result;
    }
    
    return add(expr);
}

module.exports = {
    expressionCalculator
}