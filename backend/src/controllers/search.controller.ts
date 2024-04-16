import { SearchQuestionsDTO, SearchQuestionsResponse, SearchTagsDTO, SearchTagsReponse } from "@cloneoverflow/common";
import { Query } from "../types/Requests";
import { Request, Response } from "express";
import { SearchMapper } from "../mappers/search.mapper";
import { QuestionService } from "../services/question.service";
import { TagsService } from "../services/tags.service";

export class SearchController {
  constructor (
    private searchMapper = new SearchMapper(),
    private questionService = new QuestionService(),
    private tagsService = new TagsService(),
  ) {}

  async getQuestions({ query }: Query<SearchQuestionsDTO>, res: Response<SearchQuestionsResponse>) {
    const { data, pagination } = await this.questionService.getAll(query);
    res.send({
      questions: this.searchMapper.getQuestions(data),
      pagination,
    });
  }

  async getTags ({ query }: Query<SearchTagsDTO>, res: Response<SearchTagsReponse>) {
    const { data, pagination } = await this.tagsService.getAll(query);

    res.send({
      tags: this.searchMapper.getTags(data),
      pagination,
    });
  }
}