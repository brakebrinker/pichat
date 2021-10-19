import { MessageSearchBodyInterface } from './message.search-body.interface';

export interface MessageSearchResultInterface {
  hits: {
    total: number;
    hits: Array<{
      _source: MessageSearchBodyInterface;
    }>;
  };
}
