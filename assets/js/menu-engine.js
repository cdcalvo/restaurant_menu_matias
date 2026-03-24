// menu-engine.js - Motor principal reutilizable
class MenuEngine {
    constructor(config) {
        this.data = config.data || {};
        this.config = {
            containerSelector: config.containerSelector || '.container',
            categoryTabsSelector: config.categoryTabsSelector || '.category-scroll',
            modalId: config.modalId || 'dishModal',
            allCategoryKey: config.allCategoryKey || 'all',
            showImages: config.showImages !== false,
            itemImageSize: config.itemImageSize || '100px',
            modalImageHeight: config.modalImageHeight || '320px',
            ...config
        };
        
        this.currentCategory = this.config.allCategoryKey;
        this.init();
        this.scrollPosition = 0;
        this.currentItemIndex = 0;
        this.currentItemsList = [];
    }

    init() {
        this.setupEventListeners();
        this.renderInitialView();
        this.setupScrollHandling();
    }

    setupEventListeners() {
        // Event listeners para categorías
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-tab')) {
                const category = e.target.getAttribute('data-category');
                this.switchCategory(category, e.target);
            }
        });

        // Event listeners para modales
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });

        document.addEventListener('click', (e) => {
            if (e.target.id === this.config.modalId) {
                this.closeModal();
            }
        });
    }

    setupScrollHandling() {
        const toggleButton = () => this.toggleScrollButton();
        const container = document.querySelector(this.config.containerSelector);
        
        // Si el contenedor tiene overflow-y: auto, escuchar su scroll
        if (container) {
            container.addEventListener('scroll', toggleButton, { passive: true });
        }
        
        // También escuchar window scroll como fallback
        window.addEventListener('scroll', toggleButton, { passive: true });
        window.addEventListener('load', toggleButton);
        document.addEventListener('DOMContentLoaded', toggleButton);
        
        // Verificar cada 3 segundos como fallback
        setInterval(toggleButton, 3000);
        
        // Event listener para redimensionar ventana
        window.addEventListener('resize', () => {
            setTimeout(() => this.adjustContainerHeight(), 100);
            setTimeout(toggleButton, 200);
        });
    }

    renderInitialView() {
        this.renderCategories();
        
        // Determinar categoría inicial basada en el número de categorías
        const categories = Object.keys(this.data).filter(key => 
            key !== this.config.allCategoryKey && 
            this.data[key] && 
            Array.isArray(this.data[key]) && 
            this.data[key].length > 0
        );
        
        if (categories.length === 1) {
            // Si solo hay una categoría, empezar directamente con esa
            this.currentCategory = categories[0];
        } else {
            // Si hay múltiples categorías o ninguna, usar 'all'
            this.currentCategory = this.config.allCategoryKey;
        }
        
        this.renderMenuItems(this.currentCategory);
        setTimeout(() => this.adjustContainerHeight(), 100);
    }

    renderCategories() {
        const categoryContainer = document.querySelector(this.config.categoryTabsSelector);
        if (!categoryContainer) return;

        // Obtener categorías válidas (excluyendo 'all')
        const categories = Object.keys(this.data).filter(key => 
            key !== this.config.allCategoryKey && 
            this.data[key] && 
            Array.isArray(this.data[key]) && 
            this.data[key].length > 0
        );

        let html = '';
        
        // Solo mostrar "All" si hay más de una categoría
        if (categories.length > 1) {
            html = `<div class="category-tab active" data-category="${this.config.allCategoryKey}">
                ${this.config.categoryLabels?.[this.config.allCategoryKey] || 'All'}
            </div>`;
            
            // Agregar el resto de categorías
            categories.forEach(category => {
                const label = this.config.categoryLabels?.[category] || this.formatCategoryName(category);
                html += `<div class="category-tab" data-category="${category}">${label}</div>`;
            });
        } else if (categories.length === 1) {
            // Si solo hay una categoría, mostrarla como activa directamente
            const singleCategory = categories[0];
            const label = this.config.categoryLabels?.[singleCategory] || this.formatCategoryName(singleCategory);
            html = `<div class="category-tab active" data-category="${singleCategory}">${label}</div>`;
            
            // Actualizar la categoría actual
            this.currentCategory = singleCategory;
        } else {
            // Si no hay categorías válidas, mostrar mensaje
            html = '<div style="color: white; padding: 12px; text-align: center;">No categories available</div>';
        }
        
        categoryContainer.innerHTML = html;
    }

    formatCategoryName(category) {
        return category.charAt(0).toUpperCase() + 
               category.slice(1).replace(/([A-Z])/g, ' $1').trim();
    }

    renderMenuItems(category) {
        // Guardar lista plana para navegación del modal
        if (category === this.config.allCategoryKey) {
            this.currentItemsList = Object.keys(this.data)
                .filter(k => k !== this.config.allCategoryKey)
                .flatMap(k => this.data[k] || []);
        } else {
            this.currentItemsList = this.data[category] || [];
        }
        const menuList = document.querySelector('.menu-list');
        if (!menuList) return;

        // Remover clase de animación anterior si existe
        menuList.classList.remove('fade-in-sequence');
        menuList.style.animation = 'none';
        menuList.innerHTML = '';

        if (category === this.config.allCategoryKey) {
            this.renderAllCategories(menuList);
        } else {
            this.renderSingleCategory(menuList, category);
        }

        // Aplicar animación escalonada después de renderizar - UNA SOLA VEZ
        setTimeout(() => {
            menuList.classList.add('fade-in-sequence');
            this.toggleScrollButton();
        }, 100);

        // Ajustar altura y verificar botón - UNA SOLA VEZ
        setTimeout(() => {
            this.adjustContainerHeight();
            this.toggleScrollButton();
        }, 800);
    }

    renderAllCategories(container) {
        const categories = Object.keys(this.data).filter(key => key !== this.config.allCategoryKey);
        
        categories.forEach((categoryKey, index) => {
            if (this.data[categoryKey] && Array.isArray(this.data[categoryKey])) {
                const items = this.data[categoryKey];
                const isFirstSection = index === 0;
                
                // Título de sección
                const sectionHeader = document.createElement('div');
                const categoryTitle = this.config.categoryLabels?.[categoryKey] || 
                                   this.formatCategoryName(categoryKey).toUpperCase();
                
                sectionHeader.innerHTML = `
                    <h3 style="
                        color: white;
                        font-size: 28px;
                        font-weight: 900;
                        margin: ${isFirstSection ? '10px' : '32px'} 0 24px 0;
                        text-align: center;
                        text-shadow: 3px 3px 0px #000;
                        letter-spacing: 1px;
                        text-transform: uppercase;
                        padding-top: ${isFirstSection ? '10px' : '20px'};
                        scroll-margin-top: 140px;
                    ">${categoryTitle}</h3>
                `;
                container.appendChild(sectionHeader);
                
                // Items de la categoría
                items.forEach(item => {
                    container.appendChild(this.createMenuItem(item));
                });
            }
        });
    }

    renderSingleCategory(container, category) {
        const items = this.data[category];
        
        if (!items || !Array.isArray(items) || items.length === 0) {
            container.innerHTML = '<p style="color: white; text-align: center; padding: 20px;">No items in this category</p>';
            return;
        }

        items.forEach(item => {
            container.appendChild(this.createMenuItem(item));
        });
    }

    createMenuItem(item) {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.style.cursor = 'pointer';
        menuItem.onclick = () => {
            const index = this.currentItemsList.findIndex(i => i.title === item.title);
            this.currentItemIndex = index;
            this.openModal(
                item.image || item.emoji,
                item.title || '',
                item.price || '',
                item.description || '',
                JSON.stringify(item.tags || []),
                !!item.image
            );
        };
        
        const safeTitle = this.escapeHtml(item.title || '');
        const safeDescription = this.escapeHtml(item.description || '');
        const safeTagsJson = this.escapeHtml(JSON.stringify(item.tags || []));
        
        // Crear contenido de imagen/emoji
        let imageContent = '';
        if (this.config.showImages && item.image) {
            imageContent = `
                <img src="${item.image}" alt="${item.title || ''}" 
                     style="width: 100%; height: 100%; object-fit: cover; border-radius: 16px;" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <span style="font-size: 40px; display: none; align-items: center; justify-content: center; width: 100%; height: 100%;">
                    ${item.emoji || '🍽️'}
                </span>
            `;
        } else {
            imageContent = `
                <span style="font-size: 40px; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
                    ${item.emoji || '🍽️'}
                </span>
            `;
        }
        
        // Crear descripción solo si existe
        const descriptionHtml = item.description ? 
            `<div class="item-description">${item.description}</div>` : '';
        
        // Crear precio solo si existe
        const priceHtml = item.price ? 
            `<div class="item-price">${item.price}</div>` : '';
        
        // Crear botón VER si hay información adicional O si hay imagen (para verla más grande)
        const hasAdditionalInfo = item.description || item.price || (item.tags && item.tags.length > 0);
        const hasImage = item.image || (this.config.showImages && item.image);
        const buttonHtml = (hasAdditionalInfo || hasImage) ? 
            `<button class="view-button" onclick="if(window.menuEngine) window.menuEngine.openModal('${item.image || item.emoji}', '${safeTitle}', '${item.price || ''}', '${safeDescription}', '${safeTagsJson}', ${item.image ? 'true' : 'false'})">
                ${this.config.viewButtonText || 'VIEW'}
            </button>` : '';
        
        // Crear footer solo si hay precio o botón
        const footerHtml = (priceHtml || buttonHtml) ? 
            `<div class="item-footer">
                ${priceHtml}
                ${buttonHtml}
            </div>` : '';
        
        menuItem.innerHTML = `
            <div class="item-image" style="position: relative; overflow: hidden;">
                ${imageContent}
            </div>
            <div class="item-content">
                <div class="item-title">${item.title || 'Untitled'}</div>
                ${descriptionHtml}
                ${footerHtml}
            </div>
        `;
        
        return menuItem;
    }

    switchCategory(category, element) {
        // SOLUCIÓN ROBUSTA: Forzar actualización de todas las pestañas
        const categoryContainer = document.querySelector(this.config.categoryTabsSelector);
        
        if (categoryContainer) {
            // Buscar todas las pestañas de forma robusta
            const allTabs = categoryContainer.querySelectorAll('.category-tab');
            const allTabsGlobal = document.querySelectorAll('.category-tab');
            const allTabsSet = new Set([...allTabs, ...allTabsGlobal]);
            
            // Remover active de TODAS las pestañas encontradas
            allTabsSet.forEach(tab => {
                if (tab.classList.contains('active')) {
                    tab.classList.remove('active');
                    // Forzar repintado del elemento
                    tab.style.display = 'none';
                    tab.offsetHeight; // Trigger reflow
                    tab.style.display = '';
                }
            });
        }
        
        // Agregar active a la pestaña seleccionada
        let activeTab = element;
        if (element) {
            element.classList.add('active');
        } else {
            // Buscar la pestaña por data-category
            activeTab = document.querySelector(`[data-category="${category}"]`);
            if (activeTab) {
                activeTab.classList.add('active');
            }
        }

        // Auto-scroll para hacer visible la pestaña activa
        if (activeTab && categoryContainer) {
            requestAnimationFrame(() => {
                const containerRect = categoryContainer.getBoundingClientRect();
                const tabRect = activeTab.getBoundingClientRect();
                
                if (tabRect.right > containerRect.right - 20 || tabRect.left < containerRect.left + 20) {
                    const scrollLeft = activeTab.offsetLeft - (categoryContainer.offsetWidth / 2) + (activeTab.offsetWidth / 2);
                    categoryContainer.scrollTo({
                        left: Math.max(0, scrollLeft),
                        behavior: 'smooth'
                    });
                }
            });
        }

        // Actualizar título de sección
        const sectionTitle = document.querySelector('.section-title');
        if (sectionTitle) {
            sectionTitle.style.animation = 'none';
            
            if (category === this.config.allCategoryKey) {
                sectionTitle.style.display = 'none';
            } else {
                const titleText = (this.config.categoryLabels?.[category] || 
                                this.formatCategoryName(category)).toUpperCase();
                sectionTitle.style.display = 'block';
                sectionTitle.textContent = titleText;
                
                setTimeout(() => {
                    sectionTitle.style.animation = 'fadeInUp 0.6s ease-out forwards';
                }, 10);
            }
        }

        this.currentCategory = category;
        this.renderMenuItems(category);
    }

    openModal(imageOrEmoji, title, price, description, tagsJson, isImage = false) {
        const modal = document.getElementById(this.config.modalId);
        const modalTitle = document.getElementById('modalTitle');
        const modalPrice = document.getElementById('modalPrice');
        const modalDescription = document.getElementById('modalDescription');
        const modalTags = document.getElementById('modalTags');
        const modalImageContainer = document.querySelector('.modal-image-container');

        const decodedTitle = this.unescapeHtml(title);
        const decodedDescription = this.unescapeHtml(description);
        this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        // Buscar el item en la lista actual para guardar su índice
        const foundIndex = this.currentItemsList.findIndex(
            item => (item.title || '') === this.unescapeHtml(title)
        );
        if (foundIndex !== -1) this.currentItemIndex = foundIndex;

        // Actualizar contador
        const counter = document.getElementById('modalCounter');
        if (counter && this.currentItemsList.length > 1) {
            counter.textContent = `${this.currentItemIndex + 1} / ${this.currentItemsList.length}`;
            counter.style.display = 'block';
        } else if (counter) {
            counter.style.display = 'none';
        }
        
        let tags = [];
        try {
            const decodedTags = this.unescapeHtml(tagsJson);
            tags = JSON.parse(decodedTags);
        } catch (e) {
            console.error('Error parsing tags:', e);
            tags = [];
        }

        // Actualizar imagen/emoji en modal
        if (modalImageContainer) {
            if (isImage) {
                const isQR = imageOrEmoji.toLowerCase().includes('qr') || 
                            decodedTitle.toLowerCase().includes('qr') ||
                            decodedTitle.toLowerCase().includes('scann') ||
                            decodedTitle.toLowerCase().includes('instagram') ||
                            decodedTitle.toLowerCase().includes('uber');
                
                const objectFit = isQR ? 'contain' : 'cover';
                const background = isQR ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' : 'transparent';

                // Eliminar emoji anterior si existía
                const oldEmoji = modalImageContainer.querySelector('.modal-emoji');
                if (oldEmoji) oldEmoji.remove();

                // Reutilizar img existente o crear una nueva
                let img = modalImageContainer.querySelector('img.modal-img');
                if (!img) {
                    img = document.createElement('img');
                    img.className = 'modal-img';
                    modalImageContainer.insertBefore(img, modalImageContainer.firstChild);
                }
                img.src = imageOrEmoji;
                img.alt = decodedTitle;
                img.style.cssText = `width:100%; height:100%; object-fit:${objectFit}; object-position:center; background:${background};`;
                img.onerror = function() {
                    this.remove();
                    const em = document.createElement('div');
                    em.className = 'modal-emoji';
                    em.textContent = imageOrEmoji;
                    modalImageContainer.insertBefore(em, modalImageContainer.firstChild);
                };

            } else {
                // Eliminar img anterior si existía
                const oldImg = modalImageContainer.querySelector('img.modal-img');
                if (oldImg) oldImg.remove();

                // Reutilizar emoji existente o crear uno nuevo
                let emojiEl = modalImageContainer.querySelector('.modal-emoji');
                if (!emojiEl) {
                    emojiEl = document.createElement('div');
                    emojiEl.className = 'modal-emoji';
                    modalImageContainer.insertBefore(emojiEl, modalImageContainer.firstChild);
                }
                emojiEl.textContent = imageOrEmoji;
            }
        }

        // Actualizar contenido del modal
        if (modalTitle) modalTitle.textContent = decodedTitle || 'Untitled';
        
        // Mostrar/ocultar precio según si existe
        if (modalPrice) {
            if (price && price.trim() !== '') {
                modalPrice.textContent = price;
                modalPrice.style.display = 'block';
            } else {
                modalPrice.style.display = 'none';
            }
        }
        
        // Mostrar/ocultar descripción según si existe
        if (modalDescription) {
            if (decodedDescription && decodedDescription.trim() !== '') {
                modalDescription.textContent = decodedDescription;
                modalDescription.style.display = 'block';
            } else {
                modalDescription.style.display = 'none';
            }
        }
        
        // Mostrar/ocultar tags según si existen
        if (modalTags) {
            if (tags && tags.length > 0) {
                modalTags.innerHTML = '';
                tags.forEach(tag => {
                    const tagElement = document.createElement('span');
                    tagElement.className = 'modal-tag';
                    tagElement.textContent = tag;
                    modalTags.appendChild(tagElement);
                });
                modalTags.style.display = 'flex';
            } else {
                modalTags.style.display = 'none';
            }
        }

        // Mostrar modal
         if (modal) {
            // Aplicar la posición fija con la posición actual
            document.body.style.top = `-${this.scrollPosition}px`;
            document.body.classList.add('modal-open');
            modal.classList.add('active');
        }
    }

    closeModal() {
        const modal = document.getElementById(this.config.modalId);
    if (modal) {
        modal.classList.remove('active');
        
        // Restaurar el scroll ANTES de remover modal-open
        document.body.classList.remove('modal-open');
        document.body.style.top = '';
        
        // Restaurar posición del scroll
        window.scrollTo(0, this.scrollPosition);
    }
    }

    adjustContainerHeight() {
        const container = document.querySelector(this.config.containerSelector);
        
        if (!container) return;
        
        container.style.minHeight = 'auto';
        document.body.style.overflowY = 'auto';
        
        setTimeout(() => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            if (documentHeight <= windowHeight) {
                const containerTop = container.offsetTop;
                const currentContainerHeight = container.offsetHeight;
                const availableSpace = windowHeight - containerTop - 40;
                
                if (availableSpace > currentContainerHeight) {
                    container.style.minHeight = availableSpace + 'px';
                }
                
                //document.body.style.overflowY = 'hidden';
                //document.documentElement.style.overflowY = 'hidden';
            } else {
                //document.body.style.overflowY = 'auto';
                //document.documentElement.style.overflowY = 'auto';
            }
        }, 50);
    }

    toggleScrollButton() {
        const scrollButton = document.getElementById('scrollToTop');
        const scrollThreshold = 100;
        
        if (!scrollButton) {
            return;
        }
        
        // Verificar scroll del window
        const windowScrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        
        // Verificar scroll del contenedor
        const container = document.querySelector(this.config.containerSelector);
        const containerScrollPosition = container ? container.scrollTop : 0;
        
        // Si cualquiera de los dos tiene scroll, mostrar el botón
        const totalScrollPosition = Math.max(windowScrollPosition, containerScrollPosition);
        
        if (totalScrollPosition > scrollThreshold) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    }

    scrollToTop() {
        const container = document.querySelector(this.config.containerSelector);
        const windowScrollPosition = window.pageYOffset || 0;
        const containerScrollPosition = container ? container.scrollTop : 0;
        
        // Determinar cuál scroll usar
        if (containerScrollPosition > windowScrollPosition) {
            // Scroll del contenedor
            const startPosition = containerScrollPosition;
            const startTime = performance.now();
            const duration = 1200;
            
            function easeOutQuart(t) {
                return 1 - (--t) * t * t * t;
            }
            
            function animateScroll(currentTime) {
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                const easedProgress = easeOutQuart(progress);
                const currentPosition = startPosition * (1 - easedProgress);
                
                container.scrollTo(0, currentPosition);
                
                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                }
            }
            
            requestAnimationFrame(animateScroll);
        } else {
            // Scroll del window
            const startPosition = windowScrollPosition;
            const startTime = performance.now();
            const duration = 1200;
            
            function easeOutQuart(t) {
                return 1 - (--t) * t * t * t;
            }
            
            function animateScroll(currentTime) {
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                const easedProgress = easeOutQuart(progress);
                const currentPosition = startPosition * (1 - easedProgress);
                
                window.scrollTo(0, currentPosition);
                
                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                }
            }
            
            requestAnimationFrame(animateScroll);
        }
    }

    // Funciones auxiliares
    escapeHtml(text) {
        return text.replace(/'/g, "&apos;").replace(/"/g, "&quot;");
    }

    unescapeHtml(text) {
        return text.replace(/&apos;/g, "'").replace(/&quot;/g, '"');
    }

    openModalByIndex(index) {
        const items = this.currentItemsList;
        if (!items || items.length === 0) return;

        this.currentItemIndex = (index + items.length) % items.length;
        const item = items[this.currentItemIndex];

        // Actualizar imagen/emoji directamente sin reabrir el modal
        const modalImageContainer = document.querySelector('.modal-image-container');
        if (modalImageContainer) {
            const isImage = !!item.image;
            if (isImage) {
                const isQR = (item.image || '').toLowerCase().includes('qr') ||
                             (item.title || '').toLowerCase().includes('qr');
                const objectFit = isQR ? 'contain' : 'cover';
                const background = isQR ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' : 'transparent';

                const oldEmoji = modalImageContainer.querySelector('.modal-emoji');
                if (oldEmoji) oldEmoji.remove();

                let img = modalImageContainer.querySelector('img.modal-img');
                if (!img) {
                    img = document.createElement('img');
                    img.className = 'modal-img';
                    modalImageContainer.insertBefore(img, modalImageContainer.firstChild);
                }
                img.src = item.image;
                img.alt = item.title || '';
                img.style.cssText = `width:100%;height:100%;object-fit:${objectFit};object-position:center;background:${background};`;
            } else {
                const oldImg = modalImageContainer.querySelector('img.modal-img');
                if (oldImg) oldImg.remove();
                let emojiEl = modalImageContainer.querySelector('.modal-emoji');
                if (!emojiEl) {
                    emojiEl = document.createElement('div');
                    emojiEl.className = 'modal-emoji';
                    modalImageContainer.insertBefore(emojiEl, modalImageContainer.firstChild);
                }
                emojiEl.textContent = item.emoji || '🍽️';
            }
        }

        // Actualizar textos
        const modalTitle = document.getElementById('modalTitle');
        const modalPrice = document.getElementById('modalPrice');
        const modalDescription = document.getElementById('modalDescription');
        const modalTags = document.getElementById('modalTags');
        const counter = document.getElementById('modalCounter');

        if (modalTitle) modalTitle.textContent = item.title || '';

        if (modalPrice) {
            if (item.price && item.price.trim() !== '') {
                modalPrice.textContent = item.price;
                modalPrice.style.display = 'block';
            } else {
                modalPrice.style.display = 'none';
            }
        }

        if (modalDescription) {
            if (item.description && item.description.trim() !== '') {
                modalDescription.textContent = item.description;
                modalDescription.style.display = 'block';
            } else {
                modalDescription.style.display = 'none';
            }
        }

        if (modalTags) {
            if (item.tags && item.tags.length > 0) {
                modalTags.innerHTML = '';
                item.tags.forEach(tag => {
                    const tagEl = document.createElement('span');
                    tagEl.className = 'modal-tag';
                    tagEl.textContent = tag;
                    modalTags.appendChild(tagEl);
                });
                modalTags.style.display = 'flex';
            } else {
                modalTags.style.display = 'none';
            }
        }

        if (counter) {
            counter.textContent = `${this.currentItemIndex + 1} / ${items.length}`;
        }
    }
}