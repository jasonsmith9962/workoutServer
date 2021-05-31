const Express = require('express');
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { LogModel } = require('../models')

router.get('/practice', validateJWT, (req, res) => {
    res.send('Hey!! This is a practice route!')
});


router.post('/', validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.log;
    const { id } = req.user;
    const logEntry = {
        description,
        definition,
        result,
        owner_id: id
    }
    try {
        const newLog = await LogModel.create(logEntry);
        res.status(200).json(newLog);
    } catch (err) {
        res.status(500).json({ error: err });
    }
    LogModel.create(logEntry)
});

router.get("/", validateJWT, async (req, res) => {
    let { id } = req.user;
    try {
        const userLogs = await LogModel.findAll({
            where: {
                owner_id: id
            }
        });
        res.status(200).json(userLogs);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const results = await LogModel.findAll({
            where: { id: id }
        });
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.put('/:id', validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.log;
    
    try {
        const logUpdated = await LogModel.update(
            {description, definition, result}, {where: {id: req.params.id}}
        )
        res.status(200).json({
            message: `Log successfully updated!`,
            logUpdated
        })
    } catch(err) {
        res.status(500).json({
            message: `Failed to update log: ${err}`
        })
    }
});

router.delete('/:id', validateJWT, async (req, res) => {
    try {
        const locateLog = await LogModel.destroy({
            where: {id: req.params.id}
        })
        .then(result => {
            res.status(200).json({
                message: `Log deleted!`,
                deletedLog: result
            })
        })
    } catch (error) {
        res.status(500).json({
            message: `Unable to delete: ${error}`
        })
    }
})



module.exports = router;