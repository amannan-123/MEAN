export default interface User {
	email: string;
	role: string;
	token: string;
}

const EmptyUser = {
	email: '',
	role: '',
	token: '',
};

export { EmptyUser };
