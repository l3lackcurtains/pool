# Alberti Protocol Pool

Welcome to theAlberti Protocol Pool! This API allows you to interact with commit data stored in a database. Below you will find all the available endpoints and their descriptions.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
  - [GET /](#get-)
  - [GET /commits](#get-commits)
  - [GET /commits/signature/:signature](#get-commitssignaturesignature)
  - [GET /commits/address/:address](#get-commitsaddressaddress)
  - [GET /commits/type/:type](#get-commitstypetype)
  - [GET /addresses](#get-addresses)
  - [GET /count](#get-count)
  - [GET /hashtags](#get-hashtags)
  - [POST /commit](#post-commit)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/AlbertiProtocol/pool.git
    ```
2. Navigate to the project directory:
    ```sh
    cd pool
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
4. Start the server:
    ```sh
    npm start
    ```

## Usage

Once the server is running, you can access the API at `http://localhost:<port>`.
