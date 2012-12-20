var wordsNum,
    level,
    count=0,
    return_array = [],
    music_error,
    player,
    sound_play,
    sound_back,
    sound_next,
    sound_winner,
     start,
    end,
     h,
    q,
    allWords,
    clouds=[];

var changeScent = new Array();
    changeScent.reset = function(){
    $("#holder").css("right",-1500);
    $("#main .btn_back").show();
    $("#words").show().find("li a").html("").attr("class","");
    $("#levels_board").show();
    $("#levels").hide();
};
    changeScent.set = function(){
    $("#levels").show();
    $("#main .btn_back").hide();
    $("#levels_board").hide();
    $("#words").hide().find("li a").html("").attr("class","");
    $("#holder").stop(true,true).css("right",-1500);
};
    changeScent.checkAnswerReset = function(){
        $('#holder').find("li").droppable("enable")
                    .removeClass("filled")
                    .find("a").html("");
    };


function insertWords(wordsArray){
    $.each(wordsArray,function(i,value){
        $("#words ul li a").eq(i).append(value.toString())
            .attr("class","")
            .attr("class",value);
    })
}

function getRandomWords(words, num) {
    //reset
    return_array=[];

    var temp_array = new Array();
    for (var index in words) {
    temp_array.push(words[index]);
    }
    for (var i = 0; i<num; i++) {
            if (temp_array.length>0) {
                var arrIndex = Math.floor(Math.random()*temp_array.length);
                return_array[i] = temp_array[arrIndex];
                temp_array.splice(arrIndex, 1);
    } else {
                break;
    }
    }
    var firstLetters=[];
    for(var jj=0;jj<return_array.length;jj++){
        firstLetters.push(return_array[jj].substr(0,1).toLowerCase());

    }
    var defferentWords = _.uniq(firstLetters).length==num?1:0;
    if(!defferentWords){
       getRandomWords(words,num);
    }else{}

    }


function dropText(dragger,dropper) {
  var text = dragger.text();
        dragger.html("").attr("style","");
        dropper.find("a").append(text);
        dropper.droppable( "disable" ).addClass("filled");
    if($("#holder li.filled").length==wordsNum){
        checkAnswer();
    }else{}
}

function textBackHome(dragger,dropper){
    var text = dragger.text();
    var wordP = $("."+text).offset();
    var X = (dragger.offset().left+dragger.width()/2) - (wordP.left+100);
    var Y = dragger.offset().top - wordP.top;
    var thisLeft = dragger.css("left");
    var thisTop = dragger.css("top");
    thisLeft = parseInt(thisLeft);
    thisTop = parseInt(thisTop);

    dragger.animate({
        left:thisLeft-X,
        top:thisTop-Y
    },500,function(){
        $("#words li a").each(function(i){
            if($(this).attr("class") == text){
                $(this).append(text);

            }
        });

            dragger.html("")
            .parent("li")
            .droppable("enable")
            .removeClass("filled");
    });



}

function checkAnswer(){
    var words = [];

    $("#holder li a").each(function(i){
        if($(".sort-"+(i+1)+" a").html() !=""){
            words.push($(".sort-"+(i+1)+" a").html().toLowerCase());
        }else{}
    });

    //clone words
    var beforeWords = words.concat();

    // answer right
    if(beforeWords.toString() == words.sort().toString()){


        $('#holder').animate({opacity: 1},1000).animate({
          right: 1024
        }, 1500, function() {
                            $(this).css({
                                "right":-1500
                            });

            changeScent.checkAnswerReset();

                            $("#words").hide()
                            .find("a").html("");
                      //finished!
                    if(level==8&&count==2){
                        $("#explain").show().find(".window").hide().end().find(".finished").show();
                        sound_winner.play();
                     }else{
                            $("#train").attr("src","images/train_"+wordsNum+".png");

                            if(count==2){
                                count=0;
                                gameBegin(level);
                                sound_winner.play();
                            }else{
                                count++;
                                gameBegin(level-1);
                            }
                    }
                        });
    }else{                  //answer wrong
        insertWords(return_array);
        music_error.play();   //播放
        changeScent.checkAnswerReset();
    }
}

function gameBegin(i){
    //reset
    changeScent.reset();
    changeScent.checkAnswerReset();

    switch (i){
        case 0:
            start=0;   end=h; wordsNum=3;level = i+1;

            if(count == 0){
            $("#explain").show().find(".window").hide().end().find(".level_"+(i+1)).show();
            }else{
                showGame();
            }
            break;
        case 1:
            start=h;   end=q; wordsNum=3;level = i+1;
            showGame();
            break;
        case 2:
            start=q;   end=undefined;  wordsNum=3;level = i+1;
            showGame();
            break;
        case 3:
            start=0;   end=undefined; wordsNum=i+1;level = i+1;
            if(count == 0){
            $("#explain").show().find(".window").hide().end().find(".level_"+(i+1)).show();
            }else{
                showGame();
            }
            break;
        case 6:
            start=0;   end=undefined; wordsNum=i+1;level = i+1;
            if(count == 0){
            $("#explain").show().find(".window").hide().end().find(".level_"+(i+1)).show();
            }else{
                showGame();
            }
            break;
        default:
            start=0;   end=undefined; wordsNum=i+1;   level = i+1;
            showGame();

            break;
    }
}

  function showGame(){
   getRandomWords(allWords.slice(start,end),wordsNum);
   insertWords(return_array);               // words
 $("#train").attr("src","images/train_"+wordsNum+".png");
 $('#holder').animate({
   right: 12
 }, 2000, function() {
 });

   $("#levels_board").show()
       .find("b").html(level);
   $('#holder li').droppable("destroy");

   var $boxes = $('#holder li:lt('+wordsNum+')');
   $boxes.droppable({
     activeClass: 'highlight',
     hoverClass: 'highlight-accept',
     accept: "#words li a" ,
     drop: function(event, ui) {
       dropText($(ui.draggable),$(this));
     },
     over: function(event, ui) {
     //alert("out")
     },
     out:function(event, ui) {
         //  alert("out")
           }
   }).addTouch();
}

function goTop(){
    $("#credits .main dl").animate(
        {"top":-900},
        20000,"linear",function(){
            $(this).css({"top":"400px"});
            setTimeout(goTop,100)
        }
    )
}

function cloudMove(){
    $.each(clouds,function(i){
        this.animate({
                   left:1024
                },13000,'linear',function(){
                                            $(this).css({
                                                    "left":-300
                                                });
            setTimeout(cloudMove,0)
                                        })
    });
}





$(function(){


    /* btn_back */
        $("#main .btn_back").click(function(){
            changeScent.set();
            sound_back.play();

        });

    //sound
        player = document.getElementById('player');
        music_error = document.getElementById('error');
        sound_play = document.getElementById('sound_play');
        sound_back = document.getElementById('sound_back');
        sound_next = document.getElementById('sound_next');
        sound_winner = document.getElementById('sound_winner');

            player.volume=.5;              //ini vol
        music_error.volume=.5;              //ini vol

    //prevent a tag
    $('a[href="#"]').click(function(e){
        e.preventDefault();
    });

    //sort allwords
         allWords = CONST.words;
    var firstCapital=[];
    var newword=[];
    $.each(allWords,function(i){
        newword.push(this.toLowerCase());
            if((this.slice(0,1).charCodeAt(0)>=65)&&(this.slice(0,1).charCodeAt(0)<=90)){
                firstCapital.push(this)
            }
    });
    newword = newword.sort();

    $.each(newword,function(i){
        $.each(firstCapital,function(k){
    if(this.toLowerCase() == newword[i] ){
        newword[i] = firstCapital[k];
    }
        });
    });
        allWords = newword;

    //get points
    for(var i=0;i<allWords.length;i++){
        if(allWords[i].substr(0,1).toLowerCase() > "h"){
            h=i;
            break;
        }else{}
    }
    for(var j=h;j<allWords.length;j++){
        if(allWords[j].substr(0,1).toLowerCase() > "q"){
            q=j;
            break;
        }else{}
    }

/* ini */
    $("#holder").css({
        "right":-1500
    });

    $('#go').bind("click",function() {
      $(this).hide();
        $("#levels").show();
    }).hide();
    $("#levels").show();


//choose level
    $('#levels a').each(function(i){
        $(this).bind("click",function() {
            count = 0;
            gameBegin(i);
        });
        $(this).mousedown(function(){
            $(this).css({
                "background-image":"url('images/boton-nivel-pressed.png')"
            })
        });
        $(this).mouseout(function(){
            $(this).css({
                "background-image":"url('images/boton-nivel.png')"
            })
        });
    });



/* drag&drop */
    $('#words li a').draggable({
      revert: true,
      handle: "li"
    }).addTouch();

    $('#mask').droppable({
      drop: function(event, ui) {
        textBackHome($(ui.draggable),$(this));
      },
      over: function(event, ui) {
      //alert("out")
      },
      out:function(event, ui) {
          //  alert("out")
            }
    });

    $('#holder li a').draggable({
        revert: true,
        zIndex: 2700,
        start: function(event, ui) {
        $("#mask").show()
        .css({"z-index":2});
            word = $(this).text();
         //$(this).parent("li").css({"z-index":2});
        },
        stop: function(event, ui) {
                $("#mask").hide()
                .css({"z-index":-1});
                }

    }).addTouch();

    /* slider */
    $( "#slider_music" ).slider({
        step: 10,
        value: 50,
       slide: function(event, ui) {
           player.volume=ui.value/100;
       }
    }).addTouch();
    $( "#slider_error" ).slider({
        step: 10,
        value: 50,
       slide: function(event, ui) {
           music_error.volume=ui.value/100;
           sound_play.volume=ui.value/100;
           sound_back.volume=ui.value/100;
           sound_next.volume=ui.value/100;
           sound_winner.volume=ui.value/100;
       }
    }).addTouch();

    $("#config").click(function(){
        $("#main,#credits").hide();
        $("#music").show();
    });
    $(".btn_back").click(function(){
        $("#music").hide();
        $("#main").show();
    });

//credits
    $(".credits_btn").click(function(){
        $("#credits").show();
        $("#main,#music").hide();
        $("#credits .main dl").stop(true,true);
        goTop();
    });
    $("#credits .btn_back").click(function(){
       $("#credits").hide();
       $("#main").show();
    });


  //explain
    $(".level_1 .btn_next,.level_4 .btn_next,.level_7 .btn_next").click(function(){
        $("#explain").hide();
        $("#main").show();
        showGame();
        sound_next.play();
    });
    $(".finished .btn_next").click(function(){
        $("#explain").hide();
        changeScent.set();
    });

    //insert text
    $("#explain .level_1 .dialog p").html(CONST.level1Hint);
    $("#explain .level_4 .dialog p").html(CONST.level4Hint);
    $("#explain .level_7 .dialog p").html(CONST.level7Hint);
    $("#explain .finished .dialog p").html(CONST.successText);

    $.each(CONST.language,function(selector,text){
        $("."+selector).text(text);
    });

    //clouds
$("#clouds img").each(function(i){
    $("#clouds .cat_"+(i+1)).animate({opacity: 1},(3*i)*1000,function(){
         clouds.push($(this));
        cloudMove();
    })
});
//mountain

        $("#scene .mountains").animate({
            top:277
        },1000).fadeIn(10);

        $("#scene .logo").animate({
                top:38
            },1000).fadeIn();

        $("#scene .ground").animate({
            top:68
        },1000,"easeOutBounce");

        $(".play").animate({
                top:768
            },2000).animate({
            top:292
        },1000,"easeOutBounce").click(function(){
                      $(".trainman,.logo,.ground").fadeOut();
                      $(this).fadeOut();
                $("#game").fadeIn();
                    }).mousedown(function(){
                                    $(this).css("background-image","url(images/play-pressed.png)")
                                }).mouseleave(function(){
                                                $(this).css("background-image","url(images/play.png)")
                                            }).click(function(){
                sound_play.play();
            });

        $("#scene .trainman").animate({
            right:0
        },3000).fadeIn(1000);




});