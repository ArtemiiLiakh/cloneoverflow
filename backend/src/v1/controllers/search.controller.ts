import { SearchMapper } from "@/v1/mappers/search.mapper";
import { QuestionService } from "@/v1/services/question.service";
import { TagsService } from "@/v1/services/tags.service";
import { Query } from "@/v1/types/Requests";
import { SearchQuestionsDTO, SearchQuestionsResponse, SearchTagsDTO, SearchTagsReponse } from "@cloneoverflow/common";
import { Response } from "express";

export class SearchController {
  constructor (
    private questionService: QuestionService,
    private tagsService: TagsService,
    private searchMapper = new SearchMapper(),
  ) {}

  async searchQuestions({ query }: Query<SearchQuestionsDTO>, res: Response<SearchQuestionsResponse>) {
    const { data, pagination } = await this.questionService.getAll(query);
    res.send({
      questions: this.searchMapper.getQuestions(data),
      pagination,
    });
  }

  async searchTags ({ query }: Query<SearchTagsDTO>, res: Response<SearchTagsReponse>) {
    const { data, pagination } = await this.tagsService.getAll(query);

    res.send({
      tags: this.searchMapper.getTags(data),
      pagination,
    });
  }
}