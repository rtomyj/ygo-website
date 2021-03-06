import React from 'react'
import '../../css/ygo-card-styles.css'

import { Typography, Box } from '@material-ui/core'

import Styled from 'styled-components'

import he from 'he'
import AtkDef from './AtkDef'


const YGOCardStats = ({ cardColor, cardEffect, monsterType, monsterAtk, monsterDef, cardID, fullDetails, effectMaxLineHeight }) => {
	const CardEffectComponent = (fullDetails) ?
		Styled(Typography)`
			&&
			{
				white-space: pre-wrap;
				color: inherit;
			}
		`
		: Styled(Typography)`
			&&
			{
				white-space: pre-wrap;
				display: -webkit-box;
				-webkit-line-clamp: ${effectMaxLineHeight};
				-webkit-box-orient: vertical;
				overflow: hidden;
				color: inherit;
			}
		`


	return(
		<Box
			className={[`${cardColor}YgoCardSummaryBox`, 'YgoCardDarkText'].join(' ')} id='CardDescription' >
			<Typography
				variant='body1'
				id='MonsterType'
				noWrap={true} >
					{
						( cardColor === 'Spell' || cardColor === 'Trap' ) ? cardColor : monsterType
					}
			</Typography>

			<CardEffectComponent
				variant='body2' >
					{ he.decode(cardEffect) }
			</CardEffectComponent>

			<Box style={{display: 'flex', paddingTop: '.5rem',  alignItems: 'center'}} >
				{
					(fullDetails) ?
						<Typography variant='body2' id='CardID' >
							{cardID}
						</Typography>
						: undefined
				}
				{
					( cardColor === 'Spell' || cardColor === 'Trap' || cardColor === 'Err' ) ?
						undefined :
						(fullDetails) ? <AtkDef monsterAtk={monsterAtk} monsterDef={monsterDef} cardColor={cardColor} /> : undefined
				}
			</Box>
		</Box>
	)
}


export default YGOCardStats