class Reservation {

    constructor() {
        this.timer = document.getElementById('timer');
        this.windowReservation = document.getElementById('windowReservation');
        this.form = document.getElementById("form");
        this.canvas = document.getElementById("canvas");
        this.canvasEmpty = document.getElementById("canvasEmpty");
        this.canvasWindow = document.getElementById("canvasWindow");
        this.init();
    };

    init() {
        const valid = document.getElementById('validCanvas');
        const windowPopup = document.getElementById('windowPopup');
        const lienRes = document.getElementById("lienRes");
        const resDiv = document.getElementById('resDiv');
        const popupRes = document.getElementById('popupRes');
        const addressSelector = document.getElementById('address');
        const nameSelector = document.getElementById('name');
        const popupResOk = document.getElementById('popupResOk');
        const greenCrossRes = document.getElementById('greenCrossRes');
        const nameRes = document.getElementById("nameRes");
        const addressRes = document.getElementById("addressRes");
        const nom = document.getElementById('nom');
        const prenom = document.getElementById('prenom');
        const nomForm = document.getElementById("nomForm");
        const prenomForm = document.getElementById("prenomForm");

        window.addEventListener("load", function() {

            if (localStorage.minutes && localStorage.seconds) {
                lienRes.style.visibility = "visible";
                nameRes.innerHTML = sessionStorage.getItem('station');
                addressRes.innerHTML = sessionStorage.getItem('adresse');
                localStorage.getItem('nom', nom.value);
                localStorage.getItem('prenom', prenom.value);
                nomForm.innerHTML = nom.value;
                prenomForm.innerHTML = prenom.value;
                this.data_window();
                this.data_storage();
            }
        }.bind(this));

        valid.addEventListener('click', event => {

            if (this.canvas.toDataURL() === this.canvasEmpty.toDataURL()) {

                popupRes.innerHTML = "Veuillez signer pour valider";
                resDiv.style.visibility = "visible";
                return;
            };

            sessionStorage.setItem('station', nameSelector.textContent);
            sessionStorage.setItem('adresse', addressSelector.textContent);
            nameRes.innerHTML = nameSelector.textContent;
            addressRes.innerHTML = addressSelector.textContent;
            this.data_window();
            let timer = new Timer(1201000);
            timer.chrono();

        });

        popupResOk.addEventListener('click', event => {

            resDiv.style.visibility = "hidden";
        });

        greenCrossRes.addEventListener("click", function(event) {

            canvasWindow.style.visibility = "hidden";
            this.windowReservation.style.display = "none";
            windowPopup.style.visibility = "visible";
            this.form.style.visibility = "visible";
            lienRes.style.visibility = "visible";
        }.bind(this));

        lienRes.addEventListener("click", event => {

            this.windowReservation.style.display = "block";
        });
    };

    data_window() {
        const veloSelector = document.getElementById('velo');
        const timerAlert = document.getElementById('timerAlert');
        const bikeValid = document.getElementById("bikeValid");

        veloSelector.innerHTML = "1";
        timerAlert.style.visibility = "visible";
        bikeValid.style.visibility = "visible";
        this.form.style.visibility = "visible";
        this.canvasWindow.style.visibility = "hidden";
        this.windowReservation.style.display = "block";
    }

    data_storage() {

        let minutes = localStorage.getItem('minutes');
        let seconds = localStorage.getItem('seconds');

        let reste = minutes * 60 * 1000 + seconds * 1000;
        let timer = new Timer(reste);
        timer.chrono();
    };
};