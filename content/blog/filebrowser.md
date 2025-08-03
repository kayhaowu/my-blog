# Simple File Sharing with FileBrowser + Nginx

This project sets up a dual-purpose file sharing server using:

- **FileBrowser** for web-based file browsing and upload/download management
- **Nginx (alpine)** as a minimal static HTTP server for direct `wget` / `curl` downloads

All files are served from the shared `./data` directory and mounted into both containers.

---

## Project Structure

```
filebrowser/
├── data/                   # Shared folder to store your files
├── nginx/
│   └── nginx.conf          # Custom config for Nginx
└── docker-compose.yml      # Main docker configuration
```

---

## Features

| Feature                         | FileBrowser (port 5001) | Nginx HTTP Server (port 8080) |
|---------------------------------|--------------------------|--------------------------------|
| Web UI file management          | Yes                      | No                             |
| Password login                  | Yes                      | No                             |
| curl/wget direct download       | Not ideal                | Yes                            |
| Anonymous access                | No (by default)          | Yes                            |
| Directory listing               | Yes                      | Yes (via `autoindex`)         |

---

## How to Deploy

1. Clone this repository or create the structure manually
2. Make sure Docker and Docker Compose are installed
3. Run the initialization script:

```bash
chmod +x init_file_server.sh
./init_file_server.sh
```

This script will:

- Create required directories (`data/`, `nginx/`)
- Generate default `nginx.conf` and `docker-compose.yml` if not already present
- Start both services with `docker-compose up -d`

---

## Accessing the Services

- **FileBrowser UI:**  
  [http://localhost:5001](http://localhost:5001)  
  You will need to set up a user manually after the first run.

- **Direct HTTP Access (no login):**  
  [http://localhost:8080](http://localhost:8080)

You can use curl/wget directly on the second endpoint:

```bash
curl -O http://<your-ip>:8080/filename
```

---

## Tips

- Place all shared files into the `data/` folder.
- You can use an NFS mount or rsync to sync data into this directory.
- FileBrowser and Nginx both use `./data` so they always stay in sync.

---

## Optional: Automate File Sync from NAS

You may use `cron` to periodically sync from a mounted NFS share:

Example cron entry:

```
0 18 * * * /home/sonic/rsync_nas_to_data.sh >> /var/log/rsync_nas.log 2>&1
```

This script could use something like:

```bash
#!/bin/bash
rsync -avh --delete /mnt/nas/ /home/sonic/filebrowser/data/
```

---

## Security Note

The Nginx HTTP server does **not** require authentication. Be careful when exposing it to public networks.  
If needed, you can enable `basic auth` in the Nginx configuration.

---

## License

MIT or internal use only.
