import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPatientNote extends Document {
  patientId: mongoose.Types.ObjectId;
  note: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const PatientNoteSchema: Schema<IPatientNote> = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "Patient reference is required"],
      index: true,
    },
    note: {
      type: String,
      required: [true, "Note content is required"],
      trim: true,
    },
    createdBy: {
      type: String,
      default: "Admin",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

PatientNoteSchema.index({ patientId: 1, createdAt: -1 });

export const PatientNote: Model<IPatientNote> =
  mongoose.models.PatientNote ||
  mongoose.model<IPatientNote>("PatientNote", PatientNoteSchema);
