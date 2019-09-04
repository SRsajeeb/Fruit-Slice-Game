let playing = false;
let score;
let trialsLeft;
let action;
let step;
let fruits = ['apple','orange','peach','banana','grapes','cherries','pear','pineapple','watermelon'];

$(function(){
    $("#startreset").click(function(){
            if(playing==true){
                //if we are playing then this method relodes the page
                location.reload();
            }else{
                playing = true;
                //when we start playing it sets the score to 0
                score = 0;
                $("#scorevalue").html(score);
                //shows how many trials Left
                $("#trialsLeft").show();
                trialsLeft = 3;
                addHearts();
                //hide the gameOver box after a game
                $("#gameOver").hide();
                //changes the start button text to Reset Game
                $("#startreset").html("Reset Game");
                //starts sending fruits
                startAction();

                
            }
    });


$("#fruit1").mouseover(function(){
    score+=10;
    //Updating the score by 10....
    $("#scorevalue").html(score);

    //document.getElementById("slicesound").play();
    $("#slicesound")[0].play();

    //stop the fruit after slice 
    clearInterval(action);
    //shows slice animation
    $("#fruit1").hide("explode", 3);
    //send new fruit
    setTimeout(startAction, 3);
    //startAction();

});


//functions

function addHearts(){
    $("#trialsLeft").empty();
    for(i = 0; i< trialsLeft; i++){
        $("#trialsLeft").append('<img src="img/heart.png" class="life">');
    }
}
//start sending fruits
function startAction(){
        $("#fruit1").show();
        chooseFruit();
        $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50});//generate random position for fruits
        //generate random step
        step = 1 + Math.round(5*Math.random());
        //moving fruits down in steps every 10ms
        action = setInterval(function(){
            $("#fruit1").css('top', $("#fruit1").position().top + step);

            //checking if the fruit position is too low
            if( $("#fruit1").position().top > $("#fruitsContainer").height()){
                //check if we have any life left
                if(trialsLeft > 1){

                    $("#fruit1").show();
                    chooseFruit();
                    $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50});//generate random position for fruits
                    //generate random step
                    step = 1 + Math.round(5*Math.random());
                    //reduce trial by one
                    trialsLeft --;
                    //add heart
                    addHearts();

                }else{
                    //game Over
                    playing = false;
                    $("#startreset").html("Start Game");//changing button to start game
                    $("#gameOver").show();
                    $("#gameOver").html('<p>Game Over!</p><p>Your Score is '+score+'</p>');
                    $("#trialsLeft").hide();
                    stopAction();
                }
            }

        },10);
}


//generate a random fruit
function chooseFruit()
{
       $("#fruit1").attr('src','img/' + fruits[Math.round(8*Math.random())] + '.png');
}

//stops the action or we can say dropping fruits...
function stopAction(){
    clearInterval(action);
    $("fruit1").hide();
}



});