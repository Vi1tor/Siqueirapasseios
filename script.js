// ============================================
// MENU MOBILE
// ============================================

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ============================================
// HEADER SCROLL
// ============================================

const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============================================
// ACTIVE LINK ON SCROLL
// ============================================

const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignora âncoras vazias
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// LIGHTBOX GALERIA
// ============================================

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

function openLightbox(imageSrc) {
    lightbox.style.display = 'flex';
    lightboxImg.src = imageSrc;
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Fecha lightbox ao clicar fora da imagem
lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        closeLightbox();
    }
});

// Fecha lightbox com tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// ============================================
// FORMULÁRIO DE RESERVA (WhatsApp)
// ============================================

const reservaForm = document.getElementById('reservaForm');

if (reservaForm) {
    reservaForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Coleta dados do formulário
        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const email = document.getElementById('email').value;
        const data = document.getElementById('data').value;
        const pessoas = document.getElementById('pessoas').value;
        const passeio = document.getElementById('passeio').value;
        const mensagem = document.getElementById('mensagem').value;

        // Mapeamento dos passeios
        const passeiosMap = {
            'jeep-offroad': 'Jeep 4x4 Off-Road',
            'tour-completo': 'Tour Completo - Pontos Turísticos',
            'personalizado': 'Passeio Personalizado'
        };
        
        const passeioTexto = passeiosMap[passeio] || passeio;

        // Formata a data
        const dataFormatada = new Date(data).toLocaleDateString('pt-BR');

        // Monta mensagem do WhatsApp
        let whatsappMessage = `*Nova Solicitação de Reserva - SIQUEIRA PASSEIOS*%0A%0A`;
        whatsappMessage += `👤 *Nome:* ${nome}%0A`;
        whatsappMessage += `📱 *Telefone:* ${telefone}%0A`;
        if (email) whatsappMessage += `📧 *E-mail:* ${email}%0A`;
        whatsappMessage += `📅 *Data:* ${dataFormatada}%0A`;
        whatsappMessage += `👥 *Pessoas:* ${pessoas}%0A`;
        whatsappMessage += `🚙 *Passeio:* ${passeioTexto}%0A`;
        if (mensagem) whatsappMessage += `💬 *Mensagem:* ${mensagem}%0A`;

        // Número do WhatsApp (formato internacional)
        const whatsappNumber = '5535991103569';

        // Abre WhatsApp
        window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');

        // Limpa formulário
        reservaForm.reset();

        // Feedback visual
        alert('✅ Sua solicitação está sendo encaminhada via WhatsApp! Em instantes você será redirecionado para completar o envio.');
    });
}

// ============================================
// VALIDAÇÃO E MÁSCARAS DE FORMULÁRIO
// ============================================

// Impede seleção de datas passadas
const dataInput = document.getElementById('data');
if (dataInput) {
    const hoje = new Date().toISOString().split('T')[0];
    dataInput.setAttribute('min', hoje);
}

// Máscara de telefone
const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
    telefoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        }
        
        e.target.value = value;
    });
}

// ============================================
// ANIMAÇÕES AOS (Animate On Scroll)
// ============================================

function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', initAOS);

// ============================================
// CONTADOR DE ESTATÍSTICAS
// ============================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Observa quando os contadores entram na tela
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = entry.target.textContent.replace(/\D/g, '');
            const suffix = entry.target.textContent.replace(/\d/g, '');
            
            animateCounter(entry.target, parseInt(target), 2000);
            
            // Reaplica o sufixo após a animação
            setTimeout(() => {
                entry.target.textContent = target + suffix;
            }, 2000);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ============================================
// LAZY LOADING DE IMAGENS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    let loadedCount = 0;
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        img.addEventListener('load', () => {
            img.classList.add('loaded');
            img.style.opacity = '1';
            loadedCount++;
            
            // Log quando todas as imagens carregarem
            if (loadedCount === images.length) {
                console.log(`🖼️ Todas as ${images.length} imagens carregadas com sucesso!`);
            }
        });
        
        // Para imagens já carregadas no cache
        if (img.complete) {
            img.classList.add('loaded');
            img.style.opacity = '1';
            loadedCount++;
        }
    });
});

// ============================================
// PROTEÇÃO CONTRA SUBMIT MÚLTIPLO
// ============================================

let formSubmitting = false;

if (reservaForm) {
    reservaForm.addEventListener('submit', (e) => {
        if (formSubmitting) {
            e.preventDefault();
            return false;
        }
        formSubmitting = true;
        
        // Reseta após 3 segundos
        setTimeout(() => {
            formSubmitting = false;
        }, 3000);
    });
}

// ============================================
// DETECÇÃO DE DISPOSITIVO MOBILE
// ============================================

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobile()) {
    document.body.classList.add('is-mobile');
}

// ============================================
// BARRA DE PROGRESSO DE LEITURA
// ============================================

function updateReadingProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.pageYOffset;
    const progress = (scrolled / documentHeight) * 100;
    
    const progressBar = document.querySelector('.reading-progress');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
}

window.addEventListener('scroll', debounce(updateReadingProgress, 10));

// ============================================
// BOTÃO SCROLL TO TOP
// ============================================

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

let scrollTopBtn = null;

function createScrollTopButton() {
    scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.setAttribute('aria-label', 'Voltar ao topo');
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 998;
        font-size: 1.25rem;
    `;
    
    scrollTopBtn.addEventListener('click', scrollToTop);
    document.body.appendChild(scrollTopBtn);
}

document.addEventListener('DOMContentLoaded', createScrollTopButton);

window.addEventListener('scroll', () => {
    if (scrollTopBtn) {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    }
});

// ============================================
// LAZY LOADING NATIVO
// ============================================

if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback para navegadores antigos
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ============================================
// ANALYTICS E TRACKING
// ============================================

function trackEvent(category, action, label) {
    // Google Analytics (se configurado)
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    console.log(`📊 Evento rastreado: ${category} - ${action} - ${label}`);
}

// Rastreia cliques em botões de conversão
document.querySelectorAll('a[href*="contato"], .btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('Conversao', 'Clique', 'Botao Reserva');
        
        // Feedback visual
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 200);
    });
});

// Rastreia cliques no WhatsApp
document.querySelectorAll('a[href*="wa.me"]').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('Contato', 'Clique', 'WhatsApp');
    });
});

// Rastreia visualização da seção de preços
const precosSection = document.querySelector('.precos');
if (precosSection) {
    const precosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                trackEvent('Engajamento', 'Visualizacao', 'Secao Precos');
                precosObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    precosObserver.observe(precosSection);
}

// Rastreia tempo na página
let timeOnPage = 0;
setInterval(() => {
    timeOnPage += 30;
    if (timeOnPage === 30) trackEvent('Engajamento', 'Tempo', '30 segundos');
    if (timeOnPage === 60) trackEvent('Engajamento', 'Tempo', '1 minuto');
    if (timeOnPage === 180) trackEvent('Engajamento', 'Tempo', '3 minutos');
}, 30000);

// ============================================
// CONSOLE BRANDING
// ============================================

console.log('%c🚙 SIQUEIRA PASSEIOS 🏔️', 'font-size: 20px; color: #2d5016; font-weight: bold;');
console.log('%cSite desenvolvido com ❤️ para aventureiros!', 'font-size: 14px; color: #f4a621;');
console.log('%c📱 WhatsApp: (35) 9110-3569', 'font-size: 12px; color: #25d366;');

// ============================================
// ERROR TRACKING
// ============================================

window.addEventListener('error', (e) => {
    console.error('Erro capturado:', e.error);
    // Aqui você pode enviar para um serviço de logging como Sentry
});

// ============================================
// DEBOUNCE HELPER
// ============================================

function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('scroll', debounce(updateActiveLink, 50));

// ============================================
// FAQ ACCORDION
// ============================================

const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Fecha todas as outras perguntas
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Abre a pergunta clicada se não estava ativa
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ============================================
// CONTADOR DE PESSOAS ONLINE
// ============================================

function updateOnlineCount() {
    const onlineCountElement = document.getElementById('onlineCount');
    if (onlineCountElement) {
        // Simula entre 8 e 18 pessoas online
        const count = Math.floor(Math.random() * 11) + 8;
        onlineCountElement.textContent = count;
    }
}

// Atualiza a cada 10 segundos
setInterval(updateOnlineCount, 10000);

// ============================================
// EFEITO PARALLAX NO HERO
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled <= window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ============================================
// EFEITO 3D NOS CARDS
// ============================================

const cards = document.querySelectorAll('.passeio-card, .preco-card, .ponto-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ============================================
// NOTIFICAÇÃO DE DESCONTO POPUP
// ============================================

function showDiscountNotification() {
    // Verifica se já foi mostrado nesta sessão
    if (sessionStorage.getItem('discountShown')) return;
    
    setTimeout(() => {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 20px;
            background: linear-gradient(135deg, #2d5016, #4a7c22);
            color: white;
            padding: 1.5rem;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 998;
            max-width: 300px;
            animation: slideInLeft 0.5s ease;
        `;
        
        notification.innerHTML = `
            <button style="position: absolute; top: 10px; right: 10px; background: none; border: none; color: white; font-size: 1.25rem; cursor: pointer;" onclick="this.parentElement.remove()">&times;</button>
            <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem;">🎉 Desconto Especial!</h4>
            <p style="margin: 0; font-size: 0.9rem; line-height: 1.5;">Reserve hoje e ganhe <strong>25% OFF</strong> em qualquer passeio!</p>
            <a href="#contato" style="display: inline-block; margin-top: 1rem; background: white; color: #2d5016; padding: 0.5rem 1rem; border-radius: 50px; font-weight: 600; text-decoration: none; font-size: 0.9rem;" onclick="this.parentElement.remove()">Aproveitar Agora</a>
        `;
        
        document.body.appendChild(notification);
        sessionStorage.setItem('discountShown', 'true');
        
        // Adiciona animação CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInLeft {
                from { transform: translateX(-400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        // Remove automaticamente após 15 segundos
        setTimeout(() => {
            notification.style.animation = 'slideInLeft 0.5s ease reverse';
            setTimeout(() => notification.remove(), 500);
        }, 15000);
    }, 5000); // Aparece após 5 segundos
}

// Ativa apenas em desktop
if (!isMobile()) {
    document.addEventListener('DOMContentLoaded', showDiscountNotification);
}

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Site carregado com sucesso!');
    
    // Animação de entrada suave
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Inicializa contador online
    updateOnlineCount();
    
    // Easter egg no console
    console.log('%c\n🏞️ Descubra Monte Verde! 🏞️', 'font-size: 24px; color: #2d5016; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
    console.log('%c🚙 A melhor aventura em Jeep 4x4!', 'font-size: 16px; color: #f4a621; font-weight: bold;');
    console.log('%c📞 Reserve agora: (35) 9110-3569', 'font-size: 14px; color: #25d366;');
});

// ============================================
// SERVICE WORKER (PWA - Opcional)
// ============================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Descomente para ativar PWA
        // navigator.serviceWorker.register('/sw.js');
    });
}
