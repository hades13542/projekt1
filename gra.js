/**
 * Created by Atar1x on 2015-12-23.
 */
var draw_mode = 0;
var canvas = null;
var ctx = null;
var w =0;
var h=0;
var clicked = 0;
var hitted = 0;
var spawned = 0;
var speed = 1000;
var wynik = 0;
var bonus=0;
//Klasa i tablica z Punktami.
var arrayPoint = [];
var audio_control = null;
var audio_src = null;
var nspeed = 1000;

function Point(x,y,color){
        this.x = x;
        this.y = y;
        this.color = color;

        this.getX = function () {
            return x;
        };

        this.getY = function (){
            return y;
        };

        this.getColor = function (){
            return color;
        }
    }









function onMouseOverHandle(x,y){
    if (draw_mode == 0){
        //console.log(x,y);
        //Start Button!
        if (x>w/2-150 && y>h/2-20 && x<w/2+150 && y<h/2+20){
            ctx.fillStyle = "#0000FF";
            ctx.fillRect(w/2-150,h/2-20,300,40);
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText("Graj!",w/2-20,h/2+5);
        }else{
            ctx.fillStyle = "#FF0000";
            ctx.fillRect(w/2-150,h/2-20,300,40);
            ctx.fillStyle = "#000000";
            ctx.fillText("Graj!",w/2-20,h/2+5);
        }
        //Instrukcja Button
        if (x>w/2-150 && y>h/2-20+50 && x<w/2+150 && y<h/2+20+50){
            ctx.fillStyle = "#0000FF";
            ctx.fillRect(w/2-150,h/2-20+50,300,40);
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText("Instrukcja!",w/2-40,h/2+5+50);
        }else{
            ctx.fillStyle = "#FF0000";
            ctx.fillRect(w/2-150,h/2-20+50,300,40);
            ctx.fillStyle = "#000000";
            ctx.fillText("Instrukcja!",w/2-40,h/2+5+50);
        }
    }
    if (draw_mode == 1){
        //console.log(x,y);
        if (x>w-20 && y>0 && x<w && y<20){
            ctx.fillStyle = "#FF0000";
            ctx.fillRect(w-20,0,20,20);
            ctx.fillStyle = "#000000";
            ctx.fillText("X",w-20+3,17);
        }else{
            ctx.fillStyle = "#0000FF";
            ctx.fillRect(w-20,0,20,20);
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText("X",w-20+3,17);
        }
    }
}

function onClickHandle(x,y){
    //console.log("Click")
    if (nspeed != speed) {
        console.log("zmiana speed");
        setInterval(update, nspeed);
        speed=nspeed;
    }
    if (draw_mode == 0){
            console.log(x,y);
            if (x>w/2-150 && y>h/2-20 && x<w/2+150 && y<h/2+20) {
                draw_mode = 1;
                clicked = 0;
                hitted = 0;
                spawned = 0;
                speed = 1000;
                wynik = 0;
                bonus = 0;
                arrayPoint = [];
                //console.log(audio_src.getAttribute("src"));
                //console.log("weszlo");
                audio_src.src = "./audio/gra.mp3";
                audio_control.load();
                //console.log(audio_src.getAttribute("src"));
            }

            if (x>w/2-150 && y>h/2-20+50 && x<w/2+150 && y<h/2+20+50) {
                window.open("http://www.w3schools.com");
                audio_control.pause();
            }
    }

    if (draw_mode == 1) {
        clicked++;
        draw_game();

        var count = 0;
        for (var i = 0; i < arrayPoint.length; i++) {
            if (x > arrayPoint[i].getX() - 40 && x < arrayPoint[i].getX() + 40 && y > arrayPoint[i].getY() - 40 && y < arrayPoint[i].getY() + 40) {
                arrayPoint.splice(i, 1);
                hitted++;
                count++;
                draw__all_circles();
            }
        }
        if (count > 1) {
            bonus += (1000 * count);
        }
        if (x>w-20 && y>0 && x<w && y<20){
            draw_mode = 0;
            audio_control.pause();
        }
    }
}




//Losowy Kolor
function getRandomColor() {
    var letters = '0123456789ABCDE'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//Rysowanie 1 koła
function draw_circle(x,y,color){
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x,y,40,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function draw(){
    var x = Math.floor(Math.random() * (w-40 - 40 + 1)) + 40;
    var y = Math.floor(Math.random() * (h-40 - 65 + 1)) + 65;
    var color = getRandomColor();
    var temp = new Point(x,y,color);
    arrayPoint.push(temp);
    spawned++;
    delete temp;
   /* console.log(arrayPoint.length);
    console.log(arrayPoint[arrayPoint.length-1].getX());
    console.log(arrayPoint[arrayPoint.length-1].getY());*/

}

function draw_game(){
    ctx.clearRect(0,0,w,20);
    ctx.fillStyle = "#000000";
    wynik = (hitted*(1001-speed)*1000)+bonus;
    ctx.fillText("Score: ",20,20);
    ctx.fillText(wynik.toString(),75,20);
    ctx.fillText("Trafione:",200,20);
    ctx.fillText(hitted.toString(),275,20);
    ctx.fillText("Pozostałe:",400,20);
    ctx.fillText((arrayPoint.length-1).toString(), 505, 20);
    ctx.fillStyle = "#0000FF";
    ctx.fillRect(w-20,0,20,20);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("X",w-20+3,17);
    //console.log(bonus);
    if (clicked > 20 ) {
        nspeed=999;
    }
    if (clicked > 40 ) {
        nspeed=998;
    }
    if (clicked > 60 ) {
        nspeed=997;
    }
    if (clicked > 80 ) {
        nspeed=996;
    }
    if (clicked > 100 ) {
        nspeed=995;
    }
    if (clicked > 120 ) {
        nspeed=994;
    }
    if (clicked > 150 ) {
        nspeed=993;
    }

    if (spawned-clicked>=10 || (arrayPoint.length-1)>=10){
        draw_mode = 0;
        draw_menu();
        audio_control.pause();
    }
}

function draw_menu(){
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(w/2-150,h/2-20,300,40);
    ctx.fillStyle = "#000000";
    ctx.fillText("Graj!",w/2-20,h/2+5);
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(w/2-150,h/2-20+50,300,40);
    ctx.fillStyle = "#000000";
    ctx.fillText("Instrukcja!",w/2-40,h/2+5+50);
}
//renderowanie
function draw__all_circles() {
    for(var i=0; i<arrayPoint.length;i++){
        draw_circle(arrayPoint[i].getX(),arrayPoint[i].getY(),arrayPoint[i].getColor());
    }
}

//Update jak w unity.
function update(){
   // console.log(speed,nspeed);
    if (draw_mode == 0){

    }
    if (draw_mode == 1) {
        ctx.clearRect(0, 20, w, h - 20);
        draw__all_circles();
        draw();
        draw_game();
    }
}


//Inicjalizacja canvasu!
window.onload = function(){
    canvas = document.getElementById("myCanvas");
    if (canvas == null) {
        console.log("Zjebalo sie");
    } else {
        console.log("dziala");
    }
    ctx = canvas.getContext("2d");
    ctx.font = "19px Arial";
    w=canvas.width;
    h=canvas.height;
    canvas.addEventListener('click', function(){ onClickHandle(event.pageX,event.pageY)});
    canvas.addEventListener('mousemove', function(){onMouseOverHandle(event.pageX,event.pageY)});
    draw_menu();

    audio_control = document.getElementById("audio_control");
    audio_src = document.getElementById("audio_source");
    if (audio_src != null){
        console.log("dziala audio");
    }else{
        console.log("niedziala audio");
    }

    if (audio_control != null){
        console.log("dziala ctrlaudio");
    }else{
        console.log("niedziala ctrlaudio");
    }
};

    //Ilosc FPS...
setInterval(update,speed);
