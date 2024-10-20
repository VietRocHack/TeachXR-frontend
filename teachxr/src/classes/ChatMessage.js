class ChatMessage {
    constructor(isFromUser = false, isImage = false, imageSrc = null, textMessage = null) {
        this.isFromUser = isFromUser;
        this.isImage = isImage;
        this.imageSrc = imageSrc;
        this.textMessage = textMessage;
    }
}

export default ChatMessage;