"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextScramble from "@/components/TextScramble";
import MagneticButton from "@/components/MagneticButton";
import Marquee from "@/components/Marquee";
import HorizontalScroll from "@/components/HorizontalScroll";
import AuroraBackground from "@/components/AuroraBackground";
import TechStack from "@/components/TechStack";

/* ---------- data ---------- */
const stats = [
  { label: "Years of experience", value: 5, suffix: "+" },
  { label: "Projects delivered", value: 12, suffix: "+" },
  { label: "Freelance clients", value: 20, suffix: "+" },
  { label: "School peer projects", value: 30, suffix: "+" },
];

const socials = [
  { name: "GitHub", href: "https://github.com/otelliq" },
  { name: "LinkedIn", href: "https://linkedin.com/in/othmane-elliq" },
];

const marqueeItems = [
  "React",
  "Next.js",
  "Django",
  "TypeScript",
  "Docker",
  "PostgreSQL",
  "Tailwind",
  "REST APIs",
  "GSAP",
  "Git",
];

/* ---------- component ---------- */
export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      /* ---- Hero load-in ---- */
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".nav-item", { y: -20, opacity: 0, stagger: 0.07, duration: 0.6 })
        .from(".hero-name-char", { yPercent: 110, opacity: 0, duration: 1, stagger: 0.04, ease: "power4.out" }, 0.25)
        .from(".hero-tagline", { y: 30, opacity: 0, duration: 0.9 }, 0.6)
        .from(".hero-desc", { y: 24, opacity: 0, duration: 0.8 }, 0.75)
        .from(".hero-cta", { y: 20, opacity: 0, stagger: 0.1, duration: 0.6 }, 0.9)
        .from(".hero-social", { y: 20, opacity: 0, stagger: 0.06, duration: 0.5 }, 1.0)
        .from(".hero-stat", { y: 30, opacity: 0, stagger: 0.08, duration: 0.6 }, 1.1)
        .from(".hero-scroll-hint", { opacity: 0, duration: 0.8 }, 1.4);

      // Scroll hint bounce
      gsap.to(".hero-scroll-hint", {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "power1.inOut",
      });

      /* ---- Section reveals ---- */
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      /* ---- Stat counters ---- */
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = parseInt(el.dataset.target || "0", 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => { el.textContent = Math.round(obj.val).toString(); },
        });
      });

      /* ---- Parallax hero accent ---- */
      gsap.to(".hero-accent-ring", {
        yPercent: -30,
        rotation: 90,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const nameChars = "Othmane Elliq".split("");

  return (
    <div ref={pageRef} className="dot-bg relative">
      <AuroraBackground />

      {/* ========== NAV ========== */}
      <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between px-6 py-5 md:px-12">
        <span className="nav-item font-display text-sm font-bold tracking-[0.2em] text-zinc-900">
          OE.
        </span>
        <div className="flex items-center gap-8">
          {["Work", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="nav-item text-[0.7rem] font-medium uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-zinc-900"
              data-hover
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* ========== HERO ========== */}
      <section className="hero-section relative flex min-h-screen items-center px-6 md:px-12">
        {/* Decorative ring */}
        <div className="hero-accent-ring pointer-events-none absolute right-[-8%] top-[15%] h-[400px] w-[400px] rounded-full border border-zinc-900/[0.04] md:h-[600px] md:w-[600px]" />

        <div className="relative z-10 w-full max-w-6xl pt-28 pb-16">
          {/* Eyebrow scramble */}
          <div className="hero-tagline mb-5 flex items-center gap-3">
            <span className="h-[1px] w-8 bg-violet-500/60" />
            <TextScramble
              phrases={[
                "Software Engineer",
                "Full Stack Developer",
                "DevOps Practitioner",
                "UI/UX Designer",
              ]}
              className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-violet-600"
            />
          </div>

          {/* Name — big hero text */}
          <h1 className="font-display text-[clamp(3.5rem,12vw,10rem)] font-bold leading-[0.88] tracking-tight">
            <span className="block overflow-hidden">
              {nameChars.map((char, i) => (
                <span
                  key={i}
                  className="hero-name-char inline-block text-zinc-900"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </h1>

          {/* Description */}
          <p className="hero-desc mt-7 max-w-md text-sm leading-relaxed text-zinc-600 md:text-base">
            Full Stack Developer experienced in designing, deploying, and
            maintaining web applications with{" "}
            <span className="text-zinc-800">DevOps practices</span>. Adept
            with modern frameworks, databases, and server-side systems.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-4">
            <MagneticButton
              as="a"
              href="#work"
              className="hero-cta group inline-flex items-center gap-3 rounded-full bg-zinc-900 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.1em] text-white transition-transform"
            >
              View projects
              <span className="inline-block transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#contact"
              className="hero-cta inline-flex items-center rounded-full border border-zinc-300 px-7 py-3.5 text-sm font-medium uppercase tracking-[0.1em] text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900"
            >
              Contact me
            </MagneticButton>
          </div>

          {/* Socials row */}
          <div className="mt-10 flex gap-5">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                className="hero-social text-[0.65rem] font-medium uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-zinc-900"
                data-hover
              >
                {s.name}
              </a>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-y-6 border-t border-zinc-200 pt-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="hero-stat">
                <p className="font-display text-3xl font-bold text-zinc-900 md:text-4xl">
                  <span className="stat-num" data-target={s.value}>0</span>
                  {s.suffix}
                </p>
                <p className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-zinc-500">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[0.6rem] uppercase tracking-[0.25em] text-zinc-400">Scroll</span>
            <div className="h-8 w-[1px] bg-gradient-to-b from-zinc-400 to-transparent" />
          </div>
        </div>
      </section>

      {/* ========== MARQUEE ========== */}
      <div className="border-y border-zinc-200 py-5">
        <Marquee
          items={marqueeItems}
          className="font-display text-2xl font-bold uppercase tracking-[0.06em] text-zinc-900/[0.08] md:text-4xl"
          speed={50}
        />
      </div>

      {/* ========== HORIZONTAL SCROLL PROJECTS ========== */}
      <HorizontalScroll />

      {/* ========== ABOUT ========== */}
      <section id="about" className="mx-auto w-full max-w-6xl px-6 py-28 md:px-12">
        <div data-reveal className="grid gap-16 lg:grid-cols-2">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-violet-600">
              About
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] text-zinc-900 md:text-5xl">
              Building things
              <br />
              <span className="glow-text">that work &amp; scale.</span>
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-zinc-600 md:text-base">
              I combine creative direction with production-grade engineering.
              From microservices platforms and REST APIs to responsive frontends
              and containerized deployments — I focus on{" "}
              <span className="text-zinc-800">clean, efficient, and maintainable</span> code.
            </p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-600 md:text-base">
              Currently working on soil intelligence and sustainable farming
              analytics at OCP-PIXEL, building with Next.js, Django, Docker,
              and PostgreSQL.
            </p>

            {/* Experience timeline */}
            <div className="mt-10 space-y-5">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-violet-600">
                Experience
              </p>
              {[
                { role: "Full-stack Developer (Intern)", company: "OCP - PIXEL", period: "04/2025 — Present", type: "Remote" },
                { role: "Common Core Student", company: "1337 Coding School", period: "10/2022 — 02/2025", type: "Tetouan" },
                { role: "Freelance UI/UX Designer", company: "Fiverr", period: "06/2020 — 09/2022", type: "Remote" },
              ].map((exp) => (
                <div key={exp.company} className="rounded-2xl border border-zinc-200 bg-white/80 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">{exp.role}</p>
                      <p className="mt-0.5 text-[0.7rem] text-zinc-500">{exp.company} · {exp.type}</p>
                    </div>
                    <span className="shrink-0 rounded-full border border-zinc-200 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-wider text-zinc-400">
                      {exp.period}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-zinc-400">
                Tech Stack
              </p>
              <div className="mt-4">
                <TechStack />
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl border border-zinc-200 bg-white/80 p-5">
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  Education
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                  1337 Coding School (42 Network) — Intensive project-based
                  learning emphasizing peer-to-peer collaboration, low-level
                  programming (C/C++), algorithm optimization, and Unix systems.
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white/80 p-5">
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  Courses &amp; Certifications
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                  CS50: Introduction to Computer Science (Harvard / edX) ·
                  TryHackMe (Online Cybersecurity Platform)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECOND MARQUEE ========== */}
      <div className="border-y border-zinc-200 py-5">
        <Marquee
          items={["FULLSTACK", "DEVOPS", "REST APIs", "MICROSERVICES", "DOCKER", "REACT"]}
          className="font-display text-2xl font-bold uppercase tracking-[0.06em] text-zinc-900/[0.08] md:text-4xl"
          speed={40}
          reverse
        />
      </div>

      {/* ========== CONTACT ========== */}
      <section id="contact" className="mx-auto w-full max-w-6xl px-6 py-28 md:px-12">
        <div data-reveal>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-violet-600">
            Contact
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] text-zinc-900 md:text-6xl">
            Have a project?
            <br />
            <span className="glow-text">{"Let's"} work together.</span>
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-zinc-600 md:text-base">
            Whether it{"'"} a full-stack application, a microservices platform,
            or a polished frontend — I{"'"} always open to new challenges
            and collaborations.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <MagneticButton
              as="a"
              href="mailto:elliq.othmane@gmail.com"
              className="inline-flex items-center rounded-full bg-zinc-900 px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-white transition-transform"
            >
              elliq.othmane@gmail.com
            </MagneticButton>
            {socials.map((s) => (
              <MagneticButton
                key={s.name}
                as="a"
                href={s.href}
                className="inline-flex items-center rounded-full border border-zinc-300 px-6 py-4 text-sm font-medium uppercase tracking-[0.1em] text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900"
              >
                {s.name}
              </MagneticButton>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="border-t border-zinc-200 px-6 py-8 md:px-12">
        <div className="flex flex-col items-center justify-between gap-4 text-[0.65rem] uppercase tracking-[0.15em] text-zinc-500 md:flex-row">
          <span>&copy; {new Date().getFullYear()} Othmane Elliq — Designed &amp; built by me.</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Available for work
          </span>
        </div>
      </footer>
    </div>
  );
}