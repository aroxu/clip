import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ClipController } from './clip.controller';
import { ClipService } from './clip.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../'),
    }),
  ],
  controllers: [ClipController],
  providers: [ClipService],
})
export class ClipModule {}
