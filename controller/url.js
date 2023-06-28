const shortid = require("shortid");
const URL = require('../model/url');

async function generateNewShortURL(req, res) {
    const body = req.body;
    if(!body.originalUrl || !body.note) return res.status(400).json({error: "URL not found"})
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.originalUrl,
        note: body.note
    });

    return res.json({id: shortID});

}

async function getShortUrls(req, res) {
    const entries =  await URL.find({})
    return res.json({entries});

}

async function updateClicks(req,res) {
    const shortId = req.params.shortId;
    const entry =  await URL.findOneAndUpdate({shortId},{$inc:{clicks:1}})
    return res.json(entry)

}

async function searchNote(req,res) {
    const body = req.body;
    // const entry = await URL.aggregate([
    //     {
    //       $search: {
    //         index: 'note',
    //         text: {
    //           query: body.searchText,
    //           path: ['note'],
    //         },
    //       },
    //     },
    //   ])
    const obj = body.searchText
    const entry =  await URL.findOne({note:obj})
    return res.json(entry)
}



module.exports = {
    generateNewShortURL,
    getShortUrls,
    updateClicks,
    searchNote
}