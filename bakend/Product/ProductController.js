import productModel from "./ProductsModel.js"

const products = [
    {
        name: 'Slim T-shirt',
        category: 'T-Shirts',
        image: '/images/P-1.jpg',
        price: 60,
        brand: 'H&M',
        rating: 4.5,
        numReviews: 10,
        countInstock:10,
        alias:"Slim T-shirt"
      },
      {
        name:'Suit',
        category:'Suits',
        image:'/images/P-2.jpg',
        price: 100,
        brand:'Armani',
        rating: 5,
        numReviews:10,
        countInstock:10,
        alias:"Suits"
      },
      {
        name:'Women Suit',
        category:'Suit',
        image:'/images/P-3.jpg',
        price:70,
        brand:'Armani',
        rating:4,
        numReviews:10,
        countInstock:10,
        alias:"New Suits"
      },
      {
        name:'Patns',
        category:'Patns',
        image:'/images/P-4.jpg',
        price:50,
        brand:'India',
        rating:3.5,
        numReviews:10,
        countInstock:10,
        alias:"Patns"
      },
      {
        name:'Kids Monsoon',
        category:'Kids',
        image:'/images/P-5.jpg',
        price:80,
        brand:'Nike',
        rating:4,
        numReviews:10,
        countInstock:10,
        alias:"Kids"
      },
      {
        name:'Kids Summer',
        category:'Kids',
        image:'/images/P-6.jpg',
        price:60,
        brand:"Levis",
        rating:2.5,
        numReviews:10,
        countInstock:10,
        alias:"New kids"
      }
]

class ProductController{



  
 async addProduct(req, res) {
  try {
    const product = req.body;

    // Custom validation
    if (!product.name || product.name.length < 3) {
      return res.status(400).json({ message: "Product name must be at least 3 characters long." });
    }
    if (!product.category) {
      return res.status(400).json({ message: "Category is required." });
    }
    if (!product.image) {
      return res.status(400).json({ message: "Image is required." });
    }
    if (typeof product.price !== "number" || product.price <= 0) {
      return res.status(400).json({ message: "Price must be a positive number." });
    }
    if (!product.brand) {
      return res.status(400).json({ message: "Brand is required." });
    }
    if (typeof product.rating !== "number" || product.rating < 0 || product.rating > 5) {
      return res.status(400).json({ message: "Rating must be between 0 and 5." });
    }
    if (typeof product.numReviews !== "number" || product.numReviews < 0) {
      return res.status(400).json({ message: "numReviews must be a non-negative number." });
    }
    if (typeof product.countInstock !== "number" || product.countInstock < 0) {
      return res.status(400).json({ message: "countInstock must be a non-negative number." });
    }
    if (!product.alias || product.alias.length < 3) {
      return res.status(400).json({ message: "Alias must be at least 3 characters long." });
    }

    // Insert product into DB
    const newProduct = await productModel.create(product);
    
    return res.status(201).json({ message: "Product added successfully", product: newProduct });

  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}


  async getProduct(req,res) {
    try {
      const result = await productModel.find({})
      if(result){
        return res.status(200).send({message:"Sucess", products:result})
      }
      return res.status(500).send({message:"Somthing went wrong"})

    } catch (error) {
      console.log(error)
      return res.status(500).send({message:"Internal server error"})
    }
  }

  async getProductbyId(req,res){
      try {
        const {id} = req.params
        if(!id){
        return  res.status(400).send({message:"Bad Request"})
        }
        const result = await productModel.findById({_id : id})
        if(result){
         return res.status(200).send({message:"Success",  Product:result})
        }
          return res.status(500).send({message:"Something went wrong"})
      } catch (error) {
        console.log(error)
        return res.status(500).send({message:"Internal server error"})
      }    
  }

  async GetCart(req,res){
    try {
       const {products} = req.body 
       if(!products){
        return res.status(400).send({message:"Missing dependency products"})
       }

       const cart = await productModel.find({_id:products}).select(["name","price","brand","countInstock","category","image"])

       if(!cart){
        return res.status(500).send({message:"Something went wrong"})
       }
       return res.status(200).send({message:"Sucess",products:cart})
    } catch (error) {
      console.log(error)
      return res.status(500).send({message:"Internal Server error"})
    }
  }

}

const productController = new ProductController()

export default productController