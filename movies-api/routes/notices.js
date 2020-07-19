const express = require('express');

const NoticesService = require('../services/notices');
const {
    noticeIdSchema,
    createNoticeSchema,
    updateNoticeSchema,

} = require('../utils/schemas/notices');

const cacheResponse = require('../utils/cacheResponse.js');
const {FIVE_MINUTES_IN_SEC , SIXTY_MINUTES_IN_SEC} = require('../utils/time');

const validationHandler = require('../utils/middleware/validationHandler');


function noticesApi(app) {
    const router = express.Router();
    app.use("/api/notices", router);

    const noticesService = new NoticesService();

    router.get("/", async function (req, res, next) {
        cacheResponse(res,FIVE_MINUTES_IN_SEC);

        const { description } = req.query;

        try {
            const notices = await noticesService.getnotices({ description });
            //throw new Error('Error Prueba');

            res.status(200).json({
                data: notices,
                message: "notices listed"
            })

        } catch (error) {
            next(error);
        }
    });

    router.get("/:noticeId", validationHandler({ noticeId: noticeIdSchema }, 'params'), async function (req, res, next) {
        cacheResponse(res,SIXTY_MINUTES_IN_SEC);

        const { noticeId } = req.params;
        try {
            const notices = await noticesService.getNotices({ noticeId });

            res.status(200).json({
                data: notices,
                message: "notice retreved"
            })

        } catch (error) {
            next(error);

        }
    });

    router.post("/", validationHandler(createNoticeSchema), async function (req, res, next) {
        const { body: notice } = req;
        try {
            const createdNoticeId = await noticesService.createNotice({ notice });
            res.status(200).json({
                data: createdNoticeId,
                message: "notice created"
            })

        } catch (error) {
            next(error);

        }
    });

    router.put("/:noticeId", validationHandler({ noticeId: noticeIdSchema }, 'params'), validationHandler(updateNoticeSchema), async function (req, res, next) {
        const { body: notice } = req;
        const { noticeId } = req.params;



        try {
            const updatedNoticeId = await noticesService.updateNotice({ noticeId, notice });

            res.status(200).json({
                data: updatedNoticeId,
                message: "notice edited"
            })

        } catch (error) {
            next(error);

        }
    });
}