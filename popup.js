(function() {
	var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun',
		'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

	// Error handling
	var error = document.getElementById('errorarea');
	var showError = function(msg) {
		error.innerText = msg;
		setTimeout(function() {
			error.innerText = '';
		}, 4000);
	}
	// Select lists
	var getSelectedValue = function(elem) {
		return elem.options[elem.selectedIndex].value;
	}
	var generateOptions = function(elem, from, to, mapping) {
		for(var i = from; i <= to; i++) {
			if(mapping == null || mapping == undefined) {
				elem.options[i] = new Option(''+i, i);
			} else {
				elem.options[i] = new Option(mapping[i], mapping[i]);
			}
		}
	}
	var day = document.getElementById('day');
	generateOptions(day, 1, 31);
	var month = document.getElementById('month');
	generateOptions(month, 0, 11, months);
	var hour = document.getElementById('hour');
	generateOptions(hour, 0, 23);
	var minute = document.getElementById('minute');
	generateOptions(minute, 0, 59);

	// Presets
	var presets = {
		'+5 min': function() {
			var now = new Date(Date.now()+5*60*1000);
			return [now.getDate(), now.getMonth(), now.getHours(), now.getMinutes()];
		}
	}
	var presetarea = document.getElementById('presetarea');
	var setSelections = function(arr) {
		day.selectedIndex = arr[0];
		month.selectedIndex = arr[1];
		hour.selectedIndex = arr[2];
		minute.selectedIndex = arr[3];
	}
	for(preset in presets) {
		var button = document.createElement('button');
		button.textContent = preset;
		presetarea.appendChild(button);
		button.addEventListener('click', function() {
			setSelections(presets[preset]());
		});
	}

	// Send button
	var send = document.getElementById('send');
	send.addEventListener('click', function() {
		chrome.tabs.query({
			"active": true,
			"currentWindow": true
		}, function(tab) {
			if(tab == undefined || tab == null || tab.length == 0) {
				showError('Could not get active tab');
				return;
			}
			tab = tab[0];
			var timestamp = getSelectedValue(hour)+getSelectedValue(minute)+
				getSelectedValue(month)+getSelectedValue(day);
			var subject = tab.title+' ('+tab.url+')';
			chrome.tabs.create({
				'url': 'mailto:'+timestamp+'@followupthen.com?subject='+subject;
				'active': true
			});
		});
	});
})()
