(function() {
    "use strict";


    var el = function(element) {
        if (element.charAt(0) === "#")
            return document.querySelector(element);

        return document.querySelectorAll(element);
    };


    // Variables
    var viewer = el("#viewer"),
        equals = el("#equals"),
        nums = el(".num"),
        ops = el(".ops"),
        theNum = "",
        oldNum = "",
        resultNum,
        operator;


    var setNum = function() {
        if ((this.getAttribute("data-num") === "." && theNum.indexOf(".") === -1) || this.getAttribute("data-num") !== ".") {
            if (resultNum) {
                theNum = this.getAttribute("data-num");
                resultNum = "";
            } else
                theNum += this.getAttribute("data-num");

            if (oldNum == "")
                viewer.innerHTML = theNum;
            else {
                var previousHTML = viewer.innerHTML;
                viewer.innerHTML = previousHTML + theNum;
            }
        }

    };

    var moveNum = function() {
        oldNum = theNum;
        theNum = "";
        operator = this.getAttribute("data-ops");

        equals.setAttribute("data-result", "");
        viewer.innerHTML = oldNum + this.innerHTML;
    };


    var displayNum = function() {

        oldNum = parseFloat(oldNum);
        theNum = parseFloat(theNum);

        switch (operator) {
            case "plus":
                resultNum = oldNum + theNum;
                break;

            case "minus":
                resultNum = oldNum - theNum;
                break;

            case "times":
                resultNum = oldNum * theNum;
                break;

            case "divided by":
                resultNum = oldNum / theNum;
                break;

            case "square":
                resultNum = oldNum ** 2;
                break;

            case "cube":
                resultNum = oldNum ** 3;
                break;

            case "square root":
                resultNum = Math.sqrt(oldNum);
                break;

            case "power":
                resultNum = oldNum ** theNum;
                break;

            case "sin":
                resultNum = Math.sin(oldNum);
                break;

            case "cos":
                resultNum = Math.cos(oldNum);
                break;

            case "tan":
                resultNum = Math.tan(oldNum);
                break;

            default:
                resultNum = theNum;
        }

        if (!isFinite(resultNum)) {
            if (!isInt(resultNum) || !isFloat(resultNum)) {
                resultNum = "You broke it!";
            } else {
                resultNum = "Look at what you've done";
                el('#calculator').classList.add("broken");
                el('#reset').classList.add("show");
            }
        }


        viewer.innerHTML = resultNum;
        equals.setAttribute("data-result", resultNum);


        oldNum = 0;
        theNum = resultNum;

    };


    var clearAll = function() {
        oldNum = "";
        theNum = "";
        viewer.innerHTML = "0";
        equals.setAttribute("data-result", resultNum);
    };


    var findKey = function(e) {
        if ((e.key >= 0 && e.key <= 9) || e.key == ".") {
            setNumKey(e.key);
        }

        switch (e.key) {
            case "+":
                moveNumKey("plus");
                break;
            case "-":
                moveNumKey("minus");
                break;
            case "*":
                moveNumKey("times");
                break;
            case "/":
                moveNumKey("divided by");
                break;
            case "=":
            case "Enter":
                displayNum();
                break;
            case "Escape":
            case "c":
            case "C":
                clearAll();
                viewer.innerHTML = "";
                break;

            default:
                break;
        }
    }


    for (var i = 0, l = nums.length; i < l; i++) {
        nums[i].onclick = setNum;
    }


    for (var i = 0, l = ops.length; i < l; i++) {
        ops[i].onclick = moveNum;
    }

    document.onkeyup = findKey;

    equals.onclick = displayNum;

    el("#clear").onclick = clearAll;

    el("#reset").onclick = function() {
        window.location = window.location;
    };

}());