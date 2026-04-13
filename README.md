<div align="center">


<br/><br/>

<pre>
 ██╗  ██╗ ██████╗ ██████╗  █████╗ ██╗     ██╗██╗  ██╗
 ██║  ██║██╔═══██╗██╔══██╗██╔══██╗██║     ██║╚██╗██╔╝
 ███████║██║   ██║██████╔╝███████║██║     ██║ ╚███╔╝
 ██╔══██║██║   ██║██╔══██╗██╔══██║██║     ██║ ██╔██╗
 ██║  ██║╚██████╔╝██║  ██║██║  ██║███████╗██║██╔╝ ██╗
 ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝╚═╝  ╚═╝
                    P 2 P
</pre>

**The peer-to-peer file sync engine that does everything right.**  
No cloud. No account. No middleman. Direct, encrypted, fast.

<br/>

[![License: MPLv2](https://img.shields.io/badge/License-MPLv2-4A8FFF?style=flat-square)](https://www.mozilla.org/MPL/2.0/)
[![Go 1.25](https://img.shields.io/badge/Go-1.25-00D4FF?style=flat-square&logo=go&logoColor=white)](https://golang.org)
[![Platform](https://img.shields.io/badge/Platform-Windows%20·%20macOS%20·%20Linux-00E5B0?style=flat-square)](#-installation)
[![TLS 1.3](https://img.shields.io/badge/Security-TLS%201.3%20Encrypted-9B72FF?style=flat-square)](#security)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)
[![Stars](https://img.shields.io/github/stars/Kerim-Sabic/horalixp2pvibe?style=flat-square&color=FFD166)](https://github.com/Kerim-Sabic/horalixp2pvibe/stargazers)

<br/>

[**⚡ Quick Start**](#-installation) · [**📖 Tutorial**](#-full-tutorial) · [**🚀 Transfer Modes**](#-transfer-modes) · [**🔌 API**](#-rest-api) · [**🤝 Contribute**](.github/CONTRIBUTING.md)

<br/>

</div>

---

## Why Horalix P2P?

Most "sync" tools are just cloud storage in disguise — your files live on their servers, you pay monthly, and they throttle your speed. Horalix P2P is fundamentally different:

**Files travel directly from device to device, encrypted with TLS 1.3, over your network.**

No upload to a server. No middleman. No subscription. No account. Your data never leaves your control.

> *"The safest server is the one that never receives your files."*

<br/>

### Horalix P2P vs. Everything Else

| | Horalix P2P | Dropbox / Drive | Resilio | rsync |
|---|:---:|:---:|:---:|:---:|
| Files stay on your devices | ✅ | ❌ | ✅ | ✅ |
| End-to-end encrypted | ✅ Always | ⚠️ Partial | ✅ | ❌ |
| No account required | ✅ | ❌ | ❌ | ✅ |
| Works offline / LAN-only | ✅ | ❌ | ✅ | ✅ |
| Transfer Mode presets | ✅ | ❌ | ❌ | ❌ |
| Real-time file watching | ✅ | ✅ | ✅ | ❌ |
| Block-level delta sync | ✅ | ✅ | ✅ | ✅ |
| QUIC transport | ✅ | ❌ | ❌ | ❌ |
| Open source | ✅ | ❌ | ❌ | ✅ |
| Free forever | ✅ | ❌ | ❌ | ✅ |

<br/>

---

## 🚀 Transfer Modes

The killer feature: **one-click speed presets** that tune the entire sync engine for your situation. Switch from the dashboard — no restart, no config files.

<br/>

<table>
<tr>
  <td align="center" width="25%">
    <h3>⚡ Turbo</h3>
    <b>Maximum Speed</b><br/>
    <sub>LAN · NAS · Gigabit</sub><br/><br/>
    Compression <b>off</b><br/>
    Bandwidth <b>unlimited</b><br/>
    Parallelism <b>maximum</b>
  </td>
  <td align="center" width="25%">
    <h3>⚖️ Balanced</h3>
    <b>Best for Most</b><br/>
    <sub>Home · Office · Daily</sub><br/><br/>
    Compression <b>metadata</b><br/>
    Bandwidth <b>unlimited</b><br/>
    Parallelism <b>normal</b>
  </td>
  <td align="center" width="25%">
    <h3>🍃 Eco</h3>
    <b>Always-On Sync</b><br/>
    <sub>Servers · NAS · 24/7</sub><br/><br/>
    Compression <b>full LZ4</b><br/>
    Bandwidth <b>unlimited</b><br/>
    CPU use <b>minimal</b>
  </td>
  <td align="center" width="25%">
    <h3>📱 Mobile</h3>
    <b>Save Data & Battery</b><br/>
    <sub>Cellular · Metered WiFi</sub><br/><br/>
    Compression <b>full LZ4</b><br/>
    Bandwidth <b>capped</b><br/>
    CPU use <b>minimal</b>
  </td>
</tr>
</table>

<br/>

---

## ✨ Features

### Core Sync Engine
- **Block-level delta sync** — only the changed 128 KB–16 MB chunks transfer. Rename a 50 GB folder: **0 bytes** transferred
- **Parallel block fetching** — requests multiple blocks simultaneously from multiple peers
- **Real-time FS watching** — OS-native events propagate changes in seconds, not minutes
- **Four folder modes** — Send & Receive · Send Only · Receive Only · Receive Encrypted
- **File versioning** — Trash Can / Simple / Staggered / External strategies

### Network & Connectivity
- **TCP + QUIC dual-stack** — QUIC multiplexes streams for dramatically higher throughput than raw TCP
- **Full NAT traversal** — UPnP, NAT-PMP, STUN punches through firewalls automatically
- **LAN auto-discovery** — finds devices on your network in milliseconds via mDNS, zero config
- **Global discovery** — connects devices across the internet, no static IP or port forwarding required
- **Relay fallback** — always connects, even behind the most restrictive networks

### Security
- **TLS 1.3** on every single connection — no exceptions, no plaintext
- **160-bit device IDs** — cryptographic fingerprints, impossible to forge or spoof
- **Encrypted folder sharing** — give untrusted nodes (VPS, cloud) an encrypted copy they can't read
- **CSRF protection** on all API endpoints
- **Zero central authority** — no server that can be subpoenaed for your data

### Modern Web UI
- **Deep dark theme** — navy + electric blue/cyan/green accent palette
- **Live stats bar** — real-time download/upload speed, file count, total size, uptime
- **Dual-channel speed graph** — rolling canvas chart, green download + blue upload lines
- **Transfer Mode card** — one-click mode switching with immediate REST API apply
- **Instant search** — filter folders and devices as you type
- **Keyboard shortcuts** — full navigation without touching the mouse

---

## 📦 Installation

### Option 1 — Download Pre-built Binary (Recommended, Zero Setup)

**[→ Download from Releases](https://github.com/Kerim-Sabic/horalixp2pvibe/releases/latest)**

| Platform | File |
|---|---|
| **Windows 64-bit** | `horalix-windows-amd64-vX.X.X.zip` |
| **Windows ARM64** | `horalix-windows-arm64-vX.X.X.zip` |
| **Linux 64-bit** | `horalix-linux-amd64-vX.X.X.tar.gz` |
| **Linux ARM64** | `horalix-linux-arm64-vX.X.X.tar.gz` |
| **macOS Intel** | `horalix-darwin-amd64-vX.X.X.tar.gz` |
| **macOS Apple Silicon** | `horalix-darwin-arm64-vX.X.X.tar.gz` |

**Windows (step by step):**
1. Download `horalix-windows-amd64-*.zip` from the link above
2. Right-click the zip → **Extract All**
3. Open the extracted folder
4. Double-click **`horalix.exe`**
5. Windows Firewall prompt → click **Allow access**
6. Browser opens at **http://127.0.0.1:8384** — you're running

**Linux / macOS:**
```bash
tar xzf horalix-linux-amd64-*.tar.gz
cd horalix-linux-amd64-*/
./horalix
# Browser opens at http://127.0.0.1:8384
```

> **macOS note:** if you see "unidentified developer" — right-click the binary → Open → Open anyway

---

### Option 2 — Build from Source

Requirements: [Go 1.22+](https://go.dev/dl/) and Git

```bash
git clone https://github.com/Kerim-Sabic/horalixp2pvibe.git
cd horalixp2pvibe
go run build.go build
./horalix          # Linux / macOS
.\horalix.exe      # Windows (PowerShell)
```

---

### Option 3 — Docker

```bash
docker run -d \
  --name horalix \
  --restart unless-stopped \
  -p 8384:8384 \
  -p 22000:22000/tcp \
  -p 22000:22000/udp \
  -v /your/data:/var/horalix \
  ghcr.io/kerim-sabic/horalixp2pvibe:latest
```

Open **http://127.0.0.1:8384**

---

### Option 4 — Linux systemd (Auto-start on Boot)

```bash
sudo cp horalix /usr/local/bin/
sudo systemctl enable --now horalix@$USER
# UI at http://127.0.0.1:8384
```

---

## ⚡ Quick Start

```
+-------------------------------------------------------+
|                                                       |
|  1.  Run horalix.exe  (or ./horalix on Linux/macOS)   |
|  2.  Open  http://127.0.0.1:8384                      |
|  3.  Add a folder to sync                             |
|  4.  Share your Device ID with the other device       |
|  5.  Accept the connection and syncing begins         |
|                                                       |
+-------------------------------------------------------+
```

**Device A** — get your ID:
```
Actions (top-right) -> Show ID
Copy it (e.g. ABCDEFG-HIJKLMN-OPQRSTU-...)
```

**Device B** — add Device A:
```
Add Remote Device -> paste ID -> name it -> Save
```

**Device A** — accept the connection notification → **Add Device**

Share a folder: **Edit folder → Sharing tab → check device → Save** — sync starts.

---

## 📖 Full Tutorial

### Step 1 — Launch

Run `horalix.exe` (Windows) or `./horalix` (Linux/macOS).

On first launch, Horalix P2P:
- Generates your **Device ID** — a unique 160-bit cryptographic fingerprint
- Creates a default `~/Sync` folder
- Opens the web UI at **http://127.0.0.1:8384**

The dashboard shows **Folders** on the left and **Devices** on the right.

---

### Step 2 — Add a Folder

1. Click **Add Folder**
2. Set a **Label**, **Path**, and **Type**:

| Type | Behavior |
|---|---|
| **Send & Receive** | Bidirectional — changes anywhere sync everywhere |
| **Send Only** | This device is the source of truth |
| **Receive Only** | Only receives, never pushes |
| **Receive Encrypted** | Stores ciphertext only — can't see contents |

---

### Step 3 — Connect Devices

**Device A:** Click **Actions → Show ID** → copy your Device ID  
**Device B:** Click **Add Remote Device** → paste Device A's ID → Save  
**Device A:** Approve the incoming connection notification

Both devices now find each other automatically — on LAN in milliseconds, over the internet via discovery.

---

### Step 4 — Share a Folder

Edit the folder → **Sharing** tab → check the device → **Save**.  
The remote device gets a one-click accept prompt. Sync starts immediately.

---

### Step 5 — Pick Your Transfer Mode

Click a mode in the **Transfer Mode** card on the dashboard:

- **⚡ Turbo** — LAN, fast connections, urgent sync
- **⚖️ Balanced** — everyday use, the right default
- **🍃 Eco** — background sync, always-on servers
- **📱 Mobile** — cellular, metered WiFi, battery-sensitive

The mode applies instantly via REST API. A toast confirms it.

---

### Step 6 — Enable File Versioning

Edit folder → **File Versioning** → choose:

| Strategy | When to use |
|---|---|
| **Trash Can** | Recover any deleted/overwritten file, any time |
| **Simple** | Keep last N versions |
| **Staggered** | Hourly → daily → weekly backups automatically |
| **External** | Run a script on every change |

---

### Step 7 — Reading Status Badges

| Color | Meaning |
|---|---|
| 🟢 Up to Date | Fully synced |
| 🔵 Syncing | Transferring (shows % + bytes remaining) |
| 🔵 Scanning | Hashing local files |
| 🟡 Paused | Sync paused by user |
| 🔴 Out of Sync | Remote has changes you haven't received |
| 🔴 Failed Items | One or more files couldn't sync — click to see which |

---

## ⌨️ Keyboard Shortcuts

Navigate the entire UI without touching your mouse:

| Key | Action |
|---|---|
| `/` | Focus search |
| `F` | Add folder |
| `D` | Add remote device |
| `S` | Open settings |
| `R` | Rescan all folders |
| `P` | Pause all folders |
| `?` | Show shortcut reference |
| `Esc` | Clear search / close overlays |

---

## ⚙️ Configuration

### Config file location

| Platform | Path |
|---|---|
| Linux | `~/.local/share/horalix/config.xml` |
| macOS | `~/Library/Application Support/Horalix/` |
| Windows | `%LOCALAPPDATA%\Horalix\` |

### Environment variables

| Variable | Effect |
|---|---|
| `STGUIADDRESS=0.0.0.0:8384` | Expose UI to your network |
| `STGUIAPIKEY=secret` | Pre-set the API key |
| `STTRACE=model,protocol` | Enable debug logging |
| `STNODEFAULTFOLDER` | Skip creating `~/Sync` on first run |

### Performance tuning

```xml
<!-- Maximum speed (LAN / gigabit) -->
<folder>
  <copiers>8</copiers>
  <pullerMaxPendingKiB>524288</pullerMaxPendingKiB>  <!-- 512 MB in-flight -->
  <maxConcurrentWrites>32</maxConcurrentWrites>
</folder>
```

---

## 🔌 REST API

Full programmatic control — use from scripts, home automation, CI/CD.

**Auth:** `X-API-Key` header. Find your key under **Actions → Settings → GUI**.

```bash
# Status
curl http://127.0.0.1:8384/rest/system/status -H "X-API-Key: YOUR_KEY"

# Apply Turbo mode instantly
curl -X PATCH http://127.0.0.1:8384/rest/config \
  -H "X-API-Key: YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"options":{"maxSendKbps":0,"maxRecvKbps":0}}'

# Trigger rescan
curl -X POST "http://127.0.0.1:8384/rest/db/scan?folder=photos" \
  -H "X-API-Key: YOUR_KEY"

# Live event stream (SSE)
curl "http://127.0.0.1:8384/rest/events?events=StateChanged,FolderSummary" \
  -H "X-API-Key: YOUR_KEY"
```

---

## 🏗 Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                       Horalix P2P                            │
│                                                              │
│   Web UI (AngularJS)  ←→  REST API  ←→  Event Stream (SSE)  │
│                               │                              │
│                          lib/model                           │
│                  Folder state · sync logic · conflicts       │
│                               │                              │
│      ┌────────────────────────┼─────────────────────┐        │
│  lib/scanner           lib/config           lib/connections   │
│  FS watch · SHA-256    XML · validation     TCP/QUIC/relay    │
│                               │                              │
│           lib/protocol — BEP v1 over TLS 1.3                 │
│           Protobuf · block exchange · device auth             │
│                               │                              │
│        SQLite (device metadata)  +  LevelDB (block index)     │
└──────────────────────────────────────────────────────────────┘
```

### How syncing works under the hood

```
Device A                              Device B
   │── TLS handshake (cert pinned to Device ID) ──►│
   │◄── Hello + ClusterConfig ───────────────────  │
   │── Index (all files + SHA-256 block hashes) ──►│
   │◄── Index ────────────────────────────────── ──│
   │         (B calculates what it needs)           │
   │◄── Request(block 7 of photo.raw) ─────────────│
   │── Response(32KB block data) ──────────────────►│
   │         (B verifies SHA-256, writes atomically) │
   │◄── IndexUpdate(photo.raw complete) ────────────│
```

---

## 🛡 Security Model

| Threat | How we handle it |
|---|---|
| Eavesdropping | TLS 1.3 on every connection — non-negotiable |
| Man-in-the-middle | Device IDs are pinned to TLS certificates |
| Unauthorized device | Must be explicitly approved; IDs are 160-bit |
| Data corruption | SHA-256 verified before every block write |
| Web UI hijacking | CSRF token required on all state-changing requests |
| Relay compromise | Relay only forwards ciphertext — can't decrypt |

---

## 🐛 Troubleshooting

| Symptom | Fix |
|---|---|
| Devices won't connect | Open port 22000 TCP+UDP in firewall, or enable Relay in settings |
| Stuck at X% | Click the item count — see which files are blocked |
| High CPU | Switch to 🍃 Eco mode, or raise `RescanIntervalS` |
| UI not reachable remotely | Set `STGUIADDRESS=0.0.0.0:8384` and configure a password |
| Windows Firewall blocks | Allow `horalix.exe` in Windows Defender Firewall |
| Database error on start | Delete `index-*.db` in config dir — they auto-rebuild |
| macOS "unidentified developer" | Right-click binary → Open → Open anyway |
| Out of sync after editing | Normal — wait a few seconds, or click Rescan |

---

## 🔁 Run in the Background

**Windows — auto-start at login:**
1. Press `Win + R` → type `shell:startup` → Enter
2. Drag a shortcut to `horalix.exe` into that folder
3. Horalix P2P now starts automatically at every Windows login

**Linux — systemd service:**
```bash
sudo cp horalix /usr/local/bin/
sudo systemctl enable --now horalix@$USER
systemctl status horalix@$USER
```

**macOS — launchd:**
```bash
cp etc/macos-launchd/syncthing.plist ~/Library/LaunchAgents/com.horalix.p2p.plist
# Edit the plist file: replace USERNAME with your macOS username
launchctl load ~/Library/LaunchAgents/com.horalix.p2p.plist
```

---

## 🤝 Contributing

```bash
git clone https://github.com/Kerim-Sabic/horalixp2pvibe.git
git checkout -b feat/your-feature
# make changes
go test ./...        # must pass
go vet ./...         # no warnings
# open a PR
```

See [CONTRIBUTING.md](.github/CONTRIBUTING.md) for the full guide.

---

## 📄 License

**Mozilla Public License v2.0** — use it, modify it, ship it freely.  
Modifications to MPL-licensed files stay MPL. Proprietary code may combine freely.

[Full license →](LICENSE)

---

<div align="center">

<br/>

<img src="gui/default/assets/img/horalix-icon.svg" width="48" height="48"/>

<br/>

```
  +------------------------------------------+
  |                                          |
  |   H O R A L I X   P 2 P                 |
  |                                          |
  |   Sync everything. Own everything.       |
  |   Trust no one.                          |
  |                                          |
  +------------------------------------------+
```

**⭐ If Horalix P2P is useful to you, a star goes a long way — thank you.**

<br/>

</div>
