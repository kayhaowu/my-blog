import type { AboutData } from "./types";

const data: AboutData = {
  heroName: "Kay Wu",
  heroNameSub: "",

  bio: [
    "I currently work at Edgecore Networks, where I manage data center infrastructure and build POC testing environments. My day-to-day involves running Kubernetes clusters, configuring hybrid cloud networks (AWS VPC / Fortinet VPN), and ensuring our SONiC network switches are observable through streaming telemetry.",
    "I started from hands-on hardware testing and rack installations, then moved toward automating everything I touched — from CI/CD pipelines with Jenkins to full-stack internal tools with Next.js. I believe the best infrastructure is the kind no one has to think about.",
    "Outside of work, I write about networking fundamentals, DevOps practices, and web development on this blog.",
  ],

  skills: [
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
  ],

  experiences: [
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
  ],

  projects: [
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
  ],

  education: [
    {
      school: "Southern Taiwan University of Science and Technology",
      degree: "M.S. in Electronic Engineering",
      period: "2020.07 – 2022.08",
    },
    {
      school: "Southern Taiwan University of Science and Technology",
      degree: "B.S. in Electronic Engineering",
      period: "2016.09 – 2020.07",
    },
  ],

  certifications: [
    "Web Design Technician (丙級網頁設計技術士)",
    "Computer Hardware Assembly Technician — Level B (乙級電腦硬體裝修技術士)",
    "PCB Layout International Certification — Practical Level",
  ],
};

export default data;
