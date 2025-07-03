import mongoose, { Document, Schema } from "mongoose";

export type Role = "owner" | "admin" | "member" | "viewer";

export interface IRoleAssignment {
  projectId: mongoose.Types.ObjectId;
  role: Role;
}

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  organizationId: mongoose.Types.ObjectId;
  rolesPerProject: IRoleAssignment[];
}

const RoleAssignmentSchema = new Schema<IRoleAssignment>({
  projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  role: {
    type: String,
    enum: ["owner", "admin", "member", "viewer"],
    required: true,
  },
});

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  organizationId: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  rolesPerProject: { type: [RoleAssignmentSchema], default: [] },
});

export const User = mongoose.model<IUser>("User", UserSchema);
