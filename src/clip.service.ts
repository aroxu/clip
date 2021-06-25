import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ClipService {
  async getBuildJarWithMcVersionAndBuildNumber(
    mcVersion: string,
    reqBuildNumber: number,
  ): Promise<string> {
    let buildsDataWithMcVersions: { builds: string | any[] };
    if (isNaN(reqBuildNumber)) {
      await axios
        .get(`http://papermc.io/api/v2/projects/paper/versions/${mcVersion}`)
        .then((data) => {
          buildsDataWithMcVersions = data.data;
        })
        .catch((error) => {
          if (
            error.response !== undefined &&
            error.response.status === HttpStatus.NOT_FOUND
          ) {
            throw new HttpException(
              {
                status: HttpStatus.FORBIDDEN,
                error: `It seems there is no builds for ${mcVersion}!`,
                detail_error: error.response.data.error,
                paper_url: `http://papermc.io/api/v2/projects/paper/versions/${mcVersion}`,
                tip: `Try to check your version has been built for paper at least once.`,
              },
              HttpStatus.BAD_REQUEST,
            );
          } else {
            throw new HttpException(
              {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: `It seems there is error while sending request to papermc api server!`,
                detail_error:
                  error.response === undefined
                    ? 'Failed to send request'
                    : error.response.data,
                paper_url: `http://papermc.io/api/v2/projects/paper/versions/${mcVersion}`,
                tip: `Try to check papermc's api server status. If you think this is Clip's error, report it on https://github.com/aroxu/clip/issues/`,
              },
              HttpStatus.BAD_REQUEST,
            );
          }
        });
      const buildNumber =
        buildsDataWithMcVersions.builds[
          buildsDataWithMcVersions.builds.length - 1
        ];
      const downloadUrl = await axios.get(
        `http://papermc.io/api/v2/projects/paper/versions/${mcVersion}/builds/${buildNumber}`,
      );
      return `http://papermc.io/api/v2/projects/paper/versions/${mcVersion}/builds/${buildNumber}/downloads/${downloadUrl.data.downloads.application.name}`;
    } else {
      let downloadUrl: { downloads: { application: { name: any } } };
      await axios
        .get(
          `http://papermc.io/api/v2/projects/paper/versions/${mcVersion}/builds/${reqBuildNumber}`,
        )
        .then((data) => {
          downloadUrl = data.data;
        })
        .catch((error) => {
          if (
            error.response !== undefined &&
            error.response.status === HttpStatus.NOT_FOUND
          ) {
            throw new HttpException(
              {
                status: HttpStatus.FORBIDDEN,
                error: `It seems there is no builds for ${mcVersion} with build number ${reqBuildNumber}!`,
                detail_error: error.response.data.error,
                paper_url: `http://papermc.io/api/v2/projects/paper/versions/${mcVersion}/builds/${reqBuildNumber}`,
                tip: `Try to check your version has been built for paper at least once and check your build number.`,
              },
              HttpStatus.BAD_REQUEST,
            );
          } else {
            throw new HttpException(
              {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: `It seems there is error while sending request to papermc api server!`,
                detail_error:
                  error.response === undefined
                    ? 'Failed to send request'
                    : error.response.data,
                paper_url: `http://papermc.io/api/v2/projects/paper/versions/${mcVersion}`,
                tip: `Try to check papermc's api server status. If you think this is Clip's error, report it on https://github.com/aroxu/clip/issues/`,
              },
              HttpStatus.BAD_REQUEST,
            );
          }
        });
      return `http://papermc.io/api/v2/projects/paper/versions/${mcVersion}/builds/${reqBuildNumber}/downloads/${downloadUrl.downloads.application.name}`;
    }
  }

  async getBuildNumbersWithMcVersion(
    mcVersion: string,
  ): Promise<Array<string>> {
    let buildsDataWithMcVersions;
    await axios
      .get(`http://papermc.io/api/v2/projects/paper/versions/${mcVersion}`)
      .then((data) => {
        buildsDataWithMcVersions = data.data;
      })
      .catch((error) => {
        if (
          error.response !== undefined &&
          error.response.status === HttpStatus.NOT_FOUND &&
          (mcVersion === undefined || mcVersion === '')
        ) {
          throw new HttpException(
            {
              status: HttpStatus.FORBIDDEN,
              error: `You have to give minecraft version with parameter mc_version!`,
              tip: `Try to check your request and try again.`,
            },
            HttpStatus.BAD_REQUEST,
          );
        } else if (
          error.response !== undefined &&
          error.response.status === HttpStatus.NOT_FOUND
        ) {
          throw new HttpException(
            {
              status: HttpStatus.FORBIDDEN,
              error: `It seems there is no builds for ${mcVersion}!`,
              detail_error: error.response.data.error,
              paper_url: `http://papermc.io/api/v2/projects/paper/versions/${mcVersion}`,
              tip: `Try to check your version has been built for paper at least once.`,
            },
            HttpStatus.BAD_REQUEST,
          );
        } else {
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              error: `It seems there is error while sending request to papermc api server!`,
              detail_error:
                error.response === undefined
                  ? 'Failed to send request'
                  : error.response.data,
              paper_url: `http://papermc.io/api/v2/projects/paper/versions/${mcVersion}`,
              tip: `Try to check papermc's api server status. If you think this is Clip's error, report it on https://github.com/aroxu/clip/issues/`,
            },
            HttpStatus.BAD_REQUEST,
          );
        }
      });
    return buildsDataWithMcVersions.builds;
  }

  async getBuiltMcVersions(): Promise<Array<string>> {
    let buildsDataWithMcVersions;
    await axios
      .get('http://papermc.io/api/v2/projects/paper')
      .then((data) => {
        buildsDataWithMcVersions = data.data;
      })
      .catch((error) => {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `It seems there is error while sending request to papermc api server!`,
            detail_error:
              error.response === undefined
                ? 'Failed to send request'
                : error.response.data,
            paper_url: `http://papermc.io/api/v2/projects/paper}`,
            tip: `Try to check papermc's api server status. If you think this is Clip's error, report it on https://github.com/aroxu/clip/issues/`,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
    return buildsDataWithMcVersions.versions;
  }
}
