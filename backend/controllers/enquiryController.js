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
    res.status(500).json({ message: "Failed to update enquiry" });
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
