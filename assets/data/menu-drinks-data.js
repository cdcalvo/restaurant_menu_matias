const drinksMenuData = {
    all: 'all',
    Beer: [
        {
            image: 'assets/img/drinks/cervezas_cololmbianas.webp', // URL de la imagen
            emoji: '🍺', // Mantener emoji como fallback
            title: 'CERVEZAS COLOMBIANAS',
            description: '¡Descubre el sabor auténtico de Colombia en cada sorbo! Las cervezas colombianas son frescas, suaves y perfectas para disfrutar bien frías. Con un promedio de 4%–5% de alcohol, .',
            price: '5.00',
            tags: ['drinks', 'beer', 'classic']
        },
        {
            image: 'assets/img/drinks/modelo_especial.webp', // URL de la imagen
            emoji: '🍺', // Mantener emoji como fallback
            title: 'MODELO ESPECIAL',
            description: 'A pilsner-style lager whose original recipe was first brewed in Mexico in 1925.',
            price: '5.00',
            tags: ['drinks', 'beer', 'classic']    
        },
        {
            image: 'assets/img/drinks/cerveza_corona.webp', // URL de la imagen
            emoji: '🍺', // Mantener emoji como fallback
            title: 'CORONA EXTRA',
            description: 'It pours with a pale straw color and is very clear with a medium white head. The nose is subtle with the….',
            price: '5.00',
            tags: ['drinks', 'beer', 'classic']    
        },
        {
            image: 'assets/img/drinks/heineken.webp', // URL de la imagen
            emoji: '🍺', // Mantener emoji como fallback
            title: 'HEINEKEN',
            description: '100% Barley malt, choice hops and pure water give this brew unsurpassed clarity.',
            price: '5.00',
            tags: ['drinks', 'beer', 'classic']    
        },
    ],
    WINES:[
        {
            image: 'assets/img/drinks/clot_divern_brut.webp',
            emoji: '🍾', // Mantener emoji como fallback
            title: 'CLOT DIVERN BRUT',
            description: 'Glass 8Valencia, Spain.',
            price: '$28.00',
            tags: ['Wines', 'classic', 'drinks']
        },
        {
            image: 'assets/img/drinks/notes_chardonnay.webp',
            emoji: '🍾', // Mantener emoji como fallback
            title: 'NOTES CHARDONNAY',
            description: 'Glass 8California.',
            price: '$28.00',
            tags: ['Wines', 'classic', 'drinks']
        },
        {
            image: 'assets/img/drinks/aymara_chardonnay.webp',
            emoji: '🍾', // Mantener emoji como fallback
            title: 'AYMARA CHARDONNAY',
            description: 'Glass 8Argentina/Mendoza.',
            price: '$28.00',
            tags: ['Wines', 'classic', 'drinks']
        },
        {
            image: 'assets/img/drinks/viu_manent_reserva_cabernet_sauvignon.webp',
            emoji: '🍾', // Mantener emoji como fallback
            title: 'VIU MANENT RESERVA CABERNET SAUVIGNON',
            description: 'Glass 8Valle de Colchagua, Chile.',
            price: '$28.00',
            tags: ['Wines', 'classic', 'drinks']
        }, 
        {
            image: 'assets/img/drinks/cellier_des_princes_merlot.webp',
            emoji: '🍾', // Mantener emoji como fallback
            title: 'CELLIER DES PRINCES MERLOT.',
            description: 'Glass  8Vin de Pays, France.',
            price: '$28.00',
            tags: ['Wines', 'classic', 'drinks']
        }, 
        {
            image: 'assets/img/drinks/cadis_pinot_grigio.webp',
            emoji: '🍾', // Mantener emoji como fallback
            title: 'CADIS PINOT GRIGIO.',
            description: 'Veneto,Italy.',
            price: '$28.00',
            tags: ['Wines', 'classic', 'drinks']
        },         
        {
            image: 'assets/img/drinks/sol_chile_cabernet_sauvignon.webp',
            emoji: '🍾', // Mantener emoji como fallback
            title: 'SOL DE CHILE CABERNET SAUVIGNON.',
            description: 'Maule Valley,Chile.',
            price: '$28.00',
            tags: ['Wines', 'classic', 'drinks']
        },
    ],
    Beberages:[
        {
            image: 'assets/img/drinks/botella_sangria.webp', // URL de la imagen
            emoji: '🍸', // Mantener emoji como fallback
            title: 'JARRA DE SANGRÍA',
            description: '',
            price: '22.50',
            tags: ['drinks', 'cocktail', 'classic']
        },
        {
            image: 'assets/img/drinks/vaso_de_sangria.webp', // URL de la imagen
            emoji: '🍸', // Mantener emoji como fallback
            title: 'COPA DE SANGRÍA.',
            description: '',
            price: '9.00',
            tags: ['drinks', 'cocktail', 'classic']    
        },
        {
            image: 'assets/img/drinks/limonada_de_coco.webp', // URL de la imagen
            emoji: '🧃', // Mantener emoji como fallback
            title: 'LIMONADA DE COCO.',
            description: '',
            price: '6.00',
            tags: ['drinks', 'juice', 'classic']    
        },
        {
            image: 'assets/img/drinks/jugo_de_ guanabana.webp', // URL de la imagen
            emoji: '🧃', // Mantener emoji como fallback
            title: 'GUANÁBANA',
            description: 'Water/Milk.',
            price: '4.99 5.50',
            tags: ['drinks', 'juice', 'classic']    
        },
        {
            image: 'assets/img/drinks/agua_panela_con_limon.webp', // URL de la imagen
            emoji: '🧃', // Mantener emoji como fallback
            title: 'AGUA DE PANELA CON LIMÓN',
            description: '',
            price: '4.50',
            tags: ['drinks', 'juice', 'classic']
        },
        {
            image: 'assets/img/drinks/jugo_maracuya.webp', // URL de la imagen
            emoji: '🧃', // Mantener emoji como fallback
            title: 'MARACUYÁ.',
            description:'Water/Milk.', 
            price: '4.99 6.00',
            tags: ['drinks', 'juice', 'classic']    
        },
        {
            image: 'assets/img/drinks/jugo_de_mango.webp', // URL de la imagen
            emoji: '🧃', // Mantener emoji como fallback
            title: 'MANGO.',
            description:'Water/Milk.', 
            price: '4.99 5.50',
            tags: ['drinks', 'juice', 'classic']    
        },
        {
            image: 'assets/img/drinks/jugo_de_lulo.webp', // URL de la imagen
            emoji: '🧃', // Mantener emoji como fallback
            title: 'LULO',
            description: 'Water/Milk.',
            price: '4.99 5.50',
            tags: ['drinks', 'juice', 'classic']    
        },
        {
            image: 'assets/img/drinks/jugo_de_mora.webp', // URL de la imagen
            emoji: '🧃', // Mantener emoji como fallback
            title: 'MORA',
            description: 'Water/Milk.',
            price: '4.99 5.50',
            tags: ['drinks', 'juice', 'classic']    
        },
        {
            image: 'assets/img/drinks/limonada.webp', // URL de la imagen
            emoji: '🧃', // Mantener emoji como fallback
            title: 'LIMONADA NATURAL ',
            description: '',
            price: '4.99',
            tags: ['drinks', 'juice', 'classic']    
        },
        {
            image: 'assets/img/drinks/sodas_colombianas.webp', // URL de la imagen
            emoji: '🧃', // Mantener emoji como fallback
            title: 'SODAS COLOMBIANAS ',
            description: '', 
            price: '3.50',
            tags: ['drinks', 'sodas', 'classic']    
        },
        {
            image: 'assets/img/drinks/sodas_nacionales.webp', // URL de la imagen
            emoji: '🥤', // Mantener emoji como fallback
            title: 'SODAS NACIONALES ',
            description: '',
            price: '2.85',
            tags: ['drinks', 'sodas', 'classic']    
        },
        {
            image: 'assets/img/drinks/perrier.webp', // URL de la imagen
            emoji: '🥤', // Mantener emoji como fallback
            title: 'PERRIER ',
            description: '',
            price: '3.50',
            tags: ['drinks', 'sodas', 'classic']    
        },
        {
            image: 'assets/img/drinks/ponymalta.webp', // URL de la imagen
            emoji: '🥤', // Mantener emoji como fallback
            title: 'PONY MALTA.',
            description: '',
            price: '3.50',
            tags: ['drinks', 'sodas', 'classic']    
        },
    ],
};

window.drinksMenuData = drinksMenuData;