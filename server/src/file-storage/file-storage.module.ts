import { Module } from '@nestjs/common';
import { FilesStorageService } from './file-storage.service';
import {
  AzureBlobStorage,
  AZURE_BLOB_PROVIDER_TOKEN,
} from './storage-providers/azure-blob-storage';
import {
  LocalStorageProvider,
  LOCAL_STORAGE_PROVIDER_TOKEN,
} from './storage-providers/local-storage';

@Module({
  providers: [
    { provide: AZURE_BLOB_PROVIDER_TOKEN, useClass: AzureBlobStorage },
    { provide: LOCAL_STORAGE_PROVIDER_TOKEN, useClass: LocalStorageProvider },
    FilesStorageService,
  ],
  exports: [FilesStorageService],
})
export class FileStorageModule {}
