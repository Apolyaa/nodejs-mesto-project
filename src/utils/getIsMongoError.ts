const getIsMongoError = (error: unknown): error is Error & { code: number } => error instanceof Error
    && 'code' in error
    && typeof error.code === 'number';

export default getIsMongoError;
