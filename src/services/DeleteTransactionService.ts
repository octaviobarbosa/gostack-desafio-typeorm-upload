import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';

interface Response {
  deleted: boolean;
}

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    if (!id) {
      throw new AppError('Id is required');
    }

    const transactionRepository = getRepository(Transaction);

    const checkId = await transactionRepository.findOne(id);

    if (!checkId) {
      throw new AppError('Transaction not found!');
    }

    await transactionRepository.delete(id);
  }
}

export default DeleteTransactionService;
