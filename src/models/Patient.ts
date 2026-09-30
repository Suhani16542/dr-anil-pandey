import mongoose, { Schema, Document, Model } from "mongoose";

export type PatientStatus = "Active" | "Follow-up Required" | "Inactive" | "Archived";
export type PatientGender = "Male" | "Female" | "Other" | "Prefer not to say";

export interface IPatient extends Document {
  patientId: string;
  fullName: string;
  phone: string;
  email?: string;
  gender?: PatientGender;
  dob?: string;
  age?: number;
  address?: string;
  city?: string;
  emergencyContact?: {
    name?: string;
    phone?: string;
    relationship?: string;
  };
  reasonForConsultation?: string;
  currentConcerns?: string;
  relevantHistory?: string;
  allergies?: string;
  currentMedications?: string;
  previousTreatments?: string;
  notes?: string;
  patientSource?: string;
  assignedStaff?: string;
  status: PatientStatus;
  internalNotes?: string;
  lastVisitDate?: Date;
  nextFollowUpDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PatientSchema: Schema<IPatient> = new Schema(
  {
    patientId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      index: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      index: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", "Prefer not to say"],
      default: "Prefer not to say",
    },
    dob: {
      type: String,
      default: "",
    },
    age: {
      type: Number,
      min: 0,
      max: 130,
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    city: {
      type: String,
      trim: true,
      default: "",
    },
    emergencyContact: {
      name: { type: String, default: "" },
      phone: { type: String, default: "" },
      relationship: { type: String, default: "" },
    },
    reasonForConsultation: {
      type: String,
      trim: true,
      default: "",
    },
    currentConcerns: {
      type: String,
      trim: true,
      default: "",
    },
    relevantHistory: {
      type: String,
      trim: true,
      default: "",
    },
    allergies: {
      type: String,
      trim: true,
      default: "",
    },
    currentMedications: {
      type: String,
      trim: true,
      default: "",
    },
    previousTreatments: {
      type: String,
      trim: true,
      default: "",
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
    patientSource: {
      type: String,
      default: "Website",
      trim: true,
    },
    assignedStaff: {
      type: String,
      default: "Dr. Anil Pandey",
      trim: true,
    },
    status: {
      type: String,
      enum: ["Active", "Follow-up Required", "Inactive", "Archived"],
      default: "Active",
      index: true,
    },
    internalNotes: {
      type: String,
      trim: true,
      default: "",
    },
    lastVisitDate: {
      type: Date,
      default: null,
    },
    nextFollowUpDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Search indexes
PatientSchema.index({ fullName: "text", phone: "text", email: "text", patientId: "text" });
PatientSchema.index({ status: 1, createdAt: -1 });
PatientSchema.index({ phone: 1, email: 1 });

export const Patient: Model<IPatient> =
  mongoose.models.Patient || mongoose.model<IPatient>("Patient", PatientSchema);
