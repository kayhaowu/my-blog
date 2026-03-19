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

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Kay Wu — System Engineer at Edgecore Networks. Kubernetes, DevOps, Networking, and Cloud Infrastructure.",
};

/* ═══════════════════════════════════════════
   Data
   ═══════════════════════════════════════════ */

const skills = [
  {
    category: "Cloud & Infrastructure",
    items: [
      "Kubernetes (Kubeadm, Helm, Ingress Nginx)",
      "Docker / Docker-Compose",
      "Proxmox VE",
      "AWS (EC2, VPC, S3, IAM)",
      "HAProxy / Keepalived",
      "Longhorn (DR)",
      "Ansible / Shell Scripting",
    ],
  },
  {
    category: "Network Engineering",
    items: [
      "TCP/IP, VLAN (802.1Q), Subnetting",
      "Fortinet VPN (Site-to-Site / SSL)",
      "Multus CNI (Overlay / Underlay)",
      "Calico",
      "SONiC (Open Source NOS)",
      "DNS / SNMP",
    ],
  },
  {
    category: "Observability & CI/CD",
    items: [
      "Prometheus Stack (Alertmanager)",
      "Grafana / Telegraf / InfluxDB",
      "gNMIc (Streaming Telemetry)",
      "Jenkins (Kubernetes Plugin)",
      "Git (GitLab) / JFrog Artifactory",
    ],
  },
  {
    category: "Development",
    items: [
      "Next.js / React / Tailwind CSS",
      "Python (Automation, Pytest)",
      "Node.js / TypeScript",
      "PostgreSQL / MySQL / Redis",
    ],
  },
];

const experiences = [
  {
    title: "System Engineer",
    company: "Edgecore Networks (鈺登科技)",
    location: "Tainan, Taiwan",
    period: "2022.12 – Present",
    sections: [
      {
        heading: "Kubernetes Infrastructure & Storage DR",
        items: [
          "Led migration from standalone Docker to multi-master Kubernetes (Kubeadm) on Proxmox VE with HAProxy + Keepalived for HA control plane",
          "Implemented Longhorn for PV management and automated snapshots — successfully recovered full cluster data after a Master Node disk failure",
          "Modernized data center infrastructure by transitioning server, PDU, and console server management into Kubernetes-native workflows",
        ],
      },
      {
        heading: "Hybrid Cloud Networking & Internal Tools",
        items: [
          "Built internal management GUI with Next.js + AWS SDK v3, integrating Azure AD SSO (SAML) and JWT auth for EC2 lifecycle automation",
          "Connected Fortinet Site-to-Site VPN with AWS VPC across regions; resolved SSL VPN DNS resolution issues with Ingress Nginx",
        ],
      },
      {
        heading: "SIT & CI/CD Pipeline",
        items: [
          "Executed transceiver testing (line-rate, EEPROM) and maintained sonic-mgmt Jenkins CI pipelines with Git-based test script management",
          "Used Multus CNI with physical L3 Switch VLANs to pass-through NICs into Pods for rapid POC topology deployment",
          "Optimized Jenkins with Kubernetes Plugin for dynamic agent Pods, running Pytest against DUT with logs archived to JFrog/PostgreSQL",
        ],
      },
      {
        heading: "Observability & Monitoring",
        items: [
          "Upgraded monitoring from TIG stack to Prometheus Stack (Helm) with Node Exporter and Blackbox Exporter dashboards",
          "Implemented gNMIc subscription for SONiC Switch telemetry and built SNMP API for remote PDU power control",
          "Integrated Microsoft Teams Workflow for real-time alert notifications",
        ],
      },
    ],
  },
];

const projects = [
  {
    title: "Lab Kubernetes Architecture Transformation",
    period: "2024.11 – Present",
    description:
      "Replaced traditional Docker/VM testing with a Kubernetes-native platform for complex network topology simulation.",
    highlights: [
      "Multi-node K8s cluster on Proxmox VE with HA control plane",
      "Multus CNI for physical VLAN pass-through to Pods (L2/L3 simulation)",
      "Longhorn DR — recovered from Master Node disk failure using backup data",
      "Prometheus + Grafana + gNMIc telemetry with Teams alerting",
    ],
    tech: ["Kubernetes", "Multus CNI", "Longhorn", "Prometheus", "Grafana"],
  },
  {
    title: "AWS Cloud Resource Management Platform",
    period: "2023.11 – Present",
    description:
      "Self-service internal tool for R&D teams to manage AWS resources with cost controls and access governance.",
    highlights: [
      "Next.js full-stack app with Azure AD SSO (SAML) + JWT authentication",
      "EC2 lifecycle management: quota limits, snapshot recovery, scheduled shutdown",
      "SNMP API integration for remote PDU power control via web UI",
    ],
    tech: ["Next.js", "AWS SDK", "Azure SSO", "SNMP", "React"],
  },
];

const education = [
  {
    school: "Southern Taiwan University of Science and Technology",
    schoolZh: "南臺科技大學",
    degree: "M.S. in Electronic Engineering",
    period: "2020.07 – 2022.08",
  },
  {
    school: "Southern Taiwan University of Science and Technology",
    schoolZh: "南臺科技大學",
    degree: "B.S. in Electronic Engineering",
    period: "2016.09 – 2020.07",
  },
];

const certifications = [
  "Web Design Technician (丙級網頁設計技術士)",
  "Computer Hardware Assembly Technician — Level B (乙級電腦硬體裝修技術士)",
  "PCB Layout International Certification — Practical Level",
];

const socialLinks = [
  { label: "Email", href: `mailto:${siteConfig.links.email}`, icon: Mail },
  { label: "GitHub", href: siteConfig.links.github, icon: Github },
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: Linkedin },
  { label: "Blog", href: siteConfig.url, icon: Globe },
];

/* ═══════════════════════════════════════════
   Page
   ═══════════════════════════════════════════ */

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      {/* ── Hero ── */}
      <header className="animate-fade-in-up">
        <p className="text-sm font-mono text-accent tracking-wide uppercase mb-4">
          About Me
        </p>
        <h1 className="font-display text-5xl md:text-7xl tracking-tight">
          吳振豪
        </h1>
        <p className="font-display text-2xl md:text-3xl tracking-tight text-muted-foreground mt-2">
          Kay Wu
        </p>
        <div className="w-16 h-px bg-accent mt-6 mb-6" />
        <p className="text-lg text-muted-foreground font-light max-w-2xl leading-relaxed">
          System Engineer at Edgecore Networks with a background in systems and
          networking. I enjoy solving infrastructure challenges through
          Kubernetes, hybrid cloud architectures, and automation — building
          platforms that let engineering teams move faster.
        </p>
      </header>

      {/* ── Profile + Contact ── */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4 animate-fade-in-up stagger-1">
          <div className="flex flex-col items-center md:items-start gap-6">
            <Avatar className="h-48 w-48 ring-2 ring-accent/30 ring-offset-4 ring-offset-background rounded-full">
              <AvatarImage src="/avatar.png" alt="Kay Wu" />
              <AvatarFallback className="text-2xl font-display">
                KW
              </AvatarFallback>
            </Avatar>

            <div className="text-center md:text-left space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center md:justify-start">
                <Briefcase className="h-4 w-4 text-accent" />
                <span>System Engineer @ Edgecore Networks</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center md:justify-start">
                <MapPin className="h-4 w-4 text-accent" />
                <span>Tainan, Taiwan</span>
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
            <p>
              I currently work at Edgecore Networks, where I manage data center
              infrastructure and build POC testing environments. My day-to-day
              involves running Kubernetes clusters, configuring hybrid cloud
              networks (AWS VPC / Fortinet VPN), and ensuring our SONiC network
              switches are observable through streaming telemetry.
            </p>
            <p>
              I started from hands-on hardware testing and rack installations,
              then moved toward automating everything I touched — from CI/CD
              pipelines with Jenkins to full-stack internal tools with Next.js.
              I believe the best infrastructure is the kind no one has to think
              about.
            </p>
            <p>
              Outside of work, I write about networking fundamentals, DevOps
              practices, and web development on this blog.
            </p>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="mt-20">
        <SectionHeader icon={Wrench} title="Skills" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {skills.map((group) => (
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
        <SectionHeader icon={Briefcase} title="Experience" />
        {experiences.map((exp) => (
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
        <SectionHeader icon={FolderOpen} title="Projects" />
        <div className="space-y-10">
          {projects.map((project) => (
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
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Education ── */}
      <section className="mt-20">
        <SectionHeader icon={GraduationCap} title="Education" />
        <div className="space-y-6">
          {education.map((edu) => (
            <div key={edu.degree} className="border-l-2 border-border pl-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <div>
                  <h3 className="font-display text-lg tracking-tight">
                    {edu.schoolZh}
                  </h3>
                  <p className="text-sm text-muted-foreground">{edu.school}</p>
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
        <SectionHeader icon={Award} title="Certifications" />
        <ul className="space-y-2">
          {certifications.map((cert) => (
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
          Let&apos;s Connect
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
          I&apos;m open to new opportunities in DevOps, infrastructure, and
          software engineering. Feel free to reach out.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href={`mailto:${siteConfig.links.email}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors"
          >
            <Mail className="h-4 w-4" />
            Email Me
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
