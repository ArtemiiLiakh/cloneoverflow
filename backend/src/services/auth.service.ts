import { AuthLoginDTO } from '../dtos/auth.login.dto';
import { AuthSignInDTO } from '../dtos/auth.signin.dto';
import { UserRepository } from '../repositories/user.repository';
import { AlreadyRegisteredException } from '../utils/exceptions/AlreadyRegisteredException';
import { LoginException } from '../utils/exceptions/LoginExceptioin';
import { compare, hash } from '../utils/hash';

export class AuthService {
  constructor (
    private userRepository = new UserRepository(),
  ) {}

  async login ({ email, password }: AuthLoginDTO) {
    const user = await this.userRepository.find({
      email,
    });

    if (!user || await compare(password, user.password)) {
      throw new LoginException();
    }

    return user;
  }

  async signin ({ email, password, name, username, about }: AuthSignInDTO) {
    if (await this.userRepository.find({ email })) {
      throw new AlreadyRegisteredException();
    }

    const passwordHash = await hash(password);

    return this.userRepository.create({
      email,
      password: passwordHash,
      userProfile: {
        create: {
          name,
          username,
          about,
        },
      },
    });
  }
}