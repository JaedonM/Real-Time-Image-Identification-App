function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet', modelLoaded)
}

function draw(){
image(video, 0,0,300, 300 )
classifier.classify(video, gotResult)
}

var previous_result = ''

function preload(){
  
}

function modelLoaded(){
  console.log("modelLoaded")
}

function gotResult(error, result){
  if (error) {
    console.error(error)
  } else {
    console.log(result)

    if (result[0].confidence>0.3 && previous_result != result[0].label) {

   previous_result = result[0].label

      var synth = window.speechSynthesis
      speech = "Object Dectected is "+result[0].label
      utterThis = new SpeechSynthesisUtterance(speech)
      synth.speak(utterThis)


      document.getElementById("result_object_name").innerHTML = result[0].label
      document.getElementById("result_object_accuracy").innerHTML = result[0].confidence.toFixed(2)
    }

    
  }

}



