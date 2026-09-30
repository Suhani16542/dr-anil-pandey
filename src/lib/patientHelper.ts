import { Patient, IPatient } from "@/models/Patient";

/**
 * Generate a sequential/unique Patient ID (e.g. PAT-1001, PAT-1002...)
 */
export async function generatePatientId(): Promise<string> {
  const count = await Patient.countDocuments();
  const baseNumber = 1000 + count + 1;
  let candidate = `PAT-${baseNumber}`;
  
  // Verify uniqueness just in case
  let exists = await Patient.findOne({ patientId: candidate }).lean();
  let counter = 1;
  while (exists) {
    candidate = `PAT-${baseNumber + counter}`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    exists = (await Patient.findOne({ patientId: candidate }).lean()) as any;
    counter++;
  }

  return candidate;
}

interface PatientLookupData {
  fullName: string;
  phone: string;
  email?: string;
  source?: string;
  reason?: string;
  notes?: string;
  gender?: "Male" | "Female" | "Other" | "Prefer not to say";
  dob?: string;
  age?: number;
  address?: string;
  city?: string;
}

/**
 * Find an existing patient by phone (normalized) or email.
 * If not found, create a new patient record with a generated Patient ID.
 */
export async function findOrCreatePatient(data: PatientLookupData): Promise<IPatient> {
  const cleanPhone = String(data.phone).trim();
  const cleanEmail = data.email ? String(data.email).trim().toLowerCase() : "";

  // 1. Try to find existing patient
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queryConditions: any[] = [{ phone: cleanPhone }];
  if (cleanEmail) {
    queryConditions.push({ email: cleanEmail });
  }

  let patient = await Patient.findOne({ $or: queryConditions });

  if (patient) {
    // If patient already exists, update email/name if missing
    let hasChanges = false;
    if (!patient.email && cleanEmail) {
      patient.email = cleanEmail;
      hasChanges = true;
    }
    if (data.reason && !patient.reasonForConsultation) {
      patient.reasonForConsultation = data.reason;
      hasChanges = true;
    }
    if (hasChanges) {
      await patient.save();
    }
    return patient;
  }

  // 2. Create new patient
  const patientId = await generatePatientId();

  patient = await Patient.create({
    patientId,
    fullName: String(data.fullName).trim(),
    phone: cleanPhone,
    email: cleanEmail,
    gender: data.gender || "Prefer not to say",
    dob: data.dob || "",
    age: data.age,
    address: data.address || "",
    city: data.city || "",
    reasonForConsultation: data.reason || "",
    notes: data.notes || "",
    patientSource: data.source || "Website Booking",
    status: "Active",
  });

  return patient;
}
