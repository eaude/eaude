import * as mongoose from 'mongoose'
const Schema = mongoose.Schema

const postSchema = new Schema({
  caption: String,
  image: {
    bucketUrl: {
      required: true,
      type: String
    },
    key: {
      required: true,
      type: String
    },
    size: {
      width: { type: Number, required: true  },
      height: { type: Number, required: true }
    }
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

// on save hook execute image blur call lambda function and then update the document

export const Model = mongoose.model('Post', postSchema)