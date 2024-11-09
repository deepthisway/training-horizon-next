const express = require("express");
const router = express.Router();
const { Orders } = require("../models/orders");
const zod = require("zod");
const {authMiddleware} = require("../middleware/authMiddleware")
const axios = require("axios")

router.post("/checkout", authMiddleware, async function (req, res) {
  const userId = req.userId
  try {
    const newOrderData = {
      ...req.body,
      user: userId,
    };
    const newOrder = new Orders(newOrderData);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/getAllOrders", async function(req, res){
  try{
    const orders = await Orders.find();
    if(!orders){
      return res.status(404).json({
        message: "Orders not found"
      })
    }

    const ordersWithPrices = await Promise.all(
      orders.map(async (orderDoc) => {
        const order = orderDoc.toObject(); // Convert to plain object
        if (!order.listingId) {
          return { ...order, price: null };
        }
    
        try {
          const listingResponse = await axios.get(`http://localhost:3005/api/v1/listing/listing/${order.listingId}`);
          const { price } = listingResponse.data.listing;
          return { ...order, price };
        } catch (error) {
          console.error(`Error fetching price for listingId ${order.listingId}:`, error.message);
          return { ...order, price: null };
        }
      })
    );
    res.status(200).json({
      message: "Orders retrieved successfully",
      orders: ordersWithPrices,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching orders or listing details",
      error: error.message || error,
    });
  }
});

router.get("/getOrdersByUserId/:userId", async function (req, res){
  const {userId} = req.params;
  try{
    const orders = await Orders.find({user: userId});
    if(!orders){
      return res.status(404).json({
        message: "User Not Found",
      })
    }

    res.status(200).json({
      message: "Orders retrieved successfully",
      orders,
    })
  }
  catch(error){
    res.status(500).json({
      message: "Error fetching orders",
      error: error,
    })
  }
})

router.get("/getOrdersDetailsByUserId/:userId", async function (req, res) {
  const { userId } = req.params;
  try {
    // Find orders associated with the user ID
    const orders = await Orders.find({ user: userId });
    if (!orders) {
      return res.status(404).json({
        message: "No orders found for the given user ID",
      });
    }

    // Iterate over each order and fetch the price based on listingId
    const ordersWithPrices = await Promise.all(
      orders.map(async (orderDoc) => {
        const order = orderDoc.toObject(); // Convert to plain object
        if (!order.listingId) {
          return { ...order, price: null };
        }
    
        try {
          const listingResponse = await axios.get(`http://localhost:3005/api/v1/listing/listing/${order.listingId}`);
          const { price } = listingResponse.data.listing;
          // const price = listingResponse?.data?.listing?.price || null;
          return { ...order, price };
        } catch (error) {
          console.error(`Error fetching price for listingId ${order.listingId}:`, error.message);
          return { ...order, price: null };
        }
      })
    );
    res.status(200).json({
      message: "Orders retrieved successfully",
      orders: ordersWithPrices,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching orders or listing details",
      error: error.message || error,
    });
  }
});

router.get("/getOrderById/:orderId", async function (req, res){
  const {orderId} = req.params;
  try{
    const orders = await Orders.findById(orderId);
    if(!orders){
      return res.status(404).json({
        message: "Order Not Found",
      })
    }

    res.status(200).json({
      message: "Order retrieved successfully",
      orders,
    })
  }
  catch(error){
    res.status(500).json({
      message: "Error fetching order",
      error: error,
    })
  }
})

router.get("/getOrderDetailsByOrderId/:orderId", async function (req, res) {
  const { orderId } = req.params;
  try {
    // Fetch a single order by its ID
    const order = await Orders.findById(orderId);
    if (!order) {
      return res.status(404).json({
        message: "Order Not Found",
      });
    }

    // Convert to plain object
    const orderObj = order.toObject();

    // Check if there's a listingId to fetch the listing details
    if (!orderObj.listingId) {
      return res.status(200).json({
        message: "Order retrieved successfully",
        order: { ...orderObj, price: null, title: null }, // Return order with null price and title
      });
    }

    // Fetch listing details based on listingId
    try {
      const listingResponse = await axios.get(`http://localhost:3005/api/v1/listing/listing/${orderObj.listingId}`);
      const { price, title } = listingResponse.data.listing;

      // Return the order details along with the fetched listing details
      return res.status(200).json({
        message: "Order retrieved successfully",
        order: { ...orderObj, price, title },
      });
    } catch (error) {
      console.error(`Error fetching listing for orderId ${orderId}:`, error.message);
      return res.status(200).json({
        message: "Order retrieved successfully, but listing details could not be fetched",
        order: { ...orderObj, price: null, title: null },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error fetching orders or listing details",
      error: error.message || error,
    });
  }
});



module.exports = router;