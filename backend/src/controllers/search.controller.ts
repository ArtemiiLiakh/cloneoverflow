import { SearchMapper } from "@/mappers/search.mapper";
import { QuestionService } from "@/services/question.service";
import { TagsService } from "@/services/tags.service";
import { Query } from "@/types/Requests";
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