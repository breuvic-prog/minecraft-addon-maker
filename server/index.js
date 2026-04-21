const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const { promisify } = require("util");
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
require("dotenv").config();

const app = express();
const scryptAsync = promisify(crypto.scrypt);

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn("DATABASE_URL is not set.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

app.use(cors());
app.use(express.json({ limit: "10mb" }));

/* ---------------- PASSWORD HELPERS ---------------- */

const hashPassword = async (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = await scryptAsync(password, salt, 64);

  return `${salt}:${derivedKey.toString("hex")}`;
};

const verifyPassword = async (password, storedHash) => {
  const [salt, key] = storedHash.split(":");

  if (!salt || !key) {
    return false;
  }

  const derivedKey = await scryptAsync(password, salt, 64);
  const storedKeyBuffer = Buffer.from(key, "hex");

  if (storedKeyBuffer.length !== derivedKey.length) {
    return false;
  }

  return crypto.timingSafeEqual(storedKeyBuffer, derivedKey);
};

/* ---------------- BASIC TEST ROUTE ---------------- */

app.get("/", (req, res) => {
  res.send("API is running");
});

/* ---------------- SIGNUP ---------------- */

app.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: "Password must be at least 8 characters.",
      });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          ...(username ? [{ username }] : []),
        ],
      },
    });

    if (existingUser) {
      return res.status(409).json({
        error: "Email or username already exists.",
      });
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        username: username || null,
        passwordHash,
      },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
      },
    });

    return res.status(201).json({
      message: "Account created successfully.",
      user,
    });
  } catch (error) {
    console.error("Signup failed:", error);

    return res.status(500).json({
      error: "Failed to create account.",
    });
  }
});

/* ---------------- LOGIN ---------------- */

app.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        error: "Email/username and password are required.",
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { username: identifier },
        ],
      },
    });

    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials.",
      });
    }

    const validPassword = await verifyPassword(
      password,
      user.passwordHash
    );

    if (!validPassword) {
      return res.status(401).json({
        error: "Invalid credentials.",
      });
    }

    return res.json({
      message: "Login successful.",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login failed:", error);

    return res.status(500).json({
      error: "Failed to login.",
    });
  }
});

/* ---------------- FORGOT PASSWORD ---------------- */

app.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: "Email is required.",
      });
    }

    return res.json({
      message:
        "If an account exists for that email, reset instructions would be sent.",
    });
  } catch (error) {
    console.error("Forgot password failed:", error);

    return res.status(500).json({
      error: "Failed to process request.",
    });
  }
});

/* ==================================================
   ADDON ROUTES
================================================== */

/* CREATE ADDON */

app.post("/addons", async (req, res) => {
  try {
    const { name, description, image, userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        error: "User ID is required.",
      });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({
        error: "Addon name is required.",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    const addon = await prisma.addon.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        image: image || null,
        userId: Number(userId),
      },
    });

    return res.status(201).json({
      message: "Addon created successfully.",
      addon,
    });
  } catch (error) {
    console.error("Create addon failed:", error);

    return res.status(500).json({
      error: "Failed to create addon.",
    });
  }
});

/* GET USER ADDONS */

app.get("/addons/user/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const includeDeleted =
      req.query.includeDeleted === "true";

    const addons = await prisma.addon.findMany({
      where: {
        userId,
        ...(includeDeleted
          ? {}
          : { deleted: false }),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json({
      addons,
    });
  } catch (error) {
    console.error("Fetch addons failed:", error);

    return res.status(500).json({
      error: "Failed to fetch addons.",
    });
  }
});

/* SOFT DELETE */

app.patch("/addons/:addonId/delete", async (req, res) => {
  try {
    const addonId = Number(req.params.addonId);

    const addon = await prisma.addon.update({
      where: {
        id: addonId,
      },
      data: {
        deleted: true,
      },
    });

    return res.json({
      message: "Addon deleted.",
      addon,
    });
  } catch (error) {
    console.error("Delete addon failed:", error);

    return res.status(500).json({
      error: "Failed to delete addon.",
    });
  }
});

/* RESTORE */

app.patch(
  "/addons/:addonId/restore",
  async (req, res) => {
    try {
      const addonId = Number(req.params.addonId);

      const addon = await prisma.addon.update({
        where: {
          id: addonId,
        },
        data: {
          deleted: false,
        },
      });

      return res.json({
        message: "Addon restored.",
        addon,
      });
    } catch (error) {
      console.error("Restore addon failed:", error);

      return res.status(500).json({
        error: "Failed to restore addon.",
      });
    }
  }
);

/* ---------------- START SERVER ---------------- */

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});