import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import {
  ApiResponse,
  TransportRequestPromise,
} from '@elastic/elasticsearch/lib/Transport';

import { MessageSearchResultInterface } from '../types/message.search-result.interface';
import { MessageSearchBodyInterface } from '../types/message.search-body.interface';
import { Message } from '../message.entity';

@Injectable()
export class MessageSearchService {
  readonly index: string = 'message';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexMessage(
    message: Message,
  ): Promise<TransportRequestPromise<ApiResponse>> {
    const creator = await message.creator;
    const room = await message.room;

    return this.elasticsearchService.index<
      MessageSearchResultInterface,
      MessageSearchBodyInterface
    >({
      index: this.index,
      body: {
        id: message.id,
        text: message.text,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
        creator,
        room,
      },
    });
  }

  async search(text: string): Promise<MessageSearchBodyInterface[]> {
    const { body } =
      await this.elasticsearchService.search<MessageSearchResultInterface>({
        index: this.index,
        body: {
          query: {
            multi_match: {
              query: text,
              fields: ['text'],
            },
          },
        },
      });

    const { hits } = body.hits;

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,no-underscore-dangle,@typescript-eslint/typedef
    return hits.map((item): MessageSearchBodyInterface => item._source);
  }
}
