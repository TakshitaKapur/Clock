const HR = document.getElementById("hr");
const MIN = document.getElementById("min");
const SEC = document.getElementById("sec");
const MS = document.getElementById("ms");
const lap=document.getElementById("lap");
const demo=document.getElementById("demo");

const START = document.getElementById("start");
const RESET = document.getElementById("reset");
const FLAG = document.getElementById("flag");
const SPEAK = document.getElementById("speak");

START.addEventListener("click", start);
RESET.addEventListener("click", reset);
FLAG.addEventListener("click", flag);
SPEAK.addEventListener("click", speech);

var interval, check = 0;

function start(){
        if (check==0){
                START.src='../img/pause-circle.svg';
                interval=window.setInterval(myinterval,10);
                check++;
        }else {
            window.clearInterval(interval);
            START.src='../img/play-circle.svg';
            
            check=0
        }
}

function reset(){
   
    HR.innerHTML="00";
    MIN.innerHTML="00";
    SEC.innerHTML="00";
    MS.innerHTML="00";
    lap.innerHTML="";
    demo.innerHTML="";
}
function flag(){
    var element=document.createElement("div");
    element.style.paddingBottom="10px";
    element.style.fontFamily="Verdana";
    element.style.fontSize="30px";
    element.innerHTML=HR.innerHTML+ ":" + MIN.innerHTML+ ":" + SEC.innerHTML+ ":" + MS.innerHTML;
    lap.append(element);
}

function myinterval(){

    MS.innerHTML=n((Number(MS.innerHTML)+1));

    if(MS.innerHTML>=100){
        SEC.innerHTML=n((Number(SEC.innerHTML)+1));
        MS.innerHTML="00";
    }
    if(SEC.innerHTML>=60){
        MIN.innerHTML=n((Number(MIN.innerHTML)+1));
        SEC.innerHTML="00";
    }
    if(MIN.innerHTML>=60){
        HR.innerHTML=n((Number(HR.innerHTML)+1));
        MIN.innerHTML="00";
    }

}

function speech(){
        if(SPEAK.alt=="off"){
            demo.innerHTML="Try saying Start or Stop or Reset or Flag...";
            demo.style.fontFamily="Verdana";
            recognition.start();
            SPEAK.alt="on";
            SPEAK.src='../img/mic.svg';
        }else{
            recognition.stop();
            SPEAK.alt="off";
            SPEAK.src='../img/mic-mute.svg';
            demo.innerHTML="";
        }
}

const recognition = new webkitSpeechRecognition();
recognition.continuous=true;
recognition.interimResults = true;
recognition.onresult = function (event) {
    let result = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
        result += event.results[i][0].transcript;
    }
    demo.innerHTML = result.trim();

    switch (demo.innerHTML) {
        case "start":
            {
                if (check==0)
                start();
            }
            break;
        case "stop":
            {
                if (check!=0)
                start();
            }
            break;
        case "reset":
            {
                reset();
            }
            break;
        case "flag":
            {
                flag();
            }
            break;
    
        default: console.log("Say Start or Stop");
            break;
    }
};

function n(n){
    return n > 9 ? "" + n: "0" + n;
}