# pipedrive_bling_api_integration

Wrapper around **Pipedrive** and **Bling** APIs to integrate them. Built as LinkApi challenge resolution for Backend Developer career apply

## Features

- Hourly, fetch deals in **Pipedrive** API with _won_ status.
- For each deal, get products/services
- With _won_ deals and deal products data, try to save it on database (MongoDB) and send product info as _orders_ (pedidos) on **Bling** API
- Return aggregated data by date and totalValueInBRL

## How to use

- clone this repo:

  ```bash
  git clone https://github.com/siqueira-ec/pipedrive_blig_api_integration.git
  ```

- open cloned dir:

  ```bash
  cd pipedrive_blig_api_integration
  ```

- install dependencies:

  - if you use NPM:

    ```bash
    npm install
    ```

  - if you use YARN:

    ```bash
    yarn
    ```

- create _.env_ file based on _.env.example_:

  ```env
  # MONGO
  MONGO_USER=pipedriveblingapiintegration
  MONGO_PASSWORD=pipedriveblingapiintegration
  MONGO_PATH=siqueiradev.5qcml.gcp.mongodb.net
  MONGO_DB=pipedriveblingapiintegration

  # APPLICATION
  PORT=3333

  # BLING
  BLING_API_URL=https://bling.com.br/Api/v2/pedido/
  BLING_API_KEY=bbb81dc5c5f46a5c44ad417c588f909137405ed2e587b064eae589672b3842a32a8fb271

  # PIPEDRIVE
  PIPEDRIVE_API_URL=https://api.pipedrive.com/v1/
  PIPEDRIVE_API_KEY=0afe5f5af8102ecfb78cf0858caa40a37601a4bb

  # CRON
  # 1 hour by default, change if you want longer or shorter fetches
  JOB_TIME=0 */1 * * *
  ```

- run the project:

  - NPM:

    ```bash
    npm run dev
    ```

  - YARN:

    ```bash
    yarn dev
    ```

- to save won deals, just let the application running, fetch and save process will occur automatically (based on time you configured on _.env_) or, if you want to do it manually, send a _POST_ request to **/opportunity**
- to get aggregated results, just send a _GET_ request to **/opportunity**

## TODO

- better documentation and comments
- better folder structure and file naming
- unit tests
- improve readability and code reuse
- cover different currency and type of deals
