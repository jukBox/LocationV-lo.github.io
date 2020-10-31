class Timer {

    constructor(duration) {

        this.duration = duration;
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
    };

    chrono() {
        const windowReservation = document.getElementById('windowReservation');
        const resDiv = document.getElementById('resDiv');
        const popupRes = document.getElementById('popupRes');
        const cancelReservation = document.getElementById("cancelReservation");
        const timeUp = document.getElementById('timeUp');
        const timeUpDiv = document.getElementById('timeUpDiv');
        const timeUpOk = document.getElementById('timeUpOk');
        const timer = document.getElementById('timer');

        let now = new Date().getTime();
        let countDown = now + this.duration;

        let chrono = setInterval(() => {

            let now = new Date().getTime();
            let diff = countDown - now;

            if (diff <= 0) {

                clearInterval(chrono);
                this.resetReservation();
                timeUp.innerHTML = "Délai dépassé, votre réservation est annulée :(";
                timeUpDiv.style.visibility = "visible";
                return;
            };

            let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((diff % (1000 * 60)) / 1000);

            timer.innerHTML = `${minutes} minutes et ${seconds} secondes`;

            localStorage.setItem('minutes', minutes);
            localStorage.setItem('seconds', seconds);

        }, 1000);

        timeUpOk.addEventListener("click", event => {

            this.resetReservation();
            windowReservation.style.display = "none";
        })

        cancelReservation.addEventListener("click", event => {

            clearInterval(chrono);
            this.resetReservation();
            popupRes.innerHTML = "Vous avez annulé votre réservation";
            resDiv.style.visibility = "visible";
            windowReservation.style.display = "none";
        });
    };

    resetReservation() {
        const lienRes = document.getElementById("lienRes");
        const form = document.getElementById("form");
        const windowPopup = document.getElementById('windowPopup');

        localStorage.clear('minutes', 'seconds');
        sessionStorage.clear();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        lienRes.style.visibility = "hidden";
        form.style.visibility = "visible";
        windowPopup.style.visibility = "visible";
    };
};