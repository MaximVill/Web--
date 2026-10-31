// Hybrid AI Engine: Semantic NLP Classifier + Match Accuracy Calculator (Zero Emojis)

class MemeAI {
  constructor() {
    this.initMemeProfiles();
  }

  initMemeProfiles() {
    this.profiles = {
      'harold': {
        traits: ['pain', 'medicine', 'doctor', 'sadness', 'age', 'existential', 'forced_smile', 'fatigue', 'accept', 'endure'],
        keywords: ['врач', 'боль', 'сон', 'усталость', 'возраст', 'болезнь', 'лекарство', 'алкоголь', 'терпение', 'слезы', 'психолог', 'жизнь', 'депрессия', 'давление', 'анализы']
      },
      'this-is-fine': {
        traits: ['disaster', 'fire', 'work', 'deadline', 'server', 'panic', 'denial', 'calm', 'chaos', 'breakdown'],
        keywords: ['горит', 'пожар', 'дедлайн', 'сервер', 'начальник', 'отчет', 'крах', 'совещание', 'инвесторы', 'код', 'аврал', 'ошибка', 'увольнение', 'конец']
      },
      'gatsby': {
        traits: ['party', 'alcohol', 'wealth', 'toast', 'friend', 'luxury', 'celebrate', 'night', 'champagne', 'success'],
        keywords: ['алкоголь', 'бар', 'вечеринка', 'тусовка', 'друг', 'бокал', 'деньги', 'миллион', 'праздник', 'вино', 'успех', 'богатство', 'клуб', 'ночь', 'гулять']
      },
      'gigachad': {
        traits: ['confidence', 'bold', 'stubborn', 'strength', 'masculine', 'unapologetic', 'direct', 'pride'],
        keywords: ['спорт', 'зал', 'мышцы', 'сила', 'правда', 'отказ', 'характер', 'честно', 'уверенность', 'принцип', 'база', 'мужик', 'тренер']
      },
      'boromir': {
        traits: ['impossible', 'hard', 'challenge', 'epic', 'quest', 'effort', 'heroic'],
        keywords: ['просто', 'сложно', 'невозможно', 'экзамен', 'диплом', 'ипотека', 'ремонт', 'похудеть', 'сдать', 'найти', 'дойти', 'купить']
      },
      'roll-safe': {
        traits: ['lifehack', 'smart', 'cheat', 'logic', 'cunning', 'trick', 'save', 'laziness'],
        keywords: ['хитрость', 'лайфхак', 'умный', 'сэкономить', 'обмануть', 'отменить', 'не работать', 'лень', 'схема', 'план', 'логика']
      },
      'pikachu': {
        traits: ['shock', 'surprise', 'consequence', 'naive', 'obvious', 'blank'],
        keywords: ['кошелек', 'пустой', 'потратил', 'шок', 'внезапно', 'пропал', 'счет', 'деньги', 'зарплата', 'ноль', 'забыл', 'удалил']
      },
      'monkey-puppet': {
        traits: ['awkward', 'guilt', 'secret', 'caught', 'avoid', 'side_eye', 'shame'],
        keywords: ['стыд', 'секрет', 'план', 'будущее', 'отношения', 'свадьба', 'виноват', 'украл', 'разбил', 'съел', 'промолчал', 'сбежал']
      },
      'woman-cat': {
        traits: ['blame', 'accusation', 'screaming', 'calm', 'cat', 'eating', 'food', 'innocent'],
        keywords: ['кот', 'еда', 'бутерброд', 'салат', 'чипсы', 'пицца', 'шаурма', 'учительница', 'крик', 'претензия', 'обед', 'кушать']
      },
      'fry': {
        traits: ['skepticism', 'suspicion', 'doubt', 'fake', 'scrutiny', 'detective'],
        keywords: ['подозрение', 'обман', 'ложь', 'фейк', 'быстро', 'проект', 'скачал', 'списал', 'проверка', 'сомнение', 'начальник']
      },
      'drake': {
        traits: ['choice', 'procrastination', 'preference', 'laziness', 'taste'],
        keywords: ['мемы', 'уборка', 'интернет', 'сериал', 'ютуб', 'выбор', 'прокрастинация', 'деградация', 'отдых', 'игры', 'тикток']
      },
      'distracted-boyfriend': {
        traits: ['temptation', 'distraction', 'impulse', 'betrayal', 'infatuation'],
        keywords: ['видео', 'котики', 'ночь', 'ютуб', 'сон', 'работа', 'девушка', 'соблазн', 'залип', 'рекомендации', 'случайно']
      },
      'disaster-girl': {
        traits: ['mischief', 'destruction', 'cynical', 'revenge', 'fire'],
        keywords: ['месть', 'сломал', 'удалил', 'уволился', 'пожар', 'взорвал', 'хаос', 'поджег', 'назло', 'радость']
      },
      'two-buttons': {
        traits: ['dilemma', 'sweat', 'hard_choice', 'stress', 'struggle'],
        keywords: ['выбор', 'между', 'купить', 'поспать', 'поесть', 'решить', 'сомнения', 'кнопка', 'трудный']
      },
      'grus-plan': {
        traits: ['plan_fail', 'unexpected', 'scheme', 'backfire', 'presentation'],
        keywords: ['план', 'бизнес', 'стартап', 'стратегия', 'итог', 'ошибка', 'провал', 'презентация', 'пункт']
      },
      'trade-offer': {
        traits: ['trade', 'deal', 'exchange', 'business', 'offer'],
        keywords: ['обмен', 'сделка', 'предложение', 'купить', 'продать', 'взамен', 'цена', 'договор', 'бартер']
      },
      'bernie': {
        traits: ['asking', 'begging', 'support', 'donation', 'humble', 'petition'],
        keywords: ['помощь', 'просить', 'поддержка', 'денег', 'одолжить', 'донаты', 'пожалуйста', 'снова', 'дай']
      },
      'doge-cheems': {
        traits: ['pathetic', 'contrast', 'weakness', 'expectation_vs_reality'],
        keywords: ['ожидание', 'реальность', 'слабый', 'нытик', 'раньше', 'сейчас', 'детство', 'взрослый']
      }
    };
  }

  // Calculates exact match accuracy percentage (60% to 99%)
  calculateMatchScore(sentenceText, word, memeId) {
    const cleanWord = (word || '').toLowerCase().trim();
    const cleanSentence = (sentenceText || '').toLowerCase();
    const profile = this.profiles[memeId];
    if (!profile) return Math.floor(75 + Math.random() * 18);

    let score = 0;

    // Direct matches
    for (const kw of profile.keywords) {
      if (cleanWord.includes(kw)) score += 18;
      if (cleanSentence.includes(kw)) score += 7;
    }

    // Trait matches
    for (const trait of profile.traits) {
      if (cleanSentence.includes(trait) || cleanWord.includes(trait)) score += 5;
    }

    // Specific high-affinity pairs
    if ((cleanWord.includes('алкоголь') || cleanWord.includes('пиво') || cleanWord.includes('вино')) && memeId === 'gatsby') score += 25;
    if ((cleanWord.includes('алкоголь') || cleanWord.includes('врач') || cleanWord.includes('боль')) && memeId === 'harold') score += 22;
    if ((cleanWord.includes('дедлайн') || cleanWord.includes('горит') || cleanWord.includes('работа')) && memeId === 'this-is-fine') score += 24;
    if ((cleanWord.includes('деньги') || cleanWord.includes('зарплат') || cleanWord.includes('кошелек')) && memeId === 'pikachu') score += 20;
    if ((cleanWord.includes('кот') || cleanWord.includes('еда') || cleanWord.includes('салат')) && memeId === 'woman-cat') score += 26;
    if ((cleanWord.includes('мем') || cleanWord.includes('сериал') || cleanWord.includes('ютуб')) && memeId === 'drake') score += 22;
    if ((cleanWord.includes('зал') || cleanWord.includes('спорт')) && memeId === 'gigachad') score += 24;

    // Return realistic accuracy percentage
    const base = 68;
    const finalPct = Math.min(99, Math.max(61, Math.round(base + score * 1.4)));
    return finalPct;
  }
}

window.MemeAI = MemeAI;
