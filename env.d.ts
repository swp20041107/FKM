/// <reference types="vite/client" />
import { ComponentCustomProperties } from "@vue/runtime-core";

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $api: object; // 这里填类型
    }
}
// 必须导出，才能在其他文件中使用
export default ComponentCustomProperties;