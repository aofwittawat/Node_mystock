const productService = require("../services/product.service");
//---------------------------------------------------------------------
const multer = require("multer");
const multerConfig = require("../configs/multer");
const upload = multer(multerConfig.config).single(multerConfig.keyUpload);
//---------------------------------------------------------------------

exports.getProducts = async (req, res) =>
  res.json(await productService.findAll());

exports.getProductByPrice = async (req, res) => {
  const { min, max } = req.query;
  res.json(await productService.findByPrice(min, max));
};

exports.getProduct = async (req, res) => {
  const result = await productService.findById(req.params.id);
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({});
  }
};

exports.addProduct = (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      console.log(`error: ${JSON.stringify(error)}`);
      return res.status(500).json({ messeage: error.messeage });
    }
    return res.status(201).json(await productService.add(req.body, req.file));
  });
};

exports.updateProduct = (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      console.log(`error: ${JSON.stringify(error)}`);
      return res.status(500).json({ messeage: error.messeage });
    }
    const result = await productService.update(
      req.params.id,
      req.body,
      req.file
    );
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({});
    }
  });
};

exports.deleteProduct = async (req, res) => {
  const result = await productService.remove(req.params.id);
  if (result) {
    res.status(204).json();
  } else {
    res.status(404).json({});
  }
};
