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

const TOURS_STANDARD = [
  {
    name: "Первый шаг",
    sub: "Пробный заезд",
    duration: "5 минут",
    price: "600 ₽",
    passenger: null,
    badge: "",
    desc: "Почувствуй управление квадроциклом — идеально для тех, кто пробует впервые.",
  },
  {
    name: "Разгон",
    sub: "Прокат",
    duration: "10 минут",
    price: "1 500 ₽",
    passenger: "+ пассажир 500 ₽",
    badge: "",
    desc: "Короткая, но насыщенная поездка. Успеешь почувствовать настоящий драйв.",
  },
  {
    name: "Вольный ветер",
    sub: "Прокат",
    duration: "20 минут",
    price: "2 500 ₽",
    passenger: "+ пассажир 1 000 ₽",
    badge: "",
    desc: "Отличный вариант для прогулки в паре — время есть, маршрут интересный.",
  },
  {
    name: "Лесной дозор",
    sub: "Мини-тур",
    duration: "40 минут",
    price: "4 500 ₽",
    passenger: "+ пассажир 1 000 ₽",
    badge: "Хит",
    desc: "Полноценный заезд с маршрутом по лесным тропам. Любимый формат новичков.",
  },
  {
    name: "Дикая трасса",
    sub: "Тур",
    duration: "60 минут",
    price: "6 000 ₽",
    passenger: "+ пассажир 1 500 ₽",
    badge: "Топ",
    desc: "Час настоящего бездорожья. Грязь, адреналин, незабываемые эмоции — всё включено.",
  },
];

const TOUR_PREMIUM = {
  name: "Свободный маршрут",
  sub: "Индивидуальная прогулка",
  duration: "1.5 — 2 часа",
  price: "10 000 ₽",
  passenger: "+ пассажир 3 500 ₽",
  includes: [
    "Гибкий маршрут под ваши желания",
    "Фото и видеоролик в подарок",
    "Сопровождение опытного гида",
    "Только вы и природа",
  ],
};

const GALLERY = [
  { img: IMG_ACTION, label: "Экстремальное бездорожье" },
  { img: IMG_GROUP, label: "Групповые туры" },
  { img: IMG_AERIAL, label: "Горные маршруты" },
  { img: IMG_ACTION, label: "Лесные тропы" },
  { img: IMG_GROUP, label: "Корпоративные туры" },
  { img: IMG_AERIAL, label: "Панорамные виды" },
];

const REVIEWS = [
  {
    name: "Анна",
    role: "Семейный тур",
    text: "Спасибо огромное за организацию такого чудесного мероприятия! Мой подарок сыновьям и внукам очень пришелся по душе! Насладились драйвом, заправились адреналином, запаслись фееричными эмоциями! Организация на высшем уровне! Все безопасно, экологично! Какие же вы молодцы, ребята! Мои все сказали: хотим еще!!!",
    rating: 5,
  },
  {
    name: "Евгения",
    role: "Тур с детьми",
    text: "Спасибо Вам огромное за прекрасно проведённое время, за положительные эмоции, адреналин 😁 Детям очень понравилось! Много эмоций!!! Если дети довольны, значит всё было на высшем уровне!!! Ещё раз СПАСИБО ОГРОМНОЕ!!! До новых встреч 😊",
    rating: 5,
  },
  {
    name: "Александр",
    role: "Драйв-тур",
    text: "Спасибо большое за фото, за непередаваемые эмоции. Заряжает на весь день. Всё очееень круто 😁 Было здорово поучаствовать в розыгрыше и получить сообщение, что выиграла. Вы крутые ребятки. Желаю успехов в этом деле)",
    rating: 5,
  },
  {
    name: "Анастасия",
    role: "Первый раз на квадроциклах",
    text: "Ещё раз, огромное спасибо, за покатушки 👍 Очень круто покатались 😁 Нас радужно встретили инструктора, к назначенному времени. Поехали в первые с дочерью. Инструктаж для новичков провели, одежду выдали. Получили ещё доп время для поездки 🥳, шикарные эмоции и впечатления. С радостью приедем ещё и будем советовать друзьям 👌 Попробовали и поняли что оно того стоит ❤️‍🔥",
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

const PRICE_OPTIONS = [
  { id: "t5",  label: "Первый шаг",    duration: "5 мин",  basePrice: 600,   passengerPrice: 0 },
  { id: "t10", label: "Разгон",        duration: "10 мин", basePrice: 1500,  passengerPrice: 500 },
  { id: "t20", label: "Вольный ветер", duration: "20 мин", basePrice: 2500,  passengerPrice: 1000 },
  { id: "t40", label: "Лесной дозор",  duration: "40 мин", basePrice: 4500,  passengerPrice: 1000 },
  { id: "t60", label: "Дикая трасса",  duration: "60 мин", basePrice: 6000,  passengerPrice: 1500 },
  { id: "ind", label: "Свободный маршрут", duration: "1.5–2 ч", basePrice: 10000, passengerPrice: 3500 },
];

function Calculator() {
  const [tourId, setTourId] = useState("t40");
  const [quads, setQuads] = useState(1);
  const [passengers, setPassengers] = useState(0);
  const [animating, setAnimating] = useState(false);

  const tour = PRICE_OPTIONS.find(t => t.id === tourId)!;
  const total = tour.basePrice * quads + tour.passengerPrice * passengers;

  useEffect(() => {
    setAnimating(true);
    const t = setTimeout(() => setAnimating(false), 250);
    return () => clearTimeout(t);
  }, [tourId, quads, passengers]);

  // сбрасываем пассажиров если тариф без пассажира
  useEffect(() => {
    if (tour.passengerPrice === 0) setPassengers(0);
  }, [tourId]);

  return (
    <div className="rounded-2xl p-8 md:p-10" style={{ background: "linear-gradient(135deg, #111 0%, #0d0d0d 100%)", border: "1px solid rgba(215,154,87,0.2)" }}>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-7">

          {/* Выбор тура */}
          <div>
            <div className="font-montserrat text-xs uppercase tracking-widest mb-3" style={{ color: "rgba(215,154,87,0.8)" }}>Формат тура</div>
            <div className="space-y-2">
              {PRICE_OPTIONS.map(opt => (
                <button key={opt.id} onClick={() => setTourId(opt.id)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl border font-montserrat text-sm transition-all duration-200"
                  style={{
                    borderColor: tourId === opt.id ? "#d79a57" : "#252525",
                    background: tourId === opt.id ? "rgba(215,154,87,0.08)" : "transparent",
                    color: tourId === opt.id ? "#f1c98a" : "#777",
                  }}>
                  <span className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full flex-shrink-0 transition-all"
                      style={{ background: tourId === opt.id ? "#d79a57" : "#333" }} />
                    <span>{opt.label}</span>
                    <span className="text-xs opacity-60">{opt.duration}</span>
                  </span>
                  <span className="font-cormorant text-lg" style={{ color: tourId === opt.id ? "#d79a57" : "#555" }}>
                    {opt.basePrice.toLocaleString("ru-RU")} ₽
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Количество квадроциклов */}
          <div>
            <div className="flex justify-between mb-3">
              <span className="font-montserrat text-xs uppercase tracking-widest" style={{ color: "rgba(215,154,87,0.8)" }}>Квадроциклов</span>
              <span className="font-cormorant text-2xl text-white">{quads}</span>
            </div>
            <input type="range" min={1} max={10} step={1} value={quads}
              onChange={e => setQuads(+e.target.value)}
              className="w-full h-0.5 bg-[#333] rounded appearance-none cursor-pointer"
              style={{ accentColor: "#d79a57" }} />
            <div className="flex justify-between text-xs mt-1 font-montserrat" style={{ color: "#555" }}>
              <span>1</span><span>10</span>
            </div>
          </div>

          {/* Пассажиры */}
          {tour.passengerPrice > 0 && (
            <div>
              <div className="flex justify-between mb-3">
                <span className="font-montserrat text-xs uppercase tracking-widest" style={{ color: "rgba(215,154,87,0.8)" }}>
                  Пассажиров <span style={{ color: "#555" }}>+{tour.passengerPrice.toLocaleString("ru-RU")} ₽/чел.</span>
                </span>
                <span className="font-cormorant text-2xl text-white">{passengers}</span>
              </div>
              <input type="range" min={0} max={quads} step={1} value={passengers}
                onChange={e => setPassengers(+e.target.value)}
                className="w-full h-0.5 bg-[#333] rounded appearance-none cursor-pointer"
                style={{ accentColor: "#d79a57" }} />
              <div className="flex justify-between text-xs mt-1 font-montserrat" style={{ color: "#555" }}>
                <span>0</span><span>{quads}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center items-center text-center" style={{ borderLeft: "1px solid rgba(215,154,87,0.15)", paddingLeft: "2.5rem" }}>
          <div className="font-montserrat text-xs uppercase tracking-widest mb-2" style={{ color: "rgba(215,154,87,0.6)" }}>Итого</div>

          <div className={`font-cormorant text-5xl md:text-6xl text-white transition-all duration-250 ${animating ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
            {total.toLocaleString("ru-RU")} ₽
          </div>

          <div className="mt-4 mb-6 text-left w-full space-y-1">
            <div className="flex justify-between font-montserrat text-xs" style={{ color: "#666" }}>
              <span>{tour.label} × {quads}</span>
              <span>{(tour.basePrice * quads).toLocaleString("ru-RU")} ₽</span>
            </div>
            {passengers > 0 && (
              <div className="flex justify-between font-montserrat text-xs" style={{ color: "#666" }}>
                <span>Пассажиры × {passengers}</span>
                <span>{(tour.passengerPrice * passengers).toLocaleString("ru-RU")} ₽</span>
              </div>
            )}
            <div className="pt-2 flex justify-between font-montserrat text-xs border-t" style={{ borderColor: "rgba(255,255,255,0.06)", color: "#999" }}>
              <span>Предварительный расчёт</span>
            </div>
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

function ReviewCarousel({ gold }: { gold: string; goldText?: React.CSSProperties }) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const [animating, setAnimating] = useState(false);
  const total = REVIEWS.length;

  const go = (newIdx: number, direction: "next" | "prev") => {
    if (animating) return;
    setDir(direction);
    setAnimating(true);
    setTimeout(() => {
      setActive(newIdx);
      setAnimating(false);
    }, 320);
  };

  const prev = () => go((active - 1 + total) % total, "prev");
  const next = () => go((active + 1) % total, "next");

  useEffect(() => {
    if (animating) return;
    const t = setInterval(() => {
      go((active + 1) % total, "next");
    }, 6000);
    return () => clearInterval(t);
  }, [active, animating]);

  const r = REVIEWS[active];

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl p-8 md:p-10" style={{ background: "linear-gradient(135deg,#0d0d0d,#0a0a0a)", border: "1px solid rgba(215,154,87,0.18)", minHeight: "280px" }}>
        {/* accent line */}
        <div className="absolute top-0 left-10 w-px h-10" style={{ background: "linear-gradient(to bottom, #d79a57, transparent)" }} />

        <div className={`transition-all duration-300 ${animating
          ? dir === "next" ? "opacity-0 translate-x-6" : "opacity-0 -translate-x-6"
          : "opacity-100 translate-x-0"}`}>
          <div className="flex gap-1 mb-6">
            {[...Array(r.rating)].map((_, j) => (
              <Icon key={j} name="Star" size={15} style={{ color: "#d79a57" } as React.CSSProperties} />
            ))}
          </div>

          <p className="font-cormorant text-xl md:text-2xl text-white leading-relaxed mb-8 italic">
            «{r.text}»
          </p>

          <div className="flex items-center gap-4 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-cormorant text-lg font-semibold flex-shrink-0"
              style={{ background: "rgba(215,154,87,0.15)", color: "#d79a57" }}>
              {r.name[0]}
            </div>
            <div>
              <div className="font-montserrat text-sm text-white">{r.name}</div>
              <div className="font-montserrat text-xs mt-0.5" style={{ color: "#666" }}>{r.role}</div>
            </div>
          </div>
        </div>
      </div>

      {/* controls */}
      <div className="flex items-center justify-between mt-6">
        <button onClick={prev}
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
          style={{ border: "1px solid rgba(215,154,87,0.25)", color: "#d79a57" }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(215,154,87,0.08)")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
          <Icon name="ChevronLeft" size={20} />
        </button>

        <div className="flex gap-2">
          {REVIEWS.map((_, i) => (
            <button key={i} onClick={() => go(i, i > active ? "next" : "prev")}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === active ? "28px" : "8px",
                height: "8px",
                background: i === active ? gold : "rgba(215,154,87,0.25)",
              }} />
          ))}
        </div>

        <button onClick={next}
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
          style={{ border: "1px solid rgba(215,154,87,0.25)", color: "#d79a57" }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(215,154,87,0.08)")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
          <Icon name="ChevronRight" size={20} />
        </button>
      </div>
    </div>
  );
}

const SEND_URL = "https://functions.poehali.dev/0cb2f075-e960-4742-a4b6-77150edc6ef8";
const PHONE = "+7 (999) 104-66-66";
const PHONE_RAW = "+79991046666";
const WA_LINK = `https://wa.me/79991046666`;
const TG_LINK = "https://t.me/BogatovTravel";
const EMAIL = "dupz27@mail.ru";

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState("");

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
          <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="font-cormorant text-2xl tracking-widest font-semibold" style={goldText}>BOGATOV TRAVEL</a>
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
        <div ref={toursRef.ref} className={`max-w-5xl mx-auto transition-all duration-1000 ${toursRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: "#d79a57" }} />
              <span className="font-montserrat text-xs uppercase tracking-widest" style={{ color: "#d79a57" }}>Прайс</span>
              <div className="w-8 h-px" style={{ background: "#d79a57" }} />
            </div>
            <h2 className="font-cormorant text-white" style={{ fontSize: "clamp(32px,5vw,54px)" }}>
              Выберите <span style={goldText}>свой формат</span>
            </h2>
            <p className="font-montserrat text-sm mt-3" style={{ color: "#777" }}>
              Все маршруты в сопровождении опытного гида · С вас только деньги и тёплая одежда, хорошее настроение — с нас 😉
            </p>
          </div>

          {/* Стандартные форматы */}
          <div className="space-y-3 mb-10">
            {TOURS_STANDARD.map((tour, i) => (
              <div key={i} className="relative flex items-center justify-between gap-4 rounded-2xl px-6 py-5 transition-all duration-300 group"
                style={{
                  background: tour.badge ? "linear-gradient(135deg,rgba(215,154,87,0.08),rgba(215,154,87,0.03))" : "rgba(255,255,255,0.025)",
                  border: tour.badge ? "1px solid rgba(215,154,87,0.35)" : "1px solid rgba(215,154,87,0.1)",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(215,154,87,0.35)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = tour.badge ? "rgba(215,154,87,0.35)" : "rgba(215,154,87,0.1)")}>

                {tour.badge && (
                  <div className="absolute -top-2.5 left-6 px-2.5 py-0.5 rounded-full font-montserrat text-xs font-semibold"
                    style={{ background: gold, color: "#160f07" }}>
                    {tour.badge}
                  </div>
                )}

                <div className="flex items-center gap-5 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center font-cormorant text-xl font-bold"
                    style={{ background: "rgba(215,154,87,0.1)", color: "#d79a57" }}>
                    {i + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="font-cormorant text-xl text-white leading-tight">{tour.name}</div>
                    <div className="font-montserrat text-xs mt-0.5" style={{ color: "#888" }}>{tour.sub} · {tour.duration}</div>
                    <div className="font-montserrat text-xs mt-1 hidden md:block" style={{ color: "#666" }}>{tour.desc}</div>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="font-cormorant text-2xl text-white whitespace-nowrap">{tour.price}</div>
                  {tour.passenger && (
                    <div className="font-montserrat text-xs mt-0.5 whitespace-nowrap" style={{ color: "#d79a57" }}>{tour.passenger}</div>
                  )}
                </div>

                <a href="#booking"
                  className="hidden md:flex flex-shrink-0 items-center gap-1 px-5 py-2.5 rounded-full font-montserrat text-xs font-semibold uppercase tracking-wide transition-all duration-300"
                  style={{ border: "1px solid rgba(215,154,87,0.35)", color: "#d79a57" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(215,154,87,0.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
                  Записаться
                </a>
              </div>
            ))}
          </div>

          {/* Индивидуальная прогулка */}
          <div className="rounded-2xl p-7 md:p-10" style={{ background: "linear-gradient(135deg,rgba(215,154,87,0.1),rgba(215,154,87,0.03))", border: "2px solid rgba(215,154,87,0.4)" }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full font-montserrat text-xs font-semibold"
                  style={{ background: gold, color: "#160f07" }}>
                  Индивидуально · Фото и видео в подарок
                </div>
                <h3 className="font-cormorant text-4xl text-white mb-1">{TOUR_PREMIUM.name}</h3>
                <div className="font-montserrat text-sm mb-4" style={{ color: "#888" }}>{TOUR_PREMIUM.sub} · {TOUR_PREMIUM.duration}</div>
                <ul className="space-y-2">
                  {TOUR_PREMIUM.includes.map((inc, j) => (
                    <li key={j} className="flex items-center gap-2 font-montserrat text-sm" style={{ color: "#ded4c2" }}>
                      <span style={{ color: "#d79a57" }}>✦</span> {inc}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-start md:items-end gap-4">
                <div>
                  <div className="font-cormorant text-5xl text-white">{TOUR_PREMIUM.price}</div>
                  <div className="font-montserrat text-sm mt-1" style={{ color: "#d79a57" }}>{TOUR_PREMIUM.passenger}</div>
                </div>
                <a href="#booking" className="px-8 py-3 rounded-full font-montserrat text-xs font-semibold uppercase tracking-widest"
                  style={{ background: gold, color: "#160f07" }}>
                  Забронировать
                </a>
              </div>
            </div>
          </div>

          {/* Корпоративы */}
          <div className="mt-5 rounded-2xl px-7 py-5 flex flex-col sm:flex-row items-center gap-4 justify-between"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(215,154,87,0.12)" }}>
            <div className="flex items-center gap-4">
              <Icon name="Users" size={22} style={{ color: "#d79a57" } as React.CSSProperties} />
              <div>
                <div className="font-cormorant text-xl text-white">Корпоративы, дни рождения, тимбилдинги</div>
                <div className="font-montserrat text-xs mt-0.5" style={{ color: "#777" }}>Семейные поездки и групповые заявки — принимаем с удовольствием 🥳</div>
              </div>
            </div>
            <a href="#booking" className="flex-shrink-0 px-6 py-2.5 rounded-full font-montserrat text-xs font-semibold uppercase tracking-wide transition-all duration-300"
              style={{ border: "1px solid rgba(215,154,87,0.35)", color: "#d79a57" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(215,154,87,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
              Оставить заявку
            </a>
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
        <div ref={reviewsRef.ref} className={`max-w-4xl mx-auto transition-all duration-1000 ${reviewsRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
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

          <ReviewCarousel gold={gold} goldText={goldText} />
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
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full py-10 text-center gap-5">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(215,154,87,0.15)" }}>
                    <Icon name="CheckCircle" size={32} style={{ color: "#d79a57" } as React.CSSProperties} />
                  </div>
                  <div className="font-cormorant text-3xl text-white">Заявка отправлена!</div>
                  <p className="font-montserrat text-sm" style={{ color: "#888" }}>Мы свяжемся с вами в ближайшее время</p>
                  <button onClick={() => { setSent(false); setForm({ name: "", phone: "", message: "" }); }}
                    className="font-montserrat text-xs uppercase tracking-widest px-6 py-2 rounded-full"
                    style={{ border: "1px solid rgba(215,154,87,0.35)", color: "#d79a57" }}>
                    Отправить ещё
                  </button>
                </div>
              ) : (
                <form onSubmit={async e => {
                  e.preventDefault();
                  setSending(true);
                  setSendError("");
                  try {
                    const res = await fetch(SEND_URL, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(form),
                    });
                    const data = await res.json();
                    if (data.ok) { setSent(true); }
                    else { setSendError("Ошибка отправки. Позвоните нам напрямую."); }
                  } catch {
                    setSendError("Нет связи с сервером. Позвоните нам напрямую.");
                  } finally {
                    setSending(false);
                  }
                }} className="space-y-5">
                  {[
                    { label: "Ваше имя", key: "name", type: "text", placeholder: "Михаил" },
                    { label: "Телефон", key: "phone", type: "tel", placeholder: "+7 (___) ___-__-__" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="font-montserrat text-xs uppercase tracking-widest mb-2 block" style={{ color: "rgba(215,154,87,0.7)" }}>{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder} required={f.key !== "message"}
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
                  {sendError && (
                    <div className="font-montserrat text-xs py-2 px-3 rounded-lg" style={{ color: "#e07070", background: "rgba(220,80,80,0.08)", border: "1px solid rgba(220,80,80,0.2)" }}>
                      {sendError}
                    </div>
                  )}
                  <button type="submit" disabled={sending}
                    className="w-full py-3 rounded-full font-montserrat text-xs font-semibold uppercase tracking-widest transition-all duration-300"
                    style={{ background: sending ? "rgba(215,154,87,0.5)" : gold, color: "#160f07", cursor: sending ? "wait" : "pointer" }}>
                    {sending ? "Отправляем..." : "Отправить заявку"}
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-4 pt-2">
              {[
                { icon: "Phone", label: "Телефон", value: PHONE, href: `tel:${PHONE_RAW}` },
                { icon: "MessageCircle", label: "WhatsApp", value: PHONE, href: WA_LINK },
                { icon: "Send", label: "Telegram канал", value: "@BogatovTravel", href: TG_LINK },
                { icon: "Mail", label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
              ].map((c, i) => (
                <a key={i} href={c.href} target={i > 0 ? "_blank" : undefined} rel="noopener noreferrer"
                  className="flex items-start gap-4 p-5 rounded-xl transition-all duration-300 block"
                  style={{ border: "1px solid rgba(215,154,87,0.1)", background: "rgba(255,255,255,0.02)", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(215,154,87,0.3)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(215,154,87,0.1)")}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(215,154,87,0.1)" }}>
                    <Icon name={c.icon} size={18} style={{ color: "#d79a57" } as React.CSSProperties} />
                  </div>
                  <div>
                    <div className="font-montserrat text-xs uppercase tracking-widest mb-1" style={{ color: "#666" }}>{c.label}</div>
                    <div className="font-montserrat text-sm text-white">{c.value}</div>
                  </div>
                </a>
              ))}

              <div className="flex gap-3 mt-2">
                {[
                  { label: "Позвонить", href: `tel:${PHONE_RAW}`, primary: true },
                  { label: "WhatsApp", href: WA_LINK, primary: false },
                  { label: "Telegram", href: TG_LINK, primary: false },
                ].map((b, i) => (
                  <a key={i} href={b.href} target={i > 0 ? "_blank" : undefined} rel="noopener noreferrer"
                    className="flex-1 text-center py-2.5 rounded-full font-montserrat text-xs font-semibold uppercase tracking-wide transition-all duration-300"
                    style={b.primary ? { background: gold, color: "#160f07" } : { border: "1px solid rgba(215,154,87,0.35)", color: "#d79a57" }}>
                    {b.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="font-cormorant text-xl tracking-widest font-semibold" style={goldText}>BOGATOV TRAVEL</a>
          <div className="flex flex-wrap justify-center gap-5">
            <a href={`tel:${PHONE_RAW}`} className="font-montserrat text-xs transition-colors" style={{ color: "#666" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#d79a57")}
              onMouseLeave={e => (e.currentTarget.style.color = "#666")}>{PHONE}</a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="font-montserrat text-xs transition-colors" style={{ color: "#666" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#d79a57")}
              onMouseLeave={e => (e.currentTarget.style.color = "#666")}>WhatsApp</a>
            <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="font-montserrat text-xs transition-colors" style={{ color: "#666" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#d79a57")}
              onMouseLeave={e => (e.currentTarget.style.color = "#666")}>Telegram</a>
            <a href={`mailto:${EMAIL}`} className="font-montserrat text-xs transition-colors" style={{ color: "#666" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#d79a57")}
              onMouseLeave={e => (e.currentTarget.style.color = "#666")}>{EMAIL}</a>
          </div>
          <div className="font-montserrat text-xs uppercase tracking-widest" style={{ color: "#444" }}>© 2026 BOGATOV TRAVEL</div>
        </div>
      </footer>
    </div>
  );
}