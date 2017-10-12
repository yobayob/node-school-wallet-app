import * as transactionCreate from './transaction-create.json';
import * as transactionPay from './transaction-pay.json';
import * as transactionTransfer from './transaction-transfer.json';
import * as cardCreate from './card-create.json';

export const transactionCreateSchema = transactionCreate as any;
export const transactionPaySchema = transactionPay as any;
export const transactionTransferSchema = transactionTransfer as any;
export const cardCreateSchema = cardCreate as any;
