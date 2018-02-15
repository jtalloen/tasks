	function makeid()
		{
			var text = "";
			var possible = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";

			for( var i=1; i < 21; i++ ){
				text += possible.charAt(Math.floor(Math.random() * possible.length));
				if(i == 5 | i == 10 | i == 15) {text += " ";} 
			}
			return text;
		}

	var text = makeid();
	Qualtrics.SurveyEngine.setEmbeddedData( 'copy', text );