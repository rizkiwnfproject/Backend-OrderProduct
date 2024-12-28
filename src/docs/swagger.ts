import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        version: "v0.0.1",
        title: "Dokumentasi API BukaToko",
        description: "Dokumentasi API BukaToko",
    },
    servers: [
        {
            url: "http://localhost:3000/api",
            description: "Local Server",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
            },
        },
        schemas: {
            LoginRequest: {
                email: "joni2024@yopmail.com",
                password: "123412341",
            },
            RegisterRequest: {
                fullName: "joni joni",
                username: "joni2024",
                email: "joni2024@yopmail.com",
                password: "123412341",
                confirmPassword: "123412341",
            },
            UpdateProfileRequest: {
                fullName: "joni joni",
                username: "joni2024",
                email: "joni2024@yopmail.com",
                password: "123412341",
                confirmPassword: "123412341",
            },
            ProductCreateRequest: {
                name: "Kemeja Variant 5",
                description: "Deskripsi kemeja variant 3",
                images: ["kemeja.jpg", "baju.jpg"],
                price: "20000",
                qty: "120",
                category: "6760e6e32c09d58beb0bc4f7",
                slug: "variant-3-slug"
            },
            CategoriesCreateRequest: {
                name: "kids",
            },
            OrderCreateRequest: {
                orderItems: [
                    {
                        product: "676138dd9b9fb5ee4cca0819",
                        quantity: "4"
                    }
                ]
            }

        },
    },
};


const outputFile = "./swagger_output.json";
const endpointsFiles = ["../routes/api.ts"];
swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);