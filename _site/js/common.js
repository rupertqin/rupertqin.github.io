$(document).ready(function($) {
	var daysRange = 5;

	function assignCalendar(id){
		$('<div class="calendar" />')
				.insertAfter( $(id) )
				.multiDatesPicker({
					dateFormat: 'yy-mm-dd',
					minDate: new Date(),
					maxDate: '+1y',
					altField: id,
					firstDay: 1,
					showOtherMonths: true
				}).prev().hide();
	}

	assignCalendar('#date_departure');
});
