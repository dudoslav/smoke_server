# Smoke server

Smoke server for dividing number into two factors.

## Build

1. run `npm install` in root folder
2. run `npm install` in public folder

## Run

To start server simply run `npm start` in root folder.

Server web interface is running on port 9669.

To access it try localhost:9669 in your browser.

Server cloud is running on port 9666.

This port is used to connect clients to.

## Protocol

First byte is always packet number.

Variables must be in order.

Variable char[] is null terminated string.

0. **Packet00**
  * Nothing
1. **Packet01**
  * server -> client
    * `byte`: position //what part of number to crack
    * `byte`: count //number of computers connected
    * `char[]`: number //number to crack
  * client -> server
    * `byte`: result //0 if not found, 1 if found
    * `char[]`: n1 //first factor, nothing if not found
    * `char[]`: n2 //second factor, nothing if not found
2. **Packet02**
  * Nothing yet, planning on stopping factorization if other client found factors
