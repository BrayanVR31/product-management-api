import { Schema, ObjectId, model } from "mongoose";

interface SchemaInt {
  id: ObjectId;
  name: string;
  createdAt: Date;
}

const schema = new Schema<SchemaInt>({
  name: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

schema.pre("find", () => {
  console.log("The query for find categories is active");
});

const Category = model<SchemaInt>("category", schema);

export default Category;
export { SchemaInt as CategoryInt, schema as CategoryScheme };
