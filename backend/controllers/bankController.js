import dotenv from "dotenv";
dotenv.config();
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const deposit = async (req, res) => {
  const { amount } = req.body;

  const user = await User.findById(req.user.id);
  user.balance += amount;
  await user.save();

  await Transaction.create({
    userId: user._id,
    type: "deposit",
    amount
  });

  res.json({ balance: user.balance });
};

export const withdraw = async (req, res) => {
  const { amount } = req.body;

  const user = await User.findById(req.user.id);
  if (user.balance < amount)
    return res.json({ msg: "Insufficient balance" });

  user.balance -= amount;
  await user.save();

  await Transaction.create({
    userId: user._id,
    type: "withdraw",
    amount
  });

  res.json({ balance: user.balance });
};

export const getTransactions = async (req, res) => {
  const data = await Transaction.find({ userId: req.user.id });
  res.json(data);
};

export const makePayment = async (req, res) => {
  try {
    const { amount } = req.body;

    console.log("Incoming Amount:", amount);

    const amt = Number(amount);

    if (!amt || amt <= 0) {
      return res.status(400).json({ msg: "Invalid amount" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `https://bank-management-ten.vercel.app/success?amount=${amt}`,
      cancel_url: "https://bank-management-ten.vercel.app/dashboard",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Bank Deposit",
            },
            unit_amount: amt * 100,
          },
          quantity: 1,
        },
      ],
    });

    res.json({ url: session.url });

  } catch (error) {
    console.log("🔥 STRIPE ERROR:", error);   // 👈 FULL ERROR
    res.status(500).json({ msg: error.message });
  }
};

export const getBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ msg: "Error fetching balance" });
  }
};