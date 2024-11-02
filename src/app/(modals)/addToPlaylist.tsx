import { PlaylistsList } from '@/components/PlayListsList'
import { screenPadding } from '@/constants/tokens'
import { Playlist } from '@/helpers/types'
import { usePlaylist, useTracks } from '@/store/library'
import { useQueue } from '@/store/queue'
import { defaultStyles } from '@/styles'
import { useHeaderHeight } from '@react-navigation/elements'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TrackPlayer, { Track } from 'react-native-track-player'

const AddToPlaylistModal = () => {
	const router = useRouter()
	const headerHeight = useHeaderHeight()
	const { trackUrl } = useLocalSearchParams<{ trackUrl: Track['url'] }>()
	const tracks = useTracks()
	const { activeQueueId } = useQueue()

	const { playlists, addToPlaylist } = usePlaylist()

	const track = tracks.find((currentTrack) => trackUrl === currentTrack.url)

	if (!track) return

	const availablePlaylist = playlists.filter(
		(playlist) => !playlist.tracks.some((playlistTrack) => playlistTrack.url === track.url),
	)

	const handlePlaylistPress = async (playlist: Playlist) => {
		addToPlaylist(track, playlist.name)

		//close the modal
		router.dismiss()

		// if the current queue is the playlist we're now adding to, add the track at the end of the queue
		if (activeQueueId?.startsWith(playlist.name)) {
			await TrackPlayer.add(track)
		}
	}

	return (
		<SafeAreaView style={[styles.modalContainer, { paddingTop: headerHeight }]}>
			<PlaylistsList playlists={availablePlaylist} onPlaylistPress={handlePlaylistPress} />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	modalContainer: {
		...defaultStyles.container,
		paddingHorizontal: screenPadding.horizontal,
	},
})

export default AddToPlaylistModal
