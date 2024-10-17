export interface Admin {
	_id: string;
	fullName: string;
	username: string;
	hashedPassword: string;
	createdAt?: Date;
	updatedAt?: Date;
}
