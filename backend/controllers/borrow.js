const Borrow = require('../models/Borrow.js')
const User = require('../models/User.js')

//@desc     See all borrowed books
//@route    GET /api/v1/borrows
//@access   Public
exports.getBorrows = async (req, res, next) => {
    try {
        
        borrows = await Borrow.find({});

        return res.status(200).json({
            success: true,
            data: borrows
        })

    } catch (err) {
        console.error("Error fetching borrowing instances:", err.message);
        
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error during borrowing instances retrieval.'
        });
    }
};


//@desc     Get specific book by id
//@route    GET /api/v1/books/:id
//@access   Public
exports.getBook = async (req, res, next) => {
    try {
        const bookId = req.params.id;

        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({
                success: false,
                error: `Book not found with ID: ${bookId}`
            });
        }

        return res.status(200).json({
            success: true,
            data: book
        });

    } catch (err) {
        console.error(`Error fetching book with ID ${req.params.id}:`, err.message);

        if (err.name === 'CastError') {
             return res.status(400).json({
                success: false,
                error: `Invalid Book ID format: ${req.params.id}`
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Internal Server Error during single book retrieval.'
        });
    }
};