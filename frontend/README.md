To Retrieve / Sync Kong Configuration File:

Retrieve:
1. Install DecK
2. Verify Services Configuration exists (curl http://localhost:8001/services)
3. Verify Routes Configuration exists (curl http://localhost:8001/routes)
4. `deck dump -o kong-config.yaml`


Sync to Kong
1. `deck sync -s <path-to-kong-config.yaml>`
