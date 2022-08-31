import jwt from 'jsonwebtoken'
import tokenModel from '../models/token-model.js'

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
}

export default TokenService
