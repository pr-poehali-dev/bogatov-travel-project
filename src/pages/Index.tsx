import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMG_HERO = "https://cdn.poehali.dev/projects/2eb621eb-507b-49ef-8fd5-40538caa0018/files/59ce4085-068a-4074-bb63-42c25c8b4147.jpg";
const IMG_INTERIOR = "https://cdn.poehali.dev/projects/2eb621eb-507b-49ef-8fd5-40538caa0018/files/5082e5ed-8b6f-4aea-9119-dfdf7d75566a.jpg";
const IMG_PORTRAIT = "https://cdn.poehali.dev/projects/2eb621eb-507b-49ef-8fd5-40538caa0018/files/9e1d9cf7-96d6-480e-9e4e-c7e474978c59.jpg";

const NAV_ITEMS = [
  { label: "О продукте", href: "#about" },
  { label: "Преимущества", href: "#benefits" },
  { label: "Галерея", href: "#gallery" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const BENEFITS = [
  { icon: "Crown", title: "Эксклюзивность", text: "Каждый продукт создаётся в единственном экземпляре — для вас и только для вас." },
  { icon: "Gem", title: "Премиум качество", text: "Только лучшие материалы и технологии, прошедшие многоуровневый контроль." },
  { icon: "Shield", title: "Гарантия статуса", text: "Пять лет гарантийного обслуживания и персональный менеджер 24/7." },
  { icon: "Star", title: "Мировое признание", text: "Лауреат международных наград в области роскоши и инноваций." },
  { icon: "Zap", title: "Мгновенный результат", text: "Доставка и установка в течение 48 часов в любую точку мира." },
  { icon: "Heart", title: "Индивидуальный подход", text: "Персональный дизайнер разработает решение под ваш образ жизни." },
];

const GALLERY_ITEMS = [
  { img: IMG_HERO, label: "Флагманская коллекция" },
  { img: IMG_INTERIOR, label: "Интерьерные решения" },
  { img: IMG_PORTRAIT, label: "Персональный сервис" },
  { img: IMG_HERO, label: "Ограниченная серия" },
  { img: IMG_INTERIOR, label: "Премиум линейка" },
  { img: IMG_PORTRAIT, label: "Bespoke-формат" },
];

const REVIEWS = [
  {
    name: "Александр В.",
    role: "Генеральный директор",
    text: "Уровень сервиса превзошёл все ожидания. Это не просто продукт — это философия жизни на высшем уровне.",
    rating: 5,
  },
  {
    name: "Екатерина М.",
    role: "Владелец холдинга",
    text: "Работаю с премиальными брендами 20 лет. Этот продукт — исключительный. Рекомендую без оговорок.",
    rating: 5,
  },
  {
    name: "Дмитрий К.",
    role: "Инвестор",
    text: "Приобрёл для своей резиденции. Гости неизменно восхищаются. Это вложение в статус, а не просто покупка.",
    rating: 5,
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function Calculator() {
  const [area, setArea] = useState(50);
  const [tier, setTier] = useState(1);
  const [term, setTerm] = useState(3);
  const [animating, setAnimating] = useState(false);

  const tiers = [
    { label: "Стандарт", mult: 1 },
    { label: "Премиум", mult: 1.6 },
    { label: "Bespoke", mult: 2.5 },
  ];

  const basePrice = 85000;
  const total = Math.round(area * basePrice * tiers[tier].mult * (1 + term * 0.1));

  useEffect(() => {
    setAnimating(true);
    const t = setTimeout(() => setAnimating(false), 300);
    return () => clearTimeout(t);
  }, [area, tier, term]);

  return (
    <div className="bg-[#0d0d0d] border border-[#c9a84c]/30 rounded-2xl p-8 md:p-12">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-8">
          <div>
            <div className="flex justify-between mb-3">
              <span className="font-montserrat text-xs uppercase tracking-widest text-[#c9a84c]/80">Площадь</span>
              <span className="font-cormorant text-xl text-white">{area} м²</span>
            </div>
            <input
              type="range" min={20} max={500} step={5} value={area}
              onChange={e => setArea(+e.target.value)}
              className="w-full accent-[#c9a84c] h-0.5 bg-[#333] rounded appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[#666] text-xs mt-1 font-montserrat">
              <span>20 м²</span><span>500 м²</span>
            </div>
          </div>

          <div>
            <div className="mb-3 font-montserrat text-xs uppercase tracking-widest text-[#c9a84c]/80">Уровень</div>
            <div className="flex gap-2">
              {tiers.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setTier(i)}
                  className={`flex-1 py-2 px-3 rounded-lg border text-xs font-montserrat transition-all duration-300 ${
                    tier === i
                      ? "border-[#c9a84c] bg-[#c9a84c]/10 text-[#c9a84c]"
                      : "border-[#333] text-[#666] hover:border-[#c9a84c]/50"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-3">
              <span className="font-montserrat text-xs uppercase tracking-widest text-[#c9a84c]/80">Срок</span>
              <span className="font-cormorant text-xl text-white">{term} {term === 1 ? "год" : term < 5 ? "года" : "лет"}</span>
            </div>
            <input
              type="range" min={1} max={10} step={1} value={term}
              onChange={e => setTerm(+e.target.value)}
              className="w-full accent-[#c9a84c] h-0.5 bg-[#333] rounded appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[#666] text-xs mt-1 font-montserrat">
              <span>1 год</span><span>10 лет</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center text-center border-l border-[#c9a84c]/20 pl-10">
          <div className="font-montserrat text-xs uppercase tracking-widest text-[#c9a84c]/60 mb-4">Стоимость</div>
          <div
            className={`font-cormorant text-5xl md:text-6xl text-white transition-all duration-300 ${animating ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
          >
            {total.toLocaleString("ru-RU")} ₽
          </div>
          <div className="font-montserrat text-[#666] text-xs mt-3 mb-8">
            Предварительный расчёт · Финальная цена после консультации
          </div>
          <a href="#contacts" className="gold-btn w-full text-center">Получить точный расчёт</a>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const aboutRef = useInView();
  const benefitsRef = useInView();
  const galleryRef = useInView();
  const reviewsRef = useInView();
  const calcRef = useInView();

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#080808]/95 backdrop-blur-md border-b border-[#c9a84c]/10" : ""}`}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="font-cormorant text-2xl text-[#c9a84c] tracking-widest">AURUM</div>
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(item => (
              <a key={item.href} href={item.href} className="font-montserrat text-xs uppercase tracking-widest text-[#999] hover:text-[#c9a84c] transition-colors duration-300">
                {item.label}
              </a>
            ))}
          </div>
          <a href="#contacts" className="hidden md:inline-block border border-[#c9a84c] text-[#c9a84c] px-5 py-2 font-montserrat text-xs uppercase tracking-widest hover:bg-[#c9a84c] hover:text-black transition-all duration-300 rounded">Заказать</a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-[#c9a84c]">
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#0d0d0d] border-t border-[#c9a84c]/10 px-6 py-6 space-y-4">
            {NAV_ITEMS.map(item => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                className="block font-montserrat text-sm uppercase tracking-widest text-[#999] hover:text-[#c9a84c] transition-colors">
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG_HERO} alt="Hero" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/60 via-transparent to-[#080808]" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)" }} />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-24">
          <div className="inline-flex items-center gap-3 mb-8 px-5 py-2 border border-[#c9a84c]/30 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
            <span className="font-montserrat text-xs uppercase tracking-widest text-[#c9a84c]">Эксклюзивный продукт</span>
          </div>

          <h1 className="font-cormorant text-6xl md:text-8xl lg:text-9xl leading-none mb-6">
            <span className="block text-white">Искусство</span>
            <span className="block" style={{ background: "linear-gradient(135deg, #c9a84c 0%, #f0d080 50%, #c9a84c 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Превосходства</span>
          </h1>

          <p className="font-montserrat text-[#999] text-sm md:text-base tracking-wider max-w-2xl mx-auto mb-12 leading-relaxed">
            Для тех, кто ценит исключительное. Продукт, созданный на пересечении вековых традиций и передовых технологий.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#about" className="gold-btn">Узнать больше</a>
            <a href="#calculator" className="border border-[#c9a84c]/40 text-[#c9a84c] px-8 py-3 font-montserrat text-xs uppercase tracking-widest hover:bg-[#c9a84c]/5 transition-all duration-300 rounded">
              Рассчитать стоимость
            </a>
          </div>

          <div className="mt-20 flex justify-center gap-12 text-center">
            {[["500+", "Клиентов"], ["12", "Лет опыта"], ["98%", "Довольны"]].map(([n, l]) => (
              <div key={l}>
                <div className="font-cormorant text-3xl" style={{ color: "#c9a84c" }}>{n}</div>
                <div className="font-montserrat text-xs text-[#666] uppercase tracking-widest mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={20} className="text-[#c9a84c]/50" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 px-6">
        <div ref={aboutRef.ref} className={`max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center transition-all duration-1000 ${aboutRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div>
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#c9a84c]" />
              <span className="font-montserrat text-xs uppercase tracking-widest text-[#c9a84c]">О продукте</span>
            </div>
            <h2 className="font-cormorant text-5xl md:text-6xl text-white leading-tight mb-8">
              Создан для тех,<br />
              <span style={{ background: "linear-gradient(135deg, #c9a84c 0%, #f0d080 50%, #c9a84c 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>кто достиг вершин</span>
            </h2>
            <p className="font-montserrat text-[#999] text-sm leading-relaxed mb-6">
              Наш продукт — это результат многолетней работы лучших мастеров своего дела. Каждая деталь продумана до мельчайших подробностей, каждый элемент несёт в себе смысл и ценность.
            </p>
            <p className="font-montserrat text-[#999] text-sm leading-relaxed mb-10">
              Мы не просто создаём продукт. Мы создаём легенду, которая будет сопровождать вас на протяжении всей жизни и передастся следующим поколениям.
            </p>
            <a href="#calculator" className="gold-btn">Рассчитать стоимость</a>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 border border-[#c9a84c]/10 rounded-2xl" />
            <img src={IMG_INTERIOR} alt="О продукте" className="w-full h-96 object-cover rounded-xl" />
            <div className="absolute -bottom-6 -right-6 bg-[#0d0d0d] border border-[#c9a84c]/30 rounded-xl p-6">
              <div className="font-cormorant text-4xl" style={{ color: "#c9a84c" }}>I</div>
              <div className="font-montserrat text-xs text-[#999] uppercase tracking-widest mt-1">Место в рейтинге Forbes</div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="py-32 px-6 bg-[#0a0a0a]">
        <div ref={benefitsRef.ref} className={`max-w-7xl mx-auto transition-all duration-1000 ${benefitsRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6 justify-center">
              <div className="w-8 h-px bg-[#c9a84c]" />
              <span className="font-montserrat text-xs uppercase tracking-widest text-[#c9a84c]">Преимущества</span>
              <div className="w-8 h-px bg-[#c9a84c]" />
            </div>
            <h2 className="font-cormorant text-5xl md:text-6xl text-white">
              Почему выбирают <span style={{ background: "linear-gradient(135deg, #c9a84c 0%, #f0d080 50%, #c9a84c 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>нас</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => (
              <div key={i} className="group border border-[#1a1a1a] hover:border-[#c9a84c]/30 rounded-xl p-8 transition-all duration-500 hover:bg-[#0d0d0d]">
                <div className="w-12 h-12 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center mb-6 group-hover:bg-[#c9a84c]/20 transition-colors duration-300">
                  <Icon name={b.icon} size={22} className="text-[#c9a84c]" fallback="Star" />
                </div>
                <h3 className="font-cormorant text-2xl text-white mb-3">{b.title}</h3>
                <p className="font-montserrat text-[#666] text-sm leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-32 px-6">
        <div ref={calcRef.ref} className={`max-w-5xl mx-auto transition-all duration-1000 ${calcRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6 justify-center">
              <div className="w-8 h-px bg-[#c9a84c]" />
              <span className="font-montserrat text-xs uppercase tracking-widest text-[#c9a84c]">Калькулятор</span>
              <div className="w-8 h-px bg-[#c9a84c]" />
            </div>
            <h2 className="font-cormorant text-5xl md:text-6xl text-white">
              Рассчитайте <span style={{ background: "linear-gradient(135deg, #c9a84c 0%, #f0d080 50%, #c9a84c 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>стоимость</span>
            </h2>
            <p className="font-montserrat text-[#666] text-sm mt-4">
              Настройте параметры и получите предварительный расчёт
            </p>
          </div>
          <Calculator />
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-32 px-6 bg-[#0a0a0a]">
        <div ref={galleryRef.ref} className={`max-w-7xl mx-auto transition-all duration-1000 ${galleryRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6 justify-center">
              <div className="w-8 h-px bg-[#c9a84c]" />
              <span className="font-montserrat text-xs uppercase tracking-widest text-[#c9a84c]">Галерея</span>
              <div className="w-8 h-px bg-[#c9a84c]" />
            </div>
            <h2 className="font-cormorant text-5xl md:text-6xl text-white">
              Наши <span style={{ background: "linear-gradient(135deg, #c9a84c 0%, #f0d080 50%, #c9a84c 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>работы</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_ITEMS.map((item, i) => (
              <div key={i} className={`group relative overflow-hidden rounded-xl cursor-pointer ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
                <img
                  src={item.img}
                  alt={item.label}
                  className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${i === 0 ? "h-72 md:h-full" : "h-48 md:h-56"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="font-cormorant text-white text-xl">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-32 px-6">
        <div ref={reviewsRef.ref} className={`max-w-7xl mx-auto transition-all duration-1000 ${reviewsRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6 justify-center">
              <div className="w-8 h-px bg-[#c9a84c]" />
              <span className="font-montserrat text-xs uppercase tracking-widest text-[#c9a84c]">Отзывы</span>
              <div className="w-8 h-px bg-[#c9a84c]" />
            </div>
            <h2 className="font-cormorant text-5xl md:text-6xl text-white">
              Говорят <span style={{ background: "linear-gradient(135deg, #c9a84c 0%, #f0d080 50%, #c9a84c 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>клиенты</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="border border-[#1a1a1a] rounded-xl p-8 relative" style={{ background: "linear-gradient(135deg, #0d0d0d 0%, #0a0a0a 100%)" }}>
                <div className="absolute top-0 left-8 w-px h-8 bg-gradient-to-b from-[#c9a84c] to-transparent" />
                <div className="flex gap-1 mb-6">
                  {[...Array(r.rating)].map((_, j) => (
                    <Icon key={j} name="Star" size={14} className="text-[#c9a84c]" />
                  ))}
                </div>
                <p className="font-cormorant text-xl text-white leading-relaxed mb-8 italic">«{r.text}»</p>
                <div className="border-t border-[#1a1a1a] pt-6">
                  <div className="font-montserrat text-sm text-white">{r.name}</div>
                  <div className="font-montserrat text-xs text-[#666] mt-1">{r.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS + FORM */}
      <section id="contacts" className="py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6 justify-center">
              <div className="w-8 h-px bg-[#c9a84c]" />
              <span className="font-montserrat text-xs uppercase tracking-widest text-[#c9a84c]">Контакты</span>
              <div className="w-8 h-px bg-[#c9a84c]" />
            </div>
            <h2 className="font-cormorant text-5xl md:text-6xl text-white mb-4">
              Оставьте <span style={{ background: "linear-gradient(135deg, #c9a84c 0%, #f0d080 50%, #c9a84c 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>заявку</span>
            </h2>
            <p className="font-montserrat text-[#666] text-sm">Персональный менеджер свяжется в течение 2 часов</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="border border-[#c9a84c]/20 rounded-xl p-8 bg-[#0d0d0d]">
              <form onSubmit={e => e.preventDefault()} className="space-y-5">
                <div>
                  <label className="font-montserrat text-xs uppercase tracking-widest text-[#c9a84c]/70 mb-2 block">Ваше имя</label>
                  <input
                    type="text" placeholder="Александр"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-3 text-white font-montserrat text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-colors placeholder-[#444]"
                  />
                </div>
                <div>
                  <label className="font-montserrat text-xs uppercase tracking-widest text-[#c9a84c]/70 mb-2 block">Телефон</label>
                  <input
                    type="tel" placeholder="+7 (___) ___-__-__"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-3 text-white font-montserrat text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-colors placeholder-[#444]"
                  />
                </div>
                <div>
                  <label className="font-montserrat text-xs uppercase tracking-widest text-[#c9a84c]/70 mb-2 block">Пожелания</label>
                  <textarea
                    placeholder="Расскажите о ваших пожеланиях..."
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-3 text-white font-montserrat text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-colors placeholder-[#444] resize-none"
                  />
                </div>
                <button type="submit" className="gold-btn w-full">Отправить заявку</button>
              </form>
            </div>

            <div className="space-y-5 pt-2">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (800) 555-35-35" },
                { icon: "Mail", label: "Электронная почта", value: "hello@aurum.ru" },
                { icon: "MapPin", label: "Адрес", value: "Москва, Пресненская набережная, 12" },
                { icon: "Clock", label: "Режим работы", value: "Пн–Вс, 9:00–21:00" },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-5 p-5 border border-[#1a1a1a] rounded-xl hover:border-[#c9a84c]/20 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={c.icon} size={18} className="text-[#c9a84c]" />
                  </div>
                  <div>
                    <div className="font-montserrat text-xs text-[#666] uppercase tracking-widest mb-1">{c.label}</div>
                    <div className="font-montserrat text-sm text-white">{c.value}</div>
                  </div>
                </div>
              ))}

              <div className="p-6 border border-[#c9a84c]/20 rounded-xl" style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.05) 0%, transparent 100%)" }}>
                <div className="font-cormorant text-2xl mb-2" style={{ color: "#c9a84c" }}>Конфиденциальность</div>
                <p className="font-montserrat text-xs text-[#666] leading-relaxed">
                  Ваши данные в полной безопасности. Мы работаем только с проверенными клиентами и гарантируем полную конфиденциальность сделки.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1a1a1a] py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-cormorant text-2xl tracking-widest" style={{ color: "#c9a84c" }}>AURUM</div>
          <div className="font-montserrat text-xs text-[#444] uppercase tracking-widest">© 2026 AURUM. Все права защищены.</div>
          <div className="flex gap-6">
            {NAV_ITEMS.slice(0, 3).map(item => (
              <a key={item.href} href={item.href} className="font-montserrat text-xs text-[#666] hover:text-[#c9a84c] transition-colors">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}