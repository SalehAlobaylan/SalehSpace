"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "ss_year_ribbon_dismissed";
const REVEAL_DELAY = 700;

export default function YearRibbon({ hidden = false, onExplore }: { hidden?: boolean; onExplore: () => void }) {
  const [shown, setShown] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const visible = shown && !hidden;
  const restoreVisible = dismissed && !hidden;

  useEffect(() => {
    let isDismissed = false;
    try {
      isDismissed = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {}
    if (isDismissed) {
      setDismissed(true);
      return;
    }
    const t = setTimeout(() => setShown(true), REVEAL_DELAY);
    return () => clearTimeout(t);
  }, []);

  function hide() {
    setShown(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    setTimeout(() => setDismissed(true), 600);
  }

  function restore() {
    try {
      localStorage.setItem(STORAGE_KEY, "");
    } catch {}
    setDismissed(false);
    setShown(true);
  }

  return (
    <>
      <div className={`year-ribbon ${visible ? "show" : ""}`} role="region" aria-label="إعلان ملخص السنة" aria-hidden={!visible}>
        <button className="close" onClick={hide} aria-label="إخفاء الإعلان">
          <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
            <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
        <div className="left">
          <span className="year-pill">١٤٤٧ هـ</span>
          <span className="msg">
            <span className="title">حصاد السنة</span>
          </span>
        </div>
        <div className="right">
          <button className="cta" onClick={onExplore}>
            عرض
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M10 6H2M5 2L1 6l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <button className={`restore ${restoreVisible ? "show" : ""}`} onClick={restore} aria-label="إظهار إعلان ملخص السنة">
        <span className="rdot" /> ملخص ١٤٤٧
      </button>

      <style jsx global>{`
        .year-ribbon {
          position: fixed;
          top: 14px;
          left: 50%;
          z-index: 70;
          width: max-content;
          max-width: calc(100vw - 32px);
          min-height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 6px 8px 6px 14px;
          background: rgba(1, 56, 55, 0.9);
          box-shadow: 0 12px 28px -22px rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(18px);
          border-radius: 999px;
          transform: translate(-50%, -140%);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease;
          overflow: hidden;
          direction: rtl;
        }
        .year-ribbon.show {
          transform: translate(-50%, 0);
          opacity: 1;
          pointer-events: auto;
        }
        .year-ribbon .left {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: none;
          min-width: 0;
        }
        .year-ribbon .year-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 24px;
          padding: 0 10px;
          border-radius: 999px;
          font-family: var(--font-somar), "Geeza Pro", "SF Arabic", sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: #013837;
          background: rgba(255, 183, 3, 0.95);
          flex: none;
        }
        .year-ribbon .msg {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-somar), "Geeza Pro", "SF Arabic", sans-serif;
          font-size: 13px;
          color: #f6e5c6;
          white-space: nowrap;
          min-width: 0;
        }
        .year-ribbon .msg .title {
          font-size: 14.5px;
          font-weight: 700;
          color: #ffb703;
        }
        .year-ribbon .right {
          display: flex;
          align-items: center;
          gap: 6px;
          flex: none;
        }
        .year-ribbon .cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-somar), "Geeza Pro", "SF Arabic", sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #ffb703;
          background: rgba(255, 183, 3, 0.08);
          border: none;
          padding: 6px 12px;
          border-radius: 999px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, transform 0.15s;
        }
        .year-ribbon .cta:hover {
          background: #ffb703;
          color: #013837;
          transform: translateY(-1px);
        }
        .year-ribbon .cta svg {
          transition: transform 0.2s;
        }
        .year-ribbon .cta:hover svg {
          transform: translateX(-2px);
        }
        .year-ribbon .close {
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(246, 229, 198, 0.4);
          padding: 7px;
          line-height: 0;
          border-radius: 999px;
          transition: color 0.2s, background 0.2s;
        }
        .year-ribbon .close:hover {
          color: #f6e5c6;
          background: rgba(246, 229, 198, 0.06);
        }

        .restore {
          position: fixed;
          bottom: 18px;
          right: 18px;
          z-index: 50;
          font-family: var(--font-somar), "Geeza Pro", "SF Arabic", sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: rgba(246, 229, 198, 0.6);
          background: rgba(1, 56, 55, 0.85);
          border: 1px solid rgba(246, 229, 198, 0.1);
          padding: 7px 12px;
          border-radius: 100px;
          cursor: pointer;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          backdrop-filter: blur(10px);
        }
        .restore.show {
          opacity: 1;
          pointer-events: auto;
        }
        .restore:hover {
          color: #ffb703;
          border-color: rgba(255, 183, 3, 0.28);
        }
        .restore .rdot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #ffb703;
        }

        @media (max-width: 760px) {
          .year-ribbon {
            top: 10px;
            max-width: calc(100vw - 20px);
            gap: 8px;
            padding: 5px 7px 5px 10px;
          }
          .year-ribbon .left {
            flex: 1;
            overflow: hidden;
          }
          .year-ribbon .msg .title {
            font-size: 13px;
          }
          .year-ribbon .year-pill {
            height: 22px;
            padding: 0 8px;
            font-size: 11px;
          }
          .year-ribbon .cta {
            padding: 6px 10px;
            font-size: 12px;
          }
        }
      `}</style>
    </>
  );
}
