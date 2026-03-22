import type { AboutData } from "./types";

const data: AboutData = {
  heroName: "吳振豪",
  heroNameSub: "Kay Wu",

  bio: [
    "目前任職於鈺登科技，負責資料中心基礎設施管理與 POC 測試環境建置。日常工作涵蓋 Kubernetes 叢集維運、混合雲網路架構（AWS VPC / Fortinet VPN）配置，以及透過串流遙測確保 SONiC 網路交換器的可觀測性。",
    "從最初的硬體測試與機架安裝起步，逐步將接觸到的一切自動化——從 Jenkins CI/CD 流水線到以 Next.js 開發的全端內部工具。我相信最好的基礎設施，是讓人完全不需要操心的那種。",
    "工作之餘，我會在這個部落格上撰寫關於網路基礎知識、DevOps 實踐與網頁開發的文章。",
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
      title: "系統工程師",
      company: "鈺登科技",
      location: "台南，台灣",
      period: "2022.12 – 至今",
      sections: [
        {
          heading: "Kubernetes 基礎設施與儲存災難復原",
          items: [
            "主導從獨立 Docker 架構遷移至多主節點 Kubernetes（Kubeadm），於 Proxmox VE 上搭配 HAProxy + Keepalived 實現高可用控制平面",
            "導入 Longhorn 進行 PV 管理與自動化快照，成功在 Master Node 磁碟故障後完整恢復叢集資料",
            "將伺服器、PDU 及 Console Server 管理流程轉型為 Kubernetes 原生工作流，推動資料中心基礎設施現代化",
          ],
        },
        {
          heading: "混合雲網路與內部工具開發",
          items: [
            "以 Next.js + AWS SDK v3 建置內部管理介面，整合 Azure AD SSO（SAML）與 JWT 認證，實現 EC2 生命週期自動化管理",
            "串接 Fortinet Site-to-Site VPN 與跨區域 AWS VPC；透過 Ingress Nginx 解決 SSL VPN DNS 解析問題",
          ],
        },
        {
          heading: "SIT 與 CI/CD 流水線",
          items: [
            "執行光收發器測試（線速、EEPROM）並維護 sonic-mgmt Jenkins CI 流水線，搭配 Git 管理測試腳本",
            "運用 Multus CNI 結合實體 L3 Switch VLAN，將網卡直通至 Pod，實現快速 POC 拓撲部署",
            "透過 Kubernetes Plugin 優化 Jenkins 動態 Agent Pod 調度，以 Pytest 對 DUT 執行測試，日誌歸檔至 JFrog/PostgreSQL",
          ],
        },
        {
          heading: "可觀測性與監控",
          items: [
            "將監控架構從 TIG Stack 升級至 Prometheus Stack（Helm），建置 Node Exporter 與 Blackbox Exporter 儀表板",
            "實作 gNMIc 訂閱機制取得 SONiC Switch 遙測數據，並開發 SNMP API 實現遠端 PDU 電源控制",
            "整合 Microsoft Teams Workflow 實現即時告警通知",
          ],
        },
      ],
    },
  ],

  projects: [
    {
      title: "Lab Kubernetes Architecture Transformation",
      period: "2024.11 – 至今",
      description:
        "以 Kubernetes 原生平台取代傳統 Docker/VM 測試環境，用於複雜網路拓撲模擬。",
      highlights: [
        "於 Proxmox VE 上建置多節點 K8s 叢集，搭配高可用控制平面",
        "透過 Multus CNI 實現實體 VLAN 直通至 Pod（L2/L3 模擬）",
        "Longhorn 災難復原——利用備份資料從 Master Node 磁碟故障中成功恢復",
        "Prometheus + Grafana + gNMIc 遙測搭配 Teams 告警通知",
      ],
      tech: ["Kubernetes", "Multus CNI", "Longhorn", "Prometheus", "Grafana"],
    },
    {
      title: "AWS Cloud Resource Management Platform",
      period: "2023.11 – 至今",
      description:
        "提供研發團隊自助管理 AWS 資源的內部工具，具備成本控管與存取權限治理功能。",
      highlights: [
        "以 Next.js 全端應用整合 Azure AD SSO（SAML）+ JWT 認證",
        "EC2 生命週期管理：配額限制、快照復原、排程關機",
        "SNMP API 整合，透過網頁介面實現遠端 PDU 電源控制",
      ],
      tech: ["Next.js", "AWS SDK", "Azure SSO", "SNMP", "React"],
    },
  ],

  education: [
    {
      school: "南臺科技大學",
      degree: "電子工程系 碩士",
      period: "2020.07 – 2022.08",
    },
    {
      school: "南臺科技大學",
      degree: "電子工程系 學士",
      period: "2016.09 – 2020.07",
    },
  ],

  certifications: [
    "丙級網頁設計技術士",
    "乙級電腦硬體裝修技術士",
    "PCB Layout 國際認證 — 實作級",
  ],
};

export default data;
