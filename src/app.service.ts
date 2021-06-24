import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  async getLatest(mcVersion: string): Promise<string> {
    const buildsDataWithMcVersions = await axios.get(
      `http://papermc.io/api/v2/projects/paper/versions/${mcVersion}`,
    );
    const buildNumber =
      buildsDataWithMcVersions.data.builds[
        buildsDataWithMcVersions.data.builds.length - 1
      ];
    const downloadUrl = await axios.get(
      `http://papermc.io/api/v2/projects/paper/versions/${mcVersion}/builds/${buildNumber}`,
    );
    return `http://papermc.io/api/v2/projects/paper/versions/${mcVersion}/builds/${buildNumber}/downloads/${downloadUrl.data.downloads.application.name}`;
  }
}
