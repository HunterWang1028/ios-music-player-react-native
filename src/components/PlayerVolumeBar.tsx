import { colors } from '@/constants/tokens'
import { useTrackPlayerVolume } from '@/hooks/useTrackPlayerVolume'
import { utilsStyles } from '@/styles'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View, ViewProps } from 'react-native'
import { Slider } from 'react-native-awesome-slider'
import { useSharedValue } from 'react-native-reanimated'

export const PlayerVolumeBar = ({ style }: ViewProps) => {
	const { volume, updateVolume } = useTrackPlayerVolume()
	const progress = useSharedValue(0)
	const min = useSharedValue(0)
	const max = useSharedValue(1)

	progress.value = volume ?? 0

	return (
		<View style={style}>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<Ionicons name="volume-low" size={20} color={colors.icon} style={{ opacity: 0.8 }} />
				<Slider
					progress={progress}
					minimumValue={min}
					maximumValue={max}
					containerStyle={utilsStyles.slider}
					thumbWidth={0}
					renderBubble={() => null}
					theme={{
						minimumTrackTintColor: colors.minimumTrackTintColor,
						maximumTrackTintColor: colors.maximumTrackTintColor,
					}}
					onValueChange={(value) => {
						updateVolume(value)
					}}
				/>
				<Ionicons name="volume-high" size={20} color={colors.icon} style={{ opacity: 0.8 }} />
			</View>
		</View>
	)
}
