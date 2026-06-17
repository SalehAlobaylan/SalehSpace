"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/lib/localeContext";

type TimelineItem = { date: string; greg: string; title: string; body: string; logoSrc?: string; logoAlt?: string; href?: string };
type YearFocus = { label: string; title: string; signal: string; body: string; items: string[] };
type StackItem = { id: string; alt: string; customSrc?: string };
type SkillIcon = { label: string; iconSrc: string };

const TIMELINE: TimelineItem[] = [
  {
    date: "محرم ١٤٤٧",
    greg: "JUN 2025",
    title: "انضممت لراوية كـ Leader of Tech",
    body: "قيادة المسار التقني في راوية: كانت مرحلة فيها مسؤولية كبيرة أصعبها كانت ترتيب الأولويات وأكثر شي حرصت عليه فيها هو بناء بيئة التطوير وتحسين تجربة المطورين مريت من خلالها في: إعادة ترتيب معمارية النظام والخلفية، تحسين اعتمادية الخلفية، تنسيق العمل بين الواجهة والخدمات، تنظيم عملية الإطلاق والنشر، ودمج المدفوعات والتكاملات الخارجية التي يعتمد عليها المنتج.",
    logoSrc: "/Rawiah Logo.svg",
    logoAlt: "Rawiah",
    href: "https://rawiah.com/",
  },
  {
    date: "صفر ١٤٤٧",
    greg: "SEP 2025",
    title: "بدأنا بناء صلة القانوني",
    body: "في هذي المرحلة الممتعة كانت أول تجربة لنا نبني منتج من الصفر حتى جاهزيته للإطلاق بدينا فيها بتحديد نقاط الإحتياج عند القانونيين ثم دخلنا بتصميم معمارية تناسب توجه المنتج وانتقلنا فيها إلى بناء الهوية والتصميم، من المحطات المهمة في هذا المنتج أن تعلمت فيه درس  ما توقعت أني بواجهه وهو أن المنتجات اللي يحتاجها العميل تضطر فيها تبني أشياء جانبية أكثر من كونها مزايا تنافسية يتفرد فيها منتجك فممكن تمضي أسابيع فقط عشان تبني نظام مستندات مستقر فمثل هالتفاصيل تأخر حلولك للمشاكل الأساسية، كذلك في هذي المرحلة كانت أول تجربة لتطوير حلول ذكاء اصطناعي فكونك تطلق ذكاء اصطناعي كمنتج يصعّب الموضوع ١٠٠ مرة",
    logoSrc: "/silah-logo.svg",
    logoAlt: "صلة القانوني",
    href: "https://silah.salehspace.dev/",
  },
  {
    date: "رجب — ذو القعدة ١٤٤٧",
    greg: "JAN — APR 2026",
    title: "تدريب إبراء كـ Software Engineer",
    body: "هنا اضطريت أمر بتدريب الجامعة عشان أتخرج وانضميت لإبراء، كانت تجربة ممتعة ومثرية صار عندي فيها وصول لموارد أكبر كانت بتكلف علي مبالغ كبيرة لو استخدمتها بمنتجاتي، تنقلت فيها لأجزاء مختلفة في منتجاتهم سواء واجهات أو أنظمة ومحركات وكانت أول تجربة أعالج فيها وكلاء ذكاء اصنطاعي، والحقيقة في مثل هذي المراحل تقدّر اللحظة اللي ما تشيل فيها هم تفاصيل المنتج الغير تقنية :) تركيزك يصب كله في التقنية نفسها، لكن باعتقادي هذا يقلل من ولاءك للمنتج وكذلك من فهمك للمنتج ",
    logoSrc: "/ebra_ai_logo.jpeg",
    logoAlt: "إبراء",
    href: "https://www.ebra.sa/ar",
  },
  {
    date: "رجب ١٤٤٧",
    greg: "NOV 2025",
    title: "بدأت بناء وَهب",
    body: "أقرب شي اشتغلت عليه لقلبي وأكثر منتج فخور فيه، وهب منتج أضع فيه جميع خبرتي الحالية والقادمة بهذا المنتج فيه تحدي صعب وهو أنك تراهن على احتياج الناس أو تخلق شريحة مهتمة جديدة، باعتقادي أن الناس بيواجهون مشكلة مستقبلاً مع نوع المحتوى المستهلك في يومهم وهذا المنتج بيكون مكان لجوؤهم هرباً من منصات التواصل الاجتماعي الأخرى الي بتستنزف أذهانهم، فالمنتج هذا  بعيد المدى ويعتمد على رهانات كثيرة حسب تحليلي للوضع العام المستقبلي للمجتمعات، وحقيقة أكثر شي ما أقدر أحصيه هي أسباب عملي على هذا المنتج فلا أتحسف على أي ثانية وضعتها فيه ولست هنا أسوّق المنتج ولكنها محطة شغوف فيها.",
    logoSrc: "/wahb_logo_clean.png",
    logoAlt: "وَهَب",
  },
  {
    date: "ذو الحجة ١٤٤٧ هـ",
    greg: " June 2026",
    title: "التخرج 🎓",
    body: "مع أني كنت أفضل أختم السنة بشي ثاني لكن انتهت السنة في ختامي لبكالوريوس علوم الحاسب من جامعة الإمام محمد بن سعود الإسلامية. مع أني تجاوزت مرحلة سرية قصيرة قبل هذي المرحلة لكن نختم السنة بهذي المرحلة :) ",
  },
];

const YEAR_FOCUS: YearFocus[] = [
  {
    label: "01",
    title: "قيادة وتشغيل",
    signal: "قيادة نظام إنتاجي وفريق تقني",
    body: "قيادة المسار التقني في راوية: إعادة ترتيب معمارية النظام والخلفية، تحسين اعتمادية الخدمات، تنسيق العمل بين الواجهة والخدمات، تنظيم عملية الإطلاق والنشر، ودمج المدفوعات والتكاملات الخارجية التي يعتمد عليها المنتج.",
    items: ["Rawiah", "Architecture", "Payments", "Delivery"],
  },
  {
    label: "02",
    title: "منتجات من الصفر",
    signal: "أفكار بدأت تتحول إلى واجهات وتجارب فعلية",
    body: "صلة القانوني ووَهَب نقلتني من سؤال: كيف أبني النظام؟ إلى سؤال أهم: لماذا سيستخدمه أحد؟ هنا بدأت أفكر في المشكلة، السوق، التجربة، والتكرار كجزء من الهندسة.",
    items: ["Silah", "Wahb", "Product Thinking", "Iteration"],
  },
  {
    label: "03",
    title: "هندسة المنتج نفسه",
    signal: "منتج يخدم على مستوى المؤسسات",
    body: "في إبراء اقتربت أكثر من هندسة منتج يخدم عملاء مؤسسيين: ساهمت في حلول B2B داخل سياقات مالية وتقنية مالية، وعملت على جوانب التوسع والتشغيل عبر أدوات مثل Kafka و Kubernetes وخدمات Google Cloud المتقدمة، إلى جانب دمج وكلاء ذكاء اصطناعي داخل سير العمل.",
    items: ["B2B", "Fintech", "AI Agents", "Kafka", "Kubernetes", "GCP"],
  },
];

const STACK: StackItem[] = [
  { id: "ts", alt: "TypeScript" },
  { id: "nextjs", alt: "Next.js" },
  { id: "react", alt: "React" },
  { id: "tailwind", alt: "Tailwind CSS" },
  { id: "go", alt: "Go" },
  { id: "python", alt: "Python" },
  { id: "fastapi", alt: "FastAPI" },
  { id: "prisma", alt: "Prisma" },
  { id: "neon", alt: "Neon", customSrc: "https://cdn.simpleicons.org/neon/00E599" },
  { id: "redis", alt: "Redis" },
  { id: "docker", alt: "Docker" },
  { id: "kubernetes", alt: "Kubernetes" },
  { id: "kafka", alt: "Kafka" },
  { id: "aws", alt: "AWS" },
  { id: "s3", alt: "Amazon S3", customSrc: "https://api.iconify.design/logos/aws-s3.svg" },
  { id: "rds", alt: "Amazon RDS", customSrc: "https://api.iconify.design/logos/aws-rds.svg" },
  { id: "gcp", alt: "Google Cloud" },
  { id: "cloudflare", alt: "Cloudflare" },
  { id: "supabase", alt: "Supabase" },
  { id: "grafana", alt: "Grafana" },
  { id: "ffmpeg", alt: "FFmpeg", customSrc: "https://cdn.simpleicons.org/ffmpeg/F6E5C6" },
  { id: "trpc", alt: "tRPC", customSrc: "https://cdn.simpleicons.org/trpc/2596BE" },
  { id: "payfort", alt: "Payfort / Amazon Payment Services", customSrc: "https://api.iconify.design/fa-brands/amazon-pay.svg?color=%23F6E5C6" },
  { id: "cursor", alt: "Cursor", customSrc: "https://www.cursor.com/assets/images/logo.svg" },
  { id: "claudecode", alt: "Claude Code", customSrc: "https://cdn.simpleicons.org/claude" },
  { id: "openai", alt: "OpenAI", customSrc: "https://api.iconify.design/simple-icons/openai.svg?color=%23F6E5C6" },
  { id: "huggingface", alt: "Hugging Face", customSrc: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg" },
];

const SKILL_ICONS: SkillIcon[] = [
  { label: "Whisper", iconSrc: "https://api.iconify.design/simple-icons/openai.svg?color=%23F6E5C6" },
  { label: "LLMs", iconSrc: "https://api.iconify.design/material-symbols/neurology-outline-rounded.svg?color=%23F6E5C6" },
  { label: "TTS / STT", iconSrc: "https://api.iconify.design/material-symbols/record-voice-over-outline-rounded.svg?color=%23F6E5C6" },
];

export default function YearSummary({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const { locale } = useLocale();

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("vis");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal, .rs").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="year-page" dir="rtl">
      {/* ambient glows */}
      <div className="glow" style={{ background: "#FFB703", width: 420, height: 420, top: -140, left: -120 }} />
      <div className="glow" style={{ background: "#013837", width: 560, height: 560, bottom: -180, right: -160, animationDelay: "-10s" }} />

      {/* NAV */}
      <nav id="year-nav">
        <button className="nav-back" onClick={onClose ?? (() => router.push(`/${locale}`))}>
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
            {onClose ? (
              <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            ) : (
              <path d="M10 6H2M5 2L1 6l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
          {onClose ? "إغلاق" : "رجوع"}
        </button>
        <div className="nav-title">
          <span>حصاد السنة</span>
          <strong>١٤٤٧ هـ</strong>
        </div>
      </nav>

      <div id="year-scroll-root">
        {/* HERO */}
        <section className="hero">
          <div className="hero-eye">حصاد عام ١٤٤٧ هـ</div>
          <h1 className="hero-title">
            ملخص
            <br />
            عام ١٤٤٧ هـ
          </h1>
          <div className="hero-greg">JULY 2025 — JUNE 2026</div>
          <p className="hero-sub">
            صفحة واحدة تجمع أهم محطات عام ١٤٤٧ هـ: العمل، المنتجات، المنهجية، الأدوات.
          </p>
          <div className="scroll-hint">
            <span>اسحب للأسفل</span>
            <div className="scroll-arrow" />
          </div>
        </section>

        <div className="csect-gap" />

        {/* TIMELINE */}
        <section className="csect">
          <div className="sect-label reveal">01 · TIMELINE</div>
          <h2 className="sect-title reveal">الخط الزمني للسنة</h2>
          <p className="sect-body reveal">أبرز المحطات التي شكّلت عام ١٤٤٧، مرتّبة بالأشهر الهجرية. لكل محطة درس مختلف.</p>

          <div className="tl rs">
            {TIMELINE.map((item) => (
              <div className="tl-item" key={item.title}>
                <div className="tl-head">
                  {item.logoSrc && (
                    item.href ? (
                      <a className="tl-logo-wrap tl-logo-link" href={item.href} target="_blank" rel="noreferrer" aria-label={`زيارة ${item.logoAlt ?? item.title}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.logoSrc} alt={item.logoAlt ?? item.title} />
                      </a>
                    ) : (
                      <div className="tl-logo-wrap">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.logoSrc} alt={item.logoAlt ?? item.title} />
                      </div>
                    )
                  )}
                  <div className="tl-main">
                    <div className="tl-date">
                      {item.date} <span className="greg">{item.greg}</span>
                    </div>
                    <div className="tl-title">{item.title}</div>
                  </div>
                </div>
                <div className="tl-body">{item.body}</div>
                {item.href && (
                  <a className="tl-link" href={item.href} target="_blank" rel="noreferrer">
                    زيارة الرابط
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* THE PIVOT */}
        <section className="csect csect-alt">
          <div className="sect-label reveal">02 · THE PIVOT</div>
          <h2 className="sect-title reveal">
            من بناء الأنظمة
            <br />
            إلى بناء المنتجات
          </h2>
          <p className="sect-body reveal">
            أهم ما تغيّر فيّ هذا العام لم يكن في الأدوات، بل في طريقة التفكير. النظام يعمل لا يعني أن المنتج موجود.
          </p>

          <div className="pivot rs">
            <div className="col from">
              <div className="lbl">From · من</div>
              <div className="val">مشاريع وأنظمة</div>
              <div className="desc">كتابة كود يشتغل، حل مشكلة تقنية، تسليم ميزة. الجودة تُقاس بالبنية والاختبارات.</div>
            </div>
            <div className="arrow">←</div>
            <div className="col to">
              <div className="lbl">To · إلى</div>
              <div className="val">منتجات</div>
              <div className="desc">من يستخدمه؟ ما المشكلة الحقيقية؟ كيف يصل؟ كيف يبقى؟ الجودة تُقاس بالقيمة الفعلية للمستخدم.</div>
            </div>
          </div>
        </section>

        {/* YEAR FOCUS */}
        <section className="csect">
          <div className="sect-label reveal">03 · YEAR FOCUS</div>
          <h2 className="sect-title reveal">ما الذي تلخّصه السنة؟</h2>
          <p className="sect-body reveal">هذه السنة تُقرأ كثلاثة مسارات: قيادة، بناء منتجات، والتركيز على هندسة المنتج نفسه.</p>

          <div className="focus-board rs">
            {YEAR_FOCUS.map((focus) => (
              <article className="focus-lane" key={focus.label}>
                <div className="focus-head">
                  <span className="focus-num">{focus.label}</span>
                  <div>
                    <h3>{focus.title}</h3>
                    <p>{focus.signal}</p>
                  </div>
                </div>
                <p className="focus-body">{focus.body}</p>
                <div className="focus-tags">
                  {focus.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>

        </section>

        {/* STACK */}
        <section className="csect csect-alt">
          <div className="sect-label reveal">04 · STACK</div>
          <h2 className="sect-title reveal">بعض الأدوات اللي استخدمتها بهذي السنة</h2>
          <div className="stack-grid reveal">
            {STACK.map((s) => (
              <span className="stack-icon" key={s.id} title={s.alt}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.customSrc || `https://skillicons.dev/icons?i=${s.id}`} alt={s.alt} />
              </span>
            ))}
          </div>
          <div className="skill-icon-grid reveal">
            {SKILL_ICONS.map((skill) => (
              <span className="skill-icon-card" key={skill.label} title={skill.label}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={skill.iconSrc} alt="" aria-hidden="true" />
                <span>{skill.label}</span>
              </span>
            ))}
          </div>
        </section>

        {/* CLOSING */}
        <section className="closing">
          <div className="sect-label reveal">05 · TO 1448</div>
          <h3 className="reveal">إلى ١٤٤٨.</h3>
          <p className="reveal">
            أوعدكم بمرحلة عظيمة من توطين الحلول الرقمية ☝🏼
          </p>
        </section>

        <footer className="prod-foot">
          <span className="foot-wm">Saleh Alobaylan · Year Summary 1447 H</span>
          <span className="foot-wm">SalehSpace</span>
        </footer>
      </div>

      <style jsx>{`
        .year-page {
          --bg: #045c5a;
          --panel: #066d6a;
          --deep: #013837;
          --text: #f6e5c6;
          --muted: rgba(246, 229, 198, 0.6);
          --subtle: rgba(246, 229, 198, 0.28);
          --accent: #ffb703;
          --hi: #f2cc8f;
          --border: rgba(246, 229, 198, 0.09);
          --ba: rgba(255, 183, 3, 0.28);
          --serif: var(--font-playfair), Georgia, serif;
          --sans: var(--font-inter), system-ui, sans-serif;
          --mono: var(--font-jetbrains-mono), monospace;
          --ar: var(--font-somar), "Geeza Pro", "SF Arabic", sans-serif;

          position: fixed;
          inset: 0;
          overflow-x: hidden;
          overflow-y: auto;
          background: var(--bg);
          color: var(--text);
          font-family: var(--ar);
          scroll-behavior: smooth;
        }

        .glow {
          position: fixed;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.32;
          pointer-events: none;
          z-index: 0;
          animation: yfloat 22s infinite ease-in-out;
        }
        @keyframes yfloat {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(40px, -40px);
          }
        }

        /* NAV */
        #year-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
          height: 64px;
          background: rgba(1, 56, 55, 0.78);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid var(--border);
        }
        .nav-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--ar);
          white-space: nowrap;
        }
        .nav-title span {
          color: var(--text);
          font-size: 15px;
          font-weight: 700;
        }
        .nav-title strong {
          display: inline-flex;
          align-items: center;
          height: 24px;
          padding: 0 10px;
          border-radius: 999px;
          background: rgba(255, 183, 3, 0.12);
          color: var(--muted);
          font-size: 12px;
          font-weight: 700;
        }
        .nav-back {
          font-family: var(--ar);
          font-size: 13px;
          font-weight: 700;
          color: var(--text);
          cursor: pointer;
          min-height: 36px;
          padding: 0 13px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: color 0.2s, background 0.2s, border-color 0.2s;
          border: 1px solid rgba(246, 229, 198, 0.14);
          border-radius: 999px;
          background: rgba(246, 229, 198, 0.05);
        }
        .nav-back:hover {
          color: var(--accent);
          background: rgba(255, 183, 3, 0.08);
          border-color: rgba(255, 183, 3, 0.28);
        }
        .nav-back svg {
          flex: none;
        }

        #year-scroll-root {
          position: relative;
          z-index: 10;
        }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0 72px 80px;
          background: linear-gradient(to top, rgba(1, 56, 55, 0.65) 0%, transparent 55%);
          position: relative;
        }
        .hero-eye {
          font-family: var(--ar);
          font-size: 16px;
          font-weight: 700;
          color: var(--accent);
          margin-bottom: 18px;
          opacity: 0;
          transform: translateY(12px);
          animation: yfadeUp 0.7s 0.2s ease forwards;
        }
        .hero-title {
          font-family: var(--ar);
          font-size: clamp(56px, 9vw, 140px);
          font-weight: 700;
          line-height: 0.95;
          color: var(--text);
          margin-bottom: 24px;
          opacity: 0;
          transform: translateY(20px);
          animation: yfadeUp 0.8s 0.35s ease forwards;
          letter-spacing: 0;
        }
        .hero-greg {
          font-family: var(--mono);
          font-size: 13px;
          letter-spacing: 0.22em;
          color: var(--subtle);
          margin-bottom: 28px;
          opacity: 0;
          transform: translateY(16px);
          animation: yfadeUp 0.7s 0.45s ease forwards;
        }
        .hero-sub {
          font-family: var(--ar);
          font-size: 18px;
          line-height: 1.85;
          color: var(--muted);
          max-width: 62ch;
          margin-bottom: 40px;
          opacity: 0;
          transform: translateY(16px);
          animation: yfadeUp 0.7s 0.55s ease forwards;
        }
        .scroll-hint {
          position: absolute;
          bottom: 32px;
          inset-inline-start: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          opacity: 0;
          animation: yfadeUp 0.6s 1.1s ease forwards;
          pointer-events: none;
        }
        .scroll-hint span {
          font-family: var(--ar);
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--subtle);
        }
        .scroll-arrow {
          width: 1px;
          height: 32px;
          background: linear-gradient(to bottom, var(--subtle), transparent);
          animation: yarrowPulse 2s infinite ease-in-out;
        }
        @keyframes yarrowPulse {
          0%,
          100% {
            opacity: 0.3;
            transform: scaleY(0.8);
          }
          50% {
            opacity: 1;
            transform: scaleY(1);
          }
        }

        /* sections */
        .csect {
          position: relative;
          padding: 90px 72px;
          background: rgba(1, 56, 55, 0.9);
          backdrop-filter: blur(28px);
          border-top: 1px solid var(--border);
        }
        .csect-alt {
          background: rgba(4, 92, 90, 0.88);
        }
        .csect-gap {
          height: 60px;
          background: transparent;
        }

        .sect-label {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 14px;
        }
        .sect-title {
          font-family: var(--ar);
          font-size: clamp(30px, 4vw, 52px);
          font-weight: 700;
          line-height: 1.18;
          color: var(--text);
          margin-bottom: 18px;
          max-width: 24ch;
          text-wrap: pretty;
        }
        .sect-body {
          font-family: var(--ar);
          font-size: 17px;
          line-height: 1.95;
          color: var(--muted);
          max-width: 64ch;
        }

        /* timeline */
        .tl {
          position: relative;
          margin-top: 56px;
          padding-inline-start: 32px;
        }
        .tl::before {
          content: "";
          position: absolute;
          inset-inline-start: 8px;
          top: 8px;
          bottom: 8px;
          width: 1px;
          background: linear-gradient(to bottom, rgba(255, 183, 3, 0.4), rgba(246, 229, 198, 0.06));
        }
        .tl-item {
          position: relative;
          padding-bottom: 46px;
        }
        .tl-item:last-child {
          padding-bottom: 0;
        }
        .tl-item::before {
          content: "";
          position: absolute;
          inset-inline-start: -28px;
          top: 8px;
          width: 11px;
          height: 11px;
          background: var(--accent);
          border-radius: 50%;
          box-shadow: 0 0 0 4px rgba(255, 183, 3, 0.18);
        }
        .tl-head {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 10px;
        }
        .tl-logo-wrap {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          border: 1px solid rgba(246, 229, 198, 0.1);
          background: rgba(246, 229, 198, 0.055);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: none;
          overflow: hidden;
        }
        .tl-logo-link {
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.2s, background 0.2s, transform 0.2s;
        }
        .tl-logo-link:hover,
        .tl-logo-link:focus-visible {
          border-color: rgba(246, 229, 198, 0.22);
          background: rgba(246, 229, 198, 0.085);
          transform: translateY(-1px);
        }
        .tl-logo-wrap img {
          display: block;
          width: 42px;
          height: 42px;
          object-fit: contain;
        }
        .tl-main {
          min-width: 0;
        }
        .tl-date {
          font-family: var(--ar);
          font-size: 14px;
          color: var(--accent);
          margin-bottom: 6px;
          font-weight: 500;
        }
        .tl-date .greg {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.12em;
          color: var(--subtle);
          margin-inline-start: 10px;
        }
        .tl-title {
          font-family: var(--ar);
          font-size: 22px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 0;
        }
        .tl-body {
          font-family: var(--ar);
          font-size: 15.5px;
          line-height: 1.9;
          color: var(--muted);
          max-width: 64ch;
        }
        .tl-link {
          display: inline-flex;
          align-items: center;
          margin-top: 10px;
          min-height: 26px;
          padding: 0 9px;
          border-radius: 999px;
          border: 1px solid rgba(246, 229, 198, 0.11);
          color: rgba(246, 229, 198, 0.46);
          background: rgba(246, 229, 198, 0.025);
          font-family: var(--ar);
          font-size: 11.5px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .tl-link:hover {
          background: rgba(246, 229, 198, 0.055);
          border-color: rgba(246, 229, 198, 0.18);
          color: rgba(246, 229, 198, 0.72);
        }

        /* pivot */
        .pivot {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 36px;
          align-items: center;
          max-width: 980px;
          margin-top: 50px;
        }
        .pivot .col {
          background: rgba(1, 56, 55, 0.55);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 30px 32px;
        }
        .pivot .col .lbl {
          font-family: var(--mono);
          font-size: 9px;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--subtle);
          margin-bottom: 14px;
        }
        .pivot .col .val {
          font-family: var(--ar);
          font-size: 26px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 10px;
        }
        .pivot .col .desc {
          font-family: var(--ar);
          font-size: 14px;
          color: var(--muted);
          line-height: 1.85;
        }
        .pivot .col.to {
          background: rgba(255, 183, 3, 0.06);
          border-color: var(--ba);
        }
        .pivot .col.to .val {
          color: var(--accent);
        }
        .pivot .arrow {
          font-size: 32px;
          color: var(--accent);
          line-height: 1;
        }
        @media (max-width: 760px) {
          .pivot {
            grid-template-columns: 1fr;
          }
          .pivot .arrow {
            transform: rotate(90deg);
            justify-self: center;
          }
        }

        /* year focus */
        .focus-board {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1px;
          margin-top: 48px;
          max-width: 1080px;
          border: 1px solid var(--border);
          background: var(--border);
        }
        .focus-lane {
          min-height: 360px;
          padding: 28px;
          background: rgba(1, 56, 55, 0.72);
          display: flex;
          flex-direction: column;
          transition: background 0.25s, color 0.25s;
        }
        .focus-lane:hover {
          background: rgba(6, 109, 106, 0.78);
        }
        .focus-head {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 26px;
        }
        .focus-num {
          font-family: var(--mono);
          font-size: 11px;
          color: var(--accent);
          border: 1px solid var(--ba);
          border-radius: 999px;
          padding: 5px 9px;
          line-height: 1;
          flex: none;
        }
        .focus-head h3 {
          font-family: var(--ar);
          font-size: 24px;
          color: var(--text);
          margin: 0 0 8px;
          line-height: 1.25;
        }
        .focus-head p {
          font-family: var(--ar);
          font-size: 13.5px;
          color: var(--accent);
          line-height: 1.7;
          margin: 0;
        }
        .focus-body {
          font-family: var(--ar);
          font-size: 15.5px;
          color: var(--muted);
          line-height: 1.9;
          margin: 0;
          flex: 1;
        }
        .focus-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 28px;
        }
        .focus-tags span {
          font-family: var(--mono);
          font-size: 9.5px;
          color: var(--muted);
          background: rgba(246, 229, 198, 0.05);
          border: 1px solid rgba(246, 229, 198, 0.08);
          border-radius: 999px;
          padding: 5px 10px;
        }
        @media (max-width: 900px) {
          .focus-board {
            grid-template-columns: 1fr;
          }
          .focus-lane {
            min-height: auto;
          }
        }

        /* stack */
        .stack-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 36px;
          max-width: 760px;
        }
        .stack-icon {
          width: 48px;
          height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: rgba(246, 229, 198, 0.045);
          border: 1px solid rgba(246, 229, 198, 0.07);
          transition: transform 0.2s, background 0.2s, border-color 0.2s;
        }
        .stack-icon:hover {
          transform: scale(1.08);
          background: rgba(255, 183, 3, 0.07);
          border-color: rgba(255, 183, 3, 0.18);
        }
        .stack-icon img {
          display: block;
          width: 32px;
          height: 32px;
          object-fit: contain;
          opacity: 0.92;
        }
        .stack-icon:hover img {
          opacity: 1;
        }
        .skill-icon-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 22px;
          max-width: 940px;
        }
        .skill-icon-card {
          min-height: 42px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 11px;
          border-radius: 999px;
          background: rgba(1, 56, 55, 0.46);
          border: 1px solid rgba(246, 229, 198, 0.08);
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }
        .skill-icon-card:hover {
          transform: translateY(-1px);
          background: rgba(255, 183, 3, 0.06);
          border-color: rgba(255, 183, 3, 0.18);
        }
        .skill-icon-card img {
          width: 20px;
          height: 20px;
          object-fit: contain;
          flex: none;
          opacity: 0.9;
        }
        .skill-icon-card span {
          font-family: var(--mono);
          font-size: 10px;
          line-height: 1;
          color: rgba(246, 229, 198, 0.64);
          white-space: nowrap;
        }

        /* closing */
        .closing {
          padding: 34px 72px 40px;
          background: rgba(1, 56, 55, 0.56);
          border-top: 1px solid var(--border);
          position: relative;
          z-index: 10;
        }
        .closing h3 {
          font-family: var(--ar);
          font-size: clamp(17px, 1.8vw, 22px);
          font-weight: 700;
          color: rgba(246, 229, 198, 0.72);
          margin-bottom: 6px;
          line-height: 1.3;
          max-width: 24ch;
        }
        .closing p {
          font-family: var(--ar);
          font-size: 13.5px;
          line-height: 1.7;
          color: rgba(246, 229, 198, 0.42);
          max-width: 44ch;
          margin-bottom: 0;
        }
        /* footer */
        .prod-foot {
          padding: 44px 72px;
          border-top: 1px solid var(--border);
          background: rgba(1, 56, 55, 0.92);
          backdrop-filter: blur(20px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 10;
        }
        .foot-wm {
          font-family: var(--mono);
          font-size: 9.5px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--subtle);
        }

        /* reveal */
        :global(.year-page .reveal) {
          opacity: 0;
          transform: translateY(36px) perspective(700px) rotateX(5deg);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        :global(.year-page .reveal.vis) {
          opacity: 1;
          transform: none;
        }
        :global(.year-page .rs > *) {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        :global(.year-page .rs.vis > *:nth-child(1)) {
          opacity: 1;
          transform: none;
          transition-delay: 0s;
        }
        :global(.year-page .rs.vis > *:nth-child(2)) {
          opacity: 1;
          transform: none;
          transition-delay: 0.08s;
        }
        :global(.year-page .rs.vis > *:nth-child(3)) {
          opacity: 1;
          transform: none;
          transition-delay: 0.16s;
        }
        :global(.year-page .rs.vis > *:nth-child(4)) {
          opacity: 1;
          transform: none;
          transition-delay: 0.24s;
        }
        :global(.year-page .rs.vis > *:nth-child(5)) {
          opacity: 1;
          transform: none;
          transition-delay: 0.32s;
        }
        :global(.year-page .rs.vis > *:nth-child(6)) {
          opacity: 1;
          transform: none;
          transition-delay: 0.4s;
        }
        :global(.year-page .rs.vis > *:nth-child(7)) {
          opacity: 1;
          transform: none;
          transition-delay: 0.48s;
        }

        @keyframes yfadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }

        @media (max-width: 760px) {
          #year-nav {
            height: 58px;
            padding: 0 14px;
          }
          .nav-title span {
            font-size: 14px;
          }
          .nav-title strong {
            height: 22px;
            padding: 0 8px;
            font-size: 11px;
          }
          .nav-back {
            min-height: 34px;
            padding: 0 11px;
            font-size: 12px;
          }
          .hero {
            padding: 0 28px 56px;
          }
          .csect,
          .closing,
          .prod-foot {
            padding-inline: 28px;
          }
          .csect {
            padding-block: 60px;
          }
          .closing {
            padding-top: 28px;
            padding-bottom: 34px;
          }
        }
      `}</style>
    </div>
  );
}
