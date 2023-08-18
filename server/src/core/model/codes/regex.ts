export const  RegularExpressions =
{
	PASSWORD : /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!.%+{};:()<>@$%^&*[\]-]).\S{5,}$/,
	VALID_URL: /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/,
};