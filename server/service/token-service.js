import tokenModel from '../models/token-model.js'
import jwt from 'jsonwebtoken'
class TokenService {
  static generateTokens(payload) {
    const accessToken = jwt.sign(
      { ...payload },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: '30min'
      }
    )
    const refreshToken = jwt.sign(
      { ...payload },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: '30d'
      }
    )
    return {
      accessToken,
      refreshToken
    }
  }

  static validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      return userData
    } catch (e) {
      console.log(e)
    }
  }

  static validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
      return userData
    } catch (e) {
      console.log(e)
    }
  }

  static async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ user: userId })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    const token = await tokenModel.create({ user: userId, refreshToken })
    return token
  }
  static async removeToken(refreshToken) {
    const tokenData = await tokenModel.deleteOne({ refreshToken })
    return tokenData
  }

  static async findToken(refreshToken) {
    const tokenData = await tokenModel.findOne({ refreshToken })
    return tokenData
  }
}

export default TokenService
