class SimpleTrail {
  constructor() {
    this.dots = [];
    this.maxDots = 15;
    this.mouseX = window.innerWidth / 2;
    this.mouseY = window.innerHeight / 2;

    this.init();
  }

  init() {
    // Create trail dots
    for (let i = 0; i < this.maxDots; i++) {
      const dot = document.createElement("div");
      dot.className = "trail-dot";
      document.body.appendChild(dot);

      this.dots.push({
        element: dot,
        x: this.mouseX,
        y: this.mouseY,
      });
    }

    // Mouse move event
    document.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      // Update main cursor
      const cursor = document.querySelector(".cursor-dot");
      cursor.style.left = this.mouseX + "px";
      cursor.style.top = this.mouseY + "px";
    });

    this.animate();
  }

  getColor(index) {
    // Create rainbow colors
    const hue = (index * 25 + Date.now() * 0.1) % 360;
    return `hsl(${hue}, 70%, 60%)`;
  }

  animate() {
    for (let i = this.dots.length - 1; i >= 0; i--) {
      const dot = this.dots[i];

      if (i === 0) {
        dot.x += (this.mouseX - dot.x) * 0.3;
        dot.y += (this.mouseY - dot.y) * 0.3;
      } else {
        const prevDot = this.dots[i - 1];
        dot.x += (prevDot.x - dot.x) * 0.3;
        dot.y += (prevDot.y - dot.y) * 0.3;
      }

      dot.element.style.left = dot.x + "px";
      dot.element.style.top = dot.y + "px";
      dot.element.style.background = this.getColor(i);
      dot.element.style.opacity = (this.maxDots - i) / this.maxDots;
    }

    requestAnimationFrame(() => this.animate());
  }
}

window.addEventListener("load", () => {
  new SimpleTrail();
});

const form = document.getElementById("newsletter-form");
const form_button = document.getElementById("newsletter-button");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents the default form submission behavior.

  form_button.textContent = "Sending...";

  const data = new FormData(form);
  const action =
    "https://script.google.com/macros/s/AKfycbw8pMigYITUWRAncbG9dhNwiglMCjciXcAbczAYoF6WzFhWHYSe1VvsIQVqmnb6F_O3/exec";

  fetch(action, {
    method: "POST",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.result === "success") {
        form_button.textContent = "Thank You!";
        form.reset();
      } else {
        form_button.textContent = "error occurred.";
        console.error(data.error);
      }
    })
    .catch((error) => {
      statusMessage.textContent = "❌ An error occurred.";
      console.error(error);
    });
});
