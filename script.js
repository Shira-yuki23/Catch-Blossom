var score=0;
var high_score=0;
let life=5;
if(caught)
{
    score++;
}
else if(missed){
    life--;
    if(life==0)
    {
        console.log("game over!");
        high_score=Math.max(high_score,score);
    }
}