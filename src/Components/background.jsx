import React, { useEffect, useState } from "react";
import bg_img_1 from "./Assets/bg-img_1.jpg";
import { Canvas } from "@react-three/fiber";
import Earth from "./3D_model";

const ParticleBackground = () => {
  useEffect(() => {
    let resizeCanvas;

    const initParticles = () => {
      (function (window, document) {
        "use strict";

        function deepExtend(out = {}, ...args) {
          for (let i = 0; i < args.length; i++) {
            if (!args[i]) continue;
            for (let key in args[i]) {
              if (args[i].hasOwnProperty(key)) {
                if (typeof args[i][key] === "object") {
                  out[key] = deepExtend({}, args[i][key]);
                } else {
                  out[key] = args[i][key];
                }
              }
            }
          }
          return out;
        }

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

          options = deepExtend({}, window.particleground.defaults, options);

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

        window.particleground.defaults = {
          minSpeedX: 0.4,
          maxSpeedX: 0.9,
          minSpeedY: 0.4,
          maxSpeedY: 0.9,
          directionX: "center",
          directionY: "center",
          density: 10000,
          dotColor: "#000",
          lineColor: "#000",
          particleRadius: 7,
          lineWidth: 1,
          curvedLines: false,
          proximity: 100,
          parallax: true,
          parallaxMultiplier: 5,
          onInit: function () {},
          onDestroy: function () {},
        };

        window.particleground(document.getElementById("particles-background"), {
          dotColor: "rgba(255,255,255, 0.5)",
          lineColor: "rgba(255,255,255, 0.05)",
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
          lineColor: "rgba(255,255,255, 0.05)",
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

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsActive(true);
      } else if (window.scrollY == 0) {
        setIsActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        id="particles-background"
        className="vertical-centered-box"
        aria-hidden="true"
      ></div>
      <div
        id="particles-foreground"
        className="vertical-centered-box"
        aria-hidden="true"
      ></div>
      <div className="animated-earth">
        <Canvas camera={{ position: [0, 0, 360], rotation: [0, 0, 0] }}>
          {/* <ambientLight intensity={1} /> */}
          <directionalLight position={[10, 10, 10]} intensity={10} />
          {/* <pointLight position={[10, 10, 10]} /> */}
          <Earth />
        </Canvas>
      </div>

      {/* Demo Alumni */}
      <div
        className={`fixed top-[10%] right-[10vw] hidden lg:block animated-image-active duration-500 ${
          isActive ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="relative top-24 right-40 before:w-20 before:h-8 before:border-b-4 before:border-l-4 before:skew-x-[30deg] before:border-white before:rounded-sm before:absolute before:-rotate-[60deg] before:-bottom-6 before:right-4 before:z-[1]">
          <img
            src={bg_img_1}
            alt=""
            className="w-12 h-12 rounded-full border-4 border-white z-[2] relative"
          />
        </div>
        <div className="relative top-32 right-80 before:w-20 before:h-8 before:border-t-4 before:border-l-4 before:skew-x-[-30deg] before:border-white before:rounded-sm before:absolute before:-rotate-[120deg] before:-bottom-10 before:-right-12 before:z-[1]">
          <img
            src={bg_img_1}
            alt=""
            className="w-12 h-12 rounded-full border-4 border-white z-[2] relative"
          />
        </div>
        <div className="relative top-72 right-24 before:w-20 before:h-8 before:border-b-4 before:border-r-4 before:skew-x-[-30deg] before:border-white before:rounded-sm before:absolute before:-rotate-[120deg] before:-top-10 before:-left-14 before:z-[1]">
          <img
            src={bg_img_1}
            alt=""
            className="w-12 h-12 rounded-full border-4 border-white z-[2] relative"
          />
        </div>
        <div className="relative top-[370px] right-72 before:w-20 before:h-8 before:border-t-4 before:border-r-4 before:skew-x-[30deg] before:border-white before:rounded-sm before:absolute before:-rotate-[60deg] before:-top-10 before:-right-14 before:z-[1]">
          <img
            src={bg_img_1}
            alt=""
            className="w-12 h-12 rounded-full border-4 border-white z-[2] relative"
          />
        </div>
        <div className="relative top-40 right-60 before:w-8 before:h-1 before:bg-white before:absolute before:top-5 before:left-10 before:rounded-md">
          <img
            src={bg_img_1}
            alt=""
            className="w-12 h-12 rounded-full border-4 border-white z-[2] relative"
          />
        </div>
        <div className="relative top-0 right-0 before:w-8 before:h-1 before:bg-white before:absolute before:top-[22px] before:right-10 before:rounded-md">
          <img
            src={bg_img_1}
            alt=""
            className="w-12 h-12 rounded-full border-4 border-white z-[2] relative"
          />
        </div>
      </div>
    </>
  );
};

export default ParticleBackground;
