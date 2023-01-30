

export const getAllProducts = (req, res, next) => {
    res.status(200).json({
        message: 'All Products',
        success: true,
    });
}