import UserModel from '../models/user-model.js'
import bcrypt from 'bcrypt'
import UserDto from '../dtos/user-dto.js'
import ApiError from '../exceptions/api-error.js'
import TokenService from './token-service.js'

class UserService {
  static async registration(email, password, login) {
    const condidate = await UserModel.findOne({ email })
    if (condidate) {
      throw ApiError.BadRequest(
        `Пользователь с таким почтовым адресом ${email} существует`
      )
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const user = await UserModel.create({
      email,
      password: hashPassword,
      login
    })
    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({ ...userDto })
    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }

  static async login(email, password) {
    const user = await UserModel.findOne({ email })
    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким Email не найден')
    }
    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
      throw ApiError.BadRequest('Пароль неверный')
    }
    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({ ...userDto })

    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }

  static async logout(refreshToken) {
    return await TokenService.removeToken(refreshToken)
  }

  static async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }
    const userData = TokenService.validateRefreshToken(refreshToken)
    const tokenFromDB = await TokenService.findToken(refreshToken)
    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError()
    }

    const user = await UserModel.findById(userData.id)
    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({ ...userDto })

    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }
}

export default UserService
