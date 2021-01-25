const Clarifai = require('clarifai')

const clarifai = new Clarifai.App({
    apiKey: '7654400b593d4ae0bffc10b35f5b5242'
});

const handleApiCall = (req, res) => {
    clarifai.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json('unable to work with api'))
}

const handleImageEntries = (req, res, db) => {
    const { id } = req.body;
    db('users').where({ id })
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImageEntries,
    handleApiCall
}