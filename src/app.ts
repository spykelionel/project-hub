import dotenv from "dotenv";
import express from "express";
import passport from "./middlewares/auth.middleware";
import projectRoutes from "./routes/project.routes";

dotenv.config();

const app = express();

app.use(express.json());

app.use(passport.initialize());

app.use("/api/v1/projects", projectRoutes);

// Error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(err.status || 500).json({
      status: "error",
      message: err.message || "Internal Server Error",
    });
  }
);

export default app;
