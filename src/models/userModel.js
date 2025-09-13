import pool from "../config/db.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const getAllUsersService = async() => {
  const result = await pool.query('SELECT * FROM users')
  return result.rows;
};

export const getUserByIdService = async(id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id])
  return result.rows
};

export const createUserService = async(email,password,username,otp,otp_expiry) =>{
  const hashedPassword = await bcrypt.hash(password,10)
  const result = await pool.query('INSERT INTO users (email,password_hash,username,otp,otp_expiry) VALUES($1,$2,$3,$4,$5) RETURNING email,username,id', [email,hashedPassword,username,otp,otp_expiry]);
  return result.rows[0]
};

export const deleteUserService = async(id) => {
  const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id])
  return result.rows[0]
};

export const loginService = async(email) => {
  const result = await pool.query('SELECT email,username,is_active FROM users WHERE email = $1', [email])
  console.log(result.rows[0]);
  
  return result.rows[0]
};

export const isPasswordValid = async(enteredPass,dbPass) => {
  return await bcrypt.compare(enteredPass,dbPass)
};

export const generateAccessToken = async(email) => {
  const result = await pool.query('SELECT id,username,email FROM users WHERE email = $1', [email])
  const user =  result.rows[0]
  return jwt.sign({
      id: user.id,
     username : user.username,
     email: user.email
  },
  process.env.ACCESS_TOKEN_SECRET, 
  {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  }
)
}

export const generateRefreshToken = async(id) => {
  const result = await pool.query('SELECT id FROM users WHERE id = $1', [id])
  const user =  result.rows[0]
  return jwt.sign({
      id: user.id
  },
  process.env.REFRESH_TOKEN_SECRET, 
  {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
  }
)
}
