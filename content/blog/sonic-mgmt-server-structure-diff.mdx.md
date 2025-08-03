
# SONiC-MGMT Server Configuration 架構差異說明報告

本文件針對自定義 `server_config` 機制與社群原始 [sonic-mgmt](https://github.com/sonic-net/sonic-mgmt) 專案中 `ansible/` 結構進行差異分析，並說明 symbolic link 使用方式、各檔案用途與優化動機。

---

## 🔁 架構差異總覽

| 比較項目 | 社群 sonic-mgmt 標準流程 | 自定義 server_config 架構 |
|----------|----------------------------|-----------------------------|
| 設定來源 | 所有設定檔靜態存放於 `ansible/` | 設定集中存於 `ansible_config/` 並由 `server.sh` 動態產出 |
| testbed 切換 | 無內建多環境切換支援 | 支援 `server.sh [1~8]` 切換測試環境配置 |
| host_vars/group_vars/files 結構 | 所有變數檔、資料 CSV 均為靜態 YAML 或 CSV | 所有為 `.j2` 模板 → 自動轉為 `.yml/.csv`，再建立 symlink 注入 ansible |
| symlink 使用 | 幾乎無使用 symbolic link | 將 `ansible_config` 對應檔以 symlink 對應到 `ansible/` |
| Jenkins 整合 | 手動撰寫 testbed 與 testcase 對應邏輯 | 自動 log parser 與拓撲選擇器整合於 `automatic/jenkins/` |

---

## 📁 目錄結構對比圖

### ✅ 社群原始 sonic-mgmt ansible 結構（靜態）

```bash
sonic-mgmt/
└── ansible/
    ├── testbed.csv
    ├── group_vars/
    │   ├── all/
    │   ├── eos/
    ├── host_vars/
    ├── vars/
    ├── files/
    └── testbed-cli.sh
```

### 🔄 自定義架構（由 server.sh 動態產生）

```bash
sonic-mgmt/
├── server_config/
│   ├── sonic-mgmt/ansible/*.j2
│   └── server.sh, server_config_generate.py
├── ansible_config/  ← 動態產出配置檔
│   ├── testbed.csv, vtestbed.csv
│   ├── group_vars/
│   ├── host_vars/
│   ├── vars/
│   ├── files/
│   └── ...
└── ansible/         ← symlink 導入
    ├── testbed.csv              → ../ansible_config/testbed.csv
    ├── vtestbed.yaml            → ../ansible_config/vtestbed.yaml
    ├── files/                   → ../ansible_config/files/
    ├── group_vars/              → ../ansible_config/group_vars/
    ├── host_vars/               → ../ansible_config/host_vars/
    └── vars/                    → ../ansible_config/vars/
```

---

## 🔗 Symbolic Link 映射結構圖

```bash
ansible/
├── testbed.csv           → ../ansible_config/testbed.csv
├── vtestbed.yaml         → ../ansible_config/vtestbed.yaml
├── group_vars/
│   ├── all/              → ../ansible_config/group_vars/all/
│   ├── eos/              → ../ansible_config/group_vars/eos/
│   ├── vm_host/          → ../ansible_config/group_vars/vm_host/
│   └── lab/              → ../ansible_config/group_vars/lab/
├── host_vars/            → ../ansible_config/host_vars/
├── files/                → ../ansible_config/files/
├── vars/                 → ../ansible_config/vars/
```

---

## 📘 各目錄與檔案用途說明

| 類別 | 檔案/目錄 | 說明 |
|------|-----------|------|
| 🔧 測試拓撲 | `testbed.csv` / `vtestbed.csv` | 定義 DUT/VM 拓撲組合、測試主機、PTF 等參數 |
| 🧩 group_vars | `group_vars/all/` 等 | 設定 global 測試參數，如時區、lab 資訊、登入認證 |
| 🔐 host_vars | `host_vars/STR-*.yml` | 指定某台設備的 hostname、IP、特殊設定 |
| 📦 files | `sonic_lab_links.csv` 等 | 定義 DUT、Fanout、PDU、Console 的物理線路 |
| 🧪 vars | `docker_registry.yml` | 測試所需 Docker 映像與路由資訊配置 |

---

## ✅ 優化優點總結

- ✅ **清楚分離模板與實例**：`*.j2` 模板集中於 `server_config`，不污染主線。
- ✅ **支援多測試環境切換**：同一 git repo 可支援多台 testbed server。
- ✅ **symlink 保持相容結構**：產生結果仍符合原生 `ansible/` 使用方式，pytest/playbook 不需改動。
- ✅ **Jenkins 自動化可擴展**：支援 log 映射、自動配置生成，可與 CI 深度整合。

---

