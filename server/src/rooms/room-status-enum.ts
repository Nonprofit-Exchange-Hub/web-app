/**
 * Certain business rules for a room lice-cycle
 */
export enum RoomStatus {
  /**
   * When a room is first created after a transaction is claimed
   */
  NEW_CLAIM = 'NEW_CLAIM',
  /**
   * When a a room's last message was N (TBD) days ago
   */
  ACITVE = 'ACTIVE',
  /**
   * When a transaction is fulfilled, the room is closed
   */
  CLOSED = 'CLOSED',
}
