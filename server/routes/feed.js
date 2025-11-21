const express = require('express');
const router = express.Router();
const db = require("../db"); //.js생략상태


router.get("/:userId", async (req, res) => {
    console.log("/feed/:userId 겟 라이우터 진입 /userId부분");
    let { userId } = req.params;

    try {
        // 1. 두개 쿼리 써서 리턴방식
        // let [list] = await db.query("SELECT * FROM tbl_user WHERE userId = ?", {userId})
        // let [cnt] = await db.query("SELECT count(*) FROM tbl_feed WHERE userId = ?", {userId})
        // res.json({
        //     user : list[0],
        //     cnt: cnt[0],
        // });

        // 2. 조인쿼리 만들어서 하나로 리턴
        let sql = "select *  "
            + "from tbl_feed F "
            + "INNER JOIN tbl_feed_img I ON F.ID = I.feedId "
            + "WHERE F.USERID = ? ";
        let [list] = await db.query(sql, [userId]);
        res.json({
            list: list,
            result: "success"
        })


    } catch (error) {
        console.log("에러발생함 ", error);
    }
})


module.exports = router;