// Perfectly cohesive meme scenarios where text, blank word and meme image match 100%

const SCENARIOS = [
  {
    id: 'harold-doctor',
    memeFile: 'assets/memes/harold.jpg',
    memeName: 'Гарольд, скрывающий боль',
    before: 'Терапевт внимательно изучил мои анализы, тяжело вздохнул и с сочувствием сказал: «Вам срочно нужен',
    after: '»',
    defaultWord: 'сон',
    makeCaptions: (w) => ({
      top: `«ВАМ СРОЧНО НУЖЕН ${w.toUpperCase()}»`,
      bottom: '*УЛЫБАЕТСЯ СКВОЗЬ НЕВЫНОСИМУЮ БОЛЬ*'
    })
  },
  {
    id: 'this-is-fine-meeting',
    memeFile: 'assets/memes/this-is-fine.jpg',
    memeName: 'This is Fine (Пес в огне)',
    before: 'Шел четвертый час совещания с инвесторами. Директор строго спросил: «Кто вообще отвечает за наш',
    after: '?!»',
    defaultWord: 'отчет',
    makeCaptions: (w) => ({
      top: `«КТО ОТВЕЧАЕТ ЗА НАШ ${w.toUpperCase()}?!»`,
      bottom: 'ВСЕ ХОРОШО. ВСЕ ПОД КОНТРОЛЕМ.'
    })
  },
  {
    id: 'gatsby-party',
    memeFile: 'assets/memes/gatsby.jpg',
    memeName: 'Великий Гэтсби (ДиКаприо)',
    before: 'Друг поклялся: «Мы зайдем в гости буквально на пять минут, чтобы просто забрать',
    after: 'и сразу пойдем обратно»',
    defaultWord: 'ключи',
    makeCaptions: (w) => ({
      top: `«ЗАЙДЕМ НА 5 МИНУТ ЗАБРАТЬ ${w.toUpperCase()}»`,
      bottom: 'В 4:30 УТРА: ЗА ТЕБЯ И ЗА УДАЧУ, СТАРИНА!'
    })
  },
  {
    id: 'woman-cat-food',
    memeFile: 'assets/memes/woman-cat.jpg',
    memeName: 'Женщина кричит на кота',
    before: 'Учительница кричала на весь класс: «А голову ты дома не забыл?!» На что я тихо ответил: «Зато я взял с собой',
    after: '»',
    defaultWord: 'бутерброд',
    makeCaptions: (w) => ({
      top: 'ОНА: А ГОЛОВУ ТЫ ДОМА НЕ ЗАБЫЛ?!',
      bottom: `Я И МОЙ ${w.toUpperCase()}: СПОКОЙНО КУШАЕМ ЗА СТОЛОМ`
    })
  },
  {
    id: 'monkey-puppet-talk',
    memeFile: 'assets/memes/monkey-puppet.jpg',
    memeName: 'Обезьянка отводит взгляд',
    before: 'Вторая половинка посадила меня на диван и сказала: «Нам пора серьезно обсудить наш общий',
    after: '»',
    defaultWord: 'бюджет',
    makeCaptions: (w) => ({
      top: `«НАМ ПОРА СЕРЬЕЗНО ОБСУДИТЬ НАШ ${w.toUpperCase()}»`,
      bottom: 'Я, ДЕЛАЮЩИЙ ВИД, ЧТО МЕНЯ ЗДЕСЬ НЕТ:'
    })
  },
  {
    id: 'pikachu-wallet',
    memeFile: 'assets/memes/pikachu.jpg',
    memeName: 'Удивленный Пикачу',
    before: 'Я потратил всю свою зарплату за два дня. Открываю свой пустой',
    after: 'и искренне не понимаю, куда все делось...',
    defaultWord: 'кошелек',
    makeCaptions: (w) => ({
      top: 'ПОТРАТИЛ ВСЮ ЗАРПЛАТУ ЗА 2 ДНЯ',
      bottom: `СМОТРИТ В ПУСТОЙ ${w.toUpperCase()}: :О КАК ТАК-ТО?! :О`
    })
  },
  {
    id: 'roll-safe-hack',
    memeFile: 'assets/memes/roll-safe.jpg',
    memeName: 'Roll Safe (Умный парень)',
    before: 'Друзья спросили, как я планирую выживать без денег. Я хитро улыбнулся и ответил: «Я просто перестал платить за',
    after: '»',
    defaultWord: 'еду',
    makeCaptions: (w) => ({
      top: 'ТЕБЕ НЕ ПРИДЕТСЯ ТРАТИТЬСЯ',
      bottom: `ЕСЛИ ТЫ ПРОСТО ПЕРЕСТАЛ ПЛАТИТЬ ЗА ${w.toUpperCase()}`
    })
  },
  {
    id: 'distracted-boyfriend-night',
    memeFile: 'assets/memes/distracted-boyfriend.jpg',
    memeName: 'Неверный парень',
    before: 'Я дал себе обещание лечь спать пораньше, но в три часа ночи в рекомендациях появилось видео про',
    after: '...',
    defaultWord: 'котиков',
    makeCaptions: (w) => ({
      top: 'ЗДОРОВЫЙ СОН 8 ЧАСОВ  <---  Я  --->',
      bottom: `РОЛИК ПРО ${w.toUpperCase()} В 3 ЧАСА НОЧИ`
    })
  },
  {
    id: 'drake-priorities',
    memeFile: 'assets/memes/drake.jpg',
    memeName: 'Дрейк',
    before: 'В субботу утром у меня был выбор: навести идеальный порядок в квартире или весь день изучать',
    after: 'в интернете.',
    defaultWord: 'мемы',
    makeCaptions: (w) => ({
      top: 'СДЕЛАТЬ ГЕНЕРАЛЬНУЮ УБОРКУ',
      bottom: `ВЕСЬ ДЕНЬ ИЗУЧАТЬ ${w.toUpperCase()}`
    })
  },
  {
    id: 'fry-suspicion',
    memeFile: 'assets/memes/fry.jpg',
    memeName: 'Скептичный Фрай',
    before: 'Начальник зашел в кабинет, подозрительно прищурился и произнес: «Ты подозрительно быстро сдал свой',
    after: '»',
    defaultWord: 'проект',
    makeCaptions: (w) => ({
      top: `НЕ УВЕРЕН, ТЫ РЕАЛЬНО СДАЛ ${w.toUpperCase()}...`,
      bottom: '...ИЛИ ПРОСТО СКАЧАЛ ГОТОВОЕ ИЗ СЕТИ'
    })
  },
  {
    id: 'gigachad-resume',
    memeFile: 'assets/memes/gigachad.jpg',
    memeName: 'Гигачад',
    before: 'В резюме в графе «ключевые навыки» я уверенно написал: «Мое главное достоинство — это',
    after: '»',
    defaultWord: 'честность',
    makeCaptions: (w) => ({
      top: `«МОЕ ГЛАВНОЕ ДОСТОИНСТВО — ЭТО ${w.toUpperCase()}»`,
      bottom: 'ДА, И МЕНЯ ВЗЯЛИ НА РАБОТУ.'
    })
  },
  {
    id: 'boromir-task',
    memeFile: 'assets/memes/boromir.jpg',
    memeName: 'Боромир',
    before: 'Родители строго посмотрели на меня и сказали: «Нельзя просто так взять и бросить',
    after: '!»',
    defaultWord: 'универ',
    makeCaptions: (w) => ({
      top: 'НЕЛЬЗЯ ПРОСТО ТАК ВЗЯТЬ',
      bottom: `И БРОСИТЬ ${w.toUpperCase()}`
    })
  },
  {
    id: 'disaster-girl-chaos',
    memeFile: 'assets/memes/disaster-girl.jpg',
    memeName: 'Девочка на фоне пожара',
    before: 'Я случайно нажал удалить и стер с рабочего компьютера главный',
    after: '...',
    defaultWord: 'сервер',
    makeCaptions: (w) => ({
      top: `СЛУЧАЙНО УДАЛИЛ ГЛАВНЫЙ ${w.toUpperCase()}`,
      bottom: 'СТОЮ И СПОКОЙНО СМОТРЮ, ЧТО БУДЕТ'
    })
  },
  {
    id: 'two-buttons-choice',
    memeFile: 'assets/memes/two-buttons.jpg',
    memeName: 'Две кнопки',
    before: 'В два часа ночи мой уставший мозг мучительно выбирал между здоровым сном и',
    after: '...',
    defaultWord: 'сериалом',
    makeCaptions: (w) => ({
      top: `ЛЕЧЬ СПАТЬ   ИЛИ   ${w.toUpperCase()}`,
      bottom: 'САМЫЙ СЛОЖНЫЙ ВЫБОР В ЖИЗНИ'
    })
  },
  {
    id: 'grus-plan-fail',
    memeFile: 'assets/memes/grus-plan.jpg',
    memeName: 'План Грю',
    before: 'У меня был идеальный план на день: проснуться рано, сделать дела и начать',
    after: '...',
    defaultWord: 'учебу',
    makeCaptions: (w) => ({
      top: `РАНО ВСТАТЬ -> СДЕЛАТЬ ДЕЛА -> НАЧАТЬ ${w.toUpperCase()}`,
      bottom: `НАЧАТЬ ${w.toUpperCase()}?! ПОЧЕМУ ОПЯТЬ?!`
    })
  },
  {
    id: 'trade-offer-deal',
    memeFile: 'assets/memes/trade-offer.jpg',
    memeName: 'Выгодное предложение',
    before: 'Понедельник утром делает мне одно и то же предложение: ты отдаешь свои нервы, а взамен получаешь',
    after: '...',
    defaultWord: 'копейки',
    makeCaptions: (w) => ({
      top: 'Я ПОЛУЧАЮ: ТВОИ НЕРВЫ И ЗДОРОВЬЕ',
      bottom: `ТЫ ПОЛУЧАЕШЬ: ${w.toUpperCase()}`
    })
  },
  {
    id: 'bernie-again',
    memeFile: 'assets/memes/bernie.jpg',
    memeName: 'Берни Сандерс',
    before: 'Я снова пришел в бухгалтерию с одной и той же скромной просьбой: мне очень нужен мой',
    after: '...',
    defaultWord: 'аванс',
    makeCaptions: (w) => ({
      top: 'Я СНОВА ЗДЕСЬ И СНОВА ПРОШУ',
      bottom: `ВЫПЛАТИТЬ МНЕ МОЙ ${w.toUpperCase()}`
    })
  },
  {
    id: 'doge-cheems-reality',
    memeFile: 'assets/memes/doge-cheems.png',
    memeName: 'Доге и Чимс',
    before: 'Я думал, что взрослая жизнь — это свобода и деньги, а это просто бесконечный',
    after: '...',
    defaultWord: 'стресс',
    makeCaptions: (w) => ({
      top: 'МОИ МЕЧТЫ О ВЗРОСЛОЙ ЖИЗНИ',
      bottom: `РЕАЛЬНОСТЬ: БЕСКОНЕЧНЫЙ ${w.toUpperCase()}`
    })
  }
];

window.SCENARIOS = SCENARIOS;
// Fallback for editor template picker
window.MEME_TEMPLATES = SCENARIOS.map(s => ({
  id: s.id,
  name: s.memeName,
  file: s.memeFile
}));
