let highestZ = 1;

class Paper {
  constructor() {
    this.paper = null;
    this.holdingPaper = false;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.rotation = Math.random() * 30 - 15;
  }

  init(paper) {
    this.paper = paper;
    paper.style.transform = `rotateZ(${this.rotation}deg)`;

    // Desktop
    paper.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));

    // Mobile
    paper.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: false });
    document.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: false });
    document.addEventListener('touchend', this.onTouchEnd.bind(this));
  }

  onMouseDown(e) {
    this.holdingPaper = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.paper.style.zIndex = highestZ++;
  }

  onMouseMove(e) {
    if (!this.holdingPaper) return;
    e.preventDefault();
    this.offsetX = e.clientX - this.startX;
    this.offsetY = e.clientY - this.startY;
    this.currentX += this.offsetX;
    this.currentY += this.offsetY;
    this.paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px) rotateZ(${this.rotation}deg)`;
    this.startX = e.clientX;
    this.startY = e.clientY;
  }

  onMouseUp() {
    this.holdingPaper = false;
  }

  onTouchStart(e) {
    this.holdingPaper = true;
    this.startX = e.touches[0].clientX;
    this.startY = e.touches[0].clientY;
    this.paper.style.zIndex = highestZ++;
  }

  onTouchMove(e) {
    if (!this.holdingPaper) return;
    e.preventDefault();
    const touch = e.touches[0];
    this.offsetX = touch.clientX - this.startX;
    this.offsetY = touch.clientY - this.startY;
    this.currentX += this.offsetX;
    this.currentY += this.offsetY;
    this.paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px) rotateZ(${this.rotation}deg)`;
    this.startX = touch.clientX;
    this.startY = touch.clientY;
  }

  onTouchEnd() {
    this.holdingPaper = false;
  }
}

document.querySelectorAll('.paper').forEach(p => {
  new Paper().init(p);
});
