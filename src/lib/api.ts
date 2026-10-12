import {
  readDb,
  writeDb,
  hashPassword,
  verifyPassword,
  createSession,
  validateSession,
  deleteSession,
} from "./db";
import { sendEmail } from "./email";
import Busboy from "busboy";
import fs from "fs";
import path from "path";

// Helper to read JSON request body
function getJsonBody(req: any): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk: any) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
  });
}

// Helper to parse multipart/form-data
interface ParsedMultipart {
  fields: Record<string, string>;
  file: {
    data: Buffer;
    name: string;
    mime: string;
  } | null;
}

function parseMultipart(req: any): Promise<ParsedMultipart> {
  return new Promise((resolve, reject) => {
    try {
      const busboy = Busboy({ headers: req.headers });
      const fields: Record<string, string> = {};
      let fileData: { data: Buffer; name: string; mime: string } | null = null;
      const filePromises: Promise<void>[] = [];

      busboy.on("field", (name, val) => {
        fields[name] = val;
      });

      busboy.on("file", (name, fileStream, info) => {
        const { filename, mimeType } = info;
        const chunks: Buffer[] = [];

        const filePromise = new Promise<void>((res) => {
          fileStream.on("data", (chunk) => {
            chunks.push(Buffer.from(chunk));
          });
          fileStream.on("end", () => {
            if (chunks.length > 0) {
              fileData = {
                data: Buffer.concat(chunks),
                name: filename,
                mime: mimeType,
              };
            }
            res();
          });
        });
        filePromises.push(filePromise);
      });

      busboy.on("finish", async () => {
        await Promise.all(filePromises);
        resolve({ fields, file: fileData });
      });

      busboy.on("error", (err) => {
        reject(err);
      });

      req.pipe(busboy);
    } catch (err) {
      reject(err);
    }
  });
}

// Helper to write JSON response
function sendJson(res: any, data: any, status = 200) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

export async function handleApiRequest(req: any, res: any): Promise<boolean> {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const pathname = url.pathname;

  // Only handle /api endpoints
  if (!pathname.startsWith("/api")) {
    return false;
  }

  try {
    // --- PUBLIC ENDPOINTS ---

    // 1. GET /api/social-images
    if (pathname === "/api/social-images" && req.method === "GET") {
      const db = readDb();
      sendJson(res, db.social_images);
      return true;
    }

    // GET /api/gallery-images
    if (pathname === "/api/gallery-images" && req.method === "GET") {
      const db = readDb();
      sendJson(res, db.gallery_images || []);
      return true;
    }

    // 2. POST /api/contact
    if (pathname === "/api/contact" && req.method === "POST") {
      const data = await getJsonBody(req);
      const db = readDb();

      const newMessage = {
        id: "msg-" + Date.now() + "-" + Math.random().toString(36).substring(2, 9),
        name: data.name,
        email: data.email,
        phone: data.phone,
        interest: data.interest,
        specificInterest: data.specificInterest || "",
        message: data.message,
        replyStatus: "Pending" as const,
        replies: [],
        created_at: new Date().toISOString(),
      };

      db.contact_messages.push(newMessage);
      writeDb(db);
      sendJson(res, { success: true });
      return true;
    }

    // 3. POST /api/apply
    if (pathname === "/api/apply" && req.method === "POST") {
      const parsed = await parseMultipart(req);
      const fields = parsed.fields;

      let filePath = "";
      if (parsed.file && parsed.file.data.length > 0) {
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const fileName = Date.now() + "-" + parsed.file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        filePath = "/uploads/" + fileName;
        fs.writeFileSync(path.join(uploadDir, fileName), parsed.file.data);
      }

      const db = readDb();
      const appId = "app-" + Date.now() + "-" + Math.random().toString(36).substring(2, 9);

      const fullName = fields.name || `${fields.firstName || ''} ${fields.surname || ''}`.trim();
      const courseCategory = fields.course || fields.serviceCategory || "Yoga & Wellness Retreat";
      const courseProg = fields.minorOption || fields.courseProgram || "";
      const courseDate = fields.dateOfCourse || fields.checkInDate || new Date().toISOString().split('T')[0];

      const newApp = {
        id: appId,
        name: fullName,
        course: courseCategory,
        minorOption: courseProg,
        dateOfCourse: courseDate,
        email: fields.email,
        dob: fields.dob || fields.age || "",
        gender: fields.gender || "",
        accommodation: fields.accommodation || fields.accommodationPreference || fields.requireAccommodation || "",
        address: fields.address || (fields.phone ? `Phone / WhatsApp: ${fields.phone}` : ""),
        practisedYoga: fields.practisedYoga || "",
        howLong: fields.howLongPracticing || fields.howLong || "",
        whyTeacherTraining: fields.expectations || fields.whyTeacherTraining || "",
        meaningOfYoga: fields.yogaStyle || fields.meaningOfYoga || "",
        injuries: fields.healthDetails || fields.injuries || "",
        additionalInfo: fields.additionalInfo || "",
        status: "Pending" as const,
        created_at: new Date().toISOString(),
      };
      db.applications.push(newApp);

      const paymentId = "pay-" + Date.now() + "-" + Math.random().toString(36).substring(2, 9);
      db.payments.push({
        id: paymentId,
        applicantName: fields.name,
        applicationId: appId,
        paymentProofScreenshot: filePath || "/uploads/placeholder.png",
        uploadDate: new Date().toISOString(),
        status: "Pending" as const,
        remarks: "",
      });

      writeDb(db);
      sendJson(res, { success: true, applicationId: appId });
      return true;
    }

    // GET /api/testimonials
    if (pathname === "/api/testimonials" && req.method === "GET") {
      const db = readDb();
      const approved = db.testimonials.filter((t) => t.status === "Approved");
      sendJson(res, approved);
      return true;
    }

    // POST /api/testimonials
    if (pathname === "/api/testimonials" && req.method === "POST") {
      const parsed = await parseMultipart(req);
      const fields = parsed.fields;

      let filePath = "";
      if (parsed.file && parsed.file.data.length > 0) {
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const fileName = Date.now() + "-" + parsed.file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        filePath = "/uploads/" + fileName;
        fs.writeFileSync(path.join(uploadDir, fileName), parsed.file.data);
      }

      const db = readDb();
      const newTestimonial = {
        id: "test-" + Date.now() + "-" + Math.random().toString(36).substring(2, 9),
        name: fields.name || "Anonymous",
        rating: parseInt(fields.rating || "5"),
        role: fields.role || "Yoga Student",
        message: fields.message || "",
        image: filePath || "",
        status: "Pending" as const,
        created_at: new Date().toISOString(),
      };

      db.testimonials.push(newTestimonial);
      writeDb(db);
      sendJson(res, { success: true });
      return true;
    }

    // --- ADMIN AUTH ENDPOINTS ---

    // 4. POST /api/admin/login
    if (pathname === "/api/admin/login" && req.method === "POST") {
      const data = await getJsonBody(req);
      const db = readDb();
      const user = db.users.find((u) => u.username === data.username);
      if (!user) {
        sendJson(res, { success: false, error: "Invalid username or password" }, 401);
        return true;
      }

      const isValid = verifyPassword(data.password, user.passwordHash, user.salt);
      if (!isValid) {
        sendJson(res, { success: false, error: "Invalid username or password" }, 401);
        return true;
      }

      const token = createSession(user.username);
      sendJson(res, { success: true, token });
      return true;
    }

    // 5. POST /api/admin/check-auth
    if (pathname === "/api/admin/check-auth" && req.method === "POST") {
      const data = await getJsonBody(req);
      const authenticated = validateSession(data.token);
      sendJson(res, { authenticated });
      return true;
    }

    // 6. POST /api/admin/logout
    if (pathname === "/api/admin/logout" && req.method === "POST") {
      const data = await getJsonBody(req);
      deleteSession(data.token);
      sendJson(res, { success: true });
      return true;
    }

    // --- PROTECTED ADMIN PANEL ENDPOINTS ---

    // Auth Guard
    const authHeader = req.headers.authorization || "";
    const sessionToken = authHeader.replace("Bearer ", "").trim();
    if (!validateSession(sessionToken)) {
      sendJson(res, { success: false, error: "Unauthorized" }, 401);
      return true;
    }

    // GET /api/admin/testimonials
    if (pathname === "/api/admin/testimonials" && req.method === "GET") {
      const db = readDb();
      sendJson(
        res,
        db.testimonials.sort(
          (a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
        )
      );
      return true;
    }

    // POST /api/admin/testimonials/status
    if (pathname === "/api/admin/testimonials/status" && req.method === "POST") {
      const data = await getJsonBody(req);
      const db = readDb();
      const testimonial = db.testimonials.find((t) => t.id === data.id);
      if (!testimonial) {
        sendJson(res, { success: false, error: "Testimonial not found" }, 404);
        return true;
      }

      if (data.action === "delete") {
        const index = db.testimonials.findIndex((t) => t.id === data.id);
        if (testimonial.image && testimonial.image.startsWith("/uploads/")) {
          const filePath = path.join(process.cwd(), "public", testimonial.image);
          if (fs.existsSync(filePath)) {
            try {
              fs.unlinkSync(filePath);
            } catch {}
          }
        }
        db.testimonials.splice(index, 1);
      } else {
        testimonial.status = data.status; // 'Approved' | 'Rejected'
      }

      writeDb(db);
      sendJson(res, { success: true });
      return true;
    }

    // 7. GET /api/admin/dashboard
    if (pathname === "/api/admin/dashboard" && req.method === "GET") {
      const db = readDb();

      const totalApps = db.applications.length;
      const pendingApps = db.applications.filter((a) => a.status === "Pending").length;
      const verifiedPayments = db.payments.filter((p) => p.status === "Verified").length;
      const totalMessages = db.contact_messages.length;
      const pendingMessages = db.contact_messages.filter((m) => m.replyStatus === "Pending").length;
      const totalTestimonials = db.testimonials ? db.testimonials.length : 0;
      const pendingTestimonials = db.testimonials ? db.testimonials.filter((t) => t.status === "Pending").length : 0;

      const recentApps = [...db.applications]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5);

      const recentMessages = [...db.contact_messages]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5);

      sendJson(res, {
        stats: {
          totalApps,
          pendingApps,
          verifiedPayments,
          totalMessages,
          pendingMessages,
          totalTestimonials,
          pendingTestimonials,
        },
        recentApps,
        recentMessages,
      });
      return true;
    }

    // 8. GET /api/admin/social-images
    if (pathname === "/api/admin/social-images" && req.method === "GET") {
      const db = readDb();
      sendJson(res, db.social_images);
      return true;
    }

    // 9. POST /api/admin/social-images/add
    if (pathname === "/api/admin/social-images/add" && req.method === "POST") {
      const parsed = await parseMultipart(req);
      const url = parsed.fields.social_media_url;
      const file = parsed.file;

      if (!file || file.data.length === 0) {
        sendJson(res, { success: false, error: "Image file is required" }, 400);
        return true;
      }

      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = Date.now() + "-" + file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const filePath = "/uploads/" + fileName;
      fs.writeFileSync(path.join(uploadDir, fileName), file.data);

      const db = readDb();
      const newEntry = {
        id: "img-" + Date.now() + "-" + Math.random().toString(36).substring(2, 9),
        image: filePath,
        social_media_url: url || "#",
        created_at: new Date().toISOString(),
      };

      db.social_images.push(newEntry);
      writeDb(db);
      sendJson(res, { success: true });
      return true;
    }

    // 10. POST /api/admin/social-images/edit
    if (pathname === "/api/admin/social-images/edit" && req.method === "POST") {
      const data = await getJsonBody(req);
      const db = readDb();
      const entry = db.social_images.find((img) => img.id === data.id);
      if (!entry) {
        sendJson(res, { success: false, error: "Entry not found" }, 404);
        return true;
      }

      entry.social_media_url = data.social_media_url;
      writeDb(db);
      sendJson(res, { success: true });
      return true;
    }

    // 11. POST /api/admin/social-images/delete
    if (pathname === "/api/admin/social-images/delete" && req.method === "POST") {
      const data = await getJsonBody(req);
      const db = readDb();
      const entryIndex = db.social_images.findIndex((img) => img.id === data.id);
      if (entryIndex === -1) {
        sendJson(res, { success: false, error: "Entry not found" }, 404);
        return true;
      }

      const entry = db.social_images[entryIndex];
      if (entry.image.startsWith("/uploads/")) {
        const filePath = path.join(process.cwd(), "public", entry.image);
        if (fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath);
          } catch {}
        }
      }

      db.social_images.splice(entryIndex, 1);
      writeDb(db);
      sendJson(res, { success: true });
      return true;
    }

    // GET /api/admin/gallery-images
    if (pathname === "/api/admin/gallery-images" && req.method === "GET") {
      const db = readDb();
      sendJson(res, db.gallery_images || []);
      return true;
    }

    // POST /api/admin/gallery-images/add
    if (pathname === "/api/admin/gallery-images/add" && req.method === "POST") {
      const parsed = await parseMultipart(req);
      const name = parsed.fields.name;
      const file = parsed.file;

      if (!file || file.data.length === 0) {
        sendJson(res, { success: false, error: "Image file is required" }, 400);
        return true;
      }

      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = Date.now() + "-" + file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const filePath = "/uploads/" + fileName;
      fs.writeFileSync(path.join(uploadDir, fileName), file.data);

      const db = readDb();
      const newEntry = {
        id: "gal-" + Date.now() + "-" + Math.random().toString(36).substring(2, 9),
        image: filePath,
        name: name || "Untitled",
        created_at: new Date().toISOString(),
      };

      if (!db.gallery_images) {
        db.gallery_images = [];
      }
      db.gallery_images.push(newEntry);
      writeDb(db);
      sendJson(res, { success: true });
      return true;
    }

    // POST /api/admin/gallery-images/edit
    if (pathname === "/api/admin/gallery-images/edit" && req.method === "POST") {
      const data = await getJsonBody(req);
      const db = readDb();
      const entry = db.gallery_images?.find((img) => img.id === data.id);
      if (!entry) {
        sendJson(res, { success: false, error: "Entry not found" }, 404);
        return true;
      }

      entry.name = data.name || "Untitled";
      writeDb(db);
      sendJson(res, { success: true });
      return true;
    }

    // POST /api/admin/gallery-images/delete
    if (pathname === "/api/admin/gallery-images/delete" && req.method === "POST") {
      const data = await getJsonBody(req);
      const db = readDb();
      const entryIndex = db.gallery_images?.findIndex((img) => img.id === data.id) ?? -1;
      if (entryIndex === -1 || !db.gallery_images) {
        sendJson(res, { success: false, error: "Entry not found" }, 404);
        return true;
      }

      const entry = db.gallery_images[entryIndex];
      // Only delete files in public/uploads/ or public/gallery/ (if they were uploaded)
      if (entry.image.startsWith("/uploads/") || entry.image.startsWith("/gallery/")) {
        const filePath = path.join(process.cwd(), "public", entry.image);
        if (fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath);
          } catch {}
        }
      }

      db.gallery_images.splice(entryIndex, 1);
      writeDb(db);
      sendJson(res, { success: true });
      return true;
    }

    // 12. GET /api/admin/applications
    if (pathname === "/api/admin/applications" && req.method === "GET") {
      const db = readDb();
      sendJson(
        res,
        db.applications.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        ),
      );
      return true;
    }

    // 13. POST /api/admin/applications/status
    if (pathname === "/api/admin/applications/status" && req.method === "POST") {
      const data = await getJsonBody(req);
      const db = readDb();

      const app = db.applications.find((a) => a.id === data.id);
      if (!app) {
        sendJson(res, { success: false, error: "Application not found" }, 404);
        return true;
      }

      const oldStatus = app.status;
      app.status = data.status;
      const payment = db.payments.find((p) => p.applicationId === data.id);
      if (payment) {
        payment.status = data.status;
      }

      writeDb(db);

      // Send default confirmation email if newly verified
      if (data.status === "Verified" && oldStatus !== "Verified" && app.email) {
        try {
          const mailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff;">
              <div style="text-align: center; border-bottom: 2px solid #55b9b7; padding-bottom: 15px; margin-bottom: 20px;">
                <h2 style="color: #0c2a21; margin: 0; font-family: 'Times New Roman', serif;">Dr. Vikram Yoga & Wellness Centre</h2>
                <span style="font-size: 10px; letter-spacing: 2px; color: #55b9b7; font-weight: bold; text-transform: uppercase;">Heal • Harmonize • Transform</span>
              </div>
              <p>Dear <strong>${app.name}</strong>,</p>
              <p>We are pleased to inform you that your application and payment for the program <strong>${app.course}</strong> (Option: ${app.minorOption}) starting on <strong>${app.dateOfCourse}</strong> have been successfully verified!</p>
              
              <div style="background-color: #fafafa; border-left: 4px solid #55b9b7; padding: 15px; margin: 20px 0; color: #333333; border-radius: 0 8px 8px 0; font-size: 13px;">
                <strong>Registration Details:</strong><br/>
                • Application ID: ${app.id}<br/>
                • Status: <strong>Verified & Confirmed</strong><br/>
                • Course: ${app.course}<br/>
                • Start Date: ${app.dateOfCourse}<br/>
                • Accommodation: ${app.accommodation || "Standard"}
              </div>
              
              <p>Your spot is now officially reserved. We will reach out with further coordination details, guidelines, and preparation material as the start date approaches.</p>
              <p>If you have any questions or require support, please connect with us on WhatsApp at +91 8778639989 or reply directly to this email.</p>
              <p style="margin-top: 30px;">Warm regards,<br/><strong>Administrative Team</strong><br/>Dr. Vikram Yoga & Wellness Centre</p>
              <div style="border-top: 1px solid #eeeeee; margin-top: 30px; padding-top: 15px; text-align: center; font-size: 11px; color: #aaaaaa;">
                © ${new Date().getFullYear()} Dr. Vikram Yoga & Wellness Centre. All rights reserved.
              </div>
            </div>
          `;
          await sendEmail({
            to: app.email,
            subject: `Application Confirmed - Dr. Vikram Yoga & Wellness Centre`,
            html: mailHtml,
          });
        } catch (err) {
          console.error("Failed to send verification confirmation email:", err);
        }
      }

      sendJson(res, { success: true });
      return true;
    }

    // 14. POST /api/admin/applications/delete
    if (pathname === "/api/admin/applications/delete" && req.method === "POST") {
      const data = await getJsonBody(req);
      const db = readDb();

      const appIndex = db.applications.findIndex((a) => a.id === data.id);
      if (appIndex === -1) {
        sendJson(res, { success: false, error: "Application not found" }, 404);
        return true;
      }

      const paymentIndex = db.payments.findIndex((p) => p.applicationId === data.id);
      if (paymentIndex !== -1) {
        const payment = db.payments[paymentIndex];
        if (payment.paymentProofScreenshot.startsWith("/uploads/")) {
          const filePath = path.join(process.cwd(), "public", payment.paymentProofScreenshot);
          if (fs.existsSync(filePath)) {
            try {
              fs.unlinkSync(filePath);
            } catch {}
          }
        }
        db.payments.splice(paymentIndex, 1);
      }

      db.applications.splice(appIndex, 1);
      writeDb(db);
      sendJson(res, { success: true });
      return true;
    }

    // 15. GET /api/admin/payments
    if (pathname === "/api/admin/payments" && req.method === "GET") {
      const db = readDb();
      sendJson(
        res,
        db.payments.sort(
          (a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime(),
        ),
      );
      return true;
    }

    // 16. POST /api/admin/payments/status
    if (pathname === "/api/admin/payments/status" && req.method === "POST") {
      const data = await getJsonBody(req);
      const db = readDb();

      const payment = db.payments.find((p) => p.id === data.id);
      if (!payment) {
        sendJson(res, { success: false, error: "Payment not found" }, 404);
        return true;
      }

      const oldStatus = payment.status;
      payment.status = data.status;
      payment.remarks = data.remarks;

      const app = db.applications.find((a) => a.id === payment.applicationId);
      if (app) {
        app.status = data.status;
      }

      writeDb(db);

      // Send default confirmation email if newly verified
      if (data.status === "Verified" && oldStatus !== "Verified" && app && app.email) {
        try {
          const mailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff;">
              <div style="text-align: center; border-bottom: 2px solid #55b9b7; padding-bottom: 15px; margin-bottom: 20px;">
                <h2 style="color: #0c2a21; margin: 0; font-family: 'Times New Roman', serif;">Dr. Vikram Yoga & Wellness Centre</h2>
                <span style="font-size: 10px; letter-spacing: 2px; color: #55b9b7; font-weight: bold; text-transform: uppercase;">Heal • Harmonize • Transform</span>
              </div>
              <p>Dear <strong>${app.name}</strong>,</p>
              <p>We are pleased to inform you that your application and payment for the program <strong>${app.course}</strong> (Option: ${app.minorOption}) starting on <strong>${app.dateOfCourse}</strong> have been successfully verified!</p>
              
              <div style="background-color: #fafafa; border-left: 4px solid #55b9b7; padding: 15px; margin: 20px 0; color: #333333; border-radius: 0 8px 8px 0; font-size: 13px;">
                <strong>Registration Details:</strong><br/>
                • Application ID: ${app.id}<br/>
                • Status: <strong>Verified & Confirmed</strong><br/>
                • Course: ${app.course}<br/>
                • Start Date: ${app.dateOfCourse}<br/>
                • Accommodation: ${app.accommodation || "Standard"}
              </div>
              
              <p>Your spot is now officially reserved. We will reach out with further coordination details, guidelines, and preparation material as the start date approaches.</p>
              <p>If you have any questions or require support, please connect with us on WhatsApp at +91 8778639989 or reply directly to this email.</p>
              <p style="margin-top: 30px;">Warm regards,<br/><strong>Administrative Team</strong><br/>Dr. Vikram Yoga & Wellness Centre</p>
              <div style="border-top: 1px solid #eeeeee; margin-top: 30px; padding-top: 15px; text-align: center; font-size: 11px; color: #aaaaaa;">
                © ${new Date().getFullYear()} Dr. Vikram Yoga & Wellness Centre. All rights reserved.
              </div>
            </div>
          `;
          await sendEmail({
            to: app.email,
            subject: `Application Confirmed - Dr. Vikram Yoga & Wellness Centre`,
            html: mailHtml,
          });
        } catch (err) {
          console.error("Failed to send verification confirmation email:", err);
        }
      }

      sendJson(res, { success: true });
      return true;
    }

    // 17. GET /api/admin/contact-messages
    if (pathname === "/api/admin/contact-messages" && req.method === "GET") {
      const db = readDb();
      sendJson(
        res,
        db.contact_messages.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        ),
      );
      return true;
    }

    // 18. POST /api/admin/contact-messages/delete
    if (pathname === "/api/admin/contact-messages/delete" && req.method === "POST") {
      const data = await getJsonBody(req);
      const db = readDb();

      const index = db.contact_messages.findIndex((m) => m.id === data.id);
      if (index === -1) {
        sendJson(res, { success: false, error: "Message not found" }, 404);
        return true;
      }

      db.contact_messages.splice(index, 1);
      writeDb(db);
      sendJson(res, { success: true });
      return true;
    }

    // 19. POST /api/admin/contact-messages/reply
    if (pathname === "/api/admin/contact-messages/reply" && req.method === "POST") {
      const data = await getJsonBody(req);
      const db = readDb();
      const message = db.contact_messages.find((m) => m.id === data.id);
      if (!message) {
        sendJson(res, { success: false, error: "Message not found" }, 404);
        return true;
      }

      const mailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff;">
          <div style="text-align: center; border-bottom: 2px solid #55b9b7; padding-bottom: 15px; margin-bottom: 20px;">
            <h2 style="color: #0c2a21; margin: 0; font-family: 'Times New Roman', serif;">Dr. Vikram Yoga & Wellness Centre</h2>
            <span style="font-size: 10px; letter-spacing: 2px; color: #55b9b7; font-weight: bold; text-transform: uppercase;">Heal • Harmonize • Transform</span>
          </div>
          <p>Dear <strong>${message.name}</strong>,</p>
          <p>Thank you for contacting Dr. Vikram Yoga & Wellness Centre. Regarding your enquiry about <strong>${message.interest}</strong>, please find our response below:</p>
          
          <div style="background-color: #fafafa; border-left: 4px solid #55b9b7; padding: 15px; margin: 20px 0; font-style: italic; color: #555555; border-radius: 0 8px 8px 0;">
            ${data.replyBody.replace(/\n/g, "<br/>")}
          </div>
          
          <p>If you have any further questions, feel free to reply directly to this email or connect with us on WhatsApp at +91 8778639989.</p>
          <p style="margin-top: 30px;">Warm regards,<br/><strong>Administrative Team</strong><br/>Dr. Vikram Yoga & Wellness Centre</p>
          <div style="border-top: 1px solid #eeeeee; margin-top: 30px; padding-top: 15px; text-align: center; font-size: 11px; color: #aaaaaa;">
            © ${new Date().getFullYear()} Dr. Vikram Yoga & Wellness Centre. All rights reserved.
          </div>
        </div>
      `;

      const emailRes = await sendEmail({
        to: message.email,
        subject: data.replySubject,
        html: mailHtml,
      });

      if (!emailRes.success) {
        sendJson(
          res,
          { success: false, error: emailRes.error || "Failed to send email via SMTP" },
          500,
        );
        return true;
      }

      message.replyStatus = "Replied";
      message.replies.push({
        id: "rep-" + Date.now(),
        message: data.replyBody,
        sent_at: new Date().toISOString(),
      });

      writeDb(db);
      sendJson(res, { success: true });
      return true;
    }
  } catch (err: any) {
    console.error("API error:", err);
    sendJson(res, { success: false, error: err.message || String(err) }, 500);
    return true;
  }

  return false;
}
