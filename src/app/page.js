
"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const PROFILE = {
  name: "Farrel",
  fullName: "Asyam Farrel Dzakwan",
  role: "Student Developer",
  location: "Indonesia",
  email: "farrelanakpintar@gmail.com",
  github: "https://github.com/Farel886",
  image: "/images/Farrel.png",
};

const PROJECTS = [
  {
    id: "earth-jukebox",
    number: "01",
    title: "Earth Jukebox",
    category: "Data Experience",
    year: "2026",
    status: "In development",
    symbol: "◉",
    description:
      "An interactive experience that transforms Earth data into sound, connecting environmental information with creative data sonification.",
    tags: ["Earth Data", "Sonification", "Next.js", "NASA"],
    stack: ["JavaScript", "Next.js", "Web Audio concepts"],
    gradient: "earth",
  },
  {
    id: "farrel-ai",
    number: "02",
    title: "Farrel AI",
    category: "Artificial Intelligence",
    year: "2026",
    status: "Personal project",
    symbol: "✳",
    description:
      "A personal AI interface exploring conversational experiences, modern web design, and practical AI-powered digital tools.",
    tags: ["AI", "JavaScript", "Next.js", "Gemini API"],
    stack: ["JavaScript", "Next.js", "API integration"],
    gradient: "ai",
  },
  {
    id: "smartvision-ai",
    number: "03",
    title: "SmartVision AI",
    category: "Computer Vision",
    year: "2025–2026",
    status: "Experiment",
    symbol: "⌘",
    description:
      "A computer vision experiment using a webcam to detect everyday objects and provide spoken feedback.",
    tags: ["Python", "YOLO", "OpenCV", "AI"],
    stack: ["Python", "YOLOv8", "OpenCV", "pyttsx3"],
    gradient: "vision",
  },
];

const SKILLS = [
  {
    number: "01",
    title: "Development",
    description: "Building interactive digital experiences.",
    items: ["HTML & CSS", "JavaScript", "Next.js", "Responsive Design"],
  },
  {
    number: "02",
    title: "Programming",
    description: "Learning through practical experiments.",
    items: ["Python", "Object Detection", "OpenCV", "API Integration"],
  },
  {
    number: "03",
    title: "Exploration",
    description: "Technologies I want to understand deeply.",
    items: [
      "Artificial Intelligence",
      "Computer Vision",
      "Data Sonification",
      "Creative Technology",
    ],
  },
];

const FILTERS = [
  "All",
  "Data Experience",
  "Artificial Intelligence",
  "Computer Vision",
];

const NAVIGATION = [
  ["About", "about"],
  ["Work", "work"],
  ["Toolkit", "toolkit"],
  ["Contact", "contact"],
];

function Arrow({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M14 5h5v5m0-5-9 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SectionLabel({ number, children, muted }) {
  return (
    <div className={`section-label ${muted ? "muted" : ""}`}>
      <span>{number}</span>
      <span className="label-line" />
      <span>{children}</span>
    </div>
  );
}

function ProjectCard({ project, dark, onOpen, index }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className={`project-card ${dark ? "card-dark" : ""}`}
      style={{ "--card-index": index }}
    >
      <div className={`project-art art-${project.gradient}`}>
        <div className="art-grid" />
        <div className="art-orbit orbit-one" />
        <div className="art-orbit orbit-two" />
        <div className="art-orbit orbit-three" />
        <div className="art-symbol">{project.symbol}</div>
        <div className="art-index">{project.number} / 03</div>
        <div className="art-status">
          <span className="status-dot" />
          {project.status}
        </div>
        <span className="art-year">{project.year}</span>
      </div>

      <div className="project-content">
        <div className="project-category">
          <span>{project.category}</span>
          <Arrow className="project-arrow" />
        </div>

        <h3>{project.title}</h3>

        <p>{project.description}</p>

        <div className="tag-list">
          {project.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

export default function Home() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [toast, setToast] = useState("");
  const [localTime, setLocalTime] = useState("--:--");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    try {
      setDark(window.localStorage.getItem("farrel-theme") === "dark");
    } catch {
      // Use the default theme if browser storage is unavailable.
    }

    const timer = window.setTimeout(() => setLoaded(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("farrel-theme", dark ? "dark" : "light");
    } catch {
      // The theme still works for the current session.
    }
  }, [dark]);

  useEffect(() => {
    const updateClock = () => {
      setLocalTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    };

    updateClock();
    const timer = window.setInterval(updateClock, 30000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateScroll = () => {
      const height =
        document.documentElement.scrollHeight - window.innerHeight;

      setScrollProgress(
        height > 0 ? (window.scrollY / height) * 100 : 0
      );

      setShowTopButton(window.scrollY > 500);
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });

    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    if (!toast) return undefined;

    const timer = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((current) => !current);
      }

      if (event.key === "Escape") {
        setPaletteOpen(false);
        setSelectedProject(null);
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px 0px" }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [loaded]);

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return PROJECTS.filter((project) => {
      const categoryMatch =
        activeFilter === "All" || project.category === activeFilter;

      const allText = [
        project.title,
        project.category,
        project.description,
        ...project.tags,
        ...project.stack,
      ]
        .join(" ")
        .toLowerCase();

      return categoryMatch && (!query || allText.includes(query));
    });
  }, [activeFilter, search]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setMenuOpen(false);
    setPaletteOpen(false);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setToast("Email copied to clipboard");
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  const openGitHub = () => {
    window.open(PROFILE.github, "_blank", "noopener,noreferrer");
    setPaletteOpen(false);
  };

  const toggleTheme = () => {
    setDark((current) => !current);
  };

  return (
    <main
      id="top"
      className={`portfolio ${dark ? "theme-dark" : "theme-light"} ${
        loaded ? "page-loaded" : ""
      }`}
    >
      <style jsx global>{`
        :root {
          scroll-behavior: smooth;
          scroll-padding-top: 90px;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
        }

        * {
          box-sizing: border-box;
        }

        button,
        input {
          font: inherit;
        }

        button {
          -webkit-tap-highlight-color: transparent;
        }

        ::selection {
          color: #fff;
          background: #5267df;
        }

        .portfolio {
          --bg: #fafafa;
          --surface: #ffffff;
          --surface-alt: #f3f4f6;
          --fg: #171717;
          --muted: #737373;
          --line: #e5e5e5;
          --accent: #6276e8;
          --accent-soft: rgba(98, 118, 232, 0.11);
          --nav-bg: rgba(250, 250, 250, 0.82);
          background: var(--bg);
          color: var(--fg);
          min-height: 100vh;
          overflow: clip;
          font-family: Arial, Helvetica, sans-serif;
          transition: background-color 0.35s ease, color 0.35s ease;
        }

        .theme-dark {
          --bg: #09090b;
          --surface: #111113;
          --surface-alt: #18181b;
          --fg: #f5f5f5;
          --muted: #a1a1aa;
          --line: #27272a;
          --accent: #91a0ff;
          --accent-soft: rgba(145, 160, 255, 0.12);
          --nav-bg: rgba(9, 9, 11, 0.84);
        }

        .portfolio button {
          color: inherit;
        }

        .portfolio button:focus-visible,
        .portfolio input:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 4px;
        }

        .scroll-progress {
          position: fixed;
          z-index: 120;
          inset: 0 auto auto 0;
          height: 2px;
          width: var(--progress);
          background: linear-gradient(90deg, #6378f2, #7be4db);
          box-shadow: 0 0 12px rgba(99, 120, 242, 0.45);
          transition: width 0.12s linear;
        }

        .ambient {
          position: absolute;
          z-index: 0;
          pointer-events: none;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.14;
          animation: ambientFloat 12s ease-in-out infinite alternate;
        }

        .ambient-a {
          width: 350px;
          height: 350px;
          top: 70px;
          right: -130px;
          background: #8b9cff;
        }

        .ambient-b {
          width: 270px;
          height: 270px;
          bottom: 0;
          left: -130px;
          background: #86e7dd;
          animation-delay: -4s;
        }

        .theme-dark .ambient {
          opacity: 0.17;
        }

        .site-header {
          position: sticky;
          top: 0;
          z-index: 70;
          border-bottom: 1px solid var(--line);
          background: var(--nav-bg);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: background 0.3s, border-color 0.3s;
        }

        .nav-inner {
          max-width: 1440px;
          min-height: 72px;
          margin: auto;
          padding: 0 5%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
        }

        .brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 0;
          background: transparent;
          cursor: pointer;
          font-size: 17px;
          font-weight: 700;
          letter-spacing: -0.7px;
        }

        .brand-mark {
          display: grid;
          width: 34px;
          height: 34px;
          place-items: center;
          border: 1px solid var(--line);
          border-radius: 10px;
          background: var(--surface);
          transition: transform 0.3s, border-color 0.3s;
        }

        .brand:hover .brand-mark {
          transform: rotate(-8deg) scale(1.05);
          border-color: var(--accent);
        }

        .brand-dot {
          color: var(--accent);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .nav-link {
          position: relative;
          padding: 10px 0;
          border: 0;
          background: transparent;
          color: var(--muted) !important;
          font-size: 12px;
          cursor: pointer;
          transition: color 0.25s;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          right: 0;
          bottom: 3px;
          left: 0;
          height: 1px;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }

        .nav-link:hover {
          color: var(--fg) !important;
        }

        .nav-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .icon-button {
          display: inline-flex;
          width: 38px;
          height: 38px;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--line);
          border-radius: 12px;
          background: var(--surface);
          cursor: pointer;
          transition: border-color 0.25s, transform 0.25s,
            background 0.25s;
        }

        .icon-button:hover {
          border-color: var(--accent);
          transform: translateY(-2px);
        }

        .shortcut {
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 7px 10px;
          color: var(--muted) !important;
          background: var(--surface);
          font-size: 11px;
          cursor: pointer;
        }

        .mobile-menu {
          display: none;
          border: 1px solid var(--line);
          border-radius: 10px;
          background: var(--surface);
          padding: 9px 11px;
          cursor: pointer;
        }

        .mobile-nav {
          display: grid;
          gap: 4px;
          border-top: 1px solid var(--line);
          padding: 12px 5% 18px;
          animation: dropIn 0.25s ease both;
        }

        .mobile-nav button {
          border: 0;
          background: transparent;
          text-align: left;
          padding: 13px 0;
          color: var(--muted);
          cursor: pointer;
        }

        .hero {
          position: relative;
          isolation: isolate;
          max-width: 1440px;
          min-height: min(790px, calc(100vh - 72px));
          margin: auto;
          padding: 110px 5% 95px;
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(290px, 0.75fr);
          align-items: center;
          gap: 9%;
        }

        .hero-copy,
        .hero-portrait {
          position: relative;
          z-index: 1;
        }

        .hero-copy {
          animation: heroIn 0.85s 0.12s both;
        }

        .hero-portrait {
          animation: portraitIn 1s 0.3s both;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 9px 12px;
          border: 1px solid var(--line);
          border-radius: 999px;
          color: var(--muted);
          background: var(--surface);
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .pulse-dot {
          position: relative;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #38b77a;
        }

        .pulse-dot::after {
          content: "";
          position: absolute;
          inset: -4px;
          border: 1px solid #38b77a;
          border-radius: 50%;
          animation: pulseRing 2s ease-out infinite;
        }

        .hero-intro {
          margin: 31px 0 15px;
          color: var(--muted);
          font-size: 13px;
          animation: fadeUp 0.7s 0.25s both;
        }

        .hero-title {
          max-width: 780px;
          margin: 0;
          font-size: clamp(58px, 8.1vw, 112px);
          font-weight: 500;
          line-height: 0.98;
          letter-spacing: -0.085em;
        }

        .hero-line {
          display: block;
          overflow: hidden;
          padding: 0 0.04em 0.08em;
        }

        .hero-line span {
          display: inline-block;
          animation: titleReveal 0.9s cubic-bezier(0.2, 0.75, 0.25, 1)
            both;
        }

        .hero-line:nth-child(2) span {
          animation-delay: 0.18s;
        }

        .gradient-text {
          color: var(--muted);
          background: linear-gradient(
            100deg,
            var(--muted) 5%,
            var(--accent) 50%,
            #62cfc1 90%
          );
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% auto;
          animation: gradientFlow 8s ease infinite;
        }

        .hero-description {
          max-width: 510px;
          margin: 25px 0 0;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.95;
          animation: fadeUp 0.8s 0.5s both;
        }

        .button-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 31px;
          animation: fadeUp 0.8s 0.6s both;
        }

        .button-primary,
        .button-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          min-height: 47px;
          padding: 0 19px;
          border: 1px solid var(--line);
          border-radius: 11px;
          font-size: 12px;
          cursor: pointer;
          transition: transform 0.25s, box-shadow 0.25s,
            border-color 0.25s, background 0.25s;
        }

        .button-primary {
          border-color: var(--fg);
          background: var(--fg);
          color: var(--bg) !important;
        }

        .button-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 9px 28px rgba(100, 100, 100, 0.16);
        }

        .button-primary svg {
          transition: transform 0.25s;
        }

        .button-primary:hover svg {
          transform: translateX(4px);
        }

        .button-secondary {
          background: var(--surface);
        }

        .button-secondary:hover {
          transform: translateY(-3px);
          border-color: var(--accent);
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          max-width: 540px;
          margin-top: 54px;
          padding-top: 21px;
          border-top: 1px solid var(--line);
          animation: fadeUp 0.8s 0.7s both;
        }

        .stat-number {
          font-size: 21px;
          font-weight: 500;
          letter-spacing: -0.05em;
        }

        .stat-label {
          margin-top: 7px;
          color: var(--muted);
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .portrait-frame {
          position: relative;
          max-width: 370px;
          margin: auto;
          padding: 10px;
          border: 1px solid var(--line);
          border-radius: 18px;
          background: var(--surface);
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.05);
          transition: transform 0.4s, box-shadow 0.4s;
        }

        .portrait-frame:hover {
          transform: translateY(-7px) rotate(0.4deg);
          box-shadow: 0 32px 90px rgba(98, 118, 232, 0.13);
        }

        .portrait-frame::before {
          content: "";
          position: absolute;
          z-index: -1;
          inset: -12px;
          border: 1px solid var(--accent);
          border-radius: 24px;
          opacity: 0.2;
          transform: rotate(3deg);
          transition: transform 0.4s;
        }

        .portrait-frame:hover::before {
          transform: rotate(-1deg);
        }

        .portrait-image {
          position: relative;
          overflow: hidden;
          aspect-ratio: 2 / 3;
          border-radius: 11px;
          background: var(--surface-alt);
        }

        .portrait-image img {
          transition: transform 0.8s cubic-bezier(0.2, 0.7, 0.3, 1);
        }

        .portrait-frame:hover .portrait-image img {
          transform: scale(1.035);
        }

        .portrait-overlay {
          position: absolute;
          inset: auto 0 0;
          padding: 55px 18px 18px;
          color: white;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.78));
        }

        .portrait-name {
          font-size: 20px;
          font-weight: 500;
          letter-spacing: -0.04em;
        }

        .portrait-role {
          margin-top: 5px;
          color: rgba(255, 255, 255, 0.72);
          font-size: 11px;
        }

        .portrait-caption {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          padding: 15px 4px 4px;
          color: var(--muted);
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .hero-decoration {
          position: absolute;
          z-index: -1;
          right: 3%;
          top: 20%;
          color: var(--accent);
          font-size: 19px;
          opacity: 0.7;
          animation: spinSlow 20s linear infinite;
        }

        .process-strip {
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          background: var(--surface);
        }

        .process-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 18px;
          max-width: 1440px;
          margin: auto;
          padding: 24px 5%;
          color: var(--muted);
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .process-arrow {
          color: var(--accent);
        }

        .section {
          max-width: 1440px;
          margin: auto;
          padding: 115px 5%;
          scroll-margin-top: 75px;
        }

        .section-alt {
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          background: var(--surface-alt);
        }

        .section-label {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 37px;
          color: var(--muted);
          font-size: 10px;
          letter-spacing: 0.19em;
          text-transform: uppercase;
        }

        .label-line {
          width: 32px;
          height: 1px;
          background: var(--muted);
          opacity: 0.6;
        }

        .section-heading {
          margin: 0;
          font-size: clamp(35px, 5vw, 62px);
          font-weight: 500;
          line-height: 1.08;
          letter-spacing: -0.065em;
        }

        .muted {
          color: var(--muted);
        }

        .about-grid {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 10%;
        }

        .about-copy {
          max-width: 670px;
          color: var(--muted);
          font-size: 14px;
          line-height: 2;
        }

        .about-copy p {
          margin: 0 0 20px;
        }

        .text-link {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-top: 12px;
          padding: 0 0 8px;
          border: 0;
          border-bottom: 1px solid var(--line);
          background: transparent;
          font-size: 12px;
          cursor: pointer;
          transition: gap 0.25s, border-color 0.25s;
        }

        .text-link:hover {
          gap: 17px;
          border-color: var(--accent);
        }

        .work-heading {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 25px;
          margin-bottom: 38px;
        }

        .work-subtitle {
          max-width: 470px;
          margin: 18px 0 0;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.9;
        }

        .project-count {
          flex-shrink: 0;
          color: var(--muted);
          font-size: 11px;
        }

        .project-controls {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 26px;
        }

        .search-box {
          width: 100%;
          max-width: 420px;
          min-height: 45px;
          padding: 0 14px;
          border: 1px solid var(--line);
          border-radius: 10px;
          background: var(--surface);
          color: var(--fg);
          font-size: 12px;
          transition: border-color 0.25s, box-shadow 0.25s;
        }

        .search-box::placeholder {
          color: var(--muted);
          opacity: 0.8;
        }

        .search-box:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--accent-soft);
          outline: none;
        }

        .filter-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .filter-button {
          border: 1px solid var(--line);
          border-radius: 9px;
          padding: 10px 13px;
          background: var(--surface);
          color: var(--muted) !important;
          font-size: 10px;
          cursor: pointer;
          transition: color 0.2s, background 0.2s, border-color 0.2s,
            transform 0.2s;
        }

        .filter-button:hover {
          transform: translateY(-1px);
          border-color: var(--accent);
        }

        .filter-button.active {
          border-color: var(--fg);
          background: var(--fg);
          color: var(--bg) !important;
        }

        .project-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          align-items: stretch;
          gap: 20px;
        }

        .project-card {
          min-width: 0;
          padding: 0;
          overflow: hidden;
          border: 1px solid var(--line);
          border-radius: 15px;
          background: var(--surface);
          color: var(--fg);
          text-align: left;
          cursor: pointer;
          animation: fadeUp 0.65s both;
          animation-delay: calc(var(--card-index) * 0.1s);
          transition: transform 0.35s cubic-bezier(0.2, 0.7, 0.3, 1),
            border-color 0.3s, box-shadow 0.35s;
        }

        .project-card:hover {
          transform: translateY(-7px);
          border-color: rgba(98, 118, 232, 0.55);
          box-shadow: 0 20px 55px rgba(30, 30, 50, 0.08);
        }

        .theme-dark .project-card:hover {
          box-shadow: 0 20px 55px rgba(0, 0, 0, 0.35),
            0 0 28px rgba(98, 118, 232, 0.08);
        }

        .project-art {
          position: relative;
          display: grid;
          min-height: 235px;
          place-items: center;
          overflow: hidden;
          isolation: isolate;
        }

        .art-earth {
          background: linear-gradient(135deg, #d8f1ff, #dce3ff 55%, #f7f9ff);
          color: #355eaa;
        }

        .art-ai {
          background: linear-gradient(135deg, #e5ddff, #f1e8ff 55%, #fff5fc);
          color: #7454c5;
        }

        .art-vision {
          background: linear-gradient(135deg, #d6f5e9, #d9f0f6 55%, #f5fffc);
          color: #217b73;
        }

        .theme-dark .art-earth {
          background: linear-gradient(135deg, #122e48, #1a2349 60%, #15151d);
          color: #9dcaff;
        }

        .theme-dark .art-ai {
          background: linear-gradient(135deg, #30214e, #292044 60%, #17141f);
          color: #c7b5ff;
        }

        .theme-dark .art-vision {
          background: linear-gradient(135deg, #123d37, #14333c 60%, #141c22);
          color: #a3f2d7;
        }

        .art-grid {
          position: absolute;
          z-index: -1;
          inset: 0;
          opacity: 0.22;
          background-image: linear-gradient(currentColor 1px, transparent 1px),
            linear-gradient(90deg, currentColor 1px, transparent 1px);
          background-size: 29px 29px;
          mask-image: linear-gradient(to bottom, black, transparent);
        }

        .art-orbit {
          position: absolute;
          width: 170px;
          height: 170px;
          border: 1px solid currentColor;
          border-radius: 50%;
          opacity: 0.35;
          transition: transform 0.65s cubic-bezier(0.2, 0.7, 0.3, 1);
        }

        .orbit-two {
          width: 225px;
          height: 225px;
          opacity: 0.2;
        }

        .orbit-three {
          width: 280px;
          height: 280px;
          opacity: 0.12;
        }

        .project-card:hover .orbit-one {
          transform: scale(1.12) rotate(20deg);
        }

        .project-card:hover .orbit-two {
          transform: scale(0.9) rotate(-15deg);
        }

        .project-card:hover .orbit-three {
          transform: scale(1.05);
        }

        .art-symbol {
          position: relative;
          z-index: 1;
          font-size: 72px;
          font-weight: 300;
          transition: transform 0.5s cubic-bezier(0.2, 0.7, 0.3, 1),
            text-shadow 0.5s;
        }

        .project-card:hover .art-symbol {
          transform: scale(1.12) rotate(-5deg);
          text-shadow: 0 0 35px currentColor;
        }

        .art-index,
        .art-status,
        .art-year {
          position: absolute;
          font-size: 9px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .art-index {
          top: 15px;
          left: 15px;
          opacity: 0.7;
        }

        .art-status {
          bottom: 15px;
          left: 15px;
          display: flex;
          align-items: center;
          gap: 7px;
          border: 1px solid currentColor;
          border-radius: 999px;
          padding: 7px 9px;
          background: rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(8px);
        }

        .status-dot {
          width: 5px;
          height: 5px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #38b77a;
        }

        .art-year {
          right: 15px;
          bottom: 21px;
          opacity: 0.7;
        }

        .project-content {
          padding: 22px;
        }

        .project-category {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          color: var(--muted);
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .project-arrow {
          transition: transform 0.25s, color 0.25s;
        }

        .project-card:hover .project-arrow {
          color: var(--accent);
          transform: translate(3px, -3px);
        }

        .project-content h3 {
          margin: 18px 0 10px;
          font-size: 23px;
          font-weight: 500;
          letter-spacing: -0.05em;
        }

        .project-content p {
          min-height: 92px;
          margin: 0;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.9;
        }

        .tag-list {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-top: 19px;
        }

        .tag {
          border: 1px solid var(--line);
          border-radius: 6px;
          padding: 6px 8px;
          color: var(--muted);
          font-size: 9px;
        }

        .empty-state {
          grid-column: 1 / -1;
          border: 1px dashed var(--line);
          border-radius: 14px;
          padding: 50px 20px;
          text-align: center;
          color: var(--muted);
          animation: fadeUp 0.35s both;
        }

        .repo-note {
          margin: 20px 0 0;
          color: var(--muted);
          font-size: 10px;
          line-height: 1.8;
        }

        .toolkit-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 17px;
          margin-top: 42px;
        }

        .skill-card {
          position: relative;
          overflow: hidden;
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 27px;
          background: var(--surface);
          transition: transform 0.35s, border-color 0.35s,
            box-shadow 0.35s;
        }

        .skill-card::after {
          content: "";
          position: absolute;
          right: -60px;
          top: -60px;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: var(--accent-soft);
          filter: blur(15px);
          transition: transform 0.4s;
        }

        .skill-card:hover {
          transform: translateY(-5px);
          border-color: rgba(98, 118, 232, 0.5);
          box-shadow: 0 16px 45px rgba(0, 0, 0, 0.04);
        }

        .skill-card:hover::after {
          transform: scale(1.7);
        }

        .skill-number {
          position: relative;
          z-index: 1;
          margin-bottom: 28px;
          color: var(--accent);
          font-size: 11px;
          letter-spacing: 0.1em;
        }

        .skill-card h3 {
          position: relative;
          z-index: 1;
          margin: 0;
          font-size: 20px;
          font-weight: 500;
          letter-spacing: -0.04em;
        }

        .skill-card > p {
          position: relative;
          z-index: 1;
          min-height: 42px;
          margin: 12px 0 20px;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.8;
        }

        .skill-divider {
          height: 1px;
          margin-bottom: 19px;
          background: var(--line);
        }

        .skill-items {
          position: relative;
          z-index: 1;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .skill-pill {
          border: 1px solid var(--line);
          border-radius: 7px;
          padding: 8px 10px;
          color: var(--muted);
          font-size: 10px;
          transition: border-color 0.2s, color 0.2s;
        }

        .skill-card:hover .skill-pill {
          border-color: rgba(98, 118, 232, 0.25);
        }

        .principles-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 25px;
          margin-top: 35px;
        }

        .principle-number {
          display: grid;
          width: 37px;
          height: 37px;
          place-items: center;
          margin-bottom: 22px;
          border: 1px solid var(--line);
          border-radius: 11px;
          color: var(--accent);
          font-size: 10px;
          transition: background 0.25s, transform 0.25s;
        }

        .principle:hover .principle-number {
          transform: rotate(-6deg);
          background: var(--accent-soft);
        }

        .principle h3 {
          margin: 0;
          font-size: 15px;
          font-weight: 500;
        }

        .principle p {
          max-width: 230px;
          margin-top: 10px;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.8;
        }

        .contact-section {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        .contact-glow {
          position: absolute;
          z-index: -1;
          top: 5%;
          right: -12%;
          width: 430px;
          height: 430px;
          border-radius: 50%;
          background: var(--accent-soft);
          filter: blur(75px);
          animation: ambientFloat 10s ease-in-out infinite alternate;
        }

        .contact-layout {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 40px;
        }

        .contact-kicker {
          margin: 0 0 22px;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.8;
        }

        .contact-heading {
          max-width: 850px;
          margin: 0;
          font-size: clamp(44px, 7vw, 86px);
          font-weight: 500;
          line-height: 1.04;
          letter-spacing: -0.075em;
        }

        .contact-actions {
          display: flex;
          flex-shrink: 0;
          flex-direction: column;
          align-items: flex-start;
          gap: 15px;
        }

        .footer {
          border-top: 1px solid var(--line);
        }

        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          max-width: 1440px;
          margin: auto;
          padding: 25px 5%;
          color: var(--muted);
          font-size: 10px;
        }

        .footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 19px;
        }

        .footer-links button {
          border: 0;
          background: transparent;
          color: var(--muted);
          cursor: pointer;
          transition: color 0.2s;
        }

        .footer-links button:hover {
          color: var(--fg);
        }

        .back-top {
          position: fixed;
          z-index: 50;
          right: 25px;
          bottom: 25px;
          display: grid;
          width: 43px;
          height: 43px;
          place-items: center;
          border: 1px solid var(--line);
          border-radius: 13px;
          background: var(--surface);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          cursor: pointer;
          animation: fadeUp 0.25s both;
          transition: transform 0.25s, border-color 0.25s;
        }

        .back-top:hover {
          transform: translateY(-4px);
          border-color: var(--accent);
        }

        .overlay {
          position: fixed;
          z-index: 100;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(0, 0, 0, 0.58);
          backdrop-filter: blur(9px);
          animation: overlayIn 0.2s both;
        }

        .dialog {
          width: 100%;
          max-width: 590px;
          max-height: 85vh;
          overflow-y: auto;
          border: 1px solid var(--line);
          border-radius: 18px;
          padding: 30px;
          background: var(--surface);
          color: var(--fg);
          box-shadow: 0 35px 100px rgba(0, 0, 0, 0.25);
          animation: dialogIn 0.3s cubic-bezier(0.2, 0.75, 0.25, 1) both;
        }

        .dialog-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
        }

        .dialog-kicker {
          margin-bottom: 12px;
          color: var(--muted);
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .dialog h2 {
          margin: 0;
          font-size: 31px;
          font-weight: 500;
          letter-spacing: -0.06em;
        }

        .dialog-description {
          margin-top: 23px;
          color: var(--muted);
          font-size: 13px;
          line-height: 2;
        }

        .dialog-divider {
          height: 1px;
          margin: 25px 0;
          background: var(--line);
        }

        .dialog h3 {
          margin: 0 0 14px;
          font-size: 13px;
          font-weight: 500;
        }

        .dialog-note {
          margin-top: 22px;
          color: var(--muted);
          font-size: 11px;
          line-height: 1.8;
        }

        .palette-overlay {
          align-items: flex-start;
          padding-top: min(17vh, 150px);
        }

        .palette-dialog {
          max-width: 500px;
          padding: 15px;
        }

        .palette-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 7px 5px 15px;
          border-bottom: 1px solid var(--line);
          color: var(--muted);
          font-size: 11px;
        }

        .palette-command {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          border: 0;
          border-radius: 8px;
          padding: 13px 10px;
          background: transparent;
          text-align: left;
          font-size: 12px;
          cursor: pointer;
          transition: background 0.2s, padding-left 0.2s;
        }

        .palette-command:hover {
          padding-left: 14px;
          background: var(--surface-alt);
        }

        .palette-footer {
          margin-top: 8px;
          padding: 14px 5px 2px;
          border-top: 1px solid var(--line);
          color: var(--muted);
          font-size: 10px;
        }

        .toast {
          position: fixed;
          z-index: 130;
          right: 24px;
          bottom: 25px;
          max-width: calc(100vw - 48px);
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 14px 17px;
          background: var(--surface);
          color: var(--fg);
          box-shadow: 0 12px 45px rgba(0, 0, 0, 0.15);
          font-size: 12px;
          animation: toastIn 0.3s both;
        }

        .reveal {
          opacity: 0;
          transform: translateY(23px);
          transition: opacity 0.75s ease, transform 0.75s
            cubic-bezier(0.2, 0.7, 0.3, 1);
        }

        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .reveal-delay-1 {
          transition-delay: 0.1s;
        }

        .reveal-delay-2 {
          transition-delay: 0.2s;
        }

        .reveal-delay-3 {
          transition-delay: 0.3s;
        }

        .page-loaded .hero-copy {
          opacity: 1;
        }

        @keyframes heroIn {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes portraitIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes titleReveal {
          from {
            opacity: 0;
            transform: translateY(110%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(17px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes overlayIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes dialogIn {
          from {
            opacity: 0;
            transform: translateY(13px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes toastIn {
          from {
            opacity: 0;
            transform: translateY(9px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dropIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulseRing {
          0% {
            transform: scale(0.65);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }

        @keyframes ambientFloat {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(22px, -25px, 0);
          }
        }

        @keyframes gradientFlow {
          0%,
          100% {
            background-position: 0% center;
          }
          50% {
            background-position: 100% center;
          }
        }

        @keyframes spinSlow {
          to {
            transform: rotate(360deg);
          }
        }

        @media (min-width: 1441px) {
          .hero,
          .section {
            padding-right: 72px;
            padding-left: 72px;
          }
        }

        @media (max-width: 1050px) {
          .hero {
            gap: 6%;
          }

          .project-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .toolkit-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .principles-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            row-gap: 30px;
          }

          .project-content p {
            min-height: auto;
          }
        }

        @media (max-width: 760px) {
          .nav-inner {
            min-height: 64px;
          }

          .nav-links,
          .shortcut {
            display: none;
          }

          .mobile-menu {
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          .hero {
            min-height: auto;
            grid-template-columns: 1fr;
            gap: 60px;
            padding-top: 75px;
            padding-bottom: 80px;
          }

          .hero-title {
            font-size: clamp(59px, 12vw, 88px);
          }

          .hero-portrait {
            width: min(100%, 360px);
            margin: auto;
          }

          .hero-decoration {
            top: 10%;
            right: 6%;
          }

          .section {
            padding-top: 83px;
            padding-bottom: 83px;
          }

          .about-grid {
            grid-template-columns: 1fr;
            gap: 25px;
          }

          .work-heading {
            align-items: flex-start;
            flex-direction: column;
          }

          .contact-layout {
            align-items: flex-start;
            flex-direction: column;
          }

          .contact-actions {
            align-items: flex-start;
          }

          .process-inner {
            justify-content: flex-start;
            gap: 14px;
          }

          .project-grid {
            gap: 14px;
          }

          .project-content {
            padding: 17px;
          }

          .project-art {
            min-height: 200px;
          }
        }

        @media (max-width: 520px) {
          .hero {
            padding-right: 6%;
            padding-left: 6%;
          }

          .hero-title {
            font-size: clamp(52px, 13vw, 68px);
          }

          .hero-description {
            font-size: 13px;
          }

          .hero-stats {
            gap: 8px;
          }

          .stat-number {
            font-size: 17px;
          }

          .stat-label {
            font-size: 8px;
            line-height: 1.6;
          }

          .section {
            padding-right: 6%;
            padding-left: 6%;
          }

          .project-grid,
          .toolkit-grid {
            grid-template-columns: 1fr;
          }

          .project-art {
            min-height: 230px;
          }

          .project-content {
            padding: 22px;
          }

          .project-content p {
            min-height: auto;
          }

          .principles-grid {
            grid-template-columns: 1fr 1fr;
            gap: 24px 15px;
          }

          .contact-heading {
            font-size: clamp(43px, 11vw, 62px);
          }

          .footer-inner {
            align-items: flex-start;
            flex-direction: column;
          }

          .dialog {
            padding: 22px;
          }

          .dialog h2 {
            font-size: 26px;
          }

          .back-top {
            right: 14px;
            bottom: 14px;
          }

          .toast {
            right: 12px;
            bottom: 12px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }

          .reveal {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <div
        className="scroll-progress"
        style={{ "--progress": `${scrollProgress}%` }}
      />

      <div className="ambient ambient-a" aria-hidden="true" />
      <div className="ambient ambient-b" aria-hidden="true" />

      <header className="site-header">
        <nav className="nav-inner" aria-label="Main navigation">
          <button
            type="button"
            className="brand"
            onClick={() => scrollTo("top")}
            aria-label="Farrel portfolio home"
          >
            <span className="brand-mark">
              F<span className="brand-dot">.</span>
            </span>
            <span>farrel.dev</span>
          </button>

          <div className="nav-links">
            {NAVIGATION.map(([label, id]) => (
              <button
                key={id}
                type="button"
                className="nav-link"
                onClick={() => scrollTo(id)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="nav-actions">
            <button
              type="button"
              className="shortcut"
              onClick={() => setPaletteOpen(true)}
              aria-label="Open quick actions"
              title="Command palette"
            >
              Ctrl K
            </button>

            <button
              type="button"
              className="icon-button"
              onClick={toggleTheme}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              title={dark ? "Light mode" : "Dark mode"}
            >
              {dark ? "☼" : "◐"}
            </button>

            <button
              type="button"
              className="mobile-menu"
              onClick={() => setMenuOpen((current) => !current)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="mobile-nav">
            {NAVIGATION.map(([label, id]) => (
              <button key={id} type="button" onClick={() => scrollTo(id)}>
                {label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setPaletteOpen(true);
              }}
            >
              Quick actions · Ctrl K
            </button>
          </div>
        )}
      </header>

      <section className="hero">
        <span className="hero-decoration" aria-hidden="true">
          ✳
        </span>

        <div className="hero-copy">
          <div className="eyebrow">
            <span className="pulse-dot" />
            Student developer · Indonesia
          </div>

          <p className="hero-intro">Hello, I&apos;m {PROFILE.fullName}.</p>

          <h1 className="hero-title">
            <span className="hero-line">
              <span>Ideas into</span>
            </span>
            <span className="hero-line">
              <span className="gradient-text">real things.</span>
            </span>
          </h1>

          <p className="hero-description">
            I explore programming, artificial intelligence, and creative
            technology — turning curiosity into experiments, projects, and
            useful digital experiences.
          </p>

          <div className="button-row">
            <button
              type="button"
              className="button-primary"
              onClick={() => scrollTo("work")}
            >
              Explore my work <Arrow />
            </button>

            <button
              type="button"
              className="button-secondary"
              onClick={copyEmail}
            >
              Copy email
            </button>
          </div>

          <div className="hero-stats">
            <div>
              <div className="stat-number">03</div>
              <div className="stat-label">Featured projects</div>
            </div>
            <div>
              <div className="stat-number">Python</div>
              <div className="stat-label">Learning journey</div>
            </div>
            <div>
              <div className="stat-number">{localTime}</div>
              <div className="stat-label">Jakarta time</div>
            </div>
          </div>
        </div>

        <div className="hero-portrait">
          <div className="portrait-frame">
            <div className="portrait-image">
              <Image
                src={PROFILE.image}
                alt={`Portrait of ${PROFILE.fullName}`}
                width={408}
                height={612}
                priority
                sizes="(max-width: 760px) 85vw, 370px"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div className="portrait-overlay">
                <div className="portrait-name">{PROFILE.name}</div>
                <div className="portrait-role">{PROFILE.role}</div>
              </div>
            </div>

            <div className="portrait-caption">
              <span>Curiosity in progress</span>
              <span>2026 ©</span>
            </div>
          </div>
        </div>
      </section>

      <div className="process-strip">
        <div className="process-inner">
          <span>Think</span>
          <span className="process-arrow">↗</span>
          <span>Build</span>
          <span className="process-arrow">↗</span>
          <span>Experiment</span>
          <span className="process-arrow">↗</span>
          <span>Learn</span>
          <span className="process-arrow">↗</span>
          <span>Repeat</span>
        </div>
      </div>

      <section id="about" className="section">
        <div className="reveal">
          <SectionLabel number="01">About me</SectionLabel>

          <div className="about-grid">
            <h2 className="section-heading">
              Learning by building,
              <br />
              one experiment at a time.
            </h2>

            <div className="about-copy">
              <p>
                I&apos;m Farrel, a student developer from Indonesia interested
                in how technology can solve problems and make complex ideas
                easier to understand.
              </p>
              <p>
                My projects help me learn beyond the classroom. I explore
                Python, web development, artificial intelligence, and computer
                vision by creating practical experiments and improving them
                step by step.
              </p>
              <p>
                I&apos;m still learning, and that is part of the process. My
                goal is to build a strong foundation, stay curious, and create
                technology that has a meaningful purpose.
              </p>

              <button
                type="button"
                className="text-link"
                onClick={() => scrollTo("contact")}
              >
                Let&apos;s connect <Arrow />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="section-alt">
        <div className="section reveal">
          <SectionLabel number="02">Selected work</SectionLabel>

          <div className="work-heading">
            <div>
              <h2 className="section-heading">
                Things I&apos;m
                <br />
                building.
              </h2>
              <p className="work-subtitle">
                Projects, experiments, and ideas in progress — each one a
                chance to learn something new.
              </p>
            </div>

            <div className="project-count">
              {String(filteredProjects.length).padStart(2, "0")} projects
            </div>
          </div>

          <div className="project-controls">
            <label className="sr-only" htmlFor="project-search">
              Search projects
            </label>
            <input
              id="project-search"
              className="search-box"
              type="search"
              placeholder="Search projects or technologies..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <div className="filter-list" aria-label="Filter projects">
              {FILTERS.map((filter) => (
                <button
                  type="button"
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`filter-button ${
                    activeFilter === filter ? "active" : ""
                  }`}
                  aria-pressed={activeFilter === filter}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="project-grid">
            {filteredProjects.length ? (
              filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  dark={dark}
                  index={index}
                  onOpen={setSelectedProject}
                />
              ))
            ) : (
              <div className="empty-state">
                <p>No matching projects found.</p>
                <button
                  type="button"
                  className="text-link"
                  onClick={() => {
                    setSearch("");
                    setActiveFilter("All");
                  }}
                >
                  Clear search and filters <Arrow />
                </button>
              </div>
            )}
          </div>

          <p className="repo-note">
            Project descriptions reflect current concepts and experiments.
            Repository links currently lead to my GitHub profile.
          </p>
        </div>
      </section>

      <section id="toolkit" className="section">
        <div className="reveal">
          <SectionLabel number="03">Toolkit</SectionLabel>

          <h2 className="section-heading">
            Tools I use.
            <br />
            <span className="muted">Skills I&apos;m growing.</span>
          </h2>

          <p className="work-subtitle">
            A snapshot of the technologies I&apos;m learning through practice,
            experimentation, and project building.
          </p>

          <div className="toolkit-grid">
            {SKILLS.map((group, index) => (
              <article
                key={group.number}
                className={`skill-card reveal reveal-delay-${index + 1}`}
              >
                <div className="skill-number">{group.number} / 03</div>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <div className="skill-divider" />
                <div className="skill-items">
                  {group.items.map((item) => (
                    <span className="skill-pill" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-alt">
        <div className="section reveal">
          <SectionLabel number="04">Principles</SectionLabel>

          <h2 className="section-heading">
            How I approach
            <br />
            the process.
          </h2>

          <div className="principles-grid">
            {[
              ["01", "Stay curious", "Ask questions and keep exploring."],
              ["02", "Build to learn", "Turn ideas into practical experiments."],
              ["03", "Keep it useful", "Focus on solving meaningful problems."],
              ["04", "Improve steadily", "Use feedback to get better over time."],
            ].map(([number, title, description], index) => (
              <article
                className={`principle reveal reveal-delay-${index + 1}`}
                key={number}
              >
                <div className="principle-number">{number}</div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="contact-glow" aria-hidden="true" />

        <div className="reveal">
          <SectionLabel number="05">Contact</SectionLabel>

          <div className="contact-layout">
            <div>
              <p className="contact-kicker">
                Have an idea, a question, or something to learn together?
              </p>

              <h2 className="contact-heading">
                Let&apos;s make
                <br />
                something meaningful.
              </h2>
            </div>

            <div className="contact-actions">
              <button
                type="button"
                className="button-primary"
                onClick={() => {
                  window.location.href = `mailto:${PROFILE.email}`;
                }}
              >
                Get in touch <Arrow />
              </button>

              <button
                type="button"
                className="text-link"
                onClick={openGitHub}
              >
                Explore GitHub <ExternalLinkIcon />
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <span>© 2026 Farrel. Built with curiosity.</span>

          <div className="footer-links">
            <button type="button" onClick={openGitHub}>
              GitHub ↗
            </button>
            <button type="button" onClick={copyEmail}>
              Email ↗
            </button>
            <button type="button" onClick={() => scrollTo("top")}>
              Back to top ↑
            </button>
          </div>
        </div>
      </footer>

      {showTopButton && (
        <button
          type="button"
          className="back-top"
          onClick={() => scrollTo("top")}
          aria-label="Back to top"
          title="Back to top"
        >
          ↑
        </button>
      )}

      {selectedProject && (
        <div
          className="overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedProject(null);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            className="dialog"
          >
            <div className="dialog-top">
              <div>
                <div className="dialog-kicker">
                  {selectedProject.category} · {selectedProject.year}
                </div>
                <h2 id="project-dialog-title">{selectedProject.title}</h2>
              </div>

              <button
                type="button"
                className="icon-button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
              >
                ✕
              </button>
            </div>

            <p className="dialog-description">
              {selectedProject.description}
            </p>

            <div className="dialog-divider" />

            <h3>Technology & concepts</h3>

            <div className="skill-items">
              {selectedProject.stack.map((item) => (
                <span className="skill-pill" key={item}>
                  {item}
                </span>
              ))}
            </div>

            <p className="dialog-note">
              This project is part of my ongoing learning process. Features
              and implementation may change as development continues.
            </p>

            <button
              type="button"
              className="button-primary"
              onClick={() => {
                setSelectedProject(null);
                openGitHub();
              }}
              style={{ marginTop: 20 }}
            >
              Visit GitHub profile <ExternalLinkIcon />
            </button>
          </section>
        </div>
      )}

      {paletteOpen && (
        <div
          className="overlay palette-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setPaletteOpen(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="palette-title"
            className="dialog palette-dialog"
          >
            <div className="palette-heading">
              <span id="palette-title">QUICK ACTIONS</span>
              <span>ESC TO CLOSE</span>
            </div>

            <div style={{ paddingTop: 9 }}>
              {[
                ["Go to About", () => scrollTo("about")],
                ["Explore projects", () => scrollTo("work")],
                ["View toolkit", () => scrollTo("toolkit")],
                ["Contact Farrel", () => scrollTo("contact")],
                [
                  "Copy email address",
                  async () => {
                    setPaletteOpen(false);
                    await copyEmail();
                  },
                ],
                ["Open GitHub profile", openGitHub],
                [
                  dark ? "Switch to light theme" : "Switch to dark theme",
                  () => {
                    toggleTheme();
                    setPaletteOpen(false);
                  },
                ],
              ].map(([label, action]) => (
                <button
                  type="button"
                  key={label}
                  className="palette-command"
                  onClick={action}
                >
                  <span>{label}</span>
                  <Arrow />
                </button>
              ))}
            </div>

            <div className="palette-footer">
              Tip: press Ctrl+K or Cmd+K to open this menu.
            </div>
          </section>
        </div>
      )}

      {toast && (
        <div className="toast" role="status">
          <span style={{ color: "#38b77a", marginRight: 9 }}>●</span>
          {toast}
        </div>
      )}
    </main>
  );
}
