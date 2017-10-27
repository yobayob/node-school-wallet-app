# Приложение школы Node.js «Кошелёк»

### RUN

```
mongod --port=27018
npm i && npm run build && npm start
```

### Docker run

```
docker build -t wallet:latest .  && docker-compose run web
docker-compose up -d

```

### API

| uri                          | method | request                                         | response                   | description                  |
|------------------------------|--------|-------------------------------------------------|----------------------------|------------------------------|
| /cards                       | GET    |                                                 | [CARD, ...]                | All cards                    |
| /cards                       | POST   | {"cardNumber": string, "balance": number}       | CARD                       | Create card                  |
| /cards/:id                   | GET    |                                                 | CARD                       | Get card                     |
| /cards/:id                   | DELETE |                                                 |                            | Remove card                  |
| /cards/:id/file-transactions | GET    |                                                 | text/csv                   | Return csv file with trans   |
| /cards/:id/transactions      | GET    |                                                 | [TRANSACTION, ...]         | Get transaction for one card |
| /cards/:id/transactions      | POST   | {"data": string, "type": string, "sum": number} | TRANSACTION                | Create transaction           |
| /cards/:id/pay               | POST   | {"amount": number}                              | TRANSACTION                | Create pay transaction       |
| /cards/:id/fill              | POST   | {"amount": number}                              | TRANSACTION                | Create fill transaction      |
| /cards/:id/transfer          | POST   | {"cardId": number, "amount": number}            | [TRANSACTION, TRANSACTION] | Create transfer (card2card)  |
| /transactions                | GET    |                                                 | [TRANSACTION, ...]         | All transactions           |
CARD
```
{
	"id": number,
	"balance": number,
	"cardNumber": string
}
```

TRANSACTION
```
{
	"id": number,
	"cardId": number,
	"type": "paymentMobile"|"prepaidCard"|"card2Card",
	"data": string,
	"time": string,
	"sum": number
}
```
