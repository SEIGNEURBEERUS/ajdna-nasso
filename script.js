/**
 * SCRIPTS D'INTERACTION - A.J.D.NA 2026
 * Gestion du menu, du filtrage des actions et des compteurs animés.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ====================================================== //
    // 1. GESTION DU MENU BURGER MOBILE                       //
    // ====================================================== //
    const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
   const primaryNav = document.querySelector(".nav-links");

    if (mobileNavToggle && primaryNav) {
        mobileNavToggle.addEventListener("click", () => {
            // Bascule l'affichage du menu et l'animation du bouton (X)
            primaryNav.classList.toggle("nav-open");
            mobileNavToggle.classList.toggle("is-active");
            
            // Empêche le défilement de la page quand le menu est ouvert
            document.body.classList.toggle("no-scroll");
        });

        // Fermer le menu si on clique sur un lien (pratique pour les ancres)
        const navLinks = document.querySelectorAll(".main-nav a");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                primaryNav.classList.remove("nav-open");
                mobileNavToggle.classList.remove("is-active");
                document.body.classList.remove("no-scroll");
            });
        });
    }

    // ====================================================== //
    // 2. FILTRAGE DES ACTIONS / PROJETS                      //
    // ====================================================== //
    const filtreBoutons = document.querySelectorAll('.btn-filter');
    const actionCartes = document.querySelectorAll('.produit-carte'); // On garde ta classe de carte

    if (filtreBoutons.length > 0) {
        filtreBoutons.forEach(bouton => {
            bouton.addEventListener('click', () => {
                // Gestion de l'état actif sur les boutons
                filtreBoutons.forEach(btn => btn.classList.remove('active'));
                bouton.classList.add('active');

                const categorieCible = bouton.getAttribute('data-categorie');

                actionCartes.forEach(carte => {
                    const carteCategorie = carte.getAttribute('data-categorie');
                    
                    // Logique d'affichage
                    if (categorieCible === 'tous' || carteCategorie === categorieCible) {
                        carte.style.display = "flex"; // On utilise flex pour garder la structure de la carte
                        setTimeout(() => {
                            carte.classList.remove('hidden');
                        }, 10);
                    } else {
                        carte.classList.add('hidden');
                        setTimeout(() => {
                            carte.style.display = "none";
                        }, 400); // Correspond à la durée de la transition CSS
                    }
                });
            });
        });
    }

    // ====================================================== //
    // 3. ANIMATION DES COMPTEURS (STATS)                     //
    // ====================================================== //
    const statsSection = document.querySelector('.stats-section');

    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 secondes pour atteindre le chiffre
            const step = target / (duration / 16); // Environ 60fps

            let currentCount = 0;

            const updateCount = () => {
                currentCount += step;
                if (currentCount < target) {
                    counter.innerText = Math.ceil(currentCount);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target;
                    // On ajoute le symbole "+" ou "%" après l'animation si nécessaire
                    if (target === 100) counter.innerText += "%";
                }
            };
            updateCount();
        });
    };

    // Intersection Observer : déclenche l'animation au défilement
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.unobserve(statsSection); // Ne l'anime qu'une seule fois
            }
        }, { threshold: 0.6 });

        observer.observe(statsSection);
    }

    // ====================================================== //
    // 4. PETIT PLUS : EFFET AU SCROLL SUR LE HEADER          //
    // ====================================================== //
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = "0.5rem 0";
            header.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
        } else {
            header.style.padding = "1rem 0";
            header.style.backgroundColor = "var(--color-white)";
        }
    });
});
