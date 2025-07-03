import mongoose, { Document, Schema } from "mongoose";

export interface IOrganization extends Document {
  name: string;
}

const OrganizationSchema = new Schema<IOrganization>({
  name: { type: String, required: true },
});

export const Organization = mongoose.model<IOrganization>(
  "Organization",
  OrganizationSchema
);
