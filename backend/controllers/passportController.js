
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js"
import User from "../models/user.js";
import { getResetPasswordTemplate } from "../utils/emailTemplates.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import { delete_file, upload_file } from "../utils/cloudinary.js";
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import dotenv from 'dotenv';
import fs from 'fs';


// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
// const User = require('./models/userModel'); // Đường dẫn tới file model người dùng của bạn
// Đường dẫn tới file cấu hình local
const localConfigPath = "backend/config/config.env.local";

// Chỉ sử dụng config.env ở Development
if (process.env.NODE_ENV !== "PRODUCTION") {
  // Kiểm tra sự tồn tại của file cấu hình local
  if (fs.existsSync(localConfigPath)) {
    // Nếu tồn tại, sử dụng file cấu hình local
    dotenv.config({ path: localConfigPath });
  } else {
    dotenv.config({ path: "backend/config/config.env" });
  }
}

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    // Tìm hoặc tạo người dùng mới dựa trên thông tin từ Google
    const newUser = {
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      // Giả sử avatar được lấy từ hình ảnh hồ sơ Google
      avatar: {
        public_id: "google_avatar_" + profile.id, // Tạo ID tùy ý cho public_id
        url: profile.photos[0].value
      },
    };
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = await User.create(newUser);
      }
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name'] // Yêu cầu thông tin này từ Facebook
  },
  async (accessToken, refreshToken, profile, done) => {
    // Tương tự như Google Strategy
    const newUser = {
      facebookId: profile.id,
      email: profile.emails[0].value,
      name: `${profile.name.givenName} ${profile.name.familyName}`,
    };
    try {
      let user = await User.findOne({ facebookId: profile.id });
      if (!user) {
        user = await User.create(newUser);
      }
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});