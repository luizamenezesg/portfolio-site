document.addEventListener("DOMContentLoaded", function () {
    const fadeInElements = document.querySelectorAll(".fade-in");

    function showElements() {
        fadeInElements.forEach((element) => {
            element.classList.add("show");
        });
    }

    showElements();
});

/* Inicializa as partículas no fundo da página */
particlesJS("particles-js", {
    particles: {
        number: {
            value: 80, // Número de partículas 
            density: { enable: true, value_area: 800 }
        },
        color: { value: ["#97266E", "#8EE3C8", "#3A3076"] }, // Cores das partículas
        shape: { type: "circle" }, // Formato 
        opacity: { value: 0.7, random: true },
        size: { value: 5, random: true },
        move: {
            enable: true,
            speed: 2, // Velocidade do movimento 
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out"
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "grab" }, // Efeito ao passar o mouse
            onclick: { enable: true, mode: "push" }
        },
        modes: {
            grab: { distance: 140, line_linked: { opacity: 1 } },
            repulse: { distance: 100, duration: 0.4 },
            bubble: { distance: 200, size: 10, duration: 2 }
        }
    }
});

/*particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: ["#97266E", "#8EE3C8", "#3A3076"] },
        shape: { type: "circle" },
        opacity: { value: 0.7, random: true },
        size: { value: 5, random: true },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out"
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "grab" }, // Altera para "grab", "repulse" ou "bubble"
            onclick: { enable: true, mode: "push" }
        },
        modes: {
            grab: { distance: 140, line_linked: { opacity: 1 } },
            repulse: { distance: 100, duration: 0.4 },
            bubble: { distance: 200, size: 10, duration: 2 }
        }
    }
});*/

//scroll arrastável

document.addEventListener("DOMContentLoaded", function() {
    const skillsCarousel = document.querySelector(".skills-carousel");

    let isDown = false;
    let startX;
    let scrollLeft;

    skillsCarousel.addEventListener("mousedown", (e) => {
        isDown = true;
        startX = e.pageX - skillsCarousel.offsetLeft;
        scrollLeft = skillsCarousel.scrollLeft;
    });

    skillsCarousel.addEventListener("mouseleave", () => {
        isDown = false;
    });

    skillsCarousel.addEventListener("mouseup", () => {
        isDown = false;
    });

    skillsCarousel.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - skillsCarousel.offsetLeft;
        const walk = (x - startX) * 2; // Velocidade do arraste
        skillsCarousel.scrollLeft = scrollLeft - walk;
    });
});

// Seleciona os elementos
const skillsCarousel = document.querySelector(".skills-carousel");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

// Define a distância de rolagem
const scrollAmount = 300;

// Função para mover os cards para a esquerda
leftArrow.addEventListener("click", () => {
    skillsCarousel.scrollBy({
        left: -scrollAmount,
        behavior: "smooth"
    });
});

// Função para mover os cards para a direita
rightArrow.addEventListener("click", () => {
    skillsCarousel.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
    });
});

let currentIndex = 0;

function changeSlide(index, element) {
    const slider = document.querySelector(".project-images");
    const indicators = document.querySelectorAll(".indicator");

    // Define a nova posição do slider
    currentIndex = index;
    const offset = -index * 100; 
    slider.style.transform = `translateX(${offset}%)`;

    // Atualiza os indicadores
    indicators.forEach(ind => ind.classList.remove("active"));
    element.classList.add("active");
}


document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".project-slider").forEach((slider) => {
        const images = slider.querySelectorAll(".project-images img");
        const indicatorsContainer = slider.querySelector(".project-indicators");

        // Limpa indicadores antigos
        indicatorsContainer.innerHTML = "";

        // Cria um indicador para cada imagem
        images.forEach((_, index) => {
            const indicator = document.createElement("span");
            indicator.classList.add("indicator");
            if (index === 0) indicator.classList.add("active"); // Deixa o primeiro ativo
            indicator.setAttribute("data-index", index);
            indicator.onclick = function () {
                changeSlide(index, this);
            };
            indicatorsContainer.appendChild(indicator);
        });
        
        const prevButton = slider.querySelector(".prev");
        const nextButton = slider.querySelector(".next");
        const imagesContainer = slider.querySelector(".project-images");
    
        prevButton.addEventListener("click", () => {
            imagesContainer.scrollBy({ left: -300, behavior: "smooth" });
        });
    
        nextButton.addEventListener("click", () => {
            imagesContainer.scrollBy({ left: 300, behavior: "smooth" });
        });




    });
});

function updateCounter(slider) {
    const images = slider.querySelectorAll(".project-images img");
    const currentIndex = parseInt(slider.getAttribute("data-current-index")) || 0;
    const counter = slider.querySelector(".image-counter");
    counter.textContent = `${currentIndex + 1} / ${images.length}`;
}

function changeSlide(index, element) {
    const slider = element.closest(".project-slider");
    const images = slider.querySelectorAll(".project-images img");
    const indicators = slider.querySelectorAll(".indicator");

    slider.setAttribute("data-current-index", index);
    images.forEach((img, i) => {
        img.style.display = i === index ? "block" : "none";
    });

    indicators.forEach((indicator) => {
        indicator.classList.remove("active");
    });

    element.classList.add("active");

    // Atualiza o contador
    updateCounter(slider);
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".project-slider").forEach((slider) => {
        const imagesContainer = slider.querySelector(".project-images");
        const images = imagesContainer.querySelectorAll("img");
        const indicatorsContainer = slider.querySelector(".project-indicators");
        const counter = slider.querySelector(".image-counter");
        const prevButton = slider.querySelector(".prev");
        const nextButton = slider.querySelector(".next");

        let currentIndex = 0;

        // Configuração inicial
        function updateSlider() {
            imagesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

            // Atualiza contador
            counter.textContent = `${currentIndex + 1} / ${images.length}`;

            // Atualiza bolinhas ativas
            indicatorsContainer.querySelectorAll(".indicator").forEach((indicator, index) => {
                indicator.classList.toggle("active", index === currentIndex);
            });
        }

        // Cria os indicadores (bolinhas)
        indicatorsContainer.innerHTML = "";
        images.forEach((_, index) => {
            const indicator = document.createElement("span");
            indicator.classList.add("indicator");
            if (index === 0) indicator.classList.add("active");
            indicator.addEventListener("click", () => {
                currentIndex = index;
                updateSlider();
            });
            indicatorsContainer.appendChild(indicator);
        });

        // Função para mover os slides
        function moveSlide(step) {
            currentIndex = (currentIndex + step + images.length) % images.length;
            updateSlider();
        }

        // Eventos dos botões de navegação
        prevButton.addEventListener("click", () => moveSlide(-1));
        nextButton.addEventListener("click", () => moveSlide(1));

        updateSlider(); // Atualiza a interface inicialmente
    });
});


