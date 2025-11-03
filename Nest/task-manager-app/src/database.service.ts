import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseMonitorService implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  onModuleInit() {
    this.connection.on('connected', () => {
      Logger.log('✅ MongoDB connected successfully', 'Database');
    });

    this.connection.on('error', (err) => {
      Logger.error('❌ MongoDB connection failed', err, 'Database');
    });

    this.connection.on('disconnected', () => {
      Logger.warn('⚠️ MongoDB disconnected', 'Database');
    });

    if (this.connection.readyState === 1) {
      Logger.log('✅ Already connected to MongoDB', 'Database');
    } else {
      Logger.warn(
        `⏳ MongoDB not connected yet (state: ${this.connection.readyState})`,
        'Database',
      );
    }

    Logger.log('📡 MongoDB connection listeners initialized', 'Database');
  }
}



//readyState	Meaning
// 0	        Disconnected
// 1	        Connected
// 2	        Connecting
// 3	        Disconnecting