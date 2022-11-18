import { MessageAudioElement, MessageElement, MessageImageElement, MessageTextElement, MessageVideoElement, MessageYoutubeElement, Post, PostData, PostMessage } from '../post.model';

export class PostMapper {
  map(data: PostData): Post {
    return {
      ...data,
      message: this.parseMessage(`${data.message} ${data.attachementUrl ? data.attachementUrl : ''}`)
    }
  }

  private parseMessage(message: string): PostMessage {
    const pictureRegex = /http[s]?:\/\/.+\.(jpeg|jpg|png|gif)/gmi;

    const videoRegex = /http[s]?:\/\/.+\.(mp4|wmv|flv|avi|wav)/gmi;

    const audioRegex = /http[s]?:\/\/.+\.(mp3|ogg|wav)/gmi;

    const youtubeRegex = /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;;
    const attachements: MessageElement[] = [];

    const pictureMatche = pictureRegex.exec(message);
    if (pictureMatche) {
      attachements.push({type: 'image', url: pictureMatche[0]});
      message = message.substring(0, pictureMatche.index);
    }

    const videoMatche = videoRegex.exec(message)
    if (videoMatche) {
      attachements.push({type: 'video', url: videoMatche[0]});
      message = message.substring(0, videoMatche.index);
    }

    const audioMatche = audioRegex.exec(message)
    if (audioMatche) {
      attachements.push({type: 'audio',url: audioMatche[0]});
      message = message.substring(0, audioMatche.index);
    }

    const youtubeMatche = youtubeRegex.exec(message)
    if (youtubeMatche) {
      attachements.push({type: 'youtube', videoId: youtubeMatche[0]});
      message = message.substring(0, youtubeMatche.index - 1);
    }

    return {
      text: {
        type: 'text',
        content: message
      } as MessageTextElement,
      attachements
    };
  }
}
