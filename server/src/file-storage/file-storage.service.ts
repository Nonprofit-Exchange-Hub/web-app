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
export class FilesStorageService {
  /**
   * We can change the provider inside the `@Inject` decorator
   * @param storageProvider
   */
  constructor(
    // Change to LOCAL_STORAGE_PROVIDER_TOKEN in development
    // @Inject(LOCAL_STORAGE_PROVIDER_TOKEN) private readonly storageProvider: IFileStorage,
    @Inject(AZURE_BLOB_PROVIDER_TOKEN) private readonly storageProvider: IFileStorage,
  ) {}

  /**
   * This method wraps the file storage implementaion behind an interface
   * Can be consumed by a service regardless of the specific implementation,
   * e.g Azure, local, S3, etc.
   * @param storageArgs
   * @returns the stored file path
   */
  public async storeImage(storageArgs: FileStorageArgs): Promise<string> {
    return await this.storageProvider.uploadFile(storageArgs);
  }
}
