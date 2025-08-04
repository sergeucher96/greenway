document.addEventListener('DOMContentLoaded', () => {
    // Инициализация Telegram Web App
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
    
    // ВАЖНО: Замените 'YOUR_BOT_USERNAME_HERE' на реальный юзернейм вашего бота (без @)
    const BOT_USERNAME = 'We_are_ladies';
    const YOUR_CONTACT_LINK = `https://t.me/${BOT_USERNAME}`; 

    // ========================================================================
    // === БАЗЫ ДАННЫХ ДЛЯ РАЗДЕЛОВ ===
    // ========================================================================

    const courses = [
        { id: 'c1', title: 'Английский для начинающих (A1)', description: 'Полный курс для изучения основ: алфавит, базовые фразы, грамматика.', price: '5900 руб.' },
        { id: 'c2', title: 'Средний уровень (B1-B2)', description: 'Углубленный курс для тех, кто хочет свободно говорить и понимать сложную речь.', price: '7900 руб.' },
        { id: 'c3', title: 'Подготовка к IELTS', description: 'Интенсивный курс для успешной сдачи международного экзамена.', price: '9900 руб.' }
    ];

    const lessons = [
        { id: 'l1', title: 'Артикли: a/an, the', description: 'Бесплатный урок, объясняющий главное правило использования артиклей.' },
        { id: 'l2', title: 'Время Present Simple', description: 'Разбираемся, когда использовать самое простое, но важное время.' },
        { id: 'l3', title: 'Топ-50 слов для путешествий', description: 'Учим слова, которые точно пригодятся в вашей следующей поездке.' }
    ];

    const tests = [
        {
            id: 'placement-test',
            title: 'Полный тест на уровень языка',
            description: 'Комплексный тест из 120 вопросов для точного определения вашего уровня от A1 до B2.',
            timeLimit: 60,
            levelDescriptions: {
                'Elementary (A1)': "Понимать известные слова и очень простые предложения, если говорят отчетливо и медленно...",
                'Pre-Intermediate (A2)': "Понимать очень простую информацию. Понимать самое главное в кратких, ясных и простых сообщениях...",
                'Intermediate (B1)': "Понимать главную информацию, если речь идет о работе, школе, свободном времяпровождении...",
                'Upper Intermediate (B2)': "Следить за ходом мыслей в длинных речах и докладах, понимать программы новостей..."
            },
            scoreTableHTML: `<div class="level-table"><div class="table-row header"><div>Баллы</div><div>Уровень (CEF)</div></div><div class="table-row"><div>менее 30</div><div>Elementary (A1)</div></div><div class="table-row"><div>31 – 60</div><div>Pre-Intermediate (A2)</div></div><div class="table-row"><div>61 – 90</div><div>Intermediate (B1)</div></div><div class="table-row"><div>более 90</div><div>Upper Intermediate (B2)</div></div></div>`,
            questions: [
                 { part: 1, text: "“Hello Sara, ______?” – “I'm very well, thank you.”", options: ["How do you", "How are you", "How you are", "How is it"], answer: "How are you" }, { part: 1, text: "“What's ______ name?” – “Jane Edwards.”", options: ["you", "your", "yours", "you're"], answer: "your" }, { part: 1, text: "“How old are you?” – “______.”", options: ["I twenty", "Me is twenty", "I've twenty", "I'm twenty"], answer: "I'm twenty" }, { part: 1, text: "“Is this your book?” – “______.”", options: ["No, it isn't", "No, isn't it", "No, he isn't", "No, there isn't"], answer: "No, it isn't" }, { part: 1, text: "“Where is Anna from?” – “______ from Rome.”", options: ["It is", "Her is", "He is", "She is"], answer: "She is" }, { part: 1, text: "“______ is your address?” – “12, Sundown Street, Bristol.”", options: ["How", "Who", "What", "That"], answer: "What" }, { part: 1, text: "______ name is John Smith.", options: ["His", "He's", "He", "Her"], answer: "His" }, { part: 1, text: "Sam ______ a doctor, he's a teacher at the university.", options: ["aren't", "isn't", "not", "doesn't"], answer: "isn't" }, { part: 1, text: "Here are Juan and Mercedes. ______ are from Valencia in Spain.", options: ["They", "Their", "Them", "This"], answer: "They" }, { part: 1, text: "“Have you got a computer?” – “Yes, ______.”", options: ["I got", "I've got", "I've", "I have"], answer: "I have" }, { part: 1, text: "______ two hundred students in my school.", options: ["They are", "It is", "There are", "There is"], answer: "There are" }, { part: 1, text: "“Do you live in Munich?” – “Yes, ______.”", options: ["I live", "I don't", "I do live", "I do"], answer: "I do" }, { part: 1, text: "“Is that ______ car?” – “No, it isn't.”", options: ["they", "their", "there", "they're"], answer: "their" }, { part: 1, text: "“______ is this blue bag?” – “It's £5.50.”", options: ["Where", "How big", "How much", "What"], answer: "How much" }, { part: 1, text: "“What's her job?” – “She's ______.”", options: ["a actress", "actress", "the actress", "an actress"], answer: "an actress" }, { part: 1, text: "“______ your car?” – “It's in the car park.”", options: ["Which is", "Who's", "When's", "Where's"], answer: "Where's" }, { part: 1, text: "“______ bag is this?” – “It's mine.”", options: ["Whose", "What's", "Who's", "Who"], answer: "Whose" }, { part: 1, text: "______ only three chairs in my room.", options: ["They are", "There are", "There is", "It is"], answer: "There are" }, { part: 1, text: "She ______ a house in the town centre.", options: ["got", "have got", "has got", "is got"], answer: "has got" }, { part: 1, text: "“______ brothers have you got?” – “Only one.”", options: ["How much", "How old", "How are", "How many"], answer: "How many" }, { part: 1, text: "“Is there any food left?” – “______.”", options: ["No, there isn't", "Yes, there is any", "Yes, they is", "No, there aren't"], answer: "No, there isn't" }, { part: 1, text: "My favourite painters are Monet and Renoir but John doesn't like ______ at all.", options: ["they", "them", "it", "some"], answer: "them" }, { part: 1, text: "There aren't ______ people here today.", options: ["many", "a lot", "much", "the many"], answer: "many" }, { part: 1, text: "We haven't got ______.", options: ["some children", "any children", "a children", "one children"], answer: "any children" }, { part: 1, text: "“Do you speak Japanese?” – “No, I ______.”", options: ["don't speak", "not", "speak not", "don't"], answer: "don't" }, { part: 1, text: "“What does he do?” – “______.”", options: ["He's teacher", "He's a teacher", "He's teaching", "Yes, he does"], answer: "He's a teacher" }, { part: 1, text: "He ______ in an office every morning from eight to twelve.", options: ["working", "works", "work", "am working"], answer: "works" }, { part: 1, text: "“Do you like ______?” – “Yes, I do.”", options: ["to shop", "shop", "to shopping", "shopping"], answer: "shopping" }, { part: 1, text: "I go ______ school in Vienna.", options: ["at", "to", "in", "on"], answer: "to" }, { part: 1, text: "We have lunch ______ one o'clock.", options: ["at", "to", "in", "on"], answer: "at" }, { part: 1, text: "She works ______ Saturday.", options: ["at", "to", "in", "on"], answer: "on" }, { part: 1, text: "I stay at home ______ the morning.", options: ["at", "to", "in", "on"], answer: "in" }, { part: 1, text: "“How do you get to work?” – “______.”", options: ["By car", "In car", "By the car", "On car"], answer: "By car" }, { part: 1, text: "“Do you like classical music?” – “______.”", options: ["Yes, I likes", "Yes, I like", "Yes, I does", "Yes, I do"], answer: "Yes, I do" }, { part: 1, text: "“Where is Mary?” – “She ______ over there.”", options: ["is stand", "is standing", "stand", "standing"], answer: "is standing" }, { part: 1, text: "I'm hungry. ______ something to eat, please.", options: ["I like", "I'd want", "I'd like", "I'm like"], answer: "I'd like" }, { part: 1, text: "He ______ born in 1963 in Spain.", options: ["had", "is", "was", "did"], answer: "was" }, { part: 1, text: "Switzerland is ______ than Britain.", options: ["as small", "smallest", "more small", "smaller"], answer: "smaller" }, { part: 1, text: "Motor racing is the ______ sport in the world.", options: ["most expensive", "expensivest", "more expensive", "as expensive"], answer: "most expensive" }, { part: 1, text: "He passed his English exam very ______.", options: ["easy", "easier", "good", "easily"], answer: "easily" }, { part: 1, text: "“When ______ you go to the USA?” – “Last year.”", options: ["did", "was", "went", "have"], answer: "did" }, { part: 1, text: "“Did she stay with friends?” – “______.”", options: ["No, she didn't", "No, she didn't stay", "No, she stayed not", "No, she didn't stayed"], answer: "No, she didn't" }, { part: 1, text: "She's never ______ to New York.", options: ["gone", "was", "been", "went"], answer: "been" }, { part: 1, text: "“I haven't got any money.” – “Never mind. ______ some from the bank.”", options: ["I'll get", "I'm getting", "I get", "I'd get"], answer: "I'll get" }, { part: 1, text: "______ you ever visited London?", options: ["Did", "Do", "Were", "Have"], answer: "Have" }, { part: 1, text: "He's learning ______ a lorry.", options: ["to drive", "driving", "drive", "the driving"], answer: "to drive" }, { part: 1, text: "I can't stand ______ in hot weather.", options: ["to walk", "walking", "walk", "to walking"], answer: "walking" }, { part: 1, text: "He smokes more than ten cigarettes ______.", options: ["by day", "the day", "in day", "a day"], answer: "a day" }, { part: 1, text: "Let's go somewhere else. There's ______ noise in this room.", options: ["too many", "too much", "enough", "too"], answer: "too much" }, { part: 1, text: "It's a very long day for Jack. He doesn't get home from school ______ six o'clock.", options: ["since", "to", "towards", "until"], answer: "until" }, { part: 1, text: "They usually ______ at home but today they ______ lunch in a restaurant.", options: ["are eating, have", "eat, have", "eat, are having", "are eating, are having"], answer: "eat, are having" }, { part: 1, text: "We didn't stay late ______ we were very tired.", options: ["because", "so", "that", "until"], answer: "because" }, { part: 1, text: "I think most people ______ English for their jobs in the future.", options: ["need", "are needing", "will need", "will have needed"], answer: "will need" }, { part: 1, text: "Teenagers today like wearing casual clothes so leather shoes aren't ______ trainers.", options: ["as fashionable than", "as fashionable as", "more fashionable as", "fashionable"], answer: "as fashionable as" }, { part: 1, text: "A friend of ______ phoned this morning but ______ didn't leave a message.", options: ["you, she", "you, her", "yours, she", "yourself, hers"], answer: "yours, she" }, { part: 1, text: "We ______ lunch when the phone ______.", options: ["had, rang", "were having, rang", "were having, was ringing", "had, has rung"], answer: "were having, rang" }, { part: 1, text: "You ______ open the door before the train gets into the station. It's very dangerous.", options: ["must", "mustn't", "should", "don't have to"], answer: "mustn't" }, { part: 1, text: "If you don't want to burn yourself, you ______ lie in the sun all day.", options: ["won't", "don't", "shouldn't", "couldn't"], answer: "shouldn't" }, { part: 1, text: "If I have enough money next year, I ______ to the USA.", options: ["will go", "go", "would go", "went"], answer: "will go" }, { part: 1, text: "It's usually quite warm in September ______ it often rains, ______ bring a waterproof.", options: ["but, so", "so, because", "unless, but", "for, as"], answer: "but, so" }, { part: 1, text: "______ she likes coffee, she prefers tea.", options: ["However", "Although", "But", "When"], answer: "Although" }, { part: 1, text: "______ for the bus, a man with a gun ran out of the bank opposite us.", options: ["As we were waiting", "When we waited", "As soon as we waited", "Until we waited"], answer: "As we were waiting" }, { part: 1, text: "It's the best film ______. You should go and see it.", options: ["I ever saw", "I've ever seen", "I've never seen", "I've already seen"], answer: "I've ever seen" }, { part: 1, text: "They went to Australia ______ a month ______ summer.", options: ["during, the", "for, during", "for, last", "last, during"], answer: "for, last" }, { part: 1, text: "I don't think life ______ better in the future.", options: ["won't be", "will be", "be", "is"], answer: "will be" }, { part: 1, text: "I haven't heard from Jane for ages. I wonder ______.", options: ["what she like", "how is she", "how she is", "how does she"], answer: "how she is" }, { part: 1, text: "We're not paying a builder to mend the fireplace. We've decided to do it ______.", options: ["us", "ourselves", "ourself", "our own"], answer: "ourselves" }, { part: 1, text: "I always take an umbrella ______ it rains.", options: ["however", "despite", "in case", "as"], answer: "in case" }, { part: 1, text: "We ______ go out to a restaurant during the week because when we get home from work we're too tired.", options: ["nearly never", "hardly never", "hardly ever", "ever"], answer: "hardly ever" }, { part: 1, text: "That sofa ______ comfortable. Can I try it?", options: ["looks", "looks like", "is like", "like"], answer: "looks" }, { part: 1, text: "I ______ be late for work this morning. I've got a lot to do before midday.", options: ["don't have to", "couldn't", "don't", "mustn't"], answer: "mustn't" }, { part: 1, text: "They've lived in that house ______ they were children.", options: ["for", "during", "since", "until"], answer: "since" }, { part: 1, text: "A lot ______ to the house before we can move in.", options: ["needs be doing", "needs done", "needs doing", "needs to do"], answer: "needs doing" }, { part: 1, text: "I'll get an electrician ______ the heating.", options: ["mend", "to mend", "for mending", "mending"], answer: "to mend" }, { part: 1, text: "You ______ come with us if you don't want to.", options: ["must", "haven't to", "aren't supposed to", "don't have to"], answer: "don't have to" }, { part: 1, text: "When he arrived a crowd ______ for several hours to greet him.", options: ["had been waiting", "is waiting", "has been waiting", "was waiting"], answer: "had been waiting" }, { part: 1, text: "She's just bought a brand new car so she ______ be able to drive.", options: ["can't", "must", "won't", "probably"], answer: "must" }, { part: 1, text: "You ______ show your passport at the frontier if you want to get across.", options: ["have to", "are supposed to", "should", "are allowed to"], answer: "have to" }, { part: 1, text: "______ she was an hour late, she didn't apologise.", options: ["In spite of", "Even though", "However", "Because"], answer: "Even though" }, { part: 1, text: "They don't like him at all. He treats them ______ they were children.", options: ["as if", "if only", "in case", "although"], answer: "as if" },
                 { part: 2, text: "six, seven, ______, nine, ten", options: ["three", "twelve", "eight", "five"], answer: "eight" }, { part: 2, text: "“What's your ______?” – “I'm American.”", options: ["name", "nationality", "country", "home"], answer: "nationality" }, { part: 2, text: "“What ______ is it?” – “It's half past two.”", options: ["time", "hour", "day", "old"], answer: "time" }, { part: 2, text: "Sunday, Monday, ______, Wednesday", options: ["Saturday", "Thursday", "Tuesday", "Friday"], answer: "Tuesday" }, { part: 2, text: "March, ______, May, June, July", options: ["April", "January", "August", "November"], answer: "April" }, { part: 2, text: "He's got a ______ and two sisters.", options: ["father", "brother", "family", "friend"], answer: "brother" }, { part: 2, text: "My favourite ______ is dinner.", options: ["lunch", "drink", "food", "meal"], answer: "meal" }, { part: 2, text: "We've got two ______: a son and a daughter.", options: ["parents", "people", "children", "friends"], answer: "children" }, { part: 2, text: "I'd like a ______ of coffee, please.", options: ["cup", "glass", "plate", "bottle"], answer: "cup" }, { part: 2, text: "He's ______ the newspaper.", options: ["reading", "watching", "listening", "seeing"], answer: "reading" }, { part: 2, text: "September is my favourite ______.", options: ["year", "autumn", "month", "season"], answer: "month" }, { part: 2, text: "“How old is your ______?” – “She's thirteen.”", options: ["brother", "son", "boyfriend", "sister"], answer: "sister" }, { part: 2, text: "I always have a big ______ in the morning.", options: ["lunch", "breakfast", "dinner", "supper"], answer: "breakfast" }, { part: 2, text: "Those are very nice ______. Where did you buy them?", options: ["shirt", "dress", "trousers", "handbag"], answer: "trousers" }, { part: 2, text: "“What does he look like?” – “He's quite tall and he's got short, dark ______.”", options: ["glasses", "eyes", "head", "hair"], answer: "hair" }, { part: 2, text: "“Where can I buy some envelopes?” – “At the ______.”", options: ["baker's", "newsagent's", "library", "grocer's"], answer: "newsagent's" }, { part: 2, text: "“What was the ______ like in Vienna?” – “It was cold and cloudy.”", options: ["time", "weather", "cold", "temperature"], answer: "weather" }, { part: 2, text: "I've got a new dishwasher and a fridge in my ______.", options: ["bathroom", "study", "office", "kitchen"], answer: "kitchen" }, { part: 2, text: "It's very ______ in here. I can't hear anything.", options: ["noisy", "quiet", "exciting", "clean"], answer: "quiet" }, { part: 2, text: "Excuse me, waiter. Can you bring me the ______, please?", options: ["note", "money", "bill", "cheque"], answer: "bill" }, { part: 2, text: "She's ______ a blue coat and a grey scarf.", options: ["looking", "seeing", "wearing", "putting"], answer: "wearing" }, { part: 2, text: "I'm too ______ today. I'll phone you back tomorrow.", options: ["crowded", "interested", "polite", "busy"], answer: "busy" }, { part: 2, text: "Take your umbrella. It's raining ______.", options: ["heavily", "strong", "hardly", "much"], answer: "heavily" }, { part: 2, text: "He's started a new job. It's more interesting and he ______ more money.", options: ["wins", "earns", "spends", "costs"], answer: "earns" }, { part: 2, text: "I'm sorry but I don't understand what you ______. Can you explain it again, please?", options: ["tell", "know", "mean", "talk"], answer: "mean" }, { part: 2, text: "If you don't leave now, you'll ______ the bus and there isn't another one today.", options: ["catch", "save", "miss", "take"], answer: "miss" }, { part: 2, text: "“Can I ______ your dictionary, please?” – “Yes, of course. But I'd like it back for the weekend.”", options: ["lend", "borrow", "give", "keep"], answer: "borrow" }, { part: 2, text: "He lets his wife do everything for him. He's very ______.", options: ["careful", "bored", "quiet", "lazy"], answer: "lazy" }, { part: 2, text: "I'm ______ living at home but my girlfriend and I are getting married next month so we've bought a flat.", options: ["always", "yet", "again", "still"], answer: "still" }, { part: 2, text: "Don't ______! It's not funny.", options: ["cry", "shout", "laugh", "grow"], answer: "laugh" }, { part: 2, text: "I'm afraid we have had to ______ the flight because of bad weather conditions.", options: ["stop", "cancel", "take off", "confirm"], answer: "cancel" }, { part: 2, text: "There was a terrible ______ on the A2 motorway this morning. Five vehicles were involved.", options: ["scratch", "incident", "crash", "damage"], answer: "crash" }, { part: 2, text: "The religious wedding ______ takes place in a church.", options: ["performance", "marriage", "ceremony", "engagement"], answer: "ceremony" }, { part: 2, text: "I wish they wouldn't ______ so much time with unnecessary meetings.", options: ["waste", "lose", "take", "put away"], answer: "waste" }, { part: 2, text: "I was very ______ and depressed when I first went to live abroad.", options: ["lonely", "alone", "on my own", "solitary"], answer: "lonely" }, { part: 2, text: "I'm really ______ to the party. All my old friends will be there.", options: ["appreciating", "thinking about", "enjoying", "looking forward"], answer: "looking forward" }, { part: 2, text: "The hotel was so awful that we wrote a letter of ______ to the agency when we got back home.", options: ["thanks", "complaint", "relief", "warning"], answer: "complaint" }, { part: 2, text: "You can't ______ on him at all. He never does what he says.", options: ["tolerate", "rely", "collaborate", "arrange"], answer: "rely" }, { part: 2, text: "It's much too expensive. We can't possibly ______ it.", options: ["pay", "cost", "afford", "cope"], answer: "afford" }, { part: 2, text: "I think he's a good live performer, and his songs are excellent. ______ you can't hear the words because the music is too loud.", options: ["The trouble is", "In fact", "On the whole", "What's more"], answer: "The trouble is" }
            ]
        },
        {
            id: 'phrasal-verbs-test',
            title: 'Тест: Фразовые глаголы',
            description: 'Проверьте свое знание 10 популярных фразовых глаголов, которые часто встречаются в речи.',
            timeLimit: 5,
            levelDescriptions: null,
            scoreTableHTML: '',
            questions: [
                { text: "To find something by chance is to 'come ______' it.", options: ["across", "about", "along", "in"], answer: "across" }, { text: "If you don't understand a word, you should 'look it ____' in a dictionary.", options: ["up", "at", "for", "out"], answer: "up" }, { text: "The meeting was 'put ____' until next Friday.", options: ["off", "on", "out", "away"], answer: "off" }, { text: "It's difficult to 'give ____' smoking.", options: ["up", "in", "away", "out"], answer: "up" }, { text: "He had to 'take ____' his new role with great responsibility.", options: ["on", "off", "over", "out"], answer: "on" }, { text: "Could you 'fill ____' this form, please?", options: ["in", "up", "out", "on"], answer: "in" }, { text: "My car 'broke ____' on the way to work.", options: ["down", "up", "out", "off"], answer: "down" }, { text: "I need to 'cut ____ on' sweets.", options: ["down", "off", "up", "out"], answer: "down" }, { text: "Please 'turn ____' the music, it's too loud.", options: ["down", "off", "up", "on"], answer: "down" }, { text: "I'm 'looking ____ to' the weekend.", options: ["forward", "up", "after", "for"], answer: "forward" }
            ]
        },
        {
            id: 'business-english-test',
            title: 'Тест: Деловой английский',
            description: 'Краткий тест на знание основной лексики для делового общения и переписки.',
            timeLimit: 10,
            levelDescriptions: null,
            scoreTableHTML: '',
            questions: [
                { text: "A formal list of topics to be discussed at a meeting is called an ______.", options: ["agenda", "invoice", "memo", "report"], answer: "agenda" }, { text: "The amount of money a company receives from sales is its ______.", options: ["revenue", "debt", "budget", "asset"], answer: "revenue" }, { text: "What do you call the people who have invested in a company?", options: ["Shareholders", "Clients", "Staff", "Competitors"], answer: "Shareholders" }, { text: "A formal proposal, often in writing, is also known as a ______.", options: ["tender", "résumé", "forecast", "policy"], answer: "tender" }, { text: "To postpone a meeting means to 'put it ____'.", options: ["off", "on", "out", "up"], answer: "off" }
            ]
        },
        {
            id: 'travel-english-test',
            title: 'Тест: Английский для путешествий',
            description: 'Проверьте, готовы ли вы к путешествию! Основные фразы и слова для аэропорта, отеля и ресторана.',
            timeLimit: 10,
            levelDescriptions: null,
            scoreTableHTML: '',
            questions: [
                { text: "The place where you wait for your flight at the airport is called the ______.", options: ["departure lounge", "check-in desk", "customs", "baggage claim"], answer: "departure lounge" }, { text: "When you arrive at a hotel, you need to ______.", options: ["check in", "check out", "book", "depart"], answer: "check in" }, { text: "I'd like to book a ______ room, please. (For one person)", options: ["single", "double", "twin", "suite"], answer: "single" }, { text: "Could I have the ______, please? (when you want to pay in a restaurant)", options: ["bill", "menu", "receipt", "tip"], answer: "bill" }, { text: "A flight that is not direct is called a ______ flight.", options: ["connecting", "domestic", "charter", "return"], answer: "connecting" }
            ]
        }
    ];

    // DOM Elements
    const screens = { home: document.getElementById('home-screen'), testList: document.getElementById('test-list-screen'), courses: document.getElementById('courses-screen'), lessons: document.getElementById('lessons-screen'), teachers: document.getElementById('teachers-screen'), booking: document.getElementById('booking-screen'), welcome: document.getElementById('welcome-screen'), test: document.getElementById('test-screen'), result: document.getElementById('result-screen'), review: document.getElementById('review-screen'), };
    const coursesBtn = document.getElementById('courses-btn');
    const lessonsBtn = document.getElementById('lessons-btn');
    const testingBtn = document.getElementById('testing-btn');
    const teachersBtn = document.getElementById('teachers-btn');
    const bookLessonBtn = document.getElementById('book-lesson-btn');
    const testListContainer = document.getElementById('test-list');
    const courseListContainer = document.getElementById('course-list');
    const lessonListContainer = document.getElementById('lesson-list');
    const welcomeTitle = document.getElementById('welcome-title');
    const welcomeDescription = document.getElementById('welcome-description');
    const welcomeLevelTableContainer = document.getElementById('welcome-level-table-container');
    const welcomeTime = document.getElementById('welcome-time');
    const startTestButton = document.getElementById('start-test-button');
    const partIndicator = document.getElementById('part-indicator');
    const timerEl = document.getElementById('timer');
    const progressBar = document.getElementById('progress-bar');
    const questionCounter = document.getElementById('question-counter');
    const questionText = document.getElementById('question-text');
    const answerOptions = document.getElementById('answer-options');
    const finalScoreEl = document.getElementById('final-score');
    const resultLevelEl = document.getElementById('result-level');
    const resultDescriptionEl = document.getElementById('result-description');
    const reviewContainer = document.getElementById('review-container');
    
    // App State
    let currentTest = null;
    let currentQuestionIndex = 0;
    let userAnswers = [];
    let score = 0;
    let timerInterval;
    let finalLevelText = '';

    function showScreen(screenName) {
        Object.values(screens).forEach(s => s.classList.remove('active'));
        if (screens[screenName]) screens[screenName].classList.add('active');
    }

    function initHome() { showScreen('home'); }

    function populateList(container, items, onClickCallback) {
        container.innerHTML = '';
        items.forEach(item => {
            const element = document.createElement('div');
            element.className = 'list-item';
            let content = `<h3>${item.title}</h3><p>${item.description}</p>`;
            if (item.price) content += `<div class="price">${item.price}</div>`;
            element.innerHTML = content;
            element.onclick = () => onClickCallback(item);
            container.appendChild(element);
        });
    }

    // --- Логика навигации ---
    coursesBtn.onclick = () => { populateList(courseListContainer, courses, (item) => alert(`Выбран курс: ${item.title}`)); showScreen('courses'); };
    lessonsBtn.onclick = () => { populateList(lessonListContainer, lessons, (item) => alert(`Выбран урок: ${item.title}`)); showScreen('lessons'); };
    testingBtn.onclick = () => { populateList(testListContainer, tests, (item) => showWelcomeScreen(item.id)); showScreen('testList'); };
    teachersBtn.onclick = () => showScreen('teachers');
    bookLessonBtn.onclick = () => showScreen('booking');
    
    document.getElementById('courses-back-btn').onclick = initHome;
    document.getElementById('lessons-back-btn').onclick = initHome;
    document.getElementById('tests-back-btn').onclick = initHome;
    document.getElementById('teachers-back-btn').onclick = initHome;
    document.getElementById('booking-back-btn').onclick = initHome;

    document.getElementById('booking-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время для подтверждения.');
        initHome();
    });

    // --- Логика тестирования ---
    function showWelcomeScreen(testId) {
        currentTest = tests.find(t => t.id === testId);
        if (!currentTest) return;
        welcomeTitle.textContent = currentTest.title;
        welcomeDescription.textContent = currentTest.description;
        welcomeTime.textContent = `${currentTest.timeLimit} минут`;
        welcomeLevelTableContainer.innerHTML = currentTest.scoreTableHTML || '';
        showScreen('welcome');
    }

    function startTest() {
        if (!currentTest) return;
        currentQuestionIndex = 0;
        userAnswers = new Array(currentTest.questions.length).fill(null);
        score = 0;
        showScreen('test');
        startTimer(currentTest.timeLimit * 60);
        loadQuestion();
    }
    
    function startTimer(duration) {
        clearInterval(timerInterval);
        let time = duration;
        timerInterval = setInterval(() => {
            const minutes = Math.floor(time / 60);
            let seconds = time % 60;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            timerEl.textContent = `${minutes}:${seconds}`;
            time--;
            if (time < 0) { clearInterval(timerInterval); finishTest(); }
        }, 1000);
    }

    function goBack() {
        if (currentQuestionIndex > 0) { currentQuestionIndex--; loadQuestion(); }
    }

    function loadQuestion() {
        document.getElementById('test-back-btn').disabled = (currentQuestionIndex === 0);
        const question = currentTest.questions[currentQuestionIndex];
        const totalQuestions = currentTest.questions.length;
        progressBar.style.width = `${((currentQuestionIndex) / totalQuestions) * 100}%`;
        questionCounter.textContent = `Вопрос ${currentQuestionIndex + 1} из ${totalQuestions}`;
        partIndicator.textContent = question.part ? `Часть ${question.part}: ${question.part === 1 ? 'Грамматика' : 'Словарный запас'}` : currentTest.title;
        questionText.innerHTML = question.text.replace(/______/g, '<u>      </u>');
        answerOptions.innerHTML = '';
        const previousAnswer = userAnswers[currentQuestionIndex];
        question.options.forEach(optionText => {
            const button = document.createElement('button');
            button.className = 'option';
            button.textContent = optionText;
            if (optionText === previousAnswer) button.classList.add('selected');
            button.onclick = () => selectAnswer(optionText);
            answerOptions.appendChild(button);
        });
    }

    function selectAnswer(selectedOption) {
        userAnswers[currentQuestionIndex] = selectedOption;
        currentQuestionIndex++;
        if (currentQuestionIndex < currentTest.questions.length) { loadQuestion(); }
        else { finishTest(); }
    }

    function finishTest() {
        clearInterval(timerInterval);
        calculateScore();
        displayResults();
        showScreen('result');
    }

    function calculateScore() {
        score = 0;
        currentTest.questions.forEach((q, index) => { if (userAnswers[index] === q.answer) score++; });
    }

    function displayResults() {
        const totalQuestions = currentTest.questions.length;
        finalScoreEl.parentElement.querySelector('small').textContent = `из ${totalQuestions}`;
        finalScoreEl.textContent = score;
        let level = '';
        let description = `Вы ответили правильно на ${score} из ${totalQuestions} вопросов.`;
        if (currentTest.levelDescriptions) {
             if (score <= 30) level = 'Elementary (A1)';
             else if (score <= 60) level = 'Pre-Intermediate (A2)';
             else if (score <= 90) level = 'Intermediate (B1)';
             else level = 'Upper Intermediate (B2)';
             description = currentTest.levelDescriptions[level];
        }
        finalLevelText = level; 
        resultLevelEl.textContent = level;
        resultDescriptionEl.textContent = description;
    }
    
    function shareResults() {
        if (BOT_USERNAME === 'We_are_ladies' || !BOT_USERNAME) { alert('Пожалуйста, укажите юзернейм вашего бота в файле script.js'); return; }
        const botLink = `https://t.me/${BOT_USERNAME}`;
        const scoreText = `${score} из ${currentTest.questions.length}`;
        const levelText = finalLevelText ? ` (${finalLevelText})` : '';
        const shareText = `Я прошел тест "${currentTest.title}" и получил результат: ${scoreText}${levelText}! 🥳\n\nСможешь лучше? Проверь свой уровень здесь! 👇`;
        const url = `https://t.me/share/url?url=${encodeURIComponent(botLink)}&text=${encodeURIComponent(shareText)}`;
        tg.openTelegramLink(url);
    }
    
    function showReview() {
        reviewContainer.innerHTML = '';
        currentTest.questions.forEach((q, index) => {
            const userAnswer = userAnswers[index] || "Нет ответа";
            const isCorrect = userAnswer === q.answer;
            const item = document.createElement('div');
            item.className = `review-item ${isCorrect ? 'correct' : 'incorrect'}`;
            let html = `<p>${index + 1}. ${q.text.replace(/______/g, '___')}</p><div class="answers">`;
            if(isCorrect) { html += `<div class="user-answer correct-answer">Ваш ответ: ${userAnswer} ✔️</div>`; }
            else { html += `<div class="user-answer incorrect">Ваш ответ: ${userAnswer} ❌</div><div class="correct-answer">Правильный ответ: ${q.answer}</div>`; }
            html += `</div>`;
            item.innerHTML = html;
            reviewContainer.appendChild(item);
        });
        showScreen('review');
    }

    // Обработчики кнопок, связанных с тестами
    document.getElementById('welcome-back-btn').onclick = () => showScreen('testList');
    startTestButton.onclick = startTest;
    document.getElementById('test-back-btn').onclick = goBack;
    document.getElementById('home-from-results-button').onclick = initHome;
    document.getElementById('restart-current-test-button').onclick = startTest;
    document.getElementById('share-results-button').onclick = shareResults;
    document.getElementById('review-answers-button').onclick = showReview;
    document.getElementById('review-back-btn').onclick = () => showScreen('result');

    // --- ПЕРВЫЙ ЗАПУСК ---
    initHome();
});
