import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import { Model } from 'mongoose';
import { AdminDocument } from './admin.schema';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('Admin') private readonly AdminRepo: Model<AdminDocument>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async createAdmin(dto: CreateAdminDto): Promise<AdminDocument> {
    const findAdmins = await this.AdminRepo.find({ email: dto.email });

    if (findAdmins.length) {
      throw new BadRequestException('email in use');
    }

    const hashPassword = await hash(
      dto.password,
      +this.configService.get('SALT'),
    );
    const admin = new this.AdminRepo({
      email: dto.email,
      password: hashPassword,
    });
    return admin.save();
  }

  async loginAdmin(dto: CreateAdminDto): Promise<AdminDocument> {
    const [findAdmin] = await this.AdminRepo.find({
      email: dto.email,
    });

    if (!findAdmin) {
      throw new BadRequestException('Admin not found');
    }

    const isPasswordCorrect = await compare(dto.password, findAdmin.password);
    if (!isPasswordCorrect) {
      throw new HttpException(
        'Admin password bad',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return findAdmin;
  }

  async addJWT(email: string) {
    const payload = { email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
