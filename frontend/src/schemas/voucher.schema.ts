export interface Voucher {
	_id: string;
	code: string;
	title: string;
	description: string;
	value: number;
	start: Date;
	end: Date;
	isDeleted?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}
