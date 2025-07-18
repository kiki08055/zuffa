import { z as validate } from 'zod'

export const reviewSchema = validate.object ({
    name: validate.string().min(1, "Name is required"),
    rating: validate.number().min(1).max(5).int("Rating must be between 1 and 5"),
    text: validate.string().min(1, "Review text required"),
    productId: validate.number().int("Collection id required")
});