class Slider {
    constructor() {
        this.left = document.getElementById("left");
        this.right = document.getElementById("right");
        this.pause = document.getElementById("pause");
        this.play = document.getElementById("play");
        this.images = ["assets/images/1.png", "assets/images/2.png", "assets/images/3.png", "assets/images/4.png"];
        this.img = document.getElementById("img");
        this.comment = document.getElementById("comment");
        this.figcaption = ["Comment réserver? Regardez le tuto en images ici!", "Etape 1/3 : Choisir une station", "Etape 2/3 : Remplir le formulaire", "Etape 3/3 : Signer et valider"];
        this.playing = true;
        this.number = 0;
        this.imageRight();
        this.imageLeft();
        this.keybord();
        this.slideAuto();
    };

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
        this.right.addEventListener('click', function(event) {
            this.changeSlide(1);
        }.bind(this));
    };

    imageLeft() {
        this.left.addEventListener('click', function(event) {
            this.changeSlide(-1);
        }.bind(this));
    };

    changeSlide(sens) {
        this.number = this.number + sens;

        if (this.number < 0) {
            this.number = this.images.length - 1;
            this.number = this.figcaption.length - 1;
        };
        if (this.number > this.images.length - 1 && this.number > this.figcaption.length - 1) {
            this.number = 0;
        };
        this.img.src = this.images[this.number];
        this.comment.innerHTML = this.figcaption[this.number];
    };

    slideAuto() {

        let loop = setInterval(() => {
            if (this.playing === true) {

                this.changeSlide(1);

            } else(this.playing === false)

            this.vitesse = null;
            this.changeSlide(0);
            clearInterval(this.loop);

        }, 5000);

        this.play.addEventListener('click', event => {
            this.playing = true;
        });

        this.pause.addEventListener('click', event => {
            this.playing = false;
            clearInterval(this.loop);
        });
    };
};