import mongoose, { Schema, Document, Model } from "mongoose";

export type FollowUpStatus = "Pending" | "Contacted" | "Scheduled" | "Completed" | "Missed";

export interface IFollowUp extends Document {
  patientId: mongoose.Types.ObjectId;
  lastVisitDate?: Date;
  followUpDate: Date;
  followUpReason: string;
  status: FollowUpStatus;
  assignedStaff?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const FollowUpSchema: Schema<IFollowUp> = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "Patient reference is required"],
      index: true,
    },
    lastVisitDate: {
      type: Date,
      default: null,
    },
    followUpDate: {
      type: Date,
      required: [true, "Follow-up date is required"],
      index: true,
    },
    followUpReason: {
      type: String,
      required: [true, "Follow-up reason is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Contacted", "Scheduled", "Completed", "Missed"],
      default: "Pending",
      index: true,
    },
    assignedStaff: {
      type: String,
      default: "Dr. Anil Pandey",
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

FollowUpSchema.index({ followUpDate: 1, status: 1 });
FollowUpSchema.index({ patientId: 1, followUpDate: -1 });

export const FollowUp: Model<IFollowUp> =
  mongoose.models.FollowUp || mongoose.model<IFollowUp>("FollowUp", FollowUpSchema);
