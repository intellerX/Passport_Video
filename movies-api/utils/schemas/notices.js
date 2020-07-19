const joi = require('@hapi/joi');

const noticeIdSchema =  joi.string().regex(/^[0-9a-fA-F]{24}$/);

const noticeTitleSchema = joi.string().max(80);
const noticeCoverSchema = joi.string().uri();
const noticeDescriptionSchema = joi.string().max(500);

const createNoticeSchema = {
    title: noticeTitleSchema.required(),
    cover: noticeCoverSchema.required(),
    description: noticeDescriptionSchema.required(),

};

const updateNoticeSchema ={
    title: noticeTitleSchema,
    cover: noticeCoverSchema,
    description: noticeDescriptionSchema,

}; 

module.exports = {
    noticeIdSchema,
    createNoticeSchema ,
    updateNoticeSchema
};
