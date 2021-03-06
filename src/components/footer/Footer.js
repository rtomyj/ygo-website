import React from 'react'
import {Typography, Paper} from '@material-ui/core'


const Footer = () =>
{
	return(
		<div className='footer' >
			<Typography
				className='footer-font'
				variant='body1'
				align='center' >
				Copyright 2021
			</Typography>

			<Typography
				className='footer-font'
				variant='body1'
				align='center' >
				Konami Digital Entertainment owns all rights to Yu-Gi-Oh!
			</Typography>
		</div>
	)
}


export default Footer