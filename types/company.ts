export type Company = {
	id: number;
	name: string;
	number: string;
};

export type CompanyInput = Omit<Company, 'id'>;
