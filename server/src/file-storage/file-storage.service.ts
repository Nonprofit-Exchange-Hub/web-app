import { Inject, Injectable } from '@nestjs/common';
import { FilePrefix } from './domain';
import { AZURE_BLOB_PROVIDER_TOKEN } from './storage-providers/azure-blob-storage';
import { LOCAL_STORAGE_PROVIDER_TOKEN } from './storage-providers/local-storage';

/**
 * Arguments to pass to a file storage provider
 */
export interface FileStorageArgs {
  file: Express.Multer.File;
  userId: number;
  prefix: FilePrefix;
  replaceFlag: 'replace' | 'new';
}

/**
 * A storage provider should implement this interface
 */
export interface IFileStorage {
  uploadFile: (uploadArgs: FileStorageArgs) => Promise<string>;
}

Injectable();
/**
 * FilesStorageService resolves the file storage scheme based on custom rules
 * Current providers:
 *   - Azure blob - production
 *   - Disk - local dev
 */
export class FilesStorageService {
  constructor(
    @Inject(AZURE_BLOB_PROVIDER_TOKEN) private readonly azureStorage: IFileStorage,
    @Inject(LOCAL_STORAGE_PROVIDER_TOKEN) private readonly diskStorage: IFileStorage,
  ) {}

  /**
   * This method resolves the file storage implementaion depending on the evironment
   * or other customizations
   * @param storageArgs
   * @returns the stored file path
   */
  public async storeImage(storageArgs: FileStorageArgs): Promise<string> {
    if (process.env.MODE === 'production') {
      return await this.azureStorage.uploadFile(storageArgs);
    } else {
      return await this.diskStorage.uploadFile(storageArgs);
    }
  }
}
