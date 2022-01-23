export type Contact = {
	id: number;
	name: string;
	number: string;
	company_id: number | undefined;
};

export type ContactFullInfo = {
	id: number;
	name: string;
	number: string;
	company_name: string;
	company_number: string;
};

export type ContactInput = Omit<Contact, 'id' | 'company_id'>;
