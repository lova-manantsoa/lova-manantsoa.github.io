document.addEventListener('DOMContentLoaded', () => {
    // Éléments de l'interface
    const intro = document.getElementById('intro');
    const mainContent = document.getElementById('main-content');
    const scrollContainer = document.querySelector('.scroll-container');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.scroll-section');
    const arrow = document.querySelector('.animated-arrow');
    
    // Animation d'introduction
    setTimeout(() => {
        intro.classList.add('fade-out');
        setTimeout(() => {
            intro.style.display = 'none';
            mainContent.classList.remove('hidden');
            mainContent.classList.add('visible');
            
            // Initialisation immédiate après l'affichage du contenu principal
            initializeContent();
            
            // Initialiser les particules après l'affichage du contenu
            initParticles();

            // Créer les points flottants de décoration
            createFloatingDots();
        }, 500);
    }, 2000); // Réduit le temps d'attente à 2 secondes
    
    // Fonction d'initialisation du contenu
    const initializeContent = () => {
        // Animer les formes d'arrière-plan
        initBackgroundShapes();
        
        // Ajouter des icônes flottantes sur la page compétences
        addFloatingIcons();

        // Configurer les observateurs après l'affichage du contenu
        setupObservers();
        
        // Mettre à jour le lien actif initialement
        updateActiveLink();
        
        // Ajouter l'événement sur la flèche d'animation
        if (arrow) {
            arrow.addEventListener('click', () => {
                const profilSection = document.getElementById('profil');
                if (profilSection) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = profilSection.offsetTop - navHeight;
                    
                    scrollContainer.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }

        // Ajouter l'effet de suivi de la souris pour tous les écrans
        document.addEventListener('mousemove', mouseFollowEffect);
    };

    // Fonction pour créer les points flottants décoratifs
    const createFloatingDots = () => {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'floating-dots-container';
        document.body.appendChild(dotsContainer);

        // Créer 50 points flottants
        for (let i = 0; i < 50; i++) {
            const dot = document.createElement('div');
            dot.className = 'floating-dots';
            
            // Position aléatoire
            dot.style.left = `${Math.random() * 100}vw`;
            dot.style.top = `${Math.random() * 100}vh`;
            
            // Taille aléatoire
            const size = 2 + Math.random() * 4;
            dot.style.width = `${size}px`;
            dot.style.height = `${size}px`;
            
            // Opacité et couleur aléatoire
            dot.style.opacity = 0.05 + Math.random() * 0.1;
            
            // Assignation d'une couleur aléatoire
            const colors = ['#3C6E9C', '#42A5A5', '#7E57C2', '#5C6BC0', '#FF7043'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            dot.style.backgroundColor = randomColor;
            
            // Vitesse d'animation aléatoire
            const duration = 10 + Math.random() * 20;
            dot.style.animation = `floatDot ${duration}s linear infinite`;
            
            // Délai d'animation aléatoire
            dot.style.animationDelay = `${Math.random() * duration}s`;
            
            dotsContainer.appendChild(dot);
        }
    };

    // Fonction pour ajouter des icônes flottantes sur la page compétences
    const addFloatingIcons = () => {
        const competencesContainer = document.querySelector('#competences .competences-container');
        if (competencesContainer) {
            // Ajouter quelques icônes décoratives flottantes
            const icons = ['fas fa-code', 'fas fa-server', 'fas fa-network-wired', 'fas fa-shield-alt'];
            const colors = ['#3C6E9C', '#42A5A5', '#7E57C2', '#FF7043'];
            
            icons.forEach((iconClass, index) => {
                const icon = document.createElement('i');
                icon.className = `${iconClass} floating-icon`;
                icon.style.animationDelay = `${index * 2}s`;
                icon.style.color = colors[index % colors.length];
                
                competencesContainer.appendChild(icon);
            });
        }
    };

    // Effet de suivi de souris subtil
    const mouseFollowEffect = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Sélectionner tous les éléments qui réagiront au mouvement de la souris
        const shapesElems = document.querySelectorAll('.shape');
        
        shapesElems.forEach(shape => {
            // Calculer le facteur de mouvement (plus petit pour un effet plus subtil)
            const moveX = (mouseX - window.innerWidth / 2) * 0.01;
            const moveY = (mouseY - window.innerHeight / 2) * 0.01;
            
            // Appliquer la transformation avec transition
            shape.style.transition = 'transform 0.8s ease-out';
            shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    };

    // Fonction pour animer les formes d'arrière-plan
    const initBackgroundShapes = () => {
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            // Définir taille et position en fonction de l'index
            const size = 100 + (index * 50);
            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;
            
            // Positionner les formes à des endroits différents de l'écran
            switch(index) {
                case 0:
                    shape.style.top = '10%';
                    shape.style.left = '5%';
                    break;
                case 1:
                    shape.style.top = '60%';
                    shape.style.right = '10%';
                    break;
                case 2:
                    shape.style.top = '30%';
                    shape.style.right = '20%';
                    break;
                case 3:
                    shape.style.bottom = '15%';
                    shape.style.left = '20%';
                    break;
                case 4:
                    shape.style.top = '5%';
                    shape.style.right = '5%';
                    break;
                default:
                    shape.style.top = '50%';
                    shape.style.left = '50%';
            }
            
            // Animation aléatoire
            const randomPosition = () => {
                const translateX = Math.random() * 20 - 10;
                const translateY = Math.random() * 20 - 10;
                const rotate = Math.random() * 360;
                shape.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`;
            };
            
            // Animation initiale
            randomPosition();
            
            // Animation continue avec un intervalle différent pour chaque forme
            setInterval(randomPosition, 5000 + (index * 1000));
        });
    };
    
    // Fonction d'initialisation des particules - Avec couleurs vibrantes
    const initParticles = () => {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 80,
                        "density": {
                            "enable": true,
                            "value_area": 900
                        }
                    },
                    "color": {
                        "value": ["#3C6E9C", "#42A5A5", "#7E57C2", "#5C6BC0", "#FF7043", "#FFB74D"]
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        }
                    },
                    "opacity": {
                        "value": 0.6,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 0.8,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 2,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#3C6E9C",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": true,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": true,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "line_linked": {
                                "opacity": 0.8
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            });
        }
    };
    
    // Mise à jour du lien actif lors du défilement
    const updateActiveLink = () => {
        let currentSection = '';
        let smallestDistance = Infinity;
        
        // Approche améliorée pour déterminer la section active
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const distance = Math.abs(rect.top);
            
            // Sélectionner la section la plus proche du haut de la fenêtre
            if (distance < smallestDistance) {
                smallestDistance = distance;
                currentSection = section.getAttribute('id');
            }
        });
        
        // Mise à jour des classes active
        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    };
    
    // Configurer les observateurs
    const setupObservers = () => {
        // Observer les cartes pour les animations
        const cardObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        
                        // Ajouter une animation spéciale pour les compétences
                        if (entry.target.classList.contains('competence-card')) {
                            const items = entry.target.querySelectorAll('.competence-list li');
                            items.forEach((item, index) => {
                                item.style.opacity = '0';
                                item.style.transform = 'translateX(-20px)';
                                
                                setTimeout(() => {
                                    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                                    item.style.opacity = '1';
                                    item.style.transform = 'translateX(0)';
                                }, 100 * index);
                            });
                        }
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: "-10% 0px"
            }
        );
        
        // Observer toutes les cartes (profil, compétences, contact, etc.)
        document.querySelectorAll('.profil-card, .competence-card, .projet-card, .epreuve-card, .contact-card').forEach(card => {
            cardObserver.observe(card);
        });
        
        // Observer les situations professionnelles pour animation
        const situationObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '0';
                        entry.target.style.transform = 'translateX(-20px)';
                        
                        setTimeout(() => {
                            entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateX(0)';
                        }, 200);
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: "-10% 0px"
            }
        );
        
        // Observer toutes les situations
        document.querySelectorAll('.situation-item').forEach((item, index) => {
            // Délai progressif pour chaque élément
            setTimeout(() => {
                situationObserver.observe(item);
            }, 100 * index);
        });
        
        // Observer les titres de sections pour les animations
        const titleObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-title');
                    }
                });
            },
            {
                threshold: 0.5
            }
        );
        
        // Observer tous les titres de sections
        document.querySelectorAll('.scroll-section h1').forEach(title => {
            titleObserver.observe(title);
        });
        
        // Observer les sections pour mettre à jour la navigation
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                // Mettre à jour le lien actif lors du changement de section
                if (entries.some(entry => entry.isIntersecting)) {
                    updateActiveLink();
                    
                    // Animer la section active
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('active-section');
                            
                            // Ajouter des particules uniquement à la section active
                            if (entry.target.id === 'accueil') {
                                document.querySelectorAll('.shape').forEach(shape => {
                                    shape.style.opacity = '0.3';
                                });
                            } else {
                                document.querySelectorAll('.shape').forEach(shape => {
                                    shape.style.opacity = '0.15';
                                });
                            }
                        } else {
                            entry.target.classList.remove('active-section');
                        }
                    });
                }
            },
            {
                threshold: 0.4,
                rootMargin: "-5% 0px"
            }
        );
        
        // Observer toutes les sections
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    };
    
    // Événement de défilement avec limitation de débit
    let scrollTimeout;
    scrollContainer.addEventListener('scroll', () => {
        // Annuler le précédent timeout pour éviter trop d'appels
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        // Parallax effect pour l'arrière-plan
        const scrollY = scrollContainer.scrollTop;
        document.querySelectorAll('.shape').forEach((shape, index) => {
            const speed = 0.05 + (index * 0.01);
            const yPos = scrollY * speed;
            shape.style.transform = `translateY(${yPos}px)`;
        });
        
        // Mettre à jour après un court délai pour améliorer les performances
        scrollTimeout = setTimeout(() => {
            updateActiveLink();
        }, 50);
    });
    
    // Navigation fluide avec correction de position
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Correction de la position de défilement pour compenser la barre de navigation
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                scrollContainer.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Mettre à jour les liens actifs après le défilement
                setTimeout(() => {
                    updateActiveLink();
                }, 700);
            }
        });
    });

    // Ajouter des animations au survol pour les éléments interactifs
    document.addEventListener('mouseover', function(e) {
        // Animation au survol des cartes
        if (e.target.closest('.profil-card, .competence-card, .projet-card, .epreuve-card, .contact-card')) {
            const card = e.target.closest('.profil-card, .competence-card, .projet-card, .epreuve-card, .contact-card');
            card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        }
        
        // Animation au survol des liens
        if (e.target.closest('a') && !e.target.closest('.nav-links a')) {
            const link = e.target.closest('a');
            link.style.transition = 'transform 0.3s ease, color 0.3s ease';
        }
    });
});