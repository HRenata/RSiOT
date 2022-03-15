import { Message } from '@google-cloud/pubsub';
import { EventPattern } from '@nestjs/microservices';
import { Controller, Get } from '@nestjs/common';
import { PubSub } from '@google-cloud/pubsub';

@Controller()
export class AppController {
  @EventPattern('response_sender')
   async handleMyTopicEvent(data: Message) {
        if (data.data.toString() == '0')
        {
          
        }
  }
}

