# ESDTimez PC Building Service

## Description

This repository contains two sub-folders: Customer UI and Employee UI. Each sub-folder has its respective `README.md` file.

Both the Customer and Employee UI can be run independently.

## Instructions

Before running either UIs, make sure to start up the Backend service.

### Retrieving / Syncing Kong Configuration File

#### Retrieve Service / Routes from Kong

1. Install DecK.
2. Verify Services Configuration exists: `curl http://localhost:8001/services`.
3. Verify Routes Configuration exists: `curl http://localhost:8001/routes`.
4. Run `deck dump -o <path-to-store-kong-config>/kong.yaml`.

#### Sync to Kong

1. Navigate to the root folder for the UI.
2. Run `deck sync -s <path-to-kong-config>/kong.yaml`.

## Contributors

- Alexander Luk Wei Heng
- Clarissa Koh Shi Qi
- Gerard Emmanuel Loh Kai-Jyn
- Loh Yee Xun Gabriel
- Nashwyn Singh Sangah
- Shyan Cham
