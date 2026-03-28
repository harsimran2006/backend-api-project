export class Comment {
    constructor(
        public id: string,
        public body: string,
        public postId: string,
        public userId: string,
        public createdAt: Date = new Date()
    ) { }
}