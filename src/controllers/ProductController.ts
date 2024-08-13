import { Request, Response } from "express";
import Product from "../models/Product.model";
import { check, validationResult } from "express-validator";

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAndCountAll({
      where: {
        availability: true,
      },
      order: ["id", "DESC"],
      attributes: ["name", "price", "id"],
    });

    return res.status(200).send({
      message: "success",
      products: products.rows,
      count: products.count,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "error",
    });
  }
};
const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({
      where: {
        id,
        availability: true,
      },
      attributes: ["name", "price", "id"],
    });

    if (!product) {
      throw new Error("No se encontro producto");
    }

    return res.status(200).send({
      message: "success",
      product: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "error",
      error: error.message,
    });
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    //validaciones  desde el controlador
    // await check("name")
    //   .notEmpty()
    //   .withMessage("El nombre del producto no puede ir vacio")
    //   .run(req);
    // await check("price")
    //   .isNumeric()
    //   .withMessage("debe ser un numero ")
    //   .custom((value) => value > 0)
    //   .withMessage("Precio no valido")
    //   .notEmpty()
    //   .withMessage("El precio del producto no puede ir vacio")
    //   .run(req);
    // let errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).send({
    //     status: "error",
    //     errors: errors.array(),
    //   });
    // }

    const product = await Product.create(req.body);

    return res.status(201).send({
      message: "success",
      data: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "error",
    });
  }
};
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.update(
      {
        ...req.body,
      },
      {
        where: {
          id,
        },
      }
    );

    if (!product) {
      throw new Error("No se encontro producto");
    }

    return res.status(200).send({
      message: "success",
      product: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "error",
      error: error.message,
    });
  }
};
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.update(
      {
        availability: false,
      },
      {
        where: {
          id,
        },
      }
    );

    if (!product) {
      throw new Error("No se encontro producto");
    }

    return res.status(200).send({
      message: "success",
      product: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "error",
      error: error.message,
    });
  }
};

export {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
