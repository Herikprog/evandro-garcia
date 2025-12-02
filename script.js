const bookingData = {
    services: [],
    totalPrice: 0,
    store: '',
    barber: '',
    barberName: '',
    name: '',
    email: '',
    phone: '',
    date: '',
    time: ''
};

// Dados das lojas e barbeiros
const storeData = {
    '1': {
        name: 'Loja 1 - Centro',
        address: 'Largo de Camões n3, 8000-140 Faro',
        calendarId: 'loja1.evandrogarcia@gmail.com',
        phone: '289 042 683',
        whatsapp: '925124104',
        hours: 'Seg-Sab: 9h às 21h',
        feature: 'Studio de Tatuagem incluso',
        barbers: [
            {
                id: '1',
                name: 'Evandro Garcia',
                photo: 'assets/barbers/evandro.jpg',
                specialty: 'Especialista em Cortes Clássicos',
                experience: '15 anos de experiência'
            },
            {
                id: '2', 
                name: 'Batista',
                photo: 'assets/barbers/batista.jpg',
                specialty: 'Mestre em Barbas',
                experience: '8 anos de experiência'
            },
            {
                id: '3',
                name: 'William',
                photo: 'assets/barbers/william.jpg',
                specialty: 'Estilista Moderno',
                experience: '6 anos de experiência'
            }
        ]
    },
    '2': {
        name: 'Loja 2 - Vale da Amoreira', 
        address: 'R. Vale da Amoreira, 8000-429 Faro',
        calendarId: 'loja2.evandrogarcia@gmail.com',
        phone: '',
        whatsapp: '928264445',
        hours: 'Todos os DIas: 9h às 20h',
        feature: 'SPA de Massagem incluso',
        barbers: [
            {
                id: '4',
                name: 'Gonçalo',
                photo: 'assets/barbers/goncalo.jpg',
                specialty: 'Especialista em Cortes Modernos',
                experience: '5 anos de experiência'
            }
        ]
    }
};

// ATUALIZE AQUI COM SUAS MÚSICAS LOCAIS
const musicPlaylist = [
    {
        title: "Float 2.0",
        artist: "Kairo Keyz",
        src: "assets/music/float.mp3"
    },
    {
        title: "Talvez você precise de mim",
        artist: "Veigh",
        src: "assets/music/vg1.mp3"
    },
    {
        title: "Premium Lounge",
        artist: "EVANDRO GARCIA",
        src: "assets/music/premium-lounge.mp3"
    },
    {
        title: "Golden Cuts",
        artist: "EVANDRO GARCIA",
        src: "assets/music/golden-cuts.mp3"
    }
];

// Variáveis do player de música
let currentMusicIndex = 0;
let isPlaying = false;
let audioElement = null;

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing app');
    checkMusicElements();
    initParticles();
    initCursor();
    initNavigation();
    initMusicPlayer();
    initGallery();
    initServices();
    initBooking();
    initScrollAnimations();
    initVideo();
    initSmoothScrolling();
});

function checkMusicElements() {
    console.log('🔍 Verificando elementos do player...');
    
    const elements = [
        'bg-music',
        'play-btn-navbar',
        'prev-btn-navbar',
        'next-btn-navbar',
        'music-disc-navbar',
        'progress-fill-navbar',
        'progress-bar-navbar',
        'current-time-navbar',
        'music-title-navbar',
        'play-icon-navbar',
        'pause-icon-navbar'
    ];
    
    elements.forEach(id => {
        const element = document.getElementById(id);
        console.log(`${id}:`, element ? '✅ Encontrado' : '❌ Não encontrado');
    });
}

function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function initCursor() {
    const cursorGlow = document.querySelector('.cursor-glow');
    if (!cursorGlow) return;
    
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
        cursorGlow.style.opacity = '0.6';
    });
    
    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });
}

function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (!navbar || !menuToggle || !navMenu) return;
    
    // Efeito de scroll na navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Toggle do menu mobile
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animar as barras do menu toggle
        const spans = menuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            
            // Resetar animação do menu toggle
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

function initMusicPlayer() {
    audioElement = document.getElementById('bg-music');
    if (!audioElement) {
        console.error('❌ Elemento de áudio não encontrado');
        return;
    }
    
    // Elementos do player da navbar
    const playBtn = document.getElementById('play-btn-navbar');
    const prevBtn = document.getElementById('prev-btn-navbar');
    const nextBtn = document.getElementById('next-btn-navbar');
    const musicDisc = document.getElementById('music-disc-navbar');
    const progressFill = document.getElementById('progress-fill-navbar');
    const progressBar = document.getElementById('progress-bar-navbar');
    const currentTimeEl = document.getElementById('current-time-navbar');
    const musicTitle = document.getElementById('music-title-navbar');
    const playIcon = document.getElementById('play-icon-navbar');
    const pauseIcon = document.getElementById('pause-icon-navbar');
    const musicPlayerContainer = document.querySelector('.music-player-integrated');
    
    console.log('🎵 Inicializando player de música...');
    console.log('📁 Playlist:', musicPlaylist);
    
    // Configurar volume inicial
    audioElement.volume = 0.7;
    
    // Carregar primeira música
    loadMusic(currentMusicIndex);
    
    // Event Listeners
    if (playBtn) {
        playBtn.addEventListener('click', togglePlay);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', playPrevious);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', playNext);
    }
    
    if (progressBar) {
        progressBar.addEventListener('click', seek);
    }
    
    if (musicDisc) {
        musicDisc.addEventListener('click', togglePlay);
    }
    
    // Atualizar progresso da música
    audioElement.addEventListener('timeupdate', updateProgress);
    audioElement.addEventListener('loadedmetadata', updateDuration);
    audioElement.addEventListener('ended', playNext);
    audioElement.addEventListener('error', handleAudioError);
    audioElement.addEventListener('canplay', handleCanPlay);
    
    // Funções do player
    function loadMusic(index) {
        if (index < 0) index = musicPlaylist.length - 1;
        if (index >= musicPlaylist.length) index = 0;
        
        currentMusicIndex = index;
        const music = musicPlaylist[index];
        
        console.log(`🎵 Carregando música ${index + 1}/${musicPlaylist.length}: ${music.title}`);
        console.log(`📂 Caminho: ${music.src}`);
        
        if (musicTitle) {
            musicTitle.textContent = music.title;
        }
        
        if (currentTimeEl) {
            currentTimeEl.textContent = '0:00';
        }
        
        if (progressFill) {
            progressFill.style.width = '0%';
        }
        
        // Resetar estado
        isPlaying = false;
        updatePlayButton();
        
        // Carregar nova música
        audioElement.src = music.src;
        
        // Tentar carregar a música
        audioElement.load();
    }
    
    function handleCanPlay() {
        console.log('✅ Música carregada e pronta para reprodução');
        // Tentar reproduzir automaticamente após carregar
        playMusic();
    }
    
    function playMusic() {
        console.log('▶️ Tentando reproduzir música...');
        
        audioElement.play().then(() => {
            console.log('✅ Música reproduzindo com sucesso');
            isPlaying = true;
            updatePlayButton();
            
            // Adicionar classe para animação do disco
            if (musicPlayerContainer) {
                musicPlayerContainer.classList.add('music-playing');
            }
            
        }).catch(error => {
            console.error('❌ Erro ao reproduzir:', error.name, error.message);
            
            // Se for erro de autoplay, esperar interação do usuário
            if (error.name === 'NotAllowedError') {
                console.log('⚠️ Autoplay bloqueado. Aguardando interação do usuário...');
                if (musicTitle) {
                    musicTitle.textContent = 'Clique para reproduzir';
                }
                
                // Adicionar listener para interação do usuário
                const playOnInteraction = () => {
                    console.log('👆 Usuário interagiu, tentando reproduzir...');
                    audioElement.play().then(() => {
                        isPlaying = true;
                        updatePlayButton();
                        if (musicPlayerContainer) musicPlayerContainer.classList.add('music-playing');
                        if (musicTitle) musicTitle.textContent = musicPlaylist[currentMusicIndex].title;
                    }).catch(e => {
                        console.error('❌ Ainda não foi possível reproduzir:', e);
                    });
                    
                    // Remover listeners após primeira interação
                    document.removeEventListener('click', playOnInteraction);
                    document.removeEventListener('touchstart', playOnInteraction, { passive: true });
                };
                
                document.addEventListener('click', playOnInteraction);
                document.addEventListener('touchstart', playOnInteraction, { passive: true });
            }
        });
    }
    
    function pauseMusic() {
        audioElement.pause();
        isPlaying = false;
        updatePlayButton();
        
        // Remover classe de animação do disco
        if (musicPlayerContainer) {
            musicPlayerContainer.classList.remove('music-playing');
        }
        
        console.log('⏸️ Música pausada');
    }
    
    function togglePlay() {
        console.log('🔄 Alternando reprodução. Estado atual:', isPlaying ? 'tocando' : 'pausado');
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    }
    
    function playPrevious() {
        console.log('⏮️ Mudando para música anterior');
        currentMusicIndex--;
        if (currentMusicIndex < 0) currentMusicIndex = musicPlaylist.length - 1;
        loadMusic(currentMusicIndex);
    }
    
    function playNext() {
        console.log('⏭️ Mudando para próxima música');
        currentMusicIndex++;
        if (currentMusicIndex >= musicPlaylist.length) currentMusicIndex = 0;
        loadMusic(currentMusicIndex);
    }
    
    function updatePlayButton() {
        if (playIcon && pauseIcon) {
            if (isPlaying) {
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
            } else {
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
            }
        }
    }
    
    function updateProgress() {
        if (!progressFill || !currentTimeEl) return;
        
        const currentTime = audioElement.currentTime;
        const duration = audioElement.duration;
        
        if (duration && !isNaN(duration)) {
            const progressPercent = (currentTime / duration) * 100;
            progressFill.style.width = `${progressPercent}%`;
            currentTimeEl.textContent = formatTime(currentTime);
        }
    }
    
    function updateDuration() {
        console.log(`⏱️ Duração da música: ${formatTime(audioElement.duration)}`);
    }
    
    function seek(e) {
        if (!progressBar || !audioElement.duration || isNaN(audioElement.duration)) return;
        
        const progressBarRect = progressBar.getBoundingClientRect();
        const clickPosition = (e.clientX - progressBarRect.left) / progressBarRect.width;
        const seekTime = audioElement.duration * Math.max(0, Math.min(1, clickPosition));
        
        if (!isNaN(seekTime)) {
            audioElement.currentTime = seekTime;
        }
    }
    
    function handleAudioError(e) {
        console.error('❌ Erro no elemento de áudio:', e.target.error);
        console.error('Código:', e.target.error.code, 'Mensagem:', e.target.error.message);
        
        // Tentar próxima música se esta falhar
        setTimeout(() => {
            console.log('🔄 Tentando próxima música devido a erro...');
            playNext();
        }, 1000);
    }
    
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Tentar iniciar música após um pequeno delay
    setTimeout(() => {
        console.log('🔄 Tentando iniciar música automaticamente...');
        // Primeiro carrega a música, depois tenta reproduzir
        loadMusic(currentMusicIndex);
    }, 500);
    
    console.log('🎵 Player de música inicializado com sucesso');
}

function initGallery() {
    const track = document.getElementById('gallery-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const items = document.querySelectorAll('.gallery-item');
    
    if (!track || !items.length) return;
    
    initGalleryVideos();
    
    let currentIndex = 0;
    let itemWidth = items[0].offsetWidth + 30;

    function updateCarousel() {
        const offset = -currentIndex * itemWidth;
        track.style.transform = `translateX(${offset}px)`;
        
        console.log(`Carrossel: índice ${currentIndex}, offset ${offset}px, largura item: ${itemWidth}px`);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentIndex < items.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        });
    }
    
    // Adicionar botões de play aos vídeos do carrossel
    addPlayButtonsToGalleryVideos();
    
    // Responsividade
    window.addEventListener('resize', () => {
        if (items.length > 0) {
            itemWidth = items[0].offsetWidth + 30;
            updateCarousel();
        }
    });
    
    // Inicializar
    updateCarousel();
    
    console.log(`Carrossel inicializado com ${items.length} itens`);
}

function initGalleryVideos() {
    const videos = document.querySelectorAll('.gallery-image-wrapper video');
    videos.forEach(video => {
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.autoplay = false;
        
        // Adicionar evento de clique no vídeo
        video.addEventListener('click', function(e) {
            e.stopPropagation();
            const wrapper = this.closest('.gallery-image-wrapper');
            const playBtn = wrapper.querySelector('.gallery-play-btn');
            
            if (this.paused) {
                this.play().then(() => {
                    if (playBtn) playBtn.style.opacity = '0';
                }).catch(error => {
                    console.error('Erro ao reproduzir vídeo:', error);
                });
            } else {
                this.pause();
                if (playBtn) playBtn.style.opacity = '1';
            }
        });
        
        // Esconder botão play quando vídeo começar
        video.addEventListener('play', function() {
            const wrapper = this.closest('.gallery-image-wrapper');
            const playBtn = wrapper.querySelector('.gallery-play-btn');
            if (playBtn) playBtn.style.opacity = '0';
        });
        
        // Mostrar botão play quando vídeo pausar
        video.addEventListener('pause', function() {
            const wrapper = this.closest('.gallery-image-wrapper');
            const playBtn = wrapper.querySelector('.gallery-play-btn');
            if (playBtn) playBtn.style.opacity = '1';
        });
        
        // Esconder botão play quando vídeo terminar
        video.addEventListener('ended', function() {
            const wrapper = this.closest('.gallery-image-wrapper');
            const playBtn = wrapper.querySelector('.gallery-play-btn');
            if (playBtn) playBtn.style.opacity = '1';
        });
    });
}

function addPlayButtonsToGalleryVideos() {
    const videoWrappers = document.querySelectorAll('.gallery-image-wrapper');
    
    videoWrappers.forEach(wrapper => {
        const video = wrapper.querySelector('video');
        if (!video) return;
        
        // Verificar se já existe botão de play
        let playBtn = wrapper.querySelector('.gallery-play-btn');
        
        if (!playBtn) {
            // Criar botão de play no estilo do vídeo da seção Ambiente
            playBtn = document.createElement('div');
            playBtn.className = 'gallery-play-btn video-play-btn';
            playBtn.innerHTML = `
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <circle cx="30" cy="30" r="30" fill="var(--secondary-gold)"/>
                    <path d="M24 18L36 30L24 42V18Z" fill="var(--primary-black)"/>
                </svg>
            `;
            
            wrapper.appendChild(playBtn);
            
            // Adicionar evento de clique
            playBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (video.paused) {
                    video.play().then(() => {
                        this.style.opacity = '0';
                    }).catch(error => {
                        console.error('Erro ao reproduzir vídeo:', error);
                    });
                } else {
                    video.pause();
                    this.style.opacity = '1';
                }
            });
        }
        
        // Configurar estilo inicial
        playBtn.style.position = 'absolute';
        playBtn.style.top = '50%';
        playBtn.style.left = '50%';
        playBtn.style.transform = 'translate(-50%, -50%)';
        playBtn.style.zIndex = '10';
        playBtn.style.transition = 'opacity 0.3s ease';
        playBtn.style.opacity = video.paused ? '1' : '0';
        playBtn.style.cursor = 'pointer';
    });
}

function initVideo() {
    const video = document.getElementById('ambiente-video');
    const playBtn = document.getElementById('video-play-btn');
    const videoWrapper = document.querySelector('.video-wrapper.vertical-video');
    
    if (!video || !playBtn || !videoWrapper) return;

    playBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        video.play().then(() => {
            videoWrapper.classList.add('playing');
        }).catch(error => {
            console.error('Erro ao reproduzir:', error);
        });
    });
    
    videoWrapper.addEventListener('click', function(e) {
        if (e.target === videoWrapper || e.target === video) {
            if (video.paused) {
                video.play().then(() => {
                    videoWrapper.classList.add('playing');
                });
            } else {
                video.pause();
                videoWrapper.classList.remove('playing');
            }
        }
    });
    
    video.addEventListener('pause', function() {
        videoWrapper.classList.remove('playing');
    });
    
    video.addEventListener('ended', function() {
        videoWrapper.classList.remove('playing');
        video.currentTime = 0;
    });
}

function initServices() {
    // Função mantida para compatibilidade
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card, .gallery-item, .section-header, .excelencia-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });
}

// Sistema de Agendamento (mantido igual)
function initBooking() {
    initializeServiceSelection();
    initializeStoreSelection();
    initializeBarberSelection();
    initializeCustomerForm();
    initializeDateTimeSelection();
    initializeNavigation();
    initializeConfirmation();
}

function initializeServiceSelection() {
    const serviceCards = document.querySelectorAll('.service-selection-card');
    const nextBtn = document.querySelector('.step-1 .booking-next-btn');

    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const service = card.dataset.service;
            const price = parseFloat(card.dataset.price);

            // Toggle selection
            card.classList.toggle('selected');
            
            // Update booking data
            if (card.classList.contains('selected')) {
                bookingData.services.push({ name: service, price: price });
            } else {
                bookingData.services = bookingData.services.filter(s => s.name !== service);
            }
            
            bookingData.totalPrice = bookingData.services.reduce((sum, s) => sum + s.price, 0);
            
            // Update button state
            if (nextBtn) {
                nextBtn.disabled = bookingData.services.length === 0;
            }

            console.log('✅ Serviços selecionados:', bookingData.services);
        });
    });
}

function initializeStoreSelection() {
    const storeCards = document.querySelectorAll('.store-selection-card');
    const nextBtn = document.querySelector('.step-2 .booking-next-btn');

    storeCards.forEach(card => {
        card.addEventListener('click', () => {
            const storeId = card.dataset.store;
            
            // Remove selection from all stores
            storeCards.forEach(c => c.classList.remove('selected'));
            
            // Add selection to clicked store
            card.classList.add('selected');
            
            // Update booking data
            bookingData.store = storeId;
            
            // Enable next button
            if (nextBtn) {
                nextBtn.disabled = false;
            }

            console.log('🏪 Loja selecionada:', storeId);
        });
    });
}

function initializeBarberSelection() {
    // Esta função será chamada quando a loja for selecionada
}

function loadBarbers(storeId) {
    const barberSelection = document.getElementById('barber-selection');
    const nextBtn = document.querySelector('.step-3 .booking-next-btn');
    
    if (!barberSelection) return;

    // Clear previous barbers
    barberSelection.innerHTML = '';
    
    const store = storeData[storeId];
    if (!store || !store.barbers) return;

    // Create barber cards
    store.barbers.forEach(barber => {
        const barberCard = document.createElement('div');
        barberCard.className = 'barber-selection-card';
        barberCard.innerHTML = `
            <img src="${barber.photo}" alt="${barber.name}" class="barber-photo" 
                 onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtZmFtaWx5PSJBcmlhbCI+QmFyYmVpcm88L3RleHQ+Cjwvc3ZnPgo='">
            <div class="barber-name">${barber.name}</div>
            <div class="barber-specialty">${barber.specialty}</div>
            <div class="barber-experience">${barber.experience}</div>
            <div class="selection-check"></div>
        `;

        // Add click event
        barberCard.addEventListener('click', () => {
            // Remove selection from all barbers
            document.querySelectorAll('.barber-selection-card').forEach(c => {
                c.classList.remove('selected');
            });
            
            // Add selection to clicked barber
            barberCard.classList.add('selected');
            
            // Update booking data
            bookingData.barber = barber.id;
            bookingData.barberName = barber.name;
            
            // Enable next button
            if (nextBtn) {
                nextBtn.disabled = false;
            }

            console.log('💈 Barbeiro selecionado:', barber.name);
        });

        barberSelection.appendChild(barberCard);
    });

    console.log(`✅ ${store.barbers.length} barbeiros carregados para a loja ${storeId}`);
}

function initializeCustomerForm() {
    const nameInput = document.getElementById('customer-name');
    const emailInput = document.getElementById('customer-email');
    const phoneInput = document.getElementById('customer-phone');
    const nextBtn = document.querySelector('.step-4 .booking-next-btn');

    function validateForm() {
        const nameValid = nameInput && nameInput.value.trim().length > 0;
        const emailValid = emailInput && emailInput.value.includes('@') && emailInput.value.includes('.');
        const phoneValid = phoneInput && phoneInput.value.trim().length > 0;
        
        if (nextBtn) {
            nextBtn.disabled = !(nameValid && emailValid && phoneValid);
        }

        // ATUALIZA OS DADOS EM TEMPO REAL
        if (nameInput) bookingData.name = nameInput.value.trim();
        if (emailInput) bookingData.email = emailInput.value.trim();
        if (phoneInput) bookingData.phone = phoneInput.value.trim();

        console.log('📝 Dados do cliente atualizados:', {
            name: bookingData.name,
            email: bookingData.email,
            phone: bookingData.phone
        });
    }

    // Event listeners para atualização em tempo real
    if (nameInput) {
        nameInput.addEventListener('input', validateForm);
        nameInput.addEventListener('blur', validateForm);
    }
    
    if (emailInput) {
        emailInput.addEventListener('input', validateForm);
        emailInput.addEventListener('blur', validateForm);
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('input', validateForm);
        phoneInput.addEventListener('blur', validateForm);
    }

    // Validação inicial
    validateForm();
}

function initializeDateTimeSelection() {
    const dateInput = document.getElementById('booking-date');
    const timeSlotsContainer = document.getElementById('time-slots');
    const nextBtn = document.querySelector('.step-5 .booking-next-btn');

    // Set minimum date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (dateInput) {
        dateInput.min = tomorrow.toISOString().split('T')[0];
    }

    if (dateInput) {
        dateInput.addEventListener('change', function() {
            bookingData.date = this.value;
            generateTimeSlots();
            updateStep5Button();
            console.log('📅 Data selecionada:', bookingData.date);
        });
    }

    function generateTimeSlots() {
        if (!timeSlotsContainer) return;
        
        timeSlotsContainer.innerHTML = '';
        // Horários das 9h às 20h (agora incluindo 20h)
        const timeSlots = [
            '09:00', '10:00', '11:00', '12:00', 
            '13:00', '14:00', '15:00', '16:00', 
            '17:00', '18:00', '19:00', '20:00'  // Adicionado 20:00
        ];

        timeSlots.forEach(time => {
            const slot = document.createElement('div');
            slot.className = 'time-slot';
            slot.textContent = time;
            
            slot.addEventListener('click', () => {
                // Remove selection from all slots
                document.querySelectorAll('.time-slot').forEach(s => {
                    s.classList.remove('selected');
                });
                
                // Add selection to clicked slot
                slot.classList.add('selected');
                
                // Update booking data
                bookingData.time = time;
                updateStep5Button();
                console.log('⏰ Horário selecionado:', bookingData.time);
            });
            
            timeSlotsContainer.appendChild(slot);
        });
    }

    function updateStep5Button() {
        if (nextBtn) {
            nextBtn.disabled = !(bookingData.date && bookingData.time);
            console.log('🔘 Botão step 5:', nextBtn.disabled ? 'desabilitado' : 'habilitado');
        }
    }

    // Initial setup
    generateTimeSlots();
}


function initializeNavigation() {
    // Next buttons
    document.querySelectorAll('.booking-next-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const currentStep = index + 1;
            const nextStep = currentStep + 1;
            
            console.log(`🔄 Navegando do step ${currentStep} para step ${nextStep}`);
            
            // Special handling for step 2 -> 3 (load barbers)
            if (currentStep === 2 && bookingData.store) {
                loadBarbers(bookingData.store);
            }
            
            // Special handling for step 5 -> 6 (update summary)
            if (currentStep === 5) {
                updateSummary();
            }
            
            navigateToStep(currentStep, nextStep);
        });
    });

    // Back buttons
    document.querySelectorAll('.booking-back-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const currentStep = getCurrentStep();
            const prevStep = currentStep - 1;
            console.log(`🔙 Voltando do step ${currentStep} para step ${prevStep}`);
            navigateToStep(currentStep, prevStep);
        });
    });

    function getCurrentStep() {
        const activeStep = document.querySelector('.booking-step.active');
        if (!activeStep) return 1;
        const stepClass = activeStep.className.split(' ').find(cls => cls.startsWith('step-'));
        return parseInt(stepClass.replace('step-', ''));
    }

    function navigateToStep(fromStep, toStep) {
        const currentStepEl = document.querySelector(`.step-${fromStep}`);
        const nextStepEl = document.querySelector(`.step-${toStep}`);
        const currentProgress = document.querySelector(`[data-step="${fromStep}"]`);
        const nextProgress = document.querySelector(`[data-step="${toStep}"]`);

        if (currentStepEl && nextStepEl) {
            currentStepEl.classList.remove('active');
            nextStepEl.classList.add('active');
        }

        if (currentProgress && nextProgress) {
            currentProgress.classList.remove('active');
            nextProgress.classList.add('active');
        }
    }
}

function initializeConfirmation() {
    const confirmBtn = document.querySelector('.booking-confirm-btn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', confirmBooking);
    }
}

function updateSummary() {
    console.log('📋 Atualizando resumo com dados:', bookingData);
    
    const elements = {
        service: document.getElementById('summary-service'),
        price: document.getElementById('summary-price'),
        store: document.getElementById('summary-store'),
        barber: document.getElementById('summary-barber'),
        name: document.getElementById('summary-name'),
        email: document.getElementById('summary-email'),
        phone: document.getElementById('summary-phone'),
        date: document.getElementById('summary-date'),
        time: document.getElementById('summary-time')
    };

    // Update service summary
    if (elements.service) {
        const serviceNames = bookingData.services.map(s => s.name).join(', ');
        elements.service.textContent = serviceNames || 'Nenhum serviço selecionado';
        console.log('✅ Serviços:', serviceNames);
    }

    // Update price
    if (elements.price) {
        elements.price.textContent = `€${(bookingData.totalPrice || 0).toFixed(2)}`;
        console.log('✅ Preço:', bookingData.totalPrice);
    }

    // Update store
    if (elements.store) {
        const storeName = storeData[bookingData.store]?.name || 'Loja não selecionada';
        elements.store.textContent = storeName;
        console.log('✅ Loja:', storeName, 'Store ID:', bookingData.store);
    }

    // Update barber
    if (elements.barber) {
        elements.barber.textContent = bookingData.barberName || 'Barbeiro não selecionado';
        console.log('✅ Barbeiro:', bookingData.barberName);
    }

    // Update customer info
    if (elements.name) {
        elements.name.textContent = bookingData.name || 'Não informado';
        console.log('✅ Nome:', bookingData.name);
    }
    
    if (elements.email) {
        elements.email.textContent = bookingData.email || 'Não informado';
        console.log('✅ Email:', bookingData.email);
    }
    
    if (elements.phone) {
        elements.phone.textContent = bookingData.phone || 'Não informado';
        console.log('✅ Telefone:', bookingData.phone);
    }

    // Update date and time
    if (elements.date && bookingData.date) {
        const date = new Date(bookingData.date);
        const formattedDate = date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
        elements.date.textContent = formattedDate;
        console.log('✅ Data:', formattedDate);
    } else if (elements.date) {
        elements.date.textContent = 'Data não selecionada';
    }
    
    if (elements.time) {
        elements.time.textContent = bookingData.time || 'Horário não selecionado';
        console.log('✅ Horário:', bookingData.time);
    }

    console.log('📋 Resumo completo atualizado');
}

async function confirmBooking() {
    const confirmBtn = document.querySelector('.booking-confirm-btn');
    if (!confirmBtn) return;

    console.log('📤 Iniciando confirmação do agendamento...');

    // Validate all data
    if (!bookingData.services.length || !bookingData.store || !bookingData.barber || 
        !bookingData.name || !bookingData.email || !bookingData.phone || 
        !bookingData.date || !bookingData.time) {
        
        const missingFields = [];
        if (!bookingData.services.length) missingFields.push('serviços');
        if (!bookingData.store) missingFields.push('loja');
        if (!bookingData.barber) missingFields.push('barbeiro');
        if (!bookingData.name) missingFields.push('nome');
        if (!bookingData.email) missingFields.push('email');
        if (!bookingData.phone) missingFields.push('telefone');
        if (!bookingData.date) missingFields.push('data');
        if (!bookingData.time) missingFields.push('horário');
        
        showErrorMessage(`Por favor, preencha todos os campos: ${missingFields.join(', ')}`);
        return;
    }

    const originalText = confirmBtn.textContent;
    confirmBtn.disabled = true;
    confirmBtn.innerHTML = '<span class="loading-spinner"></span>Processando...';

    try {
        console.log('🔄 Enviando dados para o servidor:', bookingData);
        
        const response = await fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData)
        });

        const result = await response.json();
        console.log('📨 Resposta do servidor:', result);

        if (result.success) {
            showSuccessMessage(result.message || 'Agendamento confirmado com sucesso!');
        } else {
            throw new Error(result.message || 'Erro no agendamento');
        }

    } catch (error) {
        console.error('❌ Erro na confirmação:', error);
        showErrorMessage(error.message);
    } finally {
        confirmBtn.disabled = false;
        confirmBtn.textContent = originalText;
    }
}

function showSuccessMessage(message) {
    const bookingSummary = document.querySelector('.booking-summary');
    const bookingButtons = document.querySelector('.booking-buttons');
    const confirmationMessage = document.getElementById('confirmation-message');
    const calendarStatus = document.getElementById('calendar-status');

    if (bookingSummary) bookingSummary.style.display = 'none';
    if (bookingButtons) bookingButtons.style.display = 'none';
    if (confirmationMessage) confirmationMessage.classList.add('show');
    if (calendarStatus) {
        calendarStatus.textContent = message;
        calendarStatus.innerHTML = message.replace(/\n/g, '<br>');
    }

    console.log('✅ Agendamento confirmado:', message);

    setTimeout(resetBooking, 5000);
}

function showErrorMessage(message) {
    const existingError = document.querySelector('.error-message');
    if (existingError) existingError.remove();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        background: #ff4444;
        color: white;
        padding: 15px;
        border-radius: 10px;
        margin: 20px 0;
        text-align: center;
        font-weight: bold;
    `;
    errorDiv.textContent = '❌ ' + message;

    const bookingContainer = document.querySelector('.booking-container');
    if (bookingContainer) {
        bookingContainer.insertBefore(errorDiv, bookingContainer.firstChild);
        setTimeout(() => errorDiv.remove(), 5000);
    }

    console.error('❌ Erro:', message);
}

function resetBooking() {
    console.log('🔄 Reiniciando formulário de agendamento...');

    // Reset booking data
    bookingData.services = [];
    bookingData.totalPrice = 0;
    bookingData.store = '';
    bookingData.barber = '';
    bookingData.barberName = '';
    bookingData.name = '';
    bookingData.email = '';
    bookingData.phone = '';
    bookingData.date = '';
    bookingData.time = '';

    // Reset UI selections
    document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
    
    // Reset form inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        if (input.type !== 'button' && input.type !== 'submit') {
            input.value = '';
        }
    });

    // Reset dynamic content
    const timeSlots = document.getElementById('time-slots');
    if (timeSlots) timeSlots.innerHTML = '';
    
    const barberSelection = document.getElementById('barber-selection');
    if (barberSelection) barberSelection.innerHTML = '';

    // Reset steps to first step
    document.querySelectorAll('.booking-step').forEach(step => step.classList.remove('active'));
    document.querySelector('.step-1').classList.add('active');
    
    document.querySelectorAll('.progress-step').forEach(step => step.classList.remove('active'));
    document.querySelector('[data-step="1"]').classList.add('active');

    // Show hidden elements
    const bookingSummary = document.querySelector('.booking-summary');
    const bookingButtons = document.querySelector('.booking-buttons');
    const confirmationMessage = document.getElementById('confirmation-message');
    
    if (bookingSummary) {
        bookingSummary.style.display = 'block';
        bookingSummary.style.opacity = '1';
    }
    if (bookingButtons) {
        bookingButtons.style.display = 'flex';
        bookingButtons.style.opacity = '1';
    }
    if (confirmationMessage) {
        confirmationMessage.classList.remove('show');
    }

    // Reset buttons
    document.querySelectorAll('.booking-next-btn').forEach(btn => {
        btn.disabled = true;
    });

    console.log('✅ Formulário reiniciado com sucesso');
}

// Loading spinner CSS
if (!document.querySelector('style[data-loading-spinner]')) {
    const style = document.createElement('style');
    style.setAttribute('data-loading-spinner', 'true');
    style.textContent = `
        .loading-spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid transparent;
            border-top: 2px solid currentColor;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-right: 8px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .error-message {
            background: #ff4444;
            color: white;
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            text-align: center;
            font-weight: bold;
            animation: fadeIn 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

console.log('✅ EVANDRO GARCIA - Sistema de agendamento carregado com sucesso!');
