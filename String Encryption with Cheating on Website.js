/*Place your JavaScript here to run when the page is fully displayed*/
var no = "${lm://CurrentLoopNumber}";
var q = "QR~" + no+ "_QID374";
var qv = "QR~" + no + "_QID374~VALIDATION";
var cname = "Inner BorderColor SL";
var latin = String("${e://Field/latin}");
var string = String("${e://Field/copy}");

/// hide the next button	
jQuery('#NextButton').hide();

/// create new button and inheret properties of regular button
var nextButtonHTML = '<input id="CustomNextButton" class="NextButton Button" title="→" type="button" name="NextButton" value="→" aria-label="Next">';
jQuery('#Buttons').append(nextButtonHTML);
document.getElementById('CustomNextButton').style.cssText = document.defaultView.getComputedStyle(document.getElementById("NextButton"), "").cssText;
document.getElementById("CustomNextButton").style.display = "inline-block";

/// flashing error border
document.getElementById("CustomNextButton").onmousedown = function() {mouseDown()};

function mouseDown() {
	document.getElementsByClassName(cname)[0].style.borderColor = "transparent";
}	
	

/// displaying regular error message
function error(){
  document.getElementById(qv).style.display = "block";
  document.getElementById(qv).innerHTML = "Incorrect response.  Please try again.";
  document.getElementsByClassName(cname)[0].style.borderColor = "#007ac0";
}


/// on click of our created next button, launch validation
document.getElementById('CustomNextButton').onclick = function(){

	var wrong = 0;
	var ans = document.getElementById(q).value;
	var length = ans.length;
	
	if(length == 35){
		for(var k = 0; k < 35; k++){
			if(!(ans.charCodeAt(k) == string.charCodeAt(k) ||  ans.charCodeAt(k) == latin.charCodeAt(k))){
				error();
				wrong = 1;
  				break;
			}
		}

		if(wrong == 0){
			jQuery('#NextButton').click();
			jQuery('#CustomNextButton').hide();
			Qualtrics.SurveyEngine.setEmbeddedData('complete0', no);

			var cheat = 0;
			var char =[];

			/// did they cheat?
			for(var l = 0; l < 35; l++){
				if(ans.charCodeAt(l) == string.charCodeAt(l)){
					var n = l+1;
					char.push(n);

					var cheat = 1;
				}
			}

			var length = char.length;
			
			Qualtrics.SurveyEngine.setEmbeddedData(no + '.cheat0', cheat);
			Qualtrics.SurveyEngine.setEmbeddedData(no + '.cheatN0', length);
			Qualtrics.SurveyEngine.setEmbeddedData(no + '.cheatChar0', char);
			alert("cheat: " + cheat + " length: " + length + " char: " + char);

		}
	} else{
		error();
	}		

}
