import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { Injectable } from '@nestjs/common';
import { FilePrefix } from './file-prefix';

Injectable();
export class FilesService {
  private readonly CONTAINER_NAME = process.env.AZURE_BLOB_CONTAINER;

  private getAzureBlobInstance() {
    const connectionString = process.env.AZURE_BLOB_CONNECTION_STR;
    const azureBlobClientService = BlobServiceClient.fromConnectionString(connectionString);
    return azureBlobClientService;
  }

  private async getBlobClient(imageName: string): Promise<BlockBlobClient> {
    const blobService = await this.getAzureBlobInstance();
    const containerClient = blobService.getContainerClient(this.CONTAINER_NAME);
    const blockBlobClient = containerClient.getBlockBlobClient(imageName);
    return blockBlobClient;
  }

  public async uploadFile(
    file: Express.Multer.File,
    userId: number,
    prefix: FilePrefix,
    replaceFlag: 'replace' | 'new',
  ) {
    const extension = file.originalname.split('.').pop();
    const fileName = `${prefix}-${userId}.${extension}`;
    const blockBlobClient = await this.getBlobClient(fileName);

    // !TODO: figure out a way to delete file regardless of the extension
    // Currently it only deletes based on the name of the new file
    // name includes the extension
    if (replaceFlag === 'replace') {
      await blockBlobClient.deleteIfExists();
    }

    const fileUrl = blockBlobClient.url;
    await blockBlobClient.uploadData(file.buffer);
    return fileUrl;
  }
}
