# ESDTimez PC Building Service.

### Description

This folder contains 2 sub-folders (Customer / Employee UI). Each sub-folder has their respective `README.md`.

The Customer and Employee UI can be ran independently.

### Instructions

1. Before running either UIs, start up the `Backend`.

### To Retrieve / Sync Kong Configuration File:

## Retrieve from Service / Routes from Kong:

1. Install DecK
2. Verify Services Configuration exists (curl http://localhost:8001/services)
3. Verify Routes Configuration exists (curl http://localhost:8001/routes)
4. `deck dump -o <path-to-store-kong-config>/kong.yaml`

## Sync to Kong:

1. Change Directories to this folder (Root folder for UI).
1. `deck sync -s <path-to-kong-config>/kong.yaml`

### Contributors:

- ALEXANDER LUK WEI HENG
- CLARISSA KOH SHI QI
- GERARD EMMANUEL LOH KAI-JYN
- LOH YEE XUN GABRIEL
- NASHWYN SINGH SANGAH
- SHYAN CHAM
