import { Schema, model } from "mongoose";

const Image = new Schema({
 
  title: {
    type: Schema.Types.String,
  },
  thumbnail: {
    tranding: {
      small: {
        type: Schema.Types.String,
      },
      large: {
        type: Schema.Types.String,
      },
    },
    regular: {
      small: {
        type: Schema.Types.String,
      },
      medium: {
        type: Schema.Types.String,
      },
      large: {
        type: Schema.Types.String,
      },
    },
  },
  year: {
    type: Schema.Types.Number,
  },
  category: {
    type: Schema.Types.String,
  },
  rating: {
    type: Schema.Types.String,
  },
  isBookmarked: {
    type: Schema.Types.Boolean,
  },
  isTrending: {
    type: Schema.Types.Boolean,
  },
});

const imageData = model("Image", Image);

export default imageData;
