const bcrypt = require("bcrypt");
const User = require("../models/User");
const OTP = require("../models/OTP");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/passwordUpdated");

require("dotenv").config();

exports.sendotp = async (req, res) => {
  try {
    //taking email from the req body
    const { email } = req.body;

    //checking for the User
    const checkUserPresent = await User.findOne({ email: email });

    //if user found
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User Already Registered",
      });
    }

    //defining the otp functionality
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    //generating unique otp
    const result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
    }

    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    console.log("OTP BODY", otpBody);

    res.status(200).json({
      success: true,
      message: "OTP sent SuccessFully",
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.signup = async (req, res) => {
  try {
    //taking data from req body
    const { name, email, password, otp } = req.body;

    if (!email || !name || !password || !otp) {
      return res.status(400).json({
        success: false,
        message: "Please Enter All The details Carefully",
      });
    }

    //finding the user
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already Registered",
      });
    }

    //find the most recent otp
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

    console.log(response);

    //otp length is zero or otp not matches
    if (response.length === 0) {
      return res.status(400).json({
        success: false,
        message: "The OTP is Not Valid",
      });
    } else if (otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: "The OTP is Not Valid",
      });
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Error while hashing the password",
      });
    }

    console.log("OTP IS", response[0].otp);
    console.log("Hashed Pass is ", hashedPassword);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("I am Printing The user inside signUp", user);
    res.status(200).json({
      success: true,
      user,
      message: "User created SuccessFully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Errro While Creating The User ",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All The Data Should Be required",
      });
    }

    let user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.SECRET,
        {
          expiresIn: "24h",
        }
      );

      user.token = token;
      user.password = undefined;
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      });
    }else{
        return  res.status(401).json({
            success:false,
            message:"Password is Incorrect"
        })
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error while Login",
    });
  }
};
