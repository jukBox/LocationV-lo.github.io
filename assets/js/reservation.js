class Reservation {

    constructor() {
        this.valid = document.getElementById('validCanvas');
        this.timer = document.getElementById('timer');
        this.timerAlert = document.getElementById('timerAlert');
        this.windowPopup = document.getElementById('windowPopup');
        this.windowReservation = document.getElementById('windowReservation');
        this.form = document.getElementById("form");
        this.lienRes = document.getElementById("lienRes");
        this.cancelReservation = document.getElementById("cancelReservation");
        this.resDiv = document.getElementById('resDiv');
        this.popupRes = document.getElementById('popupRes');
        this.popupResOk = document.getElementById('popupResOk');
        this.timeUpDiv = document.getElementById('timeUpDiv');
        this.timeUp = document.getElementById('timeUp');
        this.timeUpOk = document.getElementById('timeUpOk');
        this.canvas = document.getElementById("canvas");
        this.canvasEmpty = document.getElementById("canvasEmpty");
        this.ctx = this.canvas.getContext("2d");
        this.veloSelector = document.getElementById('velo');
        this.bikeValid = document.getElementById("bikeValid");
        this.canvasWindow = document.getElementById("canvasWindow");
        this.addressSelector = document.getElementById('address');
        this.nameSelector = document.getElementById('name');
        this.greenCrossRes = document.getElementById('greenCrossRes');
        this.nameRes = document.getElementById("nameRes");
        this.addressRes = document.getElementById("addressRes");
        this.chronoValid = false;
        this.init();
    };

    chrono() {
        let counter = 20;
        let time = counter * 60;

        let toLate = setInterval(() => {
            let minutes = Math.floor(time / 60);
            let seconds = time % 60;

            seconds = seconds < 10 ? '0' + seconds : seconds;

            this.timer.innerHTML = `${minutes} min et ${seconds} sec`;

            if (time > 0) {
                time--;
                this.chronoValid = true;
            } else {
                this.timeUp.innerHTML = "Délai dépassé, votre réservation est annulée :(";
                this.timeUpDiv.style.visibility = "visible";
                clearInterval(toLate);
                sessionStorage.clear();
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.lienRes.style.visibility = "hidden";
                this.chronoValid = false;
            };
        }, 1000);

        this.cancelReservation.addEventListener("click", event => {

            clearInterval(toLate);
            sessionStorage.clear();
            this.chronoValid = false;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.windowReservation.style.display = "none";
            this.windowPopup.style.visibility = "visible";
            this.form.style.visibility = "visible";
            this.lienRes.style.visibility = "hidden";
            this.popupRes.innerHTML = "Vous avez annulé votre réservation";
            this.resDiv.style.visibility = "visible";
        });
    };

    init() {

        this.valid.addEventListener('click', event => {

            if (this.canvas.toDataURL() == this.canvasEmpty.toDataURL()) {

                this.popupRes.innerHTML = "Veuillez signer pour valider";
                this.resDiv.style.visibility = "visible";

            } else if (this.chronoValid === false && this.canvas.toDataURL() != this.canvasEmpty.toDataURL()) {

                sessionStorage.setItem('station', this.nameSelector.textContent);
                sessionStorage.setItem('adresse', this.addressSelector.textContent);
                this.nameRes.innerHTML = this.nameSelector.textContent;
                this.addressRes.innerHTML = this.addressSelector.textContent;
                this.chrono();
                this.timerAlert.style.visibility = "visible";
                this.canvasWindow.style.visibility = "hidden";
                this.windowReservation.style.display = "block";
                this.form.style.visibility = "visible";
                this.bikeValid.style.visibility = "visible";
                this.veloSelector.innerHTML = "1";

            } else {
                console.log("no valid");
            };
        });

        this.popupResOk.addEventListener('click', event => {
            this.resDiv.style.visibility = "hidden";
        });

        this.greenCrossRes.addEventListener("click", function(event) {
            canvasWindow.style.visibility = "hidden";
            this.windowReservation.style.display = "none";
            this.windowPopup.style.visibility = "visible";
            this.form.style.visibility = "visible";
            this.lienRes.style.visibility = "visible";
        }.bind(this));

        this.lienRes.addEventListener("click", event => {
            this.windowReservation.style.display = "block";
        });

        // if ( ) {

        // };
    };
};