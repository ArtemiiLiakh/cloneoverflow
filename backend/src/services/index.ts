import { PrismaDatabase } from "@/databases/prisma";
import { RedisDatabase } from "@/databases/redis";
import { GoogleService } from "@/google/google.service";
import { AnswerRepository } from "@/repositories/answer.repository";
import { QuestionRepository } from "@/repositories/question.repository";
import { TagsRepository } from "@/repositories/tags.repository";
import { UserRepository } from "@/repositories/user.repository";
import { AnswerService } from "./answer.service";
import { AuthService } from "./auth.service";
import { QuestionService } from "./question.service";
import { TagsService } from "./tags.service";
import { UserService } from "./user.service";

const prisma = new PrismaDatabase();
const redis = new RedisDatabase();

const userRepository = new UserRepository(prisma);
const answerRepository = new AnswerRepository(prisma);
const questionRepository = new QuestionRepository(prisma);
const tagsRepository = new TagsRepository(prisma);

const googleService = new GoogleService();

export const authService = new AuthService(googleService, userRepository, redis);
export const userService = new UserService(userRepository, answerRepository, questionRepository);
export const questionService = new QuestionService(userRepository, questionRepository, answerRepository, prisma);
export const answerService = new AnswerService(userRepository, answerRepository, questionRepository, prisma);
export const tagsService = new TagsService(tagsRepository);