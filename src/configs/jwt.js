const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const privateKey = fs.readFileSync(
  path.join(__dirname, "../../s4t", "private.key")
);
const publicKey = fs.readFileSync(
  path.join(__dirname, "../../s4t", "public.key")
);

const signOptions = {
  issuer: "aofwittawat",
  audience: "http://aofwittawat.com",
  algorithm: "RS256",
};

const generateToken = (payload) =>
  jwt.sign(payload, privateKey, { ...signOptions, expiresIn: "30d" });

module.exports = {
  generateToken,
};
