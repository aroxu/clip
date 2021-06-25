import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { ClipService } from './clip.service';

@Controller()
export class ClipController {
  constructor(private readonly appService: ClipService) {}

  @Get('download')
  @Redirect('http://papermc.io', 301)
  async getBuildJarWithMcVersionAndBuildNumber(
    @Query('mc_version') mcVersion: string,
    @Query('build') buildNumber: number,
  ) {
    return {
      url: await this.appService.getBuildJarWithMcVersionAndBuildNumber(
        mcVersion,
        buildNumber,
      ),
    };
  }

  @Get('builds')
  async getBuildNumbersWithMcVersion(@Query('mc_version') mcVersion: string) {
    return await this.appService.getBuildNumbersWithMcVersion(mcVersion);
  }

  @Get('versions')
  async getBuiltMcVersions() {
    return await this.appService.getBuiltMcVersions();
  }
}
