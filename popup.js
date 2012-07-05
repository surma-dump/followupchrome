(function() {
	// Error handling
	var error = document.getElementById('errorarea');
	var showError = function(msg) {
		error.innerText = msg;
		setTimeout(function() {
			error.innerText = '';
		}, 4000);
	}

	// Presets
	var addy = document.getElementById('addy');
	var presets = {
		'near': {
			'Now': '1minute',
			'1 Hour': '1hour',
			'Tomorrow': 'tomorrow'
		},
		'week1': {
			'Monday': 'monday',
			'Tuesday': 'tuesday',
			'Wednesday': 'wednesday',
		},
		'week2': {
			'Thursday': 'thursday',
			'Friday': 'friday',
			'Saturday': 'saturday',
			'Sunday': 'sunday'
		}
	}
	var presetarea = document.getElementById('presetarea');
	var generatePresetButton = function(name, action) {
		if(typeof(action) == "string") {
			action = function() {
				return this;
			}.bind(action);
		}
		var button = document.createElement('button');
		button.textContent = name;
		button.addEventListener('click', function() {
			addy.value = action();
		});
		return button;
	}
	for(var preset in presets) {
		var table = document.createElement('table');
		var tr = document.createElement('tr');
		table.appendChild(tr);
		var td = document.createElement('td');
		var subpresets = presets[preset];
		if (typeof(presets[preset]) == "string") {
			container = presetarea
			subpresets = {};
			subpresets[preset] = presets[preset];
		}
		for(var subpreset in subpresets) {
			td.appendChild(generatePresetButton(subpreset, subpresets[subpreset]));
			tr.appendChild(td);
			td = document.createElement('td');
		}
		presetarea.appendChild(table);
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
			var subject = tab.title+' ('+tab.url+')';
			chrome.tabs.create({
				'url': 'mailto:'+addy.value+'@followupthen.com?subject='+subject,
				'active': true
			});
		});
	});
})()
