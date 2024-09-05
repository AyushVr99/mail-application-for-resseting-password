import Fastify from "fastify";
import crypto from "crypto";
import nodemailer from "nodemailer";
import fastifyJWT from "@fastify/jwt";
import db from "./db/index.js";

const fastify = Fastify({ logger: false }); 

// Register JWT
fastify.register(fastifyJWT, {
  secret: "ayushverma99",
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.email,
    pass: process.env.pass,
  },
});

fastify.get('/linedata', async (request, reply) => {
  try {
    const salesData = await db.LineData.findAll();
    const labels = salesData.map(item => item.month);
    const data = salesData.map(item => item.points);
    reply.send({ labels, data });
  } catch (error) {
    reply.status(500).send({ error: 'Failed to fetch sales data' });
  }
});

fastify.post('/addata', async (request, reply) => {
  try {
    const { month, points } = request.body;

    if (!month || typeof points !== 'number') {
      return reply.status(400).send({ error: 'Invalid data format' });
    }

    await db.LineData.create({ month, points });

    reply.send({ message: 'Sales data added successfully' });
  } catch (error) {
    reply.status(500).send({ error: 'Failed to add sales data' });
  }
});


fastify.post("/createaccount", async (request, reply) => {
  const { email, personalEmail } = request.body;

  try {
    const newUser = await db.Mails.create({ username: email, password: null });

    const resetToken = fastify.jwt.sign({ id: newUser.id }, { expiresIn: '1h' });
    const resetLink = `${process.env.RESET_UI}/reset_password?token=${resetToken}`;

    const mailOptions = {
      from: "ayushve35406603@gmail.com", // Sender address
      to: personalEmail, // Recipient address
      subject: "Reset Your Password",
      text: `Click the link to reset your password: ${resetLink}`,
    };
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        reply.status(500).send("Error sending email");
      } else {
        console.log("Email sent: " + info.response);
        reply.send("Email sent successfully");
      }
    });
    reply.send({ message: "Email created and reset link sent" });
    
  } catch (err) {
    // Log detailed error information
    fastify.log.error("Error creating email:", err);
    reply
      .status(500)
      .send({ error: "Error creating email", details: err.message });
  }
});

// Endpoint to handle password reset
fastify.post("/resetpassword", async (request, reply) => {
  const { token, newPassword } = request.body;

  try {
    const decoded = fastify.jwt.verify(token);
    const hashedPassword = crypto.createHash("sha256").update(newPassword).digest("hex");
    await db.Mails.update(
      { password: hashedPassword },
      { where: { id: decoded.id } }
    );
    reply.send({ message: "Password reset successfully" });
  } catch (err) {
    console.log("Error resetting password:", err);
    reply.status(500).send({ error: "Error resetting password", details: err.message });
  }
});

fastify.get("/ping", (req, reply) => {
  reply.send("pong");
});

const start = async () => {
  try {
    await db.sequelize.sync();
    await fastify.listen({ port: 3000 });
    console.log("Server running at http://localhost:3000/");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
