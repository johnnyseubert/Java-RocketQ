const Database = require('../db/config')

module.exports = {
    async create(req, res){
        const db = await Database()
        const pass = req.body.password
        let roomId = ''
        let isRoom = true

    
        while (isRoom == true) {
            // Gera o número da sala
            for(var i = 0; i < 6; i++){ roomId += Math.floor(Math.random() * 10).toString() }

            // Verificar se o número ja existe
            const roomsExistIds = await db.all(`SELECT id FROM rooms`)

            // O some é como um map ele olha item por item se houver pelo menos 1 igual ele ja retorna TRUE  
            isRoom = roomsExistIds.some(roomExistId => roomExistId === roomId)
            if (!isRoom) { await db.run(` INSERT INTO rooms (id,pass) values (${parseInt(roomId)},${pass})`) }
        }

        await db.close()
        res.redirect(`/room/${roomId}`)
    },

    async open(req, res){
        const db = await Database()
        const roomId = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)
        let isNoQuestions

        if (questions.length == 0) {
            if (questionsRead.length == 0) { isNoQuestions = true }
        }

        res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions})
    },


    enter(req, res){
        const roomId = req.body.idRoom
        res.redirect(`/room/${roomId}`)
    }


}