"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    num: "01",
    title: "OCP-PIXEL Platform",
    description:
      "Led end-to-end development of a production-ready microservices platform for soil intelligence and sustainable farming analytics. Built interactive dashboards with geospatial tools, REST APIs for vegetation indices, and async processing with Celery & Redis.",
    role: "Full-stack Developer (Intern)",
    year: "2025",
    stack: ["Next.js", "Django REST", "Docker", "Mapbox", "PostgreSQL"],
    accent: "#7c3aed",
    bg: "bg-[#7c3aed]/[0.06]",
    href: "https://pixelagri.com",
  },
  {
    num: "02",
    title: "ft_Pong",
    description:
      "A full-stack web application with a responsive frontend using Vanilla JavaScript and Bootstrap, and a robust backend using Django. Integrated OAuth 2.0 for secure authentication and Two-Factor Authentication for enhanced account security.",
    role: "Full-stack Development",
    year: "2024",
    stack: ["JavaScript", "Django", "PostgreSQL", "OAuth 2.0", "Bootstrap"],
    accent: "#0284c7",
    bg: "bg-[#0284c7]/[0.06]",
  },
  {
    num: "03",
    title: "OTMeal",
    description:
      "A recipes website built with React that integrates Themealdb and Spoonacular APIs. Features advanced search, personalized recommendations, and a random recipe generator — all wrapped in a responsive, modern UI.",
    role: "Frontend Development",
    year: "2024",
    stack: ["React", "Themealdb API", "Spoonacular API", "Vite"],
    accent: "#059669",
    bg: "bg-[#059669]/[0.06]",
  },
  {
    num: "04",
    title: "Inception",
    description:
      "A multi-service infrastructure with NGINX, WordPress, and MariaDB, each running in dedicated Docker containers. Automated restarts, Docker secrets, .env credential management, and TLSv1.2/TLSv1.3 encryption via NGINX.",
    role: "System Administration & DevOps",
    year: "2024",
    stack: ["Docker", "Docker Compose", "NGINX", "MariaDB", "WordPress"],
    accent: "#f59e0b",
    bg: "bg-[#f59e0b]/[0.06]",
  },
];

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const cards = gsap.utils.toArray<HTMLElement>(".hs-card", track);
    const totalScroll = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      const tween = gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Parallax the card images/accents
      cards.forEach((card) => {
        const inner = card.querySelector<HTMLElement>(".hs-card-inner");
        if (inner) {
          gsap.fromTo(
            inner,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        }
      });

      // Progress bar
      gsap.to(".hs-progress-fill", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="relative">
      {/* Header */}
      <div className="pointer-events-none absolute left-0 top-0 z-20 w-full px-6 pt-8 md:px-12">
        <div className="flex items-center justify-between">
          <p className="font-display text-sm uppercase tracking-[0.25em] text-zinc-500">
            Selected Work
          </p>
          <p className="text-xs tabular-nums text-zinc-500">
            {projects.length} projects
          </p>
        </div>
        <div className="mt-3 h-[2px] w-full overflow-hidden rounded-full bg-zinc-200">
          <div className="hs-progress-fill h-full origin-left scale-x-0 rounded-full bg-violet-500" />
        </div>
      </div>

      {/* Horizontal track */}
      <div ref={trackRef} className="flex h-screen items-center gap-8 pl-[8vw] pr-[6vw] pt-20">
        {projects.map((project) => (
          <article
            key={project.num}
            className={`hs-card flex h-[78vh] w-[82vw] flex-none flex-col justify-between overflow-hidden rounded-[2rem] border border-zinc-200 ${project.bg} backdrop-blur-sm p-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)] md:w-[44vw] md:p-10 lg:w-[36vw]`}
          >
            <div className="hs-card-inner">
              <div className="flex items-start justify-between">
                <span
                  className="font-display text-[5rem] leading-none md:text-[6.5rem]"
                  style={{ color: project.accent, opacity: 0.2 }}
                >
                  {project.num}
                </span>
                <span className="mt-2 rounded-full border border-zinc-300 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-zinc-500">
                  {project.year}
                </span>
              </div>

              <h3 className="mt-4 font-display text-3xl leading-tight text-zinc-900 md:text-4xl">
                {project.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-600 md:text-base">
                {project.description}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  {project.role}
                </p>
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-zinc-600 transition-colors hover:border-zinc-900 hover:text-zinc-900"
                    data-hover
                  >
                    Visit &rarr;
                  </a>
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full px-3 py-1 text-xs font-semibold text-zinc-700"
                    style={{ backgroundColor: `${project.accent}18` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}

        {/* End CTA card */}
        <div className="flex h-[78vh] w-[60vw] flex-none items-center justify-center rounded-[2rem] border border-dashed border-zinc-300 bg-zinc-50/50 md:w-[32vw]">
          <div className="text-center">
            <p className="font-display text-2xl text-zinc-900 md:text-3xl">
              More coming soon
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              Always building, always shipping.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
