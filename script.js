class App {
	timer = {
		min_ten: document.getElementById('min-ten'),
		min: document.getElementById('min'),
		sec_ten: document.getElementById('sec-ten'),
		sec: document.getElementById('sec'),
	};
	#interval;

	submit(event) {
		event.preventDefault();
		const formData = new FormData(event.target);
		const time = formData.get('time');
		this.#clearTimer();
		this.#startTimer(time);
	}

    stop(event) {
		event.preventDefault();
		const formData = new FormData(event.target);
		const time = formData.get('time');
		this.#clearTimer();
	}

	#clearTimer() {
		if (this.#interval) {
			clearInterval(this.#interval);
		}
		this.#setTimer({
			min_ten: 0,
			min: 0,
			sec_ten: 0,
			sec: 0
		})
	}

	#startTimer(time) {
		const end = Date.now() + time * 1000 * 60;
		this.#interval = setInterval(() => {
			const now = Date.now();
			const delta = end - now;
			if (delta < 0) {
				clearInterval(this.#interval);
				return;
			}
			this.#setTimer({
				min_ten: Math.floor(delta / 1000 / 60 / 10),
				min: Math.floor((delta / 1000 / 60) % 10),
				sec_ten: Math.floor((delta % 60000) / 10000),
				sec: Math.floor(((delta % 60000) / 1000) % 10)
			})
		}, 500);
	}

	#setTimer({ min_ten, min, sec_ten, sec }) {
		this.timer.min_ten.innerText = min_ten;
		this.timer.min.innerText = min;
		this.timer.sec_ten.innerText = sec_ten;
		this.timer.sec.innerText = sec;
	}
}

const app = new App();