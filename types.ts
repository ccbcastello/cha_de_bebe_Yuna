export interface GiftItem {
  // FIX: Added 'id' property to align the type definition with its usage in the application.
  id: number;
  name: string;
  totalQuantity: number;
  reservedBy: string[];
}

export enum RsvpStatus {
  Yes = "Sim",
  Maybe = "Talvez",
  No = "Não",
}