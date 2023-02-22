import { FileStorageArgs, IFileStorage } from '../file-storage.service';
import { createWriteStream } from 'fs';
import * as path from 'path';

export class LocalStorageProvider implements IFileStorage {
  public uploadFile = async (uploadArgs: FileStorageArgs): Promise<string> => {
    const { file, prefix, userId } = uploadArgs;
    const readableStream = uploadArgs.file.buffer;
    const fileName = `${prefix}-${userId}.${file.originalname.split('.').pop()}`;
    const devFileUrl = `http://localhost:3000/${fileName}`;
    const writableStream = createWriteStream(
      path.join(__dirname, '..', '..', '..', '..', 'client', 'public', fileName),
      { flags: 'a' }, // append files
    );

    writableStream.on('end', () => {
      console.log(`############failed to save: ${fileName}`);
    });

    writableStream.on('error', (err) => {
      console.log(err.stack);
    });

    writableStream.write(readableStream);

    return Promise.resolve(devFileUrl);
  };
}

export const LOCAL_STORAGE_PROVIDER_TOKEN = LocalStorageProvider.name;
