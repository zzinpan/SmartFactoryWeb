type htmlElementOrString = HTMLElement | string;
declare function createUnityInstance( element: HTMLElement, config: {
    dataUrl: string,
    frameworkUrl: string,
    codeUrl: string,
    streamingAssetsUrl: string,
    companyName: string,
    productName: string,
    productVersion: string,
    showBanner: string
}, onProcess: Function )