import createRequest from "./requestFactory/createRequest";
import createGetBaseUrl from "./requestFactory/createBaseUrl";
// import createDownload from "./requestFactory/createDownload";
const hosts = {
	// DEV: "https://authsvc.finalc.cn",
	// UAT: "http://dwssp-auth.dev.mt178.com",
	// PRO: "https://dwssp-auth.k8s.shuisi110.com",
};

const getBaseUrl = createGetBaseUrl(hosts);
const request = createRequest(getBaseUrl);

export { getBaseUrl, request };
