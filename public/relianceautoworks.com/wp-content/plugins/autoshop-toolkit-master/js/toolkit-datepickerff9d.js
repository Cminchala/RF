var openHours = [];
function gravityDatePickerFix() {
	if (typeof gform !== 'undefined') {
		gform.addFilter('gform_datepicker_options_pre_init', function (optionsObj, formId, fieldId) {
			if (autolab_datepicker.autolab_scheduler.enabled.includes(formId)) {  //apply only on schedule and appointment forms
				setTimeout(function () {
					jQuery('.datepicker').datepicker({}).attr('readonly', 'readonly');
				}, 500);
				var wait = autolab_datepicker.autolab_scheduler.wait_time;
				var week_start = autolab_datepicker.autolab_scheduler.week_start;
				var d = new Date(); // for now
				var day = d.getDay();
				var h = d.getHours(); // => 9
				var m = d.getMinutes(); // =>  30
				var addDay = 0;  //Add Day if after hours
				if (autolab_datepicker.autolab_scheduler.hours[day].close.split(':')[0] <= h && autolab_datepicker.autolab_scheduler.midnight_reset !== 'Yes') {
					addDay = 1;
				}
				if (wait <= 0) {
					wait = 1 + addDay;
				} else {
					wait = Math.ceil(wait / 24) + addDay;
				}
				if (!week_start) {
					week_start = 0;
				}
				if (autolab_datepicker.autolab_scheduler.same_day === 'Yes' && !autolab_datepicker.autolab_scheduler.closed_days.includes(day)) {
					wait = 0;
				}

				cdaycount = 0;
				while (autolab_datepicker.autolab_scheduler.closed_days.includes(day + cdaycount)) {
					wait++;
					cdaycount++;
				}

				optionsObj.firstDay = week_start;  //set first day to Sunday
				optionsObj.minDate = +wait;
				optionsObj.maxDate = "+3M +10D";
				optionsObj.showOn = "both";
				optionsObj.dateFormat = "mm/dd/yy";
				optionsObj.buttonImage = 'https://hub.autoshopdashboard.com/autoshopplugins/theme_assets/common/calendar-img.png';  //pull calendar image from CDN
				optionsObj.beforeShowDay = function (date) {
					var disabledDays = autolab_datepicker.autolab_scheduler.blackout,
						currentDate = jQuery.datepicker.formatDate('mm/dd/yy', date),
						day = date.getDay();

					return [!(disabledDays.indexOf(currentDate) != -1 || autolab_datepicker.autolab_scheduler.closed_days.includes(day))];  //Disable blackout days and selected days of the week
				};
				optionsObj.onClose = function () {
					autolab_schedule_times('#input_' + formId + '_' + fieldId);  //Fire time options function on close
				};
			} //add else init datepicker

			return optionsObj;
		});
	}
}

function isToday(someDate) {
	var today = new Date()
	return someDate.getDate() == today.getDate() &&
		someDate.getMonth() == today.getMonth() &&
		someDate.getFullYear() == today.getFullYear()
}

function markupCheck(fieldId){
	var timeSelect = jQuery(fieldId.replace('input', 'field')).next('li').attr('id');
	if(!timeSelect){
		timeSelect = jQuery(fieldId.replace('input', 'field')).next('div').attr('id');
	}
	timeSelect = jQuery('#' + timeSelect.replace('field', 'input'));
	var selected = new Date(jQuery(fieldId).val());
	if (selected instanceof Date) {
		var today = new Date();
		var day = selected.getDay();
		if (day !== undefined) {
			openHours = as_get_hours(day, selected);
			//clear options
			jQuery(timeSelect).empty();

			//set blank option
			var option = jQuery("<option></option>")
				.attr("value", '')
				.text('Choose a Time');
			jQuery(timeSelect).append(option);
			let $morning = true;
			//add options to select
			openHours.forEach(function (e) {
				let t = e.split(':');
				if(!$morning && t[0] < 12) {
					t[0] = parseInt(t[0]) + 12;
				}
				if (t[0] > 12) {
					t[0] = t[0] - 12;
					e = t[0] + ':' + t[1] + ' PM';
				} else if (t[0] == 12) {
					e = t[0] + ':' + t[1] + ' PM';
					if($morning) {
						$morning = false;
					}
				} else if (t[0] == 0) {
					e = '12:' + t[1] + ' AM';
				} else {
					e = t[0] + ':' + t[1] + ' AM';
				}
				option = jQuery("<option></option>")
					.attr("value", e)
					.text(e);
				jQuery(timeSelect).append(option);
			});
		}
	}
}

function as_get_hours(day, selected) {
    if(false) { //check for integration will go here

    } else if(isNaN(day) === false) {
        var open = autolab_datepicker.autolab_scheduler.hours[day].open.split(':');  //get open hours for the selected day
        var close = autolab_datepicker.autolab_scheduler.hours[day].close.split(':');  //get close hours for the selected day
        if (autolab_datepicker.autolab_scheduler.hours[day].advanced) {
            var advanced = autolab_datepicker.autolab_scheduler.hours[day].advanced;
            if (advanced[advanced.length - 1] === ',') {
                advanced = advanced.substring(0, advanced.length - 1);
            }
            openHours = advanced.split(',');//remove hours that have already passed today is selected
            if (isToday(selected) && autolab_datepicker.autolab_scheduler.same_day === 'Yes') {
                var h = today.getHours() + autolab_datepicker.autolab_scheduler.same_day_buffer;
                var oH = open[0];
                var oM = open[1];
                var cH = close[0];
                var cM = close[1];
                var ccount = oH;
                while (ccount <= cH) {
                    if (openHours.includes(ccount + ':00')) {
                        //TDL
                    }
                    ccount++;
                }
            }
        } else {
            openHours = autolab_default_hours(open, close, day, selected);
        }
    }
    return openHours;
}

function autolab_schedule_times(fieldId) {
	markupCheck(fieldId);
}

function autolab_default_hours(open, close, day, selected) {
    var closeHour = parseInt(close[0]);
    if (closeHour < 12) {
        closeHour += 12;
    }
    var count = ((closeHour - open[0]) * 2) - 1; if (count > 24) { count = count - 24; }
    if (open[1] == '30' && close[1] == '30') {
        count = count;
    } else if (close[1] == '30') {
        count = count + 1;
    } else if (open[1] == '30') {
        count = count - 1;
    }
    var i = 0;
    var isHalf = false;
    if (open[1] == '30') {
        isHalf = true;
    }
    var h = open[0] * 1;
    if (isToday(selected) && autolab_datepicker.autolab_scheduler.same_day === 'Yes') {
        var today = new Date();
        h = today.getHours() + autolab_datepicker.autolab_scheduler.same_day_buffer;
        count = ((closeHour - h) * 2) - 2; if (count > 24) { count = count - 24; }
        if (h > 12) {
            h = h - 12;
        }
    }
    var m = open[1];
    openHours = []; // reset array;
    //build array of time slots
    while (i <= count) {
        if (m == '30') {
            openHours.push(h + ':' + m);
            m = '00';
            h++;
            if (h > 12) {
                h = h - 12;
            }
        } else {
            openHours.push(h + ':' + m);
            m = '30';
        }
        i++;
    }
    return openHours;
}

jQuery(document).ready(gravityDatePickerFix());
