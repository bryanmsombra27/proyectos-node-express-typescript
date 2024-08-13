import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "PRODUCTS REST API Node.js / Expresss / Typescript",
      description: "API DOCS  FOR PRODUCTS",
    },
    tags: [
      {
        name: "Products",
        description: "API operations related to products",
      },
    ],
  },
  apis: ["./src/routes/ProductRouter.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
