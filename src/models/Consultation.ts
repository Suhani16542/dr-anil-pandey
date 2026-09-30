import mongoose, { Schema, Document, Model } from "mongoose";

export type ConsultationStatus = "Pending" | "Scheduled" | "In Progress" | "Confirmed" | "Completed" | "Cancelled";

export interface IConsultation extends Document {
  patientId?: mongoose.Types.ObjectId;
  fullName: string;
  phone: string;
  email: string;
  consultationOption: string;
  consultationType?: string;
  preferredDate: string;
  preferredTimeSlot: string;
  notes?: string;
  reason?: string;
  followUpDate?: string;
  status: ConsultationStatus;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ConsultationSchema: Schema<IConsultation> = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: false,
      index: true,
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      lowercase: true,
      trim: true,
    },
    consultationOption: {
      type: String,
      required: [true, "Consultation format is required"],
      default: "in-person",
    },
    consultationType: {
      type: String,
      default: "Clinical Consultation",
      trim: true,
    },
    preferredDate: {
      type: String,
      required: [true, "Preferred date is required"],
    },
    preferredTimeSlot: {
      type: String,
      required: [true, "Preferred time slot is required"],
      default: "10:00 AM",
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
    reason: {
      type: String,
      trim: true,
      default: "",
    },
    followUpDate: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Pending", "Scheduled", "In Progress", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
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

ConsultationSchema.index({ status: 1, createdAt: -1 });
ConsultationSchema.index({ email: 1 });
ConsultationSchema.index({ phone: 1 });
ConsultationSchema.index({ patientId: 1 });

export const Consultation: Model<IConsultation> =
  mongoose.models.Consultation ||
  mongoose.model<IConsultation>("Consultation", ConsultationSchema);
