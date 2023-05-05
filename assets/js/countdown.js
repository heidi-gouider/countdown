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
		}
		console.log(1);
		console.log(parent_element);
		console.log(end_countdown_date);
		
	}
	init() {

		Object.freeze(this.milliseconds_to);
		//this.milliseconds_to.month="salut";
		//console.log(this.milliseconds_to);

		this.createCountDownElements();

		//this.updateCountdown
		this.updateCountDown();

		const countdown = setInterval(() => !this.countdown_completed ? this.updateCountDown() : clearInterval(countdown), 60000);
	}
																			//insérer un noeud avant le première enfant ou apprès le dernière enfant
	createCountDownElements() {	
													// pour ça je peux utiliser les méthodes append()et prepend()
		this.section_element = document.createElement('section');			//j'ajoute un noeud soit dans le noeud 'main' soit dans 'section' 
		this.section_element.id = "countdown"; 								// et si dans 'section' comprend le noeud id countdown
		this.section_element.innerHTML = `
			<span data-unit="month" data-unit-name="Mois"></span>
			<span data-unit="day" data-unit-name="Jours"></span>
			<span data-unit="hour" data-unit-name="Heures"></span>
			<span data-unit="minute" data-unit-name="Minutes"></span>
		`;
		console.log(2);
		console.log(this.parent_element)
		this.parent_element.appendChild(this.section_element); 

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

		switch (unit) {
			case 'month': value = Math.floor(milliseconds_remaining / this.milliseconds_to.month); break;
				
			case 'day': value = Math.floor((milliseconds_remaining % this.milliseconds_to.month) / this.milliseconds_to.day); break;
				
			case 'hour': value = Math.floor((milliseconds_remaining % this.milliseconds_to.day) / this.milliseconds_to.hour); break;
			
			case 'minute': value = Math.floor((milliseconds_remaining % this.milliseconds_to.hour) / this.milliseconds_to.minute); break;
				
		}

		//console.log(value > 9 ? value : "0" + value);
		return (value > 9 ? value : "0" + value).toString();

	}



}

//var id = document.querySelector('id')
	//id.children

var countdown = new CountDown (
		end_countdown_date= "2021-03-22T09:30",
		parent_element= document.querySelector ('main')
	)
countdown.init();