class Canvas {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.erase = document.getElementById("eraseCanvas");
        this.mousePosition = { x: 0, y: 0 };
        this.canvas.width = 360;
        this.canvas.height = 150;
        this.isDrawing = false;
        this.initControles();
        this.effacer();
    };

    getPosition(e) {
		let typeE = e.type;
        let rect = this.canvas.getBoundingClientRect();
        
		if (typeE === "mousemove") {
			return {
				x: e.clientX - rect.left,
				y: e.clientY - rect.top
			};
		} 
  			return {
			    x: e.touches[0].clientX - rect.left,
			    y: e.touches[0].clientY - rect.top
		  	};
	};

	movePosition(e) {
		let positionSouris = this.getPosition(e);
		let positionX = positionSouris.x;
		let positionY = positionSouris.y;
		this.dessiner(positionX, positionY);
	};

	transformEvent(e) {
		
		let typeE = e.type;
		if (typeE === "touchstart") {
			let mouseEvent = new MouseEvent("mousedown", {});
			this.canvas.dispatchEvent(mouseEvent);
		} else if (typeE === "touchend") {
			let mouseEvent = new MouseEvent("mouseup", {});
			this.canvas.dispatchEvent(mouseEvent);
		} else if (typeE === "touchmove") {
			let touch = e.touches[0];
 			let mouseEvent = new MouseEvent("mousemove", {
	    		clientX: touch.clientX,
	    		clientY: touch.clientY
	  			});
  			this.canvas.dispatchEvent(mouseEvent);
		};
	};

	startDessin(e) {
        this.isDrawing = true;
		this.dessiner(e);
	};

	endDessin() {
    this.isDrawing = false;
		this.ctx.beginPath();
	};

	dessiner(positionX, positionY) {
		if(!this.isDrawing) return;
		this.ctx.lineWidth = 3;
		this.ctx.lineCap = "round";

		this.ctx.lineTo(positionX, positionY);
		this.ctx.stroke();
		this.ctx.beginPath();
		this.ctx.moveTo(positionX, positionY);
	};	
    
    initControles() {
		this.canvas.addEventListener("touchstart", function(e) { 
				e.preventDefault();
		});
		this.canvas.addEventListener("touchend", function(e) {
				e.preventDefault();
		});
		this.canvas.addEventListener("touchmove", function(e) {
				e.preventDefault();
        });
        
        this.canvas.addEventListener("mousedown", this.startDessin.bind(this));
        
		document.addEventListener("mouseup", this.endDessin.bind(this));
		this.canvas.addEventListener("mousemove", this.movePosition.bind(this));
		
		this.canvas.addEventListener("touchstart", this.transformEvent.bind(this));
        document.addEventListener("touchend", this.transformEvent.bind(this));
        
		this.canvas.addEventListener("touchmove", this.transformEvent.bind(this));

	};

    effacer() {
        this.erase.addEventListener('click', event => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        });
    };
};