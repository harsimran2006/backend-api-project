export class Post {
    constructor(
        public id: string,
        public title: string,
        public body: string,
        public userId: string,
        public createdAt: Date = new Date()
    ) { }
}