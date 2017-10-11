import * as transactionCreate from './transaction-create.json';
import * as transactionPay from './transaction-pay.json';
import * as transactionTransfer from './transaction-transfer.json';

export const transactionCreateSchema = transactionCreate as any;
export const transactionPaySchema = transactionPay as any;
export const transactionTransferSchema = transactionTransfer as any;
