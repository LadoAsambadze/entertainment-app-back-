import imageData from "../models/image-model.js";

const tooggleBooked = async (req, res) => {
  try {
    const { title } = req.params;
    const booked = await imageData.findOne({ title });
    if (!booked) {
      res.status(404).json({ message: "Image not found" });
      return;
    }
    booked.isBookmarked = !booked.isBookmarked;
    await booked.save();
    res.status(200).json({ message: "Hellooo" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "It's an error", error });
  }
};

export default tooggleBooked;
