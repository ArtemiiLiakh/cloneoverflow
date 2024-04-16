import { SearchQuestionsDTO, SearchQuestionsResponse, SearchTagsDTO, SearchTagsReponse } from "@cloneoverflow/common";
import api from "..";
import urls from "../urls";

export class SearchService {
  static searchQuestion (query: SearchQuestionsDTO): Promise<SearchQuestionsResponse> {
    return api.get(urls.searchQuestion, {
      params: query,
    })
  }

  static searchTags (query: SearchTagsDTO): Promise<SearchTagsReponse> {
    return api.get(urls.searchTags, {
      params: query,
    })
  }
}