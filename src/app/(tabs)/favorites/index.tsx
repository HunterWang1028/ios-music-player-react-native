import library from '@/assets/data/library.json'
import TracksList from '@/components/TracksList'
import { screenPadding } from '@/constants/tokens'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import { useMemo } from 'react'
import { ScrollView, View } from 'react-native'

const FavoriteScreen = () => {
	const seaech = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Search',
		},
	})
	const favoriteTracks = useMemo(() => {
		return library.filter((track) => track.rating === 1)
	}, [])
	return (
		<View style={defaultStyles.container}>
			<ScrollView
				style={{ paddingHorizontal: screenPadding.horizontal }}
				contentInsetAdjustmentBehavior="automatic"
			>
				<TracksList tracks={favoriteTracks} scrollEnabled={false} />
			</ScrollView>
		</View>
	)
}

export default FavoriteScreen
