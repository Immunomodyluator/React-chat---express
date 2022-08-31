import UserModel from '../models/user-model.js'
import bcrypt from 'bcrypt'
import tokenService from './token-service.js'
import UserDto from '../dtos/user-dto.js'
import ApiError from '../exceptions/api-error.js'

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
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

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
    const tokens = tokenService.generateTokens({ ...userDto })

    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }

  static async logout(refreshToken) {
    return await tokenService.removeToken(refreshToken)
  }
  static async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }
  }
}

export default UserService
