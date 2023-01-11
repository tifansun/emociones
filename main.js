emocion1 = ""
emocion2 = ""
camara = document.getElementById("camara");
Webcam.set({
  width: 350,
  height: 300,
  image_format: 'png',
  png_quality: 90
});

Webcam.attach("#camara");
function tomarFoto() {
  Webcam.snap(function (data_uri){
    document.getElementById("resultado").innerHTML = "<img src='" + data_uri +"' id='foto'>";
  })
}

function hablar(mensaje){
  var leer = window.speechSynthesis;
  var lectura = new SpeechSynthesisUtterance(mensaje);
  lectura.lang = "es-MX";
  leer.speak(lectura);
}

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/SXbAakvwg/model.json', modeloListo);

function modeloListo() {
  console.log("¡Modelo Listo!");
}

function analizarFoto(){
  imagen = document.getElementById("foto");
  classifier.classify(imagen, resultadoObtenido);
}

function resultadoObtenido(error, resultado){
  if(!error){
    emocion1 = resultado[0].label;
    emocion2 = resultado[1].label;
    document.getElementById("emocion1").innerHTML = emocion1;
    document.getElementById("emocion2").innerHTML = emocion2;
    hablar("la primera predicción es que te sientes " + emocion1 + " y la segunda predicción es que te sientes " + emocion2);
    if(emocion1 == "feliz"){
      document.getElementById("emoji1").innerHTML = "😀";
    }else if (emocion1 == "triste"){
      document.getElementById("emoji1").innerHTML = "😥";
    }else if (emocion1 == "enojado"){
      document.getElementById("emoji1").innerHTML = "😡";
    }

    if(emocion2 == "feliz"){
      document.getElementById("emoji2").innerHTML = "😀";
    }else if (emocion2 == "triste"){
      document.getElementById("emoji2").innerHTML = "😥";
    }else if (emocion2 == "enojado"){
      document.getElementById("emoji2").innerHTML = "😡";
    }
  }
}