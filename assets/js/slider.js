class Slider {
    constructor() {
        this.number_slide = 0;
        this.initEvents();
    };

    initEvents() {
        this.imageRight();
        this.imageLeft();
        this.keybord();
        this.slideAuto();
    }

    keybord() {
        document.addEventListener('keydown', function(event) {
            if (event.key === "ArrowRight" || event.key === "Right") {
                this.changeSlide(1);
            } else if (event.key === "ArrowLeft" || event.key === "Left") {
                this.changeSlide(-1);
            }
        }.bind(this));
    };

    imageRight() {
        let right_btn = document.getElementById("right");

        right_btn.addEventListener('click', function(event) {
            this.changeSlide(1);
        }.bind(this));
    };

    imageLeft() {
        let left_btn = document.getElementById("left");

        left_btn.addEventListener('click', function(event) {
            this.changeSlide(-1);
        }.bind(this));
    };

    changeSlide(sens) {
        let images = ["assets/images/1.png", "assets/images/2.png", "assets/images/3.png", "assets/images/4.png"];
        let figcaption = ["Comment réserver? Regardez le tuto en images ici!", "Etape 1/3 : Choisir une station", "Etape 2/3 : Remplir le formulaire", "Etape 3/3 : Signer et valider"];
        let img_slide = document.getElementById("img");
        let tuto_img = document.getElementById("tuto_img");

        this.number_slide = this.number_slide + sens;

        if (this.number_slide < 0) {
            this.number_slide = images.length - 1;
            this.number_slide = figcaption.length - 1;
        };
        if (this.number_slide > images.length - 1 && this.number_slide > figcaption.length - 1) {
            this.number_slide = 0;
        };
        img_slide.src = images[this.number_slide];
        tuto_img.innerHTML = figcaption[this.number_slide];
    };

    slideAuto() {
        let isPlaying = true;
        let pause_btn = document.getElementById("pause");
        let play_btn = document.getElementById("play");

        let loop = setInterval(() => {
            if (isPlaying === true) {

                this.changeSlide(1);

            } else(isPlaying === false)

            this.vitesse = null;
            this.changeSlide(0);
            clearInterval(this.loop);

        }, 5000);

        play_btn.addEventListener('click', event => {
            isPlaying = true;
        });

        pause_btn.addEventListener('click', event => {
            isPlaying = false;
            clearInterval(this.loop);
        });
    };
};