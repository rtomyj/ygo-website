import React, { memo, useState, useEffect, useCallback } from 'react'
import Styled from 'styled-components'

import { Typography, List, ListItemText, Collapse, ListItem } from '@material-ui/core'

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


const ListStatItem = Styled(ListItem)`
	&&
	{
		padding: .25rem;
	}
`


const BanListStats = memo( ( { totalCardsInSelectedList, selectedBanList
	, newForbiddenCards, newLimitedCards, newSemiLimitedCards, numNewForbidden, numNewLimited, numNewSemiLimited, removedCards, numRemoved, cardClicked } ) =>
{
	const [isShowingNewCards, setIsShowingNewCards] = useState(false)
	const [isShowingNewForbiddenCards, setIsShowingNewForbiddenCards] = useState(false)
	const [isShowingNewLimitedCards, setIsShowingNewLimitedCards] = useState(false)
	const [isShowingNewSemiLimitedCards, setIsShowingNewSemiLimitedCards] = useState(false)

	const [removedCardsList, setRemovedCardsList] = useState({})

	const [isShowingRemovedCards, setIsShowingRemovedCards] = useState(false)

	const [newForbiddenCardsList, setNewForbiddenCardsList] = useState([])
	const [newLimitedCardsList, setNewLimitedCardsList] = useState([])
	const [newSemiLimitedCardsList, setNewSemiLimitedCardsList] = useState([])

	const showNewCards = useCallback( () => {
		setIsShowingNewCards(!isShowingNewCards)
	}, [isShowingNewCards])

	const showNewForbiddenCards = useCallback( () => {
		setIsShowingNewForbiddenCards(!isShowingNewForbiddenCards)
	}, [isShowingNewForbiddenCards])

	const showNewLimitedCards = useCallback( () => {
		setIsShowingNewLimitedCards(!isShowingNewLimitedCards)
	}, [isShowingNewLimitedCards])

	const showNewSemiLimitedCards = useCallback( () => {
		setIsShowingNewSemiLimitedCards(!isShowingNewSemiLimitedCards)
	}, [isShowingNewSemiLimitedCards])

	const showRemovedCards = useCallback( () => {
		setIsShowingRemovedCards(!isShowingRemovedCards)
	}, [isShowingRemovedCards])


	useEffect(() => {
		if (selectedBanList !== '')
		{
			setIsShowingNewForbiddenCards(false)
			setIsShowingNewLimitedCards(false)
			setIsShowingNewSemiLimitedCards(false)

			setIsShowingRemovedCards(false)
		}
		// eslint-disable-next-line
	}, [selectedBanList])


	useEffect( () => {
		const newForbiddenCardsList = []

		newForbiddenCards.forEach( (card, ind) => {
			newForbiddenCardsList.push(
				<ListStatItem
					key={ind}
					button
					onClick={ () => cardClicked(card.id) }
					style={{paddingLeft: '3rem'}}  >
					<ListItemText
						primary={card.name}
						secondary={`Was: ${card.previousState}`}
					/>
				</ListStatItem>
			)
		})

		setNewForbiddenCardsList(newForbiddenCardsList)
	}, [newForbiddenCards])


	useEffect( () => {
		const newLimitedCardsList = []

		newLimitedCards.forEach( (card, ind) => {
			newLimitedCardsList.push(
				<ListStatItem key={ind} button onClick={ () => cardClicked(card.id) } style={{paddingLeft: '3rem'}}  >
					<ListItemText primary={card.name} secondary={`Was: ${card.previousState}`} />
				</ListStatItem>
			)
		})

		setNewLimitedCardsList(newLimitedCardsList)

	}, [newLimitedCards])


	useEffect( () => {
		const newSemiLimitedCardsList = []

		newSemiLimitedCards.forEach( (card, ind) => {
			newSemiLimitedCardsList.push(
				<ListStatItem key={ind} button onClick={ () => cardClicked(card.id) } style={{paddingLeft: '3rem'}}  >
					<ListItemText primary={card.name} secondary={`Was: ${card.previousState}`} />
				</ListStatItem>
			)
		})

		setNewSemiLimitedCardsList(newSemiLimitedCardsList)

	}, [newSemiLimitedCards])


	useEffect( () => {
		const removedCardsList = []

		removedCards.forEach( (card, ind) => {
			removedCardsList.push(
				<ListStatItem key={ind} button onClick={ () => cardClicked(card.id) } style={{paddingLeft: '3rem'}}  >
					<ListItemText primary={card.name} secondary={`Was: ${card.previousState}`}  />
				</ListStatItem>)
		})
		setRemovedCardsList(removedCardsList)
	}, [removedCards])


	return(
		<div style={{paddingLeft: '.5rem', paddingRight: '.5rem'}} >
			<Typography variant='h5'>
				List Summary
			</Typography>
			<List style={{ width: '100%', maxWidth: '400px' }}
				component="nav"
				aria-labelledby="nested-list-subheader">
				<ListStatItem >
					<ListItemText
						primary="Total Cards"
						secondary={totalCardsInSelectedList}
					/>
				</ListStatItem>

				<ListStatItem
					button
					onClick={showNewCards}>
					<ListItemText
						primary="Newly Added"
						secondary={numNewForbidden + numNewLimited + numNewSemiLimited}
					/>
						{isShowingNewCards ? <ExpandLess /> : <ExpandMore />}
				</ListStatItem>

				<Collapse
					in={isShowingNewCards}
					timeout="auto"
					unmountOnExit >
					<List
						component="div"
						disablePadding >
						<ListStatItem
							button
							onClick={showNewForbiddenCards}
							style={{paddingLeft: '2.5rem'}}  >
							<ListItemText
								primary="Forbidden"
								secondary={ numNewForbidden } />
							{isShowingNewForbiddenCards ? <ExpandLess /> : <ExpandMore />}
						</ListStatItem>
						<Collapse
							in={isShowingNewForbiddenCards}
							timeout="auto"
							unmountOnExit >
							<List
								component="div"
								disablePadding >
								{newForbiddenCardsList}
							</List>
						</Collapse>

						<ListStatItem
							button
							onClick={showNewLimitedCards}
							style={{paddingLeft: '2.5rem'}}  >
							<ListItemText
								primary="Limited"
								secondary={ numNewLimited } />
							{isShowingNewForbiddenCards ? <ExpandLess /> : <ExpandMore />}
						</ListStatItem>
						<Collapse
							in={isShowingNewLimitedCards}
							timeout="auto"
							unmountOnExit >
							<List
								component="div"
								disablePadding >
								{ newLimitedCardsList }
							</List>
						</Collapse>

						<ListStatItem
							button
							onClick={showNewSemiLimitedCards}
							style={{paddingLeft: '2.5rem'}}  >
							<ListItemText
								primary="Semi-Limited"
								secondary={ numNewSemiLimited} />
								{ isShowingNewForbiddenCards ? <ExpandLess /> : <ExpandMore /> }
						</ListStatItem>
						<Collapse
							in={isShowingNewSemiLimitedCards}
							timeout="auto"
							unmountOnExit >
							<List
								component="div"
								disablePadding >
								{ newSemiLimitedCardsList }
							</List>
						</Collapse>
					</List>
				</Collapse>

				<ListStatItem
					button
					onClick={ showRemovedCards } >
					<ListItemText
						primary="No Longer Restricted"
						secondary={numRemoved}
					/>
						{ isShowingRemovedCards ? <ExpandLess /> : <ExpandMore /> }
				</ListStatItem>
				<Collapse
					in={ isShowingRemovedCards }
					timeout="auto"
					unmountOnExit>
					<List
						component="div"
						disablePadding >
						{removedCardsList}
					</List>
				</Collapse>

			</List>
		</div>
	)
}, (prevProps, newProps) => {
	if ( prevProps.selectedBanList !== newProps.selectedBanList || prevProps.totalCardsInSelectedList !== newProps.totalCardsInSelectedList || prevProps.numNewForbidden !== newProps.numNewForbidden || prevProps.numNewLimited !== newProps.numNewLimited || prevProps.numNewSemiLimited !== newProps.numNewSemiLimited || prevProps.numRemoved !== newProps.numRemoved )
		return false

	return true
})

export default BanListStats