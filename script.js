document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideCounter = document.getElementById('slideCounter');
    
    let currentSlide = 0;

    // TIMER
    let timerStarted = false;
    let timeRemaining = 15 * 60; // 15 minut
    const timerEl = document.getElementById('presentation-timer');

    function startTimer() {
        if (timerStarted || !timerEl) return;
        timerStarted = true;
        
        setInterval(() => {
            if (timeRemaining <= 0) return;
            
            timeRemaining--;
            const m = Math.floor(timeRemaining / 60);
            const s = timeRemaining % 60;
            timerEl.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
            
            // Ostrzeżenie na minutę przed końcem
            if (timeRemaining === 60) { 
                timerEl.classList.add('time-warning');
            }
            if (timeRemaining === 0) {
                timerEl.textContent = "00:00";
            }
        }, 1000);
    }

    function updateSlide() {
        // Usuń klasę active ze wszystkich i zatrzymaj wideo
        slides.forEach(slide => {
            slide.classList.remove('active');
            const videos = slide.querySelectorAll('video');
            videos.forEach(v => v.pause());
        });
        
        // Dodaj do obecnego i odtwórz wideo od początku
        slides[currentSlide].classList.add('active');
        const activeVideos = slides[currentSlide].querySelectorAll('video');
        activeVideos.forEach(v => {
            v.currentTime = 0;
            v.play().catch(e => console.log("Autoplay zablokowane:", e));
        });
        
        // Zaktualizuj licznik
        slideCounter.textContent = `${currentSlide + 1}/${slides.length}`;
        
        // Start timera od slajdu ze spisem treści (nr 2)
        if (currentSlide > 0) {
            startTimer();
        }
        
        // Zaktualizuj pasek postępu
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            const progress = (currentSlide / (slides.length - 1)) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }

    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            updateSlide();
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlide();
        }
    }

    // Eventy dla przycisków
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // żeby nie wywołać kliknięcia na ekran
        nextSlide();
    });
    
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        prevSlide();
    });

    // Sterowanie klawiaturą (wsparcie dla rysika Surface Pen: PageDown/PageUp)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter' || e.key === 'PageDown') {
            nextSlide();
        } else if (e.key === 'ArrowLeft' || e.key === 'Backspace' || e.key === 'PageUp') {
            prevSlide();
        }
    });

    // Sterowanie myszką (kliknięcie po lewej / prawej stronie ekranu)
    document.getElementById('presentation').addEventListener('click', (e) => {
        const clickX = e.clientX;
        const screenWidth = window.innerWidth;
        
        // Jeśli kliknięto w prawą połowę
        if (clickX > screenWidth / 2) {
            nextSlide();
        } else {
            prevSlide();
        }
    });

    // Inicjalizacja
    updateSlide();
});
