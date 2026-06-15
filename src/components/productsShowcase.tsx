"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useLocale } from "@/lib/localeContext";
import StarField from "@/components/starField";

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

/* ── Collapsible card: title only by default, click to reveal body ── */
function CollapsibleCard({ ttl, body, badge, signals }: { ttl: string; body: string; badge?: string; signals?: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`ps-card ${open ? "ps-open" : ""}`} onClick={() => setOpen(o => !o)}>
      <div className="ps-card-head">
        <div className="ps-card-ttl">{ttl}</div>
        <div className="ps-card-plus" aria-hidden />
      </div>
      <div className="ps-card-detail">
        <div>
          {badge && <div className="ps-card-badge">{badge}</div>}
          <div className="ps-card-body">{body}</div>
          {signals && signals.length > 0 && (
            <div className="ps-signals">{signals.map((s, j) => <span key={j} className="ps-tag">{s}</span>)}</div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Collapsible service row: lang + name, click to reveal description ── */
function CollapsibleSvc({ lang, name, desc }: { lang: string; name: string; desc: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`ps-svc ${open ? "ps-open" : ""}`} onClick={() => setOpen(o => !o)}>
      <div className="ps-svc-head">
        <div className="ps-svc-lang">{lang}</div>
        <div className="ps-svc-name">{name}</div>
        <div className="ps-card-plus" aria-hidden />
      </div>
      <div className="ps-svc-detail">
        <div><div className="ps-svc-desc">{desc}</div></div>
      </div>
    </div>
  );
}

/* ── In-hero stack group: label + arrow, click to reveal chips ── */
function StackGroupInline({ label, items }: { label: string; items: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`ps-stack-group-inline ${open ? "ps-open" : ""}`} onClick={() => setOpen(o => !o)}>
      <span className="ps-stack-group-inline-label">{label}</span>
      {items.map((it, i) => <span key={i} className="ps-chip-sm">{it}</span>)}
      <span className="ps-stack-count" aria-hidden />
    </div>
  );
}

/* ── Tabs: one panel at a time ── */
function Tabs({ tabs }: { tabs: { label: string; ttl: string; body: string; signals?: string[] }[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="ps-tab-set">
      <div className="ps-tab-strip">
        {tabs.map((tb, i) => (
          <button
            key={i}
            className={`ps-tab-btn ${active === i ? "ps-active" : ""}`}
            data-n={String(i + 1).padStart(2, "0")}
            onClick={() => setActive(i)}
          >
            {tb.label}
          </button>
        ))}
      </div>
      {tabs.map((tb, i) => (
        <div key={i} className={`ps-tab-panel ${active === i ? "ps-active" : ""}`}>
          <div className="ps-tab-panel-ttl">{tb.ttl}</div>
          <div className="ps-tab-panel-body">{tb.body}</div>
          {tb.signals && tb.signals.length > 0 && (
            <div className="ps-signals">{tb.signals.map((s, j) => <span key={j} className="ps-tag">{s}</span>)}</div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Numbered problem row: reveal on hover, click to pin (touch) ── */
function ProbItem({ n, ttl, body }: { n: number; ttl: string; body: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`ps-prob ${open ? "ps-open" : ""}`} onClick={() => setOpen(o => !o)}>
      <div className="ps-prob-n">{String(n).padStart(2, "0")}</div>
      <div className="ps-prob-body">
        <div className="ps-prob-t">{ttl}</div>
        <div className="ps-prob-desc">{body}</div>
      </div>
    </div>
  );
}

/* ── Featured showcase: one big card + selector list ── */
function Showcase({ cards }: { cards: { ttl: string; body: string; badge?: string; shortBadge?: string }[] }) {
  const [active, setActive] = useState(0);
  const f = cards[active];
  return (
    <div className="ps-showcase">
      <div className="ps-showcase-featured" key={active}>
        {f.badge && <div className="ps-showcase-featured-badge">{f.badge}</div>}
        <div className="ps-showcase-featured-t">{f.ttl}</div>
        <div className="ps-showcase-featured-body">{f.body}</div>
      </div>
      <div className="ps-showcase-list">
        {cards.map((c, i) => (
          <div
            key={i}
            className={`ps-showcase-item ${active === i ? "ps-active" : ""}`}
            onClick={() => setActive(i)}
          >
            <span className="ps-showcase-item-dot" aria-hidden />
            <span className="ps-showcase-item-t">{c.ttl}</span>
            {c.shortBadge && <span className="ps-showcase-item-badge">{c.shortBadge}</span>}
          </div>
        ))}
      </div>
    </div>
  );
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
      {!isMobile && (
        <>
          <canvas ref={canvasRef} className="ps-canvas" />
          <StarField
            count={120}
            opacity={0.35}
            size={0.04}
            driftSpeed={0.0004}
            className="ps-canvas"
          />
        </>
      )}

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
            <div className="ps-hero-row">
              <a className="ps-hero-link" href={ps.wahb.footLink} target="_blank" rel="noopener noreferrer">
                Visit ↗
              </a>
              {ps.wahb.stackGroups.map((g, i) => (
                <StackGroupInline key={i} label={g.label} items={g.items} />
              ))}
            </div>
            {!isMobile && (
              <div className="ps-scroll-hint">
                <span>{ps.scrollHint}</span>
                <div className="ps-scroll-arrow" />
              </div>
            )}
          </div>

          <div className="ps-csect-gap" />

          {/* AT A GLANCE */}
          <section className="ps-csect">
            <div className="ps-csect-head ps-reveal">
              <div className="ps-sect-label">{ps.wahb.atGlanceLabel}</div>
              <h2 className="ps-sect-title">{ps.wahb.atGlanceTitle}</h2>
              <p className="ps-sect-body">{ps.wahb.atGlanceBody}</p>
            </div>
            <div className="ps-csect-body ps-reveal">
              <div className="ps-stat-strip">
                {ps.wahb.stats.map((s, i) => (
                  <div key={i} className="ps-stat"><div className="ps-stat-n">{s.n}</div><div className="ps-stat-l">{s.l}</div></div>
                ))}
              </div>
              <div className="ps-inline-shot">
                <img src={WAHB_ARCHITECTURE_SCREEN.src} alt={WAHB_ARCHITECTURE_SCREEN.alt} loading="lazy" />
              </div>
            </div>
          </section>

          {/* SURFACES */}
          <section className="ps-csect ps-csect-alt">
            <div className="ps-csect-head ps-reveal">
              <div className="ps-sect-label">{ps.wahb.portalsLabel}</div>
              <h2 className="ps-sect-title">{ps.wahb.portalsTitle}</h2>
            </div>
            <div className="ps-csect-body ps-grid ps-grid-2 ps-rs">
              <div className="ps-pcrd ps-pcrd-feature">
                <div className="ps-pcrd-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="5" y="2" width="14" height="20" rx="2.5" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                </div>
                <div className="ps-pcrd-name">{ps.wahb.portalConsumerName}</div>
                <div className="ps-pcrd-sub">{ps.wahb.portalConsumerSub}</div>
                <div className="ps-pcrd-body">{ps.wahb.portalConsumerBody}</div>
              </div>
              <div className="ps-pcrd ps-pcrd-feature">
                <div className="ps-pcrd-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="3" y="4" width="18" height="14" rx="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="9" x2="9" y2="18" />
                  </svg>
                </div>
                <div className="ps-pcrd-name">{ps.wahb.portalAdminName}</div>
                <div className="ps-pcrd-sub">{ps.wahb.portalAdminSub}</div>
                <div className="ps-pcrd-body">{ps.wahb.portalAdminBody}</div>
              </div>
            </div>
          </section>

          {/* ARCHITECTURE — services + ingestion flow (merged) */}
          <section className="ps-csect">
            <div className="ps-csect-head ps-reveal">
              <div className="ps-sect-label">{ps.wahb.backendLabel}</div>
              <h2 className="ps-sect-title">{ps.wahb.backendTitle}</h2>
              <p className="ps-sect-body">{ps.wahb.backendBody}</p>
            </div>
            <div className="ps-csect-body ps-reveal">
              <div className="ps-svc-list">
                {ps.wahb.services.map((s, i) => (
                  <CollapsibleSvc key={i} lang={s.lang} name={s.name} desc={s.desc} />
                ))}
              </div>
              <div className="ps-subsect-head">
                <span className="ps-subsect-label">{ps.wahb.flowLabel}</span>
                <span className="ps-subsect-hint">{ps.wahb.flowHint}</span>
              </div>
              <div className="ps-flow-rail">
                {ps.wahb.pipelineSteps.map((s, i) => (
                  <div key={i} className="ps-flow-card">
                    <div className="ps-flow-n">{String(i + 1).padStart(2, "0")}</div>
                    <div className="ps-flow-name">{s.step}</div>
                    <div className="ps-flow-sub">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PRODUCT SURFACE — tabs */}
          <section className="ps-csect ps-csect-alt">
            <div className="ps-csect-head ps-reveal">
              <div className="ps-sect-label">{ps.wahb.featuresLabel}</div>
              <h2 className="ps-sect-title">{ps.wahb.featuresTitle}</h2>
              <p className="ps-sect-body">{ps.wahb.featuresBody}</p>
            </div>
            <div className="ps-csect-body ps-reveal">
              <Tabs
                tabs={ps.wahb.featureCards.map((c, i) => ({
                  label: ps.wahb.featuresTabs[i] ?? c.ttl,
                  ttl: c.ttl,
                  body: c.body,
                  signals: c.signals,
                }))}
              />
            </div>
          </section>

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

          {/* PLATFORM + AUDIENCE (merged) */}
          <section className="ps-csect">
            <div className="ps-csect-head ps-reveal">
              <div className="ps-sect-label">{ps.silah.platformLabel}</div>
              <h2 className="ps-sect-title">{ps.silah.platformTitle}</h2>
              <p className="ps-sect-body">{ps.silah.platformBody}</p>
            </div>
            <div className="ps-csect-body ps-reveal">
              <div className="ps-stat-strip">
                {ps.silah.stats.map((s, i) => (
                  <div key={i} className="ps-stat"><div className="ps-stat-n">{s.n}</div><div className="ps-stat-l">{s.l}</div></div>
                ))}
              </div>
              <div className="ps-subsect-head">
                <span className="ps-subsect-label">{ps.silah.audienceSubLabel}</span>
                <span className="ps-subsect-hint">{ps.silah.audienceSubHint}</span>
              </div>
              <Tabs
                tabs={ps.silah.audienceCards.map((c, i) => ({
                  label: ps.silah.audienceTabs[i] ?? c.ttl,
                  ttl: c.ttl,
                  body: c.body,
                }))}
              />
            </div>
          </section>

          {/* CHALLENGE + WALKTHROUGH (merged: problem → process) */}
          <section className="ps-csect ps-csect-alt">
            <div className="ps-csect-head ps-reveal">
              <div className="ps-sect-label">{ps.silah.challengeLabel}</div>
              <h2 className="ps-sect-title">{ps.silah.challengeTitle}</h2>
              <p className="ps-sect-body">{ps.silah.challengeBody}</p>
            </div>
            <div className="ps-csect-body ps-reveal">
              <div className="ps-problist">
                {ps.silah.challengeCards.map((c, i) => (
                  <ProbItem key={i} n={i + 1} ttl={c.ttl} body={c.body} />
                ))}
              </div>
              <div className="ps-subsect-head">
                <span className="ps-subsect-label">{ps.silah.walkthroughSubLabel}</span>
                <span className="ps-subsect-hint">{ps.silah.walkthroughSubHint}</span>
              </div>
              <div className="ps-timeline">
                {ps.silah.walkthroughSteps.map((s, i) => (
                  <div key={i} className="ps-tl-step">
                    <div className="ps-tl-n">{String(i + 1).padStart(2, "0")}</div>
                    <div className="ps-tl-t">{s.step}</div>
                    <div className="ps-tl-d">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CAPABILITIES — collapsible cards */}
          <section className="ps-csect">
            <div className="ps-csect-head ps-reveal">
              <div className="ps-sect-label">{ps.silah.capabilitiesLabel}</div>
              <h2 className="ps-sect-title">{ps.silah.capabilitiesTitle}</h2>
            </div>
            <div className="ps-csect-body ps-grid ps-grid-3 ps-rs">
              {ps.silah.capabilitiesCards.map((c, i) => (
                <CollapsibleCard key={i} ttl={c.ttl} body={c.body} />
              ))}
            </div>
          </section>

          {/* AI — featured showcase */}
          <section className="ps-csect ps-csect-alt">
            <div className="ps-csect-head ps-reveal">
              <div className="ps-sect-label">{ps.silah.aiLabel}</div>
              <h2 className="ps-sect-title">{ps.silah.aiTitle}</h2>
              <p className="ps-sect-body">{ps.silah.aiBody}</p>
            </div>
            <div className="ps-csect-body ps-reveal">
              <Showcase cards={ps.silah.aiCards} />
            </div>
          </section>

          <div className="ps-prod-foot ps-reveal">
            <span className="ps-foot-wm">{ps.silah.footWm}</span>
            <a className="ps-foot-link" href={ps.silah.footLink} target="_blank" rel="noopener noreferrer">
              Visit ↗
            </a>
          </div>
        </div>
      )}

      <style jsx global>{`
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

        /* ════════════════════════════════════════════════════
           COMPACT LAYOUT (design refresh) — overrides + new
        ════════════════════════════════════════════════════ */
        .ps-hero-title {
          font-size: clamp(46px, 7vw, 96px);
          margin-bottom: 20px;
        }
        .ps-hero-sub { margin-bottom: 32px; }

        /* In-hero stack row beside Visit */
        .ps-hero-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          margin-top: 20px;
          pointer-events: auto;
          max-width: 760px;
          opacity: 0;
          transform: translateY(10px);
          animation: psFadeUp 0.7s 0.75s ease forwards;
        }
        .ps-hero-row .ps-hero-link {
          margin-top: 0;
          opacity: 1;
          transform: none;
          animation: none;
          align-self: center;
        }
        .ps-stack-group-inline {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px;
          padding: 5px 10px;
          background: rgba(1, 56, 55, 0.55);
          border: 1px solid rgba(246, 229, 198, 0.09);
          border-radius: 8px;
          cursor: pointer;
          user-select: none;
          transition: border-color 0.25s, background 0.25s;
        }
        .ps-stack-group-inline:hover { border-color: rgba(255, 183, 3, 0.28); background: rgba(1, 56, 55, 0.7); }
        .ps-stack-group-inline.ps-open { border-color: rgba(255, 183, 3, 0.28); }
        .ps-stack-group-inline-label {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 9px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #FFB703;
          padding-right: 5px;
          border-right: 1px solid rgba(246, 229, 198, 0.09);
          margin-right: 2px;
        }
        .ps-rtl .ps-stack-group-inline-label {
          padding-right: 0; padding-left: 5px;
          border-right: none; border-left: 1px solid rgba(246, 229, 198, 0.09);
          margin-right: 0; margin-left: 2px;
        }
        .ps-stack-group-inline:not(.ps-open) .ps-chip-sm { display: none; }
        .ps-chip-sm {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 9px;
          letter-spacing: 0.05em;
          padding: 2px 6px;
          border-radius: 3px;
          border: 1px solid rgba(246, 229, 198, 0.12);
          color: #F6E5C6;
          background: rgba(246, 229, 198, 0.04);
          animation: psChipFade 0.3s ease;
        }
        @keyframes psChipFade { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: none; } }
        .ps-stack-count {
          width: 14px;
          height: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid rgba(255, 183, 3, 0.4);
          color: #FFB703;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), background 0.25s;
        }
        .ps-stack-count::before {
          content: "";
          width: 5px;
          height: 5px;
          border-right: 1.4px solid currentColor;
          border-bottom: 1.4px solid currentColor;
          transform: rotate(-45deg) translate(-1px, 0);
          display: inline-block;
        }
        .ps-stack-group-inline.ps-open .ps-stack-count::before { transform: rotate(-135deg) translate(0, -1px); }
        .ps-stack-group-inline:hover .ps-stack-count { background: rgba(255, 183, 3, 0.12); }

        /* Side-label compact section */
        .ps-csect {
          padding: 48px clamp(20px, 6vw, 72px);
          display: grid;
          grid-template-columns: minmax(220px, 1.1fr) minmax(0, 2.5fr);
          gap: 48px;
          align-items: start;
        }
        .ps-csect-gap { height: 32px; }
        .ps-csect-head { position: sticky; top: 64px; align-self: start; }
        .ps-csect-body { min-width: 0; }
        .ps-sect-label { margin-bottom: 10px; }
        .ps-sect-title {
          font-size: clamp(22px, 2.4vw, 32px);
          line-height: 1.12;
          margin-bottom: 12px;
          max-width: none;
        }
        .ps-sect-body { font-size: 13.5px; line-height: 1.7; max-width: none; }

        /* Compact stat strip */
        .ps-stat-strip {
          display: flex;
          flex-wrap: wrap;
          border: 1px solid rgba(246, 229, 198, 0.09);
          border-radius: 10px;
          overflow: hidden;
        }
        .ps-stat-strip .ps-stat {
          flex: 1;
          min-width: 100px;
          padding: 18px 16px;
        }
        .ps-stat-strip .ps-stat-n { font-size: 28px; margin-bottom: 6px; }
        .ps-stat-strip .ps-stat-l { font-size: 9px; letter-spacing: 0.14em; }

        /* Inline shot */
        .ps-inline-shot {
          margin-top: 18px;
          border: 1px solid rgba(246, 229, 198, 0.1);
          border-radius: 10px;
          overflow: hidden;
          background: rgba(1, 56, 55, 0.45);
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.28);
        }
        .ps-inline-shot img { display: block; width: 100%; height: auto; }

        /* Compact grids */
        .ps-grid { display: grid; gap: 8px; }
        .ps-grid-2 { grid-template-columns: repeat(2, 1fr); }
        .ps-grid-3 { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 900px) {
          .ps-grid-2, .ps-grid-3 { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 540px) {
          .ps-grid-2, .ps-grid-3 { grid-template-columns: 1fr; }
        }

        /* Collapsible cards */
        .ps-card {
          padding: 14px 16px;
          background: rgba(1, 56, 55, 0.65);
          border-radius: 10px;
          position: relative;
          cursor: pointer;
          user-select: none;
          transition: border-color 0.25s, transform 0.25s, background 0.25s;
        }
        .ps-card:hover { border-color: rgba(255, 183, 3, 0.28); background: rgba(1, 56, 55, 0.78); transform: none; }
        .ps-card.ps-open { border-color: rgba(255, 183, 3, 0.28); background: rgba(1, 56, 55, 0.85); }
        .ps-card-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .ps-card-ttl { font-size: 14.5px; line-height: 1.25; margin-bottom: 0; flex: 1; min-width: 0; }
        .ps-card-plus {
          flex-shrink: 0;
          width: 16px;
          height: 16px;
          position: relative;
          opacity: 0.55;
          transition: opacity 0.25s, transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .ps-card:hover .ps-card-plus, .ps-svc:hover .ps-card-plus { opacity: 0.9; }
        .ps-card-plus::before, .ps-card-plus::after {
          content: "";
          position: absolute;
          background: #FFB703;
          top: 50%;
          left: 50%;
          border-radius: 1px;
          transform: translate(-50%, -50%);
        }
        .ps-card-plus::before { width: 10px; height: 1.5px; }
        .ps-card-plus::after { width: 1.5px; height: 10px; transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1); }
        .ps-card.ps-open .ps-card-plus, .ps-svc.ps-open .ps-card-plus { transform: rotate(180deg); opacity: 1; }
        .ps-card.ps-open .ps-card-plus::after, .ps-svc.ps-open .ps-card-plus::after { transform: translate(-50%, -50%) scaleY(0); }
        .ps-card-detail {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1), margin-top 0.4s ease, opacity 0.3s ease;
          opacity: 0;
          margin-top: 0;
        }
        .ps-card-detail > div { overflow: hidden; }
        .ps-card.ps-open .ps-card-detail { grid-template-rows: 1fr; opacity: 1; margin-top: 9px; }
        .ps-card .ps-card-body { font-size: 12px; line-height: 1.55; }
        .ps-card-badge { font-size: 8.5px; margin-bottom: 8px; }
        .ps-signals { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 10px; }
        .ps-signals .ps-tag { font-size: 9px; padding: 3px 8px; }

        /* Feature portal cards */
        .ps-pcrd-feature {
          padding: 24px 24px 22px;
          background: linear-gradient(180deg, rgba(1, 56, 55, 0.7) 0%, rgba(1, 56, 55, 0.55) 100%);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          border-radius: 12px;
        }
        .ps-pcrd-feature::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #FFB703, transparent);
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .ps-pcrd-feature:hover::before { opacity: 1; }
        .ps-pcrd-icon {
          width: 40px;
          height: 40px;
          border-radius: 9px;
          background: rgba(255, 183, 3, 0.1);
          border: 1px solid rgba(255, 183, 3, 0.22);
          color: #FFB703;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
          transition: background 0.25s, border-color 0.25s, transform 0.35s ease;
        }
        .ps-pcrd-feature:hover .ps-pcrd-icon { background: rgba(255, 183, 3, 0.18); border-color: rgba(255, 183, 3, 0.45); transform: translateY(-2px); }
        .ps-pcrd-feature .ps-pcrd-name { font-size: 20px; margin-bottom: 5px; }
        .ps-pcrd-feature .ps-pcrd-sub { font-size: 9.5px; margin-bottom: 14px; color: rgba(246, 229, 198, 0.45); }
        .ps-pcrd-feature .ps-pcrd-body { font-size: 13px; line-height: 1.7; margin-bottom: 0; }

        /* Collapsible service rows */
        .ps-svc-list { display: flex; flex-direction: column; gap: 5px; margin-top: 0; }
        .ps-svc {
          display: block;
          padding: 12px 18px;
          background: rgba(1, 56, 55, 0.55);
          border-radius: 8px;
          cursor: pointer;
          user-select: none;
          transition: border-color 0.25s, background 0.25s;
        }
        .ps-svc:hover { border-color: rgba(255, 183, 3, 0.28); background: rgba(1, 56, 55, 0.68); }
        .ps-svc.ps-open { border-color: rgba(255, 183, 3, 0.28); background: rgba(1, 56, 55, 0.78); }
        .ps-svc-head { display: grid; grid-template-columns: 110px 1fr auto; gap: 18px; align-items: center; }
        @media (max-width: 600px) { .ps-svc-head { grid-template-columns: 1fr auto; gap: 4px; } }
        .ps-svc-lang { margin-bottom: 0; }
        .ps-svc-name { font-size: 14px; margin-bottom: 0; }
        .ps-svc-detail {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1), margin-top 0.4s ease, opacity 0.3s ease;
          opacity: 0;
          margin-top: 0;
        }
        .ps-svc-detail > div { overflow: hidden; }
        .ps-svc.ps-open .ps-svc-detail { grid-template-rows: 1fr; opacity: 1; margin-top: 8px; }
        .ps-svc-desc { font-size: 11.5px; line-height: 1.6; }
        @media (min-width: 600px) { .ps-svc.ps-open .ps-svc-desc { padding-left: 128px; } }
        .ps-rtl .ps-svc.ps-open .ps-svc-desc { padding-left: 0; }
        @media (min-width: 600px) { .ps-rtl .ps-svc.ps-open .ps-svc-desc { padding-right: 128px; padding-left: 0; } }

        /* Subsection header inside merged sections */
        .ps-subsect-head {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px dashed rgba(246, 229, 198, 0.14);
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }
        .ps-subsect-label {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 9.5px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #FFB703;
        }
        .ps-subsect-hint {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 10px;
          line-height: 1.5;
          color: rgba(246, 229, 198, 0.5);
        }

        /* Horizontal flow rail */
        .ps-flow-rail {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 6px;
          scroll-snap-type: x mandatory;
        }
        .ps-flow-card {
          flex: 1 0 200px;
          min-width: 200px;
          scroll-snap-align: start;
          padding: 14px 16px;
          background: rgba(1, 56, 55, 0.6);
          border: 1px solid rgba(246, 229, 198, 0.1);
          border-radius: 9px;
          position: relative;
          transition: border-color 0.25s, transform 0.25s;
        }
        .ps-flow-card:hover { border-color: rgba(255, 183, 3, 0.28); transform: translateY(-2px); }
        .ps-flow-card:not(:last-child)::after {
          content: "→";
          position: absolute;
          right: -12px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 183, 3, 0.55);
          font-size: 14px;
          z-index: 2;
        }
        .ps-rtl .ps-flow-card:not(:last-child)::after { content: "←"; right: auto; left: -12px; }
        @media (max-width: 900px) { .ps-flow-card:not(:last-child)::after { display: none; } }
        .ps-flow-n { font-family: var(--font-jetbrains-mono), monospace; font-size: 9px; letter-spacing: 0.18em; color: rgba(255, 183, 3, 0.65); margin-bottom: 5px; }
        .ps-flow-name { font-family: var(--font-playfair), Georgia, serif; font-size: 13.5px; font-weight: 700; color: #F6E5C6; margin-bottom: 3px; line-height: 1.2; }
        .ps-flow-sub { font-family: var(--font-jetbrains-mono), monospace; font-size: 10px; line-height: 1.45; color: rgba(246, 229, 198, 0.55); }

        /* Tabs */
        .ps-tab-set { position: relative; }
        .ps-tab-strip { display: flex; gap: 0; flex-wrap: wrap; border-bottom: 1px solid rgba(246, 229, 198, 0.09); margin-bottom: 18px; }
        .ps-tab-btn {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 11px 16px;
          background: none;
          border: none;
          color: rgba(246, 229, 198, 0.5);
          cursor: pointer;
          border-bottom: 2px solid transparent;
          margin-bottom: -1px;
          transition: color 0.25s, border-color 0.25s;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ps-tab-btn::before { content: attr(data-n); font-size: 9px; color: rgba(255, 183, 3, 0.45); letter-spacing: 0.15em; }
        .ps-tab-btn:hover { color: #F6E5C6; }
        .ps-tab-btn.ps-active { color: #FFB703; border-color: #FFB703; }
        .ps-tab-btn.ps-active::before { color: #FFB703; }
        .ps-tab-panel { display: none; animation: psTabFade 0.35s ease; }
        .ps-tab-panel.ps-active { display: block; }
        @keyframes psTabFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .ps-tab-panel-ttl { font-family: var(--font-playfair), Georgia, serif; font-size: 20px; font-weight: 700; color: #F6E5C6; margin-bottom: 10px; line-height: 1.25; }
        .ps-tab-panel-body { font-size: 13.5px; line-height: 1.7; color: rgba(246, 229, 198, 0.6); margin-bottom: 14px; max-width: 62ch; }

        /* Numbered problem list */
        .ps-problist { display: flex; flex-direction: column; border-top: 1px solid rgba(246, 229, 198, 0.09); }
        .ps-prob {
          display: grid;
          grid-template-columns: 60px 1fr;
          gap: 24px;
          padding: 18px 4px;
          border-bottom: 1px solid rgba(246, 229, 198, 0.09);
          cursor: default;
        }
        .ps-prob-n { font-family: var(--font-playfair), Georgia, serif; font-size: 36px; font-weight: 700; line-height: 1; color: rgba(255, 183, 3, 0.28); transition: color 0.3s, transform 0.3s; }
        .ps-prob:hover .ps-prob-n, .ps-prob.ps-open .ps-prob-n { color: #FFB703; transform: translateX(4px); }
        .ps-rtl .ps-prob:hover .ps-prob-n, .ps-rtl .ps-prob.ps-open .ps-prob-n { transform: translateX(-4px); }
        .ps-prob-body { min-width: 0; display: flex; flex-direction: column; justify-content: center; }
        .ps-prob-t { font-family: var(--font-playfair), Georgia, serif; font-size: 16px; font-weight: 700; color: #F6E5C6; line-height: 1.25; }
        .ps-prob-desc {
          font-size: 12.5px;
          line-height: 1.65;
          color: rgba(246, 229, 198, 0.6);
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.35s ease, opacity 0.3s ease, margin-top 0.3s ease;
          margin-top: 0;
        }
        .ps-prob:hover .ps-prob-desc, .ps-prob.ps-open .ps-prob-desc { max-height: 200px; opacity: 1; margin-top: 6px; }

        /* Vertical timeline */
        .ps-timeline { position: relative; padding-left: 36px; display: flex; flex-direction: column; gap: 18px; }
        .ps-rtl .ps-timeline { padding-left: 0; padding-right: 36px; }
        .ps-timeline::before {
          content: "";
          position: absolute;
          left: 11px;
          top: 8px;
          bottom: 8px;
          width: 1px;
          background: linear-gradient(to bottom, #FFB703 0%, rgba(255, 183, 3, 0.15) 100%);
        }
        .ps-rtl .ps-timeline::before { left: auto; right: 11px; }
        .ps-tl-step { position: relative; padding-left: 2px; }
        .ps-tl-step::before {
          content: "";
          position: absolute;
          left: -30px;
          top: 5px;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #FFB703;
          box-shadow: 0 0 0 4px rgba(1, 56, 55, 0.9), 0 0 0 5px rgba(255, 183, 3, 0.18);
        }
        .ps-rtl .ps-tl-step::before { left: auto; right: -30px; }
        .ps-tl-n { font-family: var(--font-jetbrains-mono), monospace; font-size: 9px; letter-spacing: 0.2em; color: rgba(255, 183, 3, 0.65); margin-bottom: 4px; }
        .ps-tl-t { font-family: var(--font-playfair), Georgia, serif; font-size: 16px; font-weight: 700; color: #F6E5C6; margin-bottom: 4px; line-height: 1.25; }
        .ps-tl-d { font-family: var(--font-jetbrains-mono), monospace; font-size: 11px; line-height: 1.55; color: rgba(246, 229, 198, 0.55); }

        /* Featured showcase */
        .ps-showcase { display: grid; grid-template-columns: 1.4fr 1fr; gap: 12px; align-items: stretch; }
        @media (max-width: 800px) { .ps-showcase { grid-template-columns: 1fr; } }
        .ps-showcase-featured {
          position: relative;
          padding: 24px 26px;
          background: rgba(1, 56, 55, 0.78);
          border: 1px solid rgba(255, 183, 3, 0.28);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          min-height: 200px;
          animation: psTabFade 0.35s ease;
        }
        .ps-showcase-featured-badge {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #FFB703;
          background: rgba(255, 183, 3, 0.1);
          border: 1px solid rgba(255, 183, 3, 0.3);
          padding: 4px 10px;
          border-radius: 100px;
          display: inline-block;
          margin-bottom: 14px;
          align-self: flex-start;
        }
        .ps-showcase-featured-t { font-family: var(--font-playfair), Georgia, serif; font-size: 22px; font-weight: 700; color: #F6E5C6; margin-bottom: 12px; line-height: 1.2; }
        .ps-showcase-featured-body { font-size: 13.5px; line-height: 1.7; color: rgba(246, 229, 198, 0.6); }
        .ps-showcase-list { display: flex; flex-direction: column; gap: 6px; }
        .ps-showcase-item {
          padding: 12px 14px;
          background: rgba(1, 56, 55, 0.5);
          border: 1px solid rgba(246, 229, 198, 0.09);
          border-radius: 8px;
          cursor: pointer;
          transition: border-color 0.25s, background 0.25s, transform 0.25s;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ps-showcase-item:hover { border-color: rgba(255, 183, 3, 0.28); background: rgba(1, 56, 55, 0.7); transform: translateX(3px); }
        .ps-rtl .ps-showcase-item:hover { transform: translateX(-3px); }
        .ps-showcase-item.ps-active { border-color: #FFB703; background: rgba(255, 183, 3, 0.06); }
        .ps-showcase-item-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255, 183, 3, 0.3); flex-shrink: 0; transition: background 0.25s, box-shadow 0.25s; }
        .ps-showcase-item.ps-active .ps-showcase-item-dot { background: #FFB703; box-shadow: 0 0 0 3px rgba(255, 183, 3, 0.18); }
        .ps-showcase-item-t { font-family: var(--font-playfair), Georgia, serif; font-size: 13px; font-weight: 700; color: #F6E5C6; line-height: 1.2; flex: 1; }
        .ps-showcase-item-badge { font-family: var(--font-jetbrains-mono), monospace; font-size: 8px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255, 183, 3, 0.55); white-space: nowrap; }

        /* Stagger up to 7 children */
        .ps-rs.ps-vis > *:nth-child(7) { opacity: 1; transform: none; transition-delay: 0.6s; }

        /* Compact layout responsive */
        @media (max-width: 900px) {
          .ps-csect { grid-template-columns: 1fr; gap: 24px; padding: 42px clamp(20px, 6vw, 40px); }
          .ps-csect-head { position: static; }
        }
        @media (max-width: 767px) {
          .ps-mobile .ps-csect { padding: 40px 20px; gap: 20px; }
          .ps-mobile .ps-stat-strip .ps-stat { min-width: 80px; padding: 14px 10px; }
          .ps-mobile .ps-stat-strip .ps-stat-n { font-size: 24px; }
          .ps-mobile .ps-showcase { grid-template-columns: 1fr; }
          .ps-mobile .ps-prob { grid-template-columns: 44px 1fr; gap: 16px; }
          .ps-mobile .ps-hero-row { margin-top: 16px; }
        }
      `}</style>
    </div>
  );
}
