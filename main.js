//===================clicking functions===================

const stickerContainer = document.getElementById('sticker-clicks');
const images = Array.from(stickerContainer.getElementsByTagName('img'));
let currentIndex = 0;
let shuffledImages = [];
let timeoutId = null;
let isMouseDown = false;
let zIndexCounter = 3000;

function shuffleImages() {
    shuffledImages = [...images].sort(() => Math.random() - 0.5);
}

function hideAllImages() {
    images.forEach(img => {
        img.classList.add('hidden');
        setTimeout(() => {
            img.style.display = 'none';
        }, 500);
    });
    currentIndex = 0;
    zIndexCounter = 3000; 
}

function showNextImage(event) {
    // Allow stickers to appear everywhere except on the navbar and bottom-image
    if (!event.target.closest('.navbar') && !event.target.closest('.bottom-image')) {
        if (currentIndex === shuffledImages.length) {
            hideAllImages();
            shuffleImages();
        } else {
            const img = shuffledImages[currentIndex];
            const clickX = event.clientX;
            const clickY = event.clientY;

            img.style.left = `${clickX - img.offsetWidth / 2}px`;
            img.style.top = `${clickY - img.offsetHeight / 2}px`;
            img.style.zIndex = zIndexCounter++; 
            img.style.display = 'block';
            img.classList.remove('hidden');

            currentIndex++;

            clearTimeout(timeoutId);

            if (!isMouseDown) {
                timeoutId = setTimeout(() => {
                    hideAllImages();
                    shuffleImages();
                }, 5000);
            }
        }
    }
}


document.addEventListener('mousedown', (event) => {
    isMouseDown = true;
    showNextImage(event);
    clearTimeout(timeoutId);
});

document.addEventListener('mouseup', () => {
    isMouseDown = false;
    timeoutId = setTimeout(() => {
        hideAllImages();
        shuffleImages();
    }, 2000);
});

shuffleImages();

const cursor = document.getElementById('cursor');
const circleText = document.getElementById('circle-text');

document.addEventListener('mousemove', function (event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';

    circleText.style.left = (mouseX - circleText.offsetWidth / 2) + 'px';
    circleText.style.top = (mouseY - circleText.offsetHeight / 2) + 'px';
});



const closeMenuButton = document.querySelectorAll('.close-menu'); 
const sideMenu = document.querySelector('.side-menu');
const menuIcon = document.querySelector('#menuIcon'); 


const openMenu = () => {
    sideMenu.classList.add('open');
    sideMenu.classList.remove('hidden');
};


const closeMenu = () => {
    sideMenu.classList.remove('open');
    sideMenu.classList.add('hidden');
};

menuIcon.addEventListener('click', openMenu);
closeMenuButton.forEach(button => button.addEventListener('click', closeMenu));

//=====================vertical scroll======================
$(document).ready(function() {
    const cards = $('.card');
    const cardHeight = cards.first().outerHeight();
    const windowHeight = $(window).height();
    const offset = 100; 

    // Set initial positions
    cards.each(function(index) {
        $(this).css({
            position: 'sticky',
            top: index * 50 + 'px', 
            'z-index': cards.length + index
        });
    });

    $(window).on('scroll', function() {
        const scrollTop = $(window).scrollTop();

        cards.each(function(index) {
            const card = $(this);
            const cardTop = card.offset().top;
            const cardBottom = cardTop + cardHeight;

            if (scrollTop + windowHeight > cardTop + offset && scrollTop < cardBottom) {
                const progress = (scrollTop + windowHeight - cardTop - offset) / (windowHeight + cardHeight);
                const translateY = Math.max(0, Math.min(1, progress)) * (index * 50); // Adjust this value to match the top offset

                card.css('transform', `translateY(-${translateY}px)`);
            } else if (scrollTop + windowHeight <= cardTop + offset) {
                card.css('transform', 'translateY(0)');
            }
        });
    });
});
//=============cards section================



  document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Card 2 - Image Animation
    const images = document.querySelectorAll("#card-2 .card-body img");

    gsap.fromTo(
      images,
      {
        opacity: 0,      
        y: 50,
      },
      {
        opacity: 1,   
        y: 0,           
        stagger: 0.2,   
        duration: 1.2,   
        ease: "power4.out", 
        scrollTrigger: {
          trigger: "#card-2",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none play none none",
          once: false,
          onEnter: () => {
            gsap.fromTo(
              images,
              {
                opacity: 0,
                y: 50,
              },
              {
                opacity: 1,
                y: 0,
                stagger: 0.2,
                duration: 1.2,
                ease: "power4.out",
              }
            );
          },
          onLeaveBack: () => {
            gsap.to(images, {
              opacity: 0.5,
              y: -30,
              stagger: 0.1,
              duration: 0.8,
              ease: "power4.in",
            });
          },
        },
      }
    );

    // Card 3 - Text Animation (Heading and Paragraph)
    const card3Text = document.querySelectorAll("#card-3 .card-body h2, #card-3 .card-body p");

    gsap.from(card3Text, {
      opacity: 0,   
      y: 100,          
      stagger: 0.5,     
      duration: 1.8,      
      ease: "power2.out",    
      scrollTrigger: {
        trigger: "#card-3",    
        start: "top 75%",    
        end: "bottom 20%",
        toggleActions: "play none play none", 
        once: false, 
      },
    });

    // Card 4 - Text Animation (Heading and Paragraph)
    const card4Heading = document.querySelector("#card-4 .card-body h2");
    const card4Paragraph = document.querySelector("#card-4 .card-body p");

    // Heading Animation: Scale, Fade, and Drop-in Effect
    gsap.from(card4Heading, {
      opacity: 0,           
      scale: 0.8,             
      y: -50,               
      duration: 1.5,          
      ease: "elastic.out(1, 0.5)", 
      scrollTrigger: {
        trigger: "#card-4",
        start: "top 75%",
        toggleActions: "play none play none",
        once: false,  
      },
    });

    // Paragraph Animation: Fade-in with Horizontal Slide
    gsap.from(card4Paragraph, {
      opacity: 0,       
      x: 100,    
      delay: 0.3,            
      duration: 1.5,       
      ease: "power2.out",      
      scrollTrigger: {
        trigger: "#card-4",
        start: "top 80%",   
        toggleActions: "play none play none", 
        once: false, 
      },
    });

    // Card 5 - Text Animation (Heading and Paragraph)
    const card5Heading = document.querySelector("#card-5 .card-body h2");
    const card5Paragraph = document.querySelector("#card-5 .card-body p");

    // Heading Animation: Drop with hesitation
    gsap.from(card5Heading, {
      opacity: 0,              
      y: -100,               
      duration: 1.8,          
      ease: "bounce.out",    
      scrollTrigger: {
        trigger: "#card-5",
        start: "top 75%",
        toggleActions: "play none play none", 
        once: false,  
      },
    });

    // Paragraph Animation: Follows the heading with a softer drop
    gsap.from(card5Paragraph, {
      opacity: 0,              
      y: -80,  
      duration: 1.5,       
      ease: "power4.out",     
      delay: 0.3,
      scrollTrigger: {
        trigger: "#card-5",
        start: "top 75%",     
        toggleActions: "play none play none", 
        once: false,  
      },
    });
  });


  let card2 = document.getElementById('card-2');
let card2Mid = card2.offsetTop + card2.offsetHeight / 2; 

window.onscroll = function() {
  let scrollPosition = window.scrollY + window.innerHeight; 

  if (scrollPosition >= card2Mid) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled'); 
  }
};

const scrollIndicator = document.querySelector('.scroll.indicator'); 

// Listen for the scroll event
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        scrollIndicator.classList.add('hidden'); 
    } else {
        scrollIndicator.classList.remove('hidden'); 
    }
});


//=============footer section================
function toggleHelp() {
    const helpText = document.querySelectorAll('.help-text');
    helpText.forEach(p => {
        p.style.display = p.style.display === 'block' ? 'none' : 'block';
    });
}
function toggleSecurity() {
    const securityText = document.querySelectorAll('.security-text');
    securityText.forEach(p => {
        p.style.display = p.style.display === 'block' ? 'none' : 'block';
    });
}

function toggleContact() {
    const contactText = document.querySelectorAll('.contact-text');
    contactText.forEach(p => {
        p.style.display = p.style.display === 'block' ? 'none' : 'block';
    });
}

//===========================

