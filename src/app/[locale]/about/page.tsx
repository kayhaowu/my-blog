import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import {
  Github,
  Linkedin,
  Globe,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  FolderOpen,
  Wrench,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { AboutData } from "@/data/about/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("label"),
    description:
      "Kay Wu — System Engineer at Edgecore Networks. Kubernetes, DevOps, Networking, and Cloud Infrastructure.",
    alternates: {
      languages: { en: "/en/about", "zh-Hant": "/zh-TW/about" },
    },
  };
}

/* ═══════════════════════════════════════════
   Social Links (locale-independent)
   ═══════════════════════════════════════════ */

const socialLinks = [
  { label: "Email", href: `mailto:${siteConfig.links.email}`, icon: Mail },
  { label: "GitHub", href: siteConfig.links.github, icon: Github },
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: Linkedin },
  { label: "Blog", href: siteConfig.url, icon: Globe },
];

/* ═══════════════════════════════════════════
   Page
   ═══════════════════════════════════════════ */

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");

  const data: AboutData =
    locale === "zh-TW"
      ? (await import("@/data/about/zh-TW")).default
      : (await import("@/data/about/en")).default;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      {/* ── Hero ── */}
      <header className="animate-fade-in-up">
        <p className="text-sm font-mono text-accent tracking-wide uppercase mb-4">
          {t("label")}
        </p>
        <h1 className="font-display text-5xl md:text-7xl tracking-tight">
          {data.heroName}
        </h1>
        {data.heroNameSub && (
          <p className="font-display text-2xl md:text-3xl tracking-tight text-muted-foreground mt-2">
            {data.heroNameSub}
          </p>
        )}
        <div className="w-16 h-px bg-accent mt-6 mb-6" />
        <p className="text-lg text-muted-foreground font-light max-w-2xl leading-relaxed">
          {data.bio[0]}
        </p>
      </header>

      {/* ── Profile + Contact ── */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4 animate-fade-in-up stagger-1">
          <div className="flex flex-col items-center md:items-start gap-6">
            <Avatar className="h-48 w-48 ring-2 ring-accent/30 ring-offset-4 ring-offset-background rounded-full">
              <AvatarImage src="/avatar.png" alt={data.heroName} />
              <AvatarFallback className="text-2xl font-display">
                KW
              </AvatarFallback>
            </Avatar>

            <div className="text-center md:text-left space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center md:justify-start">
                <Briefcase className="h-4 w-4 text-accent" />
                <span>{t("role")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center md:justify-start">
                <MapPin className="h-4 w-4 text-accent" />
                <span>{data.experiences[0]?.location}</span>
              </div>

              <nav className="flex flex-col gap-2 pt-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    <link.icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Right column — Bio */}
        <div className="md:col-span-8 animate-fade-in-up stagger-2">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            {data.bio.slice(1).map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="mt-20">
        <SectionHeader icon={Wrench} title={t("skills")} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {data.skills.map((group) => (
            <div key={group.category}>
              <h3 className="font-display text-lg tracking-tight mb-3">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2.5 py-1 rounded-full border border-border text-muted-foreground hover:border-accent/50 hover:text-accent transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Experience ── */}
      <section className="mt-20">
        <SectionHeader icon={Briefcase} title={t("experience")} />
        {data.experiences.map((exp) => (
          <div key={exp.title}>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
              <h3 className="font-display text-xl tracking-tight">
                {exp.title}
              </h3>
              <span className="font-mono text-xs text-muted-foreground">
                {exp.period}
              </span>
            </div>
            <p className="text-sm text-accent mb-6">
              {exp.company} · {exp.location}
            </p>

            <div className="space-y-8">
              {exp.sections.map((section) => (
                <div
                  key={section.heading}
                  className="border-l-2 border-accent/30 pl-6"
                >
                  <h4 className="font-medium text-sm tracking-wide mb-3">
                    {section.heading}
                  </h4>
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li
                        key={i}
                        className="text-muted-foreground text-sm leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-accent/40"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── Projects ── */}
      <section className="mt-20">
        <SectionHeader icon={FolderOpen} title={t("projects")} />
        <div className="space-y-10">
          {data.projects.map((project) => (
            <div
              key={project.title}
              className="border border-border rounded-lg p-6 hover:border-accent/30 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                <h3 className="font-display text-lg tracking-tight">
                  {project.title}
                </h3>
                <span className="font-mono text-xs text-muted-foreground">
                  {project.period}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {project.description}
              </p>
              <ul className="space-y-1.5 mb-4">
                {project.highlights.map((item, i) => (
                  <li
                    key={i}
                    className="text-muted-foreground text-sm leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-accent/40"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((techItem) => (
                  <span
                    key={techItem}
                    className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent"
                  >
                    {techItem}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Education ── */}
      <section className="mt-20">
        <SectionHeader icon={GraduationCap} title={t("education")} />
        <div className="space-y-6">
          {data.education.map((edu) => (
            <div key={edu.degree} className="border-l-2 border-border pl-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <div>
                  <h3 className="font-display text-lg tracking-tight">
                    {edu.school}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {edu.degree}
                  </p>
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {edu.period}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="mt-20">
        <SectionHeader icon={Award} title={t("certifications")} />
        <ul className="space-y-2">
          {data.certifications.map((cert) => (
            <li
              key={cert}
              className="text-sm text-muted-foreground pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-accent/40"
            >
              {cert}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Contact CTA ── */}
      <section className="mt-24 border border-accent/20 rounded-lg p-8 text-center bg-accent/5">
        <h2 className="font-display text-2xl tracking-tight mb-3">
          {t("connect")}
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
          {t("connectDesc")}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href={`mailto:${siteConfig.links.email}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors"
          >
            <Mail className="h-4 w-4" />
            {t("emailMe")}
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border text-sm font-medium hover:border-accent hover:text-accent transition-colors"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border text-sm font-medium hover:border-accent hover:text-accent transition-colors"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </section>
    </div>
  );
}

/* ── Section Header Component ── */

function SectionHeader({
  icon: Icon,
  title,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-accent" />
        <h2 className="font-display text-3xl tracking-tight">{title}</h2>
      </div>
      <div className="w-12 h-px bg-accent mt-4" />
    </div>
  );
}
