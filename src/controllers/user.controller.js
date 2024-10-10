const user_service = require("../services/user.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const register = async (req, res) => {
  const reqbody = req.body;
  console.log("🚀 ~ register ~ reqbody:", reqbody);
  try {
    if (!reqbody) {
      return res.status(400).json({ message: "Invalid request body" });
    }
    const UserExists = await user_service.findemail(reqbody.Email);
    if (UserExists) {
      return res.status(400).json({ message: "email already exists" });
    }
    const bcrpass = await bcrypt.hash(reqbody.Password, 10);
    console.log("🚀 ~ register ~ bcrpass:", bcrpass)
    const body = {
      Username: reqbody.Username,
      Email: reqbody.Email,
      Password: bcrpass
    }
    console.log("🚀 ~ register ~ body:", body)
    const user = await user_service.register(body);
    console.log("🚀 ~ register ~ user:", user)
    return res
      .status(200)
      .json({ message: "User registered successfully", user });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};


// login
const login = async (req, res) => {
  try {
    const body = req.body;
    console.log("🚀 ~ login ~ body:", body);
    const Password = req.body.Password;
    console.log("🚀 ~ login ~ Password:", Password);
    const user = await user_service.findemail(body.Email);

    console.log("🚀 ~ login ~ body.Email:", body.Email);
    console.log("🚀 ~ login ~ user:", user);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const bcryptpass = await bcrypt.compare(Password, user.Password);
    if (!bcryptpass) {
      return res.status(404).json({ message: "Incorrect Password" });
    }
    const payload = {
      _id: user._id,
      email: user.Email
    };
    console.log("🚀 ~ login ~ payload.email:", payload);
    const token = jwt.sign(payload, process.env.SECRET_key, {
      expiresIn: "1d",
    });
    const toke = res.cookie("token", token)
    console.log("🚀 ~ login ~ token:", token);
    res.status(200).json({ message: "User Login Successful", token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signup = async (req, res) => {
  console.log("==================================== Signup ====================================");
  const reqbody = req.body;
  console.log("🚀 ~ register ~ reqbody:", reqbody);
  try {
    if (!reqbody) {
      return res.status(400).json({ message: "Invalid request body" });
    }
    const UserExists = await user_service.findemail(reqbody.Email);
    if (UserExists) {
      return res.status(400).json({ message: "email already exists" });
    }
    const bcrpass = await bcrypt.hash(reqbody.Password, 10);
    const otp = Math.floor(1000 + Math.random() * 9000);
    const otpsed = send_otp(reqbody.Email, otp);
    const body = {
      Username: reqbody.Username,
      Email: reqbody.Email,
      Password: bcrpass,
      Birthdate: reqbody.Birthdate,
      OTP: otp,
      Rol: reqbody.rol
    };
    console.log("🚀 ~ register ~ body:", body)
    const admin = await user_service.register(body)
    console.log("🚀 ~ register ~ Admin:", admin)
    return res
      .status(200)
      .json({ message: "Admin registered successfully", admin });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// adminupdate
const adminupdate = async (req, res) => {

  const userid = req.params.userId;
  console.log("🚀 ~ userupdate ~ userid:", userid);
  try {
    const UserExists = await user_service.findId(userid);
    console.log("🚀 ~ userupdate ~ UserExists:", UserExists);
    if (!UserExists) {
      return res.status(404).json({ message: "User Not exists" });
    }
    const body = {};
    if (req.body) {
      body.Name = req.body.Name;
      body.Email = req.body.Email;
      body.Active = req.body.Active;
    }
    const userupdate = await user_service.userupdate(userid, body);
    return res.status(200).json({ message: "User Updated Successfully" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}


// admindelete
const admindelete = async (req, res) => {

  const userid = req.params.userId;
  try {
    const userExists = await user_service.findId(userid);
    if (!userExists) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const usrer = await user_service.deleteUser(userid);
    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

module.exports = {
  register,
  login,

  signup,
  adminupdate,
  admindelete
};