import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMG_ACTION = "https://cdn.poehali.dev/projects/2eb621eb-507b-49ef-8fd5-40538caa0018/files/5f37f7f6-b70a-4959-8d81-a951fb8038f8.jpg";
const IMG_GROUP = "https://cdn.poehali.dev/projects/2eb621eb-507b-49ef-8fd5-40538caa0018/files/87045daa-6abe-4a68-941b-6dbc74b9babf.jpg";
const IMG_AERIAL = "https://cdn.poehali.dev/projects/2eb621eb-507b-49ef-8fd5-40538caa0018/files/5ef3539e-79ac-476e-b0de-6f0a726ada7c.jpg";

const LOGO_URL = "https://cdn.poehali.dev/projects/2eb621eb-507b-49ef-8fd5-40538caa0018/bucket/77621a21-c8f1-470e-a2cb-2eb58e47134f.jpeg";

const NAV_ITEMS = [
  { label: "О нас", href: "#about" },
  { label: "Туры", href: "#tours" },
  { label: "Калькулятор", href: "#calculator" },
  { label: "Галерея", href: "#gallery" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Карта", href: "#roadmap" },
  { label: "Elite Club", href: "#club" },
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
  { img: "https://cdn.poehali.dev/projects/2eb621eb-507b-49ef-8fd5-40538caa0018/bucket/0da3d92b-5e2a-4527-aed1-0dbe5f268f28.jpeg", label: "Вдвоём на одном квадре" },
  { img: "https://cdn.poehali.dev/projects/2eb621eb-507b-49ef-8fd5-40538caa0018/bucket/dd398f24-6260-4813-bbbe-858e0b21f2b6.jpeg", label: "Вид на залив" },
  { img: "https://cdn.poehali.dev/projects/2eb621eb-507b-49ef-8fd5-40538caa0018/bucket/dd3848dd-561e-4b3e-b958-4bf39feefbb7.jpeg", label: "В листьях" },
  { img: "https://cdn.poehali.dev/projects/2eb621eb-507b-49ef-8fd5-40538caa0018/bucket/56cbc54d-af08-4d38-9b3b-66bdd49c557d.jpeg", label: "На квадре над морем" },
  { img: "https://cdn.poehali.dev/projects/2eb621eb-507b-49ef-8fd5-40538caa0018/bucket/1da772c3-2336-4227-afa9-9077066e40ae.jpeg", label: "Красный квадр у обрыва" },
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


// Чекпоинты по всей карте (внутри контура Приморского края)
const MAP_CHECKPOINTS = [
  {x:175,y:230}, // Уссурийск
  {x:290,y:310}, // Волчанец
  {x:278,y:400}, // Находка
  {x:298,y:365}, // Большой Камень
  {x:308,y:428}, // Врангель
  {x:225,y:440}, // Фокино
  {x:200,y:472}, // Владивосток
  // Дополнительные точки по всей карте
  {x:200,y:120}, {x:240,y:90},  {x:280,y:140},
  {x:310,y:180}, {x:320,y:220}, {x:300,y:260},
  {x:260,y:200}, {x:220,y:160}, {x:180,y:180},
  {x:150,y:140}, {x:130,y:200}, {x:140,y:260},
  {x:160,y:310}, {x:190,y:350}, {x:210,y:290},
  {x:240,y:340}, {x:260,y:380}, {x:245,y:460},
  {x:170,y:420}, {x:150,y:370}, {x:120,y:320},
  {x:110,y:260}, {x:125,y:180},
];

// Извилистые маршруты через чекпоинты по всей карте
const MAP_ROUTES = [
  // Маршрут 1 — север → восток → юг
  [{x:200,y:120},{x:255,y:105},{x:300,y:150},{x:320,y:220},{x:310,y:280},{x:290,y:310},{x:298,y:365},{x:278,y:400},{x:308,y:428}],
  // Маршрут 2 — запад → центр → юг-запад
  [{x:125,y:180},{x:150,y:140},{x:200,y:120},{x:220,y:160},{x:210,y:210},{x:175,y:230},{x:160,y:290},{x:140,y:340},{x:150,y:370},{x:170,y:420},{x:200,y:472}],
  // Маршрут 3 — восток петля
  [{x:290,y:310},{x:310,y:280},{x:325,y:230},{x:315,y:185},{x:290,y:155},{x:270,y:200},{x:280,y:250},{x:300,y:300},{x:298,y:365},{x:308,y:428},{x:278,y:400},{x:260,y:380}],
  // Маршрут 4 — центр → север → запад
  [{x:210,y:290},{x:240,y:250},{x:260,y:200},{x:240,y:155},{x:210,y:120},{x:175,y:110},{x:145,y:140},{x:125,y:180},{x:120,y:240},{x:130,y:300},{x:150,y:370}],
  // Маршрут 5 — юг вдоль побережья
  [{x:200,y:472},{x:215,y:455},{x:225,y:440},{x:245,y:460},{x:260,y:445},{x:278,y:400},{x:298,y:365},{x:308,y:428},{x:295,y:450},{x:270,y:468}],
  // Маршрут 6 — диагональ с севера на юг-запад
  [{x:280,y:140},{x:260,y:180},{x:240,y:220},{x:220,y:260},{x:200,y:300},{x:185,y:340},{x:170,y:390},{x:150,y:430},{x:170,y:472}],
  // Маршрут 7 — центральная петля
  [{x:210,y:290},{x:240,y:270},{x:270,y:290},{x:290,y:320},{x:275,y:355},{x:255,y:375},{x:240,y:400},{x:210,y:415},{x:185,y:395},{x:170,y:360},{x:175,y:320},{x:195,y:300}],
  // Маршрут 8 — северо-западный
  [{x:150,y:140},{x:170,y:110},{x:210,y:90},{x:250,y:100},{x:275,y:130},{x:255,y:165},{x:230,y:180},{x:200,y:160},{x:175,y:175},{x:155,y:200}],
  // Маршрут 9 — восточное побережье
  [{x:310,y:180},{x:325,y:230},{x:330,y:280},{x:320,y:330},{x:308,y:370},{x:308,y:428},{x:290,y:460},{x:270,y:475}],
  // Маршрут 10 — западный хребет
  [{x:110,y:260},{x:120,y:210},{x:130,y:160},{x:150,y:130},{x:145,y:200},{x:135,y:255},{x:130,y:310},{x:140,y:360},{x:155,y:400},{x:170,y:440}],
];

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function lerpPt(pts: {x:number,y:number}[], t: number) {
  const seg = pts.length - 1;
  const idx = Math.min(Math.floor(t * seg), seg - 1);
  const lt = t * seg - idx;
  return { x: lerp(pts[idx].x, pts[idx+1].x, lt), y: lerp(pts[idx].y, pts[idx+1].y, lt) };
}

const QUADS_NAMES = ["Алексей", "Дмитрий", "Сергей", "Михаил", "Иван"];
const QUADS_TOURS = ["Лесная тропа", "Горный маршрут", "Побережье", "Тайга", "Речные броды"];

const QUADS_CONFIG = Array.from({length: 5}, (_, i) => ({
  route: MAP_ROUTES[i * 2 % MAP_ROUTES.length],
  speed: 0.00008 + i * 0.00002, // медленнее
  offset: i * 0.2,
  color: i % 3 === 0 ? "#d79a57" : i % 3 === 1 ? "#f1c98a" : "#c9a84c",
  name: QUADS_NAMES[i],
  tour: QUADS_TOURS[i],
}));

function MapQuads() {
  const [tick, setTick] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const smoothPos = useRef(QUADS_CONFIG.map((q) => lerpPt(q.route, q.offset)));

  useEffect(() => {
    let id: number;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = now - last;
      last = now;
      setTick(t => t + dt);
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

  const positions = QUADS_CONFIG.map((q, i) => {
    const t = ((q.offset + tick * q.speed) % 1);
    const target = lerpPt(q.route, t);
    // Плавное следование: lerp текущей позиции к цели
    const smooth = smoothPos.current[i];
    smooth.x += (target.x - smooth.x) * 0.04;
    smooth.y += (target.y - smooth.y) * 0.04;
    const t2 = Math.min(t + 0.015, 0.999);
    const p2 = lerpPt(q.route, t2);
    const angle = Math.atan2(p2.y - smooth.y, p2.x - smooth.x) * 180 / Math.PI;
    return { x: smooth.x, y: smooth.y, angle };
  });

  return (
    <>
      {QUADS_CONFIG.map((q, i) => {
        const { x, y, angle } = positions[i];
        const isHovered = hovered === i;
        // Подсказка всегда внутри SVG viewBox
        const tipX = x > 280 ? x - 85 : x + 12;
        const tipY = y > 460 ? y - 50 : y - 38;
        return (
          <g key={i}>
            <g
              transform={`translate(${x},${y}) rotate(${angle})`}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Зона наведения */}
              <circle cx="0" cy="0" r="10" fill="transparent"/>
              {/* Свечение при наведении */}
              {isHovered && <circle cx="0" cy="0" r="12" fill={q.color} opacity="0.15"/>}
              {/* Тело */}
              <rect x="-5" y="-2.5" width="10" height="5" rx="1.5" fill={q.color} opacity={isHovered ? 1 : 0.9}/>
              {/* Колёса */}
              <circle cx="-4" cy="3" r="1.8" fill="#1a1208" stroke={q.color} strokeWidth="0.5"/>
              <circle cx="4" cy="3" r="1.8" fill="#1a1208" stroke={q.color} strokeWidth="0.5"/>
              <circle cx="-4" cy="-3" r="1.8" fill="#1a1208" stroke={q.color} strokeWidth="0.5"/>
              <circle cx="4" cy="-3" r="1.8" fill="#1a1208" stroke={q.color} strokeWidth="0.5"/>
              {/* Руль */}
              <line x1="3" y1="-1" x2="6" y2="-2.5" stroke="#888" strokeWidth="0.8"/>
              {/* Фара */}
              <circle cx="6" cy="0" r="1.5" fill={q.color} opacity="0.7"/>
              <circle cx="6" cy="0" r="3" fill={q.color} opacity="0.12"/>
              {/* Пыль */}
              <circle cx="-7" cy="0" r="2" fill={q.color} opacity="0.07"/>
            </g>

            {/* Тултип — рендерим вне rotate, чтобы не крутился */}
            {isHovered && (() => {
              const t = ((q.offset + tick * q.speed) % 1);
              const status = t < 0.15 ? "🟢 Старт" : t < 0.85 ? "🟡 В пути" : "🔴 Финиш";
              const statusColor = t < 0.15 ? "#4ade80" : t < 0.85 ? "#f1c98a" : "#f87171";
              return (
                <g transform={`translate(${tipX},${tipY})`} style={{ pointerEvents: "none" }}>
                  <rect x="0" y="0" width="90" height="50" rx="6"
                    fill="rgba(10,8,4,0.94)" stroke={q.color} strokeWidth="0.8"/>
                  <text x="8" y="14" fontSize="9" fill={q.color} fontFamily="sans-serif" fontWeight="700">🏍 {q.name}</text>
                  <text x="8" y="27" fontSize="8" fill="rgba(255,255,255,0.65)" fontFamily="sans-serif">{q.tour}</text>
                  <text x="8" y="42" fontSize="8" fill={statusColor} fontFamily="sans-serif" fontWeight="600">{status}</text>
                </g>
              );
            })()}
          </g>
        );
      })}
    </>
  );
}

function GallerySlider() {
  const [current, setCurrent] = useState(0);
  const total = GALLERY.length;
  const prev = () => setCurrent(i => (i - 1 + total) % total);
  const next = () => setCurrent(i => (i + 1) % total);

  return (
    <div>
      {/* Главное фото */}
      <div className="relative rounded-2xl overflow-hidden mb-4" style={{ background: "#0a0a0a" }}>
        <img
          key={current}
          src={GALLERY[current].img}
          alt={GALLERY[current].label}
          className="w-full object-contain"
          style={{ maxHeight: "70vh", minHeight: "320px" }}
        />
        {/* Подпись */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-4" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)" }}>
          <span className="font-cormorant text-white text-2xl">{GALLERY[current].label}</span>
        </div>
        {/* Стрелки */}
        <button onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "rgba(10,8,4,0.7)", border: "1px solid rgba(215,154,87,0.3)" }}>
          <Icon name="ChevronLeft" size={20} style={{ color: "#d79a57" } as React.CSSProperties} />
        </button>
        <button onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "rgba(10,8,4,0.7)", border: "1px solid rgba(215,154,87,0.3)" }}>
          <Icon name="ChevronRight" size={20} style={{ color: "#d79a57" } as React.CSSProperties} />
        </button>
        {/* Счётчик */}
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full font-montserrat text-xs"
          style={{ background: "rgba(10,8,4,0.7)", color: "#d79a57", border: "1px solid rgba(215,154,87,0.2)" }}>
          {current + 1} / {total}
        </div>
      </div>

      {/* Миниатюры */}
      <div className="flex gap-3 justify-center flex-wrap">
        {GALLERY.map((item, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className="rounded-xl overflow-hidden flex-shrink-0"
            style={{
              width: "72px", height: "72px",
              border: i === current ? "2px solid #d79a57" : "2px solid transparent",
              opacity: i === current ? 1 : 0.5,
            }}>
            <img src={item.img} alt={item.label} className="w-full h-full object-cover" />
          </button>
        ))}
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
  const [form, setForm] = useState({ name: "", phone: "", email: "", tour: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showConsent, setShowConsent] = useState(false);

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
  const roadmapRef = useInView();
  const clubRef = useInView();
  const ctaRef = useInView();
  const [ctaCounter, setCtaCounter] = useState("500 000 ₽");
  useEffect(() => {
    if (!ctaRef.inView) return;
    const start = 500000, end = 6000, duration = 4000;
    let startTime: number | null = null;
    let rafId: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(start + (end - start) * eased);
      setCtaCounter(value.toLocaleString("ru-RU") + " ₽");
      if (progress < 1) { rafId = requestAnimationFrame(animate); }
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [ctaRef.inView]);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const target = new Date("2026-09-15T00:00:00").getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setCountdown({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const [clubCount, setClubCount] = useState(0);
  useEffect(() => {
    if (!clubRef.inView) return;
    const target = 150;
    const step = Math.ceil(target / 40);
    let cur = 0;
    const t = setInterval(() => { cur = Math.min(cur + step, target); setClubCount(cur); if (cur >= target) clearInterval(t); }, 40);
    return () => clearInterval(t);
  }, [clubRef.inView]);

  const [parallaxY, setParallaxY] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setParallaxY(y * 0.4);
      setScrollY(y);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Курсор-квадроцикл
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [cursorAngle, setCursorAngle] = useState(0);
  const prevCursor = useRef({ x: -100, y: -100 });
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      const dx = e.clientX - prevCursor.current.x;
      const dy = e.clientY - prevCursor.current.y;
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        setCursorAngle(Math.atan2(dy, dx) * 180 / Math.PI);
      }
      prevCursor.current = { x: e.clientX, y: e.clientY };
      setCursor({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  const gold = "linear-gradient(135deg, #d79a57 0%, #f1c98a 50%, #d79a57 100%)";
  const goldText = { background: gold, WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent" as const };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "radial-gradient(circle at top, rgba(215,154,87,0.1), transparent 35%), linear-gradient(180deg,#020202 0%,#070707 40%,#0b0b0b 100%)", color: "#f3e2bf" }}>

      {/* Курсор-квадроцикл */}
      <svg
        style={{
          position: "fixed",
          left: cursor.x,
          top: cursor.y,
          width: 36,
          height: 36,
          pointerEvents: "none",
          zIndex: 9999,
          transform: `translate(-50%, -50%) rotate(${cursorAngle}deg)`,
          transition: "transform 0.08s ease-out",
          filter: "drop-shadow(0 0 6px rgba(215,154,87,0.7))",
        }}
        viewBox="-18 -18 36 36"
      >
        {/* Тело */}
        <rect x="-9" y="-4" width="18" height="8" rx="2.5" fill="#d79a57"/>
        {/* Деталь — сиденье */}
        <rect x="-4" y="-6" width="10" height="3" rx="1.5" fill="#c9a84c"/>
        {/* Колёса */}
        <circle cx="-7" cy="5" r="3" fill="#111" stroke="#d79a57" strokeWidth="0.8"/>
        <circle cx="7" cy="5" r="3" fill="#111" stroke="#d79a57" strokeWidth="0.8"/>
        <circle cx="-7" cy="-5" r="3" fill="#111" stroke="#d79a57" strokeWidth="0.8"/>
        <circle cx="7" cy="-5" r="3" fill="#111" stroke="#d79a57" strokeWidth="0.8"/>
        {/* Руль */}
        <line x1="6" y1="-2" x2="12" y2="-5" stroke="#888" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="10" y1="-7" x2="14" y2="-3" stroke="#d79a57" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Фара */}
        <circle cx="10" cy="0" r="2" fill="#d79a57" opacity="0.8"/>
        <circle cx="10" cy="0" r="4" fill="#d79a57" opacity="0.15"/>
        {/* Пыль */}
        <circle cx="-12" cy="0" r="2.5" fill="#d79a57" opacity="0.07"/>
        <circle cx="-15" cy="0" r="1.5" fill="#d79a57" opacity="0.04"/>
      </svg>

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-md" : ""}`}
        style={{ background: scrolled ? "rgba(5,5,5,0.92)" : "transparent", borderBottom: scrolled ? "1px solid rgba(215,154,87,0.1)" : "none" }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <img src={LOGO_URL} alt="БОГАТОВ" className="h-10 w-10 rounded-full object-cover transition-transform duration-300 group-hover:scale-110" style={{ filter: "drop-shadow(0 0 8px rgba(215,154,87,0.4))" }} />
            <span className="font-cormorant text-2xl tracking-widest font-semibold hidden sm:block" style={goldText}>БОГАТОВ</span>
          </a>
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
            <a href="#contact" onClick={() => setMenuOpen(false)} className="gold-btn block text-center mt-2">
              Забронировать
            </a>
          </div>
        )}
      </nav>



      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG_ACTION} alt="Квадротур" className="w-full h-full object-cover" style={{ opacity: 0.22, filter: "grayscale(30%)", transform: `scale(1.15) translateY(${parallaxY}px)`, willChange: "transform" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.8) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(215,154,87,0.07) 0%, transparent 65%)" }} />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-28">
          <div className="inline-flex items-center gap-3 mb-8 px-5 py-2 rounded-full" style={{ border: "1px solid rgba(215,154,87,0.3)", background: "rgba(215,154,87,0.04)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#d79a57" }} />
            <span className="font-montserrat text-xs uppercase tracking-widest" style={{ color: "#d79a57" }}>Премиальные квадротуры</span>
          </div>

          <h1 className="font-cormorant leading-none mb-4" style={{ fontSize: "clamp(60px,10vw,110px)" }}>
            <span className="block" style={goldText}>БОГАТОВ</span>
          </h1>

          <p className="font-montserrat max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "#e8ddc9", fontSize: "clamp(15px,1.8vw,19px)" }}>
            Квадротуры, приключения и активный отдых. Эмоции, стиль и мощный драйв в каждой поездке.
          </p>

          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#booking" className="px-8 py-3 rounded-full font-montserrat text-xs font-semibold uppercase tracking-widest transition-all duration-300"
                style={{ background: gold, color: "#160f07" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 0 28px rgba(215,154,87,0.55)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
                Забронировать тур
              </a>
              <a href="#tours" className="px-8 py-3 rounded-full font-montserrat text-xs uppercase tracking-widest transition-all duration-300"
                style={{ border: "1px solid rgba(215,154,87,0.35)", color: "#d79a57", background: "rgba(215,154,87,0.04)" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(215,154,87,0.14)"; e.currentTarget.style.borderColor = "rgba(215,154,87,0.7)"; e.currentTarget.style.transform = "scale(1.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(215,154,87,0.04)"; e.currentTarget.style.borderColor = "rgba(215,154,87,0.35)"; e.currentTarget.style.transform = "scale(1)"; }}>
                Смотреть туры
              </a>
            </div>
            <a href="#club" className="px-10 py-3 rounded-full font-montserrat text-xs font-semibold uppercase tracking-widest transition-all duration-300 inline-flex items-center gap-2"
              style={{ border: "1px solid rgba(215,154,87,0.55)", color: "#f1c98a", background: "rgba(215,154,87,0.09)", letterSpacing: "0.12em" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(215,154,87,0.2)"; e.currentTarget.style.borderColor = "rgba(215,154,87,0.9)"; e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(215,154,87,0.25)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(215,154,87,0.09)"; e.currentTarget.style.borderColor = "rgba(215,154,87,0.55)"; e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
              <Icon name="Crown" size={13} />
              Премиум клуб
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
      <section id="about" className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ transform: `translateY(${scrollY * 0.08}px)` }}>
          <div className="absolute top-10 right-[-10%] w-80 h-80 rounded-full" style={{ background: "radial-gradient(circle, rgba(215,154,87,0.07) 0%, transparent 70%)" }} />
          <div className="absolute bottom-10 left-[-5%] w-60 h-60 rounded-full" style={{ background: "radial-gradient(circle, rgba(215,154,87,0.05) 0%, transparent 70%)" }} />
        </div>
        <div ref={aboutRef.ref} className={`max-w-7xl mx-auto relative transition-all duration-1000 ${aboutRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: "#d79a57" }} />
              <span className="font-montserrat text-xs uppercase tracking-widest" style={{ color: "#d79a57" }}>Почему БОГАТОВ</span>
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
      <section id="tours" className="py-28 px-6 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.015)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ transform: `translateY(${scrollY * 0.06}px)` }}>
          <div className="absolute top-[-5%] left-[20%] w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(215,154,87,0.05) 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 right-[10%] w-72 h-72 rounded-full" style={{ background: "radial-gradient(circle, rgba(215,154,87,0.04) 0%, transparent 70%)" }} />
        </div>
        <div ref={toursRef.ref} className={`max-w-5xl mx-auto relative transition-all duration-1000 ${toursRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
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
                <a href="#booking" className="px-8 py-3 rounded-full font-montserrat text-xs font-semibold uppercase tracking-widest transition-all duration-300"
                  style={{ background: gold, color: "#160f07" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 0 24px rgba(215,154,87,0.45)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
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
          <div className="mt-8 text-center">
            <a href="#club"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-montserrat text-xs font-semibold uppercase tracking-widest transition-all duration-300"
              style={{ background: "linear-gradient(135deg, #d79a57, #f1c98a, #d79a57)", color: "#160f07", boxShadow: "0 6px 24px rgba(215,154,87,0.35)" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(215,154,87,0.55)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(215,154,87,0.35)"; }}>
              <Icon name="Crown" size={14} />
              Получить скидку 20%
            </a>
            <p className="mt-2 font-montserrat text-xs" style={{ color: "#555" }}>Для участников Elite Club на любой тур</p>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-28 px-6 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.012)" }}>
        <div ref={galleryRef.ref} className={`max-w-4xl mx-auto relative transition-all duration-1000 ${galleryRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
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

          <GallerySlider />
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ transform: `translateY(${scrollY * 0.07}px)` }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(215,154,87,0.05) 0%, transparent 70%)" }} />
        </div>
        <div ref={reviewsRef.ref} className={`max-w-4xl mx-auto relative transition-all duration-1000 ${reviewsRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
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

      {/* CTA BANNER */}
      <section className="py-16 px-6">
        <div ref={ctaRef.ref} className="max-w-4xl mx-auto rounded-2xl overflow-hidden text-center px-8 py-14" style={{ background: "linear-gradient(135deg, #1a1208 0%, #2a1e0a 50%, #1a1208 100%)", border: "1px solid rgba(215,154,87,0.3)", boxShadow: "0 0 60px rgba(215,154,87,0.1)" }}>
          <h2 className="font-cormorant text-white mb-4" style={{ fontSize: "clamp(26px,4vw,42px)" }}>
            Сколько стоит твоё <span style={{ color: "#d79a57" }}>бездействие?</span>
          </h2>
          <p className="font-montserrat text-sm uppercase tracking-widest mb-6" style={{ color: "#c9b99a" }}>
            Упущенное приключение сезона:
          </p>
          <div className="mb-6">
            <span className="font-cormorant font-bold" style={{ fontSize: "clamp(48px,10vw,96px)", color: "#d79a57", textShadow: "0 0 30px rgba(215,154,87,0.4)" }}>{ctaCounter}</span>
          </div>
          <p className="font-montserrat text-sm mb-10" style={{ color: "#c9b99a" }}>
            Реальная цена твоего тура: всего <strong style={{ color: "#fff" }}>от 6 000 ₽</strong> за час
          </p>

          <div className="mb-10">
            <p className="font-montserrat text-xs uppercase tracking-widest mb-5" style={{ color: "#c9b99a" }}>До конца сезона осталось</p>
            <div className="flex justify-center gap-4">
              {[{ v: countdown.days, l: "дней" }, { v: countdown.hours, l: "часов" }, { v: countdown.minutes, l: "минут" }, { v: countdown.seconds, l: "секунд" }].map(({ v, l }) => (
                <div key={l} className="flex flex-col items-center rounded-xl px-4 py-3 min-w-[64px]" style={{ background: "rgba(215,154,87,0.08)", border: "1px solid rgba(215,154,87,0.2)" }}>
                  <span className="font-cormorant font-bold" style={{ fontSize: "clamp(28px,6vw,48px)", color: "#d79a57", lineHeight: 1 }}>{String(v).padStart(2, "0")}</span>
                  <span className="font-montserrat text-xs mt-1" style={{ color: "#c9b99a" }}>{l}</span>
                </div>
              ))}
            </div>
          </div>

          <a href="https://t.me/BogatovTravel" target="_blank" rel="noopener noreferrer" className="gold-btn" style={{ borderRadius: "50px" }}>
            Выбрать формат в Telegram
          </a>
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="py-28 px-6 overflow-hidden" style={{ background: "linear-gradient(180deg,#040404,#080808)" }}>
        <div ref={roadmapRef.ref} className={`max-w-7xl mx-auto transition-all duration-1000 ${roadmapRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>

          {/* Заголовок */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: "#d79a57" }} />
              <span className="font-montserrat text-xs uppercase tracking-widest" style={{ color: "#d79a57" }}>Дорожная карта</span>
              <div className="w-8 h-px" style={{ background: "#d79a57" }} />
            </div>
            <h2 className="font-cormorant text-white mb-4" style={{ fontSize: "clamp(32px,5vw,60px)" }}>
              Цель — стать <span style={{ background: "linear-gradient(135deg, #d79a57 0%, #f1c98a 50%, #d79a57 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>№1 в Приморском крае</span>
            </h2>
            <p className="font-montserrat text-sm max-w-xl mx-auto" style={{ color: "#777" }}>
              3 года. 7 городов. Один путь — стать лучшим приключением Дальнего Востока
            </p>
          </div>

          {/* Карта + города */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">

            {/* SVG карта Приморского края */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-md mx-auto">
                {/* Фоновое свечение */}
                <div className="absolute inset-0 rounded-3xl" style={{ background: "radial-gradient(circle at 40% 60%, rgba(215,154,87,0.12), transparent 70%)" }} />

                <svg viewBox="0 0 400 520" className="w-full h-auto" style={{ filter: "drop-shadow(0 0 30px rgba(215,154,87,0.15))" }}>
                  {/* Контур Приморского края (стилизованный) */}
                  <defs>
                    <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(215,154,87,0.15)" />
                      <stop offset="100%" stopColor="rgba(215,154,87,0.05)" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>

                  {/* Форма Приморского края */}
                  <path d="M 180 20 L 230 35 L 280 55 L 320 90 L 340 130 L 345 175 L 335 210 L 350 245 L 355 280 L 340 320 L 320 355 L 290 385 L 260 415 L 230 445 L 200 470 L 170 455 L 145 430 L 120 400 L 100 365 L 85 325 L 80 285 L 90 245 L 75 210 L 65 170 L 75 130 L 95 95 L 125 65 L 155 40 Z"
                    fill="url(#mapGrad)"
                    stroke="rgba(215,154,87,0.4)"
                    strokeWidth="1.5"
                    className="transition-all duration-500"
                  />

                  {/* Береговая линия (пунктир) */}
                  <path d="M 200 470 L 170 455 L 145 430 L 120 400 L 100 365 L 85 325 L 80 285 L 90 245 L 75 210"
                    fill="none"
                    stroke="rgba(215,154,87,0.25)"
                    strokeWidth="1"
                    strokeDasharray="4 3"
                  />

                  {/* Внутренняя сетка */}
                  <path d="M 150 100 L 300 100 M 120 180 L 330 180 M 100 260 L 340 260 M 85 340 L 320 340 M 110 420 L 270 420"
                    stroke="rgba(215,154,87,0.06)"
                    strokeWidth="0.5"
                  />

                  {/* УССУРИЙСК — 2027 (север, левее центра) */}
                  <g className="cursor-pointer">
                    <line x1="175" y1="230" x2="118" y2="218" stroke="rgba(180,120,255,0.35)" strokeWidth="0.8" />
                    <circle cx="175" cy="230" r="8" fill="rgba(180,120,255,0.1)" stroke="rgba(180,120,255,0.5)" strokeWidth="1.5" strokeDasharray="3 2" />
                    <circle cx="175" cy="230" r="3.5" fill="rgba(180,120,255,0.6)" />
                    <text x="60" y="213" fontSize="10" fill="rgba(200,160,255,0.9)" fontFamily="sans-serif" fontWeight="600">Уссурийск</text>
                    <text x="60" y="224" fontSize="8" fill="rgba(200,160,255,0.5)" fontFamily="sans-serif">2027</text>
                  </g>

                  {/* ВОЛЧАНЕЦ — открыт ✓ (восток, выше Находки) */}
                  <g className="cursor-pointer" style={{ filter: "url(#glow)" }}>
                    <line x1="290" y1="310" x2="330" y2="295" stroke="rgba(215,154,87,0.4)" strokeWidth="0.8" />
                    <circle cx="290" cy="310" r="11" fill="rgba(215,154,87,0.2)" stroke="#d79a57" strokeWidth="1.5">
                      <animate attributeName="r" values="11;15;11" dur="2.3s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="1;0.6;1" dur="2.3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="290" cy="310" r="5" fill="#d79a57" />
                    <text x="332" y="292" fontSize="11" fill="#f1c98a" fontFamily="sans-serif" fontWeight="600">Волчанец ✓</text>
                    <text x="332" y="304" fontSize="9" fill="rgba(215,154,87,0.7)" fontFamily="sans-serif">Открыто</text>
                  </g>

                  {/* БОЛЬШОЙ КАМЕНЬ — 2027 (юго-восток, правее) */}
                  <g className="cursor-pointer">
                    <line x1="298" y1="365" x2="338" y2="355" stroke="rgba(180,120,255,0.35)" strokeWidth="0.8" />
                    <circle cx="298" cy="365" r="8" fill="rgba(180,120,255,0.1)" stroke="rgba(180,120,255,0.5)" strokeWidth="1.5" strokeDasharray="3 2" />
                    <circle cx="298" cy="365" r="3.5" fill="rgba(180,120,255,0.6)" />
                    <text x="340" y="352" fontSize="10" fill="rgba(200,160,255,0.9)" fontFamily="sans-serif" fontWeight="600">Б. Камень</text>
                    <text x="340" y="363" fontSize="8" fill="rgba(200,160,255,0.5)" fontFamily="sans-serif">2027</text>
                  </g>

                  {/* НАХОДКА — открыта ✓ (восток, правый берег) */}
                  <g className="cursor-pointer" style={{ filter: "url(#glow)" }}>
                    <line x1="278" y1="400" x2="320" y2="393" stroke="rgba(215,154,87,0.4)" strokeWidth="0.8" />
                    <circle cx="278" cy="400" r="11" fill="rgba(215,154,87,0.2)" stroke="#d79a57" strokeWidth="1.5">
                      <animate attributeName="r" values="11;15;11" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="278" cy="400" r="5" fill="#d79a57" />
                    <text x="322" y="390" fontSize="11" fill="#f1c98a" fontFamily="sans-serif" fontWeight="600">Находка ✓</text>
                    <text x="322" y="402" fontSize="9" fill="rgba(215,154,87,0.7)" fontFamily="sans-serif">Открыто</text>
                  </g>

                  {/* ВРАНГЕЛЬ — 2028 (правее Находки, выше) */}
                  <g className="cursor-pointer">
                    <line x1="308" y1="428" x2="340" y2="440" stroke="rgba(255,80,80,0.35)" strokeWidth="0.8" />
                    <circle cx="308" cy="428" r="8" fill="rgba(255,80,80,0.1)" stroke="rgba(255,80,80,0.4)" strokeWidth="1.5" strokeDasharray="3 2" />
                    <circle cx="308" cy="428" r="3.5" fill="rgba(255,80,80,0.5)" />
                    <text x="330" y="437" fontSize="10" fill="rgba(255,140,140,0.9)" fontFamily="sans-serif" fontWeight="600">Врангель</text>
                    <text x="330" y="448" fontSize="8" fill="rgba(255,140,140,0.5)" fontFamily="sans-serif">2028</text>
                  </g>

                  {/* ФОКИНО — 2028 (юг, левее центра) */}
                  <g className="cursor-pointer">
                    <line x1="225" y1="440" x2="170" y2="450" stroke="rgba(255,80,80,0.35)" strokeWidth="0.8" />
                    <circle cx="225" cy="440" r="8" fill="rgba(255,80,80,0.1)" stroke="rgba(255,80,80,0.4)" strokeWidth="1.5" strokeDasharray="3 2" />
                    <circle cx="225" cy="440" r="3.5" fill="rgba(255,80,80,0.5)" />
                    <text x="108" y="447" fontSize="10" fill="rgba(255,140,140,0.9)" fontFamily="sans-serif" fontWeight="600">Фокино</text>
                    <text x="108" y="458" fontSize="8" fill="rgba(255,140,140,0.5)" fontFamily="sans-serif">2028</text>
                  </g>

                  {/* ВЛАДИВОСТОК — 2027 (крайний юг) */}
                  <g className="cursor-pointer">
                    <line x1="200" y1="472" x2="152" y2="486" stroke="rgba(100,160,255,0.35)" strokeWidth="0.8" />
                    <circle cx="200" cy="472" r="8" fill="rgba(100,160,255,0.1)" stroke="rgba(100,160,255,0.5)" strokeWidth="1.5" strokeDasharray="3 2" />
                    <circle cx="200" cy="472" r="3.5" fill="rgba(100,160,255,0.6)" />
                    <text x="90" y="483" fontSize="10" fill="rgba(150,200,255,0.9)" fontFamily="sans-serif" fontWeight="600">Владивосток</text>
                    <text x="90" y="494" fontSize="8" fill="rgba(150,200,255,0.5)" fontFamily="sans-serif">2027</text>
                  </g>

                  {/* Маршрут */}
                  <path d="M 175 230 L 290 310 L 298 365 L 278 400 L 308 428 L 225 440 L 200 472"
                    fill="none"
                    stroke="rgba(215,154,87,0.15)"
                    strokeWidth="1"
                    strokeDasharray="5 4"
                  />

                  {/* Компас */}
                  <g transform="translate(50, 50)">
                    <circle cx="0" cy="0" r="18" fill="rgba(215,154,87,0.06)" stroke="rgba(215,154,87,0.2)" strokeWidth="0.8" />
                    <line x1="0" y1="-14" x2="0" y2="14" stroke="rgba(215,154,87,0.4)" strokeWidth="0.8" />
                    <line x1="-14" y1="0" x2="14" y2="0" stroke="rgba(215,154,87,0.4)" strokeWidth="0.8" />
                    <text x="-3" y="-18" fontSize="8" fill="rgba(215,154,87,0.7)" fontFamily="sans-serif">С</text>
                  </g>

                  {/* Линии маршрутов */}
                  {MAP_ROUTES.map((route, i) => (
                    <polyline key={i}
                      points={route.map(p => `${p.x},${p.y}`).join(" ")}
                      fill="none"
                      stroke="rgba(215,154,87,0.08)"
                      strokeWidth="0.8"
                      strokeDasharray="3 5"
                    />
                  ))}

                  {/* Чекпоинты по карте */}
                  {MAP_CHECKPOINTS.slice(7).map((pt, i) => (
                    <g key={i}>
                      <circle cx={pt.x} cy={pt.y} r="3" fill="rgba(215,154,87,0.12)" stroke="rgba(215,154,87,0.35)" strokeWidth="0.8"/>
                      <circle cx={pt.x} cy={pt.y} r="1.2" fill="rgba(215,154,87,0.5)"/>
                    </g>
                  ))}

                  {/* Квадроциклы на маршрутах */}
                  <MapQuads />
                </svg>

                {/* Легенда */}
                <div className="absolute top-2 left-2 space-y-1.5 rounded-xl px-3 py-2" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(215,154,87,0.1)" }}>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: "#d79a57" }} />
                    <span className="font-montserrat text-xs" style={{ color: "#d79a57" }}>Открыто</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: "rgba(100,160,255,0.6)" }} />
                    <span className="font-montserrat text-xs" style={{ color: "#888" }}>2027</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: "rgba(255,80,80,0.5)" }} />
                    <span className="font-montserrat text-xs" style={{ color: "#888" }}>2028</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Таймлайн этапов */}
            <div className="space-y-4">
              {[
                {
                  year: "2026", label: "Основание", status: "done",
                  cities: ["Находка", "Волчанец"],
                  desc: "Запуск бренда. Первые клиенты. Первый адреналин.",
                  color: "#d79a57",
                },
                {
                  year: "2027", label: "Экспансия", status: "active",
                  cities: ["Владивосток", "Уссурийск", "Большой Камень"],
                  desc: "Выход в крупнейшие города Приморья. Франшиза и партнёрства.",
                  color: "#6aa0ff",
                },
                {
                  year: "2028", label: "Доминирование", status: "future",
                  cities: ["Фокино", "Врангель"],
                  desc: "Покрытие всего южного Приморья. Статус №1 региона.",
                  color: "#ff6464",
                },
              ].map((phase, i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl p-6 cursor-default transition-all duration-400"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: `1px solid ${phase.status === "done" ? "rgba(215,154,87,0.25)" : "rgba(255,255,255,0.06)"}`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.borderColor = `${phase.color}55`;
                    e.currentTarget.style.transform = "translateX(6px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                    e.currentTarget.style.borderColor = phase.status === "done" ? "rgba(215,154,87,0.25)" : "rgba(255,255,255,0.06)";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  {/* Левая полоса */}
                  <div className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full" style={{ background: phase.color, opacity: phase.status === "done" ? 1 : 0.4 }} />

                  <div className="flex items-start gap-4 pl-3">
                    <div className="flex-shrink-0 text-center">
                      <div className="font-cormorant text-3xl font-bold" style={{ color: phase.color }}>{phase.year}</div>
                      <div className="font-montserrat text-xs uppercase tracking-wider mt-0.5" style={{ color: `${phase.color}aa` }}>{phase.label}</div>
                      {phase.status === "done" && (
                        <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: "rgba(215,154,87,0.1)", border: "1px solid rgba(215,154,87,0.3)" }}>
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#d79a57" }} />
                          <span className="font-montserrat text-xs" style={{ color: "#d79a57" }}>Работаем</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {phase.cities.map(city => (
                          <span key={city} className="font-montserrat text-xs px-2.5 py-1 rounded-full transition-all duration-300"
                            style={{
                              background: `${phase.color}18`,
                              border: `1px solid ${phase.color}44`,
                              color: phase.color,
                            }}>
                            {city}
                          </span>
                        ))}
                      </div>
                      <p className="font-montserrat text-sm leading-relaxed" style={{ color: "#777" }}>{phase.desc}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Финальная цель */}
              <div
                className="relative rounded-2xl p-6 text-center overflow-hidden cursor-default transition-all duration-400 group"
                style={{ background: "rgba(215,154,87,0.06)", border: "1px solid rgba(215,154,87,0.2)" }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(215,154,87,0.1)";
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(215,154,87,0.06)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(circle at center, rgba(215,154,87,0.12), transparent 70%)" }} />
                <div className="font-montserrat text-xs uppercase tracking-widest mb-2" style={{ color: "rgba(215,154,87,0.6)" }}>Главная цель</div>
                <div className="font-cormorant text-3xl text-white mb-1">№1 в Приморском крае</div>
                <div className="font-montserrat text-sm" style={{ color: "#666" }}>7 городов · 3 года · 1 миссия</div>
              </div>
            </div>
          </div>

          {/* Статистика прогресса */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "2", label: "Города работают", icon: "MapPin" },
              { value: "7", label: "Городов к 2029", icon: "Target" },
              { value: "3", label: "Года до цели №1", icon: "Calendar" },
              { value: "∞", label: "Адреналина для вас", icon: "Zap" },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 text-center transition-all duration-300 cursor-default group"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(215,154,87,0.1)" }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(215,154,87,0.07)";
                  e.currentTarget.style.borderColor = "rgba(215,154,87,0.3)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  e.currentTarget.style.borderColor = "rgba(215,154,87,0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Icon name={stat.icon} size={20} style={{ color: "#d79a57", margin: "0 auto 8px" } as React.CSSProperties} />
                <div className="font-cormorant text-4xl text-white mb-1">{stat.value}</div>
                <div className="font-montserrat text-xs" style={{ color: "#666" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-28 px-6 relative overflow-hidden" style={{ background: "radial-gradient(circle at center, rgba(215,154,87,0.08), transparent 50%), linear-gradient(180deg,#090909,#050505)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ transform: `translateY(${scrollY * 0.05}px)` }}>
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(215,154,87,0.06) 0%, transparent 70%)" }} />
          <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 rounded-full" style={{ background: "radial-gradient(circle, rgba(215,154,87,0.04) 0%, transparent 70%)" }} />
        </div>
        <div className="max-w-5xl mx-auto relative">
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
                  <button onClick={() => { setSent(false); setForm({ name: "", phone: "", email: "", tour: "", message: "" }); }}
                    className="font-montserrat text-xs uppercase tracking-widest px-6 py-2 rounded-full transition-all duration-300"
                    style={{ border: "1px solid rgba(215,154,87,0.35)", color: "#d79a57" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(215,154,87,0.1)"; e.currentTarget.style.borderColor = "rgba(215,154,87,0.6)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(215,154,87,0.35)"; }}>
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
                }} className="space-y-4">

                  {/* Имя */}
                  <div>
                    <label className="font-montserrat text-xs uppercase tracking-widest mb-2 block" style={{ color: "rgba(215,154,87,0.7)" }}>Ваше имя *</label>
                    <input type="text" placeholder="Михаил" required
                      value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xl px-4 py-3 font-montserrat text-sm text-white focus:outline-none transition-all"
                      style={{ background: "#111", border: "1px solid #222", caretColor: "#d79a57" }}
                      onFocus={e => (e.currentTarget.style.borderColor = "rgba(215,154,87,0.5)")}
                      onBlur={e => (e.currentTarget.style.borderColor = "#222")} />
                  </div>

                  {/* Телефон */}
                  <div>
                    <label className="font-montserrat text-xs uppercase tracking-widest mb-2 block" style={{ color: "rgba(215,154,87,0.7)" }}>Телефон *</label>
                    <input type="tel" placeholder="+7 (___) ___-__-__" required
                      value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-xl px-4 py-3 font-montserrat text-sm text-white focus:outline-none transition-all"
                      style={{ background: "#111", border: "1px solid #222", caretColor: "#d79a57" }}
                      onFocus={e => (e.currentTarget.style.borderColor = "rgba(215,154,87,0.5)")}
                      onBlur={e => (e.currentTarget.style.borderColor = "#222")} />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="font-montserrat text-xs uppercase tracking-widest mb-2 block" style={{ color: "rgba(215,154,87,0.7)" }}>Электронная почта</label>
                    <input type="email" placeholder="your@email.com"
                      value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl px-4 py-3 font-montserrat text-sm text-white focus:outline-none transition-all"
                      style={{ background: "#111", border: "1px solid #222", caretColor: "#d79a57" }}
                      onFocus={e => (e.currentTarget.style.borderColor = "rgba(215,154,87,0.5)")}
                      onBlur={e => (e.currentTarget.style.borderColor = "#222")} />
                  </div>



                  {/* Чекбокс согласия */}
                  <div className="flex items-start gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setAgreed(!agreed)}
                      className="flex-shrink-0 w-5 h-5 rounded mt-0.5 border transition-all duration-200 flex items-center justify-center"
                      style={{
                        background: agreed ? "#d79a57" : "transparent",
                        borderColor: agreed ? "#d79a57" : "rgba(215,154,87,0.4)",
                      }}
                    >
                      {agreed && (
                        <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                          <path d="M1 3.5L4 6.5L10 1" stroke="#160f07" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                    <p className="font-montserrat text-xs leading-relaxed" style={{ color: "#888" }}>
                      Я согласен(а) с{" "}
                      <button type="button" onClick={() => setShowPrivacy(true)} className="underline transition-colors" style={{ color: "#d79a57", background: "none", border: "none", cursor: "pointer", padding: 0, font: "inherit" }}>
                        политикой конфиденциальности
                      </button>{" "}
                      и даю{" "}
                      <button type="button" onClick={() => setShowConsent(true)} className="underline transition-colors" style={{ color: "#d79a57", background: "none", border: "none", cursor: "pointer", padding: 0, font: "inherit" }}>
                        согласие на обработку персональных данных
                      </button>
                    </p>
                  </div>

                  {sendError && (
                    <div className="font-montserrat text-xs py-2 px-3 rounded-lg" style={{ color: "#e07070", background: "rgba(220,80,80,0.08)", border: "1px solid rgba(220,80,80,0.2)" }}>
                      {sendError}
                    </div>
                  )}
                  <button type="submit" disabled={sending || !agreed}
                    className="w-full py-3 rounded-full font-montserrat text-xs font-semibold uppercase tracking-widest transition-all duration-300"
                    style={{ background: !agreed ? "rgba(215,154,87,0.25)" : sending ? "rgba(215,154,87,0.5)" : gold, color: !agreed ? "rgba(22,15,7,0.5)" : "#160f07", cursor: !agreed ? "not-allowed" : sending ? "wait" : "pointer" }}
                    onMouseEnter={e => { if (!sending && agreed) { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(215,154,87,0.4)"; } }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
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

      {/* QUAD HERO */}
      <section className="relative overflow-hidden" style={{ minHeight: "100vh", padding: "80px 20px", background: "#050505", color: "#fff" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(215,154,87,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(215,154,87,0.06) 1px,transparent 1px)", backgroundSize: "56px 56px", opacity: 0.4 }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(215,154,87,0.07), transparent 70%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center" style={{ minHeight: "calc(100vh - 160px)" }}>
          <div>
            <div className="font-montserrat mb-5" style={{ color: "#d79a57", letterSpacing: "0.22em", fontSize: "13px" }}>&gt;&gt; ХВАТИТ ДИВАНА. ВРЕМЯ КВАДРОТУРА.</div>
            <h2 className="font-cormorant text-white" style={{ margin: 0, fontSize: "clamp(54px,8vw,112px)", lineHeight: 0.92, fontWeight: 900, textTransform: "uppercase" }}>
              КВАДРОВЫЙ<br />
              <span style={{ color: "#d79a57", textShadow: "0 0 18px rgba(215,154,87,0.6)" }}>РАЗРЫВ</span><br />
              ШАБЛОНОВ.
            </h2>
            <div className="font-montserrat" style={{ marginTop: "22px", fontSize: "clamp(16px,2.2vw,26px)", fontWeight: 800, color: "#c9b99a", textTransform: "uppercase" }}>
              ЗАМЕНИ РУТИНУ НА ЛЕС, ГРЯЗЬ И АДРЕНАЛИН.
            </div>
            <p className="font-montserrat" style={{ maxWidth: "620px", marginTop: "18px", fontSize: "17px", lineHeight: 1.6, color: "rgba(255,255,255,0.65)" }}>
              Активный отдых для компании, пары или выезда с друзьями. Живой маршрут, сильные эмоции и красивый визуал.
            </p>
            <a href="#tours" className="gold-btn" style={{ display: "inline-block", marginTop: "32px", borderRadius: "50px" }}>
              Выбрать маршрут
            </a>
          </div>

          {/* Карточка с SVG квадроциклом */}
          <div className="flex justify-center">
            <div style={{
              width: "min(100%, 320px)",
              aspectRatio: "0.72/1",
              padding: "28px 20px 20px",
              borderRadius: "24px",
              border: "1px solid rgba(215,154,87,0.35)",
              background: "linear-gradient(180deg,rgba(20,14,5,0.95),rgba(7,5,2,0.98))",
              boxShadow: "0 0 60px rgba(215,154,87,0.15), inset 0 0 40px rgba(215,154,87,0.03)",
              animation: "qhSpin 12s linear infinite",
              transformStyle: "preserve-3d",
              perspective: "800px",
            }}>
              <img
                src="https://cdn.poehali.dev/projects/2eb621eb-507b-49ef-8fd5-40538caa0018/files/d7bc5938-1031-4626-852d-dced7d769a56.jpg"
                alt="Quad bike"
                style={{ width: "100%", borderRadius: "12px", filter: "drop-shadow(0 0 16px rgba(215,154,87,0.35)) saturate(0.85) brightness(0.9)" }}
              />
              <div className="font-cormorant text-white text-center" style={{ marginTop: "12px", fontSize: "22px", fontWeight: 900, letterSpacing: "0.16em" }}>QUAD RIDE</div>
              <div className="font-montserrat text-center" style={{ marginTop: "8px", color: "#d79a57", letterSpacing: "0.18em", fontSize: "11px" }}>ЛЕС • ГРЯЗЬ • ВИДЫ</div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes qhSpin {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
          }
        `}</style>
      </section>

      {/* ELITE CLUB */}
      <section id="club" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(215,154,87,0.06) 0%, transparent 70%)", transform: `translateY(${scrollY * 0.06}px)` }}>
          <div className="absolute top-0 left-[10%] w-72 h-72 rounded-full" style={{ background: "radial-gradient(circle, rgba(215,154,87,0.05) 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 right-[10%] w-72 h-72 rounded-full" style={{ background: "radial-gradient(circle, rgba(215,154,87,0.05) 0%, transparent 70%)" }} />
        </div>
        <div ref={clubRef.ref} className={`max-w-4xl mx-auto text-center transition-all duration-700 ${clubRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

          {/* Логотип + заголовок */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <img src={LOGO_URL} alt="БОГАТОВ" className="h-14 w-14 rounded-full object-cover" style={{ filter: "drop-shadow(0 0 12px rgba(215,154,87,0.5))", border: "2px solid rgba(215,154,87,0.4)" }} />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs" style={{ background: "#d79a57", color: "#160f07" }}>
                <Icon name="Crown" size={11} />
              </div>
            </div>
            <div className="text-left">
              <div className="font-cormorant text-sm uppercase tracking-widest" style={{ color: "rgba(215,154,87,0.6)" }}>БОГАТОВ</div>
              <div className="font-cormorant text-3xl md:text-4xl font-bold tracking-widest" style={{ background: "linear-gradient(135deg, #d79a57, #f1c98a, #d79a57)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ELITE CLUB</div>
            </div>
          </div>

          {/* Хедлайн */}
          <div className="inline-block mb-3 px-4 py-1.5 rounded-full font-montserrat text-xs font-bold uppercase tracking-widest" style={{ background: "rgba(215,154,87,0.15)", border: "1px solid rgba(215,154,87,0.3)", color: "#d79a57" }}>
            🔥 Вступай в элиту
          </div>
          <h2 className="font-cormorant text-4xl md:text-5xl font-bold mb-3">
            <span style={{ color: "#f3e2bf" }}>Больше приключений —</span><br />
            <span style={{ background: "linear-gradient(135deg, #d79a57, #f1c98a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Получи премиум условия</span>
          </h2>
          <p className="font-montserrat text-sm mb-10" style={{ color: "#888" }}>
            Окупается уже за первый тур. Никаких скрытых условий.
          </p>

          {/* Цена + калькулятор окупаемости */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Цена */}
            <div className="rounded-2xl p-8 text-center" style={{ background: "rgba(215,154,87,0.06)", border: "1px solid rgba(215,154,87,0.25)" }}>
              <div className="font-montserrat text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(215,154,87,0.6)" }}>Подписка</div>
              <div className="font-cormorant text-6xl font-bold mb-1" style={{ background: "linear-gradient(135deg, #d79a57, #f1c98a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>1 500</div>
              <div className="font-montserrat text-sm mb-4" style={{ color: "#888" }}>рублей в месяц</div>
              <div className="font-montserrat text-xs py-2 px-4 rounded-full inline-block" style={{ background: "rgba(215,154,87,0.1)", color: "#d79a57" }}>
                = 50 ₽ в день
              </div>
            </div>
            {/* Калькулятор */}
            <div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="font-montserrat text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(215,154,87,0.6)" }}>Скидка участника — 20% на любой тур</div>
              <div className="space-y-3 text-left">
                {[
                  { tour: "Разгон (10 мин)", base: 1500, saved: 300 },
                  { tour: "Вольный ветер (20 мин)", base: 2500, saved: 500 },
                  { tour: "Дикая трасса (60 мин)", base: 6000, saved: 1200 },
                ].map(row => (
                  <div key={row.tour} className="flex justify-between items-center py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div>
                      <span className="font-montserrat text-xs" style={{ color: "#aaa" }}>{row.tour}</span>
                      <span className="font-montserrat text-xs ml-2 line-through" style={{ color: "#555" }}>{row.base.toLocaleString("ru")} ₽</span>
                    </div>
                    <span className="font-montserrat text-xs font-semibold" style={{ color: "#d79a57" }}>−{row.saved.toLocaleString("ru")} ₽</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 font-montserrat text-xs text-center" style={{ color: "#666" }}>
                Часовой тур: <span className="line-through">6 000 ₽</span> → <span style={{ color: "#d79a57", fontWeight: 600 }}>4 800 ₽</span>
              </div>
            </div>
          </div>

          {/* Таблица плюшек */}
          <div className="rounded-2xl overflow-hidden mb-10" style={{ border: "1px solid rgba(215,154,87,0.2)" }}>
            <div className="grid grid-cols-2 py-3 px-6 font-montserrat text-xs uppercase tracking-widest" style={{ background: "rgba(215,154,87,0.12)", color: "rgba(215,154,87,0.8)" }}>
              <span className="text-left">Эксклюзивные плюшки</span>
              <span className="text-right">Твоя выгода</span>
            </div>
            {[
              { label: "🏍️ 20% скидка на все туры", value: "Приоритет брони + 1 200 ₽/час экономии" },
              { label: "👕 Бренд-мерч по VIP-ценам", value: "Выгодней до 75%" },
              { label: "🎁 Мега-розыгрыши", value: "Ежемесячно + персональный шмот за выслугу" },
              { label: "🔒 Закрытые мероприятия", value: "Партнёрские скидки + приватный чат с элитой" },
            ].map((row, i) => (
              <div key={row.label} className="grid grid-cols-2 py-4 px-6 font-montserrat text-sm gap-4" style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                <span className="text-left font-semibold" style={{ color: "#f3e2bf" }}>{row.label}</span>
                <span className="text-right" style={{ color: "#888" }}>{row.value}</span>
              </div>
            ))}
          </div>

          {/* FOMO + счётчик */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-3 rounded-xl px-5 py-3" style={{ background: "rgba(215,154,87,0.08)", border: "1px solid rgba(215,154,87,0.2)" }}>
              <div className="flex -space-x-2">
                {["А","М","Е"].map(l => (
                  <div key={l} className="w-7 h-7 rounded-full flex items-center justify-center font-montserrat text-xs font-bold" style={{ background: "linear-gradient(135deg,#d79a57,#f1c98a)", color: "#160f07", border: "2px solid #0d0d0d" }}>{l}</div>
                ))}
              </div>
              <span className="font-montserrat text-sm" style={{ color: "#c9b99a" }}>
                Стань одним из первых
              </span>
            </div>
            <div className="rounded-xl px-5 py-3 font-montserrat text-xs font-bold" style={{ background: "rgba(255,80,80,0.08)", border: "1px solid rgba(255,80,80,0.2)", color: "#ff6b6b" }}>
              🔥 Места ограничены
            </div>
          </div>

          {/* CTA кнопка */}
          <a href="https://t.me/tribute/app?startapp=ep_8xnnxD4PO5tvdncNQetz7QvHr8k4FyRU95MvimJ53kxP80jCVE" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-montserrat text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(45deg, #d79a57, #f1c98a, #d79a57)", color: "#160f07", boxShadow: "0 8px 32px rgba(215,154,87,0.45)" }}>
            <img src={LOGO_URL} alt="" className="w-6 h-6 rounded-full object-cover" style={{ filter: "brightness(0.3)" }} />
            Подписаться за 1 500 ₽/мес
            <Icon name="Play" size={14} />
          </a>
          <p className="mt-4 font-montserrat text-xs" style={{ color: "#555" }}>Оформление через Telegram за 2 минуты</p>
        </div>
      </section>

      {/* МОДАЛЬНОЕ ОКНО — Политика конфиденциальности */}
      {showPrivacy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.85)" }} onClick={() => setShowPrivacy(false)}>
          <div className="relative w-full max-w-2xl max-h-[85vh] rounded-2xl overflow-hidden flex flex-col" style={{ background: "#0d0d0d", border: "1px solid rgba(215,154,87,0.25)" }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-8 py-5 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <h2 className="font-cormorant text-2xl text-white">Политика конфиденциальности</h2>
              <button onClick={() => setShowPrivacy(false)} className="w-9 h-9 rounded-full flex items-center justify-center transition-all" style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#888" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(215,154,87,0.4)"; e.currentTarget.style.color = "#d79a57"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#888"; }}>
                <Icon name="X" size={16} />
              </button>
            </div>
            <div className="overflow-y-auto px-8 py-6 space-y-5 font-montserrat text-sm leading-relaxed" style={{ color: "#aaa" }}>
              <p style={{ color: "#d79a57" }} className="font-semibold text-base">БОГАТОВ — Политика конфиденциальности</p>
              <p><strong className="text-white">1. Общие положения</strong><br/>Настоящая политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта БОГАТОВ (далее — Оператор).</p>
              <p><strong className="text-white">2. Состав персональных данных</strong><br/>Оператор обрабатывает следующие персональные данные: имя, номер телефона, адрес электронной почты, переданные пользователем через форму обратной связи.</p>
              <p><strong className="text-white">3. Цели обработки</strong><br/>Персональные данные обрабатываются в целях: связи с пользователем, оформления заказа, предоставления информации об услугах и специальных предложениях БОГАТОВ.</p>
              <p><strong className="text-white">4. Передача третьим лицам</strong><br/>Оператор не передаёт персональные данные третьим лицам без согласия субъекта, за исключением случаев, предусмотренных законодательством РФ.</p>
              <p><strong className="text-white">5. Хранение данных</strong><br/>Персональные данные хранятся в течение срока, необходимого для достижения целей обработки, либо до момента отзыва согласия субъектом персональных данных.</p>
              <p><strong className="text-white">6. Права пользователя</strong><br/>Вы вправе в любое время отозвать согласие на обработку персональных данных, направив запрос по адресу: <a href={`mailto:${EMAIL}`} style={{ color: "#d79a57" }}>{EMAIL}</a>.</p>
              <p><strong className="text-white">7. Контакты</strong><br/>По вопросам обработки персональных данных обращайтесь: {PHONE} / <a href={`mailto:${EMAIL}`} style={{ color: "#d79a57" }}>{EMAIL}</a></p>
            </div>
            <div className="px-8 py-5 flex-shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <button onClick={() => setShowPrivacy(false)} className="w-full py-3 rounded-full font-montserrat text-xs font-semibold uppercase tracking-widest transition-all duration-300" style={{ background: "#d79a57", color: "#160f07" }}>Понятно</button>
            </div>
          </div>
        </div>
      )}

      {/* МОДАЛЬНОЕ ОКНО — Согласие на обработку персональных данных */}
      {showConsent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.85)" }} onClick={() => setShowConsent(false)}>
          <div className="relative w-full max-w-2xl max-h-[85vh] rounded-2xl overflow-hidden flex flex-col" style={{ background: "#0d0d0d", border: "1px solid rgba(215,154,87,0.25)" }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-8 py-5 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <h2 className="font-cormorant text-2xl text-white">Согласие на обработку данных</h2>
              <button onClick={() => setShowConsent(false)} className="w-9 h-9 rounded-full flex items-center justify-center transition-all" style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#888" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(215,154,87,0.4)"; e.currentTarget.style.color = "#d79a57"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#888"; }}>
                <Icon name="X" size={16} />
              </button>
            </div>
            <div className="overflow-y-auto px-8 py-6 space-y-5 font-montserrat text-sm leading-relaxed" style={{ color: "#aaa" }}>
              <p style={{ color: "#d79a57" }} className="font-semibold text-base">Согласие субъекта персональных данных</p>
              <p>Я, субъект персональных данных, в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных», свободно, своей волей и в своём интересе даю согласие Оператору — БОГАТОВ — на обработку моих персональных данных.</p>
              <p><strong className="text-white">Перечень персональных данных:</strong><br/>Фамилия, имя; номер телефона; адрес электронной почты.</p>
              <p><strong className="text-white">Цели обработки:</strong><br/>Обратная связь, консультирование по услугам, оформление заявки на тур, информирование о специальных предложениях.</p>
              <p><strong className="text-white">Действия с персональными данными:</strong><br/>Сбор, запись, систематизация, накопление, хранение, уточнение, использование, передача (при наличии правовых оснований), удаление, уничтожение.</p>
              <p><strong className="text-white">Срок действия согласия:</strong><br/>Согласие действует с момента его предоставления и до момента отзыва субъектом персональных данных путём направления письменного заявления Оператору.</p>
              <p><strong className="text-white">Отзыв согласия:</strong><br/>Я имею право отозвать настоящее согласие, направив соответствующий запрос на электронную почту: <a href={`mailto:${EMAIL}`} style={{ color: "#d79a57" }}>{EMAIL}</a> или по телефону: {PHONE}.</p>
            </div>
            <div className="px-8 py-5 flex-shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <button onClick={() => { setShowConsent(false); setAgreed(true); }} className="w-full py-3 rounded-full font-montserrat text-xs font-semibold uppercase tracking-widest transition-all duration-300" style={{ background: "#d79a57", color: "#160f07" }}>Согласен(а)</button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-10 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="font-cormorant text-xl tracking-widest font-semibold" style={goldText}>БОГАТОВ</a>
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
          <div className="font-montserrat text-xs uppercase tracking-widest" style={{ color: "#444" }}>© 2026 БОГАТОВ</div>
        </div>
      </footer>
    </div>
  );
}