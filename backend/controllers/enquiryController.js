

//===============20 jan=============


import Enquiry from "../models/Enquiry.js";

// CREATE ENQUIRY (Public / Website)
export const createEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    res.status(201).json(enquiry);
  } catch (error) {
    res.status(500).json({ message: "Failed to create enquiry" });
  }
};

// GET ALL ENQUIRIES (CRM)
export const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find()
      .sort({ createdAt: -1 })
      .populate("assignedTo", "name email");

    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch enquiries" });
  }
};

// UPDATE ENQUIRY STATUS
export const updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(enquiry);
  } catch (error) {
    res.status(500).json({ message: "Failed to update enquiry status" });
  }
};

// UPDATE SALE DATA - NEW CONTROLLER
export const updateSaleData = async (req, res) => {
  try {
    const { 
      saleStatus, 
      saleAmount, 
      costPrice, 
      sellingPrice, 
      profit 
    } = req.body;

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      {
        saleStatus,
        saleAmount,
        costPrice,
        sellingPrice,
        profit
      },
      { new: true }
    );

    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    res.json({
      message: "Sale data updated successfully",
      enquiry
    });
  } catch (error) {
    console.error("Error updating sale data:", error);
    res.status(500).json({ message: "Failed to update sale data" });
  }
};

// DELETE ENQUIRY
export const deleteEnquiry = async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete enquiry" });
  }
};