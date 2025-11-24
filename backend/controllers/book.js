const Borrow = require('../models/Book.js')
const User = require('../models/User.js')

//@desc Get all books or search books
//@route    GET /api/v1/books
//@access   Public
exports.getBooks = async (req, res, next) => {
    try {
        const searchTerm = req.query.term;
        let searchResults;

        if (!searchTerm) {
            searchResults = await Book.find({})
                .select('name author desc status cover');
        } else {
            searchResults = await Book.find({
                $or: [
                    { name: { $regex: searchTerm, $options: 'i'} },
                    { author: { $regex: searchTerm, $options: 'i'} },
                    { desc: { $regex: searchTerm, $options: 'i'} }
                ]
            })
            .select('name author desc status cover');
        }

        return res.status(200).json({
            success: true,
            count: searchResults.length,
            data: searchResults
        });

    } catch (err) {
        console.error("Error fetching books:", err.message);
        
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error during book retrieval.'
        });
    }
};
