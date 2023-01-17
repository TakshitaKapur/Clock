const input = document.getElementById("inputTime");
const begin = document.getElementById("begin");
const reset = document.getElementById("reset");
const audio = document.getElementById("audio");
var progressbar = document.getElementById("progressbar");

begin.addEventListener("click",Startbtn);
reset.addEventListener("click",Resetbtn);

var hr, min, sec, flag, progressbarinner;
var check=0;

function Startbtn(){
    if(begin.innerHTML=="Start"){
        var str= (input.value).split(":");
        reset.disabled=true;
        hr=Number(str[0]);
        min=Number(str[1]);
        sec=Number(str[2]);
        if(check!=0){
            progressbarinner.remove();
            progressbar.className='';
        }
        createProgressbar(function(){
            audio.play();
        });
        var duration= ((hr*3600)+(min*60)+sec+1.2)+"s";
        progressbarinner.style.animationDuration = duration;
        progressbarinner.style.animationPlayState = 'running';
        flag =setInterval(interval,1000);
        begin.innerHTML="Stop";
    }
    else{
        clearInterval(flag);
        begin.innerHTML="Start";
        reset.disabled=false;
        progressbarinner.style.animationPlayState = 'paused';
        check++;
    }
}

function interval(){
    if(sec!=0){
        input.value= n(hr) + ":" + n(min) + ":" + n(sec);
        sec--;
    }
    else if(sec<=0 && min>0){
        min--;
        input.value= n(hr) + ":" + n(min) + ":" + n(sec);
        sec=59;
    }
    else if(min<=0 && hr>0){
        hr--;
        min=59;
        input.value= n(hr) + ":" + n(min) + ":" + n(sec);
        sec=59;
    }
    else if(sec==0 && min == 0 && hr==0){
        input.value= "00:00:00";
        begin.innerHTML="Start";
        reset.disabled=false;
        begin.disabled=true;
        clearInterval(flag);
    }
}

function Resetbtn(){
    input.value= "00:02:00";
    reset.disabled=true;
    begin.disabled=false;
    progressbarinner.remove();
    progressbar.className='';
    check=0;
}

function n(n){
    return n > 9 ? "" + n: "0" + n;
}

function createProgressbar(callback) {
  progressbar.className = 'progressbar';
  progressbarinner = document.createElement('div');
  progressbarinner.className = 'inner';

  if (typeof(callback) === 'function') {
    progressbarinner.addEventListener('animationend', callback);
  }

  progressbar.appendChild(progressbarinner);

  progressbarinner.style.animationPlayState = 'running';
}
