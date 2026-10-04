var score=0;
var high_score=0;
let life=5;

const garea= document.querySelector(".gamearea");
const bask= document.querySelector(".basket");
const flo= document.querySelector(".flower");
function moveB(clientX)
{
    const area=garea.getBoundingClientRect();
    const x=clientX-area.left-garea.clientLeft;
    const halfWid=bask.offsetWidth/2;
    const pos=Math.max(halfWid,Math.min(x, garea.clientWidth-halfWid));
    bask.style.left=pos+"px";
}
garea.addEventListener("pointermove",function(event)
{
    moveB(event.clientX);
})
document.addEventListener("keydown",function(event)
{
    if(event.key!="ArrowLeft"&&event.key!="ArrowRight")
    {
        return;
    }
    event.preventDefault();
    const area=garea.getBoundingClientRect();
    const bask_area=bask.getBoundingClientRect();
    const center= bask_area.left+bask_area.width/2;
    const step= (event.key=="ArrowLeft")? -20:20;
    moveB(center+step);
})

//Flower
let floY=0;
let prevTm=null;
const fallspd=150;

function resetflo()
{
    const halfWid=flo.offsetWidth/2;
    const floX=halfWid+Math.random()*(garea.clientWidth-flo.offsetWidth);
    floY=flo.offsetHeight;
    flo.style.left=floX+"px";
    flo.style.top=floY+"px";
}
function CCcatch()
{
    const floBx=  flo.getBoundingClientRect();
    const baskBx= bask.getBoundingClientRect();
    const flocent= floBx.left+floBx.width/2;
    const baskOp =baskBx.top+baskBx.height*0.55;
    const inBask= flocent>=baskBx.left && flocent<=baskBx.right;
    const atOp= floBx.bottom>= baskOp && floBx.top<=baskOp;
    if(inBask&& atOp)
    {
        score++; resetflo();
    }
    else if(floY>garea.clientHeight)
    {
        life--;
        resetflo();
    }
    document.querySelector("#score-val").textContent=score;
    document.querySelector("#live-remain").textContent="🌸".repeat(life);
}
function fallflo(time)
{
    if(prevTm==null){prevTm=time;}
    const sec=Math.min((time-prevTm)/1000,0.05);
    prevTm=time;
    floY+=fallspd*sec;
    flo.style.top=floY+"px";
    CCcatch();
    if(life==0)
    {
        high_score=Math.max(score,high_score);
        document.querySelector("#high-score-val").textContent=high_score;
        console.log("Game Over!");
        return;
    }
    requestAnimationFrame(fallflo);
}
resetflo();
requestAnimationFrame(fallflo);
