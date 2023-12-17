import React from 'react';
import {
 View,
 StyleSheet,
 Dimensions,
 Button
} from 'react-native';
import { useState, useRef } from 'react';
import {Svg, Path} from 'react-native-svg';
import ViewShot, {captureRef} from 'react-native-view-shot';

const {height, width} = Dimensions.get('window');

export default () => {
	const [currentPath, setCurrentPath] = useState([]);
	const [paths, setPaths] = useState([]);
	const ref = useRef();

	const onTouchEnd = () => {
		const currentPaths = [...paths];
		const newPath = [...currentPath];
 
		//push new path with old path and clean current path state
		currentPaths.push(newPath);
		setPaths(currentPaths);
		setCurrentPath([]);
	};
 
	const onTouchMove = (event) => {
		const newPath = [...currentPath];

		//get current user touches position
		const locationX = event.nativeEvent.locationX;
		const locationY = event.nativeEvent.locationY;

		// create new point
		const newPoint = `${newPath.length === 0 ? 'M' : ''}${locationX.toFixed(
			0,
		)},${locationY.toFixed(0)} `;

		// add the point to older points
		newPath.push(newPoint);
		setCurrentPath(newPath);
	};

	const clearPaths = () => {
		setPaths([]);
		setCurrentPath([]);
	}
 

 return (
	<View style={styles.container}>
		<Button title="CLEAR" onPress={clearPaths} />

		<View
				style={styles.svgContainer}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}>
					<ViewShot ref={ref}>
						<Svg height={height * 0.7} width={width}>
							<Path
								d={currentPath.join('')}
								stroke={'red'}
								fill={'transparent'}
								strokeWidth={6}
								strokeLinejoin={'round'}
								strokeLinecap={'round'}
							/>

							{paths.length > 0 &&
								paths.map((item, index) => (
									<Path
										key={`path-${index}`}
										d={item.join('')}
										stroke={'red'}
										fill={'transparent'}
										strokeWidth={6}
										strokeLinejoin={'round'}
										strokeLinecap={'round'}
									/>
								))}
					</Svg>
				</ViewShot>
		</View>
	</View>  
 );
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
 },
 svgContainer: {
   height: height * 0.7,
   width,
   borderColor: 'black',
   backgroundColor: 'white',
   borderWidth: 1,
 },
});
