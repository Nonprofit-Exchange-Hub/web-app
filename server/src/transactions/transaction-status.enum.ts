/**
 * Certain business rules for a transaction lice-cycle
 */
export enum TransactionStatus {
  /**
   * When a room is first created after a transaction is claimed
   */
  NEW_CLAIM = 'NEW_CLAIM',
  /**
   * When last message was lesss than N (TBD) days ago
   */
  IN_PROGRESS = 'IN_PROGRESS',
  /**
   * When a transaction is fulfilled
   */
  COMPLETED = 'FULFILLED',
  /**
   * When a transaction is abandoned by either party
   */
  CANCELLED = 'CANCELLED',
}
