import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PubSub } from '@google-cloud/pubsub';
import e from 'express';
import { uuid } from 'uuidv4'
const fs = require('fs');


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync("./swagger-spec.json", JSON.stringify(document));
  SwaggerModule.setup('/', app, document);
  
  const pubsub = new PubSub({
	  projectId: 'lab2-341310',
          credentials: {
              client_email: 'pubsubaccount@lab2-341310.iam.gserviceaccount.com',
              private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDDiPwNqj1yhDeS\njIHp2kIlEp4+UJo2qnC+5sQePATeoItsuMxhrFoaBxGy5T9uWvZpqk5XRnWBT2PB\nV3R7CaB5Hd9I4x+cZEFJhWia73OSKISYISNHwZqOvGnBMMNhvPDwK2LSHylyxrI3\nEvYrQwFy+cY1nC8tAkVbyu3kSe8KFyzE/U9JJGPaa9c+JFSpgL9j+Gqk5A4NiUWT\nkPcvsQ2XNB7b/bDgVM1PwinW7Kfvmz+1fM0TT6UIcF3CXwtky3f+/JRVl6l6r1an\npH1Zsb0y4hCSTgsiIYFnBXL6pNvJ4xD61wbQ81DKcIQiNR6BISFaG7l8PI7yJCZT\nw2jNeCDxAgMBAAECggEAVbipH2iBtcGHB2U30wiPNOd7nkABy3NfKCHM2qBfViY1\n2X0OhMdlXMG6nZ3o9/1Cx8IUxCgsfXsLdYhclU/8HPzelXqUsiA1iwDEgh/1n57J\nulPUvrF+i5LIHhy9mwyU6AVtNkbZCetX19MlPoQKj5g2r+v/tpCnTX2iWxGajOYl\n2ar2V/9fzap89b+YmvJi0dj7J5ddC0lANQdhsgfIRtx9RQOXCiM0CSft375pgr5s\nIbVpdZVKsojWGhjjcjmSennBIFxxZxdytY8odx44dFerFPbDeXIJsC0qSWt+yRlP\njLH5nUuyQ/vG90RTMB9Oknd7rGZ5ZjuFni62akThzQKBgQDhyj2kXK5GRdEfZ8Sk\nvBli1piqyMg+U+P+F+2J1zClLWY7CxaZBYe8knpjy1vKhmKOgZouh/Zme0RhD2ub\nx1X+8Gp4YARIjR54v3hV4PnJDO7yshiCZFHgHRYCwFxVnlaVbb6/YmHnygvGWu6P\nBOY5UoI/SBMt+iw/QfbkmxW0dwKBgQDdsnPlGVX6ZMNBDYzHXYe+UDK3k7wuXSnl\nESELzTr3uEUXAn+S1hFKHjujOhVrkow3xdbGr1tqev/E0tKrECtJ9PzErrdnofR3\nm8Js041ksDxGXgFVhgdF9PyF/XtWXITAbV6mObo/61aXoiBSlrdAXicvO+vPkvHf\nKO1KtUg31wKBgQDe261IA6qH9fVZGCUBrB8qbUG2oAL1cfwBGkD84odDIbJb6K/f\nTZQSTkm7IkdxeH7ixY0XDF/p+xUc8Al4cqGwxj9wnOTdb1x6NhJiQXKKPNfEeIC0\ngqxFlq/Y+2CnqWcwimfRoxubmtNQbwQz6dQLFCM2rr8vjFQMA+Ha9i/QNQKBgQCg\nlzDuhoDKZY0upVMR44V97XgflKue5it/2/2VH/AUG24osc2ZnuldSDMpFN0JVFmv\n2Oawe7v7kOePOqwR8B97bjRfgLQoJKACuFiJHmFwy1yOGHBc9D52hXUa1jguocwj\n29XREUYCIUZThsRlLvnFba5yv7QcY7RDU9E36cNLdwKBgQCgsmpBP9nQlLj8HL+9\nGl1V0XcLzJMOEjWGdb1GiQgr9KCjoFbY6YnJmk4SfGFJnT1XP1XNTqF5ZOT72srz\n70iQz7uWg0xacZCYcn1TIR6HIuFuR0vmqz7jg/pk73GHFWGKQNe2GFexpQD/c3aH\non8TKpwaHoGVGAbQjTCrLS1baA==\n-----END PRIVATE KEY-----\n'
            }
  });

    app.use(function(request, response, next) {
    const question = pubsub.topic('request_receiver')
    const answer = pubsub.topic('response_sender')

    let id = uuid()
    question.publish(Buffer.from(id)).then(x => {
          console.log('Request published whith id ' + id)
        })
    let subscription = answer.subscription('response_sender-sub')
    subscription.on('message', resp => {
      let message = resp.data.toString()
      let parsed = JSON.parse(message)
      if (parsed[id] == true) {
        console.log('Received positive response for ' + id)
        next()
        subscription.close()
      }
      else if (parsed[id] == false) {
        console.log('Received negative response for ' + id )
        response.status(400).json({error: true, message})
        subscription.close()
      }
    })

  })
   
  await app.listen(3000);
}
bootstrap();
