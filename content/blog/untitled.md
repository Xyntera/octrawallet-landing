---
title: Octra wallet update 
date: 2026-06-25
description: ""
author: Glaqz
tags: []
---
---

# Octra Wallet v1.2.0: Desktop Arrives with Production-Ready Signing

**June 18, 2026** — We're excited to announce Octra Wallet v1.2.0, a major milestone that brings the non-custodial privacy wallet to Windows, macOS, and Linux with proper production builds.

## What's New

Octra Wallet is now a truly cross-platform wallet. Whether you're on Android, Windows, macOS, or Linux, you can securely manage OCT tokens and privacy operations with the same trusted, open-source codebase.

### 1. Native Installers for All Desktop Platforms

**Windows**: Download the NSIS `.exe` installer and get a standard Windows install experience — the app lands in `Program Files`, shortcuts appear in your Start Menu and Desktop, and uninstall works through Settings → Apps like any native app.

**macOS**: We've paired the existing `.zip` with a proper `.dmg` disk image. Drag Octra Wallet to your Applications folder the macOS way. Targets Apple Silicon (arm64); Intel users can build locally from source.

**Linux**: Debian/Ubuntu users get a proper `.deb` package. `sudo dpkg -i` and launch from your Applications menu. We've also kept the portable `.tar.gz` for other distributions.

All installers include proper application identities and system integration — no more "just extract and run from a random folder."

### 2. Release APK Now Properly Signed

The Android APK is now signed with a production 4096-bit RSA keystore (stored securely in CI), not debug keys. This is what you need for app store submission and trusted sideloading.

Existing Android users: your wallet data is unaffected. The secure storage is keyed by content, not by package metadata, so upgrading is seamless.

### 3. Correct Package ID: com.octrawalllet

All platforms now use the proper reverse-domain package identifier: `com.octrawalllet`. We've retired the placeholder `com.example.ouqro_wallet` that shipped in earlier versions.

If you were testing v1.0.x or v1.1.x on Android, your wallet data will migrate automatically — it's stored by key material, not by app ID.

## Who This Is For

If you own OCT tokens and you value control over your keys, Octra Wallet is built for you. The entire wallet core runs on your device — no servers, no key escrow, no hot wallets holding your tokens. All privacy operations (PVAC crypto) execute locally through the native wallet-core bridge.

Developers building on the Octra Network also benefit: test and interact with the blockchain without relying on web wallets or centralized services.

## Installation

| **Platform** | **Option** | **How to Install** |
| --- | --- | --- |
| **Android 6.0+** | Signed APK | Enable *Install unknown apps* and sideload the `.apk` |
| **Windows 10/11 x64** | NSIS installer (recommended) | Run `.exe` and follow the setup wizard |
| **Windows 10/11 x64** | Portable zip | Extract and run the executable |
| **macOS 11+ (Apple Silicon)** | DMG disk image (recommended) | Drag app to Applications folder |
| **macOS 11+ (Apple Silicon)** | Zip | Extract and run |
| **Linux x64 (Debian/Ubuntu)** | `.deb` package | `sudo dpkg -i Octra-Wallet-v1.2.0-linux-x64.deb` |
| **Linux x64 (any distro)** | Portable `.tar.gz` | Extract and run |

Downloads are available on the [Releases page](https://github.com/Xyntera/Octra-Wallet/releases/tag/v1.2.0). Check the SHA256SUMS for integrity verification.

## Under the Hood

Octra Wallet continues to use the same proven architecture:

- **Flutter UI** for a smooth, native-feeling 60fps experience across all platforms
- **Native wallet-core** (C++ PVAC backend) compiled as shared libraries and linked via Dart FFI
- **flutter_secure_storage** for encrypted local key storage
- **Zero servers** — everything runs on your device

The upgrade from v1.1.x to v1.2.0 doesn't change the core wallet logic, just how the app is packaged and distributed.

## Open Source & Community

Octra Wallet is GPL-2.0-or-later with OpenSSL linking permission. [The full source is on GitHub](https://github.com/Xyntera/Octra-Wallet), and we welcome contributions, security reports, and feature requests.

**Security**: If you find a vulnerability, please email [security@octrawalllet.com](mailto:security@octrawalllet.com) or open a report via [SECURITY.md](http://SECURITY.md) on GitHub.

## What's Next

We're working on:

- Testnet support for developers
- Hardware wallet integration (Ledger/Trezor)
- Advanced privacy operation batching
- Improved fee estimation

Follow updates on [GitHub](https://github.com/Xyntera/Octra-Wallet) or [@octrawalllet](https://x.com/octrawalllet).

---

**Get Octra Wallet v1.2.0:** [GitHub Releases](https://github.com/Xyntera/Octra-Wallet/releases/tag/v1.2.0)

**Report issues:** [GitHub Issues](https://github.com/Xyntera/Octra-Wallet/issues)

**Learn more:** [octrawalllet.com](http://octrawalllet.com)