class CountDown {
	
	constructor(end_countdown_date, parent_element) {
		this.end_countdown_date = end_countdown_date;
		this.parent_element = parent_element;
		this.countdown_completed = false;
		this.milliseconds_to = {
			minute: 60000,
			hour: 3600000,
			day: 86400000,
			month: 2505600000
		};
		this.init();
	}
	init() {

		Object.freeze(this.milliseconds_to);
		//this.milliseconds_to.month="salut";
		//console.log(this.milliseconds_to);

		this.createCountDownElements();

		//this.updateCountdown
		this.updateCountDown();

		const countdown = setInterval(() => !this.countdown_completed ? this.updateCountDown() : clearInterval(countdown), 60000)
	}

	createCountDownElements() {

		this.section_element = document.createElement('section');
		this.section_element.id = "countdown"; 
		this.section_element.textContent = `
			<span data-unit="month" data-unit-name="mois"></span>
			<span data-unit="day" data-unit-name="jours"></span>
			<span data-unit="hour" data-unit-name="heures"></span>
			<span data-unit="minute" data-unit-name="minutes"></span>
		`

		this.parent_element.appendChild(this.section_element); //TypeError: Unable to get property {x} of undefined or null reference (Edge)
	}

	updateCountDown() {

		[...this.section_element.children].forEach(span_element => span_element.textContent = this.getStringValueFormatted(span_element.dataset.unit));
	}

	getStringValueFormatted(unit) {

		const milliseconds_remaining = new Date(this.end_countdown_date) - new Date();
		if (milliseconds_remaining <= 60000) {
			this.countdown_completed = true;
		}
		
		let value = null;

		switch(unit) {
			case "month": value = Math.floor(milliseconds_remaining / this.milliseconds_to.month); break;
			case "day": value = Math.floor((milliseconds_remaining % milliseconds_to.month) / this.milliseconds_to.day); break;
			case "hour": value = Math.floor((milliseconds_remaining % milliseconds_to.day) / this.milliseconds_to.hour); break;
			case "minute": value = Math.floor((milliseconds_remaining % milliseconds_to.hour) / this.milliseconds_to.minute); break;
		}

		//console.log(value > 9 ? value : "0" + value);
		return (value > 9 ? value : "0" + value).toString();

	}

}

/*var parent_element = document.querySelector('main')*/

	new CountDown( {
		end_countdown_date: "2021-03-22T09:30",
		parent_element: document.querySelector ('main')  /*parent_element: document.body.querySelector('main')*/
	})

	/*new CountDown (document.querySelector('main') {
	 *	end_countdown_date: "2021-03-22T09:30"
	 *})
	 */

