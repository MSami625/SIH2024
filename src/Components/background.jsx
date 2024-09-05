import React, { useEffect, useState } from "react";

const Background = ({ particlesActive }) => {
  useEffect(() => {
    let resizeCanvas;

    const initParticles = () => {
      (function (window, document) {
        "use strict";

        function Particleground(element, options) {
          const canvas = document.createElement("canvas");
          canvas.className = "pg-canvas";
          canvas.style.display = "block";
          element.insertBefore(canvas, element.firstChild);

          const ctx = canvas.getContext("2d");

          resizeCanvas = () => {
            canvas.width = element.offsetWidth || window.innerWidth;
            canvas.height = element.offsetHeight || window.innerHeight;
            ctx.fillStyle = options.dotColor;
            ctx.strokeStyle = options.lineColor;
            ctx.lineWidth = options.lineWidth || 1;
          };

          resizeCanvas();
          window.addEventListener("resize", resizeCanvas);

          const particles = [];
          for (
            let i = 0;
            i < Math.round((canvas.width * canvas.height) / options.density);
            i++
          ) {
            particles.push(new Particle());
          }

          const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle) => {
              particle.updatePosition();
              particle.draw();
            });
            requestAnimationFrame(animateParticles);
          };

          animateParticles();

          function Particle() {
            this.position = {
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
            };
            this.speed = {
              x: Math.random() * options.maxSpeedX - options.maxSpeedX / 2,
              y: Math.random() * options.maxSpeedY - options.maxSpeedY / 2,
            };
            this.radius = options.particleRadius || 2;

            this.updatePosition = function () {
              this.position.x += this.speed.x;
              this.position.y += this.speed.y;

              if (this.position.x > canvas.width || this.position.x < 0)
                this.speed.x = -this.speed.x;
              if (this.position.y > canvas.height || this.position.y < 0)
                this.speed.y = -this.speed.y;
            };

            this.draw = function () {
              ctx.beginPath();
              ctx.arc(
                this.position.x,
                this.position.y,
                this.radius,
                0,
                2 * Math.PI,
                true
              );
              ctx.closePath();
              ctx.fill();

              for (let j = 0; j < particles.length; j++) {
                const other = particles[j];
                const dx = this.position.x - other.position.x;
                const dy = this.position.y - other.position.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < options.proximity) {
                  ctx.beginPath();
                  ctx.moveTo(this.position.x, this.position.y);
                  ctx.lineTo(other.position.x, other.position.y);
                  ctx.stroke();
                }
              }
            };
          }
        }

        window.particleground = function (element, options) {
          return new Particleground(element, options);
        };

        window.particleground(document.getElementById("particles-background"), {
          dotColor: "rgba(255,255,255, 0.5)",
          lineColor: "rgba(255,255,255, 0.1)",
          minSpeedX: 0.2,
          maxSpeedX: 0.5,
          minSpeedY: 0.2,
          maxSpeedY: 0.5,
          density: 30000,
          proximity: 20,
          parallaxMultiplier: 20,
          particleRadius: 2,
        });

        window.particleground(document.getElementById("particles-foreground"), {
          dotColor: "rgba(255,255,255, 1)",
          lineColor: "rgba(255,255,255, 0.1)",
          minSpeedX: 0.6,
          maxSpeedX: 0.9,
          minSpeedY: 0.6,
          maxSpeedY: 0.9,
          density: 50000,
          proximity: 250,
          parallaxMultiplier: 10,
          particleRadius: 4,
        });
      })(window, document);
    };

    initParticles();

    return () => {
      if (resizeCanvas) {
        window.removeEventListener("resize", resizeCanvas);
      }
    };
  }, []);

  return (
    <>
      {/* Particles */}
      <div
        id="particles-background"
        className={`vertical-centered-box ${particlesActive ? "" : "hidden"}`}
        aria-hidden="true"
      ></div>
      <div
        id="particles-foreground"
        className={`vertical-centered-box ${particlesActive ? "" : "hidden"}`}
        aria-hidden="true"
      ></div>

      {/* Background Gradient */}
      <video
        role="presentation"
        crossOrigin="anonymous"
        playsInline
        preload="auto"
        muted
        loop
        tabIndex="-1"
        autoPlay
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          opacity: 1,
        }}
      >
        <source
          src="https://video.wixstatic.com/video/11062b_e2ae833a8eaa43e38e4aa6d32eb3b8f7/480p/mp4/file.mp4"
          type="video/mp4"
        />
      </video>
    </>
  );
};

export default Background;
