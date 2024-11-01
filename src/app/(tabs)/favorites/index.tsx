import TracksList from '@/components/TracksList'
import { screenPadding } from '@/constants/tokens'
import { trackTitleFilter } from '@/helpers/filter'
import { generateTracksListId } from '@/helpers/miscellaneous'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useFavorites } from '@/store/library'
import { defaultStyles } from '@/styles'
import { useMemo } from 'react'
import { ScrollView, View } from 'react-native'

const FavoriteScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Search',
		},
	})

	const { favorites } = useFavorites()

	const filteredFavoritesTracks = useMemo(() => {
		console.log('Filtering favorites with search:', search)
		if (!search) return favorites

		return favorites.filter(trackTitleFilter(search))
	}, [search, favorites])

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				style={{ paddingHorizontal: screenPadding.horizontal }}
				contentInsetAdjustmentBehavior="automatic"
			>
				<TracksList
					id={generateTracksListId('favorites', search)}
					scrollEnabled={false}
					tracks={filteredFavoritesTracks}
				/>
			</ScrollView>
		</View>
	)
}

export default FavoriteScreen
