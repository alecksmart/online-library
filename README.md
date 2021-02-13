# Online Library

A full-stack client-server application for online library written in node.js and react 17.

## About Online Library

### Technologies

- [ ] Database: MySQL
- [ ] Back-end (REST API): JavaScript (nodejs, express)
- [ ] Front-end: JavaScript (React, Redux)

### Installation and running

New installation

Create a new database and user like

```sql
CREATE DATABASE online_library;
CREATE USER 'online_library'@'localhost' IDENTIFIED BY 'online_library';
GRANT ALL PRIVILEGES ON online_library.* TO 'online_library'@'localhost';
FLUSH PRIVILEGES;
```

```bash
npm run cleaninstall
```

Re-seed

```bash
npm run seedinstall
```

Start

```bash
npm start
```

Point the browser to _http://localhost:3000_. Dedmo users: _admin@email.com_ and _user@email.com_, demo password for both _12345_.

### Troubleshooting

If you have troubles running server part, try

```bash
npm install -g --force nodemon
```
