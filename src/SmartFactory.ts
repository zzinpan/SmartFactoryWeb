import Util from "./Util";

const buildUrl = "https://zzinpan.github.io/SmartFactoryLibrary/SmartFactoryLibrary/Build";

const unityLoaderNode = document.createElement("script");
unityLoaderNode.src = `${buildUrl}/SmartFactoryLibrary.loader.js`;

const headNode = document.querySelector('head');
headNode.appendChild( unityLoaderNode );

export default class SmartFactory {

    element: {
        [key: string]: HTMLElement
    } = {
        container: null,
        canvas: null
    };

    unityEventKey: string;
    unityInstance: any;

    constructor( containerElementQuery: htmlElementOrString ) {

        this.unityEventKey = Math.random().toString().replace(".", "");

        if( typeof containerElementQuery === "string" ){
            this.element.container = document.querySelector( containerElementQuery );
        }else{
            this.element.container = containerElementQuery;
        }

        this.element.canvas = document.createElement("canvas");
        this.element.container.appendChild( this.element.canvas );

        const onWindowResize = () => {

            const boundingRect = this.element.container.getBoundingClientRect();
            const canvas = ( this.element.canvas as HTMLCanvasElement );

            canvas.width = boundingRect.width;
            canvas.height = boundingRect.height;
            canvas.style.width = `${canvas.width}px`;
            canvas.style.height = `${canvas.height}px`;

        };
        window.addEventListener("resize", onWindowResize);
        onWindowResize();

    }

    async ready(): Promise<void> {

        let rafId = null;

        /**
         * 유니티가 로드 가능한 시점이 되었을 때, 후행 작업을 진행한다.
         */
        const waitForUnityReady = () => {

            if( window.createUnityInstance == null ){
                rafId = requestAnimationFrame( waitForUnityReady );
                return;
            }

            cancelAnimationFrame( rafId );
            createUnityInstance(this.element.canvas, {
                dataUrl: `${buildUrl}/SmartFactoryLibrary.data.gz`,
                frameworkUrl: `${buildUrl}/SmartFactoryLibrary.framework.js.gz`,
                codeUrl: buildUrl + "/SmartFactoryLibrary.wasm.gz",
                streamingAssetsUrl: "StreamingAssets",
                companyName: "DefaultCompany",
                productName: "SmartFactoryLibrary",
                productVersion: "0.1",
                showBanner: null,
            }, (progress) => {

                console.log( 100 * progress + "%" );

            }).then((unityInstance) => {

                return new Promise(( resolve, reject ) => {

                    this.unityInstance = unityInstance;
                    function onCompleteSetEventKey(){
                        window.removeEventListener( "completeSetEventKey", onCompleteSetEventKey, false );
                        resolve(null);
                    }
                    window.addEventListener( "completeSetEventKey", onCompleteSetEventKey, false );
                    this.unityInstance.sendMessage( "SmartFactory", "setEventKey", this.unityEventKey );

                });

            }).catch((message) => {

                alert(message);

            });

        }
        waitForUnityReady();

    }

}