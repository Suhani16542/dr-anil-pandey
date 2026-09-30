import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVisit extends Document {
  patientId: mongoose.Types.ObjectId;
  visitDate: Date;
  visitType: string;
  reason: string;
  consultationNotes?: string;
  findings?: string;
  treatmentNotes?: string;
  followUpRecommendation?: string;
  nextFollowUpDate?: Date;
  internalNotes?: string;
  recordedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const VisitSchema: Schema<IVisit> = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "Patient reference is required"],
      index: true,
    },
    visitDate: {
      type: Date,
      required: [true, "Visit date is required"],
      default: Date.now,
      index: true,
    },
    visitType: {
      type: String,
      required: [true, "Visit type is required"],
      default: "Consultation",
      trim: true,
    },
    reason: {
      type: String,
      trim: true,
      default: "",
    },
    consultationNotes: {
      type: String,
      trim: true,
      default: "",
    },
    findings: {
      type: String,
      trim: true,
      default: "",
    },
    treatmentNotes: {
      type: String,
      trim: true,
      default: "",
    },
    followUpRecommendation: {
      type: String,
      trim: true,
      default: "",
    },
    nextFollowUpDate: {
      type: Date,
      default: null,
    },
    internalNotes: {
      type: String,
      trim: true,
      default: "",
    },
    recordedBy: {
      type: String,
      default: "Dr. Anil Pandey",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

VisitSchema.index({ patientId: 1, visitDate: -1 });

export const Visit: Model<IVisit> =
  mongoose.models.Visit || mongoose.model<IVisit>("Visit", VisitSchema);
