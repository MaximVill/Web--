export const COSTUMES = [
  {
    id: 'sheet', name: 'Простыня с прорезями', price: 0,
    desc: 'без бонусов',
  },
  {
    id: 'detective', name: 'Костюм Детектива', price: 60,
    desc: 'подсвечивает слова-улики',
  },
  {
    id: 'robot', name: 'Картонный Робот', price: 90,
    desc: '+25% сладостей · испуг быстрее',
  },
  {
    id: 'fangs', name: 'Пластиковые клыки', price: 120,
    desc: 'монстры болтают лишнее',
  },
]
export const COSTUME_BY_ID = Object.fromEntries(COSTUMES.map((c) => [c.id, c]))
