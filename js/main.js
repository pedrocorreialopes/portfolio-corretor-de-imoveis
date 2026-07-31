/**
 * EDSON MENDES DA SILVA - PORTFÓLIO DE CORRETOR DE IMÓVEIS
 * JavaScript principal - Mobile First, Acessível, Performance
 */

(function () {
  'use strict';

  /* =========================================================
     CONFIGURAÇÕES GLOBAIS
     ========================================================= */
  const CONFIG = {
    whatsappNumber: '5585987654321',
    whatsappMessage: 'Olá, Edson! Vim pelo site e gostaria de saber mais sobre os imóveis.',
    email: 'contato@edsonmendesimoveis.com.br',
    phone: '+55 85 98765-4321',
    apiBase: 'tables/',
    tables: {
      properties: 'properties',
      appointments: 'appointments',
      testimonials: 'testimonials',
      contacts: 'contacts',
      newsletter: 'newsletter'
    }
  };

  // Dados de fallback para preview/offline (quando a API ainda não está disponível)
  const FALLBACK_PROPERTIES = [
    { id: 'fallback-1', title: 'Casa moderna em condomínio fechado', description: 'Casa espaçosa com 3 quartos, área gourmet, piscina privativa e segurança 24h.', location: 'Eusébio, CE', type: 'venda', category: 'casa', price: 850000, bedrooms: 3, bathrooms: 3, area: 220, parking: 2, image_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', featured: true },
    { id: 'fallback-2', title: 'Apartamento de luxo na Aldeota', description: 'Apartamento alto padrão com 2 suítes, varanda gourmet e vista mar.', location: 'Aldeota, Fortaleza, CE', type: 'venda', category: 'apartamento', price: 1200000, bedrooms: 2, bathrooms: 3, area: 145, parking: 2, image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', featured: true },
    { id: 'fallback-3', title: 'Casa térrea com edícula no Centro', description: 'Casa charmosa com 2 quartos, edícula independente e quintal.', location: 'Centro, Fortaleza, CE', type: 'venda', category: 'casa', price: 420000, bedrooms: 2, bathrooms: 2, area: 95, parking: 1, image_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80', featured: true },
    { id: 'fallback-4', title: 'Lançamento: Residencial Villa Mar', description: 'Empreendimento com 2 e 3 quartos, lazer completo e condições especiais.', location: 'Cocó, Fortaleza, CE', type: 'lançamento', category: 'apartamento', price: 580000, bedrooms: 2, bathrooms: 2, area: 78, parking: 1, image_url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80', featured: true },
    { id: 'fallback-5', title: 'Apartamento para aluguel no Benfica', description: 'Apartamento com 2 quartos, sala ampla e cozinha planejada.', location: 'Benfica, Fortaleza, CE', type: 'aluguel', category: 'apartamento', price: 2500, bedrooms: 2, bathrooms: 1, area: 68, parking: 1, image_url: 'https://images.unsplash.com/photo-1600573472556-e636c2acda88?auto=format&fit=crop&w=800&q=80', featured: true },
    { id: 'fallback-6', title: 'Casa em condomínio horizontal', description: 'Casa nova com 3 quartos, quintal gramado e garagem para 2 carros.', location: 'Caucaia, CE', type: 'venda', category: 'casa', price: 390000, bedrooms: 3, bathrooms: 2, area: 120, parking: 2, image_url: 'https://images.unsplash.com/photo-1600566752229-250ed79470f8?auto=format&fit=crop&w=800&q=80', featured: true }
  ];

  const FALLBACK_TESTIMONIALS = [
    { id: 'fallback-t1', name: 'Ana Paula Ferreira', email: 'ana@email.com', text: 'Foi um prazer trabalhar com o Edson. Ele entendeu exatamente o que eu precisava e encontrou o apartamento perfeito em menos de um mês.', rating: 5, role: 'Comprou apartamento na Aldeota', avatar_url: '', approved: true },
    { id: 'fallback-t2', name: 'Carlos Eduardo Lima', email: 'carlos@email.com', text: 'Profissionalismo e atenção do início ao fim. O Edson nos ajudou a vender nossa casa e comprar uma nova com segurança e agilidade.', rating: 5, role: 'Vendeu e comprou em Fortaleza', avatar_url: '', approved: true },
    { id: 'fallback-t3', name: 'Juliana e Rafael Morais', email: 'juliana@email.com', text: 'Conseguimos realizar o sonho da casa própria graças ao Edson. Ele nos orientou sobre o financiamento e acompanhou cada etapa.', rating: 5, role: 'Compraram casa no Eusébio', avatar_url: '', approved: true }
  ];

  // Disponibiliza configuração globalmente
  window.EMS_CONFIG = CONFIG;

  /* =========================================================
     UTILITÁRIOS
     ========================================================= */
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));
  const on = (element, event, callback) => element && element.addEventListener(event, callback);
  const ready = (callback) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const escapeHtml = (str) => {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================================================
     HEADER SCROLL E NAVEGAÇÃO MOBILE
     ========================================================= */
  function initHeader() {
    const header = $('.header');
    if (!header) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  function initMobileNav() {
    const toggle = $('.mobile-menu-toggle');
    const mobileNav = $('.mobile-nav');
    const overlay = $('.mobile-nav-overlay');
    if (!toggle || !mobileNav) return;

    const open = () => {
      toggle.setAttribute('aria-expanded', 'true');
      mobileNav.classList.add('active');
      overlay && overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      toggle.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('active');
      overlay && overlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    on(toggle, 'click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      expanded ? close() : open();
    });

    overlay && on(overlay, 'click', close);

    $$('.mobile-nav a').forEach(link => {
      on(link, 'click', close);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        close();
      }
    });
  }

  function initActiveNav() {
    const sections = $$('section[id]');
    const navLinks = $$('.nav-desktop a[href^="#"], .mobile-nav a[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(section => observer.observe(section));
  }

  /* =========================================================
     SCROLL REVEAL (com respeito a prefers-reduced-motion)
     ========================================================= */
  function initScrollReveal() {
    if (prefersReducedMotion()) {
      $$('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        el.classList.add('active');
      });
      return;
    }

    const reveals = $$('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  /* =========================================================
     FAQ ACCORDION
     ========================================================= */
  function initFaq() {
    const faqItems = $$('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      on(question, 'click', () => {
        const isActive = item.classList.contains('active');
        // Fecha todos os outros
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('active');
        });
        item.classList.toggle('active', !isActive);
      });
    });
  }

  /* =========================================================
     GALERIA LIGHTBOX
     ========================================================= */
  function initLightbox() {
    const galleryItems = $$('.gallery-item');
    if (!galleryItems.length) return;

    let currentIndex = 0;
    const images = galleryItems.map(item => ({
      src: item.querySelector('img').src,
      title: item.querySelector('h3')?.textContent || '',
      description: item.querySelector('p')?.textContent || ''
    }));

    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Visualização ampliada da galeria');
    lightbox.innerHTML = '' +
      '<button class="lightbox-close" aria-label="Fechar galeria"><i class="fas fa-times"></i></button>' +
      '<button class="lightbox-prev" aria-label="Imagem anterior"><i class="fas fa-chevron-left"></i></button>' +
      '<button class="lightbox-next" aria-label="Próxima imagem"><i class="fas fa-chevron-right"></i></button>' +
      '<img src="" alt="">' +
      '<div class="lightbox-caption"><h3></h3><p></p></div>' +
      '';
    document.body.appendChild(lightbox);

    const img = lightbox.querySelector('img');
    const captionTitle = lightbox.querySelector('.lightbox-caption h3');
    const captionDesc = lightbox.querySelector('.lightbox-caption p');

    const updateLightbox = () => {
      img.src = images[currentIndex].src;
      img.alt = images[currentIndex].title;
      captionTitle.textContent = images[currentIndex].title;
      captionDesc.textContent = images[currentIndex].description;
    };

    const open = (index) => {
      currentIndex = index;
      updateLightbox();
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    const next = () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateLightbox();
    };

    const prev = () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateLightbox();
    };

    galleryItems.forEach((item, index) => {
      on(item, 'click', () => open(index));
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.setAttribute('aria-label', 'Abrir imagem ampliada');
      on(item, 'keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open(index);
        }
      });
    });

    on(lightbox.querySelector('.lightbox-close'), 'click', close);
    on(lightbox.querySelector('.lightbox-next'), 'click', next);
    on(lightbox.querySelector('.lightbox-prev'), 'click', prev);

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    });

    on(lightbox, 'click', (e) => {
      if (e.target === lightbox) close();
    });
  }

  /* =========================================================
     WHATSAPP E LINKS SOCIAIS
     ========================================================= */
  function initWhatsApp() {
    $$('[data-whatsapp]').forEach(btn => {
      on(btn, 'click', (e) => {
        e.preventDefault();
        const message = btn.dataset.message || CONFIG.whatsappMessage;
        const url = 'https://wa.me/' + CONFIG.whatsappNumber + '?text=' + encodeURIComponent(message);
        window.open(url, '_blank', 'noopener,noreferrer');
      });
    });
  }

  function initSocialLinks() {
    $$('[data-social]').forEach(link => {
      on(link, 'click', (e) => {
        const network = link.dataset.social;
        let url = '#';
        const urls = {
          instagram: 'https://instagram.com/edsonmendesimoveis',
          facebook: 'https://facebook.com/edsonmendesimoveis',
          linkedin: 'https://linkedin.com/in/edsonmendesimoveis',
          youtube: 'https://youtube.com/@edsonmendesimoveis'
        };
        if (urls[network]) {
          e.preventDefault();
          window.open(urls[network], '_blank', 'noopener,noreferrer');
        }
      });
    });
  }

  /* =========================================================
     FORMULÁRIOS (CONTATO, AGENDAMENTO, NEWSLETTER)
     ========================================================= */
  function validateField(field) {
    const formGroup = field.closest('.form-group');
    const value = field.value.trim();
    let error = '';

    if (field.required && !value) {
      error = 'Este campo é obrigatório.';
    } else if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) error = 'Por favor, insira um e-mail válido.';
    } else if (field.type === 'tel' && value) {
      const phoneRegex = /^(\+?\d{1,3}[-\s]?)?\(?\d{2,3}\)?[-\s]?\d{4,5}[-\s]?\d{4}$/;
      if (!phoneRegex.test(value.replace(/\D/g, ''))) error = 'Por favor, insira um telefone válido.';
    }

    if (error) {
      formGroup.classList.add('error');
      const errorEl = formGroup.querySelector('.form-error');
      if (errorEl) errorEl.textContent = error;
      return false;
    } else {
      formGroup.classList.remove('error');
      return true;
    }
  }

  function initForms() {
    $$('form[data-form]').forEach(form => {
      const formType = form.dataset.form;
      const statusEl = form.querySelector('.form-status');
      const submitBtn = form.querySelector('[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : '';

      // Validação em tempo real
      $$('.form-control', form).forEach(field => {
        on(field, 'blur', () => validateField(field));
        on(field, 'input', debounce(() => {
          const formGroup = field.closest('.form-group');
          if (formGroup.classList.contains('error')) validateField(field);
        }, 300));
      });

      on(form, 'submit', async (e) => {
        e.preventDefault();

        const fields = $$('.form-control', form);
        let isValid = true;
        fields.forEach(field => {
          if (!validateField(field)) isValid = false;
        });

        if (!isValid) return;

        const formData = {};
        fields.forEach(field => {
          formData[field.name] = field.value.trim();
        });

        // Configura botão de loading
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span class="form-loading"></span> Enviando...';
        }

        try {
          let success = false;

          if (formType === 'whatsapp') {
            // Envia mensagem direta via WhatsApp
            const message = formData.mensagem || CONFIG.whatsappMessage;
            const url = 'https://wa.me/' + CONFIG.whatsappNumber + '?text=' + encodeURIComponent(message);
            window.open(url, '_blank', 'noopener,noreferrer');
            success = true;
          } else {
            // Persiste na tabela apropriada via API RESTful
            const tableMap = {
              contact: CONFIG.tables.contacts,
              appointment: CONFIG.tables.appointments,
              newsletter: CONFIG.tables.newsletter
            };
            const table = tableMap[formType];

            if (table) {
              const response = await fetch(CONFIG.apiBase + table, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
              });

              if (!response.ok) throw new Error('Erro ao enviar formulário');
              await response.json();
              success = true;
            } else {
              success = true; // Simula sucesso para formulários sem tabela
            }
          }

          if (success) {
            if (statusEl) {
              statusEl.className = 'form-status success';
              statusEl.textContent = getSuccessMessage(formType);
            }
            form.reset();

            // Rastreamento de conversão (opcional)
            if (window.gtag) {
              window.gtag('event', 'conversion', { event_category: formType });
            }
          }
        } catch (error) {
          console.error('Erro no formulário:', error);
          if (statusEl) {
            statusEl.className = 'form-status error';
            statusEl.textContent = 'Ops! Algo deu errado. Tente novamente ou entre em contato pelo WhatsApp.';
          }
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
          }
        }
      });
    });
  }

  function getSuccessMessage(type) {
    const messages = {
      contact: 'Mensagem enviada com sucesso! Retornaremos em breve.',
      appointment: 'Agendamento solicitado com sucesso! Confirmaremos em até 24h.',
      newsletter: 'Inscrição realizada! Fique ligado nas novidades.',
      whatsapp: 'Redirecionando para o WhatsApp...'
    };
    return messages[type] || 'Enviado com sucesso!';
  }

  /* =========================================================
     MÁSCARA DE TELEFONE
     ========================================================= */
  function initPhoneMask() {
    $$('input[type="tel"]').forEach(input => {
      on(input, 'input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 7) {
          value = '(' + value.slice(0, 2) + ') ' + value.slice(2, 7) + '-' + value.slice(7);
        } else if (value.length > 2) {
          value = '(' + value.slice(0, 2) + ') ' + value.slice(2);
        }

        e.target.value = value;
      });
    });
  }

  /* =========================================================
     API RESTFUL - CARREGAMENTO DE DADOS DINÂMICOS
     ========================================================= */
  async function fetchTableData(table, options = {}) {
    const { page = 1, limit = 100, search = '', sort = '' } = options;
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (search) params.append('search', search);
    if (sort) params.append('sort', sort);

    try {
      const response = await fetch(CONFIG.apiBase + table + '?' + params.toString());
      if (!response.ok) throw new Error('Erro ao carregar dados');
      return await response.json();
    } catch (error) {
      console.error('Erro na API:', error);
      return { data: [] };
    }
  }

  /* =========================================================
     PORTFÓLIO DE IMÓVEIS
     ========================================================= */
  async function initProperties() {
    const container = $('#portfolio-grid');
    if (!container) return;

    container.innerHTML = '<div class="skeleton" style="height:300px"></div>'.repeat(3);

    const result = await fetchTableData(CONFIG.tables.properties, { limit: 9 });
    let properties = result.data || [];

    // Fallback para preview/offline quando a API ainda não está disponível
    if (!properties.length) {
      properties = FALLBACK_PROPERTIES;
    }

    renderProperties(container, properties);
    initPropertyFilters(properties);
  }

  function renderProperties(container, properties) {
    container.innerHTML = properties.map(property => '' +
      '<article class="imovel-card reveal">' +
        '<div class="imovel-image">' +
          '<img src="' + escapeHtml(property.image_url) + '" alt="' + escapeHtml(property.title) + '" loading="lazy">' +
          '<span class="imovel-tag imovel-tag-' + escapeHtml(property.type?.toLowerCase() || 'venda') + '">' + escapeHtml(property.type || 'Venda') + '</span>' +
          '<span class="imovel-price">' + formatCurrency(property.price) + '</span>' +
        '</div>' +
        '<div class="imovel-content">' +
          '<h3 class="imovel-title">' + escapeHtml(property.title) + '</h3>' +
          '<p class="imovel-location"><i class="fas fa-map-marker-alt"></i> ' + escapeHtml(property.location) + '</p>' +
          '<div class="imovel-features">' +
            '<span class="imovel-feature"><i class="fas fa-bed"></i> ' + (property.bedrooms || 0) + ' Quartos</span>' +
            '<span class="imovel-feature"><i class="fas fa-bath"></i> ' + (property.bathrooms || 0) + ' Banheiros</span>' +
            '<span class="imovel-feature"><i class="fas fa-ruler-combined"></i> ' + (property.area || 0) + ' m²</span>' +
          '</div>' +
          '<div class="imovel-actions">' +
            '<a href="pages/imovel.html?id=' + encodeURIComponent(property.id) + '" class="btn btn-secondary btn-sm">Ver detalhes</a>' +
            '<button class="btn btn-whatsapp btn-sm" data-whatsapp data-message="Olá! Tenho interesse no imóvel: ' + escapeHtml(property.title) + ' (' + escapeHtml(property.location) + ')." aria-label="Contatar via WhatsApp sobre este imóvel"><i class="fab fa-whatsapp"></i> WhatsApp</button>' +
          '</div>' +
        '</div>' +
      '</article>' +
      '').join('');

    // Reativa botões WhatsApp
    initWhatsApp();
    // Reativa animações
    initScrollReveal();
  }

  function initPropertyFilters(properties) {
    const filters = $$('.filter-btn');
    if (!filters.length) return;

    filters.forEach(btn => {
      on(btn, 'click', () => {
        filters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter || 'all';
        const filtered = filter === 'all'
          ? properties
          : properties.filter(p => (p.type || '').toLowerCase() === filter || (p.category || '').toLowerCase() === filter);

        const container = $('#portfolio-grid');
        renderProperties(container, filtered);
      });
    });
  }

  /* =========================================================
     DEPOIMENTOS
     ========================================================= */
  async function initTestimonials() {
    const containers = $$('.testimonials-grid');
    if (!containers.length) return;

    const result = await fetchTableData(CONFIG.tables.testimonials, { limit: 6 });
    let testimonials = result.data || [];

    // Fallback para preview/offline quando a API ainda não está disponível
    if (!testimonials.length) {
      testimonials = FALLBACK_TESTIMONIALS;
    }

    const html = testimonials.map(t => '' +
      '<article class="testimonial-card reveal">' +
        '<div class="testimonial-stars">' + '★'.repeat(t.rating || 5) + '</div>' +
        '<p class="testimonial-text">"' + escapeHtml(t.text) + '"</p>' +
        '<div class="testimonial-author">' +
          '<img src="' + escapeHtml(t.avatar_url || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(t.name) + '&background=ff5000&color=fff') + '" alt="Foto de ' + escapeHtml(t.name) + '" class="testimonial-avatar" loading="lazy">' +
          '<div class="testimonial-author-info">' +
            '<h4>' + escapeHtml(t.name) + '</h4>' +
            '<span>' + escapeHtml(t.role || 'Cliente') + '</span>' +
          '</div>' +
        '</div>' +
      '</article>' +
      '').join('');

    containers.forEach(c => c.innerHTML = html);
    initScrollReveal();
  }

  /* =========================================================
     PÁGINA DE DETALHE DO IMÓVEL
     ========================================================= */
  async function initPropertyDetail() {
    const detailContainer = $('#imovel-detail');
    if (!detailContainer) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) {
      detailContainer.innerHTML = '<p class="text-center">Imóvel não encontrado.</p>';
      return;
    }

    try {
      const response = await fetch(CONFIG.apiBase + CONFIG.tables.properties + '/' + encodeURIComponent(id));
      if (!response.ok) throw new Error('Imóvel não encontrado');
      const property = await response.json();

      detailContainer.innerHTML = '' +
        '<div class="about-grid">' +
          '<div class="about-image reveal-left">' +
            '<img src="' + escapeHtml(property.image_url) + '" alt="' + escapeHtml(property.title) + '">' +
            '<div class="about-image-badge">' +
              '<span class="number">' + formatCurrency(property.price) + '</span>' +
              '<span class="text">' + escapeHtml(property.type || 'Venda') + '</span>' +
            '</div>' +
          '</div>' +
          '<div class="about-content reveal-right">' +
            '<span class="section-label">' + escapeHtml(property.category || 'Imóvel') + '</span>' +
            '<h1>' + escapeHtml(property.title) + '</h1>' +
            '<p class="imovel-location" style="font-size:1.1rem"><i class="fas fa-map-marker-alt"></i> ' + escapeHtml(property.location) + '</p>' +
            '<p>' + escapeHtml(property.description) + '</p>' +
            '<div class="imovel-features" style="margin:1.5rem 0; padding:1.5rem 0; border-top:1px solid var(--cor-borda); border-bottom:1px solid var(--cor-borda)">' +
              '<span class="imovel-feature"><i class="fas fa-bed"></i> ' + (property.bedrooms || 0) + ' Quartos</span>' +
              '<span class="imovel-feature"><i class="fas fa-bath"></i> ' + (property.bathrooms || 0) + ' Banheiros</span>' +
              '<span class="imovel-feature"><i class="fas fa-ruler-combined"></i> ' + (property.area || 0) + ' m²</span>' +
              '<span class="imovel-feature"><i class="fas fa-car"></i> ' + (property.parking || 0) + ' Vagas</span>' +
            '</div>' +
            '<div class="hero-actions">' +
              '<button class="btn btn-primary btn-lg" data-whatsapp data-message="Olá! Tenho interesse no imóvel: ' + escapeHtml(property.title) + ' (' + escapeHtml(property.location) + '). Gostaria de agendar uma visita."><i class="fab fa-whatsapp"></i> Quero visitar</button>' +
              '<a href="../pages/portfolio.html" class="btn btn-secondary btn-lg">Ver mais imóveis</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '';

      initWhatsApp();
      initScrollReveal();
    } catch (error) {
      detailContainer.innerHTML = '<p class="text-center">Não foi possível carregar os detalhes do imóvel.</p>';
    }
  }

  /* =========================================================
     PAGAMENTOS (exibição dos métodos aceitos)
     ========================================================= */
  function initPayments() {
    // Os métodos de pagamento são apresentados de forma estática no HTML.
    // Para processamento real, seria necessário integrar com gateway de pagamento
    // no backend (Node.js + MySQL conforme solicitado).
    const paymentBtn = $('#payment-btn');
    if (paymentBtn) {
      on(paymentBtn, 'click', () => {
        alert('Em breve: integração com gateway de pagamentos. Entre em contato pelo WhatsApp para negociar condições.');
      });
    }
  }

  /* =========================================================
     CONTADORES ANIMADOS
     ========================================================= */
  function initCounters() {
    const counters = $$('[data-counter]');
    if (!counters.length || prefersReducedMotion()) {
      counters.forEach(c => c.textContent = c.dataset.counter);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const end = parseInt(target.dataset.counter, 10);
          const duration = 2000;
          const start = performance.now();

          const update = (current) => {
            const elapsed = current - start;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            target.textContent = Math.floor(easeOut * end).toLocaleString('pt-BR');
            if (progress < 1) requestAnimationFrame(update);
          };

          requestAnimationFrame(update);
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  /* =========================================================
     LAZY LOADING DE IMAGENS (fallback)
     ========================================================= */
  function initLazyImages() {
    if ('loading' in HTMLImageElement.prototype) return;

    const images = $$('img[loading="lazy"]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => observer.observe(img));
  }

  /* =========================================================
     INICIALIZAÇÃO
     ========================================================= */
  ready(() => {
    initHeader();
    initMobileNav();
    initActiveNav();
    initScrollReveal();
    initFaq();
    initLightbox();
    initWhatsApp();
    initSocialLinks();
    initForms();
    initPhoneMask();
    initProperties();
    initTestimonials();
    initPropertyDetail();
    initPayments();
    initCounters();
    initLazyImages();
  });
})();
