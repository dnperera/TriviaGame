
//Following block of code stats after page load is complete
$(document).ready(function() {

	var noOfCorrect =0;
	var noOfWrong = 0;
	var unAnswered =0;
	var noOfQuestions = 8; 
	var allocateTime = 60;
	var intervalId;

	//Create an answer object
	var answerObj ={
		q1:"Greenland",
		q2:"Columbia River",
		q3:"Netherlands",
		q4:"Oahu",
		q5:"Honshu",
		q6:"Alaska",
		q7:"Croatia",
		q8:"Pretoria"

	};

	//Create an Object for Selected Answers
	var userSelected ={
		q1:"",
		q2:"",
		q3:"",
		q4:"",
		q5:"",
		q6:"",
		q7:"",
		q8:""
	};


	//Timer 
	function decrement() {

	  allocateTime--;
	  if(allocateTime >=0){

		  $("#timeRemain").text(allocateTime);

			  if (allocateTime === 0) {

			    processResults();

			    //alert("Time Up!");
			  }
	  }
	}

    function run() {
      intervalId = setInterval(decrement, 1000);
    }
    //End timer

	$("#questions").fadeOut("fast");
	$("#displayScore").css('display','none');

	//when Start button click
	$("button").on("click",function(){
		
			$(".startMessage").fadeOut("fast");
			$("#displayScore").css('display','none');
			
			$("#questions").show();

			run();
	});



	//user answer click event 
	$("input:radio").click(function(){

		
			var quizNo = $(this).attr("name").toString();
			var userSelection = $("input[name="+$(this).attr("name")+"]:checked").val();

			//console.log("Quiz No ==> "+typeof(quizNo));
		
			//get correct answer
			// var correctAnsw = answerObj[quizNo];
			// console.log("Correct Answer  ==> "+correctAnsw);
			
			//Update userSelected object with seleted answer
			userSelected[quizNo]= userSelection;

			console.log("User selections ==> "+userSelected[quizNo]);
		
	}); //End -- //user click event 


	//When Done Button Click
	$(".btn-done").click(function(){
		
		processResults();
	});

	//Process user results
	function processResults(){
		
		for(var i=1;noOfQuestions >=i; i++){
				var quesNo ="q"+i;
				//if the answer correct
				if(answerObj[quesNo] === userSelected[quesNo]){
					noOfCorrect++;
					console.log("Correct Answers -->"+answerObj[quesNo]);
					console.log("User Answers -->"+userSelected[quesNo]);
				}
				else if( userSelected[quesNo] === ""){
					unAnswered++;
				}
				else{
					noOfWrong++;
				}
		} // End for

		console.log("No Correct Answers-->"+noOfCorrect);
		console.log("No Wrong Answers-->"+noOfWrong);
		console.log("No Answers-->"+unAnswered);

		$("#questions").fadeOut("fast");
		$("#displayScore").css('display','block');
		$("#correctanswers").text(noOfCorrect);
		$("#incorrectanswers").text(noOfWrong);
		$("#unanswered").text(unAnswered);

		reset();
		
	} // End of //Process user results

	//Reset Function 

	function reset(){

		//clearInterval(intervalId); 

		noOfCorrect =0;
		noOfWrong = 0;
		unAnswered =0;
		allocateTime = 60;

		//Reset User answer array
		userSelected ={
				q1:"",
				q2:"",
				q3:"",
				q4:"",
				q5:"",
				q6:"",
				q7:"",
				q8:""
			};

	}//-- End Reset


	//when Start button click
	$("#reload").on("click",function(){
		
		location.reload();

	});

	/* Sticky header
	$(window).scroll(function(){
	  var sticky = $('.header'),
	      scroll = $(window).scrollTop();

	  if (scroll >= 100) sticky.addClass('fixed');
	  else sticky.removeClass('fixed');
	});
	// sticky header end*/

}); // end $(document).ready(function()