interface ImportMetaEnv {
	/** 网站标题，应用名称 */
	readonly VITE_APP_TITLE: string;
	/** 服务端口号 */
	readonly VITE_SERVER_PORT: string;
	/** 后台接口地址 */
	readonly VITE_SERVER_BASEURL: string;
	/** 是否清除console */
	readonly VITE_DELETE_CONSOLE: string;
	/** 是否展示sourcemap */
	readonly VITE_SHOW_SOURCEMAP: boolean;
	// 更多环境变量...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
