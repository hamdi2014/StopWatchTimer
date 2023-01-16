
let choice = "";
let second = 0;
let btn = '';
let btnStopWatch = '';
let min = 0;
let hour = 0;
let myTime;
let myTimer;
let myStopWatch;
let newBtn;
let digitCount = function (numInBaseTen) { //this function return number of digits.
    let c = 0;
    let temporaryNumber = numInBaseTen
    if (temporaryNumber === 0) {
        c = 1;
    }
    for (let i = 1; temporaryNumber >= 1; i++) {
        temporaryNumber = temporaryNumber / 10;
        c = c + 1
    };
    return c;
}
const zeroPad = (num, len) => {
    return new Array(len - digitCount(num)).fill('0').join('') + num
}
const setTimer = () => {
    hour = Number(document.getElementById("hour").value)
    min = Number(document.getElementById("minute").value)
    second = Number(document.getElementById("second").value)
    document.getElementById("timer-span").innerText = zeroPad(hour, 2) + ':' + zeroPad(min, 2) + ':' +
        zeroPad(second, 2);
    clearInterval(myTimer);
}
const stopWatch = () => {
    document.getElementById("stop-watch-span").innerText = zeroPad(hour, 2) + ':' + zeroPad(min, 2) + ':' +
        zeroPad(second, 2);
    second++
    if (second > 59) {
        min++
        second = 0
        if (min > 59) {
            hour++
            min = 0
        }
    }
}
const timer = () => {
    document.getElementById("timer-span").innerText = zeroPad(hour, 2) + ':' + zeroPad(min, 2) + ':' +
        zeroPad(second, 2);
    if (second || min || hour) {
        second--
        if (second < 0) {
            min--
            second = 59
            if (min < 0) {
                hour--
                min = 59
            }
        }
    }
}
const resetTimer = () => {
    hour = 0
    min = 0;
    second = 0
    document.getElementById("timer-span").innerText = zeroPad(hour, 2) + ':' + zeroPad(min, 2) + ':' +
        zeroPad(second, 2);
    btn = 'start'
    document.getElementById("btn-start").innerText = "Start"
    clearInterval(myTime)
}
const resetStopWatch = () => {
    hour = 0
    min = 0;
    second = 0
    document.getElementById("stop-watch-span").innerText = zeroPad(hour, 2) + ':' + zeroPad(min, 2) + ':' +
        zeroPad(second, 2);
    btn = 'start'
    document.getElementById("btn-start-stop-watch").innerText = "Start"
    clearInterval(myTimer)
    clearInterval(myStopWatch)
    document.getElementById("laps").innerText = ''
}
const lap = () => {
    document.getElementById("laps").innerText = document.getElementById("laps").innerText + '\n' + zeroPad(
        hour, 2) + ':' + zeroPad(min, 2) + ':' + zeroPad(second - 1, 2);
}
const time = () => {
    clearInterval(myTime);
    if (choice === "timer") {
        switch (btn) {
            case '': {
                timer();
                document.getElementById("btn-start").style.paddingLeft = "15px"
                document.getElementById("btn-start").style.paddingRight = "15px"
                document.getElementById("btn-start").innerText = "Pause"
                myTimer = setInterval(timer, 1000);
                btn = 'pause'
                break;
            }
            case 'start': {
                timer();
                document.getElementById("btn-start").style.paddingLeft = "15px"
                document.getElementById("btn-start").style.paddingRight = "15px"
                document.getElementById("btn-start").innerText = "Pause"
                myTimer = setInterval(timer, 1000);
                btn = 'pause'
                break;
            }
            case 'pause': {
                document.getElementById("btn-start").innerText = "Start"
                document.getElementById("btn-start").style.paddingLeft = "30px"
                document.getElementById("btn-start").style.paddingRight = "30px"
                clearInterval(myTimer);
                btn = 'start';
                break;
            }
        }
    } else if (choice === 'stop-watch') {
        switch (btn) {
            case '': {
                stopWatch();
                myStopWatch = setInterval(stopWatch, 1000);
                document.getElementById("btn-start-stop-watch").innerText = "Pause"
                btn = 'pause'
                break;
            }
            case 'start': {
                stopWatch();
                myStopWatch = setInterval(stopWatch, 1000);
                document.getElementById("btn-start-stop-watch").innerText = "Pause"
                btn = 'pause';
                break;
            }
            case 'pause': {
                clearInterval(myStopWatch);
                document.getElementById("btn-start-stop-watch").innerText = "Start"
                btn = 'start';
                break;
            }
        }
    }
}
const changeOver = (selection) => {
    switch (selection) {
        case "current-time": {
            clearInterval(myTimer);
            clearInterval(myStopWatch);
            choice = "current-time"
            currentTime();
            myTime = setInterval(currentTime, 1000);
            break;
        }
        case "timer": {
            hour = 0
            min = 5;
            second = 0
            document.getElementById("timer-span").innerText = zeroPad(hour, 2) + ':' + zeroPad(min, 2) +
                ':' + zeroPad(second, 2);
            clearInterval(myTime)
            clearInterval(myTimer)
            clearInterval(myStopWatch)
            choice = 'timer'
            document.getElementById("btn-start").innerText = "Start"
            document.getElementById("btn-reset").innerText = "Reset";
            btn = ''
            break;
        }
        case "stop-watch": {
            hour = min = second = 0;
            document.getElementById("stop-watch-span").innerText = zeroPad(hour, 2) + ':' + zeroPad(min,
                2) + ':' + zeroPad(second, 2);
            clearInterval(myTime)
            clearInterval(myTimer)
            choice = 'stop-watch'
            btn = '';
            break;
        }
    }
}
const currentTime = () => {
    let d = new Date().toLocaleTimeString()
    document.getElementById("time").innerText = d
}