import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EquipmentService } from 'libs/nest/equipment/src/lib/service/equipment.service';
import { EquipmentMService } from 'libs/nest/equipment/src/lib/service/equipment_m.service';
import { equipmentdto } from 'libs/nest/equipment/src/lib/service/equipmentdto';
// import { __values } from 'tslib';
@Controller('equipments')
// @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
export class EquipmentController {
  constructor(
    private readonly ep: EquipmentService,
    private readonly epm: EquipmentMService
  ) {}

  /**
   * 获取全部设备信息
   * @returns
   */
  @Get()
  getAll(
    @Query('e_id') e_id: string,
    @Query('e_name') e_name: string,
    @Query('e_state') e_state: string,
    @Query('e_type') e_type: string,
    @Query('in_time') in_time: string,
    @Query('warranty_time') warranty_time: string,
    @Query('PageIndex') PageIndex: number,
    @Query('PageSize') PageSize: number
  ) {
    const Page = { PageIndex, PageSize };
    const searchValue = {
      e_id,
      e_name,
      e_state,
      e_type,
      in_time,
      warranty_time,
    };
    // console.log(searchValue);

    return this.ep.getAll(searchValue, Page);
  }
  @Get('/page')
  findPage(
    @Query('PageIndex') PageIndex: number,
    @Query('PageSize') PageSize: number
  ) {
    return this.ep.findPage(PageIndex, PageSize);
  }
  /**
   * 获取全部设备维修记录
   * @returns
   */
  @Get('/maintances')
  getMaintance() {
    console.log('maintances');
    return this.epm.getAll();
  }
  @Get('/maintances/page')
  findMPage(
    @Query('PageIndex') PageIndex: number,
    @Query('PageSize') PageSize: number
  ) {
    return this.epm.findPage(PageIndex, PageSize);
  }
  /**
   * 查询所有设备日志记录
   * @returns
   */
  @Get('/logs')
  getLogs() {
    console.log('log');
    return this.ep.getlogs();
  }
  @Get('/logs/page')
  findLogPage(
    @Query('PageIndex') PageIndex: number,
    @Query('PageSize') PageSize: number
  ) {
    return this.ep.logPage(PageIndex, PageSize);
  }
  /**
   * 查询所有设备日志记录
   * @returns
   */
  @Get(':e_id/logs')
  getLogsByid(@Param('e_id') e_id: string) {
    console.log('log');
    return this.ep.getLogsByid(e_id);
  }

  /**
   * 获取指定设备信息
   * @returns
   */
  @Get(':e_id')
  getById(@Param('e_id') e_id: string) {
    console.log(222222);
    return this.ep.getById(e_id);
  }

  /**
   * 获取指定设备维修记录信息
   * @returns
   */
  @Get(':e_id/maintances')
  mantanceById(@Param('e_id') e_id: string) {
    // console.log(e_id, 222222);
    return this.epm.getById(e_id);
  }

  /**
   * 修改指定设备信息
   * @returns
   */
  @Put(':e_id')
  updateEp(@Param('e_id') e_id: string, @Body() Body: equipmentdto) {
    return this.ep.updateEp(e_id, Body);
  }

  /**
   * 删除指定设备信息
   * @returns
   */
  @Delete(':e_id')
  deleteEp(@Param('e_id') id: string) {
    return this.ep.deleteEp(id);
  }

  /**
   * 删除指定设备维修记录信息
   * @returns
   */
  @Delete(':e_id/maintances/:id')
  deletemantance(@Param('e_id') e_id: string, @Param('id') id: string) {
    console.log(e_id, id);
    return this.epm.deleteEp(e_id, id);
  }

  /**
   * 添加设备信息
   * @returns
   */
  @Post()
  addEp(@Body() body: any) {
    return this.ep.addEp(body);
  }

  /**
   * 添加设备维修信息
   * @returns
   */
  @Post('/maintances')
  addEpm(@Body() body: any) {
    return this.epm.addEp(body);
  }
}
