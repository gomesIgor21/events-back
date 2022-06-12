# ROTAS

## Users
```
POST - /u/register/guest

{
  "user":{
    "username": <example@gmail.com>
    "password": <123456>,
    "role": "guest"
  },
  "guest":{
    "name": <Example Name>
    "phone": <45998899889>
  }
}
```

```
POST - /u/register/organizers

{
  "user":{
    "username": <example@gmail.com>
    "password": <123456>,
    "role": "guest"
  },
  "guest":{
    "name": <Example Name>
    "phone": <45998899889>
  }
}
```

```
GET - /u/:id

{
  "user": {
    "id": 1,
    "username": <username>,
    "role": <role>
  }
}
```