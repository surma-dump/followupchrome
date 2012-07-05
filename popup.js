(function() {
	var months = ["jan", "feb", "mar", "apr", "may", "jun",
		"jul", "aug", "sep", "oct", "nov", "dec"];
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
	var presetarea = document.getElementById('presets');
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
		chrome.tabs.create({
			"url": "mailto:"+getSelectedValue(month)+getSelectedValue(day)+"@followupthen.com",
			"active": true

		});
	})
})()
