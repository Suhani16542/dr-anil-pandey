import mongoose, { Schema, Document, Model } from "mongoose";

export type InquiryStatus = "New" | "Contacted" | "Resolved";

export interface IInquiry extends Document {
  name: string;
  phone?: string;
  email: string;
  message: string;
  status: InquiryStatus;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema: Schema<IInquiry> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      lowercase: true,
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Resolved"],
      default: "New",
    },
    adminNotes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

InquirySchema.index({ status: 1, createdAt: -1 });

export const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry ||
  mongoose.model<IInquiry>("Inquiry", InquirySchema);
