export interface IUser {
  _id: string;
  userId: string;
  goals: unknown[];
  image: string;
  email: string;
  password: string;
  otp: string;
  otpExpiration: string;
  accountVerification: boolean;
  completeProfile: boolean;
  roomRentals: boolean;
  userType: "USER" | "PARTNER";
  referralCode: string;
  referredBy: string | null;
  wallet: number;
  isVerified: boolean;
  status: boolean;
  documentVerification: "PENDING" | "APPROVED" | "REJECTED";
  notificationPreference: boolean;
  referralLevels: unknown[];
  tenants: unknown[];
  dummyImage: { img: string; _id: string }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  mobileNumber: string;
  fullName: string;
}
