import { Body, Controller, Post } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AdminDocument } from './admin.schema';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin.dto';
import { CreateAdminDto } from './dto/create-admin.dto';

@Controller('admin')
@Serialize(AdminDto)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('register')
  async create(@Body() dto: CreateAdminDto): Promise<AdminDocument> {
    return await this.adminService.createAdmin(dto);
  }

  @Post('login')
  async login(@Body() dto: CreateAdminDto) {
    const admin = await this.adminService.loginAdmin(dto);
    return await this.adminService.addJWT(admin.email);
  }
}
