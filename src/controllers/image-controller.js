import imageData from "../models/image-model.js";

const getImage = async (req, res) => {
  try {
    const getItems = await imageData.find();
    res.status(200).json({ message: "Well done", getItems });
  } catch (error) {
    res.status(500).json({ message: "Fix errors", error });
  }
};





export default getImage;
