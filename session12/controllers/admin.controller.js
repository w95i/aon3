const prisma = require("../db");
const jwt = require("jsonwebtoken");

function generateOtp(length = 6) {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

const createAdmin = async (formData) => {
  try {
    const { phone } = formData;
    let existingAdmin = await prisma.Admin.findUnique({
      where: { phone },
    });
    if (existingAdmin) {
      throw new Error("Admin with this phone number already exists");
    }

    const otp = generateOtp();
    const otpCreatedAt = new Date();
    const newAdmin = await prisma.Admin.create({
      data: { ...formData, otp, otpCreatedAt },
    });
    return {
      message: "Admin created successfully",
      otp,
      admin: newAdmin,
    };
  } catch (error) {
    return { error: error.message };
  }
};

const loginAdmin = async (formData) => {
  try {
    const { phone } = formData;
    let admin = await prisma.Admin.findUnique({
      where: { phone },
    });
    if (!admin) {
      throw new Error("Admin not found");
    }
    if (admin.otp !== formData.otp) {
      throw new Error("Invalid OTP");
    }
    const now = new Date();
    if ((now - new Date(admin.otpCreatedAt)) / 1000 > 300) {
      throw new Error("OTP has expired");
    }

    const token = jwt.sign(
      { id: admin.id, phone: admin.phone },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return { message: "Login successful", token };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  createAdmin,
  loginAdmin,
};
