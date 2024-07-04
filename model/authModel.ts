import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
export interface AuthUser extends Document {
  _id: string;
  uid: string;
  name: string;
  email: string;
  password: string;
  comparePassword: {
    (comparePassword: string): Promise<boolean>;
  };
}

const AuthSchema = new Schema<AuthUser>({
  uid: { type: "String", default: uuidv4 },
  name: { type: "String", required: true },
  email: { type: "String", required: true },
  password: { type: "String", required: true },
});

export const Auth = mongoose.model("Auth", AuthSchema);
