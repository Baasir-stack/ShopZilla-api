const Product = require("../models/productModel");
// const jsonProducts = require('../../vite-project/data/prada-man.json')

//@desc Create Product
//@route POST /api/v1/products
const createProduct = async (req, res) => {
    console.log(req.user)
  if (!req.body) {
    res.status(401);
    throw new Error("All fields must be filled");
  }
  try {
    const {title,desc,img,categories,size,color,price} =req.body
    const product = await Product.create({
        title,
        desc,
        img,
        categories,
        size,
        color,
        price,
        createdBy:req.user.id
    });

    return res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message, stackTrace: error.stack });
  }

  // const insertedProducts = await Product.insertMany(jsonProducts)
  // return res.status(201).json({ message: 'Products uploaded successfully', insertedProducts });
};




//@desc Update Product
//@route POST /api/v1/products/:id



const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      throw new Error("Please provide the product ID");
    }

    const updateData = req.body;
   

    if (!updateData) {
      throw new Error("All fields must be filled");
    }

    const updatedProd = await Product.findByIdAndUpdate(
      productId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedProd) {
      throw new Error("Product not found");
    }

    console.log("Updated product:", updatedProd); // Check if the updated product is logged correctly

    return res.status(200).json(updatedProd);
  } catch (error) {
    res.status(500).json({ error: error.message, stackTrace: error.stack });
  }
  //code to change all img src 
  // try {
  //   const products = await Product.find();
  
  //   // Update each product's img field
  //   for (const product of products) {
  //     // Modify the img field by replacing the path
  //     if (product.img.includes('../src/assets')) {
  //       product.img = product.img.replace('../src/assets', '/assets');
  //     }
      
  //     // Save the updated product
  //     await product.save();
  //   }
    
  //   console.log('All product images updated.');
  // } catch (error) {
  //   console.error('Error updating product images:', error);
  // } 
}


//DELETE
const deleteProduct = async (req, res) => {
  try {
    if (!req.params.id) {
      throw new Error("Please provide the product ID");
    }
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (error) {
    res.status(500).json({ error: error.message, stackTrace: error.stack });
  }
};

//GET A PRODUCT
const getIndividualProduct = async (req, res) => {
  try {
    if (!req.params.id) {
      throw new Error("Please provide the product ID");
    }
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message, stackTrace: error.stack });
  }
};



//GET ALL PRODUCTS
const getAllProducts =  async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
      let products;
  
      if (qNew) {
        products = await Product.find().sort({ createdAt: -1 }).limit(1);
      } else if (qCategory) {
        products = await Product.find({
          categories: {
            $in: [qCategory],
          },
        });
      } else {
         products = await Product.find();
      }
  
      res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ error: error.message, stackTrace: error.stack });

    }
  };

module.exports = { 
    createProduct, 
    updateProduct,
     deleteProduct, 
     getIndividualProduct,
     getAllProducts
     };
