var upperLeatherColor, shoeLaceColor, eyeletColor, outSoleColor, threadColor;

var upperLeather, shoeLace, eyeLet, outSole, thread;

upperLeather = document.getElementsByClassName("upperLeather");
shoeLace = document.getElementsByClassName("shoelace");
eyeLet = document.getElementById("eyelet");
outSole = document.getElementsByClassName("outsole");
thread = document.getElementsByClassName("thread");

function setUpperLeatherColor(val) {
    upperLeatherColor = val;
    if(val == "ULcolor1"){
        document.getElementsByClassName("upperLeather").src = "./images/1.jpg" ;
        console.log(val);
    }
}

function setShoeLaceColor(val) {
    shoeLaceColor = val;
    console.log(val)
}

function setEyeletColor(val) {
    eyeletColor = val;
    console.log(val)
}

function setOutSoleColor(val) {
    outSoleColor = val;
    console.log(val)
}

function setThreadColor(val) {
    threadColor = val;
    console.log(val)
}




