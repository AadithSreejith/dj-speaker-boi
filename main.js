song="";
leftWristX=0;
rightWristX=0;
leftWristY=0;
rightWristY=0;
scoreLeftWrist=0;

function preload(){
    song = loadSound("music.mp3");
}


function setup(){
canvas = createCanvas(600, 500);
canvas.center();

video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}


function gotPoses(results){
if(results.length >0){
    console.log(results);
    scoreLeftWrist=results[0].pose.keypoints[9].score;
    leftWristX=results[0].pose.leftWrist.x;
    rightWristX=results[0].pose.rightWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("leftWristX ="+ leftWristX);
    console.log("leftWristY ="+ leftWristY);
    console.log("rightWristX ="+ rightWristX);
    console.log("rightWrist Y="+ rightWristY);
}
}

function modelLoaded(){
console.log("PoseNet Is Intialized");

}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.001)
    {
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume ="+ volume;
        song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.setVolume(1);
song.rate(1);
}