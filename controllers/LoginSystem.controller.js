const LoginSystem = require("../models/LoginSystem-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const sendOPT = async (number, otp) => {
  try {
    const res = await client.messages.create({
      body: `Your verification code is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: number,
    });
    console.log(res);
  } catch (e) {
    console.log(e.messages);
  }
};

const signUp = (req, res) => {
  const { user_cell_number, user_password: pass } = req.body;
  const generatedOpt = Math.floor(1000 + Math.random() * 9000);

  if (pass.length > 6) {
    const run = async () => {
      try {
        const user_password = await bcrypt.hash(pass, 10);
        const userData = { user_cell_number, user_password, otp: generatedOpt };
        const user = await LoginSystem.create(userData);
        await sendOPT(user_cell_number, generatedOpt);
        res.send(user);
      } catch (e) {
        if (e.code === 11000) {
          res.send("This phone number has used.");
        } else {
          res.send("Enter a valid number");
        }
      }
    };
    run();
  } else {
    res.send("Password must be more than six digit");
  }
};

const logIn = (req, res) => {
  const { user_cell_number, user_password: pass } = req.body;

  const run = async () => {
    try {
      const user = await LoginSystem.find({ user_cell_number });
      const isValidPass = await bcrypt.compare(pass, user[0].user_password);
      if (isValidPass && user[0].is_verified) {
        const token = jwt.sign(
          { phone_number: user[0].nationalFormat },
          "secret"
        );
        res.send(token);
      } else {
        res.send("Phone number is not verified.");
      }
    } catch (e) {
      res.send("Enter a valid number");
    }
  };
  run();
};

const verify = (req, res) => {
  const { user_cell_number, otp } = req.body;

  const run = async () => {
    try {
      const user = await LoginSystem.find({ user_cell_number });
      if (user[0].otp === otp) {
        user[0].is_verified = true;
        user[0].save();
        res.send("Phone number has verified successfully.");
      } else {
        res.send("please enter valid OTP");
      }
    } catch (e) {
      res.send(e.messages);
    }
  };
  run();
};

exports.signUp = signUp;
exports.logIn = logIn;
exports.verify = verify;
