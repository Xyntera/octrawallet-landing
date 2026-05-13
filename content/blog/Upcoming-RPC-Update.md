---
title: 'Upcoming RPC Update: Migrate to octra_tokensByAddress'
date: '2026-05-13'
description: >-
  An upcoming RPC optimization introducing octra_tokensByAddress for
  significantly faster token balance retrieval.
author: Glaqz
tags:
  - octra
  - rpc
  - developer
  - performance
  - api
  - octrawallet
---

# Upcoming RPC Update: Migrate to `octra_tokensByAddress`

The Octra developer team has introduced a new RPC call named `octra_tokensByAddress`, designed to dramatically improve token retrieval performance across applications and wallets.

## Why This Update Matters

Previously, fetching token balances required multiple RPC calls in sequence:

- `octra_listprograms`
- `octra_programstorage(symbol)`
- `octra_programcall(balance_of)`
- Fetching token `name` and `decimals` for each program

This flow could take **up to 30 seconds** in some cases.

With the new implementation:

```bash
octra_tokensByAddress
