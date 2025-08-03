# macOS CLI 格式化與寫入 ISO 到 USB/SD 卡教學

> 適用於安裝 Proxmox、Ubuntu 等作業系統的映像檔寫入流程  
> 日期：2025-07-15

---

## 📌 目標

- 使用 macOS CLI 工具，格式化外接 USB/SD 卡儲存裝置
- 將 ISO 映像檔（例如 Proxmox）寫入該裝置，作為開機碟

---

## 🧭 FAQ & 操作指南

### Q1: 如何查看目前接入的磁碟裝置？

```bash
diskutil list
```

範例輸出：

```
/dev/disk4 (external, physical):
   #:                       TYPE NAME        SIZE       IDENTIFIER
   0:      GUID_partition_scheme            *64.1 GB    disk4
   1:                        EFI EFI         209.7 MB   disk4s1
   2:       Microsoft Basic Data STORAGE     63.9 GB    disk4s2
```

---

### Q2: 如何格式化磁碟為 ExFAT（或其他格式）？

```bash
diskutil eraseDisk ExFAT STORAGE /dev/disk4
```

其他格式範例：

- FAT32:
  ```bash
  diskutil eraseDisk MS-DOS UNTITLED /dev/disk4
  ```
- APFS:
  ```bash
  diskutil eraseDisk APFS MyDisk /dev/disk4
  ```

---

### Q3: 如何確認格式化是否完成？

檢查磁碟結構應為：

```
/dev/disk4 (external, physical):
   0:      GUID_partition_scheme            *64.1 GB    disk4
   1:                        EFI EFI         209.7 MB   disk4s1
   2:       Microsoft Basic Data STORAGE     63.9 GB    disk4s2
```

也可執行以下指令確認檔案系統：

```bash
diskutil info /dev/disk4s2 | grep 'File System'
```

---

### Q4: 如何將 ISO 檔寫入該磁碟（作為開機碟使用）？

1. 卸載磁碟：

    ```bash
    diskutil unmountDisk /dev/disk4
    ```

2. 使用 `dd` 寫入（用 `rdisk4` 效能較佳）：

    ```bash
    sudo dd if=~/Downloads/proxmox-ve_8.4-1.iso of=/dev/rdisk4 bs=4m status=progress
    ```

3. 寫入完成後，安全推出磁碟：

    ```bash
    diskutil eject /dev/disk4
    ```

---

## ⚠️ 注意事項

- `dd` 會完全覆蓋磁碟，請務必確認裝置代號（例如 `/dev/disk4`）正確。
- 若使用錯裝置，可能會清空主系統資料。
- 寫入後該磁碟不再能透過 Finder 存取，因為它變成開機映像結構。

---

## ✅ 建議用途

- 建立 Proxmox / Ubuntu / Debian / VMware ESXi 安裝碟
- 透過 BIOS/UEFI 啟動該 USB 裝置進行系統部署

---

## 🛠️ 進階選項

- 若需進行安全抹除，可用：
  ```bash
  diskutil secureErase 0 /dev/disk4
  ```

- 若需 GUI 工具，可用：
  - [balenaEtcher](https://www.balena.io/etcher/)
  - [Rufus（僅 Windows）](https://rufus.ie)

---
