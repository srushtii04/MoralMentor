const express = require("express");
const Resource = require("../models/Resource");
const router = express.Router();

// ✅ Get All Resources
router.get("/", async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: "Error fetching resources", error });
  }
});

// ✅ Add New Resource
router.post("/", async (req, res) => {
  try {
    const { title, description, fileUrl, addedBy } = req.body;

    const newResource = new Resource({ title, description, fileUrl, addedBy });
    await newResource.save();

    res.status(201).json({ message: "Resource added successfully", newResource });

  } catch (error) {
    res.status(500).json({ message: "Error adding resource", error });
  }
});

// ✅ Delete Resource (Admin only)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Resource.findByIdAndDelete(id);
    res.status(200).json({ message: "Resource deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting resource", error });
  }
});

module.exports = router;
