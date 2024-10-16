interface Voucher {
  _id: string;
  code: string;
  title: string;
  description: string;
  value: number;
  start: string;
  end: string;
  isDeleted: boolean;
}

export type { Voucher };
