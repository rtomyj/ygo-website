import React, { lazy, memo } from 'react'
import { Grid } from '@material-ui/core'
import {RightBoxPaper, RightBoxHeaderTypography, RightBoxSubHeaderTypography, RightBoxHeaderContainer} from '../../util/grid/OneThirdTwoThirdsGrid'
import Footer from '../../Footer'

import {DarkTranslucentDivider} from '../../util/Divider'

const CardProductInformation = lazy( () => import('./CardProductInformation') )
const CardBanListInformation = lazy( () => import('./CardBanListInformation') )


const CardInformationRelatedContent = memo( ({ cardName, isLoading, productInfo, banListInfo, cardID } ) =>
{
	return (
		<RightBoxPaper>
			<RightBoxHeaderContainer >
				<RightBoxHeaderTypography variant='h4' >
					Explore
				</RightBoxHeaderTypography>
				<RightBoxSubHeaderTypography variant='h5'>
					Related Content For <i>{cardName}</i>
				</RightBoxSubHeaderTypography>

				<DarkTranslucentDivider />
			</RightBoxHeaderContainer>

			<Grid container spacing={1} >
				<Grid item xs={12} sm={12} md={12} lg={6} xl={6}  style={ { display: 'inline-grid' } } >
					{(isLoading)? undefined
					: <CardProductInformation
						isLoading={isLoading}
						hasInfo={ (productInfo.length === 0)? false : true }
						headerText={'Products'}
						noInfoText={'Not Found In Any Product'}
						background='#a4508b'
						backgroundImage='linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)'
						cardInfo={productInfo}
						cardID={cardID}
					/>
					}
				</Grid>

				<Grid item xs={12} sm={12} md={12} lg={6} xl={6} style={ { display: 'inline-grid' } } >
					{(isLoading)? undefined
					: <CardBanListInformation
						isLoading={isLoading}
						hasInfo={ (banListInfo.length === 0)? false : true }
						headerText={'Ban Lists'}
						noInfoText={`Not Found In Any Ban List`}
						background='#fc9842'
						backgroundImage='linear-gradient(315deg, #fc9842 0%, #fe5f75 74%)'
						cardInfo={banListInfo}
					/>
					}

				</Grid>
				<Footer />

			</Grid>
		</RightBoxPaper>
	)
},  (prevProps, newProps) => {
	if ( prevProps.isLoading !== newProps.isLoading )
		return false

	return true
})


export default CardInformationRelatedContent