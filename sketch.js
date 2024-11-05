let font;  //載入字型文字
let points = [];  //轉成點狀文字
let angle = 0
let r = 10  //搖晃倍率
function preload(){ //在執行setup()前，必須先做此函數執行，主要先載入字型
  //為載入在fonts資料夾內的Zeyada-Regular.ttf字型
  font = loadFont("font/PlaywriteGBS-Italic-VariableFont_wght.ttf")
}
function setup() {
  createCanvas(windowWidth,windowHeight,WEBGL);
  // WEBGL將畫面改成3D
  angleMode(DEGREES)//設定三角函數用角度0~360
  background("#fefae0")
  // ===================================================
  points = font.textToPoints("VIOLA",-350,80,200, {
    // TKUET
    sampleFactor:0.1
  });//轉成文字圖檔，放在(0, 200)位置，圖形大小為200，sampleFactor為點數距離大小
  // ===================================================

}

function draw() {
  background("#fefae0");
  push();  // 保存當前的變換狀態

// 增加滑鼠互動，滑鼠按下改變旋轉方向
  if (mouseIsPressed){
    rotateY((frameCount*20)) //滑鼠按下y旋轉
  }else{
    rotateX((frameCount*20)) //否則x旋轉
  }
    
  for(let i = 0;i<points.length-1; i++) {
    // i+1為了維持在200內，故需length-1
    // 在sin內+i值可導致搖晃方向不同
    stroke("#ccd5ae")
    strokeWeight(5)
    line(points[i].x+r*sin(angle+i*0.5),points[i].y,points[i+1].x+r*sin(angle+i*0.5),points[i+1].y)
  }

  angle = angle+20//搖動幅度

  pop();  // 恢復之前的變換狀態，這樣後面的形狀就不會受影響

// 增加背景圖案========================================================
  noFill();
  rectMode(CENTER);//改正方形座標到中心點

  for (let k = 0; k < 40; k++) { //迴圈，繪製同一列40組形狀
    for (let l = 0; l <20; l++){//迴圈，繪製同一欄20組形狀

    let centerX = windowWidth / 2;
    let d = (mouseX - centerX)/10; // 相對於螢幕中心的滑鼠 x 座標
    //把圖案座標條回原樣
    let X = 25 +50 *k -windowWidth/2
    let Y = 25+50*l-windowHeight/2
    stroke("#d8e2dc");//大園顏色
    ellipse(X, Y, 50+d);
    rect(X, Y, 50+d);
    ellipse(X+25, Y+25, 25+d);

   }
  }
}