const generateComp = () => {
	const modules = import.meta.glob("../components/arco/*.vue", {
		eager: true,
		import: "default",
	}) as any;

	let map: any = {};
	for (let i in modules) {
		map[modules[i].name] = modules[i];
	}
	console.log(map);

	return map;
};

export const componentMap = generateComp();
