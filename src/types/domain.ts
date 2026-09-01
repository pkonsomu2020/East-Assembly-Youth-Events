export interface EventDef {
  slug: string;
  name: string;
  subtitle?: string;
  dateLabel: string;
  dateISO: string | null;
  venue?: string;
  /** Precise Google Maps link for the venue. Falls back to a maps search built from `venue` if omitted. */
  mapUrl?: string;
  time?: string;
  blurb: string;
  requiresPayment: boolean;
  feeAmount?: number;
  poster?: string;
}

export type GarmentIconId =
  | 'hoodie'
  | 'tshirt'
  | 'jersey'
  | 'cap'
  | 'tote'
  | 'pen'
  | 'sweatshirt'
  | 'sweatsuit';

export interface MerchItem {
  id: GarmentIconId | 'book';
  name: string;
  price: number | null;
  hasSize: boolean;
  hasColor: boolean;
  hasTeam: boolean;
  comingSoon?: boolean;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export type AlertType = 'success' | 'error' | 'info';

export interface AlertState {
  message: string;
  type: AlertType;
}
