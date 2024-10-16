export interface Course {
	_id: string;
	code: string;
	title: string;
	description: string;
	thumbnail: string;
	price: number;
	isDeleted?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}
