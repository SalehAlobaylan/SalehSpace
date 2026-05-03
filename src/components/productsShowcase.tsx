"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useLocale } from "@/lib/localeContext";

type ProductId = "wahb" | "silah";

const WAHB_FLOATING_SCREENS = [
  { key: "pipeline", src: "/pipeline-page.png", alt: "Wahb pipeline control center screen" },
  { key: "for-you", src: "/ForYou.png", alt: "Wahb For You mobile feed screen" },
  { key: "news", src: "/News-page.png", alt: "Wahb News mobile screen" },
] as const;

const WAHB_ARCHITECTURE_SCREEN = {
  src: "/wahb-architecture.png",
  alt: "Wahb platform architecture diagram",
} as const;

const SILAH_FLOATING_SCREENS = [
  { key: "studio", src: "/silah-link-studio.png", alt: "Silah legal link studio screen" },
  { key: "dashboard", src: "/silah-dashboard.png", alt: "Silah legal dashboard screen" },
  { key: "versions", src: "/reg-versions.png", alt: "Silah regulations versions compare screen" },
] as const;

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawWahbFeed(ctx: CanvasRenderingContext2D, W: number, H: number) {
  ctx.fillStyle = "#012e2d"; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#045C5A"; ctx.fillRect(0, 0, W, 54);
  ctx.fillStyle = "#FFB703"; ctx.font = "bold 20px monospace"; ctx.fillText("wahb", 22, 35);
  ["Home", "Explore", "Saved", "Profile"].forEach((t, i) => {
    ctx.fillStyle = i === 0 ? "#FFB703" : "rgba(246,229,198,0.45)";
    ctx.font = "12px Inter,sans-serif"; ctx.fillText(t, W - 210 + i * 52, 35);
  });
  ctx.fillStyle = "rgba(1,56,55,0.7)"; ctx.fillRect(0, 54, 190, H - 54);
  ["Feed", "Trending", "Messages", "Bookmarks", "Settings"].forEach((t, i) => {
    const sy = 90 + i * 48;
    if (i === 0) { ctx.fillStyle = "rgba(255,183,3,0.14)"; rr(ctx, 0, sy - 12, 190, 36, 0); ctx.fill(); ctx.fillStyle = "#FFB703"; }
    else ctx.fillStyle = "rgba(246,229,198,0.42)";
    ctx.font = "13px Inter,sans-serif"; ctx.fillText(t, 30, sy + 9);
  });
  const cx = 208, cw = W - 408;
  for (let i = 0; i < 3; i++) {
    const py = 70 + i * 178;
    ctx.fillStyle = "rgba(6,109,106,0.38)"; rr(ctx, cx, py, cw, 158, 9); ctx.fill();
    ctx.strokeStyle = "rgba(246,229,198,0.07)"; ctx.lineWidth = 1; rr(ctx, cx, py, cw, 158, 9); ctx.stroke();
    ctx.beginPath(); ctx.arc(cx + 30, py + 30, 18, 0, Math.PI * 2);
    ctx.fillStyle = ["#FFB703", "#066D6A", "#F2CC8F"][i % 3]; ctx.fill();
    ctx.fillStyle = "#F6E5C6"; ctx.font = "bold 13px Inter,sans-serif";
    ctx.fillText(["@user_alpha", "@dev_beta", "@tech_gamma"][i], cx + 58, py + 24);
    ctx.fillStyle = "rgba(246,229,198,0.38)"; ctx.font = "11px monospace";
    ctx.fillText(["2m ago", "15m ago", "1h ago"][i], cx + 58, py + 40);
    ctx.fillStyle = "rgba(246,229,198,0.42)"; ctx.fillRect(cx + 10, py + 58, cw - 20, 7);
    ctx.fillStyle = "rgba(246,229,198,0.25)";
    ctx.fillRect(cx + 10, py + 72, (cw - 20) * 0.8, 7); ctx.fillRect(cx + 10, py + 86, (cw - 20) * 0.6, 7);
    ctx.fillStyle = "rgba(1,56,55,0.6)"; rr(ctx, cx + 10, py + 100, cw - 20, 38, 5); ctx.fill();
    ctx.fillStyle = "rgba(246,229,198,0.12)"; ctx.font = "11px monospace"; ctx.fillText("[ media ]", cx + cw / 2 - 28, py + 125);
    ["♥  24", "↗  8", "✦  3"].forEach((a, j) => {
      ctx.fillStyle = "rgba(246,229,198,0.32)"; ctx.font = "11px monospace";
      ctx.fillText(a, cx + 14 + j * 72, py + 150);
    });
  }
  ctx.fillStyle = "rgba(1,56,55,0.6)"; rr(ctx, W - 190, 70, 172, 260, 9); ctx.fill();
  ctx.strokeStyle = "rgba(246,229,198,0.06)"; ctx.lineWidth = 1; rr(ctx, W - 190, 70, 172, 260, 9); ctx.stroke();
  ctx.fillStyle = "rgba(255,183,3,0.85)"; ctx.font = "bold 11px monospace"; ctx.fillText("TRENDING", W - 178, 98);
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = "rgba(246,229,198,0.45)"; ctx.fillRect(W - 178, 114 + i * 40, 90, 7);
    ctx.fillStyle = "rgba(246,229,198,0.22)"; ctx.fillRect(W - 178, 127 + i * 40, 55, 6);
  }
}

function drawWahbConsole(ctx: CanvasRenderingContext2D, W: number, H: number) {
  ctx.fillStyle = "#012827"; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#013837"; ctx.fillRect(0, 0, 200, H);
  ctx.fillStyle = "#FFB703"; ctx.font = "bold 14px monospace"; ctx.fillText("CONSOLE", 18, 40);
  ["Dashboard", "Users", "Content", "Analytics", "Settings"].forEach((t, i) => {
    const sy = 70 + i * 52;
    if (i === 0) { ctx.fillStyle = "rgba(255,183,3,0.14)"; ctx.fillRect(0, sy - 10, 200, 34); ctx.fillStyle = "#FFB703"; }
    else ctx.fillStyle = "rgba(246,229,198,0.4)";
    ctx.font = "12px Inter,sans-serif"; ctx.fillText(t, 20, sy + 10);
  });
  const sc = ["1.2K", "48.5K", "312", "99.8%"], sl = ["Users", "Posts", "Reports", "Uptime"];
  sc.forEach((n, i) => {
    const sx = 218 + i * 134;
    ctx.fillStyle = "rgba(6,109,106,0.5)"; rr(ctx, sx, 16, 120, 72, 7); ctx.fill();
    ctx.strokeStyle = "rgba(246,229,198,0.06)"; ctx.lineWidth = 1; rr(ctx, sx, 16, 120, 72, 7); ctx.stroke();
    ctx.fillStyle = "#FFB703"; ctx.font = "bold 22px Inter,sans-serif"; ctx.fillText(n, sx + 12, 50);
    ctx.fillStyle = "rgba(246,229,198,0.4)"; ctx.font = "11px monospace"; ctx.fillText(sl[i], sx + 12, 66);
  });
  ctx.fillStyle = "rgba(6,109,106,0.3)"; ctx.fillRect(218, 100, W - 230, 30);
  ["Username", "Role", "Status", "Joined", "Actions"].forEach((h, i) => {
    ctx.fillStyle = "rgba(246,229,198,0.5)"; ctx.font = "bold 11px Inter,sans-serif";
    ctx.fillText(h, 228 + i * 120, 119);
  });
  for (let r = 0; r < 6; r++) {
    const ry = 130 + r * 48;
    ctx.fillStyle = r % 2 === 0 ? "rgba(1,56,55,0.3)" : "transparent";
    ctx.fillRect(218, ry, W - 230, 46);
    ctx.strokeStyle = "rgba(246,229,198,0.05)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(218, ry); ctx.lineTo(W - 12, ry); ctx.stroke();
    ctx.beginPath(); ctx.arc(236, ry + 22, 10, 0, Math.PI * 2);
    ctx.fillStyle = ["#FFB703", "#066D6A", "#F2CC8F", "#045C5A", "#FFB703", "#F2CC8F"][r]; ctx.fill();
    ctx.fillStyle = "rgba(246,229,198,0.5)"; ctx.font = "12px Inter,sans-serif";
    ctx.fillText(["user_alpha", "dev_beta", "tech_gamma", "saleh_a", "admin_x", "creator_z"][r], 252, ry + 26);
    ctx.fillStyle = "rgba(255,183,3,0.12)"; rr(ctx, 348, ry + 11, 60, 22, 4); ctx.fill();
    ctx.fillStyle = "#FFB703"; ctx.font = "10px monospace";
    ctx.fillText(["Admin", "Editor", "User", "Owner", "Mod", "Creator"][r], 354, ry + 25);
    ctx.beginPath(); ctx.arc(488, ry + 22, 5, 0, Math.PI * 2);
    ctx.fillStyle = r < 4 ? "#4ade80" : "rgba(246,229,198,0.3)"; ctx.fill();
  }
}

function drawWahbMobile(ctx: CanvasRenderingContext2D, W: number, H: number) {
  ctx.fillStyle = "#012e2d"; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#013837"; ctx.fillRect(0, 0, W, 44);
  ctx.fillStyle = "rgba(246,229,198,0.6)"; ctx.font = "11px monospace"; ctx.fillText("9:41", 16, 28);
  ctx.fillStyle = "rgba(246,229,198,0.4)"; ctx.font = "11px monospace"; ctx.fillText("●●● wifi", W - 80, 28);
  ctx.fillStyle = "#045C5A"; ctx.fillRect(0, 44, W, 52);
  ctx.fillStyle = "#FFB703"; ctx.font = "bold 18px monospace"; ctx.fillText("wahb", W / 2 - 22, 75);
  ctx.fillStyle = "rgba(1,56,55,0.5)"; ctx.fillRect(0, 96, W, 80);
  for (let i = 0; i < 5; i++) {
    ctx.beginPath(); ctx.arc(32 + i * 64, 136, 24, 0, Math.PI * 2);
    ctx.strokeStyle = "#FFB703"; ctx.lineWidth = 2; ctx.stroke();
    ctx.beginPath(); ctx.arc(32 + i * 64, 136, 21, 0, Math.PI * 2);
    ctx.fillStyle = ["#066D6A", "#045C5A", "#013837", "#066D6A", "#045C5A"][i]; ctx.fill();
  }
  for (let i = 0; i < 3; i++) {
    const py = 186 + i * 165;
    ctx.fillStyle = "rgba(6,109,106,0.35)"; ctx.fillRect(0, py, W, 156);
    ctx.strokeStyle = "rgba(246,229,198,0.05)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, py + 156); ctx.lineTo(W, py + 156); ctx.stroke();
    ctx.beginPath(); ctx.arc(28, py + 22, 16, 0, Math.PI * 2);
    ctx.fillStyle = ["#FFB703", "#F2CC8F", "#066D6A"][i % 3]; ctx.fill();
    ctx.fillStyle = "#F6E5C6"; ctx.font = "bold 13px Inter,sans-serif"; ctx.fillText(["@user_alpha", "@dev_beta", "@creator_z"][i], 52, py + 18);
    ctx.fillStyle = "rgba(246,229,198,0.35)"; ctx.font = "10px monospace"; ctx.fillText(["2m", "15m", "1h"][i], 52, py + 32);
    ctx.fillStyle = "rgba(1,56,55,0.5)"; ctx.fillRect(10, py + 46, W - 20, 72);
    ctx.fillStyle = "rgba(246,229,198,0.12)"; ctx.font = "11px monospace"; ctx.fillText("[ image ]", W / 2 - 28, py + 87);
    ctx.fillStyle = "rgba(246,229,198,0.3)";
    ["♥", "↗", "✦"].forEach((ic, j) => { ctx.fillText(ic, 16 + j * 48, py + 145); });
  }
  ctx.fillStyle = "#013837"; ctx.fillRect(0, H - 58, W, 58);
  ctx.strokeStyle = "rgba(246,229,198,0.07)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0, H - 58); ctx.lineTo(W, H - 58); ctx.stroke();
  ["⌂", "⊞", "+", "♡", "☰"].forEach((ic, i) => {
    ctx.fillStyle = i === 0 ? "#FFB703" : "rgba(246,229,198,0.35)";
    ctx.font = "18px sans-serif"; ctx.fillText(ic, W / 5 * i + W / 10 - 8, H - 26);
  });
}

function drawSilahCases(ctx: CanvasRenderingContext2D, W: number, H: number) {
  ctx.fillStyle = "#012220"; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#013837"; ctx.fillRect(0, 0, 200, H);
  ctx.fillStyle = "#F2CC8F"; ctx.font = "bold 14px serif"; ctx.fillText("Silah Legal", 14, 38);
  ["Cases", "Documents", "Regulations", "Analytics", "Settings"].forEach((t, i) => {
    const sy = 70 + i * 52;
    if (i === 0) { ctx.fillStyle = "rgba(255,183,3,0.14)"; ctx.fillRect(0, sy - 10, 200, 34); ctx.fillStyle = "#FFB703"; }
    else ctx.fillStyle = "rgba(246,229,198,0.4)";
    ctx.font = "12px Inter,sans-serif"; ctx.fillText(t, 20, sy + 10);
  });
  const ss = ["24", "8", "3", "96%"], ssl = ["Active Cases", "Hearings Soon", "Overdue", "Compliance"];
  ss.forEach((n, i) => {
    const sx = 218 + i * 134;
    ctx.fillStyle = "rgba(6,109,106,0.45)"; rr(ctx, sx, 16, 120, 68, 7); ctx.fill();
    ctx.fillStyle = "#FFB703"; ctx.font = "bold 24px serif"; ctx.fillText(n, sx + 12, 48);
    ctx.fillStyle = "rgba(246,229,198,0.4)"; ctx.font = "10px monospace"; ctx.fillText(ssl[i], sx + 12, 64);
  });
  ctx.fillStyle = "rgba(6,109,106,0.4)"; ctx.fillRect(218, 96, W - 230, 30);
  ["Case", "Client", "Status", "Hearing", "Assigned"].forEach((h, j) => {
    ctx.fillStyle = "rgba(246,229,198,0.55)"; ctx.font = "bold 11px Inter,sans-serif";
    ctx.fillText(h, 226 + j * 118, 115);
  });
  const caseNames = ["Al-Rahimi v. Corp.", "Estate of Marzouq", "IP Dispute #448", "Labor Case 1220", "Contract Review"];
  const statuses = ["Active", "Pending", "Review", "Urgent", "Closed"];
  const sColors = ["#4ade80", "#FFB703", "#60a5fa", "#f87171", "rgba(246,229,198,0.3)"];
  for (let r = 0; r < 5; r++) {
    const ry = 126 + r * 54;
    ctx.fillStyle = r % 2 === 0 ? "rgba(1,56,55,0.3)" : "transparent"; ctx.fillRect(218, ry, W - 230, 52);
    ctx.strokeStyle = "rgba(246,229,198,0.05)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(218, ry); ctx.lineTo(W - 12, ry); ctx.stroke();
    ctx.fillStyle = "#F6E5C6"; ctx.font = "13px Inter,sans-serif"; ctx.fillText(caseNames[r], 228, ry + 30);
    ctx.fillStyle = "rgba(246,229,198,0.4)"; ctx.font = "12px Inter,sans-serif";
    ctx.fillText(["Abdullah A.", "Mariam K.", "Tech Corp.", "Fahad M.", "Nora S."][r], 346, ry + 30);
    ctx.fillStyle = "rgba(255,255,255,0.05)"; rr(ctx, 460, ry + 14, 70, 22, 4); ctx.fill();
    ctx.fillStyle = sColors[r]; ctx.font = "10px monospace"; ctx.fillText(statuses[r], 468, ry + 29);
    ctx.fillStyle = "rgba(246,229,198,0.35)"; ctx.font = "11px monospace";
    ctx.fillText(["Mar 28", "Apr 3", "Apr 10", "Apr 15", "Closed"][r], 578, ry + 30);
  }
}

function drawSilahRegulation(ctx: CanvasRenderingContext2D, W: number, H: number) {
  ctx.fillStyle = "#012220"; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#013837"; ctx.fillRect(0, 0, W, 60);
  ctx.fillStyle = "#F2CC8F"; ctx.font = "bold 14px serif"; ctx.fillText("Silah Legal", 18, 38);
  ctx.fillStyle = "rgba(246,229,198,0.5)"; ctx.font = "12px Inter,sans-serif";
  ctx.fillText("Regulation Discovery", 180, 38);
  ctx.fillStyle = "rgba(1,56,55,0.8)"; rr(ctx, 18, 76, W - 36, 44, 8); ctx.fill();
  ctx.strokeStyle = "rgba(255,183,3,0.3)"; ctx.lineWidth = 1.5; rr(ctx, 18, 76, W - 36, 44, 8); ctx.stroke();
  ctx.fillStyle = "rgba(246,229,198,0.3)"; ctx.font = "13px Inter,sans-serif";
  ctx.fillText("Describe your case to discover relevant Saudi regulations...", 32, 104);
  ctx.fillStyle = "#FFB703"; ctx.font = "12px monospace"; ctx.fillText("⏎ Search", W - 80, 104);
  ctx.fillStyle = "rgba(246,229,198,0.4)"; ctx.font = "11px monospace";
  ctx.fillText("12 regulations found · sorted by relevance score", 18, 144);
  const regs = [
    { title: "Commercial Companies Law", art: "Art. 178-184", score: 97, label: "HIGHLY RELEVANT" },
    { title: "E-Commerce Regulations", art: "Art. 12, 23", score: 84, label: "RELEVANT" },
    { title: "Consumer Protection Law", art: "Art. 4-9", score: 71, label: "RELEVANT" },
    { title: "Labor Law — Section IV", art: "Art. 55-62", score: 48, label: "MODERATE" },
  ];
  regs.forEach((reg, i) => {
    const ry = 158 + i * 116;
    ctx.fillStyle = "rgba(6,109,106,0.35)"; rr(ctx, 18, ry, W - 36, 104, 8); ctx.fill();
    ctx.strokeStyle = "rgba(246,229,198,0.06)"; ctx.lineWidth = 1; rr(ctx, 18, ry, W - 36, 104, 8); ctx.stroke();
    const barW = Math.round((reg.score / 100) * (W - 160));
    ctx.fillStyle = "rgba(1,56,55,0.6)"; ctx.fillRect(18, ry + 94, W - 36, 10);
    const grad = ctx.createLinearGradient(18, 0, 18 + barW, 0);
    grad.addColorStop(0, "#FFB703"); grad.addColorStop(1, "rgba(255,183,3,0.3)");
    ctx.fillStyle = grad; ctx.fillRect(18, ry + 94, barW, 10);
    ctx.fillStyle = "#F6E5C6"; ctx.font = "bold 14px serif"; ctx.fillText(reg.title, 30, ry + 28);
    ctx.fillStyle = "rgba(246,229,198,0.4)"; ctx.font = "11px monospace"; ctx.fillText(reg.art, 30, ry + 46);
    const sc = reg.score + "%";
    ctx.fillStyle = "rgba(255,183,3,0.15)"; rr(ctx, W - 100, ry + 12, 76, 30, 5); ctx.fill();
    ctx.fillStyle = "#FFB703"; ctx.font = "bold 15px monospace"; ctx.fillText(sc, W - 88, ry + 31);
    ctx.fillStyle = reg.score > 90 ? "rgba(74,222,128,0.7)" : "rgba(255,183,3,0.6)";
    ctx.font = "bold 9px monospace"; ctx.fillText(reg.label, 30, ry + 68);
    ctx.fillStyle = "rgba(246,229,198,0.25)";
    ctx.fillRect(30, ry + 76, W - 160, 6); ctx.fillRect(30, ry + 86, (W - 160) * 0.7, 6);
  });
}

function drawSilahDoc(ctx: CanvasRenderingContext2D, W: number, H: number) {
  ctx.fillStyle = "#012220"; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#013837"; ctx.fillRect(0, 0, W, 56);
  ctx.fillStyle = "#F2CC8F"; ctx.font = "bold 14px serif"; ctx.fillText("Silah Legal", 18, 36);
  ctx.fillStyle = "rgba(246,229,198,0.45)"; ctx.font = "12px Inter,sans-serif"; ctx.fillText("Document Intelligence", 180, 36);
  const panW = (W - 54) / 2;
  ctx.fillStyle = "rgba(1,56,55,0.7)"; rr(ctx, 18, 72, panW, H - 90, 8); ctx.fill();
  ctx.fillStyle = "rgba(255,183,3,0.5)"; ctx.font = "bold 12px monospace"; ctx.fillText("CONTRACT_2024.PDF", 30, 100);
  for (let i = 0; i < 22; i++) {
    const lw = i % 5 === 0 ? panW - 50 : i % 3 === 0 ? (panW - 50) * 0.7 : (panW - 50) * 0.9;
    ctx.fillStyle = i === 3 || i === 9 || i === 15 ? "rgba(255,183,3,0.3)" : "rgba(246,229,198,0.18)";
    ctx.fillRect(30, 112 + i * 22, lw, 8);
  }
  [3, 9, 15].forEach(idx => {
    ctx.fillStyle = "rgba(255,183,3,0.08)";
    ctx.fillRect(18, 112 + idx * 22 - 4, panW, 16);
    ctx.strokeStyle = "rgba(255,183,3,0.4)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(18, 112 + idx * 22 - 4); ctx.lineTo(18, 112 + idx * 22 + 12); ctx.stroke();
  });
  const px = panW + 36;
  ctx.fillStyle = "rgba(6,109,106,0.35)"; rr(ctx, px, 72, panW, H - 90, 8); ctx.fill();
  ctx.fillStyle = "#FFB703"; ctx.font = "bold 12px monospace"; ctx.fillText("EXTRACTED INSIGHTS", px + 12, 100);
  const insights = [
    { l: "Parties", v: "Al-Rahimi Holding, TechCo Ltd" },
    { l: "Effective Date", v: "January 15, 2024" },
    { l: "Contract Value", v: "SAR 2,400,000" },
    { l: "Jurisdiction", v: "Kingdom of Saudi Arabia" },
    { l: "Governing Law", v: "Saudi Commercial Law" },
  ];
  insights.forEach((ins, i) => {
    ctx.fillStyle = "rgba(246,229,198,0.38)"; ctx.font = "10px monospace"; ctx.fillText(ins.l, px + 14, 128 + i * 38);
    ctx.fillStyle = "#F6E5C6"; ctx.font = "bold 12px Inter,sans-serif"; ctx.fillText(ins.v, px + 14, 144 + i * 38);
    if (i < insights.length - 1) { ctx.fillStyle = "rgba(246,229,198,0.06)"; ctx.fillRect(px + 14, 156 + i * 38, panW - 28, 1); }
  });
  ctx.fillStyle = "rgba(1,56,55,0.5)"; rr(ctx, px + 12, 330, panW - 24, 90, 6); ctx.fill();
  ctx.fillStyle = "rgba(255,183,3,0.7)"; ctx.font = "bold 11px monospace"; ctx.fillText("⚠ POTENTIAL ISSUES", px + 18, 354);
  ctx.fillStyle = "rgba(246,229,198,0.4)"; ctx.font = "11px Inter,sans-serif";
  ctx.fillText("Clause 7.3 — ambiguous liability scope", px + 18, 374);
  ctx.fillText("Art. 178 compliance — review needed", px + 18, 390);
  ctx.fillText("Missing arbitration clause", px + 18, 406);
}

function makeTexture(drawFn: (ctx: CanvasRenderingContext2D, W: number, H: number) => void, W: number, H: number) {
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  drawFn(cv.getContext("2d")!, W, H);
  const tex = new THREE.CanvasTexture(cv);
  return tex;
}

function makeImageTexture(src: string, anisotropy: number) {
  const tex = new THREE.TextureLoader().load(src);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = anisotropy;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}

type DrawFn = (ctx: CanvasRenderingContext2D, W: number, H: number) => void;

function drawWahbHeroMobile(ctx: CanvasRenderingContext2D, W: number, H: number) {
  ctx.fillStyle = "#012e2d"; ctx.fillRect(0, 0, W, H);
  // Status bar
  ctx.fillStyle = "#013837"; ctx.fillRect(0, 0, W, 28);
  ctx.fillStyle = "rgba(246,229,198,0.65)"; ctx.font = "10px monospace"; ctx.fillText("9:41", 14, 19);
  ctx.fillStyle = "rgba(246,229,198,0.45)"; ctx.font = "9px monospace"; ctx.fillText("●●● 5G", W - 50, 19);
  // App header
  ctx.fillStyle = "#045C5A"; ctx.fillRect(0, 28, W, 44);
  ctx.fillStyle = "#FFB703"; ctx.font = "bold 18px monospace"; ctx.fillText("wahb", W / 2 - 22, 56);
  ctx.fillStyle = "rgba(246,229,198,0.45)"; ctx.font = "10px monospace"; ctx.fillText("⌕", 16, 56);
  ctx.fillStyle = "rgba(246,229,198,0.45)"; ctx.fillText("✉", W - 24, 56);
  // Stories row
  ctx.fillStyle = "rgba(1,56,55,0.55)"; ctx.fillRect(0, 72, W, 60);
  for (let i = 0; i < 5; i++) {
    const cx = 26 + i * 52;
    ctx.beginPath(); ctx.arc(cx, 102, 18, 0, Math.PI * 2);
    ctx.strokeStyle = i === 0 ? "#FFB703" : "rgba(255,183,3,0.55)";
    ctx.lineWidth = 1.6; ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, 102, 14, 0, Math.PI * 2);
    ctx.fillStyle = ["#066D6A", "#045C5A", "#013837", "#066D6A", "#045C5A"][i]; ctx.fill();
  }
  // Feed cards (2)
  for (let i = 0; i < 2; i++) {
    const py = 144 + i * 178;
    ctx.fillStyle = "rgba(6,109,106,0.4)"; rr(ctx, 12, py, W - 24, 168, 10); ctx.fill();
    ctx.strokeStyle = "rgba(246,229,198,0.07)"; ctx.lineWidth = 1; rr(ctx, 12, py, W - 24, 168, 10); ctx.stroke();
    ctx.beginPath(); ctx.arc(30, py + 22, 12, 0, Math.PI * 2);
    ctx.fillStyle = ["#FFB703", "#F2CC8F"][i]; ctx.fill();
    ctx.fillStyle = "#F6E5C6"; ctx.font = "bold 11px Inter,sans-serif";
    ctx.fillText(["@user_alpha", "@dev_beta"][i], 48, py + 20);
    ctx.fillStyle = "rgba(246,229,198,0.4)"; ctx.font = "9px monospace";
    ctx.fillText(["2m ago", "18m ago"][i], 48, py + 32);
    // Body lines
    ctx.fillStyle = "rgba(246,229,198,0.42)"; ctx.fillRect(20, py + 48, W - 40, 6);
    ctx.fillStyle = "rgba(246,229,198,0.28)"; ctx.fillRect(20, py + 60, (W - 40) * 0.78, 6);
    // Media block
    ctx.fillStyle = "rgba(1,56,55,0.6)"; rr(ctx, 20, py + 76, W - 40, 56, 6); ctx.fill();
    ctx.fillStyle = "rgba(246,229,198,0.14)"; ctx.font = "10px monospace";
    ctx.fillText("[ media ]", W / 2 - 22, py + 108);
    // Action row
    ["♥ 24", "↗ 8", "✦ 3"].forEach((a, j) => {
      ctx.fillStyle = "rgba(246,229,198,0.36)"; ctx.font = "10px monospace";
      ctx.fillText(a, 22 + j * 56, py + 152);
    });
  }
  // Bottom tab bar
  ctx.fillStyle = "#013837"; ctx.fillRect(0, H - 44, W, 44);
  ctx.strokeStyle = "rgba(246,229,198,0.07)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0, H - 44); ctx.lineTo(W, H - 44); ctx.stroke();
  ["⌂", "⊞", "+", "♡", "☰"].forEach((ic, i) => {
    ctx.fillStyle = i === 0 ? "#FFB703" : "rgba(246,229,198,0.4)";
    ctx.font = "16px sans-serif"; ctx.fillText(ic, (W / 5) * i + W / 10 - 7, H - 18);
  });
}

function drawSilahHeroMobile(ctx: CanvasRenderingContext2D, W: number, H: number) {
  ctx.fillStyle = "#012220"; ctx.fillRect(0, 0, W, H);
  // Status bar
  ctx.fillStyle = "#013837"; ctx.fillRect(0, 0, W, 28);
  ctx.fillStyle = "rgba(246,229,198,0.65)"; ctx.font = "10px monospace"; ctx.fillText("9:41", 14, 19);
  ctx.fillStyle = "rgba(246,229,198,0.45)"; ctx.font = "9px monospace"; ctx.fillText("●●● 5G", W - 50, 19);
  // App header
  ctx.fillStyle = "#013837"; ctx.fillRect(0, 28, W, 48);
  ctx.fillStyle = "rgba(246,229,198,0.5)"; ctx.font = "14px sans-serif"; ctx.fillText("‹", 14, 58);
  ctx.fillStyle = "#F2CC8F"; ctx.font = "bold 13px serif"; ctx.fillText("Silah Legal", 32, 58);
  ctx.fillStyle = "rgba(246,229,198,0.45)"; ctx.font = "12px sans-serif"; ctx.fillText("⋮", W - 22, 58);
  // Search bar
  ctx.fillStyle = "rgba(1,56,55,0.85)"; rr(ctx, 14, 88, W - 28, 36, 8); ctx.fill();
  ctx.strokeStyle = "rgba(255,183,3,0.32)"; ctx.lineWidth = 1.4; rr(ctx, 14, 88, W - 28, 36, 8); ctx.stroke();
  ctx.fillStyle = "rgba(246,229,198,0.32)"; ctx.font = "10px Inter,sans-serif";
  ctx.fillText("Describe your case…", 26, 110);
  ctx.fillStyle = "#FFB703"; ctx.font = "10px monospace"; ctx.fillText("⏎", W - 30, 110);
  // Result count
  ctx.fillStyle = "rgba(246,229,198,0.42)"; ctx.font = "9px monospace";
  ctx.fillText("12 regulations · sorted by score", 16, 142);
  // Regulation cards
  const regs = [
    { title: "Commercial Companies Law", art: "Art. 178-184", score: 97, label: "HIGHLY RELEVANT" },
    { title: "E-Commerce Regulations", art: "Art. 12, 23", score: 84, label: "RELEVANT" },
    { title: "Consumer Protection Law", art: "Art. 4-9", score: 71, label: "RELEVANT" },
  ];
  regs.forEach((reg, i) => {
    const ry = 154 + i * 100;
    ctx.fillStyle = "rgba(6,109,106,0.4)"; rr(ctx, 12, ry, W - 24, 90, 8); ctx.fill();
    ctx.strokeStyle = "rgba(246,229,198,0.07)"; ctx.lineWidth = 1; rr(ctx, 12, ry, W - 24, 90, 8); ctx.stroke();
    ctx.fillStyle = "#F6E5C6"; ctx.font = "bold 11px serif"; ctx.fillText(reg.title, 22, ry + 22);
    ctx.fillStyle = "rgba(246,229,198,0.4)"; ctx.font = "9px monospace"; ctx.fillText(reg.art, 22, ry + 36);
    // Score chip
    const sc = reg.score + "%";
    ctx.fillStyle = "rgba(255,183,3,0.16)"; rr(ctx, W - 60, ry + 12, 46, 22, 4); ctx.fill();
    ctx.fillStyle = "#FFB703"; ctx.font = "bold 11px monospace"; ctx.fillText(sc, W - 53, ry + 27);
    // Relevance label
    ctx.fillStyle = reg.score > 90 ? "rgba(74,222,128,0.78)" : "rgba(255,183,3,0.66)";
    ctx.font = "bold 8px monospace"; ctx.fillText(reg.label, 22, ry + 52);
    // Score bar
    const barW = Math.round((reg.score / 100) * (W - 44));
    ctx.fillStyle = "rgba(1,56,55,0.7)"; ctx.fillRect(22, ry + 64, W - 44, 6);
    const grad = ctx.createLinearGradient(22, 0, 22 + barW, 0);
    grad.addColorStop(0, "#FFB703"); grad.addColorStop(1, "rgba(255,183,3,0.32)");
    ctx.fillStyle = grad; ctx.fillRect(22, ry + 64, barW, 6);
    ctx.fillStyle = "rgba(246,229,198,0.28)"; ctx.fillRect(22, ry + 76, (W - 44) * 0.65, 4);
  });
  // Footer hint
  ctx.fillStyle = "rgba(1,56,55,0.85)"; ctx.fillRect(0, H - 36, W, 36);
  ctx.fillStyle = "rgba(246,229,198,0.4)"; ctx.font = "9px monospace";
  ctx.fillText("Tap a regulation for explainable scoring", 18, H - 14);
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

function MobileMockup({ draw, w, h }: { draw: DrawFn; w: number; h: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const dpr = Math.min(window.devicePixelRatio, 2);
    cv.width = w * dpr;
    cv.height = h * dpr;
    const ctx = cv.getContext("2d")!;
    ctx.scale(dpr, dpr);
    draw(ctx, w, h);
  }, [draw, w, h]);
  return <canvas ref={ref} className="ps-mobile-mockup" style={{ width: w, height: h }} />;
}

export default function ProductsShowcase({ scrollContainerId = "main-scroll" }: { scrollContainerId?: string }) {
  const { t, isRTL } = useLocale();
  const ps = t.productsShowcase;
  const isMobile = useIsMobile();
  const [product, setProduct] = useState<ProductId>("wahb");
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const productRef = useRef<ProductId>("wahb");
  const switchSceneRef = useRef<(id: ProductId) => void>(() => {});

  // Sync product state into ref + trigger switch
  useEffect(() => {
    if (productRef.current !== product) {
      productRef.current = product;
      switchSceneRef.current(product);
    }
  }, [product]);

  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 6;

    // Ambient particles
    const ptGeo = new THREE.BufferGeometry();
    const ptCount = 120;
    const ptPos = new Float32Array(ptCount * 3);
    for (let i = 0; i < ptCount; i++) {
      ptPos[i * 3] = (Math.random() - 0.5) * 28;
      ptPos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      ptPos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 4;
    }
    ptGeo.setAttribute("position", new THREE.BufferAttribute(ptPos, 3));
    const ptMat = new THREE.PointsMaterial({ color: 0xffb703, size: 0.04, transparent: true, opacity: 0.35 });
    const points = new THREE.Points(ptGeo, ptMat);
    scene.add(points);

    const group = new THREE.Group();
    scene.add(group);

    const anisotropy = renderer.capabilities.getMaxAnisotropy();
    const tWahbPipeline = makeImageTexture(WAHB_FLOATING_SCREENS[0].src, anisotropy);
    const tWahbForYou = makeImageTexture(WAHB_FLOATING_SCREENS[1].src, anisotropy);
    const tWahbNews = makeImageTexture(WAHB_FLOATING_SCREENS[2].src, anisotropy);
    const tSilahStudio = makeImageTexture(SILAH_FLOATING_SCREENS[0].src, anisotropy);
    const tSilahDashboard = makeImageTexture(SILAH_FLOATING_SCREENS[1].src, anisotropy);
    const tSilahVersions = makeImageTexture(SILAH_FLOATING_SCREENS[2].src, anisotropy);

    type PlaneObj = { mesh: THREE.Mesh; baseOpacity: number };
    let planeObjs: PlaneObj[] = [];

    function makePlane(tex: THREE.Texture, pw: number, ph: number, pos: [number, number, number], rot: [number, number, number], opacity = 0.92): PlaneObj {
      const geo = new THREE.PlaneGeometry(pw, ph);
      const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...pos);
      mesh.rotation.set(...rot);
      group.add(mesh);
      return { mesh, baseOpacity: opacity };
    }

    function loadProduct(id: ProductId) {
      planeObjs.forEach(p => {
        group.remove(p.mesh);
        p.mesh.geometry.dispose();
        (p.mesh.material as THREE.Material).dispose();
      });
      planeObjs = [];
      if (id === "wahb") {
        // Match exact source image aspect ratios.
        planeObjs.push(makePlane(tWahbPipeline, 4.58, 2.5, [0, 0.5, -1.6], [0, 0, 0], 0.9)); // 2940x1604
        planeObjs.push(makePlane(tWahbForYou, 1.33, 2.82, [-2.55, -0.1, -0.25], [0, 0.26, -0.04], 0.96)); // 682x1444
        planeObjs.push(makePlane(tWahbNews, 1.33, 2.83, [2.55, -0.16, -0.2], [0, -0.26, 0.04], 0.96)); // 680x1446
      } else {
        planeObjs.push(makePlane(tSilahDashboard, 4.15, 3.13, [0, 0.54, -1.7], [0, 0, 0], 0.9)); // 1713x1292
        planeObjs.push(makePlane(tSilahStudio, 3.45, 1.88, [-2.78, 0.12, -0.58], [0, 0.22, -0.035], 0.88)); // 2940x1604
        planeObjs.push(makePlane(tSilahVersions, 3.15, 2.38, [2.75, -0.02, -0.5], [0, -0.22, 0.035], 0.88)); // 1713x1292
      }
      planeObjs.forEach(p => { (p.mesh.material as THREE.MeshBasicMaterial).opacity = 0; });
    }

    function switchScene(id: ProductId) {
      const tgt = -16;
      const start = group.position.z;
      let prog = 0;
      const flyOut = () => {
        prog += 0.04;
        group.position.z = start + (tgt - start) * Math.min(prog, 1);
        if (prog < 1) requestAnimationFrame(flyOut);
        else {
          loadProduct(id);
          group.position.z = tgt;
          flyIn();
        }
      };
      const flyIn = () => {
        let p2 = 0;
        const step = () => {
          p2 += 0.04;
          const t = Math.min(p2, 1);
          group.position.z = tgt * (1 - t);
          planeObjs.forEach(p => {
            (p.mesh.material as THREE.MeshBasicMaterial).opacity = t * p.baseOpacity;
          });
          if (p2 < 1) requestAnimationFrame(step);
        };
        step();
      };
      flyOut();
    }
    switchSceneRef.current = switchScene;

    // Initial load with fade-in
    loadProduct("wahb");
    {
      let p2 = 0;
      const step = () => {
        p2 += 0.04;
        const t = Math.min(p2, 1);
        planeObjs.forEach(p => {
          (p.mesh.material as THREE.MeshBasicMaterial).opacity = t * p.baseOpacity;
        });
        if (p2 < 1) requestAnimationFrame(step);
      };
      step();
    }

    let mouseX = 0, mouseY = 0, targetRY = 0, targetRX = 0;
    const onMouseMove = (e: MouseEvent) => {
      const rect = root!.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetRY = mouseX * 0.07;
      targetRX = -mouseY * 0.04;
    };
    root.addEventListener("mousemove", onMouseMove);

    const scrollEl = document.getElementById(scrollContainerId);
    let scrollY = 0;
    const onScroll = () => {
      scrollY = scrollEl ? scrollEl.scrollTop : window.scrollY;
    };
    (scrollEl || window).addEventListener("scroll", onScroll, { passive: true });

    let lastW = 0, lastH = 0;
    function resizeIfChanged() {
      const viewportEl = scrollEl || root!;
      const w = Math.max(1, viewportEl.clientWidth);
      const h = Math.max(1, viewportEl.clientHeight);
      if (w === lastW && h === lastH) return;
      lastW = w; lastH = h;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
    }
    resizeIfChanged();

    let raf = 0;
    const timer = new THREE.Timer();
    timer.connect(document);
    const animate = (timestamp?: number) => {
      raf = requestAnimationFrame(animate);
      resizeIfChanged();
      const t = timer.update(timestamp).getElapsed();
      camera.rotation.y += (targetRY - camera.rotation.y) * 0.04;
      camera.rotation.x += (targetRX - camera.rotation.x) * 0.04;
      const vh = root.clientHeight || 1;
      const scrollVH = scrollY / vh;
      const targetZ = -scrollVH * 5;
      group.position.z += (targetZ - group.position.z) * 0.06;
      group.position.y += (-scrollVH * 0.5 - group.position.y) * 0.06;
      planeObjs.forEach((p, i) => {
        p.mesh.position.y += Math.sin(t * 0.6 + i * 1.4) * 0.0025;
        p.mesh.rotation.z = Math.sin(t * 0.35 + i) * 0.008;
      });
      const arr = ptGeo.attributes.position.array as Float32Array;
      arr[1] += 0.0004;
      if (arr[1] > 8) arr[1] = -8;
      ptGeo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    // Reveal observer
    const revealRoot = scrollEl || null;
    const revealEls = root.querySelectorAll(".ps-reveal,.ps-rs");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("ps-vis");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, root: revealRoot });
    revealEls.forEach(el => obs.observe(el));

    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
      root.removeEventListener("mousemove", onMouseMove);
      (scrollEl || window).removeEventListener("scroll", onScroll);
      planeObjs.forEach(p => { p.mesh.geometry.dispose(); (p.mesh.material as THREE.Material).dispose(); });
      [tWahbPipeline, tWahbForYou, tWahbNews, tSilahStudio, tSilahDashboard, tSilahVersions].forEach(t => t.dispose());
      timer.dispose();
      ptGeo.dispose();
      ptMat.dispose();
      renderer.dispose();
    };
  }, [scrollContainerId, isMobile]);

  // Re-run reveal when product changes
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const scrollEl = document.getElementById(scrollContainerId);
    const els = root.querySelectorAll(`.ps-page-${product} .ps-reveal, .ps-page-${product} .ps-rs`);
    els.forEach(el => el.classList.remove("ps-vis"));
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("ps-vis");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, root: scrollEl || null });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [product, scrollContainerId]);

  return (
    <div ref={rootRef} className={`ps-root ${isRTL ? "ps-rtl" : ""} ${isMobile ? "ps-mobile" : ""}`} dir={isRTL ? "rtl" : "ltr"}>
      {!isMobile && <canvas ref={canvasRef} className="ps-canvas" />}

      <div className="ps-switcher-wrap">
        <div className="ps-switcher">
          <button
            className={`ps-pill ${product === "wahb" ? "active" : ""}`}
            onClick={() => setProduct("wahb")}
          >
            {ps.pillWahb}
          </button>
          <button
            className={`ps-pill ${product === "silah" ? "active" : ""}`}
            onClick={() => setProduct("silah")}
          >
            {ps.pillSilah}
          </button>
        </div>
      </div>

      {product === "wahb" && (
        <div key="wahb" className="ps-page ps-page-wahb">
          <div className="ps-hero">
            {isMobile && (
              <div className="ps-mobile-shot-stack" aria-label="Wahb product screens">
                {WAHB_FLOATING_SCREENS.map(screen => (
                  <img
                    key={screen.key}
                    className={`ps-mobile-shot ps-mobile-shot-${screen.key}`}
                    src={screen.src}
                    alt={screen.alt}
                    loading="eager"
                  />
                ))}
              </div>
            )}
            <div className="ps-hero-eye">{ps.wahb.heroEye}</div>
            <h1 className="ps-hero-title">{ps.wahb.titleLine1}{ps.wahb.titleLine2 ? <><br />{ps.wahb.titleLine2}</> : null}</h1>
            <p className="ps-hero-sub">{ps.wahb.heroSub}</p>
            <div className="ps-hero-chips">
              {ps.wahb.chips.map((c, i) => <span key={i} className="ps-chip">{c}</span>)}
            </div>
            <a className="ps-hero-link" href={ps.wahb.footLink} target="_blank" rel="noopener noreferrer">
              Visit ↗
            </a>
            {!isMobile && (
              <div className="ps-scroll-hint">
                <span>{ps.scrollHint}</span>
                <div className="ps-scroll-arrow" />
              </div>
            )}
          </div>

          <div className="ps-csect-gap" />

          <div className="ps-csect">
            <div className="ps-sect-label ps-reveal">{ps.wahb.atGlanceLabel}</div>
            <h2 className="ps-sect-title ps-reveal">{ps.wahb.atGlanceTitle}</h2>
            <p className="ps-sect-body ps-reveal">{ps.wahb.atGlanceBody}</p>
            <div className="ps-section-shot ps-reveal">
              <img src={WAHB_ARCHITECTURE_SCREEN.src} alt={WAHB_ARCHITECTURE_SCREEN.alt} loading="lazy" />
            </div>
            <div className="ps-stat-row ps-rs">
              {ps.wahb.stats.map((s, i) => (
                <div key={i} className="ps-stat"><div className="ps-stat-n">{s.n}</div><div className="ps-stat-l">{s.l}</div></div>
              ))}
            </div>
          </div>

          <div className="ps-csect ps-csect-alt">
            <div className="ps-sect-label ps-reveal">{ps.wahb.portalsLabel}</div>
            <h2 className="ps-sect-title ps-reveal">{ps.wahb.portalsTitle}</h2>
            <div className="ps-twocol ps-rs">
              <div className="ps-pcrd">
                <div className="ps-pcrd-name">{ps.wahb.portalConsumerName}</div>
                <div className="ps-pcrd-sub">{ps.wahb.portalConsumerSub}</div>
                <div className="ps-pcrd-body">{ps.wahb.portalConsumerBody}</div>
                <div className="ps-tags">
                  {ps.wahb.portalConsumerTags.map((tg, i) => <span key={i} className="ps-tag">{tg}</span>)}
                </div>
              </div>
              <div className="ps-pcrd">
                <div className="ps-pcrd-name">{ps.wahb.portalAdminName}</div>
                <div className="ps-pcrd-sub">{ps.wahb.portalAdminSub}</div>
                <div className="ps-pcrd-body">{ps.wahb.portalAdminBody}</div>
                <div className="ps-tags">
                  {ps.wahb.portalAdminTags.map((tg, i) => <span key={i} className="ps-tag">{tg}</span>)}
                </div>
              </div>
            </div>
            <div className="ps-section-shot ps-section-shot-phone ps-reveal">
              <img src={WAHB_FLOATING_SCREENS[2].src} alt={WAHB_FLOATING_SCREENS[2].alt} loading="lazy" />
            </div>
          </div>

          <div className="ps-csect">
            <div className="ps-sect-label ps-reveal">{ps.wahb.backendLabel}</div>
            <h2 className="ps-sect-title ps-reveal">{ps.wahb.backendTitle}</h2>
            <p className="ps-sect-body ps-reveal">{ps.wahb.backendBody}</p>
            <div className="ps-section-shot ps-reveal">
              <img src={WAHB_FLOATING_SCREENS[0].src} alt={WAHB_FLOATING_SCREENS[0].alt} loading="lazy" />
            </div>
            <div className="ps-svc-list ps-rs">
              {ps.wahb.services.map((s, i) => (
                <div key={i} className="ps-svc">
                  <div><div className="ps-svc-lang">{s.lang}</div></div>
                  <div><div className="ps-svc-name">{s.name}</div><div className="ps-svc-desc">{s.desc}</div></div>
                </div>
              ))}
            </div>
          </div>

          <div className="ps-csect ps-csect-alt">
            <div className="ps-sect-label ps-reveal">{ps.wahb.featuresLabel}</div>
            <h2 className="ps-sect-title ps-reveal">{ps.wahb.featuresTitle}</h2>
            <p className="ps-sect-body ps-reveal">{ps.wahb.featuresBody}</p>
            <div className="ps-cards ps-rs">
              {ps.wahb.featureCards.map((c, i) => (
                <div key={i} className="ps-card ps-feature-card">
                  <div className="ps-card-ttl">{c.ttl}</div>
                  <div className="ps-card-body">{c.body}</div>
                  {c.signals && c.signals.length > 0 && (
                    <div className="ps-tags ps-feature-signals">
                      {c.signals.map((s, j) => <span key={j} className="ps-tag">{s}</span>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="ps-csect">
            <div className="ps-sect-label ps-reveal">{ps.wahb.pipelineLabel}</div>
            <h2 className="ps-sect-title ps-reveal">{ps.wahb.pipelineTitle}</h2>
            <p className="ps-sect-body ps-reveal">{ps.wahb.pipelineBody}</p>
            <div className="ps-flow ps-rs">
              {ps.wahb.pipelineSteps.map((s, i) => (
                <div key={i} className="ps-flow-item">
                  <div className="ps-flow-step">
                    <div className="ps-flow-step-n">{String(i + 1).padStart(2, "0")}</div>
                    <div className="ps-flow-step-name">{s.step}</div>
                    <div className="ps-flow-step-sub">{s.sub}</div>
                  </div>
                  {i < ps.wahb.pipelineSteps.length - 1 && <div className="ps-flow-arrow" aria-hidden>→</div>}
                </div>
              ))}
            </div>
          </div>

          <div className="ps-csect ps-csect-alt">
            <div className="ps-sect-label ps-reveal">{ps.wahb.stackLabel}</div>
            <h2 className="ps-sect-title ps-reveal">{ps.wahb.stackTitle}</h2>
            <div className="ps-stack-grid ps-rs">
              {ps.wahb.stackGroups.map((g, i) => (
                <div key={i} className="ps-stack-group">
                  <div className="ps-stack-group-label">{g.label}</div>
                  <div className="ps-stack-group-items">
                    {g.items.map((it, j) => <span key={j} className="ps-chip">{it}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ps-prod-foot ps-reveal">
            <span className="ps-foot-wm">{ps.wahb.footWm}</span>
            <a className="ps-foot-link" href={ps.wahb.footLink} target="_blank" rel="noopener noreferrer">
              Visit ↗
            </a>
          </div>
        </div>
      )}

      {product === "silah" && (
        <div key="silah" className="ps-page ps-page-silah">
          <div className="ps-hero">
            {isMobile && (
              <div className="ps-mobile-shot-stack ps-mobile-shot-stack-silah" aria-label="Silah legal product screens">
                {SILAH_FLOATING_SCREENS.map(screen => (
                  <img
                    key={screen.key}
                    className={`ps-mobile-shot ps-mobile-shot-silah-${screen.key}`}
                    src={screen.src}
                    alt={screen.alt}
                    loading="eager"
                  />
                ))}
              </div>
            )}
            <div className="ps-hero-eye">{ps.silah.heroEye}</div>
            <h1 className="ps-hero-title">{ps.silah.titleLine1}{ps.silah.titleLine2 ? <><br />{ps.silah.titleLine2}</> : null}</h1>
            <p className="ps-hero-sub">{ps.silah.heroSub}</p>
            <div className="ps-hero-chips">
              {ps.silah.chips.map((c, i) => <span key={i} className="ps-chip">{c}</span>)}
            </div>
            <a className="ps-hero-link" href={ps.silah.footLink} target="_blank" rel="noopener noreferrer">
              Visit ↗
            </a>
            {!isMobile && (
              <div className="ps-scroll-hint">
                <span>{ps.scrollHint}</span>
                <div className="ps-scroll-arrow" />
              </div>
            )}
          </div>

          <div className="ps-csect-gap" />

          <div className="ps-csect">
            <div className="ps-sect-label ps-reveal">{ps.silah.platformLabel}</div>
            <h2 className="ps-sect-title ps-reveal">{ps.silah.platformTitle}</h2>
            <p className="ps-sect-body ps-reveal">{ps.silah.platformBody}</p>
            <div className="ps-section-shot ps-reveal">
              <img src={SILAH_FLOATING_SCREENS[1].src} alt={SILAH_FLOATING_SCREENS[1].alt} loading="lazy" />
            </div>
            <div className="ps-stat-row ps-rs">
              {ps.silah.stats.map((s, i) => (
                <div key={i} className="ps-stat"><div className="ps-stat-n">{s.n}</div><div className="ps-stat-l">{s.l}</div></div>
              ))}
            </div>
          </div>

          <div className="ps-csect ps-csect-alt">
            <div className="ps-sect-label ps-reveal">{ps.silah.audienceLabel}</div>
            <h2 className="ps-sect-title ps-reveal">{ps.silah.audienceTitle}</h2>
            <div className="ps-cards ps-rs">
              {ps.silah.audienceCards.map((c, i) => (
                <div key={i} className="ps-card">
                  <div className="ps-card-ttl">{c.ttl}</div>
                  <div className="ps-card-body">{c.body}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="ps-csect">
            <div className="ps-sect-label ps-reveal">{ps.silah.challengeLabel}</div>
            <h2 className="ps-sect-title ps-reveal">{ps.silah.challengeTitle}</h2>
            <p className="ps-sect-body ps-reveal">{ps.silah.challengeBody}</p>
            <div className="ps-cards ps-rs">
              {ps.silah.challengeCards.map((c, i) => (
                <div key={i} className="ps-card">
                  <div className="ps-card-ttl">{c.ttl}</div>
                  <div className="ps-card-body">{c.body}</div>
                </div>
              ))}
            </div>
            <div className="ps-section-shot ps-reveal">
              <img src={SILAH_FLOATING_SCREENS[0].src} alt={SILAH_FLOATING_SCREENS[0].alt} loading="lazy" />
            </div>
          </div>

          <div className="ps-csect ps-csect-alt">
            <div className="ps-sect-label ps-reveal">{ps.silah.walkthroughLabel}</div>
            <h2 className="ps-sect-title ps-reveal">{ps.silah.walkthroughTitle}</h2>
            <p className="ps-sect-body ps-reveal">{ps.silah.walkthroughBody}</p>
            <div className="ps-flow ps-rs">
              {ps.silah.walkthroughSteps.map((s, i) => (
                <div key={i} className="ps-flow-item">
                  <div className="ps-flow-step">
                    <div className="ps-flow-step-n">{String(i + 1).padStart(2, "0")}</div>
                    <div className="ps-flow-step-name">{s.step}</div>
                    <div className="ps-flow-step-sub">{s.sub}</div>
                  </div>
                  {i < ps.silah.walkthroughSteps.length - 1 && <div className="ps-flow-arrow" aria-hidden>→</div>}
                </div>
              ))}
            </div>
          </div>

          <div className="ps-csect">
            <div className="ps-sect-label ps-reveal">{ps.silah.capabilitiesLabel}</div>
            <h2 className="ps-sect-title ps-reveal">{ps.silah.capabilitiesTitle}</h2>
            <div className="ps-cards ps-rs">
              {ps.silah.capabilitiesCards.map((c, i) => (
                <div key={i} className="ps-card">
                  <div className="ps-card-ttl">{c.ttl}</div>
                  <div className="ps-card-body">{c.body}</div>
                </div>
              ))}
            </div>
            <div className="ps-section-shot ps-reveal">
              <img src={SILAH_FLOATING_SCREENS[2].src} alt={SILAH_FLOATING_SCREENS[2].alt} loading="lazy" />
            </div>
          </div>

          <div className="ps-csect ps-csect-alt">
            <div className="ps-sect-label ps-reveal">{ps.silah.aiLabel}</div>
            <h2 className="ps-sect-title ps-reveal">{ps.silah.aiTitle}</h2>
            <p className="ps-sect-body ps-reveal">{ps.silah.aiBody}</p>
            <div className="ps-cards ps-rs">
              {ps.silah.aiCards.map((c, i) => (
                <div key={i} className="ps-card ps-feature-card">
                  {c.badge && <div className="ps-card-badge">{c.badge}</div>}
                  <div className="ps-card-ttl">{c.ttl}</div>
                  <div className="ps-card-body">{c.body}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="ps-csect">
            <div className="ps-sect-label ps-reveal">{ps.silah.contextLabel}</div>
            <h2 className="ps-sect-title ps-reveal">{ps.silah.contextTitle}</h2>
            <div className="ps-cards ps-rs">
              {ps.silah.contextCards.map((c, i) => (
                <div key={i} className="ps-card">
                  <div className="ps-card-ttl">{c.ttl}</div>
                  <div className="ps-card-body">{c.body}</div>
                </div>
              ))}
            </div>
            <div className="ps-tech-note ps-reveal">{ps.silah.techNote}</div>
          </div>

          <div className="ps-prod-foot ps-reveal">
            <span className="ps-foot-wm">{ps.silah.footWm}</span>
            <a className="ps-foot-link" href={ps.silah.footLink} target="_blank" rel="noopener noreferrer">
              Visit ↗
            </a>
          </div>
        </div>
      )}

      <style jsx>{`
        .ps-root {
          position: relative;
          width: 100%;
          min-height: 100%;
          color: #F6E5C6;
          font-family: var(--font-inter), system-ui, sans-serif;
        }
        .ps-rtl {
          font-family: var(--font-somar), "Geeza Pro", "SF Arabic", sans-serif;
        }
        .ps-rtl .ps-hero-title,
        .ps-rtl .ps-sect-title,
        .ps-rtl .ps-stat-n,
        .ps-rtl .ps-card-ttl,
        .ps-rtl .ps-pcrd-name,
        .ps-rtl .ps-svc-name {
          font-family: var(--font-somar), "Geeza Pro", "SF Arabic", serif;
        }
        .ps-rtl .ps-hero-eye,
        .ps-rtl .ps-sect-label,
        .ps-rtl .ps-stat-l,
        .ps-rtl .ps-pcrd-sub,
        .ps-rtl .ps-svc-lang,
        .ps-rtl .ps-chip,
        .ps-rtl .ps-tag,
        .ps-rtl .ps-foot-wm,
        .ps-rtl .ps-scroll-hint span,
        .ps-rtl .ps-pill {
          font-family: var(--font-somar), "Geeza Pro", "SF Arabic", monospace;
          letter-spacing: 0;
        }
        .ps-canvas {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
          display: block;
          margin-bottom: -100vh;
        }
        .ps-switcher-wrap {
          position: sticky;
          top: 0;
          z-index: 30;
          display: flex;
          justify-content: center;
          padding: 14px 0 6px;
          pointer-events: none;
        }
        .ps-switcher {
          pointer-events: auto;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(1, 56, 55, 0.7);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(246, 229, 198, 0.1);
          border-radius: 100px;
          padding: 4px;
        }
        .ps-pill {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 7px 18px;
          border: none;
          background: transparent;
          cursor: pointer;
          border-radius: 100px;
          color: rgba(246, 229, 198, 0.6);
          transition: color 0.25s, background 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
        }
        .ps-pill.active {
          color: #013837;
          font-weight: 600;
          background: #FFB703;
        }
        .ps-pill:hover:not(.active) {
          color: #F6E5C6;
        }
        .ps-page { position: relative; z-index: 10; }
        .ps-hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0 clamp(20px, 6vw, 72px) 80px;
          pointer-events: none;
          background: linear-gradient(to top, rgba(1, 56, 55, 0.65) 0%, transparent 55%);
          position: relative;
        }
        .ps-hero-eye {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #FFB703;
          margin-bottom: 18px;
          opacity: 0;
          transform: translateY(12px);
          animation: psFadeUp 0.7s 0.2s ease forwards;
        }
        .ps-hero-title {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: clamp(56px, 9vw, 130px);
          font-weight: 700;
          line-height: 0.95;
          color: #F6E5C6;
          margin-bottom: 24px;
          opacity: 0;
          transform: translateY(20px);
          animation: psFadeUp 0.8s 0.35s ease forwards;
        }
        .ps-hero-sub {
          font-size: 17px;
          line-height: 1.7;
          color: rgba(246, 229, 198, 0.6);
          max-width: 52ch;
          margin-bottom: 40px;
          opacity: 0;
          transform: translateY(16px);
          animation: psFadeUp 0.7s 0.5s ease forwards;
        }
        .ps-hero-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          opacity: 0;
          transform: translateY(12px);
          animation: psFadeUp 0.7s 0.65s ease forwards;
        }
        .ps-chip {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          padding: 5px 13px;
          border-radius: 4px;
          border: 1px solid rgba(255, 183, 3, 0.28);
          color: #FFB703;
          background: rgba(255, 183, 3, 0.07);
        }
        .ps-scroll-hint {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          opacity: 0;
          animation: psFadeUp 0.6s 1.1s ease forwards;
          pointer-events: none;
        }
        .ps-scroll-hint span {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(246, 229, 198, 0.28);
        }
        .ps-scroll-arrow {
          width: 1px;
          height: 32px;
          background: linear-gradient(to bottom, rgba(246, 229, 198, 0.28), transparent);
          animation: psArrowPulse 2s infinite ease-in-out;
        }
        @keyframes psArrowPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.8); }
          50% { opacity: 1; transform: scaleY(1); }
        }
        .ps-csect {
          position: relative;
          padding: 90px clamp(20px, 6vw, 72px);
          background: rgba(1, 56, 55, 0.9);
          backdrop-filter: blur(28px);
          border-top: 1px solid rgba(246, 229, 198, 0.09);
        }
        .ps-csect-alt { background: rgba(4, 92, 90, 0.88); }
        .ps-csect-gap { height: 60px; background: transparent; }
        .ps-sect-label {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: #FFB703;
          margin-bottom: 14px;
        }
        .ps-sect-title {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: clamp(28px, 4vw, 52px);
          font-weight: 700;
          line-height: 1.08;
          color: #F6E5C6;
          margin-bottom: 18px;
          max-width: 22ch;
          text-wrap: pretty;
        }
        .ps-sect-body {
          font-size: 16px;
          line-height: 1.78;
          color: rgba(246, 229, 198, 0.6);
          max-width: 58ch;
        }
        .ps-section-shot {
          width: min(100%, 980px);
          margin-top: 42px;
          border: 1px solid rgba(246, 229, 198, 0.1);
          border-radius: 18px;
          overflow: hidden;
          background: rgba(1, 56, 55, 0.45);
          box-shadow: 0 28px 70px rgba(0, 0, 0, 0.32);
        }
        .ps-section-shot-phone {
          width: min(100%, 360px);
        }
        .ps-section-shot img {
          display: block;
          width: 100%;
          height: auto;
        }
        .ps-stat-row {
          display: flex;
          flex-wrap: wrap;
          border: 1px solid rgba(246, 229, 198, 0.09);
          border-radius: 14px;
          overflow: hidden;
          margin-top: 48px;
        }
        .ps-stat {
          flex: 1;
          min-width: 140px;
          padding: 36px 28px;
          border-right: 1px solid rgba(246, 229, 198, 0.09);
          background: rgba(1, 56, 55, 0.5);
          text-align: center;
        }
        .ps-stat:last-child { border-right: none; }
        .ps-stat-n {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 52px;
          font-weight: 700;
          color: #FFB703;
          line-height: 1;
          margin-bottom: 8px;
        }
        .ps-stat-l {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(246, 229, 198, 0.6);
        }
        .ps-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 18px;
          margin-top: 48px;
        }
        .ps-card {
          padding: 28px 24px;
          background: rgba(1, 56, 55, 0.65);
          border: 1px solid rgba(246, 229, 198, 0.09);
          border-radius: 14px;
          transition: border-color 0.3s, transform 0.3s;
        }
        .ps-card:hover {
          border-color: rgba(255, 183, 3, 0.28);
          transform: translateY(-3px);
        }
        .ps-card-ttl {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 18px;
          font-weight: 700;
          color: #F6E5C6;
          margin-bottom: 9px;
        }
        .ps-card-body {
          font-size: 13.5px;
          line-height: 1.72;
          color: rgba(246, 229, 198, 0.6);
        }
        .ps-twocol {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          align-items: start;
          margin-top: 52px;
        }
        @media (max-width: 760px) {
          .ps-twocol { grid-template-columns: 1fr; }
        }
        .ps-pcrd {
          padding: 36px 32px;
          background: rgba(1, 56, 55, 0.6);
          border: 1px solid rgba(246, 229, 198, 0.09);
          border-radius: 16px;
          transition: border-color 0.3s, transform 0.3s;
        }
        .ps-pcrd:hover {
          border-color: rgba(255, 183, 3, 0.28);
          transform: translateY(-3px);
        }
        .ps-pcrd-name {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 26px;
          font-weight: 700;
          color: #F6E5C6;
          margin-bottom: 5px;
        }
        .ps-pcrd-sub {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          color: #FFB703;
          text-transform: uppercase;
          margin-bottom: 18px;
        }
        .ps-pcrd-body {
          font-size: 13.5px;
          line-height: 1.76;
          color: rgba(246, 229, 198, 0.6);
          margin-bottom: 20px;
        }
        .ps-tags { display: flex; flex-wrap: wrap; gap: 7px; }
        .ps-tag {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 9.5px;
          padding: 4px 10px;
          border-radius: 4px;
          background: rgba(246, 229, 198, 0.05);
          border: 1px solid rgba(246, 229, 198, 0.09);
          color: rgba(246, 229, 198, 0.6);
        }
        .ps-svc-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 48px;
        }
        .ps-svc {
          display: grid;
          grid-template-columns: 130px 1fr;
          gap: 28px;
          align-items: center;
          padding: 24px 28px;
          background: rgba(1, 56, 55, 0.55);
          border: 1px solid rgba(246, 229, 198, 0.09);
          border-radius: 12px;
          transition: border-color 0.3s;
        }
        .ps-svc:hover { border-color: rgba(255, 183, 3, 0.28); }
        @media (max-width: 600px) {
          .ps-svc { grid-template-columns: 1fr; gap: 8px; }
        }
        .ps-svc-lang {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          color: #FFB703;
          text-transform: uppercase;
          margin-bottom: 5px;
        }
        .ps-svc-name {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 17px;
          font-weight: 700;
          color: #F6E5C6;
          margin-bottom: 4px;
        }
        .ps-svc-desc {
          font-size: 13px;
          line-height: 1.65;
          color: rgba(246, 229, 198, 0.6);
        }
        .ps-tech-note {
          margin-top: 36px;
          padding-top: 24px;
          border-top: 1px solid rgba(246, 229, 198, 0.08);
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 11px;
          line-height: 1.7;
          color: rgba(246, 229, 198, 0.42);
          letter-spacing: 0.02em;
        }
        .ps-feature-card { position: relative; }
        .ps-feature-signals { margin-top: 16px; }
        .ps-card-badge {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 9.5px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #FFB703;
          background: rgba(255, 183, 3, 0.08);
          border: 1px solid rgba(255, 183, 3, 0.22);
          padding: 4px 10px;
          border-radius: 100px;
          display: inline-block;
          margin-bottom: 14px;
        }
        .ps-status-pill {
          display: inline-block;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 9.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(246, 229, 198, 0.85);
          background: rgba(255, 183, 3, 0.1);
          border: 1px solid rgba(255, 183, 3, 0.28);
          padding: 4px 10px;
          border-radius: 100px;
          margin: -6px 0 16px;
        }
        .ps-flow {
          display: flex;
          flex-wrap: wrap;
          align-items: stretch;
          gap: 10px;
          margin-top: 48px;
        }
        .ps-flow-item {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1 1 180px;
        }
        .ps-flow-step {
          flex: 1 1 auto;
          padding: 22px 22px 20px;
          background: rgba(1, 56, 55, 0.6);
          border: 1px solid rgba(246, 229, 198, 0.1);
          border-radius: 12px;
          transition: border-color 0.3s, transform 0.3s;
          min-width: 0;
        }
        .ps-flow-step:hover {
          border-color: rgba(255, 183, 3, 0.28);
          transform: translateY(-2px);
        }
        .ps-flow-step-n {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.18em;
          color: rgba(255, 183, 3, 0.65);
          margin-bottom: 8px;
        }
        .ps-flow-step-name {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 17px;
          font-weight: 700;
          color: #F6E5C6;
          margin-bottom: 4px;
        }
        .ps-flow-step-sub {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 11px;
          line-height: 1.55;
          color: rgba(246, 229, 198, 0.55);
        }
        .ps-flow-arrow {
          color: rgba(255, 183, 3, 0.55);
          font-size: 20px;
          line-height: 1;
          flex: 0 0 auto;
          padding: 0 2px;
          user-select: none;
        }
        .ps-rtl .ps-flow-arrow { transform: scaleX(-1); }
        .ps-stack-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 18px;
          margin-top: 48px;
        }
        .ps-stack-group {
          padding: 22px 22px 20px;
          background: rgba(1, 56, 55, 0.5);
          border: 1px solid rgba(246, 229, 198, 0.09);
          border-radius: 12px;
          transition: border-color 0.3s;
        }
        .ps-stack-group:hover { border-color: rgba(255, 183, 3, 0.22); }
        .ps-stack-group-label {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #FFB703;
          margin-bottom: 14px;
        }
        .ps-stack-group-items {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .ps-cta-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 14px;
          margin-top: 48px;
        }
        .ps-cta-card {
          position: relative;
          display: block;
          padding: 22px 24px;
          background: rgba(1, 56, 55, 0.6);
          border: 1px solid rgba(246, 229, 198, 0.1);
          border-radius: 12px;
          color: #F6E5C6;
          text-decoration: none;
          transition: border-color 0.3s, transform 0.3s, background 0.3s;
        }
        .ps-cta-card:hover {
          border-color: rgba(255, 183, 3, 0.4);
          background: rgba(1, 56, 55, 0.78);
          transform: translateY(-2px);
        }
        .ps-cta-card-label {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 16px;
          font-weight: 700;
          color: #F6E5C6;
          margin-bottom: 6px;
        }
        .ps-cta-card-sub {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 11px;
          color: rgba(246, 229, 198, 0.6);
          word-break: break-all;
        }
        .ps-cta-card-arrow {
          position: absolute;
          top: 18px;
          right: 20px;
          color: #FFB703;
          font-size: 16px;
          opacity: 0.7;
        }
        .ps-rtl .ps-cta-card-arrow { right: auto; left: 20px; transform: scaleX(-1); }
        @media (max-width: 767px) {
          .ps-flow { flex-direction: column; gap: 10px; margin-top: 32px; }
          .ps-flow-item { flex-direction: column; gap: 6px; align-items: stretch; }
          .ps-flow-arrow { transform: rotate(90deg); align-self: center; }
          .ps-rtl .ps-flow-arrow { transform: rotate(90deg); }
          .ps-stack-grid { grid-template-columns: 1fr; gap: 12px; margin-top: 32px; }
          .ps-cta-row { grid-template-columns: 1fr; gap: 12px; margin-top: 32px; }
        }
        .ps-prod-foot {
          padding: 44px clamp(20px, 6vw, 72px);
          border-top: 1px solid rgba(246, 229, 198, 0.09);
          background: rgba(1, 56, 55, 0.92);
          backdrop-filter: blur(20px);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ps-foot-wm {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 9.5px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(246, 229, 198, 0.28);
        }
        .ps-foot-link,
        .ps-hero-link {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(246, 229, 198, 0.55);
          text-decoration: none;
          border: 1px solid rgba(246, 229, 198, 0.18);
          padding: 6px 14px;
          border-radius: 4px;
          transition: color 0.2s, border-color 0.2s;
          align-self: flex-start;
        }
        .ps-foot-link:hover,
        .ps-hero-link:hover {
          color: rgba(246, 229, 198, 0.9);
          border-color: rgba(246, 229, 198, 0.45);
        }
        .ps-hero-link {
          pointer-events: auto;
          margin-top: 24px;
          opacity: 0;
          transform: translateY(10px);
          animation: psFadeUp 0.7s 0.8s ease forwards;
        }
        .ps-reveal {
          opacity: 0;
          transform: translateY(36px) perspective(700px) rotateX(5deg);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .ps-reveal.ps-vis { opacity: 1; transform: none; }
        .ps-rs > * {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .ps-rs.ps-vis > *:nth-child(1) { opacity: 1; transform: none; transition-delay: 0s; }
        .ps-rs.ps-vis > *:nth-child(2) { opacity: 1; transform: none; transition-delay: 0.1s; }
        .ps-rs.ps-vis > *:nth-child(3) { opacity: 1; transform: none; transition-delay: 0.2s; }
        .ps-rs.ps-vis > *:nth-child(4) { opacity: 1; transform: none; transition-delay: 0.3s; }
        .ps-rs.ps-vis > *:nth-child(5) { opacity: 1; transform: none; transition-delay: 0.4s; }
        .ps-rs.ps-vis > *:nth-child(6) { opacity: 1; transform: none; transition-delay: 0.5s; }
        @keyframes psFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes psPageFade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: none; }
        }
        .ps-mobile-shot-stack {
          position: relative;
          width: min(100%, 360px);
          height: clamp(360px, 122vw, 450px);
          margin: 10px auto 22px;
          pointer-events: none;
        }
        .ps-mobile-shot {
          position: absolute;
          display: block;
          height: auto;
          object-fit: cover;
          border: 1px solid rgba(246, 229, 198, 0.12);
          box-shadow: 0 22px 56px rgba(0, 0, 0, 0.5);
          background: #012e2d;
          animation: psMobileScreenFloat 4.8s ease-in-out infinite;
          transform: translate3d(0, 0, 0) rotate(var(--shot-tilt));
        }
        .ps-mobile-shot-pipeline {
          z-index: 1;
          top: 0;
          left: 4%;
          width: 92%;
          border-radius: 14px;
          --shot-tilt: -2deg;
          animation-delay: -0.6s;
        }
        .ps-mobile-shot-for-you,
        .ps-mobile-shot-news {
          top: 110px;
          width: 42%;
          border-radius: 18px;
        }
        .ps-mobile-shot-for-you {
          z-index: 2;
          left: 6%;
          --shot-tilt: -7deg;
          animation-delay: -1.4s;
        }
        .ps-mobile-shot-news {
          z-index: 3;
          right: 6%;
          --shot-tilt: 6deg;
          animation-delay: -2.2s;
        }
        .ps-mobile-shot-stack-silah {
          height: clamp(300px, 106vw, 360px);
        }
        .ps-mobile-shot-silah-dashboard {
          z-index: 1;
          top: 0;
          left: 4%;
          width: 92%;
          border-radius: 14px;
          --shot-tilt: -2deg;
          animation-delay: -0.4s;
        }
        .ps-mobile-shot-silah-studio,
        .ps-mobile-shot-silah-versions {
          top: 155px;
          width: 46%;
          border-radius: 12px;
        }
        .ps-mobile-shot-silah-studio {
          z-index: 2;
          left: 4%;
          --shot-tilt: -6deg;
          animation-delay: -1.1s;
        }
        .ps-mobile-shot-silah-versions {
          z-index: 3;
          right: 4%;
          --shot-tilt: 6deg;
          animation-delay: -1.8s;
        }
        @keyframes psMobileScreenFloat {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(var(--shot-tilt)); }
          50% { transform: translate3d(0, -10px, 0) rotate(var(--shot-tilt)); }
        }
        @media (max-width: 767px) {
          .ps-mobile .ps-page { animation: psPageFade 0.28s ease both; }
          .ps-mobile .ps-hero {
            min-height: auto;
            padding: 28px 20px 56px;
            gap: 18px;
            justify-content: flex-start;
            align-items: stretch;
            text-align: start;
          }
          .ps-mobile-mockup {
            display: block;
            margin: 8px auto 16px;
            border-radius: 26px;
            box-shadow: 0 22px 56px rgba(0, 0, 0, 0.48);
            border: 1px solid rgba(246, 229, 198, 0.08);
            background: #012e2d;
            max-width: 100%;
            height: auto;
          }
          .ps-mobile .ps-hero-title { font-size: clamp(40px, 12vw, 64px); margin-bottom: 18px; }
          .ps-mobile .ps-hero-sub { font-size: 14px; margin-bottom: 24px; }
          .ps-mobile .ps-csect { padding: 56px 20px; }
          .ps-mobile .ps-csect-gap { height: 36px; }
          .ps-mobile .ps-sect-title { font-size: clamp(26px, 7vw, 36px); }
          .ps-mobile .ps-sect-body { font-size: 14px; }
          .ps-mobile .ps-section-shot {
            margin-top: 28px;
            border-radius: 12px;
            box-shadow: 0 20px 44px rgba(0, 0, 0, 0.28);
          }
          .ps-mobile .ps-section-shot-phone {
            width: min(100%, 280px);
          }
          .ps-mobile .ps-stat-row { flex-wrap: wrap; margin-top: 32px; }
          .ps-mobile .ps-stat {
            flex: 1 1 50%;
            min-width: 0;
            padding: 22px 14px;
            border-right: 1px solid rgba(246, 229, 198, 0.09);
            border-bottom: 1px solid rgba(246, 229, 198, 0.09);
          }
          .ps-mobile .ps-stat:nth-child(2n) { border-right: none; }
          .ps-mobile .ps-stat:nth-last-child(-n+2) { border-bottom: none; }
          .ps-mobile .ps-stat-n { font-size: 38px; }
          .ps-mobile .ps-twocol { grid-template-columns: 1fr; gap: 16px; margin-top: 32px; }
          .ps-mobile .ps-cards { grid-template-columns: 1fr; gap: 14px; margin-top: 32px; }
          .ps-mobile .ps-pcrd { padding: 24px 22px; }
          .ps-mobile .ps-pcrd-name { font-size: 22px; }
          .ps-mobile .ps-svc { grid-template-columns: 1fr; gap: 8px; padding: 20px 20px; }
          .ps-mobile .ps-svc-list { margin-top: 32px; }
          .ps-mobile .ps-prod-foot { padding: 32px 20px; }
          .ps-mobile .ps-switcher-wrap { padding: 10px 0 4px; }
          .ps-mobile .ps-pill { font-size: 10px; padding: 7px 14px; }
        }
      `}</style>
    </div>
  );
}
