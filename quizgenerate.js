
// Quiz constructor
function quizConstructor(idquestion,question, answer,choice1,choice2,choice3,choice4, enabled, asked) {
  this.idquestion = idquestion;
  this.question = question;
  this.answer = answer;
  this.choice1 = choice1;
  this.choice2 = choice2;
  this.choice3 = choice3;
  this.choice4 = choice4;
  this.enabled = enabled;
  this.asked = asked;
}

// Create quiz array
var quiz = new Array();

// All quiz questions and answers
quiz[0] = new quizConstructor(1,"Daerah Khusus Ibukota", "Jakarta", "Medan", "Bandung", "Yogyakarta", "Jakarta", false, 0);
quiz[1] = new quizConstructor(2,"Jawa Barat", "Bandung", "Padang", "Jakarta", "Bandung", "Medan", true, 0);
quiz[2] = new quizConstructor(3,"Daerah Istimewa Yogyakarta", "Yogyakarta", "Bandung", "Padang", "Jakarta", "Jakarta", false, 0);
quiz[3] = new quizConstructor(4,"Jawa Tengah", "Semarang", "Medan", "Yogyakarta", "Bandung", "Semarang", true, 0);
quiz[4] = new quizConstructor(5,"Jawa Timur", "Surabaya", "Jakarta", "Surabaya", "Bandung", "Aceh", false, 0);
quiz[5] = new quizConstructor(6,"Daerah Khusus Aceh", "Aceh", "Aceh", "Yogyakarta", "Bandung", "Jakarta", true, 0);
quiz[6] = new quizConstructor(7,"Sumatera Utara", "Medan", "Jakarta", "Jakarta", "Bandung", "Medan", false, 0);
quiz[7] = new quizConstructor(8,"Sumatera Barat", "Padang", "Padang", "Yogyakarta", "Surabaya", "Bandung", false, 0);
quiz[8] = new quizConstructor(9,"Jambi", "Jambi", "Medan", "Makassar", "Jambi", "Bandung", true, 0);
quiz[9] = new quizConstructor(10,"Sulawesi Selatan", "Makassar", "Yogyakarta", "Bandung", "Jakarta", "Makassar", false, 0);

// Find the number of questions that the user has enabled
var numEnabled = 0, idquestions='';

for (var i = 0; i < quiz.length; i++) {
  if (quiz[i].enabled == true) {
    numEnabled++;
  }
}

function generateQuestions() {
  // Ask all enabled questions in random order
  for (var i = 0; i < numEnabled; i++) {
    // Find random question that hasn't been asked yet
    do {
      var randomNum = Math.floor(Math.random() * quiz.length);
    } while (quiz[randomNum].enabled == false || quiz[randomNum].asked == 1);

    // Ask question
    var question = quiz[randomNum].question + " Ibukota Provinsinya Adalah?";
    document.getElementById("questions").innerHTML += "<p>" + question + "<br>";
    document.getElementById("questions").innerHTML +='<input type="radio" name="choice'+
      quiz[randomNum].idquestion+'" value="'+quiz[randomNum].choice1+'">'+quiz[randomNum].choice1+'<br>';
    document.getElementById("questions").innerHTML +='<input type="radio" name="choice'+
      quiz[randomNum].idquestion+'" value="'+quiz[randomNum].choice2+'">'+quiz[randomNum].choice2+'<br>';
    document.getElementById("questions").innerHTML +='<input type="radio" name="choice'+
      quiz[randomNum].idquestion+'" value="'+quiz[randomNum].choice3+'">'+quiz[randomNum].choice3+'<br>';
    document.getElementById("questions").innerHTML +='<input type="radio" name="choice'+
      quiz[randomNum].idquestion+'" value="'+quiz[randomNum].choice4+'">'+quiz[randomNum].choice4+'<br>';

    // insert  the question to global variable
    if (idquestions===''){
        idquestions+=quiz[randomNum].idquestion;
    } else idquestions+='|'+quiz[randomNum].idquestion;

    // Mark question as asked
    quiz[randomNum].asked++;
  }
  document.getElementById("buttons").innerHTML = '<p><button onClick = "returnScore()">Check Hasil</button></p>';

}

var correctAnswer = 0, notAnswered=4, wrongAnswer=4; //answered=0;
function getCheckedValue(radioName){
  var radios = document.getElementsByName( radioName ); // Get radio group by-name
  for(var y=0; y<=radios.length-1; y++){//alert(radios.length-1);
    if(radios[y].checked){//alert('choice checked');
      //alert('checked='+radios[y].value);
      notAnswered--;
      //answered++;
      return radios[y].value; // return the checked value
    }
  }
}

function getCheckedAnswer(idquestion){
  for (var i=0; i<=quiz.length-1; i++){//alert('quiz length='+quiz.length+' '+idquestion+'='+quiz[i].idquestion);
    if (idquestion==quiz[i].idquestion){//alert('answer='+quiz[i].answer);
    return quiz[i].answer;
    }
  }
}

function getScore(){
  var temp=idquestions.split('|');//alert(temp);
  for (var i=0; i<=temp.length-1; i++){
    if(getCheckedValue("choice"+temp[i])===getCheckedAnswer(temp[i])){
      correctAnswer++; // increment only
      wrongAnswer--;
      //alert(getCheckedValue("choice"+temp[i])+'||'+getCheckedAnswer(temp[i]));
    }
  }
  return correctAnswer;
}

function returnScore(){
  //wrongAnswer=4-correctAnswer;
  //alert(wrongAnswer);
  //alert(correctAnswer);
  getScore();
  document.getElementById("result").innerHTML += '<p></p>';
  document.getElementById("result").innerHTML += 'Hasil : <br>';
  document.getElementById("result").innerHTML += 'Jawaban benar : '+ correctAnswer +'<br>';
  document.getElementById("result").innerHTML += 'Jawaban salah : '+ wrongAnswer +'<br>';
  document.getElementById("result").innerHTML += 'Tidak menjawab : '+ notAnswered +'<br>';
  document.getElementById("result").innerHTML += 'Total soal : 4 <br>';
  document.getElementById("buttons").innerHTML = '<p><button onClick = "restart()">Test Ulang</button></p>';
  }

  function restart (){
    window.location.href ="index.html";
  }
