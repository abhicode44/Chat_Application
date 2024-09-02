const Messages = require("../models/messageModel");
const mongoose = require('mongoose');

module.exports.getMessages = async (req, res, next) => {
    try {
        const { from, to } = req.body;

        // Convert the string IDs to ObjectId using 'new'
        const fromObjectId = new mongoose.Types.ObjectId(from);
        const toObjectId = new mongoose.Types.ObjectId(to);

        const messages = await Messages.find({
            users: {
                $all: [fromObjectId, toObjectId],
            },
        }).sort({ updatedAt: 1 });

        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        });

        res.json(projectedMessages);
    } catch (ex) {
        next(ex);
    }
};

module.exports.addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;

        // Convert the string IDs to ObjectId using 'new'
        const fromObjectId = new mongoose.Types.ObjectId(from);
        const toObjectId = new mongoose.Types.ObjectId(to);

        const data = await Messages.create({
            message: { text: message },
            users: [fromObjectId, toObjectId],
            sender: fromObjectId,
        });

        if (data) return res.status(200).json({ msg: "Message added successfully." });
        else return res.status(500).json({ msg: "Failed to add message to the database" });
    } catch (ex) {
        next(ex);
    }
};