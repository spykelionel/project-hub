import { NextFunction, Request, Response } from "express";
import { Role } from "../models/user.model";

export function requireProjectRole(roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as any;
    const projectId = req.params.id || req.body.projectId;
    if (!user || !user.rolesPerProject) {
      return res.status(403).json({
        status: "error",
        message: "You are not authorized to perform this action.",
      });
    }
    const assignment = user.rolesPerProject.find(
      (r: any) => r.projectId.toString() === projectId
    );
    if (!assignment || !roles.includes(assignment.role)) {
      return res.status(403).json({
        status: "error",
        message: "You are not authorized to perform this action.",
      });
    }
    next();
  };
}
