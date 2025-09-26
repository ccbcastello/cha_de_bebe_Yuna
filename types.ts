export interface GiftItem {
  name: string;
  totalQuantity: number;
  reservedBy: string[];
}

export enum RsvpStatus {
  Yes = "Sim",
  Maybe = "Talvez",
  No = "Não",
}
