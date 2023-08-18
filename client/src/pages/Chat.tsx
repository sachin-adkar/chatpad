import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import styled from 'styled-components';
import { getAccessToken, validateToken } from '../utils'
import '../../node_modules/react-toastify/dist/ReactToastify.css'
import request from '../utils/request';
import { Methods } from '../utils/codes/methods';
import { endpoints } from '../configs/env';

const toastConfigs: ToastOptions = {
	position: 'top-right',
	autoClose: 8000,
	pauseOnHover: true,
	draggable: true,
	theme: 'dark'
};

function Chat() {
	// const [avatarSet, setAvatarFlag] = useState(false);
	const navigate = useNavigate();
	
	const [contacts, setContacts] = useState([]);
	const [currentUser, setCurrentUser]: any = useState(JSON.parse(localStorage.getItem('chatpad-user') || '{}'));
	
	const getContacts = () =>
	{
		console.log("🚀 ~ file: Chat.tsx:64 ~ currentUser: Inside", currentUser)
	};

	useEffect(() =>
	{
		(async() =>
		{
			await validateToken(navigate, toast, toastConfigs);
			if (currentUser)
			{
				const contacts = await getContacts();
			}
			if (currentUser.isAvatarSet)
			{
				const { accessToken } = await getAccessToken();
				const data = await request(Methods.GET, `${endpoints.allUsersRoute}`, {}, accessToken);
				console.log('---------contacts', data);
			}
			else
			{
				navigate('/setAvatar');
			}
			if (!currentUser?.accessToken)
			{
				navigate('/login');
			}

			console.log('🚀 ~ file: Chat.tsx:64 ~ currentUser:', currentUser);
		})();
	}, []);
  return (
		
			<Container>
				<div className="container"></div>
				<ToastContainer/>
			</Container>
  )
}

const Container = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	justify-content: center;
	align-items: center;
	background-color: black;
	.container {
		height: 85vh;
		width: 85vw;
		background-color: #000076;
		display: grid;
		grid-template-colums: 25% 75%;
		@media screen and (min-with: 720px) and (max-width: 1080px) {
			grid-template-colums: 35% 65%;
		}

	}
`;

export default Chat