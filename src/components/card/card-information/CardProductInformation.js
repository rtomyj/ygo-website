import React, { useEffect, useState } from 'react'
import '../../../css/card-information-styles.css'
import {Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Box} from '@material-ui/core'
import {Skeleton} from '@material-ui/lab'

import {LightTranslucentDivider} from '../../util/Divider'
import { LightTypography } from '../../util/CustomTypography'

import { getDateString, months } from '../../../helper/Dates'
import {Hint} from '../../util/Hints'


export default function CardProductInformation({ isLoading, hasInfo, cardInfo, cardID })
{

	const [productTable, setProductTable] = useState(undefined)

	useEffect(() => {

		if (cardInfo === null || cardInfo === undefined || cardInfo.length === 0) return

		const productTable = <TableContainer className={'table-container'} component={Box} >
			<Table size='small' >
				<TableHead style={{background: 'rgba(0, 0, 0, 0.3)'}}>
					<TableRow>
						<TableCell className={'table-cell'} >ID</TableCell>
						<TableCell className={'table-cell'} >Release</TableCell>
						<TableCell className={'table-cell'} >Position</TableCell>
						<TableCell className={'table-cell'} >Rarities</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{
						cardInfo.map( (product) => (
							product.productContent.map( (content) => (
								<TableRow className={'table-row'} onClick={ () => setTimeout( () => window.location.assign(`/product/${product.productId}#${cardID}`), 150 ) }>
									<TableCell className={'table-cell'} >{product.productId}</TableCell>
									<TableCell className={'table-cell'} >{ getDateString(months, new Date(product.productReleaseDate)) }</TableCell>
									<TableCell className={'table-cell'} >{content.productPosition}</TableCell>
									<TableCell className={'table-cell'} >{content.rarities.join(', ')}</TableCell>
								</TableRow>
							))
						))
					}
				</TableBody>
			</Table>
		</TableContainer>

		setProductTable(productTable)
	}, [cardInfo, cardID])


	return(
		<Paper className={'products card-info-section'} >
			{
				(isLoading)?
					<Skeleton width={150} height={25} />
					: <LightTypography variant='h6' className={'card-info-header'} >
						{'Products'}
					</LightTypography>
			}


			<LightTranslucentDivider className={'divider'} />

			{
				(isLoading)?
					undefined
					: (hasInfo)?
						productTable
						: <Hint text='Not Found In Any Product' variant='subtitle1' backgroundColor='rgba(0, 0, 0, 0.3)' textColor='white'>
							{'Not Found In Any Product'}
						</Hint>
			}
		</Paper>
	)
}