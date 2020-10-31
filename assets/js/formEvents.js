class FormEvents {
    constructor() {
        this.afficherBlock();
        this.timeUpRes();
    };

    afficherBlock() {
        const nom = document.getElementById('nom');
        const prenom = document.getElementById('prenom');
        const greenCross = document.getElementById('greenCross');
        const redCross = document.getElementById("redCross");
        const canvasWindow = document.getElementById("canvasWindow");
        const aside = document.getElementById('aside');
        const form = document.getElementById("form");
        const resDiv = document.getElementById('resDiv');
        const popupRes = document.getElementById('popupRes');
        const btnRes = document.getElementById("btnRes");
        const nomForm = document.getElementById("nomForm");
        const prenomForm = document.getElementById("prenomForm");
        const lienRes = document.getElementById("lienRes");

        btnRes.addEventListener('click', event => {
            localStorage.setItem('nom', nom.value);
            localStorage.setItem('prenom', prenom.value);
            nomForm.innerHTML = nom.value;
            prenomForm.innerHTML = prenom.value;

            if (nom.value !== "" && prenom.value !== "" && sessionStorage.station === undefined && sessionStorage.adresse === undefined) {

                canvasWindow.style.visibility = "visible";
                form.style.visibility = "hidden";
            };

            if (nom.value === "") {

                nom.placeholder = "Veuillez renseigner votre nom";
                nom.innerHTML = nom.placeholder;
            };

            if (prenom.value === "") {

                prenom.placeholder = "Veuillez renseigner votre prénom";
                prenom.innerHTML = prenom.placeholder;
            };

            if (nom.value !== "" && prenom.value !== "" && sessionStorage.station !== undefined && sessionStorage.adresse !== undefined) {

                popupRes.innerHTML = "Veuillez annuler votre réservation pour en commander une autre";
                resDiv.style.visibility = "visible";
                lienRes.style.visibility = "visible";
            };
        });

        greenCross.addEventListener("click", function(event) {

            aside.style.display = "none";
        });

        redCross.addEventListener('click', event => {

            canvasWindow.style.visibility = "hidden";
            form.style.visibility = "visible";
        });
    };

    timeUpRes() {
        const windowReservation = document.getElementById('windowReservation');
        const timeUpDiv = document.getElementById('timeUpDiv');
        const timeUpOk = document.getElementById('timeUpOk');

        timeUpOk.addEventListener("click", function(event) {

            timeUpDiv.style.visibility = "hidden";
            windowReservation.style.display = "none";
        });
    };
};