import { Product } from "./types"

export const categories = ["oil", "food"]
export const products: Product[] = [{
    id: 1,
    title: "Tata Simply Better Groundnut (Peanut) Oil 1L | 100% Pure, Unrefined & Cold-pressed | Hexane-Free",
    brand: "Tata Simply Better ",
    category: "oil",
    description: "",
    stock: 20,
    rating: 4,
    reviews: [],
    media: [
        {
            url: "https://www.tatasimplybetter.com/cdn/shop/files/Groundnut_02_2048x2048.jpg?v=1723024595",
            public_id: "",
            type: "image"
        },
        {
            url: "https://www.tatasimplybetter.com/cdn/shop/files/01_1_2048x2048.png?v=1723024614",
            public_id: "",
            type: "image"
        }, {
            url: "https://www.tatasimplybetter.com/cdn/shop/files/03_5e31d40a-5b22-4e48-b049-f97db506cae1_2048x2048.jpg?v=1723024614",
            public_id: "",
            type: "image"
        },

    ],
    variants: [{ size: "250ml", price: 100, discont: 10 }, { size: "500ml", price: 200, discont: 15 }, { size: "1000ml", price: 300, discont: 15 }, { size: "250ml", price: 100, discont: 10 },],
    badge: "Best Seller",
    KeyBenefits: ["Boosts Immunity", "MCT Rich"],
    coupons: [{ discount: 10, coupon: "ORGANIC10" }]
},
]