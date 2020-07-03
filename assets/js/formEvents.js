class FormEvents {
    constructor() {
        this.btnRes = document.getElementById("btnRes");
        this.nom = document.getElementById('nom');
        this.prenom = document.getElementById('prenom');
        this.nomForm = document.getElementById("nomForm");
        this.prenomForm = document.getElementById("prenomForm");
        this.greenCross = document.getElementById('greenCross');
        this.redCross = document.getElementById("redCross");
        this.canvasWindow = document.getElementById("canvasWindow");
        this.aside = document.getElementById('aside');
        this.form = document.getElementById("form");
        this.resDiv = document.getElementById('resDiv');
        this.popupRes = document.getElementById('popupRes');
        this.windowReservation = document.getElementById('windowReservation');
        this.timeUpDiv = document.getElementById('timeUpDiv');
        this.timeUpOk = document.getElementById('timeUpOk');
        this.afficherBlock();
        this.timeUpRes();
    };

    afficherBlock() {

        this.btnRes.addEventListener('click', event => {
            localStorage.setItem('nom', this.nom.value);
            localStorage.setItem('prenom', this.prenom.value);
            this.nomForm.innerHTML = this.nom.value;
            this.prenomForm.innerHTML = this.prenom.value;

            if (this.nom.value !== "" && this.prenom.value !== "" && sessionStorage.station === undefined && sessionStorage.adresse === undefined) {

                this.canvasWindow.style.visibility = "visible";
                this.form.style.visibility = "hidden";
            };

            if (this.nom.value === "") {

                this.nom.placeholder = "Veuillez renseigner votre nom";
                this.nom.innerHTML = this.nom.placeholder;
            };

            if (this.prenom.value === "") {

                this.prenom.placeholder = "Veuillez renseigner votre prénom";
                this.prenom.innerHTML = this.prenom.placeholder;
            };

            if (this.nom.value !== "" && this.prenom.value !== "" && sessionStorage.station !== undefined && sessionStorage.adresse !== undefined) {

                this.popupRes.innerHTML = "Veuillez annuler votre réservation pour en commander une autre";
                this.resDiv.style.visibility = "visible";
                console.log("test");
            };
        });

        this.greenCross.addEventListener("click", function(event) {

            this.aside.style.display = "none";
        }.bind(this));

        this.redCross.addEventListener('click', event => {

            this.canvasWindow.style.visibility = "hidden";
            this.form.style.visibility = "visible";
        });
    };

    timeUpRes() {

        this.timeUpOk.addEventListener("click", function(event) {

            this.timeUpDiv.style.visibility = "hidden";
            this.windowReservation.style.display = "none";
        }.bind(this));
    };
};