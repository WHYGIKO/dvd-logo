class DVDLogo {
  constructor(selector, tezlik = 5) {
    this.el = document.querySelector(selector);
    this.path = this.el.querySelector("#dvd-path");

    this.x = window.innerWidth / 2;
    this.y = window.innerHeight / 2;

    this.dvd_x = tezlik;
    this.dvd_y = tezlik;

    this.tezlik = tezlik;

    this.ranglar = ["#ff0066", "#00aaff", "#00ff88", "#ffaa00", "#9933ff", "#ffffff"];
    this.rangIndex = 0;
    this.yangilash = this.yangilash.bind(this);
    requestAnimationFrame(this.yangilash);
  }

  changeColor() {
    this.rangIndex = (this.rangIndex + 1) % this.ranglar.length;
    this.path.setAttribute("fill", this.ranglar[this.rangIndex]);
  }

  yangilash() {
    const joylashuv = this.el.getBoundingClientRect();

    if (joylashuv.right >= window.innerWidth || joylashuv.left <= 0) {
      this.dvd_x = -this.dvd_x * 0.95;
      this.changeColor();
    }


    if (joylashuv.bottom >= window.innerHeight || joylashuv.top <= 0) {
      this.dvd_y = -this.dvd_y * 0.95;
      this.changeColor();
    }

    this.x = Math.min(Math.max(this.x + this.dvd_x, 0), window.innerWidth - joylashuv.width);
    this.y = Math.min(Math.max(this.y + this.dvd_y, 0), window.innerHeight - joylashuv.height);

    this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;


    requestAnimationFrame(this.yangilash);
  }
}

new DVDLogo("#dvd-logo", 4);
