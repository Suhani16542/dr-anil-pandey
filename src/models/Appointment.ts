import mongoose, { Schema, Document, Model } from "mongoose";

export type AppointmentStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled" | "No Show";

export interface IAppointment extends Document {
  patientId?: mongoose.Types.ObjectId;
  fullName: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  consultationType: string;
  appointmentType?: string;
  message?: string;
  status: AppointmentStatus;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema: Schema<IAppointment> = new Schema(
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
    preferredDate: {
      type: String,
      required: [true, "Preferred date is required"],
    },
    preferredTime: {
      type: String,
      required: [true, "Preferred time window is required"],
      default: "morning",
    },
    consultationType: {
      type: String,
      required: [true, "Consultation type is required"],
      default: "in-person",
    },
    appointmentType: {
      type: String,
      default: "General Consultation",
      trim: true,
    },
    message: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled", "No Show"],
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

// Indexes for fast searching and filtering
AppointmentSchema.index({ status: 1, createdAt: -1 });
AppointmentSchema.index({ email: 1 });
AppointmentSchema.index({ phone: 1 });
AppointmentSchema.index({ patientId: 1 });
AppointmentSchema.index({ fullName: "text", email: "text", phone: "text" });

export const Appointment: Model<IAppointment> =
  mongoose.models.Appointment ||
  mongoose.model<IAppointment>("Appointment", AppointmentSchema);
