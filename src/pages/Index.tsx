import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { label: "Главная", href: "#hero" },
  { label: "Услуги", href: "#services" },
  { label: "Показания", href: "#indications" },
  { label: "Противопоказания", href: "#contraindications" },
  { label: "Продукция", href: "#products" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Партнёрство", href: "#partnership" },
  { label: "О специалисте", href: "#about" },
  { label: "Контакты", href: "#contacts" },
];

const INDICATIONS = [
  "Инсульт и постинсультная реабилитация",
  "ДЦП (детский церебральный паралич)",
  "Вальгусная деформация стоп",
  "Варикозное расширение вен",
  "Псориаз и кожные заболевания",
  "Задержка речевого развития",
  "Остеохондроз позвоночника",
  "Артрит и артроз суставов",
  "Нарушения сна и стресс",
  "Сахарный диабет 2 типа",
  "Гипертония",
  "Иммунодефицитные состояния",
  "Восстановление после операций",
  "Хроническая усталость",
  "Нарушения кровообращения",
  "Мышечные спазмы и боли",
];

const CONTRAINDICATIONS = [
  "Онкологические заболевания",
  "Беременность",
  "Кардиостимулятор",
  "Острые инфекционные заболевания",
  "Тромбофлебит в стадии обострения",
  "Психические расстройства в острой стадии",
];

const SERVICES = [
  {
    icon: "Zap",
    title: "БЭМ-сеанс 3.0",
    desc: "Индивидуальный сеанс биоэнергетического массажа на аппарате Fohow нового поколения. Воздействие на биологически активные точки.",
    duration: "45–90 мин",
  },
  {
    icon: "Heart",
    title: "Курс реабилитации",
    desc: "Разработка индивидуальной программы восстановления при инсульте, ДЦП, нарушениях опорно-двигательного аппарата.",
    duration: "10–20 сеансов",
  },
  {
    icon: "Shield",
    title: "Профилактический курс",
    desc: "Укрепление иммунитета, нормализация давления, улучшение кровообращения и общего самочувствия.",
    duration: "7–14 сеансов",
  },
  {
    icon: "Star",
    title: "Консультация",
    desc: "Первичная консультация дипломированного специалиста по ТКМ. Подбор программы и оценка противопоказаний.",
    duration: "30 мин",
  },
];

const PRODUCTS = [
  {
    emoji: "⚡",
    title: "БЭМ аппарат 3.0",
    desc: "Флагманский аппарат биоэнергетического массажа нового поколения. Для домашнего и профессионального использования.",
    tag: "Хит продаж",
  },
  {
    emoji: "🌿",
    title: "Серия Fohow",
    desc: "Натуральные биологически активные добавки и препараты на основе традиционной китайской медицины.",
    tag: "Натуральный состав",
  },
  {
    emoji: "🔥",
    title: "Феникс (Fenghuang)",
    desc: "Уникальный препарат для восстановления организма. Содержит более 70 природных компонентов.",
    tag: "Популярный",
  },
  {
    emoji: "🍄",
    title: "Кордицепс Fohow",
    desc: "Мощный иммуномодулятор и адаптоген на основе редкого китайского гриба кордицепс.",
    tag: "Для иммунитета",
  },
];

const REVIEWS = [
  {
    name: "Людмила В.",
    age: "62 года",
    text: "После инсульта мне назначили реабилитацию. Прошла 15 сеансов БЭМ — восстановилась речь и движение в правой руке. Огромная благодарность специалисту!",
    stars: 5,
  },
  {
    name: "Марина С.",
    age: "45 лет",
    text: "Варикоз беспокоил много лет. После курса из 10 сеансов ноги стали лёгкими, отёки прошли. Буду продолжать поддерживающие процедуры.",
    stars: 5,
  },
  {
    name: "Андрей П.",
    age: "38 лет",
    text: "Остеохондроз шейного отдела — хроническая боль годами. Уже после 5 сеансов забыл про таблетки. Результат превзошёл ожидания.",
    stars: 5,
  },
  {
    name: "Татьяна К.",
    age: "55 лет",
    text: "Приобрела аппарат для домашнего использования. Специалист обучил работе, теперь вся семья пользуется. Давление пришло в норму!",
    stars: 5,
  },
];

const PORTFOLIO_ITEMS = [
  { label: "Кабинет приёма", emoji: "🏥", desc: "Уютное пространство для процедур" },
  { label: "Аппарат БЭМ 3.0", emoji: "⚡", desc: "Оборудование нового поколения" },
  { label: "Процедура", emoji: "🙌", desc: "Работа со специалистом" },
  { label: "Результаты", emoji: "📊", desc: "До и после курса" },
  { label: "Продукция Fohow", emoji: "🌿", desc: "Ассортимент продуктов" },
  { label: "Документы", emoji: "📜", desc: "Сертификаты и дипломы" },
];

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function OrnamentDivider({ text }: { text?: string }) {
  return (
    <div className="flex items-center gap-4 my-4">
      <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--gold))" }} />
      <div className="w-2 h-2 rotate-45 flex-shrink-0" style={{ background: "var(--gold)" }} />
      {text && <span className="text-xs tracking-[0.3em] uppercase font-sans opacity-60" style={{ color: "var(--gold-dark)" }}>{text}</span>}
      <div className="w-2 h-2 rotate-45 flex-shrink-0" style={{ background: "var(--gold)" }} />
      <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, var(--gold), transparent)" }} />
    </div>
  );
}

function SectionTitle({ subtitle, title, light }: { subtitle: string; title: string; light?: boolean }) {
  return (
    <div className="text-center mb-12">
      <p className="text-xs tracking-[0.4em] uppercase mb-3 font-sans" style={{ color: light ? "var(--gold-light)" : "var(--gold)" }}>
        {subtitle}
      </p>
      <h2 className="font-display text-4xl md:text-5xl font-light leading-tight" style={{ color: light ? "var(--cream)" : "var(--brown)" }}>
        {title}
      </h2>
      <OrnamentDivider />
    </div>
  );
}

export default function Index() {
  useScrollReveal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)", fontFamily: "'Montserrat', sans-serif" }}>

      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{ background: "rgba(253,250,243,0.96)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--beige-dark)" }}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <a href="#hero" className="flex items-center gap-2 font-display text-2xl font-semibold tracking-widest uppercase" style={{ color: "var(--gold)" }}>
            <span className="text-2xl">🔥</span>
            FOHOW
          </a>
          <ul className="hidden xl:flex items-center gap-6">
            {NAV_LINKS.slice(0, 7).map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-xs tracking-wide uppercase font-sans transition-colors duration-200"
                  style={{ color: "var(--brown-light)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--brown-light)")}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contacts" className="hidden md:block text-xs tracking-widest uppercase py-2.5 px-6 font-sans font-medium transition-opacity hover:opacity-80"
            style={{ background: "var(--gold)", color: "var(--brown)", borderRadius: "2px" }}>
            Записаться
          </a>
          <button className="xl:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} style={{ color: "var(--brown)" }} />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="xl:hidden border-t" style={{ background: "var(--cream)", borderColor: "var(--beige-dark)" }}>
            <ul className="flex flex-col py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="block px-6 py-3 text-sm font-sans" style={{ color: "var(--brown-light)" }}
                    onClick={() => setMobileMenuOpen(false)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(145deg, #150900 0%, #2C1A0A 35%, #4A3520 70%, #3D2B12 100%)" }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #E4C97A 0%, transparent 50%), radial-gradient(circle at 80% 20%, #C9A84C 0%, transparent 40%)" }} />
        <div className="absolute top-20 left-10 w-80 h-80 rounded-full opacity-5"
          style={{ border: "1px solid var(--gold-light)" }} />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full opacity-5"
          style={{ border: "1px solid var(--gold)" }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
          <div className="inline-flex items-center gap-3 px-6 py-2 mb-8 text-xs tracking-[0.4em] uppercase"
            style={{ border: "1px solid rgba(201, 168, 76, 0.4)", color: "var(--gold-light)", borderRadius: "2px" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--gold-light)" }} />
            Корпорация Fohow · Традиционная китайская медицина
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-tight mb-6" style={{ color: "var(--cream)" }}>
            Биоэнергетический
            <br />
            <span className="shimmer-gold font-semibold">массаж 3.0</span>
          </h1>

          <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10 font-sans font-light"
            style={{ color: "rgba(253,250,243,0.72)" }}>
            Инновационные технологии Fohow в сочетании с тысячелетней мудростью китайской медицины.
            Восстановление, реабилитация, профилактика.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contacts" className="px-10 py-4 text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:opacity-90 hover:scale-105"
              style={{ background: "var(--gold)", color: "var(--brown)", borderRadius: "2px" }}>
              Записаться на сеанс
            </a>
            <a href="#services" className="px-10 py-4 text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:opacity-80"
              style={{ border: "1px solid rgba(201,168,76,0.5)", color: "var(--gold-light)", borderRadius: "2px" }}>
              Узнать подробнее
            </a>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-20 pt-10" style={{ borderTop: "1px solid rgba(201,168,76,0.2)" }}>
            {[
              { number: "3.0", label: "Поколение аппарата" },
              { number: "15+", label: "Показаний к применению" },
              { number: "100%", label: "Индивидуальный подход" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-4xl md:text-5xl font-semibold mb-2" style={{ color: "var(--gold-light)" }}>{stat.number}</p>
                <p className="text-xs tracking-wide uppercase font-sans" style={{ color: "rgba(253,250,243,0.45)" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs tracking-widest uppercase font-sans" style={{ color: "var(--gold-light)" }}>Листать</span>
          <Icon name="ChevronDown" size={16} style={{ color: "var(--gold-light)" }} />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6" style={{ background: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="scroll-reveal"><SectionTitle subtitle="Что я предлагаю" title="Услуги" /></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <div key={s.title} className="scroll-reveal group p-8 transition-all duration-300 hover:shadow-xl cursor-pointer hover:-translate-y-1"
                style={{ background: "var(--beige)", border: "1px solid var(--beige-dark)", borderRadius: "4px", transitionDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: "var(--gold)", borderRadius: "2px" }}>
                  <Icon name={s.icon} size={20} style={{ color: "var(--cream)" }} />
                </div>
                <h3 className="font-display text-2xl font-medium mb-3" style={{ color: "var(--brown)" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed mb-4 font-sans" style={{ color: "var(--brown-light)" }}>{s.desc}</p>
                <div className="inline-flex items-center gap-2 text-xs tracking-wide px-3 py-1.5"
                  style={{ background: "rgba(201,168,76,0.15)", color: "var(--gold-dark)", borderRadius: "2px" }}>
                  <Icon name="Clock" size={12} />
                  {s.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDICATIONS */}
      <section id="indications" className="py-24 px-6" style={{ background: "var(--beige)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="scroll-reveal"><SectionTitle subtitle="Помогает при" title="Показания к применению" /></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 scroll-reveal">
            {INDICATIONS.map((item) => (
              <div key={item} className="flex items-start gap-3 p-4 transition-all duration-200 hover:shadow-md"
                style={{ background: "var(--cream)", border: "1px solid var(--beige-dark)", borderRadius: "4px" }}>
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "var(--gold)", borderRadius: "1px" }}>
                  <Icon name="Check" size={10} style={{ color: "var(--cream)" }} />
                </div>
                <span className="text-sm font-sans leading-snug" style={{ color: "var(--brown)" }}>{item}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm mt-8 font-sans scroll-reveal" style={{ color: "var(--brown-light)" }}>
            * Полный перечень показаний уточняется на консультации специалиста
          </p>
        </div>
      </section>

      {/* CONTRAINDICATIONS */}
      <section id="contraindications" className="py-24 px-6"
        style={{ background: "linear-gradient(145deg, #2C1A0A 0%, #3D2B12 100%)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="scroll-reveal"><SectionTitle subtitle="Важно знать" title="Противопоказания" light /></div>
          <div className="scroll-reveal">
            <div className="p-8 mb-8 flex items-start gap-4"
              style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "4px" }}>
              <Icon name="AlertTriangle" size={20} style={{ color: "var(--gold-light)", flexShrink: 0, marginTop: 2 }} />
              <p className="text-sm leading-relaxed font-sans" style={{ color: "rgba(253,250,243,0.82)" }}>
                Перед началом курса необходима <strong style={{ color: "var(--gold-light)" }}>консультация специалиста</strong>.
                Как дипломированная медицинская сестра и сертифицированный специалист ТКМ, я индивидуально оцениваю
                состояние каждого клиента и определяю возможность проведения процедур.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {CONTRAINDICATIONS.map((item) => (
                <div key={item} className="flex items-center gap-3 p-4"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "4px" }}>
                  <Icon name="X" size={14} style={{ color: "var(--gold-light)", flexShrink: 0 }} />
                  <span className="text-sm font-sans" style={{ color: "rgba(253,250,243,0.8)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-24 px-6" style={{ background: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="scroll-reveal"><SectionTitle subtitle="Официальный дистрибьютор" title="Продукция Fohow" /></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((p, i) => (
              <div key={p.title} className="scroll-reveal group p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                style={{ background: "var(--beige)", border: "1px solid var(--beige-dark)", borderRadius: "4px", transitionDelay: `${i * 0.1}s` }}>
                <div className="text-4xl mb-4">{p.emoji}</div>
                <div className="inline-block text-xs tracking-wide px-2 py-1 mb-3 uppercase"
                  style={{ background: "rgba(201,168,76,0.15)", color: "var(--gold-dark)", borderRadius: "2px" }}>
                  {p.tag}
                </div>
                <h3 className="font-display text-xl font-medium mb-2" style={{ color: "var(--brown)" }}>{p.title}</h3>
                <p className="text-sm leading-relaxed font-sans mb-6" style={{ color: "var(--brown-light)" }}>{p.desc}</p>
                <button className="w-full py-2.5 text-xs tracking-widest uppercase font-medium transition-opacity hover:opacity-80"
                  style={{ background: "var(--gold)", color: "var(--brown)", borderRadius: "2px" }}>
                  Узнать цену
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 px-6" style={{ background: "var(--beige)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="scroll-reveal"><SectionTitle subtitle="Фото из практики" title="Портфолио" /></div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 scroll-reveal">
            {PORTFOLIO_ITEMS.map((item, i) => (
              <div key={item.label} className="group relative overflow-hidden cursor-pointer"
                style={{ borderRadius: "4px", aspectRatio: "4/3" }}>
                <div className="absolute inset-0 flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105"
                  style={{ background: i % 3 === 0 ? "linear-gradient(135deg, #3D2B12, #5C3D1A)" : i % 3 === 1 ? "linear-gradient(135deg, #4A3520, #7A5C3A)" : "linear-gradient(135deg, #2C1A0A, #4A3520)" }}>
                  <span className="text-5xl mb-3">{item.emoji}</span>
                  <p className="font-display text-lg font-medium" style={{ color: "var(--gold-light)" }}>{item.label}</p>
                  <p className="text-xs font-sans mt-1" style={{ color: "rgba(253,250,243,0.5)" }}>{item.desc}</p>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  style={{ background: "rgba(201,168,76,0.2)" }}>
                  <Icon name="ZoomIn" size={32} style={{ color: "var(--cream)" }} />
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ border: "2px solid var(--gold)", borderRadius: "4px" }} />
              </div>
            ))}
          </div>
          <p className="text-center text-sm mt-8 font-sans scroll-reveal" style={{ color: "var(--brown-light)" }}>
            Реальные фотографии кабинета и оборудования будут добавлены после загрузки материалов
          </p>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 px-6"
        style={{ background: "linear-gradient(145deg, #3D2B12 0%, #2C1A0A 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="scroll-reveal"><SectionTitle subtitle="Истории выздоровления" title="Отзывы клиентов" light /></div>
          <div className="grid md:grid-cols-2 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={r.name} className="scroll-reveal p-8"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "4px", transitionDelay: `${i * 0.1}s` }}>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <Icon key={j} name="Star" size={14} style={{ color: "var(--gold-light)" }} />
                  ))}
                </div>
                <p className="font-display text-lg italic leading-relaxed mb-6" style={{ color: "rgba(253,250,243,0.85)" }}>
                  «{r.text}»
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center font-display text-lg font-medium flex-shrink-0"
                    style={{ background: "var(--gold)", color: "var(--brown)", borderRadius: "2px" }}>
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="font-sans font-medium text-sm" style={{ color: "var(--gold-light)" }}>{r.name}</p>
                    <p className="text-xs font-sans" style={{ color: "rgba(253,250,243,0.4)" }}>{r.age}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERSHIP */}
      <section id="partnership" className="py-24 px-6" style={{ background: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="scroll-reveal"><SectionTitle subtitle="Бизнес-возможности" title="Партнёрство Fohow" /></div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="scroll-reveal">
              <p className="font-display text-2xl font-light leading-relaxed mb-6" style={{ color: "var(--brown)" }}>
                Станьте официальным партнёром корпорации Fohow и создайте собственный источник дохода в сфере здоровья.
              </p>
              <p className="text-sm leading-relaxed mb-8 font-sans" style={{ color: "var(--brown-light)" }}>
                Я помогу вам разобраться в продукции, пройти обучение и начать продавать аппараты БЭМ 3.0 и продукты
                Fohow в вашем регионе. Корпорация Fohow имеет проверенную систему партнёрства с поддержкой на каждом этапе.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { icon: "TrendingUp", text: "Высокая маржинальность — продукция премиум-класса" },
                  { icon: "Users", text: "Обучение и поддержка от опытного специалиста" },
                  { icon: "Package", text: "Официальная поставка продукции Fohow" },
                  { icon: "Award", text: "Сертификат партнёра международной корпорации" },
                  { icon: "Globe", text: "Маркетинговые материалы и инструменты продаж" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(201,168,76,0.15)", borderRadius: "2px" }}>
                      <Icon name={item.icon} size={14} style={{ color: "var(--gold)" }} />
                    </div>
                    <p className="text-sm font-sans leading-relaxed pt-1" style={{ color: "var(--brown-light)" }}>{item.text}</p>
                  </div>
                ))}
              </div>
              <a href="#contacts" className="inline-flex items-center gap-3 px-8 py-4 text-sm tracking-widest uppercase font-medium transition-opacity hover:opacity-80"
                style={{ background: "var(--gold)", color: "var(--brown)", borderRadius: "2px" }}>
                Стать партнёром
                <Icon name="ArrowRight" size={14} />
              </a>
            </div>

            <div className="scroll-reveal">
              <div className="p-10" style={{ background: "linear-gradient(135deg, #3D2B12, #2C1A0A)", borderRadius: "4px" }}>
                <p className="text-xs tracking-[0.4em] uppercase mb-8 font-sans" style={{ color: "var(--gold-light)" }}>
                  Три шага к партнёрству
                </p>
                {[
                  { step: "01", title: "Консультация", desc: "Бесплатная встреча, на которой я расскажу о продукции, системе продаж и вашем потенциальном заработке." },
                  { step: "02", title: "Обучение", desc: "Обучаю работе с аппаратом, продукцией и методикам традиционной китайской медицины." },
                  { step: "03", title: "Старт продаж", desc: "Получаете официальный статус, продукцию и начинаете работу с поддержкой куратора." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-6 mb-8 last:mb-0">
                    <div className="font-display text-3xl font-light flex-shrink-0 leading-none" style={{ color: "var(--gold)", opacity: 0.4 }}>
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-display text-xl font-medium mb-2" style={{ color: "var(--gold-light)" }}>{item.title}</h4>
                      <p className="text-sm leading-relaxed font-sans" style={{ color: "rgba(253,250,243,0.65)" }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6" style={{ background: "var(--beige)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-reveal">
              <div className="relative overflow-hidden" style={{ borderRadius: "4px", aspectRatio: "3/4", maxWidth: "380px" }}>
                <div className="absolute inset-0 flex flex-col items-center justify-center"
                  style={{ background: "linear-gradient(145deg, #4A3520, #2C1A0A)" }}>
                  <span className="text-7xl mb-4">👩‍⚕️</span>
                  <p className="font-display text-xl" style={{ color: "var(--gold-light)" }}>Фото специалиста</p>
                  <p className="text-xs font-sans mt-2" style={{ color: "rgba(253,250,243,0.4)" }}>будет добавлено</p>
                </div>
                <div className="absolute inset-4 pointer-events-none" style={{ border: "1px solid rgba(201,168,76,0.3)", borderRadius: "2px" }} />
              </div>
            </div>

            <div className="scroll-reveal">
              <p className="text-xs tracking-[0.4em] uppercase mb-3 font-sans" style={{ color: "var(--gold)" }}>О специалисте</p>
              <h2 className="font-display text-4xl md:text-5xl font-light leading-tight mb-4" style={{ color: "var(--brown)" }}>
                Дипломированный специалист ТКМ
              </h2>
              <OrnamentDivider />
              <p className="text-sm leading-relaxed mb-6 font-sans" style={{ color: "var(--brown-light)" }}>
                Дипломированная медицинская сестра и сертифицированный специалист в области традиционной китайской медицины.
                Работаю с аппаратом БЭМ 3.0 от корпорации Fohow и помогаю клиентам восстанавливаться и улучшать качество жизни.
              </p>
              <p className="text-sm leading-relaxed mb-8 font-sans" style={{ color: "var(--brown-light)" }}>
                Специализируюсь на реабилитации после инсульта, работе с детьми с ДЦП и задержкой речевого развития,
                а также на лечении хронических заболеваний опорно-двигательного аппарата.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: "GraduationCap", label: "Диплом медицинской сестры" },
                  { icon: "Award", label: "Сертификат ТКМ Fohow" },
                  { icon: "BookOpen", label: "Повышение квалификации" },
                  { icon: "Heart", label: "Индивидуальный подход" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <Icon name={item.icon} size={16} style={{ color: "var(--gold)", flexShrink: 0, marginTop: 2 }} />
                    <span className="text-sm font-sans" style={{ color: "var(--brown-light)" }}>{item.label}</span>
                  </div>
                ))}
              </div>
              <a href="#contacts" className="inline-flex items-center gap-3 px-8 py-4 text-sm tracking-widest uppercase font-medium transition-opacity hover:opacity-80"
                style={{ background: "var(--gold)", color: "var(--brown)", borderRadius: "2px" }}>
                Записаться на консультацию
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6"
        style={{ background: "linear-gradient(145deg, #150900 0%, #3D2B12 50%, #4A3520 100%)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="scroll-reveal text-center mb-12">
            <p className="text-xs tracking-[0.4em] uppercase mb-3 font-sans" style={{ color: "var(--gold-light)" }}>Свяжитесь со мной</p>
            <h2 className="font-display text-4xl md:text-5xl font-light leading-tight mb-4" style={{ color: "var(--cream)" }}>Контакты</h2>
            <OrnamentDivider text="Fohow" />
            <p className="text-sm font-sans leading-relaxed max-w-xl mx-auto" style={{ color: "rgba(253,250,243,0.6)" }}>
              Запишитесь на консультацию, задайте вопрос об услугах или узнайте об условиях партнёрства
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 scroll-reveal mb-10">
            {[
              { icon: "Phone", label: "Телефон / WhatsApp", value: "Укажите номер", href: "tel:+" },
              { icon: "MessageCircle", label: "Telegram", value: "@ваш_никнейм", href: "https://t.me/" },
              { icon: "MapPin", label: "Адрес приёма", value: "Ваш город и адрес", href: "#" },
              { icon: "Clock", label: "Режим работы", value: "Пн–Сб: 9:00–19:00", href: "#" },
            ].map((contact) => (
              <a key={contact.label} href={contact.href}
                className="flex items-center gap-5 p-6 transition-transform duration-200 hover:scale-[1.02]"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "4px" }}>
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--gold)", borderRadius: "2px" }}>
                  <Icon name={contact.icon} size={18} style={{ color: "var(--brown)" }} />
                </div>
                <div>
                  <p className="text-xs tracking-wide uppercase mb-1 font-sans" style={{ color: "rgba(253,250,243,0.45)" }}>{contact.label}</p>
                  <p className="font-display text-lg" style={{ color: "var(--gold-light)" }}>{contact.value}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="scroll-reveal p-10 text-center"
            style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "4px" }}>
            <h3 className="font-display text-3xl font-light mb-3" style={{ color: "var(--cream)" }}>Запишитесь прямо сейчас</h3>
            <p className="text-sm font-sans mb-8" style={{ color: "rgba(253,250,243,0.6)" }}>
              Первая консультация — бесплатно. Оценю ваш случай и подберу программу.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-4">
              <input type="text" placeholder="Ваше имя" className="flex-1 px-5 py-3.5 text-sm font-sans outline-none"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(201,168,76,0.3)", color: "var(--cream)", borderRadius: "2px" }} />
              <input type="tel" placeholder="Телефон" className="flex-1 px-5 py-3.5 text-sm font-sans outline-none"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(201,168,76,0.3)", color: "var(--cream)", borderRadius: "2px" }} />
            </div>
            <button className="px-12 py-4 text-sm tracking-widest uppercase font-medium transition-opacity hover:opacity-80"
              style={{ background: "var(--gold)", color: "var(--brown)", borderRadius: "2px" }}>
              Записаться
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6" style={{ background: "#0D0700", borderTop: "1px solid rgba(201,168,76,0.15)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display text-xl mb-1" style={{ color: "var(--gold)" }}>Fohow БЭМ 3.0</p>
            <p className="text-xs font-sans" style={{ color: "rgba(253,250,243,0.3)" }}>
              Биоэнергетический массаж · Традиционная китайская медицина
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {NAV_LINKS.slice(0, 5).map((link) => (
              <a key={link.href} href={link.href} className="text-xs tracking-wide uppercase font-sans transition-colors"
                style={{ color: "rgba(253,250,243,0.3)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(253,250,243,0.3)")}>
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-xs font-sans" style={{ color: "rgba(253,250,243,0.18)" }}>© 2024 Fohow БЭМ 3.0</p>
        </div>
      </footer>
    </div>
  );
}