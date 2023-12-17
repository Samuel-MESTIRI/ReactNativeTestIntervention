import { Drawer } from 'expo-router/drawer';

export default function Layout() {
	const pages = [
		{ file: 'index', title: 'Home', drawerLabel: 'Home'},
		{ file: 'camera', title: 'Camera', drawerLabel: 'Camera'},
		{ file: 'scanQrCode', title: 'Scan QR code', drawerLabel: 'Scan QR code'},
		{ file: 'draw', title: 'Draw', drawerLabel: 'Draw'},
		{ file: 'map', title: 'Map', drawerLabel: 'Map'},
		{ file: 'sqlite', title: 'SQLITE', drawerLabel: 'SQLITE'},
		{ file: 'pdf', title: 'PDF', drawerLabel: 'PDF'},
		{ file: 'backgroundTask', title: 'Background Task', drawerLabel: 'Background Task'},
		{ file: 'notifications', title: 'Notifications', drawerLabel: 'Notifications'},
	]
	return (
		<Drawer>
			{pages.map((page, index) => (
				<Drawer.Screen
					key={index}
					name={page.file} // This is the name of the page and must match the url from root
					options={{
						unmountOnBlur: page.file === 'camera' || page.file === 'scanQrCode' ? true : false,
						drawerLabel: page.drawerLabel,
						title: page.title,
						headerTintColor: '#fff',
						headerStyle: {
							backgroundColor: '#324956',
						},
						drawerActiveTintColor: '#fff',
						drawerInactiveTintColor: '#fff',
						drawerActiveBackgroundColor: '#468ec8',
						drawerContentStyle: {
							backgroundColor: '#324956'
						}
					}}
				/>
			))}
		</Drawer>
	);
}
