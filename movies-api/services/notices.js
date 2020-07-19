const MongoLib = require('../lib/mongo');

class NoticesService {



    constructor(){
        this.collection = 'notices';
        this.mongoDb = new MongoLib();
    }

    async getNotices({noticeId}){
        const query = noticeId && {noticeId};
        const notices = await this.mongoDb.getAll(this.collection,query);

        return notices || [];
    }

    async createNotice({notice}){
        const createdNoticeId = await this.mongoDb.ceate(this.collection, notice);
        return createdNoticeId;
    }

    async deleteNotice({NoticeId}){
        const deletedNoticeId = await this.mongoDb.delete(this.collection, NoticeId);
        return deletedNoticeId;

    }

    async updateNotice({noticeId,notice} = {}){
        const updateNoticeId = this.mongoDB.update(this.collection , noticeId, notice);
        return updateNoticeId;
    }
}

module.exports = NoticesService;