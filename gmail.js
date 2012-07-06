(function() {
	var qry = document.location.search;
	if(qry.indexOf('source=mailto') == -1 ||
		qry.indexOf('@followupthen.com') == -1) {
		return;
	}
	setTimeout(function lookForSendButton() {
		var btn = document.getElementById(':pj');
		if(btn == undefined || btn == null) {
			return;
		}
		btn.click();
	}, 1500);
})();
