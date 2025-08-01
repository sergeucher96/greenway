document.addEventListener('DOMContentLoaded', function () {
    const tg = window.Telegram.WebApp;
    tg.ready(); // Сообщаем Telegram, что приложение готово к отображению
    tg.expand(); // Растягиваем приложение на весь экран

    // --- ДАННЫЕ (Вместо базы данных) ---

    const newsData = [
        {
            title: "Старт продаж нового BALANCER ADEPT",
            date: "28 июля 2025",
            content: "Встречайте новинку! Коктейль со вкусом «Кофе» — это идеальное сочетание пользы и удовольствия для вашего организма."
        },
        {
            title: "Обновление в линейке AQUAmagic",
            date: "15 июля 2025",
            content: "Мы обновили дизайн и состав наших хитовых салфеток. Теперь они стали еще более эффективными и долговечными!"
        },
        {
            title: "Летний Эко-Фестиваль Greenway",
            date: "01 июля 2025",
            content: "Спасибо всем, кто был с нами на ежегодном фестивале! Это было незабываемо. Фотоотчет уже доступен в наших соцсетях."
        }
    ];

    const marathonsData = [
        {
            id: 'mara1',
            title: "Марафон «Дом без химии»",
            dateTime: "15 августа 2025, 12:00 МСК",
            description: "За 7 дней мы научим вас, как полностью отказаться от бытовой химии, используя только продукцию Greenway. Вы узнаете секреты эффективной и экологичной уборки."
        },
        {
            id: 'mara2',
            title: "Бизнес-интенсив «Быстрый старт»",
            dateTime: "22 августа 2025, 18:00 МСК",
            description: "Этот марафон для новых партнеров. Мы расскажем о маркетинг-плане, научим работать с клиентами и поможем заработать первые деньги уже в первую неделю."
        },
        {
            id: 'mara3',
            title: "Марафон здоровья «Well-being»",
            dateTime: "05 сентября 2025, 10:00 МСК",
            description: "Погружение в мир БАДов и функционального питания Greenway. Узнайте, как поддерживать свое здоровье и энергию каждый день."
        }
    ];

    const catalogData = {
        "🏠 Уход за домом": [
            { name: "Салфетка для стекла", price: "420 ₽", img: "https://greenwayglobal.com/media/products/02261EU.png" },
            { name: "Диск «Инволвер»", price: "510 ₽", img: "https://greenwayglobal.com/media/products/02293EU.png" },
            { name: "Паста «Мистик»", price: "350 ₽", img: "https://greenwayglobal.com/media/products/03301EU.png" },
            { name: "Салфетка для посуды", price: "280 ₽", img: "https://greenwayglobal.com/media/products/02283EU.png" }
        ],
        "💄 Красота": [
            { name: "Очищающий мусс Foet", price: "690 ₽", img: "https://greenwayglobal.com/media/products/02737.png" },
            { name: "Маска-детокс с углём", price: "550 ₽", img: "https://greenwayglobal.com/media/products/02717.png" },
            { name: "Скраб с кокосом", price: "880 ₽", img: "https://greenwayglobal.com/media/products/02704_.png" }
        ],
        "🌿 Здоровье (БАД)": [
            { name: "Omega-3 Plus", price: "1100 ₽", img: "https://greenwayglobal.com/media/products/07021.png" },
            { name: "U-Ген", price: "880 ₽", img: "https://greenwayglobal.com/media/products/07018.png" },
            { name: "Antisweet", price: "880 ₽", img: "https://greenwayglobal.com/media/products/07014.png" }
        ]
    };

    // --- ФУНКЦИИ РЕНДЕРИНГА (Отрисовки) ---

    function renderNews() {
        const container = document.getElementById('news-tab');
        container.innerHTML = '<h2>Лента новостей</h2>';
        newsData.forEach(item => {
            container.innerHTML += `
                <div class="news-item">
                    <h3>${item.title}</h3>
                    <div class="date">${item.date}</div>
                    <p>${item.content}</p>
                </div>
            `;
        });
    }

    function renderMarathons() {
        const container = document.getElementById('marathons-tab');
        container.innerHTML = '<h2>Ближайшие марафоны</h2>';
        marathonsData.forEach(item => {
            container.innerHTML += `
                <div class="marathon-item">
                    <div class="marathon-header" onclick="toggleMarathonDetails('${item.id}')">
                        <h3>${item.title}</h3>
                        <div class="datetime">${item.dateTime}</div>
                    </div>
                    <div class="marathon-details" id="${item.id}">
                        <p>${item.description}</p>
                        <a href="#" class="participate-btn" onclick="event.stopPropagation();">Участвовать</a>
                    </div>
                </div>
            `;
        });
    }
    
    function renderCatalog() {
        const categoriesContainer = document.getElementById('category-buttons');
        const categories = Object.keys(catalogData);
        categoriesContainer.innerHTML = '';
        categories.forEach(category => {
            categoriesContainer.innerHTML += `<button class="category-button" onclick="renderProducts('${category}')">${category}</button>`;
        });
        // По умолчанию показываем товары из первой категории
        renderProducts(categories[0]);
    }
    
    window.renderProducts = function(categoryName) {
        const productsContainer = document.getElementById('product-list');
        productsContainer.innerHTML = '';
        const products = catalogData[categoryName];

        products.forEach(product => {
            productsContainer.innerHTML += `
                <div class="product-card">
                    <img src="${product.img}" alt="${product.name}">
                    <h4>${product.name}</h4>
                    <div class="price">${product.price}</div>
                </div>
            `;
        });
        
        // Обновляем активную кнопку категории
        document.querySelectorAll('.category-button').forEach(btn => {
            btn.classList.toggle('active', btn.innerText === categoryName);
        });
    }

    // --- УПРАВЛЕНИЕ ВКЛАДКАМИ И СОБЫТИЯМИ ---
    
    window.showTab = function(tabId) {
        // Скрываем все вкладки
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        // Деактивируем все кнопки
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));

        // Показываем нужную вкладку и активируем кнопку
        document.getElementById(tabId + '-tab').classList.add('active');
        document.getElementById('btn-' + tabId).classList.add('active');
    }

    window.toggleMarathonDetails = function(marathonId) {
        const details = document.getElementById(marathonId);
        details.classList.toggle('visible');
    }
    window.contactMentor = function() {
    const tg = window.Telegram.WebApp;
    // ВАЖНО: Замените 'YOUR_MENTOR_USERNAME_HERE' на реальный юзернейм наставника в Telegram
    tg.openTelegramLink('https://t.me/YOUR_MENTOR_USERNAME_HERE');
}
    // --- ПЕРВЫЙ ЗАПУСК ---
    renderNews();
    renderMarathons();
    renderCatalog();
    showTab('news'); // Начинаем с вкладки "Новости"
});
