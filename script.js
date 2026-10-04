var score=0;
var high_score=0;
let life=5;

const garea= document.querySelector(".gamearea");
const bask= document.querySelector(".basket");
const flo= document.querySelector(".flower");
function moveB(clientX)
{
    const area=garea.getBoundingClientRect();
    const halfWid=bask.offsetWidth/2;
    const pos=Math.max(halfWid,Math.min(x, garea.clientWidth-halfWid));
    bask.computedStyleMap.left=pos+"px";
}
garea.addEventListener("pointermove",function(event)
{
    moveB(event.clientX);
})
if(cght)
{
    score++;
}
else if(misd){
    life--;
    if(life==0)
    {
        console.log("game over!");
        high_score=Math.max(high_score,score);
    }
}