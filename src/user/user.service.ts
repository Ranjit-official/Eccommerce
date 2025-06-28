import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserModel } from './user.model';
import { STATUS } from 'src/common/constants/constants';

@Injectable()
export class UserService {
  getUserPublicProfile = (user: any) => {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: {
        billingAddress: 'ktm',
        shippingAddress: 'ktm',
      },
      role: user.role,
      gender: user.gender,
      dob: user.dob,
      image: user.image,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      createdBy: user.createdBy,
      updatedBy: user.updatedBy,
    };
  };

  getSingleUserByFilter = async (filter: any) => {
    try {
      const user = await UserModel.findOne(filter);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (exception) {
      exception.message =
        exception.message ||
        'Something went wrong from user service getSingleUserByFilter';
      throw new BadRequestException(exception);
    }
  };

  updateUserById = async (id: string) => {
    try {
      const user = await UserModel.findOneAndUpdate(
        { _id: id },
        { $set: { status: STATUS.ACTIVE, activationToken: null } },
        { new: true },
      );
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (exception) {
      exception.message =
        exception.message ||
        'Something went wrong from user service updateUserById';
      throw new BadRequestException(exception);
    }
  };
}
