# Ubuntu CLI 格式化與寫入 ISO 到 USB/SD 卡教學

> 適用於安裝 Proxmox、Ubuntu 等作業系統的映像檔寫入流程  
> 日期：2025-07-17

---

## 📌 目標

- 使用 Ubuntu CLI 工具，格式化外接 USB/SD 卡儲存裝置
- 將 ISO 映像檔（例如 Proxmox）寫入該裝置，作為開機碟

---

## 🧭 FAQ & 操作指南

### Q1: 如何查看目前接入的磁碟裝置？

```bash
lsblk
```

或使用：

```bash
sudo fdisk -l
```

範例輸出：

```
sdb      8:16   1  58.2G  0 disk
├─sdb1   8:17   1   512M  0 part
└─sdb2   8:18   1  57.7G  0 part
```

👉 通常 USB 裝置會是 `/dev/sdb` 或 `/dev/sdc`，請小心辨識。

---

### Q2: 如何格式化 USB/SD 裝置為 ExFAT（或其他格式）？

先安裝工具（若尚未安裝）：

```bash
sudo apt update
sudo apt install exfatprogs
```

接著格式化：

```bash
sudo mkfs.exfat -n STORAGE /dev/sdb
```

其他格式：

- FAT32:
  ```bash
  sudo mkfs.vfat -F 32 -n STORAGE /dev/sdb
  ```
- EXT4（Linux專用）:
  ```bash
  sudo mkfs.ext4 -L storage /dev/sdb
  ```

---

### Q3: 如何安全卸載磁碟？

```bash
sudo umount /dev/sdb*
```

可搭配 `lsblk` 確認已卸載狀態。

---

### Q4: 如何將 ISO 寫入磁碟？

使用 `dd` 工具：

```bash
sudo dd if=~/Downloads/proxmox-ve_8.4-1.iso of=/dev/sdb bs=4M status=progress
```

說明：

- `if`：輸入 ISO 路徑
- `of`：目標磁碟（注意是整顆 `/dev/sdb`，不是分割區如 `/dev/sdb1`）
- `bs=4M`：每次寫入 block size
- `status=progress`：顯示寫入進度

寫入完成後：

```bash
sync
```

可安全拔除裝置。

---

## ⚠️ 注意事項

- 請務必確認裝置代號（如 `/dev/sdb`），**寫錯將導致資料損毀！**
- 寫入後該裝置內容會變成開機映像格式，無法以檔案總管存取。
- 若需重新格式化為資料磁碟，請重新執行格式化步驟。

---

## ✅ 建議用途

- 建立 Proxmox / Ubuntu / Debian / VMware ESXi 安裝碟
- 透過 BIOS/UEFI 啟動該 USB 裝置進行系統部署

---

## 🛠️ GUI 替代工具

- [balenaEtcher](https://www.balena.io/etcher/)（跨平台）
- [GNOME Disks](可在 Ubuntu 軟體中心安裝）

---
