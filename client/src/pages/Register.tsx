import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.css'
import Logo from '../assets/logo.svg'
import request  from '../utils/request';
import { endpoints } from '../configs/env';
import { validateToken } from '../utils';

const toastConfigs: ToastOptions = {
	position: 'top-right',
	autoClose: 8000,
	pauseOnHover: true,
	draggable: true,
	theme: 'dark'
};

function Register()
{
	const navigate = useNavigate();
	const [values, setValues] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	});
	
	const handleSubmit = async(event: any) =>
	{
		event.preventDefault();
		if (handleValidation())
		{
			const {username, password, email} = values;
			const { data, status, response } = await request('POST', endpoints.register, {username, password, email}, '');
			
			if (status !== 200)
			{
				toast.error(response.data.description, toastConfigs);
			}
			else
			{
				localStorage.setItem('chatpad-user', JSON.stringify(data));
				navigate('/');
			}
		}
	}

	const handleChange = (event: any) =>
	{
		setValues({...values, [event.target.name]: event.target.value})
	}

	const handleValidation = () =>
	{
		let result = true;
		const { password, confirmPassword, username, email } = values;
		
		if (password !== confirmPassword)
		{
			result = false;
			toast.error("Passwords doesn't match", toastConfigs);
		}
		else
		if (password?.trim().length < 4)
		{
			result = false;
			toast.error("Password should be greater than 5 charaters", toastConfigs);
		}
		else
		if (username?.trim().length < 3)
		{
			result = false;
			toast.error("Username cannot be less than 3 characters", toastConfigs);
		}
		else
		if (!email?.trim())
		{
			result = false;
			toast.error("Email cannot be empty", toastConfigs);
		}

		return result;
	}

	useEffect(() =>
	{
		if (localStorage.getItem('chatpad-user'))
		{
			navigate("/");
		}
	}, []);

  return (
	<>
		<FormContainer>
			<form onSubmit={(event) => handleSubmit(event)}>
				<div className='brand'>
					<img src={Logo} alt='Logo'/>
					<h1>ChatPad</h1>
				</div>
				<input
					type='text'
					placeholder= 'User name'
					name='username'
					onChange={(e) => handleChange(e)}
				/>
				<input
					type='email'
					placeholder= 'Email'
					name='email'
					onChange={(e) => handleChange(e)}
				/>
				<input
					type='password'
					placeholder= 'Password'
					name='password'
					onChange={(e) => handleChange(e)}
				/>
				<input
					type='password'
					placeholder= 'Confirm Password'
					name='confirmPassword'
					onChange={(e) => handleChange(e)}
				/>
				<button type='submit'>Create Account</button>
				<span>Already have an account ? <Link to='/login'>Login</Link></span>
			</form>
		</FormContainer>
		<ToastContainer/>
	</>
  )
}

const FormContainer = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1rem;
	align-items: center;
	.brand {
		display: flex;
		align-items: center;
		gap: 1rem;
		justify-content: center;
		img {
			height: 2rem;
		}
		h1 {
			color: #3D33FF;
			text-transform: uppercase;
		}
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		background-color: #EEEEFF;
		border-radius: 2rem;
		padding: 3rem 5rem;
		input {
			// background-color: transparent;
			padding: 1rem;
			border: 0.1rem solid #997af0;
			border-radius: 0.4rem;
			color: black;
			width: 100%;
			font-size: 1rem;
			&:focus {
				border: 0.1rem solid #3D33FF;
				outline: none;
			}
		}
		button {
			background-color: #997af0;
			color: white;
			padding: 1rem 2rem;
			border: none;
			cursor: pointer;
			border-radius: 0.4rem;
			font-size: 1rem;
			text-transform: uppercase;
			&:hover {
				background-color: #3D33FF;
			}
		}
		span {
			text-transform: uppercase;
			a {
				color: #3D33FF;
				text-decoration: none;
				font-weight: bold;
			}
		}
	}
	`;
	// background-color: '#ffffff'


export default Register