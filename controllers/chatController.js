
module.exports = {


     chat(req, res) {


        res.render('chat', {
            targetUserId: req.params.userId,
            //myUserId: req.user.id
        });

    },

}