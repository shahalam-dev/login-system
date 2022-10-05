# login-system

## an assessment task from (kalpas)

---

### setup env File variables

```
PORT =
DB_USER =
DB_PASS =
TWILIO_ACCOUNT_SID =
TWILIO_AUTH_TOKEN =
TWILIO_PHONE_NUMBER =
```

### Sign-Up API End-Point

```
[base url]/user/sign-up
method : POST
// Data Structure

{
    "user_cell_number" : "[phone number]",
    "user_password" : "[password]"
}

```

### Sign-In API End-Point

```
[base url]/user/sign-in
method : POST
// Data Structure

{
    "user_cell_number" : "[phone number]",
    "user_password" : "[password]"
}
```

### OTP verify End-Point

```
[base url]/user/opt-verify
method : POST
// Data Structure


{
    "user_cell_number" : "[phone number]",
    "otp" : "[OTP]"
}

```
