import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AdminsService } from '@/domains/admins/admins.service';
import {
	ChangePasswordDto,
	CreateAdminDto,
	UpdateAdminDto,
} from '@/domains/admins/dto/admin.dto';

@ApiTags('Admins')
@Controller('admins')
export class AdminsController {
	constructor(private readonly adminsService: AdminsService) {}

	@Post()
	async create(@Body() createAdminDto: CreateAdminDto) {
		return await this.adminsService.create(createAdminDto);
	}

	@Get(':username')
	async getByUsername(@Param('username') username: string) {
		return await this.adminsService.getByUsername(username);
	}

	@Put(':username')
	async update(
		@Param('username') username: string,
		@Body() updateAdminDto: UpdateAdminDto,
	) {
		return await this.adminsService.update(username, updateAdminDto);
	}

	@Put(':username/change-password')
	async changePassword(
		@Param('username') username: string,
		@Body() changePasswordDto: ChangePasswordDto,
	) {
		return await this.adminsService.changePassword(username, changePasswordDto);
	}
}
