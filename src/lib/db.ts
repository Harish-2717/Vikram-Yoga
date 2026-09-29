import fs from "fs";
import path from "path";
import crypto from "crypto";

const dbDirectory = path.join(process.cwd(), "data");
const dbPath = path.join(dbDirectory, "db.json");

export interface User {
  id: string;
  username: string;
  passwordHash: string;
  salt: string;
}

export interface SocialImage {
  id: string;
  image: string;
  social_media_url: string;
  created_at: string;
}

export interface Application {
  id: string;
  name: string;
  course: string;
  minorOption: string;
  dateOfCourse: string;
  email: string;
  dob: string;
  gender: string;
  accommodation: string;
  address: string;
  practisedYoga: string;
  howLong: string;
  whyTeacherTraining: string;
  meaningOfYoga: string;
  injuries: string;
  additionalInfo: string;
  status: "Pending" | "Verified" | "Rejected";
  created_at: string;
}

export interface Payment {
  id: string;
  applicantName: string;
  applicationId: string;
  paymentProofScreenshot: string;
  uploadDate: string;
  status: "Pending" | "Verified" | "Rejected";
  remarks: string;
}

export interface EmailReply {
  id: string;
  message: string;
  sent_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  specificInterest: string;
  message: string;
  replyStatus: "Pending" | "Replied";
  replies: EmailReply[];
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  role: string;
  message: string;
  image: string;
  status: "Pending" | "Approved" | "Rejected";
  created_at?: string;
}

export interface GalleryImage {
  id: string;
  name: string;
  image: string;
  created_at: string;
}

interface DatabaseSchema {
  users: User[];
  social_images: SocialImage[];
  applications: Application[];
  payments: Payment[];
  contact_messages: ContactMessage[];
  testimonials: Testimonial[];
  gallery_images?: GalleryImage[];
}

// Ensure database directory and file exist
function initDb() {
  if (!fs.existsSync(dbDirectory)) {
    fs.mkdirSync(dbDirectory, { recursive: true });
  }

  if (!fs.existsSync(dbPath)) {
    const initialData: DatabaseSchema = {
      users: [],
      social_images: [],
      applications: [],
      payments: [],
      contact_messages: [],
      testimonials: [],
    };
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2), "utf8");
  }

  // Pre-seed admin and default social media images if necessary
  const db = readDb();
  let updated = false;

  // 1. Seed Admin User
  if (db.users.length === 0) {
    const adminUsername = process.env.ADMIN_USERNAME || "admin";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    const { hash, salt } = hashPassword(adminPassword);
    db.users.push({
      id: "admin-id",
      username: adminUsername,
      passwordHash: hash,
      salt: salt,
    });
    updated = true;
  }

  // 2. Seed Default Social Images
  if (db.social_images.length === 0) {
    const defaultImages = [
      {
        id: "img-1",
        image: "/src/assets/yoga_classes_slide.png",
        url: "https://www.instagram.com/p/C-example1",
      },
      {
        id: "img-2",
        image: "/src/assets/therapy.jpg",
        url: "https://www.instagram.com/p/C-example2",
      },
      {
        id: "img-3",
        image: "/src/assets/retreat.jpg",
        url: "https://www.instagram.com/p/C-example3",
      },
      {
        id: "img-4",
        image: "/src/assets/about 1.jpg",
        url: "https://www.instagram.com/p/C-example4",
      },
      { id: "img-5", image: "/src/assets/hero.jpg", url: "https://www.instagram.com/p/C-example5" },
      {
        id: "img-6",
        image: "/src/assets/founder.png",
        url: "https://www.instagram.com/p/C-example6",
      },
      {
        id: "img-7",
        image: "/src/assets/yoga_classes_slide.png",
        url: "https://www.instagram.com/p/C-example7",
      },
      {
        id: "img-8",
        image: "/src/assets/therapy.jpg",
        url: "https://www.instagram.com/p/C-example8",
      },
    ];
    defaultImages.forEach((item) => {
      db.social_images.push({
        id: item.id,
        image: item.image,
        social_media_url: item.url,
        created_at: new Date().toISOString(),
      });
    });
    updated = true;
  }

  // 3. Seed Default Testimonials
  if (!db.testimonials || db.testimonials.length === 0) {
    db.testimonials = [
      {
        id: "test-1",
        name: "Lea Kolbe",
        rating: 5,
        role: "Yoga Student",
        message: "Magical place and amazing teacher! I'm staying with Dr. Vikram several days now enjoying morning meditations, yoga, treatments and even started to learn shiatsu. He is a very good teacher with many skills and a lot of experience. I highly recommend his school for Yoga. Go there, meet him and improve your mind and body. And when you get the chance stay there for lunch - even the cook is amazing.",
        image: "/src/assets/New/file_00000000532882118f2edf384a4cc863 (1).png",
        status: "Approved",
        created_at: new Date().toISOString(),
      },
      {
        id: "test-2",
        name: "Patrick Woods",
        rating: 5,
        role: "Therapist Client",
        message: "The wellness center is the place to find peace of mind and relax for the soul. The classes with the ocean sound are fantastic. Dr. Vikram is a great professional. I had a great experience. Highly recommended!",
        image: "/src/assets/New/file_00000000e5448211bcd6ac613aec8e4f.png",
        status: "Approved",
        created_at: new Date().toISOString(),
      },
      {
        id: "test-3",
        name: "Sarah Jenkins",
        rating: 5,
        role: "Yoga Practitioner",
        message: "An incredibly peaceful and healing experience. The yoga sessions helped me feel physically stronger and mentally calmer. The therapeutic practices provided deep healing and relaxation.",
        image: "/src/assets/New/file_00000000cbc48208b85635741587e067 (1).png",
        status: "Approved",
        created_at: new Date().toISOString(),
      },
      {
        id: "test-4",
        name: "Michael Chen",
        rating: 5,
        role: "Retreat Guest",
        message: "The retreat environment was beautiful, relaxing, and deeply transformative. Professional guidance, therapeutic wellness practices, and a very supportive atmosphere for growth.",
        image: "/src/assets/New/file_00000000d85882119458c3c9987ceaec (1).png",
        status: "Approved",
        created_at: new Date().toISOString(),
      },
    ];
    updated = true;
  }

  if (updated) {
    writeDb(db);
  }
}

export function readDb(): DatabaseSchema {
  try {
    const content = fs.readFileSync(dbPath, "utf8");
    const data = JSON.parse(content);
    if (!data.testimonials) {
      data.testimonials = [];
    }
    if (!data.gallery_images) {
      data.gallery_images = [];
    }
    return data;
  } catch (error) {
    // If reading fails, return empty schema
    return {
      users: [],
      social_images: [],
      applications: [],
      payments: [],
      contact_messages: [],
      testimonials: [],
      gallery_images: [],
    };
  }
}

export function writeDb(data: DatabaseSchema): void {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf8");
}

// Hashing Helpers
export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return { hash, salt };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const checkHash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return hash === checkHash;
}

// Session Helpers
const SESSION_FILE = path.join(dbDirectory, "sessions.json");

export function createSession(username: string): string {
  const token = crypto.randomBytes(32).toString("hex");
  let sessions: Record<string, { username: string; expires: number }> = {};
  if (fs.existsSync(SESSION_FILE)) {
    try {
      sessions = JSON.parse(fs.readFileSync(SESSION_FILE, "utf8"));
    } catch {}
  }

  // Session expires in 1 day
  sessions[token] = {
    username,
    expires: Date.now() + 24 * 60 * 60 * 1000,
  };

  fs.writeFileSync(SESSION_FILE, JSON.stringify(sessions, null, 2), "utf8");
  return token;
}

export function validateSession(token: string | undefined): boolean {
  if (!token) return false;
  if (!fs.existsSync(SESSION_FILE)) return false;

  try {
    const sessions = JSON.parse(fs.readFileSync(SESSION_FILE, "utf8"));
    const session = sessions[token];
    if (session && session.expires > Date.now()) {
      return true;
    }
  } catch {}

  return false;
}

export function deleteSession(token: string | undefined): void {
  if (!token) return;
  if (!fs.existsSync(SESSION_FILE)) return;

  try {
    const sessions = JSON.parse(fs.readFileSync(SESSION_FILE, "utf8"));
    delete sessions[token];
    fs.writeFileSync(SESSION_FILE, JSON.stringify(sessions, null, 2), "utf8");
  } catch {}
}

// Run DB Initialization
initDb();
