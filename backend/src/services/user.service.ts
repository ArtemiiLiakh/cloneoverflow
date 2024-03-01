import { UserRepository } from "../repositories/user.repository";
import { UserUpdateDto } from "../dtos/user.update.dto";
import { BadBodyException } from "../utils/exceptions/BadBodyException";
import { NoEntityWithIdException } from "../utils/exceptions/NoEntityWithIdException";

export class UserService {
  constructor(private userRepository = new UserRepository(),
  ) {
  }

  async update(userId: string, {name, username, about, reputation, status}: UserUpdateDto) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NoEntityWithIdException('User');
    }
    const userExists = await this.userRepository.find({
      userProfile: {
        username: username,
      }
    })
    if (userExists.userProfile?.userId !== userId) {
      throw new BadBodyException("Username already exists");
    }

    await this.userRepository.updateById(userId, {
      userProfile: {
        update: {
          name: name,
          username: username,
          about: about,
          reputation: reputation,
          status: status,
        }
      }
    })
    return await this.userRepository.findById(userId);
  }
}