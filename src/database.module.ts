import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from './common/config/connection-db.config';
import { SeedService } from './database/seeders/seed.service';
import { SeedModule } from './database/seeders/seed.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
    SeedModule,
  ],
  providers: [DatabaseConfigService, SeedService],
  exports: [DatabaseConfigService],
})
export class DatabaseModule implements OnModuleInit {
  constructor(private readonly seedService: SeedService) {}

  async onModuleInit() {
    await this.seedService.seed();
  }
}
