import * as mongoose from 'mongoose';
import { GENDER, ROLES, STATUS } from '../common/constants/constants';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 3,
      max: 100,
      require: true,
    },
    email: {
      type: String,
      unique: true, ///11000 this is error code for duplicate key error
      require: true,
    },
    password: {
      type: String,
      require: true,
      min: 8,
      max: 100,
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.CUSTOMER,
    },
    status: {
      type: String,
      enum: Object.values(STATUS),
      default: STATUS.INACTIVE,
    },
    address: {
      billingAddress: {
        type: String,
      },
      shippingAddress: {
        type: String,
      },
    },
    gender: {
      type: String,
      enum: Object.values(GENDER),
    },
    dob: {
      type: Date,
    },
    image: {
      publicId: String,
      secureUrl: String,
      optimizedUrl: String,
    },
    activationToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    ExpiryTime: {
      type: Date,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
  },
);

export const UserModel = mongoose.model('User', UserSchema);
