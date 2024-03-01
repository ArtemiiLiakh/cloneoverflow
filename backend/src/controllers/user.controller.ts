import { UserService } from "../services/user.service";
import { UserMapper } from "../mappers/user.mapper";
import { AuthRequest } from "../types/Requests";
import { UserUpdateDto } from "../dtos/user.update.dto";
import { UserUpdateResponse } from "../responses/userUpdate.response";
import { Response } from "express";

export class UserController {
  constructor(
    private userService = new UserService(),
    private userMapper = new UserMapper(),
  ) {
  }

  async update(req: AuthRequest<UserUpdateDto>, res: Response<UserUpdateResponse>) {
    const user = await this.userService.update(req.params.userId, req.body);
    res.send(this.userMapper.update(user));
  }

}