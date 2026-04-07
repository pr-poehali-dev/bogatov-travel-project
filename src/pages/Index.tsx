import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMG_ACTION = "https://cdn.poehali.dev/projects/2eb621eb-507b-49ef-8fd5-40538caa0018/files/5f37f7f6-b70a-4959-8d81-a951fb8038f8.jpg";
const IMG_GROUP = "https://cdn.poehali.dev/projects/2eb621eb-507b-49ef-8fd5-40538caa0018/files/87045daa-6abe-4a68-941b-6dbc74b9babf.jpg";
const IMG_AERIAL = "https://cdn.poehali.dev/projects/2eb621eb-507b-49ef-8fd5-40538caa0018/files/5ef3539e-79ac-476e-b0de-6f0a726ada7c.jpg";

const NAV_ITEMS = [
  { label: "О нас", href: "#about" },
  { label: "Туры", href: "#tours" },
  { label: "Калькулятор", href: "#calculator" },
  { label: "Галерея", href: "#gallery" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#booking" },
];

const BENEFITS = [
  { icon: "Flame", title: "Мощный драйв", text: "Маршруты через реальное бездорожье — грязь, броды, крутые подъёмы. Настоящее приключение без купюр." },
  { icon: "Shield", title: "Полная безопасность", text: "Инструктаж, сертифицированная экипировка, сопровождение опытного гида на каждом метре." },
  { icon: "Camera", title: "Крутой контент", text: "Фото и видео съёмка во время поездки. Привезёте домой не просто эмоции, но и эффектный материал." },
  { icon: "Users", title: "Любой формат", text: "Один, пара, компания или корпоратив — подберём маршрут и формат под любую группу." },
  { icon: "MapPin", title: "Живописные маршруты", text: "Природа, горы, леса и особые места, куда не доберётся обычный турист." },
  { icon: "Star", title: "Премиум сервис", text: "Трансфер, питание, комфортная организация — всё продумано до мелочей." },
];

const TOURS = [
  {
    name: "Мини-приключение",
    duration: "1 час",
    audience: "Новички, семьи",
    price: "от 2 500 ₽",
    includes: ["Инструктаж по управлению", "Экипировка (шлем, перчатки)", "Сопровождение инструктора", "Маршрут по лесной тропе"],
    badge: "",
  },
  {
    name: "Драйв-тур",
    duration: "2–3 часа",
    audience: "Друзья, пары",
    price: "от 5 500 ₽",
    includes: ["Полный маршрут по бездорожью", "Остановки с видовыми точками", "Фото-сессия на маршруте", "Снаряжение и инструктаж"],
    badge: "Хит",
  },
  {
    name: "Премиум-поездка",
    duration: "4+ часа",
    audience: "Компании, VIP",
    price: "от 9 000 ₽",
    includes: ["Индивидуальный маршрут", "Видеосъёмка всего маршрута", "Трансфер до места", "Питание и горячий чай"],
    badge: "VIP",
  },
];

const GALLERY = [
  { img: IMG_ACTION, label: "Экстремальное бездорожье" },
  { img: IMG_GROUP, label: "Групповые туры" },
  { img: IMG_AERIAL, label: "Горные маршруты" },
  { img: IMG_ACTION, label: "Лесные тропы" },
  { img: IMG_GROUP, label: "Корпоративные туры" },
  { img: IMG_AERIAL, label: "Панорамные виды" },
];

const REVIEWS = [
  { name: "Михаил Р.", role: "Корпоратив BMW", text: "Организовали тур для 12 человек. Всё чётко: техника, инструкторы, маршрут. Команда в восторге, будем повторять!", rating: 5 },
  { name: "Анна К.", role: "Семейный тур", text: "Взяли детей 12 и 14 лет. Безопасно, весело, незабываемо. Инструктор терпеливый и профессиональный.", rating: 5 },
  { name: "Денис В.", role: "Драйв-тур", text: "Три часа кайфа. Грязь, броды, адреналин. Фотки получились — огонь. Рекомендую всем, кто хочет настоящих эмоций.", rating: 5 },
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
  const [people, setPeople] = useState(2);
  const [hours, setHours] = useState(2);
  const [extra, setExtra] = useState<string[]>([]);
  const [animating, setAnimating] = useState(false);

  const extras = [
    { id: "photo", label: "Фотосъёмка", price: 1500 },
    { id: "video", label: "Видеосъёмка", price: 2500 },
    { id: "transfer", label: "Трансфер", price: 1000 },
    { id: "food", label: "Перекус", price: 800 },
  ];

  const basePerPerson = 2000;
  const hourMult = hours <= 1 ? 1 : hours <= 3 ? 1.8 : 2.8;
  const extrasTotal = extras.filter(e => extra.includes(e.id)).reduce((s, e) => s + e.price, 0);
  const total = Math.round(people * basePerPerson * hourMult) + extrasTotal;

  useEffect(() => {
    setAnimating(true);
    const t = setTimeout(() => setAnimating(false), 250);
    return () => clearTimeout(t);
  }, [people, hours, extra]);

  const toggleExtra = (id: string) => {
    setExtra(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  return (
    <div className="rounded-2xl p-8 md:p-10" style={{ background: "linear-gradient(135deg, #111 0%, #0d0d0d 100%)", border: "1px solid rgba(215,154,87,0.2)" }}>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-7">
          <div>
            <div className="flex justify-between mb-3">
              <span className="font-montserrat text-xs uppercase tracking-widest" style={{ color: "rgba(215,154,87,0.8)" }}>Количество человек</span>
              <span className="font-cormorant text-2xl text-white">{people}</span>
            </div>
            <input type="range" min={1} max={20} step={1} value={people}
              onChange={e => setPeople(+e.target.value)}
              className="w-full h-0.5 bg-[#333] rounded appearance-none cursor-pointer"
              style={{ accentColor: "#d79a57" }} />
            <div className="flex justify-between text-xs mt-1 font-montserrat" style={{ color: "#666" }}>
              <span>1 чел.</span><span>20 чел.</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-3">
              <span className="font-montserrat text-xs uppercase tracking-widest" style={{ color: "rgba(215,154,87,0.8)" }}>Длительность</span>
              <span className="font-cormorant text-2xl text-white">{hours} {hours === 1 ? "час" : hours < 5 ? "часа" : "часов"}</span>
            </div>
            <input type="range" min={1} max={8} step={1} value={hours}
              onChange={e => setHours(+e.target.value)}
              className="w-full h-0.5 bg-[#333] rounded appearance-none cursor-pointer"
              style={{ accentColor: "#d79a57" }} />
            <div className="flex justify-between text-xs mt-1 font-montserrat" style={{ color: "#666" }}>
              <span>1 час</span><span>8 часов</span>
            </div>
          </div>

          <div>
            <div className="font-montserrat text-xs uppercase tracking-widest mb-3" style={{ color: "rgba(215,154,87,0.8)" }}>Дополнительно</div>
            <div className="grid grid-cols-2 gap-2">
              {extras.map(e => (
                <button key={e.id} onClick={() => toggleExtra(e.id)}
                  className="py-2 px-3 rounded-lg border text-xs font-montserrat transition-all duration-300 text-left"
                  style={{
                    borderColor: extra.includes(e.id) ? "#d79a57" : "#2a2a2a",
                    background: extra.includes(e.id) ? "rgba(215,154,87,0.1)" : "transparent",
                    color: extra.includes(e.id) ? "#d79a57" : "#666"
                  }}>
                  {e.label}
                  <span className="block text-xs opacity-70">+{e.price.toLocaleString("ru-RU")} ₽</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center text-center" style={{ borderLeft: "1px solid rgba(215,154,87,0.15)", paddingLeft: "2.5rem" }}>
          <div className="font-montserrat text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(215,154,87,0.6)" }}>Стоимость тура</div>
          <div className={`font-cormorant text-5xl md:text-6xl text-white transition-all duration-250 ${animating ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
            {total.toLocaleString("ru-RU")} ₽
          </div>
          <div className="font-montserrat text-xs mt-3 mb-8" style={{ color: "#555" }}>
            Предварительный расчёт · Точная цена на консультации
          </div>
          <a href="#booking" className="block w-full text-center py-3 px-8 rounded-full font-montserrat text-xs font-semibold uppercase tracking-widest transition-all duration-300"
            style={{ background: "linear-gradient(135deg, #d79a57, #f0b36d)", color: "#160f07" }}>
            Забронировать тур
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const aboutRef = useInView();
  const toursRef = useInView();
  const calcRef = useInView();
  const galleryRef = useInView();
  const reviewsRef = useInView();

  const gold = "linear-gradient(135deg, #d79a57 0%, #f1c98a 50%, #d79a57 100%)";
  const goldText = { background: gold, WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent" as const };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "radial-gradient(circle at top, rgba(215,154,87,0.1), transparent 35%), linear-gradient(180deg,#020202 0%,#070707 40%,#0b0b0b 100%)", color: "#f3e2bf" }}>

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-md" : ""}`}
        style={{ background: scrolled ? "rgba(5,5,5,0.92)" : "transparent", borderBottom: scrolled ? "1px solid rgba(215,154,87,0.1)" : "none" }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-cormorant text-2xl tracking-widest font-semibold" style={goldText}>BOGATOV TRAVEL</div>
          <div className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map(item => (
              <a key={item.href} href={item.href}
                className="font-montserrat text-xs uppercase tracking-widest transition-colors duration-300"
                style={{ color: "#c9b99a" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#d79a57")}
                onMouseLeave={e => (e.currentTarget.style.color = "#c9b99a")}>
                {item.label}
              </a>
            ))}
          </div>
          <a href="#booking"
            className="hidden md:inline-block px-5 py-2 rounded-full font-montserrat text-xs font-semibold uppercase tracking-widest transition-all duration-300"
            style={{ background: gold, color: "#160f07" }}>
            Забронировать
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden" style={{ color: "#d79a57" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 py-5 space-y-4" style={{ background: "#0d0d0d", borderTop: "1px solid rgba(215,154,87,0.1)" }}>
            {NAV_ITEMS.map(item => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                className="block font-montserrat text-sm uppercase tracking-widest" style={{ color: "#c9b99a" }}>
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG_ACTION} alt="Квадротур" className="w-full h-full object-cover" style={{ opacity: 0.22, filter: "grayscale(30%)", transform: "scale(1.05)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.8) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(215,154,87,0.07) 0%, transparent 65%)" }} />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-28">
          <div className="inline-flex items-center gap-3 mb-8 px-5 py-2 rounded-full" style={{ border: "1px solid rgba(215,154,87,0.3)", background: "rgba(215,154,87,0.04)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#d79a57" }} />
            <span className="font-montserrat text-xs uppercase tracking-widest" style={{ color: "#d79a57" }}>Премиальные квадротуры</span>
          </div>

          <h1 className="font-cormorant leading-none mb-4" style={{ fontSize: "clamp(60px,10vw,110px)" }}>
            <span className="block text-white">BOGATOV</span>
            <span className="block" style={goldText}>TRAVEL</span>
          </h1>

          <p className="font-montserrat max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "#e8ddc9", fontSize: "clamp(15px,1.8vw,19px)" }}>
            Квадротуры, приключения и активный отдых. Эмоции, стиль и мощный драйв в каждой поездке.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#booking" className="px-8 py-3 rounded-full font-montserrat text-xs font-semibold uppercase tracking-widest transition-all duration-300"
              style={{ background: gold, color: "#160f07" }}>
              Забронировать тур
            </a>
            <a href="#tours" className="px-8 py-3 rounded-full font-montserrat text-xs uppercase tracking-widest transition-all duration-300"
              style={{ border: "1px solid rgba(215,154,87,0.35)", color: "#d79a57", background: "rgba(215,154,87,0.04)" }}>
              Смотреть туры
            </a>
          </div>

          <div className="mt-20 flex justify-center gap-14 text-center">
            {[["300+", "Клиентов"], ["5 лет", "Опыта"], ["98%", "Довольны"]].map(([n, l]) => (
              <div key={l}>
                <div className="font-cormorant text-3xl" style={goldText}>{n}</div>
                <div className="font-montserrat text-xs uppercase tracking-widest mt-1" style={{ color: "#666" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={20} className="opacity-40" style={{ color: "#d79a57" } as React.CSSProperties} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 px-6">
        <div ref={aboutRef.ref} className={`max-w-7xl mx-auto transition-all duration-1000 ${aboutRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: "#d79a57" }} />
              <span className="font-montserrat text-xs uppercase tracking-widest" style={{ color: "#d79a57" }}>Почему BOGATOV TRAVEL</span>
              <div className="w-8 h-px" style={{ background: "#d79a57" }} />
            </div>
            <h2 className="font-cormorant text-white mb-4" style={{ fontSize: "clamp(32px,5vw,54px)" }}>
              Мы создаём <span style={goldText}>настоящие приключения</span>
            </h2>
            <p className="font-montserrat max-w-2xl mx-auto leading-relaxed" style={{ color: "#d7ccb7", fontSize: "17px" }}>
              Не просто катание — полноценный опыт: маршрут, атмосфера, сервис и контент, который хочется повторять снова.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => (
              <div key={i} className="group rounded-2xl p-7 transition-all duration-500"
                style={{ background: "linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,.015))", border: "1px solid rgba(215,154,87,0.12)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(215,154,87,0.3)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(215,154,87,0.12)")}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(215,154,87,0.1)" }}>
                  <Icon name={b.icon} size={21} style={{ color: "#d79a57" } as React.CSSProperties} />
                </div>
                <h3 className="font-cormorant text-xl mb-2" style={{ color: "#f1c98a" }}>{b.title}</h3>
                <p className="font-montserrat text-sm leading-relaxed" style={{ color: "#ded4c2" }}>{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOURS */}
      <section id="tours" className="py-28 px-6" style={{ background: "rgba(255,255,255,0.015)" }}>
        <div ref={toursRef.ref} className={`max-w-7xl mx-auto transition-all duration-1000 ${toursRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: "#d79a57" }} />
              <span className="font-montserrat text-xs uppercase tracking-widest" style={{ color: "#d79a57" }}>Форматы</span>
              <div className="w-8 h-px" style={{ background: "#d79a57" }} />
            </div>
            <h2 className="font-cormorant text-white" style={{ fontSize: "clamp(32px,5vw,54px)" }}>
              Выберите <span style={goldText}>свой тур</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TOURS.map((tour, i) => (
              <div key={i} className="relative rounded-2xl p-7 flex flex-col"
                style={{ background: i === 1 ? "linear-gradient(135deg,rgba(215,154,87,0.08),rgba(215,154,87,0.02))" : "linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,.015))", border: i === 1 ? "1px solid rgba(215,154,87,0.4)" : "1px solid rgba(215,154,87,0.12)" }}>
                {tour.badge && (
                  <div className="absolute top-5 right-5 px-3 py-1 rounded-full font-montserrat text-xs font-semibold"
                    style={{ background: gold, color: "#160f07" }}>
                    {tour.badge}
                  </div>
                )}
                <div className="font-montserrat text-xs uppercase tracking-widest mb-3" style={{ color: "rgba(215,154,87,0.6)" }}>{tour.audience}</div>
                <h3 className="font-cormorant text-3xl text-white mb-1">{tour.name}</h3>
                <div className="font-montserrat text-sm mb-4" style={{ color: "#888" }}>{tour.duration}</div>
                <ul className="space-y-2 mb-6 flex-1">
                  {tour.includes.map((inc, j) => (
                    <li key={j} className="flex items-start gap-2 font-montserrat text-sm" style={{ color: "#ded4c2" }}>
                      <span className="mt-0.5 flex-shrink-0" style={{ color: "#d79a57" }}>✓</span>
                      {inc}
                    </li>
                  ))}
                </ul>
                <div className="font-cormorant text-3xl text-white mb-4">{tour.price}</div>
                <a href="#booking" className="block text-center py-3 rounded-full font-montserrat text-xs font-semibold uppercase tracking-widest transition-all duration-300"
                  style={i === 1 ? { background: gold, color: "#160f07" } : { border: "1px solid rgba(215,154,87,0.35)", color: "#d79a57" }}>
                  Забронировать
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-28 px-6">
        <div ref={calcRef.ref} className={`max-w-5xl mx-auto transition-all duration-1000 ${calcRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: "#d79a57" }} />
              <span className="font-montserrat text-xs uppercase tracking-widest" style={{ color: "#d79a57" }}>Калькулятор</span>
              <div className="w-8 h-px" style={{ background: "#d79a57" }} />
            </div>
            <h2 className="font-cormorant text-white mb-3" style={{ fontSize: "clamp(32px,5vw,54px)" }}>
              Рассчитайте <span style={goldText}>стоимость</span>
            </h2>
            <p className="font-montserrat text-sm" style={{ color: "#888" }}>Выберите параметры и получите мгновенный расчёт</p>
          </div>
          <Calculator />
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-28 px-6" style={{ background: "rgba(255,255,255,0.012)" }}>
        <div ref={galleryRef.ref} className={`max-w-7xl mx-auto transition-all duration-1000 ${galleryRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: "#d79a57" }} />
              <span className="font-montserrat text-xs uppercase tracking-widest" style={{ color: "#d79a57" }}>Галерея</span>
              <div className="w-8 h-px" style={{ background: "#d79a57" }} />
            </div>
            <h2 className="font-cormorant text-white" style={{ fontSize: "clamp(32px,5vw,54px)" }}>
              Живые <span style={goldText}>эмоции</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY.map((item, i) => (
              <div key={i} className={`group relative overflow-hidden rounded-2xl cursor-pointer ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
                <img src={item.img} alt={item.label}
                  className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${i === 0 ? "h-72 md:h-full" : "h-48 md:h-56"}`} />
                <div className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)" }}>
                  <span className="font-cormorant text-white text-xl">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-28 px-6">
        <div ref={reviewsRef.ref} className={`max-w-7xl mx-auto transition-all duration-1000 ${reviewsRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: "#d79a57" }} />
              <span className="font-montserrat text-xs uppercase tracking-widest" style={{ color: "#d79a57" }}>Отзывы</span>
              <div className="w-8 h-px" style={{ background: "#d79a57" }} />
            </div>
            <h2 className="font-cormorant text-white" style={{ fontSize: "clamp(32px,5vw,54px)" }}>
              Говорят <span style={goldText}>клиенты</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="rounded-2xl p-7" style={{ background: "linear-gradient(135deg,#0d0d0d,#0a0a0a)", border: "1px solid rgba(215,154,87,0.12)" }}>
                <div className="absolute w-px h-8" style={{ background: "linear-gradient(to bottom, #d79a57, transparent)" }} />
                <div className="flex gap-1 mb-5">
                  {[...Array(r.rating)].map((_, j) => <Icon key={j} name="Star" size={13} style={{ color: "#d79a57" } as React.CSSProperties} />)}
                </div>
                <p className="font-cormorant text-lg text-white leading-relaxed mb-6 italic">«{r.text}»</p>
                <div className="pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="font-montserrat text-sm text-white">{r.name}</div>
                  <div className="font-montserrat text-xs mt-1" style={{ color: "#666" }}>{r.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-28 px-6" style={{ background: "radial-gradient(circle at center, rgba(215,154,87,0.08), transparent 50%), linear-gradient(180deg,#090909,#050505)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: "#d79a57" }} />
              <span className="font-montserrat text-xs uppercase tracking-widest" style={{ color: "#d79a57" }}>Бронирование</span>
              <div className="w-8 h-px" style={{ background: "#d79a57" }} />
            </div>
            <h2 className="font-cormorant text-white mb-3" style={{ fontSize: "clamp(32px,5vw,54px)" }}>
              Готовы к <span style={goldText}>приключению?</span>
            </h2>
            <p className="font-montserrat text-sm" style={{ color: "#888" }}>Оставьте заявку — подберём тур под ваш формат и настроение</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(215,154,87,0.2)" }}>
              <form onSubmit={e => e.preventDefault()} className="space-y-5">
                {[
                  { label: "Ваше имя", key: "name", type: "text", placeholder: "Михаил" },
                  { label: "Телефон", key: "phone", type: "tel", placeholder: "+7 (___) ___-__-__" },
                ].map(f => (
                  <div key={f.key}>
                    <label className="font-montserrat text-xs uppercase tracking-widest mb-2 block" style={{ color: "rgba(215,154,87,0.7)" }}>{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder}
                      value={form[f.key as keyof typeof form]}
                      onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full rounded-xl px-4 py-3 font-montserrat text-sm text-white focus:outline-none transition-all"
                      style={{ background: "#111", border: "1px solid #222", caretColor: "#d79a57" }}
                      onFocus={e => (e.currentTarget.style.borderColor = "rgba(215,154,87,0.5)")}
                      onBlur={e => (e.currentTarget.style.borderColor = "#222")} />
                  </div>
                ))}
                <div>
                  <label className="font-montserrat text-xs uppercase tracking-widest mb-2 block" style={{ color: "rgba(215,154,87,0.7)" }}>Пожелания</label>
                  <textarea placeholder="Формат, дата, количество человек..." rows={4}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 font-montserrat text-sm text-white focus:outline-none resize-none transition-all"
                    style={{ background: "#111", border: "1px solid #222" }}
                    onFocus={e => (e.currentTarget.style.borderColor = "rgba(215,154,87,0.5)")}
                    onBlur={e => (e.currentTarget.style.borderColor = "#222")} />
                </div>
                <button type="submit" className="w-full py-3 rounded-full font-montserrat text-xs font-semibold uppercase tracking-widest"
                  style={{ background: gold, color: "#160f07" }}>
                  Отправить заявку
                </button>
              </form>
            </div>

            <div className="space-y-4 pt-2">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (999) 000-00-00" },
                { icon: "MessageCircle", label: "WhatsApp / Telegram", value: "@bogatovtravel" },
                { icon: "Mail", label: "Email", value: "info@bogatovtravel.ru" },
                { icon: "Clock", label: "Режим работы", value: "Ежедневно 9:00–20:00" },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-xl transition-all duration-300"
                  style={{ border: "1px solid rgba(215,154,87,0.1)", background: "rgba(255,255,255,0.02)" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(215,154,87,0.25)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(215,154,87,0.1)")}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(215,154,87,0.1)" }}>
                    <Icon name={c.icon} size={18} style={{ color: "#d79a57" } as React.CSSProperties} />
                  </div>
                  <div>
                    <div className="font-montserrat text-xs uppercase tracking-widest mb-1" style={{ color: "#666" }}>{c.label}</div>
                    <div className="font-montserrat text-sm text-white">{c.value}</div>
                  </div>
                </div>
              ))}

              <div className="flex gap-3 mt-2">
                {[
                  { label: "Позвонить", href: "tel:+79990000000" },
                  { label: "WhatsApp", href: "https://wa.me/79990000000" },
                  { label: "Telegram", href: "https://t.me/username" },
                ].map((b, i) => (
                  <a key={i} href={b.href}
                    className="flex-1 text-center py-2.5 rounded-full font-montserrat text-xs font-semibold uppercase tracking-wide transition-all duration-300"
                    style={i === 0 ? { background: gold, color: "#160f07" } : { border: "1px solid rgba(215,154,87,0.35)", color: "#d79a57" }}>
                    {b.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-cormorant text-xl tracking-widest font-semibold" style={goldText}>BOGATOV TRAVEL</div>
          <div className="font-montserrat text-xs uppercase tracking-widest" style={{ color: "#555" }}>© 2026 · Активные путешествия с характером</div>
          <div className="flex gap-6">
            {NAV_ITEMS.slice(0, 3).map(item => (
              <a key={item.href} href={item.href} className="font-montserrat text-xs transition-colors"
                style={{ color: "#666" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#d79a57")}
                onMouseLeave={e => (e.currentTarget.style.color = "#666")}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
