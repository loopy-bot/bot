export const launchFullscreen =  (element) => {
	if(element.requestFullscreen) {
		element.requestFullscreen();
	} else if(element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if(element.msRequestFullscreen) {
		element.msRequestFullscreen();
	} else if(element.oRequestFullscreen) {
		element.oRequestFullscreen();
	} else if(element.webkitRequestFullscreen) {
		element.webkitRequestFullScreen();
	} else {
		const docHtml = document.documentElement;
		const docBody = document.body;
		const width = window.screen.width;
		const height = window.screen.height;
		const cssText = `width:${  width  };height:${  height  };overflow:hidden;`;
		docHtml.style.cssText = cssText;
		docBody.style.cssText = cssText;
	}
};
