import nodemailer from "nodemailer";

interface AppointmentEmailData {
  fullName: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  consultationType: string;
  message?: string;
}

interface ConsultationEmailData {
  fullName: string;
  phone: string;
  email: string;
  consultationOption: string;
  preferredDate: string;
  preferredTimeSlot: string;
  notes?: string;
}

function getTransporter() {
  const host = process.env.EMAIL_HOST;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD;
  const port = Number(process.env.EMAIL_PORT) || 587;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendAppointmentNotification(data: AppointmentEmailData): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@dranilpandey.com";
  const transporter = getTransporter();

  const textContent = `
NEW APPOINTMENT REQUEST RECEIVED - Dr. Anil Pandey Website

Patient Details:
----------------
Full Name: ${data.fullName}
Phone: ${data.phone}
Email: ${data.email}
Preferred Date: ${data.preferredDate}
Preferred Time: ${data.preferredTime}
Consultation Mode: ${data.consultationType}
Clinical Symptoms/Notes: ${data.message || "None provided"}

Please log in to the admin dashboard at /admin/appointments to confirm or review this booking.
`;

  if (!transporter) {
    console.log("[Email Service: Development Fallback Log] New Appointment Notification:", textContent);
    return;
  }

  try {
    await transporter.sendMail({
      from: `"Dr. Anil Pandey Clinic" <${process.env.EMAIL_USER}>`,
      to: adminEmail,
      subject: `[New Appointment] ${data.fullName} - ${data.preferredDate}`,
      text: textContent,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9fdfa; border: 1px solid #c2e8d7; border-radius: 8px;">
          <h2 style="color: #0d3829;">New Appointment Request</h2>
          <p>A new appointment request has been submitted through the public website.</p>
          <hr style="border: 0; border-top: 1px solid #e0f0e8;" />
          <p><strong>Patient Name:</strong> ${data.fullName}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Preferred Date:</strong> ${data.preferredDate}</p>
          <p><strong>Time Window:</strong> ${data.preferredTime}</p>
          <p><strong>Consultation Type:</strong> ${data.consultationType}</p>
          <p><strong>Message / Notes:</strong> ${data.message || "N/A"}</p>
          <hr style="border: 0; border-top: 1px solid #e0f0e8;" />
          <p><a href="${process.env.NEXT_PUBLIC_APP_URL || ""}/admin/appointments" style="background-color: #134e3a; color: white; padding: 10px 18px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Open Admin Dashboard</a></p>
        </div>
      `,
    });
  } catch (err: unknown) {
    console.warn("[Email Service] Failed to send appointment email:", err instanceof Error ? err.message : String(err));
  }
}

export async function sendConsultationNotification(data: ConsultationEmailData): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@dranilpandey.com";
  const transporter = getTransporter();

  const textContent = `
NEW CONSULTATION BOOKING RECEIVED - Dr. Anil Pandey Website

Client Details:
---------------
Full Name: ${data.fullName}
Phone: ${data.phone}
Email: ${data.email}
Consultation Format: ${data.consultationOption}
Preferred Date: ${data.preferredDate}
Selected Time Slot: ${data.preferredTimeSlot}
Notes / Medical Case: ${data.notes || "None provided"}

Please log in to the admin dashboard at /admin/consultations to review or confirm.
`;

  if (!transporter) {
    console.log("[Email Service: Development Fallback Log] New Consultation Notification:", textContent);
    return;
  }

  try {
    await transporter.sendMail({
      from: `"Dr. Anil Pandey Clinic" <${process.env.EMAIL_USER}>`,
      to: adminEmail,
      subject: `[New Consultation Booking] ${data.fullName} - ${data.preferredDate}`,
      text: textContent,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9fdfa; border: 1px solid #c2e8d7; border-radius: 8px;">
          <h2 style="color: #0d3829;">New Consultation Booking</h2>
          <p>A new consultation booking has been received from the website.</p>
          <hr style="border: 0; border-top: 1px solid #e0f0e8;" />
          <p><strong>Patient Name:</strong> ${data.fullName}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Format:</strong> ${data.consultationOption}</p>
          <p><strong>Date:</strong> ${data.preferredDate}</p>
          <p><strong>Time Slot:</strong> ${data.preferredTimeSlot}</p>
          <p><strong>Notes:</strong> ${data.notes || "N/A"}</p>
          <hr style="border: 0; border-top: 1px solid #e0f0e8;" />
          <p><a href="${process.env.NEXT_PUBLIC_APP_URL || ""}/admin/consultations" style="background-color: #134e3a; color: white; padding: 10px 18px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Open Admin Dashboard</a></p>
        </div>
      `,
    });
  } catch (err: unknown) {
    console.warn("[Email Service] Failed to send consultation email:", err instanceof Error ? err.message : String(err));
  }
}
