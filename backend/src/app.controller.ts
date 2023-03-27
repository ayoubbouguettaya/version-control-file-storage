import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { SaveDataDto } from './dto/save-data.dto';
import { GetHistoryPaginationDto } from './dto/get-history-pagination.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('data')
  async getData() {
    const content = await this.appService.getData();
    console.log('content: ', content, '\n')
    return content;
  }

  @Post('data')
  async saveData(
    @Body() data: SaveDataDto
  ) {
    console.log("================================================")
    console.log(data)
    console.log("================================================")
    return await this.appService.saveData(data);
  }

  @Get('commit-history')
  async getCommitHistory(
    @Query() pagination: GetHistoryPaginationDto
  ) {
    return await this.appService.getCommitHistory(pagination);
  }

  @Get('data/:commitHash')
  async getChangesAndDataStateByCommit(@Param('commitHash') commitHash: string) {
    return await this.appService.getChangesAndDataStateByCommit(commitHash);
  }

  @Post('rollback/:commitHash')
  rollBack(@Param('commitHash') commitHash: string) {
    return this.appService.rollBack(commitHash);
  }

}
