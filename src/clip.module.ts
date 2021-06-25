import { Module } from '@nestjs/common';
import { ClipController } from './clip.controller';
import { ClipService } from './clip.service';

@Module({
  imports: [],
  controllers: [ClipController],
  providers: [ClipService],
})
export class ClipModule {}
