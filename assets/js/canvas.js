class Canvas {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.erase = document.getElementById("eraseCanvas");
        this.form = document.getElementById("form");
        this.mousePosition = { x: 0, y: 0 };
        this.canvas.width = 360;
        this.canvas.height = 150;
        this.isDrawing = false;
        this.dessiner();
        this.effacer();
    };

    dessiner() {
        this.canvas.addEventListener('mousedown', event => {
            let rect = this.canvas.getBoundingClientRect();

            this.mousePosition.x = event.clientX - rect.left;
            this.mousePosition.y = event.clientY - rect.top;
            this.isDrawing = true;
        });

        this.canvas.addEventListener('mousemove', event => {
            if (this.isDrawing === true) {
                let rect = this.canvas.getBoundingClientRect();
                this.drawLine(this.ctx, this.mousePosition.x, this.mousePosition.y, event.clientX - rect.left, event.clientY - rect.top);
                this.mousePosition.x = event.clientX - rect.left;
                this.mousePosition.y = event.clientY - rect.top;
            };
        });

        this.canvas.addEventListener('mouseup', event => {
            if (this.isDrawing === true) {
                let rect = this.canvas.getBoundingClientRect();
                this.drawLine(this.ctx, this.mousePosition.x, this.mousePosition.y, event.clientX - rect.left, event.clientY - rect.top);
                this.mousePosition.x = 0;
                this.mousePosition.y = 0;
                this.isDrawing = false;
            };
        });
    };

    drawLine(context, x1, y1, x2, y2) {
        context.beginPath(),
            context.strokeStyle = 'black',
            context.lineWidth = 4,
            context.moveTo(x1, y1),
            context.lineTo(x2, y2),
            context.stroke();
    };

    effacer() {
        this.erase.addEventListener('click', event => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        });
    };
};